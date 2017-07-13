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
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasHistory: this.props.HasHistory,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateBranch (values) {
    this.update({
      HasHistory: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const type = i18n.t('legal.investigations.history.collection.item')
    const unknown = i18n.m('legal.investigations.history.collection.unknown')
    const o = item || {}
    const dates = DateSummary(o.Granted)
    const agency = (o.Agency || {}).Agency
          ? o.Agency.Agency
          : dates === '' ? unknown : ''

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
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateBranch}>
        </Branch>

        <Show when={this.props.HasHistory === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
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
                             label={i18n.t('legal.investigations.history.label.idk')}
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
                             label={i18n.t('legal.investigations.history.label.idk')}
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
                             label={i18n.t('legal.investigations.history.label.idk')}
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
                             label={i18n.t('legal.investigations.history.label.idk')}
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'investigations/history',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalInvestigationsHistoryValidator(state, props).isValid()
  }
}
