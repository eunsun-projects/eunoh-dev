"use client";

import Link from "next/link";
import { useState } from "react";
import { FaAngleDoubleDown, FaGithub } from "react-icons/fa";
import { SiTistory } from "react-icons/si";
import { ReactTyped, Typed } from "react-typed";
import { twMerge } from "tailwind-merge";

function Hello() {
    const [ready, setReady] = useState<{ first: boolean; second: boolean }>({
        first: false,
        second: false,
    });

    const handleReady = (type: "first" | "second") => (instance: Typed) => {
        if (type === "first") {
            setReady((prev) => ({ ...prev, first: true }));
        } else {
            setReady((prev) => ({ ...prev, second: true }));
        }
        if (instance) instance.cursor.remove();
    };

    return (
        <section className="flex flex-col items-center justify-center h-dvh">
            <div
                className={twMerge(
                    "absolute opacity-0 top-2 flex flex-row gap-2 items-center justify-center left-2 transition-all duration-1000",
                    ready.first && ready.second && "opacity-100"
                )}
            >
                <Link href="https://github.com/eunohhh">
                    <FaGithub className="text-3xl" />
                </Link>
                <Link href="https://ifelseif.tistory.com">
                    <SiTistory className="text-2xl" />
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-8">
                <h3
                    className={twMerge(
                        "invisible opacity-0 text-3xl font-bold",
                        ready.first &&
                            ready.second &&
                            "visible opacity-100 transition-opacity duration-1000"
                    )}
                >
                    {"Eun Oh's Dev Portfolio"}
                </h3>
                <div
                    className={twMerge(
                        "flex flex-col items-center justify-center text-6xl gap-8",
                        ready.first &&
                            ready.second &&
                            "text-3xl transition-all duration-1000 gap-4"
                    )}
                >
                    <h2 className="font-bold text-center">
                        <ReactTyped
                            strings={["안녕하세요"]}
                            typeSpeed={55}
                            onComplete={handleReady("first")}
                        />
                    </h2>
                    <h2 className="font-bold text-center">
                        <ReactTyped
                            strings={["FE개발자 오은 입니다"]}
                            typeSpeed={55}
                            onComplete={handleReady("second")}
                        />
                    </h2>
                </div>
            </div>
            <div
                className={twMerge(
                    "absolute opacity-0 bottom-2 left-2 flex flex-row gap-2 items-center justify-center transition-all duration-1000",
                    ready.first && ready.second && "opacity-100"
                )}
            >
                <p>updated at 2024.08.30</p>
            </div>
            <div
                className={twMerge(
                    "absolute opacity-0 bottom-2 transition-all duration-1000",
                    ready.first && ready.second && "opacity-100"
                )}
            >
                <FaAngleDoubleDown className="text-3xl animate-bounce" />
            </div>
        </section>
    );
}

export default Hello;
