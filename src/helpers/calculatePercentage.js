export const calculatePercentage = (windowWidth, fontSize) => {    
    if (windowWidth === 0) {
        console.error("calculatePercentage func: Width cannot be zero.");
    }
    if (fontSize === 0) {
        console.error("calculatePercentage func: fontSize cannot be zero.");
    }
    
    const percentage = 100 / (windowWidth / fontSize);  
    return percentage;
}
