import React from 'react'

import ApplicantName from './ApplicantName'
import ApplicantBirthDate from './ApplicantBirthDate'
import ApplicantBirthPlace from './ApplicantBirthPlace'

import ApplicantSSN from './ApplicantSSN'
import OtherNames from './OtherNames'
import Physical from './Physical'
import ContactInformation from './ContactInformation'

class Review extends React.Component {
  render () {
    const subsectionProps = {
      required: true,
      scrollIntoView: false,
    }

    return (
      <div>
        <ApplicantName {...subsectionProps} />
        <hr className="section-divider" />
        <ApplicantBirthDate {...subsectionProps} />
        <hr className="section-divider" />
        <ApplicantBirthPlace {...subsectionProps}  />

        {/*  
        <hr className="section-divider" />
        <ApplicantSSN
          name="ssn"
          {...this.props.ApplicantSSN}
          section="identification"
          subsection="ssn"
          dispatch={this.props.dispatch}
          onUpdate={this.props.onUpdate.bind(this, 'ApplicantSSN')}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />
  
        <hr className="section-divider" />
        <OtherNames
          name="othernames"
          {...this.props.OtherNames}
          section="identification"
          subsection="othernames"
          defaultState={false}
          dispatch={this.props.dispatch}
          onUpdate={this.props.onUpdate.bind(this, 'OtherNames')}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />
  
        <hr className="section-divider" />
        <ContactInformation
          name="contacts"
          {...this.props.Contacts}
          section="identification"
          subsection="contacts"
          minimumPhoneNumbers={1}
          minimumEmails={1}
          shouldFilterEmptyItems={true}
          defaultState={false}
          dispatch={this.props.dispatch}
          onUpdate={this.props.onUpdate.bind(this, 'Contacts')}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />
  
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
