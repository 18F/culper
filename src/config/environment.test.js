import env from './environment'

describe('The enviroment config', () => {
  it('Returns Basic Authentication Endpoint', () => {
    expect(env.EndpointBasicAuthentication()).toBe('/auth/basic')
  })

  it('Returns Two Factor Endpoint', () => {
    expect(env.EndpointTwoFactor()).toBe('/2fa/')
  })

  it('Returns Two Factor Verify Endpoint', () => {
    expect(env.EndpointTwoFactorVerify()).toBe('/2fa/verify')
  })

  it('Returns Two Factor Reset Endpoint', () => {
    expect(env.EndpointTwoFactorReset()).toBe('/2fa/reset')
  })

  it('returns save endpoint', () => {
    expect(env.EndpointSave({})).toBe(`/me/save`)
  })

  it('returns validation endpoint', () => {
    expect(env.EndpointValidate({})).toBe(`/me/validate`)
  })

  it('Reads api base url', () => {
    const expected = '/base'
    process.env.API_BASE_URL = expected
    expect(env.ApiBaseURL()).toBe(expected)
  })
})
