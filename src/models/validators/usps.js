import { validate } from 'validate.js'
import { api } from 'services/api'

const isSystemError = (data) => {
  if (!data || !data.Errors || !data.Errors.length) {
    return false
  }

  for (let i = 0; i < data.Errors.length; i += 1) {
    const e = data.Errors[i]
    if (e.Error.indexOf('error.geocode.system') > -1) {
      return true
    }
  }

  return false
}

const uspsValidator = (value, attributes) => (
  new validate.Promise((res, rej) => {
    console.log('VALIDATE', attributes)

    api
      .validate({
        type: 'location',
        props: attributes,
      })
      .then((response) => {
        const { data } = response
        if (isSystemError(data)) {
          return rej(data)
        }

        if (!data.Errors || !data.Errors.length) {
          return res({})
        }

        return res(data.Errors[0])
      })
      .catch(() => {
        rej(new Error('Failed to validate address'))
      })
  })
)

export default uspsValidator
