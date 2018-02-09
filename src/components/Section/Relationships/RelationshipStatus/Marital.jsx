import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, NameSummary, DateSummary } from '../../../Summary'
import { MaritalValidator, DivorceValidator } from '../../../../validators'
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
      ...queue
    })
  }

  updateStatus (values) {
    this.update({
      Status: values
    })
  }

  updateCivilUnion (values) {
    this.update({
      CivilUnion: values
    })
  }

  updateDivorcedList (values) {
    this.update({
      DivorcedList: values
    })
  }

  divorceSummary (item, index) {
    const o = (item || {}).Item || {}
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
    const status = (this.props.Status || {}).value
    const divorced = ((this.props.CivilUnion || {}).Divorced || {}).value

    if (['Married', 'InCivilUnion', 'Separated'].includes(status)) {
      return divorced === 'Yes'
    } else if (['Annulled', 'Divorced', 'Widowed'].includes(status)) {
      return true
    }

    return false
  }

  render () {
    return (
      <div className="marital">
        <Field title={i18n.t('relationships.marital.heading.title')}
          scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup name="status" className="status-options" selectedValue={this.props.Status.value} required={this.props.required} onError={this.handleError}>
            <Radio label={i18n.m('relationships.marital.label.status.never')}
                   className="status-never"
                   value="Never"
                   onUpdate={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.married')}
                   className="status-married"
                   value="Married"
                   onUpdate={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.inCivilUnion')}
                   className="status-civil-union"
                   value="InCivilUnion"
                   onUpdate={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.separated')}
                   className="status-separated"
                   value="Separated"
                   onUpdate={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.annulled')}
                   className="status-annulled"
                   value="Annulled"
                   onUpdate={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.divorced')}
                   className="status-divorced"
                   value="Divorced"
                   onUpdate={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.widowed')}
                   className="status-widowed"
                   value="Widowed"
                   onUpdate={this.updateStatus}
                   onError={this.handleError}
                   />
          </RadioGroup>
        </Field>

        <Show when={['Married', 'InCivilUnion', 'Separated'].includes(this.props.Status.value)}>
          <CivilUnion name="civilUnion"
                      {...this.props.CivilUnion}
                      onUpdate={this.updateCivilUnion}
                      onError={this.handleError}
                      onSpouseUpdate={this.props.onSpouseUpdate}
                      applicantBirthdate={this.props.applicantBirthdate}
                      addressBooks={this.props.addressBooks}
                      currentAddress={this.props.currentAddress}
                      dispatch={this.props.dispatch}
                      defaultState={this.props.defaultState}
                      required={this.props.required}
                      scrollIntoView={this.props.scrollIntoView}
                      />
        </Show>
        <Show when={this.showDivorce()}>
          <p>{i18n.t('relationships.civilUnion.divorce.para.intro')}</p>
          <Accordion scrollTo="scrollToDivorce"
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     {...this.props.DivorcedList}
                     onUpdate={this.updateDivorcedList}
                     onError={this.handleError}
                     required={this.props.required}
                     validator={DivorceValidator}
                     scrollIntoView={this.props.scrollIntoView}
                     summary={this.divorceSummary}
                     description={i18n.t('relationships.civilUnion.divorce.collection.description')}
                     appendTitle={i18n.t('relationships.civilUnion.divorce.collection.appendTitle')}
                     appendLabel={i18n.t('relationships.civilUnion.divorce.collection.appendLabel')}>
            <Divorce name="Item"
                     bind={true}
                     applicantBirthdate={this.props.applicantBirthdate}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}
                     />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Marital.defaultProps = {
  Status: {},
  CivilUnion: {},
  DivorcedList: Accordion.defaultList,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'relationships',
  subsection: 'status/marital',
  applicantBirthdate: {},
  addressBooks: {},
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('relationships.status.marital', props))
  },
  defaultState: true,
  scrollToBottom: ''
}
