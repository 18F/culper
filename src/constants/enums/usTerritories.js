const usTerritoriesOptions = [
  { name: 'American Samoa', postalCode: 'AS' },
  { name: 'FQ', postalCode: 'FQ' },
  { name: 'Guam', postalCode: 'GU' },
  { name: 'HQ', postalCode: 'HQ' },
  { name: 'DQ', postalCode: 'DQ' },
  { name: 'JQ', postalCode: 'JQ' },
  { name: 'KQ', postalCode: 'KQ' },
  { name: 'Marshall Islands', postalCode: 'MH' },
  { name: 'Micronesia', postalCode: 'FM' },
  { name: 'MQ', postalCode: 'MQ' },
  { name: 'BQ', postalCode: 'BQ' },
  { name: 'Northern Mariana Islands', postalCode: 'MP' },
  { name: 'Palau', postalCode: 'PW' },
  { name: 'LQ', postalCode: 'LQ' },
  { name: 'Puerto Rico', postalCode: 'PR' },
  { name: 'Virgin Islands', postalCode: 'VI' },
  { name: 'WQ', postalCode: 'WQ' },
]

// Just an array of the postalCodes
export const usTerritoriesValues = usTerritoriesOptions.map(i => i.postalCode)

export default usTerritoriesOptions
