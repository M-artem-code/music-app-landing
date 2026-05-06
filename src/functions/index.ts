export { formatDuration } from "./formatDuration";

// Функции для работы с localStorage
export const loadFromLocalStorage = <T>(key: string, fallback: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error(`Ошибка при загрузке данных из ${key}:`, error);
    return fallback;
  }
};

export const saveToLocalStorage = <T>(key: string, data: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Ошибка при сохранении данных в ${key}:`, error);
  }
};
