"use client";

import { Earth, FastForward, Loader, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Vector3 } from "three";
import { Back } from "@/app/(public)/_components/ui";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	AU,
	loadObjectsData,
	loadTextures,
	OrbitingObj,
	Simulator,
	SolarSysObj,
	type SolarSystemMap,
	Star,
} from "@/lib/solar";

function SolarTemplate() {
	const [isLoading, setIsLoading] = useState(true);
	const [isFastForward, setIsFastForward] = useState(false);
	const canvasDivRef = useRef<HTMLDivElement | null>(null);
	const labelRootRef = useRef<HTMLDivElement | null>(null);
	const simulatorRef = useRef<Simulator | null>(null);
	const objectsRef = useRef<SolarSystemMap | null>(null);
	const initialTargetRef = useRef<SolarSysObj | null>(null);
	const initialLookFromRef = useRef<Vector3 | null>(null);

	useEffect(() => {
		if (!canvasDivRef.current) return;
		const labelRoot = document.createElement("div");
		labelRoot.className = "solar-label-root";
		document.body.appendChild(labelRoot);
		labelRootRef.current = labelRoot;

		const initializeSimulator = async (container: HTMLElement) => {
			try {
				const simulator = new Simulator({
					container,
					labelRoot: labelRootRef.current ?? container,
				});

				const textures = await loadTextures("/solar/data/textures.json");
				const { objects, maxYear } = await loadObjectsData(
					"/solar/data/bodies.json",
					textures,
				);

				simulator.initialize(objects, undefined, 200 * AU, maxYear);

				const lookFrom = new Vector3(0, 3 * AU, 8 * AU);
				const defaultTarget =
					(Object.values(objects).find((obj) => obj instanceof Star) as
						| Star
						| undefined) ??
					(Object.values(objects).find((obj) => obj instanceof SolarSysObj) as
						| SolarSysObj
						| undefined);
				if (defaultTarget) {
					simulator.lookAt(defaultTarget, lookFrom);
					initialTargetRef.current = defaultTarget;
					initialLookFromRef.current = lookFrom.clone();
				}
				simulator.setLabelsVisibility(objects, true);
				simulator.setSimulationSpeed(1);
				simulator.startSimulation(new Date());

				objectsRef.current = objects;
				return simulator;
			} catch (error) {
				console.error("Failed to initialize simulator ====>", error);
			}
		};

		initializeSimulator(canvasDivRef.current).then((simulator) => {
			if (simulator) {
				console.log("simulator initialized");
				simulatorRef.current = simulator;
				setIsLoading(false);
			}
		});

		const handleResize = () => {
			simulatorRef.current?.updateSimulationSize();
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
			labelRootRef.current?.remove();
			labelRootRef.current = null;
		};
	}, []);

	const handleSpeedToggle = () => {
		if (!simulatorRef.current) return;
		const nextFastForward = !isFastForward;
		const speed = nextFastForward ? 604_800 : 1; // 1주 / 초
		simulatorRef.current.setSimulationSpeed(speed);
		setIsFastForward(nextFastForward);
	};

	const handleSelectPlanet = (planet: SolarSysObj) => {
		if (!simulatorRef.current) return;
		const worldPos = planet.getWorldPosition(new Vector3());

		let from: Vector3;
		if (
			planet instanceof OrbitingObj &&
			planet.orbitsAround &&
			!(planet.orbitsAround instanceof Star)
		) {
			// 위성(달 등): 부모 반대 편에 카메라를 두어 위성이 보이도록 함
			const parentPos = planet.orbitsAround.getWorldPosition(new Vector3());
			const orbitalRadius = worldPos.distanceTo(parentPos);
			const dist = Math.min(
				planet.radius * planet.getScale() * 6,
				orbitalRadius * 2,
			);
			const dir = worldPos.clone().sub(parentPos).normalize();
			from = worldPos.clone().add(dir.multiplyScalar(dist));
		} else if (worldPos.lengthSq() > 1e-12) {
			const dist = planet.radius * planet.getScale() * 6;
			const dir = worldPos.clone().normalize();
			from = worldPos.clone().sub(dir.multiplyScalar(dist));
		} else {
			const dist = planet.radius * planet.getScale() * 6;
			from = new Vector3(0, 0, dist);
		}
		simulatorRef.current.lookAt(planet, from);
		simulatorRef.current.setFollowTarget(true);
	};

	const handleResetToOriginal = () => {
		if (
			!simulatorRef.current ||
			!initialTargetRef.current ||
			!initialLookFromRef.current
		)
			return;
		simulatorRef.current.lookAt(
			initialTargetRef.current,
			initialLookFromRef.current,
		);
	};

	return (
		<>
			{isLoading && (
				<div className="fixed inset-0 z-[1002] h-svh w-svw overflow-hidden bg-black">
					<div className="flex h-full items-center justify-center">
						<Loader className="animate-spin text-white" />
					</div>
				</div>
			)}
			{!isLoading && <SolarInitialDialog />}
			<div className="fixed inset-0 z-[1000] h-svh w-svw overflow-hidden bg-black">
				<div className="absolute top-1 right-1/2 z-[1001] flex translate-x-1/2 gap-2">
					{isFastForward ? (
						<Play
							className="size-6 cursor-pointer"
							onClick={handleSpeedToggle}
						/>
					) : (
						<FastForward
							className="size-6 cursor-pointer"
							onClick={handleSpeedToggle}
						/>
					)}
					<SolarDialog
						objects={objectsRef.current}
						onSelectPlanet={handleSelectPlanet}
						onResetToOriginal={handleResetToOriginal}
					/>
				</div>
				<Back className="absolute top-4 right-4 z-[1001]" />
				<div ref={canvasDivRef} className="absolute inset-0" />
			</div>
		</>
	);
}

