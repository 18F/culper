import * as form from '../form'

export const citizenshipPassports = (data = {}) => {
  const items = (data.Passports || []).map(x => {
    return {
      Item: {
        Country: form.country(x.Item.Country),
        Issued: form.datecontrol(x.Item.Issued),
        Location: form.location(x.Item.Location),
        Name: form.name(x.Item.Name),
        Number: form.text(x.Item.Number),
        Expiration: form.datecontrol(x.Item.Expiration),
        Used: form.branch(x.Item.Used),
        Countries: form.collection((x.Item.Countries || []).map(y => {
          return {
            Item: {
              Country: form.country(y.Item.Country),
              Dates: form.daterange(y.Item.Dates)
            }
          }
        }))
      }
    }
  })
  return {
    Passports: form.collection(items)
  }
}
