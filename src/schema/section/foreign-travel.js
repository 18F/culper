import * as form from '../form'

export const foreignTravel = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Dates: form.daterange(x.Item.Dates),
        Country: form.country(x.Item.Country),
        Days: form.checkboxgroup(x.Item.Days),
        Purpose: form.checkboxgroup(x.Item.Purpose),
        Questioned: form.branch(x.Item.Questioned),
        QuestionedExplanation: form.textarea(x.Item.QuestionedExplanation),
        Encounter: form.branch(x.Item.Encounter),
        EncounterExplanation: form.textarea(x.Item.EncounterExplanation),
        Contacted: form.branch(x.Item.Contacted),
        ContactedExplanation: form.textarea(x.Item.ContactedExplanation),
        Counter: form.branch(x.Item.Counter),
        CounterExplanation: form.textarea(x.Item.CounterExplanation),
        Interest: form.branch(x.Item.Interest),
        InterestExplanation: form.textarea(x.Item.InterestExplanation),
        Sensitive: form.branch(x.Item.Sensitive),
        SensitiveExplanation: form.textarea(x.Item.SensitiveExplanation),
        Threatened: form.branch(x.Item.Threatened),
        ThreatenedExplanation: form.textarea(x.Item.ThreatenedExplanation)
      }
    }
  })
  return {
    HasForeignTravelOutside: form.branch(data.HasForeignTravelOutside),
    HasForeignTravelOfficial: form.branch(data.HasForeignTravelOfficial),
    List: form.collection(items, data.ListBranch)
  }
}
