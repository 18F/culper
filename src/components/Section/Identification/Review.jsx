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

        {/*  

        <hr className="section-divider" />
        <Physical
          name="physical"
          {...this.props.Physical}
          section="identification"
          subsection="physical"
          dispatch={this.props.dispatch}
          onUpdate={this.props.onUpdate.bind(this, 'Physical')}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />*/}
      </div>
    )
  }
}

export default Review
