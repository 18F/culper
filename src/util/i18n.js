import i18next from 'i18next'

import { renderMarkdown, removeMarkdown } from 'util/markdown'
import en from 'config/locales/en'

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: { translation: en },
  },
  joinArrays: '\n',
})

const t = (key, opts) => {
  const string = i18next.t(key, opts)
  return removeMarkdown(string)
}

const markdownOptions = {
  joinArrays: '\n\n',
}

const m = (key, opts) => {
  const markdownString = i18next.t(key, { ...markdownOptions, ...opts })
  return renderMarkdown(markdownString)
}

export default {
  t,
  m,
}
