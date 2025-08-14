/**
 * Encuentra los índices de dos números en un array que suman un valor objetivo
 */
function twoSum(
  numberList: number[],
  targetNumber: number
): [number, number] | null {
  if (numberList.length < 2) {
    throw new Error("Array must contain at least 2 elements");
  }

  // Map para almacenar valor -> índice de elementos ya visitados
  const seen = new Map<number, number>();

  for (let i = 0; i < numberList.length; i++) {
    const currentValue = numberList[i];
    const complement = targetNumber - currentValue;

    // Si encontramos el complemento en elementos previos, tenemos la solución
    if (seen.has(complement)) {
      // Retornamos índice del complemento (que vimos antes) y índice actual
      return [seen.get(complement)!, i];
    }

    // Guardamos el valor actual y su índice para futuras búsquedas
    seen.set(currentValue, i);
  }

  // No se encontró ninguna pareja que sume el targetNumber
  return null;
}
