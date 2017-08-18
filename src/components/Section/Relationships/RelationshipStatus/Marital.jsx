import React from 'react'
import { i18n } from '../../../../config'
import { Summary, NameSummary, DateSummary } from '../../../Summary'
import { MaritalValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Show, RadioGroup, Radio, Accordion } from '../../../Form'
import CivilUnion from './CivilUnion'
import Divorce from './Divorce'

export default class Marital extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.updateCivilUnion = this.updateCivilUnion.bind(this)
    this.updateDivorcedList = this.updateDivorcedList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Status: this.props.Status,
      CivilUnion: this.props.CivilUnion,
      DivorcedList: this.props.DivorcedList,
      DivorcedListBranch: this.props.DivorcedListBranch,
      ...queue
    })
  }

  updateStatus (values) {
    this.update({
      Status: values.target.value
    })
  }

  updateCivilUnion (values) {
    this.update({
      CivilUnion: values
    })
  }

  updateDivorcedList (values) {
    this.update({
      DivorcedList: values.items,
      DivorcedListBranch: values.branch
    })
  }

  divorceSummary (item, index) {
    const o = (item || {}).Divorce || {}
    const date = DateSummary(o.DateDivorced)
    const name = NameSummary(o.Name)
    return Summary({
      type: i18n.t('relationships.civilUnion.divorce.collection.itemType'),
      index: index,
      left: name,
      right: date,
      placeholder: i18n.m('relationships.relatives.collection.summary.unknown')
    })
  }

  showDivorce () {
    if (['Married', 'InCivilUnion', 'Separated'].includes(this.props.Status)) {
      return (this.props.CivilUnion || {}).Divorced === 'Yes'
    } else if (['Annulled', 'Divorced', 'Widowed'].includes(this.props.Status)) {
      return true
    }

    return false
  }

  render () {
    return (
      <div className="marital">
        <Field title={i18n.t('relationships.marital.heading.title')}>
          <RadioGroup name="status" className="status-options" selectedValue={this.props.Status}>
            <Radio label={i18n.m('relationships.marital.label.status.never')}
                   className="status-never"
                   value="Never"
                   onChange={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.married')}
                   className="status-married"
                   value="Married"
                   onChange={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.inCivilUnion')}
                   className="status-civil-union"
                   value="InCivilUnion"
                   onChange={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.separated')}
                   className="status-separated"
                   value="Separated"
                   onChange={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.annulled')}
                   className="status-annulled"
                   value="Annulled"
                   onChange={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.divorced')}
                   className="status-divorced"
                   value="Divorced"
                   onChange={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.widowed')}
                   className="status-widowed"
                   value="Widowed"
                   onChange={this.updateStatus}
                   onError={this.handleError}
                   />
          </RadioGroup>
        </Field>

        <Show when={['Married', 'InCivilUnion', 'Separated'].includes(this.props.Status)}>
          <CivilUnion name="civilUnion"
                      {...this.props.CivilUnion}
                      onUpdate={this.updateCivilUnion}
                      onError={this.handleError}
                      onSpouseUpdate={this.props.onSpouseUpdate}
                      currentAddress={this.props.currentAddress}
                      defaultState={this.props.defaultState}
                      />
        </Show>
        <Show when={this.showDivorce()}>
          <span id="scrollToDivorce"></span>
          <Accordion scrollTo="scrollToDivorce"
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     items={this.props.DivorcedList}
                     branch={this.props.DivorcedListBranch}
                     onUpdate={this.updateDivorcedList}
                     onError={this.handleError}
                     summary={this.divorceSummary}
                     description={i18n.t('relationships.civilUnion.divorce.collection.description')}
                     appendTitle={i18n.t('relationships.civilUnion.divorce.collection.appendTitle')}
                     appendLabel={i18n.t('relationships.civilUnion.divorce.collection.appendLabel')}>
            <Divorce name="Divorce"
                     bind={true}
                     />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Marital.defaultProps = {
  Status: '',
  CivilUnion: {},
  DivorcedList: [],
  DivorcedListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'relationships',
  subsection: 'status/marital',
  dispatch: () => {},
  validator: (state, props) => {
    return new MaritalValidator(props, props).isValid()
  },
  defaultState: true,
  scrollToBottom: ''
}
