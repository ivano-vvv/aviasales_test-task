export function askConfirmation(message: string): boolean {
    return window.confirm(message);
}