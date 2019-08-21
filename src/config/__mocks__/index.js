import { i18n } from 'config/locales'

const env = {
  SamlEnabled: () => true,
  BasicAuthenticationEnabled: () => true,
  SessionTimeout: () => 30,
}

export {
  env,
  i18n,
}
