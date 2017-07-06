import React from 'react'
import { i18n } from '../../../../../config'
import { Accordion, Branch, Show } from '../../../../Form'
import { ForeignDirectActivityValidator } from '../../../../../validators'
import SubsectionElement from '../../../SubsectionElement'
import DirectInterest from './DirectInterest'

export default class DirectActivity extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasInterests = this.updateHasInterests.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasInterests: this.props.HasInterests,
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateHasInterests (values) {
    this.update({
      HasInterests: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).DirectInterest || {}
    const who = (o.InterestTypes || []).join(', ')
    const interestType = (o.InterestType || {}).value ? o.InterestType.value : ''
    const cost = (o.Cost || {}).value ? '$' + o.Cost.value : ''
    const type = i18n.t('foreign.activities.direct.collection.itemType')

    const summary = [who, interestType].reduce((prev, next) => {
      if (prev && next) {
        return prev + ' - ' + next
      }
      return prev
    })

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="interest">
          <strong>{summary || i18n.m('foreign.activities.direct.collection.summary')}</strong>
        </span>
        <span className="cost">{cost}</span>
      </span>
    )
  }

  render () {
    return (
      <div className="direct">
        <Branch name="has_interests"
                label={<h3>{i18n.t('foreign.activities.direct.heading.title')}</h3>}
                labelSize="h3"
                value={this.props.HasInterests}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateHasInterests}>
          {i18n.m('foreign.activities.direct.para.intro')}
        </Branch>

        <Show when={this.props.HasInterests === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('foreign.activities.direct.collection.description')}
                     appendTitle={i18n.t('foreign.activities.direct.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.activities.direct.collection.appendLabel')}>
            <DirectInterest name="DirectInterest"
                            bind={true}
                            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DirectActivity.defaultProps = {
  name: 'direct',
  HasInterests: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'activities/direct',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignDirectActivityValidator(state, props).isValid()
  }
}
