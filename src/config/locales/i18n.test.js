import {
  extractFromFiles,
  findMissing,
  findUnused,
  findDuplicated
} from 'i18n-extract'
import en from './en'

const flattenLocale = (locale, prefix = '', flattened = {}) => {
  Object.keys(locale).forEach(key => {
    const value = locale[key]

    let fullKey

    if (prefix !== '') {
      fullKey = `${prefix}.${key}`
    } else {
      fullKey = key
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      flattenLocale(value, fullKey, flattened)
    } else {
      flattened[fullKey] = value
    }
  })

  return flattened
}

describe('i18n', () => {
  const markers = ['i18n.t', 'i18n.m']
  const keys = markers.reduce(
    (obj, marker) => [
      ...obj,
      ...extractFromFiles(['../../**/*.jsx'], { marker: marker })
    ],
    []
  )
  const locale = flattenLocale(en)

  it('does not have missing strings', () => {
    const report = findMissing(locale, keys)
    if (report.length) {
      console.log(report)
    }
    expect(report.length).toBe(0)
  })

  it.skip('does not have unused strings', () => {
    const report = findUnused(locale, keys)
    if (report.length) {
      console.log(report)
    }
    expect(report.length).toBe(0)
  })

  it.skip('does not have duplicate strings', () => {
    const report = findDuplicated(locale, keys)
    if (report.length) {
      console.log(report)
    }
    expect(report.length).toBe(0)
  })
})
