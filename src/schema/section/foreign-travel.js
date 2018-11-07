import * as form from '../form'

export const foreignTravel = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Dates: form.daterange(xitem.Dates),
        Country: form.country(xitem.Country),
        Days: form.radio(xitem.Days),
        Purpose: form.checkboxgroup(xitem.Purpose),
        Questioned: form.branch(xitem.Questioned),
        QuestionedExplanation: form.textarea(xitem.QuestionedExplanation),
        Encounter: form.branch(xitem.Encounter),
        EncounterExplanation: form.textarea(xitem.EncounterExplanation),
        Contacted: form.branch(xitem.Contacted),
        ContactedExplanation: form.textarea(xitem.ContactedExplanation),
        Counter: form.branch(xitem.Counter),
        CounterExplanation: form.textarea(xitem.CounterExplanation),
        Interest: form.branch(xitem.Interest),
        InterestExplanation: form.textarea(xitem.InterestExplanation),
        Sensitive: form.branch(xitem.Sensitive),
        SensitiveExplanation: form.textarea(xitem.SensitiveExplanation),
        Threatened: form.branch(xitem.Threatened),
        ThreatenedExplanation: form.textarea(xitem.ThreatenedExplanation)
      }
    }
  })
  return {
    HasForeignTravelOutside: form.branch(data.HasForeignTravelOutside),
    HasForeignTravelOfficial: form.branch(data.HasForeignTravelOfficial),
    List: form.collection(items, (data.List || {}).branch)
  }
}
