export const guaranteeInt = (
  value: unknown,
  fallback: number,
  base = 10
): number => {
  const maybeInt = tryForInt(value, base)
  if (typeof maybeInt === 'number') {
    return maybeInt
  }
  return fallback
}

export const tryForInt = (value: unknown, base = 10): number | void => {
  if (typeof value === 'number') {
    return Math.floor(value)
  }
  if (typeof value === 'string') {
    try {
      return parseInt(value, base)
    } catch (_error) {
      return undefined
    }
  }
  return undefined
}
