import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "urtfszkmtgmcqrnchihz.supabase.co",
			},
			{
				protocol: "https",
				hostname: "oaidalleapiprodscus.blob.core.windows.net",
			},
		],
	},
	transpilePackages: ["three"],
};

export default nextConfig;
