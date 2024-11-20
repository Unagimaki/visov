export const capitalizeWords = (str) => {
    return str
        .toLowerCase() // Приводим к нижнему регистру
        .split(' ') // Разделяем строку на слова
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Приводим первую букву каждого слова к заглавной
        .join(' '); // Объединяем слова обратно в строку
};