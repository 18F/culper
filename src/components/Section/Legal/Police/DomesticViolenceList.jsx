import React from 'react'
import { i18n } from '../../../../config'
import { DomesticViolenceValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { BranchCollection } from '../../../Form'
import DomesticViolence from './DomesticViolence'

export default class DomesticViolenceList extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        List: this.props.List,
        [field]: values
      })
    }
  }

  updateList (values, event) {
    this.update('List', values)
  }

  render () {
    return (
      <div className="domestic-violence-list">
        <BranchCollection label={i18n.t('legal.police.label.domesticViolence')}
                          labelSize="h2"
                          className="has-order"
                          appendLabel={i18n.m('legal.police.label.domesticViolenceAppend')}
                          items={this.props.List}
                          onError={this.handleError}
                          onUpdate={this.updateList}>
          <DomesticViolence name="domestic"
                            bind={true}
                            onError={this.handleError}
                            />
        </BranchCollection>
      </div>
    )
  }
}

DomesticViolenceList.defaultProps = {
  List: [],
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'police/domesticviolence',
  dispatch: () => {},
  validator: (state, props) => {
    return new DomesticViolenceValidator(props, props).isValid()
  }
}
