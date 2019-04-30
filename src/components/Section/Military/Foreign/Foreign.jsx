import React from 'react'

import { MILITARY, MILITARY_FOREIGN } from 'config/formSections/military'
import { i18n } from 'config'

import schema from 'schema'
import validate from 'validators'

import Subsection from 'components/Section/shared/Subsection'
import { BranchCollection } from 'components/Form'
import ForeignService from 'components/Section/Military/Foreign/ForeignService'
import connectMilitarySection from 'components/Section/Military/MilitaryConnector'

const sectionConfig = {
  section: MILITARY.name,
  store: MILITARY.store,
  subsection: MILITARY_FOREIGN.name,
  storeKey: MILITARY_FOREIGN.storeKey,
}

class Foreign extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  updateList = (collection) => {
    this.props.onUpdate(this.storeKey, { List: collection })
  }

  render() {
    const { requireForeignMilitaryMaintainsContact } = this.props

    return (
      <div
        className="section-content foreign"
        data-section={MILITARY.key}
        data-subsection={MILITARY_FOREIGN.key}
      >
        <h1 className="section-header">{i18n.t('military.destination.foreign')}</h1>
        <BranchCollection
          {...this.props.List}
          branchName="has_foreign"
          label={i18n.t('military.foreign.para.served')}
          labelSize="h4"
          appendLabel={i18n.t(
            'military.foreign.collection.foreign.appendTitle',
          )}
          appendSize="h4"
          onUpdate={this.updateList}
          scrollToBottom={this.props.scrollToBottom}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        >
          <ForeignService
            name="Item"
            bind
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            defaultState={this.props.defaultState}
            onError={this.handleError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
            requireMaintainsContact={requireForeignMilitaryMaintainsContact}
          />
        </BranchCollection>
      </div>
    )
  }
}

Foreign.defaultProps = {
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'military',
  subsection: 'foreign',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('military.foreign', data)),
  defaultState: true,
  requireForeignMilitaryMaintainsContact: true,
}

export default connectMilitarySection(Foreign, sectionConfig)
