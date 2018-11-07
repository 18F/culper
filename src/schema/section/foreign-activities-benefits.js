import * as form from '../form'

export const foreignActivitiesBenefits = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        InterestTypes: form.checkboxgroup(xitem.InterestTypes),
        BenefitType: form.radio(xitem.BenefitType),
        OtherBenefitType: form.textarea(xitem.OtherBenefitType),
        BenefitFrequency: form.radio(xitem.BenefitFrequency),
        OneTimeBenefit: form.benefit(xitem.OneTimeBenefit),
        FutureBenefit: form.benefit(xitem.FutureBenefit),
        ContinuingBenefit: form.benefit(xitem.ContinuingBenefit),
        OtherBenefit: form.benefit(xitem.OtherBenefit)
      }
    }
  })
  return {
    HasBenefits: form.branch(data.HasBenefits),
    List: form.collection(items, (data.List || {}).branch)
  }
}
