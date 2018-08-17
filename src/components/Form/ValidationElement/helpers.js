export const newGuid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}

export const flattenObject = obj => {
  let s = ''
  let what = Object.prototype.toString.call(obj)
  switch (what) {
    case '[object Object]':
      for (let p in obj) {
        if (!obj.hasOwnProperty(p)) {
          continue
        }
        s += (s.length === 0 ? '' : '.') + p + '.' + flattenObject(obj[p])
      }
      break
    case '[object String]':
      s += (s.length === 0 ? '' : '.') + obj
      break
    case '[object Array]':
      obj.forEach(x => {
        s += (s.length === 0 ? '' : '.') + flattenObject(x)
      })
      break
  }

  return s
}

export const mergeError = (previous, error) => {
  let codes = []
  let errorString = flattenObject(error)

  // Clean up any errors which are no longer valid
  previous.forEach(c => {
    if (
      errorString &&
      errorString.endsWith('.') &&
      c.indexOf(errorString) > -1
    ) {
      return
    }

    codes.push(c)
  })

  // Add the error if it does not already exist
  if (
    errorString &&
    errorString.length &&
    !errorString.endsWith('.') &&
    !codes.includes(errorString)
  ) {
    codes.push(errorString)
  }
  return codes
}

export const triageErrors = (section, previous, codes) => {
  let arr = []

  // First we need to persist any error messages stored in the same section
  // but not necessarily within the same scope
  previous.forEach(e => {
    for (let subsection in codes) {
      if (!codes.hasOwnProperty(subsection)) continue
      if (e.indexOf(`${subsection}.`) === -1) {
        arr.push(e.replace(`${section}.`, ''))
      }
    }
  })

  for (let subsection in codes) {
    // skip loop if the property is from prototype
    if (!codes.hasOwnProperty(subsection)) continue

    if (codes[subsection]) {
      for (let prop in codes[subsection]) {
        if (!codes[subsection].hasOwnProperty(prop)) continue

        let e = `${subsection}.` + flattenObject(codes[subsection][prop])
        if (!arr.includes(e)) {
          arr.push(e)
        }
      }
    }
  }
  return arr
}
