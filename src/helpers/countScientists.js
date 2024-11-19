export const countScientists = (answers) => {
    // Новый массив для хранения результатов
    const result = [];

    // Перебираем каждый объект в массиве answers
    answers.forEach(answer => {
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

    // Приводим все значения text в массиве result к нижнему регистру
    const normalizedResult = result.map(item => ({
        text: item.text.toUpperCase(),
        value: item.value
    }));

    return normalizedResult;
}