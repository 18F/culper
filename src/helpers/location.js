export const isPO = location => (
  location.country === 'POSTOFFICE'
)

export const isUS = location => (
  location.country === 'United States'
)

export const isInternational = location => (
  !isPO(location) && !isUS(location)
)
