const DAY_MS = 24 * 60 * 60 * 1000;

export function addDays(date: Date, days: number): Date {
	return new Date(date.getTime() + days * DAY_MS);
}

export function subDays(date: Date, days: number): Date {
	return new Date(date.getTime() - days * DAY_MS);
}
