import { capitalizeWords } from "./capitalizeWords";

export const countScientists = (answers) => {
    // Новый массив для хранения результатов
    const result = [];

    // Перебираем каждый объект в массиве answers
    answers.forEach(answer => {
        // Проверяем, существует ли поле scientist
        if (!answer.scientist) {
            return; // Если поле отсутствует, пропускаем текущую итерацию
        }

        // Приводим имя ученого к нижнему регистру
        const scientistName = answer.scientist.toLowerCase();

        // Проверяем, существует ли уже объект с таким же текстом в новом массиве
        const existingEntry = result.find(item => item.text === scientistName);

        if (existingEntry) {
            // Если объект существует, увеличиваем значение value на 1
            existingEntry.value += 1;
        } else {
            // Если объекта нет, создаем новый объект и добавляем его в массив
            result.push({ text: scientistName, value: 1 });
        }
    });

    // Приводим все значения text в массиве result к верхнему регистру
    const normalizedResult = result.map(item => ({
        text: capitalizeWords(item.text),
        value: item.value
    }));

    return normalizedResult;
}