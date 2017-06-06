import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalInvestigationsHistoryValidator } from '../../../../validators'
import { DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, NotApplicable, DateControl,
         Text } from '../../../Form'
import InvestigatingAgency from './InvestigatingAgency'
import ClearanceLevel from './ClearanceLevel'

export default class History extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        HasHistory: this.props.HasHistory
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

  updateBranch (values) {
    this.update([
      { name: 'HasHistory', value: values }
    ])
  }

  summary (item, index) {
    const type = i18n.t('legal.investigations.history.collection.item')
    const unknown = i18n.t('legal.investigations.history.collection.unknown')
    const o = item || {}
    const agency = (o.Agency || {}).Agency
          ? o.Agency.Agency
          : unknown
    const dates = DateSummary(o.Granted)

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span><strong>{agency}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="investigations-history">
        <Branch name="has_history"
                label={i18n.t('legal.investigations.history.heading.title')}
                labelSize="h3"
                className="legal-investigations-history-has-history"
                value={this.props.HasHistory}
                onError={this.handleError}
                onUpdate={this.updateBranch}>
        </Branch>

        <Show when={this.props.HasHistory === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('legal.investigations.history.collection.description')}
                     appendTitle={i18n.t('legal.investigations.history.collection.appendTitle')}
                     appendLabel={i18n.t('legal.investigations.history.collection.appendLabel')}>
            <Field title={i18n.t('legal.investigations.history.heading.agency')}
                   help="legal.investigations.history.help.agency"
                   adjustFor="text">
              <NotApplicable name="AgencyNotApplicable"
                             or={i18n.m('legal.investigations.history.para.or')}
                             bind={true}>
                <InvestigatingAgency name="Agency"
                                     className="legal-investigations-history-agency"
                                     bind={true}
                                     />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('legal.investigations.history.heading.completed')}
                   help="legal.investigations.history.help.completed"
                   adjustFor="datecontrol">
              <NotApplicable name="CompletedNotApplicable"
                             or={i18n.m('legal.investigations.history.para.or')}
                             bind={true}>
                <DateControl name="Completed"
                             className="legal-investigations-history-completed"
                             bind={true}
                             />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('legal.investigations.history.heading.issued')}
                   help="legal.investigations.history.help.issued"
                   adjustFor="text">
              <Text name="Issued"
                    className="legal-investigations-history-issued"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('legal.investigations.history.heading.granted')}
                   help="legal.investigations.history.help.granted"
                   adjustFor="datecontrol">
              <NotApplicable name="GrantedNotApplicable"
                             or={i18n.m('legal.investigations.history.para.or')}
                             bind={true}>
                <DateControl name="Granted"
                             className="legal-investigations-history-granted"
                             bind={true}
                             />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('legal.investigations.history.heading.clearance')}
                   help="legal.investigations.history.help.clearance"
                   adjustFor="text">
              <NotApplicable name="clearanceNotApplicable"
                             or={i18n.m('legal.investigations.history.para.or')}
                             bind={true}>
                <ClearanceLevel name="Clearance"
                                className="legal-investigations-history-clearance"
                                bind={true}
                                />
              </NotApplicable>
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

History.defaultProps = {
  name: 'history',
  HasHistory: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'investigations/history',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalInvestigationsHistoryValidator(state, props).isValid()
  }
}
