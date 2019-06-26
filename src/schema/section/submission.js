import * as form from '../form'

export const submission = (data = {}) => {
  const attachments = data.Attachments || {}
  let attachmentType = attachments.AttachmentType || {}
  if (attachmentType.value === 'Other') {
    attachmentType = attachments.OtherMethod || {}
  }

  return {
    AdditionalComments: form.general('submission.additionalcomments', {
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
    }),
    Attachments: form.general('submission.attachments', {
      Method: form.text(attachmentType)
    })
  }
}
