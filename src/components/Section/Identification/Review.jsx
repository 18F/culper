import React from 'react'

import ApplicantName from './ApplicantName'
import ApplicantBirthDate from './ApplicantBirthDate'
import ApplicantBirthPlace from './ApplicantBirthPlace'
import ApplicantSSN from './ApplicantSSN'
import OtherNames from './OtherNames'
import ContactInformation from './ContactInformation'
import Physical from './Physical'

class Review extends React.Component {
  render () {
    const subsectionProps = {
      required: true,
      scrollIntoView: false,
    }

    const sectionDivider = (
      <hr className="section-divider" />
    )

    return (
      <div>
        <ApplicantName {...subsectionProps} />
        {sectionDivider}
        <ApplicantBirthDate {...subsectionProps} />
        {sectionDivider}
        <ApplicantBirthPlace {...subsectionProps}  />
        {sectionDivider}
        <ApplicantSSN {...subsectionProps} />
        {sectionDivider}
        <OtherNames
          {...subsectionProps}
          defaultState={false} />
        {sectionDivider}
        <ContactInformation
          {...subsectionProps}
          shouldFilterEmptyItems={true}
          defaultState={false} />
        {sectionDivider}
        <Physical {...subsectionProps}  />  
      </div>
    )
  }
}

export default Review
