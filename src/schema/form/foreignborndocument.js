import { general } from './general'
import { radio } from './radio'
import { textarea } from './textarea'
import { text } from './text'
import { datecontrol } from './datecontrol'
import { notapplicable } from './notapplicable'

export const foreignborndocument = (data = {}) => {
  return general('foreignborndocument', {
    DocumentType: radio(data.DocumentType),
    OtherExplanation: textarea(data.OtherExplanation),
    DocumentNumber: text(data.DocumentNumber),
    DocumentExpiration: datecontrol(data.DocumentExpiration),
    DocumentExpirationNotApplicable: notapplicable(
      data.DocumentExpirationNotApplicable
    )
  })
}
