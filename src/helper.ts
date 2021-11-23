// credit: https://dev.to/oyetoket/fastest-way-to-generate-random-strings-in-javascript-2k5a

export const generateRandomString = (length: number) => {
  return Math.random().toString(20).substr(2, length);
};


export const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}