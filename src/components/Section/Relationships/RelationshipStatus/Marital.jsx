import React from 'react'
import { i18n } from '../../../../config'
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
    const itemType = i18n.t('relationships.civilUnion.divorce.collection.itemType')
    const o = (item || {}).Divorce || {}
    const date = (o.DateDivorced || {}).date ? `${o.DateDivorced.month}/${o.DateDivorced.year}` : ''
    const status = o.Status || ''
    const name = o.Name
          ? `${o.Name.first || ''} ${o.Name.middle || ''} ${o.Name.last || ''}`.trim()
          : i18n.m('relationships.relatives.collection.summary.unknown')
    return (
      <span>
        <span className="index">{itemType}:</span>
        <span className="info"><strong>{name} {date} {status}</strong></span>
      </span>
    )
  }

  showDivorce () {
    if (['InCivilUnion', 'Separated'].includes(this.props.Status)) {
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

        <Show when={['InCivilUnion', 'Separated'].includes(this.props.Status)}>
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
  defaultState: true
}
