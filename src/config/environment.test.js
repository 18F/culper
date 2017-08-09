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

  it('Returns OAuth Endpoint', () => {
    const expected = 'github'
    expect(env.EndpointOAuth(expected)).toBe(`/auth/${expected}`)
  })

  it('returns save endpoint', () => {
    expect(env.EndpointSave({})).toBe(`/save`)
  })

  it('Returns ValidateSSN Endpoint', () => {
    const expected = '000112222'
    expect(env.EndpointValidateSSN(expected)).toBe(`/validate/ssn/${expected}`)
  })

  it('Returns ValidatePassport Endpoint', () => {
    const expected = 'A1234567'
    expect(env.EndpointValidatePassport(expected)).toBe(`/validate/passport/${expected}`)
  })

  it('Returns ValidateZipcode Endpoint', () => {
    const expected = '22202'
    expect(env.EndpointValidateZipcode(expected)).toBe(`/validate/zipcode/${expected}`)
  })

  it('Returns ValidateAddress Endpoint', () => {
    const expected = '/validate/address'
    expect(env.EndpointValidateAddress()).toBe(expected)
  })

  it('Returns ValidateName Endpoint', () => {
    const expected = '/validate/name'
    expect(env.EndpointValidateName()).toBe(expected)
  })

  it('Returns ValidateApplicantBirthdate Endpoint', () => {
    const expected = '/validate/applicant/birthdate'
    expect(env.EndpointValidateApplicantBirthdate()).toBe(expected)
  })

  it('Reads api base url', () => {
    const expected = '/base'
    process.env.API_BASE_URL = expected
    expect(env.ApiBaseURL()).toBe(expected)
  })
})
