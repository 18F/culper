import React from 'react'

import { SUBSTANCE_USE, SUBSTANCE_USE_REVIEW } from 'config/formSections/substanceUse'

import ConnectedNegativeImpacts from '../Alcohol/NegativeImpacts'
import ConnectedOrderedCounselings from '../Alcohol/OrderedCounselings'
import ConnectedVoluntaryCounselings from '../Alcohol/VoluntaryCounselings'
import ConnectedReceivedCounselings from '../Alcohol/ReceivedCounselings'
import ConnectedDrugUses from '../Drugs/DrugUses'
import ConnectedDrugInvolvements from '../Drugs/DrugInvolvements'
import ConnectedDrugClearanceUses from '../Drugs/DrugClearanceUses'
import ConnectedDrugPublicSafetyUses from '../Drugs/DrugPublicSafetyUses'
import ConnectedPrescriptionUses from '../Drugs/PrescriptionUses'
import ConnectedOrderedTreatments from '../Drugs/OrderedTreatments'
import ConnectedVoluntaryTreatments from '../Drugs/VoluntaryTreatments'

import connectSubstanceUseSection from '../SubstanceUseConnector'

const sectionConfig = {
  section: SUBSTANCE_USE.name,
  store: SUBSTANCE_USE.store,
  subsection: SUBSTANCE_USE_REVIEW.name,
}

export const Review = ({
  requireDrugWhileSafetySection,
  requireDrugWithClearanceSection,
  requireAlcoholSections,
  requireAlcoholAdditionalInstances,
}) => {
  const props = {
    required: true,
    scrollIntoView: false,
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

  return (
    <div>
      <ConnectedDrugUses {...props} />
      {sectionDivider}
      <ConnectedDrugInvolvements {...props} />

      {requireDrugWithClearanceSection && (
        <span>
          {sectionDivider}
          <ConnectedDrugClearanceUses {...props} />
        </span>
      )}

      {requireDrugWhileSafetySection && (
        <span>
          {sectionDivider}
          <ConnectedDrugPublicSafetyUses {...props} />
        </span>
      )}

      {sectionDivider}
      <ConnectedPrescriptionUses {...props} />
      {sectionDivider}
      <ConnectedOrderedTreatments {...props} />
      {sectionDivider}
      <ConnectedVoluntaryTreatments {...props} />

      {requireAlcoholSections && (
        <span>
          {sectionDivider}
          <ConnectedNegativeImpacts {...props} />
          {sectionDivider}
          <ConnectedOrderedCounselings {...props} />
          {sectionDivider}
          <ConnectedVoluntaryCounselings {...props} />
          {sectionDivider}
          {requireAlcoholAdditionalInstances && (
            <ConnectedReceivedCounselings {...props} />
          )}
        </span>
      )}
    </div>
  )
}

export default connectSubstanceUseSection(Review, sectionConfig)
