export const timeout = (fn, milliseconds = 400, w = window) => {
  if (!w) {
    return
  }

  w.setTimeout(fn, milliseconds)
}

export const country = (obj) => {
  if (obj === null) {
    return null
  }

  if (obj instanceof Object) {
    if ('value' in obj) {
      return obj.value
    }
  }

  return obj
}

export const countryValueResolver = (props) => {
  if (typeof props.country === 'string') {
    let valueArr = props.country ? [props.country] : []
    let comments = props.countryComments || ''
    return {
      value: valueArr,
      comments: comments
    }
  }
  return props.country
}
