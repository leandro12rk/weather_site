export const compareDateWithNow = (dateString) => {
  const inputDate = new Date(dateString); // Crear un objeto Date con la fecha dada
  const now = new Date(); // Obtener la fecha y hora actuales

  // Validar si la fecha ingresada es válida
  if (isNaN(inputDate.getTime())) {
    return false; // Fecha no válida
  }

  // Calcular el rango
  const startRange = new Date(inputDate); // Hora exacta ingresada
  const endRange = new Date(inputDate.getTime() + 60 * 60 * 1000); // Una hora después

  // Comparar la fecha actual con el rango
  return now >= startRange && now <= endRange;
};

// Prueba
const dateToCompare = "2024-12-18 03:00";
console.log(compareDateWithNow(dateToCompare)); // true o false
