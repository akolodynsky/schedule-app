export function generateUniqueId (name: string): string {
    return `${name}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}