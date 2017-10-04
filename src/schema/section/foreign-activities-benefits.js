import * as form from '../form'

export const foreignActivitiesBenefits = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        InterestTypes: form.checkboxgroup(x.Item.InterestTypes),
        BenefitType: form.radio(x.Item.BenefitType),
        OtherBenefitType: form.textarea(x.Item.OtherBenefitType),
        BenefitFrequency: form.radio(x.Item.BenefitFrequency),
        OneTimeBenefit: form.benefit(x.Item.OneTimeBenefit),
        FutureBenefit: form.benefit(x.Item.FutureBenefit),
        ContinuingBenefit: form.benefit(x.Item.ContinuingBenefit),
        OtherBenefit: form.textarea(x.Item.OtherBenefit)
      }
    }
  })
  return {
    HasBenefits: form.branch(data.HasBenefits),
    List: form.collection(items, data.ListBranch)
  }
}
