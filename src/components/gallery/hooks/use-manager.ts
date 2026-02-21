"use client";

import type { JoystickManager, JoystickManagerOptions } from "nipplejs";
import { useEffect, useState } from "react";
import type Gallery from "@/lib/gallery/class/gallery.class";

interface UseManagerProps<T extends Gallery> {
	isMobile: boolean;
	app: T | null;
	nipplejs: typeof import("nipplejs") | null;
	options: JoystickManagerOptions | null;
}

function useManager<T extends Gallery>({
	isMobile,
	app,
	nipplejs,
	options,
}: UseManagerProps<T>) {
	const [manager, setManager] = useState<JoystickManager | null>(null);

	useEffect(() => {
		if (!app) return;
		if (!isMobile) return;
		if (!nipplejs || !options) return;
		const manager = nipplejs.create(options);
		manager.on("move", (_event, data) => {
			if (!app.controls) return;
			// 충돌 상태면 조이스틱 조작을 끝내고 원위치(previousPosition) 유지
			if (app.checkCollision()) {
				app.controls.w = false;
				app.controls.a = false;
				app.controls.s = false;
				app.controls.d = false;
				return;
			}
			if (data.direction && data.angle.radian) {
				const radian = data.angle.radian;
				if (radian < 0.524 || radian > 5.756) {
					// right
					app.controls.w = false;
					app.controls.a = false;
					app.controls.s = false;
					app.controls.d = true;
				} else if (radian < 1.046 && radian > 0.524) {
					// right up
					app.controls.w = true;
					app.controls.a = false;
					app.controls.s = false;
					app.controls.d = true;
				} else if (radian < 2.092 && radian > 1.046) {
					// up
					app.controls.w = true;
					app.controls.a = false;
					app.controls.s = false;
					app.controls.d = false;
				} else if (radian < 2.615 && radian > 2.092) {
					// left up
					app.controls.w = true;
					app.controls.a = true;
					app.controls.s = false;
					app.controls.d = false;
				} else if (radian < 3.662 && radian > 2.615) {
					// left
					app.controls.w = false;
					app.controls.a = true;
					app.controls.s = false;
					app.controls.d = false;
				} else if (radian < 4.186 && radian > 3.662) {
					// left down
					app.controls.w = false;
					app.controls.a = true;
					app.controls.s = true;
					app.controls.d = false;
				} else if (radian < 5.233 && radian > 4.186) {
					// down
					app.controls.w = false;
					app.controls.a = false;
					app.controls.s = true;
					app.controls.d = false;
				} else if (radian < 5.756 && radian > 5.233) {
					// down right
					app.controls.w = false;
					app.controls.a = false;
					app.controls.s = true;
					app.controls.d = true;
				}
			}
		});

		manager.on("end", () => {
			// console.log('end')
			if (!app.controls) return;
			app.controls.w = false;
			app.controls.a = false;
			app.controls.s = false;
			app.controls.d = false;
		});

		setManager(manager);

		// 컴포넌트가 unmount될 때 이벤트 리스너와 객체를 정리합니다.
		return () => {
			if (manager) manager.destroy();
		};
	}, [app, nipplejs, isMobile, options]);

	return manager;
}

export default useManager;
