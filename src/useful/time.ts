export function sleep(ms: number = 3000 + Math.random() * 1500): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}