import * as form from '../form'

export const militarySelective = (data = {}) => {
  return {
    WasBornAfter: form.branch(data.WasBornAfter),
    HasRegistered: form.branch(data.HasRegistered),
    HasRegisteredNotApplicable: form.notapplicable(
      data.HasRegisteredNotApplicable
    ),
    RegistrationNumber: form.text(data.RegistrationNumber),
    Explanation: form.textarea(data.Explanation)
  }
}
