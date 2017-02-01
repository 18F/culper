import en from './en'

const locales = { en }

class I18n {
  t (id) {
    let locale = 'en'

    try {
      let text = id.split('.').reduce((o, i) => o[i], locales[locale]) || ''
      let what = Object.prototype.toString.call(text)
      if (!text || text === '' || what !== '[object String]') {
        throw new Object('Could not find ' + id)
      }
      return text
    } catch (e) {
      return locale + '.' + id
    }
  }
}

const i18n = new I18n()
export default i18n
