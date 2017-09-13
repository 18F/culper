import React from 'react'
import { i18n } from '../../../../../config'
import { Summary } from '../../../../Summary'
import { Accordion, Branch, Show } from '../../../../Form'
import { ForeignIndirectActivityValidator, ForeignIndirectInterestValidator } from '../../../../../validators'
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
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasInterests: this.props.HasInterests,
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
    const o = (item || {}).Item || {}
    const firstname = (o.Firstname || {}).value ? o.Firstname.value : ''
    const lastname = (o.Lastname || {}).value ? o.Lastname.value : ''
    const name = `${firstname} ${lastname}`.trim()
    const interestType = (o.InterestType || {}).value ? o.InterestType.value : ''
    const cost = (o.Cost || {}).value ? '$' + o.Cost.value : ''
    const summary = [interestType, name].reduce((prev, next) => {
      if (prev && next) {
        return prev + ' - ' + next
      }
      return prev
    })

    return Summary({
      type: i18n.t('foreign.activities.indirect.collection.itemType'),
      index: index,
      left: summary,
      right: cost,
      placeholder: i18n.m('foreign.activities.indirect.collection.summary')
    })
  }

  render () {
    return (
      <div className="indirect">
        <Branch name="has_interests"
                label={i18n.t('foreign.activities.indirect.heading.title')}
                labelSize="h3"
                value={this.props.HasInterests}
                help="foreign.activities.indirect.help.indirectControl"
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateHasInterests}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasInterests === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={ForeignIndirectInterestValidator}
                     description={i18n.t('foreign.activities.indirect.collection.description')}
                     appendTitle={i18n.t('foreign.activities.indirect.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.activities.indirect.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <IndirectInterest name="Item"
                              addressBooks={this.props.addressBooks}
                              dispatch={this.props.dispatch}
                              bind={true}
                              required={this.props.required}
                              scrollIntoView={this.props.scrollIntoView}
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'activities/indirect',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return new ForeignIndirectActivityValidator(props).isValid()
  },
  scrollToBottom: ''
}
