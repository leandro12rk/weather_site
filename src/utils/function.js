const compareDateWithNow = (dateString) => {
    const inputDate = new Date(dateString); // Crear un objeto Date con la fecha dada
    const now = new Date(); // Obtener la fecha y hora actuales
    
    // Validar si la fecha ingresada es válida
    if (isNaN(inputDate.getTime())) {
      return "La fecha ingresada no es válida.";
    }
  
    // Comparar la fecha ingresada con la actual
    if (inputDate > now) {
      return "La fecha es futura.";
    } else if (inputDate < now) {
      return "La fecha es pasada.";
    } else {
      return "La fecha es igual a la actual.";
    }
  };
  
  // Prueba
  const dateToCompare = "2024-12-18 03:00";
  console.log(compareDateWithNow(dateToCompare));
  