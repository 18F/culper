import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { CitizenshipPassportsValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, BranchCollection } from '../../../Form'
import PassportItem from './PassportItem'

export default class Passports extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updatePassports = this.updatePassports.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Passports: this.props.Passports,
      ...queue
    })
  }

  updatePassports (values) {
    this.update({
      Passports: values
    })
  }

  render () {
    return (
      <div className="passports">
        <Field title={i18n.t('citizenship.multiple.heading.passport.title')}
               titleSize="h2"
               optional={true}
               className="no-margin-bottom"
               />

        <BranchCollection label={i18n.t('citizenship.multiple.heading.hasforeignpassport')}
                          appendLabel={i18n.t('citizenship.multiple.collection.passport.appendTitle')}
                          className="has-foreignpassport"
                          {...this.props.Passports}
                          scrollToBottom={this.props.scrollToBottom}
                          onUpdate={this.updatePassports}
                          scrollIntoView={this.props.scrollIntoView}
                          required={this.props.required}
                          onError={this.handleError}>
          <PassportItem name="Item"
                        bind={true}
                        defaultState={this.props.defaultState}
                        required={this.props.required}
                        applicantBirthdate={this.props.applicantBirthdate}
                        scrollIntoView={this.props.scrollIntoView} />
        </BranchCollection>
      </div>
    )
  }
}

Passports.defaultProps = {
  Passports: { items: [] },
  applicantBirthdate: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'citizenship',
  subsection: 'passports',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('citizenship.passports', props))
  },
  defaultState: true
}
