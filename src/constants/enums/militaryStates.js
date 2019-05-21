const militaryStatesOptions = [
  { name: 'U.S. Armed Forces - Americas', postalCode: 'AA' },
  { name: 'U.S. Armed Forces - Europe', postalCode: 'AE' },
  { name: 'U.S. Armed Forces - Pacific', postalCode: 'AP' },
]

// Just an array of the postalCodes
export const militaryStatesValues = militaryStatesOptions.map(i => i.postalCode)

export default militaryStatesOptions
