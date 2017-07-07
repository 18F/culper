import React from 'react'
import { i18n } from '../../../../config'
import { CompetenceValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import Order from '../Order'

export default class Competence extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateIsIncompentent = this.updateIsIncompentent.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      IsIncompetent: this.props.IsIncompetent,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateIsIncompentent (values) {
    this.update({
      IsIncompetent: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
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
          <strong>{courtName || i18n.m('psychological.competence.collection.summaryCourtName')}</strong>
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
                value={this.props.IsIncompetent}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateIsIncompentent}>
        </Branch>

        <Show when={this.props.IsIncompetent === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'psychological',
  subsection: 'competence',
  dispatch: () => {},
  validator: (state, props) => {
    return new CompetenceValidator(props, props).isValid()
  }
}
