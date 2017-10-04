import { general } from './general'
import { textarea } from './textarea'
import { branch } from './branch'
import { daterange } from './daterange'
import { notapplicable } from './notapplicable'

export const sentence = (data = {}) => {
  return general('sentence', {
    Description: textarea(data.Description),
    ExceedsYear: branch(data.ExceedsYear),
    Incarcerated: branch(data.Incarcerated),
    IncarcerationDates: daterange(data.IncarcerationDates),
    IncarcerationDatesNA: notapplicable(data.IncarcerationDatesNA),
    ProbationDates: daterange(data.ProbationDates),
    ProbationDatesNA: notapplicable(data.ProbationDatesNA)
  })
}
