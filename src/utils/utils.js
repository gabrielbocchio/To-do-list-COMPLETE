export const generateRandomId = () => {
    const timestamp = Date.now().toString();
    const random = Math.ceil(Math.random() * 1000000).toString();
    return timestamp + random;
  }

  export function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }