"use client";

import { useState } from "react";
import { MdCloseFullscreen, MdOpenInFull } from "react-icons/md";
import type { GalleryInfo } from "./gallery-loading-context";

interface GalleryCaptionProps {
	isInfoOpen: GalleryInfo;
}

function GalleryCaption({ isInfoOpen }: GalleryCaptionProps) {
	const [big, setBig] = useState(false);

	const handleBig = () => {
		setBig(true);
	};
	const handleSmall = () => {
		setBig(false);
	};

	return (
		<div style={{ display: isInfoOpen.open === true ? "block" : "none" }}>
			{/* 여기를 안보이게 하고*/}
			<div
				className="fixed bottom-5 left-5 z-1008 w-fit min-w-48 border-2 border-white bg-slate-300/40 p-2.5 text-white backdrop-blur-sm"
				style={{ display: big === false ? "block" : "none" }}
			>
				<div className="flex flex-row items-center justify-between gap-2">
					<h3 className="relative inline-block font-normal text-white text-xl">
						{isInfoOpen.info.title}
					</h3>
					{/* span을 클릭하면 */}
					<MdOpenInFull
						className="top-px float-right cursor-pointer pl-1 font-semibold text-xl leading-none"
						onClick={handleBig}
					/>
				</div>
				<p className="word-break-keep-all m-0 text-sm text-white">
					{`artist : ${isInfoOpen.info.artist}`}
				</p>
				<p className="word-break-keep-all m-0 text-sm text-white">{`year : ${isInfoOpen.info.year}`}</p>
				<p className="word-break-keep-all m-0 text-sm text-white">{`material : ${isInfoOpen.info.material}`}</p>
			</div>

			{/* 여기를 보이게하고*/}
			<div
				className="fixed top-1/2 left-1/2 w-full min-w-48 -translate-x-1/2 -translate-y-1/2 transform rounded-md border-2 border-white bg-slate-300/40 p-2.5 text-white backdrop-blur-sm sm:w-1/2"
				style={{ display: big === true ? "block" : "none" }}
			>
				{/* <h3></h3> */}
				<MdCloseFullscreen
					className="top-px float-right cursor-pointer font-semibold text-2xl leading-none"
					onClick={handleSmall}
				/>
				<p className="word-break-keep-all m-0 text-base text-white">
					{`artist : ${isInfoOpen.info.artist}`}
				</p>
				<p className="word-break-keep-all m-0 text-base text-white">{`year : ${isInfoOpen.info.year}`}</p>
				<p className="word-break-keep-all m-0 text-base text-white">{`material : ${isInfoOpen.info.material}`}</p>
				<p className="m-0 whitespace-pre-line text-base text-white">
					{`introduction : \n${isInfoOpen.info.desc}`}
				</p>
			</div>
		</div>
	);
}
export default GalleryCaption;
