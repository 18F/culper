import React from 'react'
import NegativeImpacts from '../Alcohol/NegativeImpacts'
import OrderedCounselings from '../Alcohol/OrderedCounselings'
import VoluntaryCounselings from '../Alcohol/VoluntaryCounselings'
import ReceivedCounselings from '../Alcohol/ReceivedCounselings'
import DrugUses from '../Drugs/DrugUses'
import DrugInvolvements from '../Drugs/DrugInvolvements'
import DrugClearanceUses from '../Drugs/DrugClearanceUses'
import DrugPublicSafetyUses from '../Drugs/DrugPublicSafetyUses'
import PrescriptionUses from '../Drugs/PrescriptionUses'
import OrderedTreatments from '../Drugs/OrderedTreatments'
import VoluntaryTreatments from '../Drugs/VoluntaryTreatments'

const Review = () => {
  const props = {
    required: true,
    scrollIntoView: false,
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

  return (
    <div>
      <DrugUses {...props} />
      {sectionDivider}
      <DrugInvolvements {...props} />
      {sectionDivider}
      <DrugClearanceUses {...props} />
      {sectionDivider}
      <DrugPublicSafetyUses {...props} />
      {sectionDivider}
      <PrescriptionUses {...props} />
      {sectionDivider}
      <OrderedTreatments {...props} />
      {sectionDivider}
      <VoluntaryTreatments {...props} />
      {sectionDivider}
      <NegativeImpacts {...props} />
      {sectionDivider}
      <OrderedCounselings {...props} />
      {sectionDivider}
      <VoluntaryCounselings {...props} />
      {sectionDivider}
      <ReceivedCounselings {...props} />
    </div>
  )
}

export default Review
