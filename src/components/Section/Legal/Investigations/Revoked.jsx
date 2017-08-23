import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalInvestigationsRevokedValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, DateControl, Text, Textarea } from '../../../Form'

export default class Revoked extends SubsectionElement {
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
      HasRevocations: this.props.HasRevocations,
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
      HasRevocations: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = item || {}
    const dates = DateSummary(o.Date)
    const agency = (o.Agency || {}).value || ''

    return Summary({
      type: i18n.t('legal.investigations.revoked.collection.item'),
      index: index,
      left: agency,
      right: dates,
      placeholder: i18n.m('legal.investigations.revoked.collection.unknown')
    })
  }

  render () {
    return (
      <div className="investigations-revoked">
        <Branch name="has_revoked"
                label={i18n.t('legal.investigations.revoked.heading.title')}
                labelSize="h3"
                className="legal-investigations-revoked-has-revocations"
                value={this.props.HasRevocations}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateBranch}
                scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('legal.investigations.revoked.para.downgrade')}
        </Branch>

        <Show when={this.props.HasRevocations === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('legal.investigations.revoked.collection.description')}
                     appendTitle={i18n.t('legal.investigations.revoked.collection.appendTitle')}
                     appendLabel={i18n.t('legal.investigations.revoked.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <Field title={i18n.t('legal.investigations.revoked.heading.date')}
                   help="legal.investigations.revoked.help.date"
                   adjustFor="datecontrol"
                   scrollIntoView={this.props.scrollIntoView}>
              <DateControl name="Date"
                           className="legal-investigations-revoked-date"
                           bind={true}
                           required={this.props.required}
                           />
            </Field>

            <Field title={i18n.t('legal.investigations.revoked.heading.agency')}
                   adjustFor="text"
                   scrollIntoView={this.props.scrollIntoView}>
              <Text name="Agency"
                    className="legal-investigations-revoked-agency"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('legal.investigations.revoked.heading.explanation')}
                   help="legal.investigations.revoked.help.explanation"
                   adjustFor="textarea"
                   scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Explanation"
                        className="legal-investigations-revoked-explanation"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Revoked.defaultProps = {
  name: 'revoked',
  HasRevocations: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'investigations/revoked',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalInvestigationsRevokedValidator(state, props).isValid()
  },
  scrollToBottom: ''
}
