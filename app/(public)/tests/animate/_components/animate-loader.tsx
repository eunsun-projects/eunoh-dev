"use client";

interface CustomLoaderProps {
	size?: number;
	color?: string;
	className?: string;
}

function CustomLoader({
	size = 50,
	color = "#f03355",
	className = "",
}: CustomLoaderProps) {
	const dotCount = 8;
	const radius = size * 0.42;
	const dotSize = Math.max(4, Math.round(size * 0.16));

	return (
		<div
			className={`relative ${className}`}
			style={{ width: `${size}px`, height: `${size}px` }}
		>
			{Array.from({ length: dotCount }).map((_, index) => {
				const angleDeg = -(360 / dotCount) * index;
				return (
					<div
						key={`dot-${angleDeg}`}
						className="absolute top-1/2 left-1/2"
						style={{
							width: `${dotSize}px`,
							height: `${dotSize}px`,
							marginLeft: `${-dotSize / 2}px`,
							marginTop: `${-dotSize / 2}px`,
							transform: `rotate(${angleDeg}deg) translate(${radius}px)`,
							transformOrigin: "center",
						}}
					>
						<span
							className="block animate-loader8 rounded-full"
							style={{
								width: "100%",
								height: "100%",
								backgroundColor: color,
								animationDelay: `${-((1 / dotCount) * index)}s`,
							}}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default CustomLoader;
