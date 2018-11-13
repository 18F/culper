import { general } from './general'
import { datecontrol } from './datecontrol'
import { textarea } from './textarea'
import { radio } from './radio'
import { checkbox } from './checkbox'
import { country } from './country'
import { number } from './number'
import { branch } from './branch'

export const benefit = (data = {}) => {
  return general('benefit', {
    Began: datecontrol(data.Began),
    End: datecontrol(data.End),
    Frequency: radio(data.Frequency),
    // Required for first "Other" explanation
    OtherFrequencyTypeExplanation: textarea(data.OtherFrequencyTypeExplanation),
    // Required for the nested "Other" explanation within the parent "Other"
    OtherFrequency: textarea(data.OtherFrequency),
    Received: datecontrol(data.Received),
    Country: country(data.Country),
    Value: number(data.Value),
    ValueEstimated: checkbox(data.ValueEstimated),
    Reason: textarea(data.Reason),
    Obligated: branch(data.Obligated),
    ObligatedExplanation: textarea(data.ObligatedExplanation)
  })
}
