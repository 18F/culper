import * as form from '../form'

export const submission = (data = {}) => {
  return {
    AdditionalComments: form.general('submission.additionalcomments', {
      AdditionalComments: form.textarea((data.AdditionalComments || {}).AdditionalComments),
      Signature: form.signature((data.AdditionalComments || {}).Signature)
    }),
    General: form.general('submission.general', {
      Signature: form.signature((data.General || {}).Signature)
    }),
    Medical: form.general('submission.medical', {
      Signature: form.signature((data.Medical || {}).Signature)
    }),
    Credit: form.general('submission.credit', {
      Signature: form.signature((data.Credit || {}).Signature)
    })
  }
}
