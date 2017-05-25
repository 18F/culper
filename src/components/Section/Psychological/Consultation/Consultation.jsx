import React from 'react'
import { i18n } from '../../../../config'
import { ConsultationValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import Order from '../Order'

export default class Consultation extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      Consulted: props.Consulted,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.update = this.update.bind(this)
    this.updateConsulted = this.updateConsulted.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Consulted: this.state.Consulted,
          List: this.state.List,
          ListBranch: this.state.ListBranch
        })
      }
    })
  }

  updateList (values) {
    this.update('List', values.items)
    this.update('ListBranch', values.branch)
  }

  updateConsulted (values) {
    this.update('Consulted', values)
  }

  summary (item, index) {
    const o = (item || {}).Consultation || {}
    const occurred = (o.Occurred || {}).date ? `${o.Occurred.month}/${o.Occurred.year}` : ''
    const courtName = (o.CourtName || {}).value ? o.CourtName.value : null
    const type = i18n.t('psychological.consultation.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="courtname">
          <strong>
            {courtName || i18n.t('psychological.consultation.collection.summaryCourtName')}
          </strong>
        </span>
        <span className="occurred"><strong>{courtName && occurred}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="consultation">
        <h2>{i18n.t('psychological.heading.consultation')}</h2>
        { i18n.m('psychological.heading.consultation2') }
        <Branch name="is_incompetent"
                value={this.state.Consulted}
                onError={this.handleError}
                onUpdate={this.updateConsulted}>
        </Branch>

        <Show when={this.state.Consulted === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.state.List}
                     branch={this.state.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('psychological.consultation.collection.description')}
                     appendTitle={i18n.t('psychological.consultation.collection.appendTitle')}
                     appendLabel={i18n.t('psychological.consultation.collection.appendLabel')}>
            <Order name="Consultation"
                   prefix="consultation"
                   ApplicantBirthDate={this.props.ApplicantBirthDate}
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
  onError: (value, arr) => { return arr },
  section: 'psychological',
  subsection: 'consultations',
  dispatch: () => {},
  validator: (state, props) => {
    return new ConsultationValidator(state, props).isValid()
  }
}
