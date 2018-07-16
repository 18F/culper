import env from './environment'

describe('The enviroment config', () => {
  it('Returns Basic Authentication Endpoint', () => {
    expect(env.EndpointBasicAuthentication()).toBe('/auth/basic')
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
