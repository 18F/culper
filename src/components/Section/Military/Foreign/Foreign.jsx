import React from 'react'

import { MILITARY, MILITARY_FOREIGN } from 'config/formSections/military'
import { i18n } from 'config'

import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import { BranchCollection } from 'components/Form'
import ForeignService from 'components/Section/Military/Foreign/ForeignService'

const sectionConfig = {
  key: MILITARY_FOREIGN.key,
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
            bind={true}
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
  defaultState: true,
  requireForeignMilitaryMaintainsContact: true,
  errors: [],
}

export default connectSubsection(Foreign, sectionConfig)
