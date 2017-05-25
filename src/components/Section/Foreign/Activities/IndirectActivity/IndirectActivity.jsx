import React from 'react'
import { i18n } from '../../../../../config'
import { Accordion, ValidationElement, Branch, Show } from '../../../../Form'
import { ForeignIndirectActivityValidator } from '../../../../../validators'
import SubsectionElement from '../../../SubsectionElement'
import IndirectInterest from './IndirectInterest'

export default class IndirectActivity extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasInterests = this.updateHasInterests.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        HasInterests: this.props.HasInterests
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateList (values) {
    this.update([
      { name: 'List', value: values.items },
      { name: 'ListBranch', value: values.branch }
    ])
  }

  updateHasInterests (values) {
    this.update([
      { name: 'HasInterests', value: values }
    ])
  }

  summary (item, index) {
    const o = (item || {}).IndirectInterest || {}
    const firstname = (o.Firstname || {}).value ? o.Firstname.value : ''
    const lastname = (o.Lastname || {}).value ? o.Lastname.value : ''
    const name = `${firstname} ${lastname}`.trim()
    const interestType = (o.InterestType || {}).value ? o.InterestType.value : ''
    const cost = (o.Cost || {}).value ? '$' + o.Cost.value : ''
    const type = i18n.t('foreign.activities.indirect.collection.itemType')

    const summary = [interestType, name].reduce((prev, next) => {
      if (prev && next) {
        return prev + ' - ' + next
      }
      return prev
    })

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="interest">
          <strong>{summary || i18n.t('foreign.activities.indirect.collection.summary')}</strong>
        </span>
        <span className="cost">{cost}</span>
      </span>
    )
  }

  render () {
    return (
      <div className="indirect">
        <Branch name="has_interests"
                label={i18n.t('foreign.activities.indirect.heading.title')}
                labelSize="h3"
                value={this.props.HasInterests}
                onError={this.handleError}
                onUpdate={this.updateHasInterests}>
        </Branch>

        <Show when={this.props.HasInterests === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('foreign.activities.indirect.collection.description')}
                     appendTitle={i18n.t('foreign.activities.indirect.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.activities.indirect.collection.appendLabel')}>
            <IndirectInterest name="IndirectInterest"
                              bind={true}
                              />
          </Accordion>
        </Show>
      </div>
    )
  }
}

IndirectActivity.defaultProps = {
  name: 'indirect',
  HasInterests: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'activities/indirect',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignIndirectActivityValidator(state, props).isValid()
  }
}