export default SolarTemplate;

interface SolarDialogProps {
	objects: SolarSystemMap | null;
	onSelectPlanet: (planet: SolarSysObj) => void;
	onResetToOriginal: () => void;
}

function SolarDialog({
	objects,
	onSelectPlanet,
	onResetToOriginal,
}: SolarDialogProps) {
	const [open, setOpen] = useState(false);

	const planets = objects
		? Object.values(objects).filter((obj) => obj instanceof SolarSysObj)
		: [];

	const handleSelect = (planet: SolarSysObj) => {
		onSelectPlanet(planet);
		setOpen(false);
	};

	const handleReset = () => {
		onResetToOriginal();
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Earth className="size-6 cursor-pointer" />
			</DialogTrigger>
			<DialogContent className="z-[1003]">
				<DialogHeader>
					<DialogTitle>행성선택</DialogTitle>
				</DialogHeader>
				<div className="grid grid-cols-3 gap-2">
					{planets.map((planet) => (
						<button
							key={planet.name}
							type="button"
							className="cursor-pointer rounded-md border p-2 text-sm hover:bg-accent"
							onClick={() => handleSelect(planet)}
						>
							{planet.labelText ?? planet.name}
						</button>
					))}
					<button
						type="button"
						className="cursor-pointer rounded-md border p-2 text-sm hover:bg-accent"
						onClick={handleReset}
					>
						원위치
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function SolarInitialDialog() {
	const [open, setOpen] = useState(true);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="z-[1003] max-w-[90svw] sm:max-w-sm">
				<DialogHeader className="relative z-[1003] block">
					<DialogTitle>태양계 시뮬레이터</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<p className="flex items-center gap-2">
						<Link
							href="https://github.com/jvisualschool/solar-system"
							target="_blank"
							className="flex items-center gap-2 text-white"
						>
							<FaGithub className="size-4" />
							<span>소스</span>
						</Link>
						가 원본입니다.
					</p>
					<p>
						원샷은 아니고...
						<br />꽤 여러번 시도했습니다.
						<br />
						빨리감기 안해도 움직이고 있습니다..
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
