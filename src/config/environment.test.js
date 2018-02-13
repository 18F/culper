import env from './environment'

describe('The enviroment config', () => {
  it('Returns Basic Authentication Endpoint', () => {
    expect(env.EndpointBasicAuthentication()).toBe('/auth/basic')
  })

  it('Returns Two Factor Endpoint', () => {
    const expected = 'foo'
    expect(env.EndpointTwoFactor(expected)).toBe(`/2fa/${expected}`)
  })

  it('Returns Two Factor Verify Endpoint', () => {
    const expected = 'foo'
    expect(env.EndpointTwoFactorVerify(expected)).toBe(`/2fa/${expected}/verify`)
  })

  it('Returns Two Factor Reset Endpoint', () => {
    const expected = 'foo'
    expect(env.EndpointTwoFactorReset(expected)).toBe(`/2fa/${expected}/reset`)
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
