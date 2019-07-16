import React from 'react'

import { FOREIGN, FOREIGN_REVIEW } from 'config/formSections/foreign'

import Contacts from '../Contacts'
import {
  DirectActivity, IndirectActivity, RealEstateActivity, BenefitActivity, Support,
} from '../Activities'
import {
  Advice, Family, Employment, Ventures, Conferences, Contact, Sponsorship, Political, Voting,
} from '../Business'
import Travel from '../Travel'

import connectForeignSection from '../ForeignConnector'

const sectionConfig = {
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_REVIEW.name,
}

export const Review = ({
  requireForeignContactsSection,
  requireForeignActivitiesSection,
  requireForeignBusinessSection,
  requireForeignTravelSection,
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
      {requireForeignContactsSection && (
        <span>
          <Contacts {...props} />
          {sectionDivider}
        </span>
      )}

      {requireForeignActivitiesSection && (
        <span>
          <DirectActivity {...props} />
          {sectionDivider}
          <IndirectActivity {...props} />
          {sectionDivider}
          <RealEstateActivity {...props} />
          {sectionDivider}
          <BenefitActivity {...props} />
          {sectionDivider}
          <Support {...props} />
          {sectionDivider}
        </span>
      )}

      {requireForeignBusinessSection && (
        <span>
          <Advice {...props} />
          {sectionDivider}
          <Family {...props} />
          {sectionDivider}
          <Employment {...props} />
          {sectionDivider}
          <Ventures {...props} />
          {sectionDivider}
          <Conferences {...props} />
          {sectionDivider}
          <Contact {...props} />
          {sectionDivider}
          <Sponsorship {...props} />
          {sectionDivider}
          <Political {...props} />
          {sectionDivider}
          <Voting {...props} />
          {sectionDivider}
        </span>
      )}

      {requireForeignTravelSection && (
        <Travel {...props} />
      )}
    </div>
  )
}

export default connectForeignSection(Review, sectionConfig)
