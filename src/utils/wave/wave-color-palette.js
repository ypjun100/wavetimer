// get color code
export function getFrontWaveColor(theme) {
    if(theme === "light") {
        return 0x8fc2ff;
    } else if(theme === "dark") {
        return 0x65a3eb;
    }
}

export function getBackWaveColor(theme) {
    if(theme === "light") {
        return 0x87b1e3;
    } else if(theme === "dark") {
        return 0x4a7bb5;
    }
}