export function getHoursPassed(timestamp) {
    const timeDiff = Date.now() - new Date(timestamp).getTime();
    const hoursPassed = Math.floor(timeDiff / (1000 * 60 * 60));
    return hoursPassed;
}
