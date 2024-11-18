export const calculateNumFromProcent = (fontSize, windowWidth) => {
    if (windowWidth === 0) {
    console.error("calculatePercentage func: Width cannot be zero.");
    }
    if (fontSize === 0) {
        console.error("calculatePercentage func: fontSize cannot be zero.");
    }
    const num = (windowWidth / 100) * fontSize
    return num
}