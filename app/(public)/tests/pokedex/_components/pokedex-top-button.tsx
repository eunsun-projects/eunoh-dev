"use client";

function PokedexTopButton() {
	const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	return (
		<button
			type="button"
			onClick={scrollToTop}
			className="fixed right-4 bottom-4 z-50 cursor-pointer rounded-full bg-white p-2 shadow-md hover:bg-gray-50"
		>
			{"↑"}
		</button>
	);
}

export default PokedexTopButton;
