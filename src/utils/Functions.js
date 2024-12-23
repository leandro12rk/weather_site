
export const compareActualActiveTimeDate = (
  activeDateTime,
  currenteDateTime
) => {
  const activeTime = new Date(activeDateTime);
  const currenteTime = new Date(currenteDateTime);

    // Validar si la fecha ingresada es válida
    if (isNaN(activeTime.getTime())&&isNaN( currenteTime .getTime())) {
      return false; // Fecha no válida
    }
  // Calcular el rango
  const startRange = new Date(activeTime); // Hora exacta ingresada
  const endRange = new Date(activeTime.getTime() + 60 * 60 * 1000); // Una hora después

  return activeTime.getHours() === currenteTime.getHours() && activeTime >= startRange && activeTime <= endRange;
};

// const test = compareActualActiveTimeDate(
//   "2024-12-23 21:30",
//   "2024-12-23 21:00"
// );
// console.log(test);
