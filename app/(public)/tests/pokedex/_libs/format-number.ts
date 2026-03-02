const formatNumber = (number: number) => {
	return `No.${number.toString().padStart(4, "0")}`;
};

export default formatNumber;
