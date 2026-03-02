import { cva, type VariantProps } from "class-variance-authority";

const chipVariants = cva(
	[
		"border text-sm",
		"rounded-full",
		"px-2.5",
		"py-0.5",
		"min-w-14",
		"text-center",
		"hover:opacity-70",
		"transition-opacity",
	],
	{
		variants: {
			intent: {
				primary: "border-blue-500 bg-blue-500 text-white",
				secondary: "border-gray-500 bg-gray-500 text-white",
				danger: "border-red-500 bg-red-500 text-white",
				warning: "border-yellow-500 bg-yellow-500 text-white",
				info: "border-violet-500 bg-violet-500 text-white",
				success: "border-green-500 bg-green-500 text-white",
				default: "border-black bg-white text-black",
				normal: "border-gray-400 bg-gray-400 text-white",
				fire: "border-red-600 bg-red-600 text-white",
				water: "border-blue-600 bg-blue-600 text-white",
				electric: "border-yellow-400 bg-yellow-400 text-black",
				grass: "border-green-500 bg-green-500 text-white",
				ice: "border-blue-300 bg-blue-300 text-black",
				fighting: "border-orange-700 bg-orange-700 text-white",
				poison: "border-purple-500 bg-purple-500 text-white",
				ground: "border-yellow-700 bg-yellow-700 text-white",
				flying: "border-indigo-400 bg-indigo-400 text-white",
				psychic: "border-pink-500 bg-pink-500 text-white",
				bug: "border-green-700 bg-green-700 text-white",
				rock: "border-yellow-800 bg-yellow-800 text-white",
				ghost: "border-purple-700 bg-purple-700 text-white",
				dragon: "border-indigo-700 bg-indigo-700 text-white",
				dark: "border-gray-800 bg-gray-800 text-white",
				steel: "border-gray-500 bg-gray-500 text-white",
				fairy: "border-pink-300 bg-pink-300 text-black",
			},
		},
		defaultVariants: {
			intent: "default",
		},
	},
);

export type TypesChipVariantsType = VariantProps<typeof chipVariants>;

type ChipProps = {
	label: string;
	intent?: TypesChipVariantsType["intent"];
} & TypesChipVariantsType;

function PokedexTypesChip({ intent = "default", label }: ChipProps) {
	return <div className={chipVariants({ intent })}>{label}</div>;
}

export default PokedexTypesChip;
