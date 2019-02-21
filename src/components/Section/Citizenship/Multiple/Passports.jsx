import React from 'react'
import { i18n } from '@config'
import schema from '@schema'
import validate from '@validators'
import Subsection from '@components/Section/shared/Subsection'
import { Field, BranchCollection } from '@components/Form'
import PassportItem from './PassportItem'
import {
  CITIZENSHIP,
  CITIZENSHIP_PASSPORTS
} from '@config/formSections/citizenship'
import connectCitizenshipSection from '../CitizenshipConnector';

const sectionConfig = {
  section: CITIZENSHIP.name,
  store: CITIZENSHIP.store,
  subsection: CITIZENSHIP_PASSPORTS.name,
  storeKey: CITIZENSHIP_PASSPORTS.storeKey
}

class Passports extends Subsection {
  constructor(props) {
    super(props)

    const { section, subsection, store, storeKey } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  update = queue => {
    this.props.onUpdate(this.storeKey, {
      Passports: this.props.Passports,
      ...queue
    })
  }

  updatePassports = values => {
    this.update({
      Passports: values
    })
  }

  render() {
    return (
      <div
        className="section-content passports"
        {...super.dataAttributes()}>
        <h1 className="section-header">{i18n.t('citizenship.destination.passports')}</h1>
        <BranchCollection
          label={i18n.t('citizenship.multiple.heading.hasforeignpassport')}
          appendLabel={i18n.t(
            'citizenship.multiple.collection.passport.appendTitle'
          )}
          className="has-foreignpassport"
          {...this.props.Passports}
          scrollToBottom={this.props.scrollToBottom}
          onUpdate={this.updatePassports}
          scrollIntoView={this.props.scrollIntoView}
          required={this.props.required}
          onError={this.handleError}>
          <PassportItem
            name="Item"
            bind={true}
            defaultState={this.props.defaultState}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </BranchCollection>
      </div>
    )
  }
}

Passports.defaultProps = {
  Passports: { items: [] },
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'citizenship',
  subsection: 'passports',
  dispatch: () => {},
  validator: data => {
    return validate(schema('citizenship.passports', data))
  },
  defaultState: true
}

export default connectCitizenshipSection(Passports, sectionConfig)
