import React from 'react'
import Contacts from '../Contacts'
import {
  DirectActivity,
  IndirectActivity,
  RealEstateActivity,
  BenefitActivity,
  Support,
} from '../Activities'
import {
  Advice,
  Family,
  Employment,
  Ventures,
  Conferences,
  Contact,
  Sponsorship,
  Political,
  Voting,
} from '../Business'
import Travel from '../Travel'

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
      <Contacts {...props} />
      {sectionDivider}
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
      <Advice {...props} />
      {sectionDivider}
      <Family />
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
      <Voting />
      {sectionDivider}
      <Travel />
    </div>
  )
}

export default Review
