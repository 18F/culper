import i18n from 'util/i18n'

const env = {
  SamlEnabled: () => true,
  BasicAuthenticationEnabled: () => true,
  SessionTimeout: () => 30,
}

export {
  env,
  i18n,
}
