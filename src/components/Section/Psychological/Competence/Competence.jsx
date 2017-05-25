import React from 'react'
import { i18n } from '../../../../config'
import { CompetenceValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import Order from '../Order'

export default class Competence extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      IsIncompetent: props.IsIncompetent,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.update = this.update.bind(this)
    this.updateIsIncompentent = this.updateIsIncompentent.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          IsIncompetent: this.state.IsIncompetent,
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

  updateIsIncompentent (values) {
    this.update('IsIncompetent', values)
  }

  summary (item, index) {
    const o = (item || {}).Competence || {}
    const occurred = (o.Occurred || {}).date ? `${o.Occurred.month}/${o.Occurred.year}` : ''
    const courtName = (o.CourtName || {}).value ? o.CourtName.value : null
    const type = i18n.t('psychological.competence.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="courtname">
          <strong>{courtName || i18n.t('psychological.competence.collection.summaryCourtName')}</strong>
        </span>
        <span className="occurred"><strong>{courtName && occurred}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="competence">
        <h2>{i18n.t('psychological.heading.competence')}</h2>
        <Branch name="is_incompetent"
                value={this.state.IsIncompetent}
                onError={this.handleError}
                onUpdate={this.updateIsIncompentent}>
        </Branch>

        <Show when={this.state.IsIncompetent === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.state.List}
                     branch={this.state.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('psychological.competence.collection.description')}
                     appendTitle={i18n.t('psychological.competence.collection.appendTitle')}
                     appendLabel={i18n.t('psychological.competence.collection.appendLabel')}>
            <Order name="Competence"
                   ApplicantBirthDate={this.props.ApplicantBirthDate}
                   prefix="competence"
                   bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Competence.defaultProps = {
  IsIncompetent: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onError: (value, arr) => { return arr },
  section: 'psychological',
  subsection: 'competence',
  dispatch: () => {},
  validator: (state, props) => {
    return new CompetenceValidator(state, props).isValid()
  }
}
