export function showError(
	domain: string,
	message: string,
	additionalInfo?: unknown
): void {
	console.error(`${domain}: ${message}`);
	if (additionalInfo) {
		console.error(additionalInfo);
	}
}
