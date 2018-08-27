import * as form from '../form'

export const citizenshipPassports = (data = {}) => {
  const items = ((data.Passports || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Has: form.branch(xitem.Has),
        Country: form.country(xitem.Country),
        Issued: form.datecontrol(xitem.Issued),
        Location: form.location(xitem.Location),
        Name: form.name(xitem.Name),
        Number: form.text(xitem.Number),
        Expiration: form.datecontrol(xitem.Expiration),
        Used: form.branch(xitem.Used),
        Countries: form.collection(
          ((xitem.Countries || {}).items || []).map(y => {
            const yitem = y.Item || {}
            return {
              Item: {
                Country: form.country(yitem.Country),
                Dates: form.daterange(yitem.Dates)
              }
            }
          })
        )
      }
    }
  })
  return {
    Passports: form.collection(items)
  }
}
