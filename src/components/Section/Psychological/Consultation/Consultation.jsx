import React from 'react'
import { i18n } from '../../../../config'
import schematize from '../../../../schema'
import validate from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { ConsultationValidator, ConsultationOrderValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import Order from '../Order'

export default class Consultation extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateConsulted = this.updateConsulted.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      Consulted: this.props.Consulted,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateConsulted (values) {
    this.update({
      Consulted: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const occurred = DateSummary(o.Occurred || {})
    const courtName = (o.CourtName || {}).value || ''

    return Summary({
      type: i18n.t('psychological.consultation.collection.itemType'),
      index: index,
      left: courtName,
      right: occurred,
      placeholder: i18n.m('psychological.consultation.collection.summaryCourtName')
    })
  }

  render () {
    return (
      <div className="consultation">
        <Branch name="is_incompetent"
                label={i18n.t('psychological.heading.consultation')}
                labelSize="h2"
                value={this.props.Consulted}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateConsulted}
                scrollIntoView={this.props.scrollIntoView}>
        { i18n.m('psychological.heading.consultation2') }
        </Branch>

        <Show when={this.props.Consulted === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={ConsultationOrderValidator}
                     description={i18n.t('psychological.consultation.collection.description')}
                     appendTitle={i18n.t('psychological.consultation.collection.appendTitle')}
                     appendLabel={i18n.t('psychological.consultation.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <Order name="Item"
                   prefix="consultation"
                   ApplicantBirthDate={this.props.ApplicantBirthDate}
                   addressBooks={this.props.addressBooks}
                   dispatch={this.props.dispatch}
                   required={this.props.required}
                   scrollIntoView={this.props.scrollIntoView}
                   bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Consultation.defaultProps = {
  Consulted: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'psychological',
  subsection: 'consultations',
  addressBooks: {},
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schematize('psychological.consultations', props))
  },
  scrollToBottom: ''
}
