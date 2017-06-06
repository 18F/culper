import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalInvestigationsRevokedValidator } from '../../../../validators'
import { DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, DateControl, Text, Textarea } from '../../../Form'

export default class Revoked extends SubsectionElement {
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
        HasRevocations: this.props.HasRevocations
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
      { name: 'HasRevocations', value: values }
    ])
  }

  summary (item, index) {
    const type = i18n.t('legal.investigations.revoked.collection.item')
    const unknown = i18n.t('legal.investigations.revoked.collection.unknown')
    const o = item || {}
    const agency = (o.Agency || {}).value
          ? o.Agency.value
          : unknown
    const dates = DateSummary(o.Date)

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
      <div className="investigations-revoked">
        <Branch name="has_revoked"
                label={i18n.t('legal.investigations.revoked.heading.title')}
                labelSize="h3"
                className="legal-investigations-revoked-has-revocations"
                value={this.props.HasRevocations}
                onError={this.handleError}
                onUpdate={this.updateBranch}>
          {i18n.m('legal.investigations.revoked.para.downgrade')}
        </Branch>

        <Show when={this.props.HasRevocations === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('legal.investigations.revoked.collection.description')}
                     appendTitle={i18n.t('legal.investigations.revoked.collection.appendTitle')}
                     appendLabel={i18n.t('legal.investigations.revoked.collection.appendLabel')}>
            <Field title={i18n.t('legal.investigations.revoked.heading.date')}
                   help="legal.investigations.revoked.help.date"
                   adjustFor="datecontrol">
              <DateControl name="Date"
                           className="legal-investigations-revoked-date"
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('legal.investigations.revoked.heading.agency')}
                   help="legal.investigations.revoked.help.agency"
                   adjustFor="text">
              <Text name="Agency"
                    className="legal-investigations-revoked-agency"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('legal.investigations.revoked.heading.explanation')}
                   help="legal.investigations.revoked.help.explanation"
                   adjustFor="textarea">
              <Textarea name="Explanation"
                        className="legal-investigations-revoked-explanation"
                        bind={true}
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
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'investigations/revoked',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalInvestigationsRevokedValidator(state, props).isValid()
  }
}
