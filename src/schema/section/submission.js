import * as form from '../form'

export const submission = (data = {}) => {
  return {
    AdditionalComments: {
      AdditionalComments: form.textarea((data.AdditionalComments || {}).AdditionalComments),
      Signature: form.signature((data.AdditionalComments || {}).Signature)
    },
    General: {
      Signature: form.signature((data.General || {}).Signature)
    },
    Medical: {
      Signature: form.signature((data.Medical || {}).Signature)
    },
    Credit: {
      Signature: form.signature((data.Credit || {}).Signature)
    }
  }
}
