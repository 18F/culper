import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalInvestigationsDebarredValidator } from '../../../../validators'
import { DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, DateControl, Text, Textarea } from '../../../Form'

export default class Debarred extends SubsectionElement {
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
        HasDebarment: this.props.HasDebarment
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
      { name: 'HasDebarment', value: values }
    ])
  }

  summary (item, index) {
    const type = i18n.t('legal.investigations.debarred.collection.item')
    const unknown = i18n.t('legal.investigations.debarred.collection.unknown')
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
      <div className="investigations-debarred">
        <Branch name="has_debarred"
                label={i18n.t('legal.investigations.debarred.heading.title')}
                labelSize="h3"
                className="legal-investigations-debarred-has-debarment"
                value={this.props.HasDebarment}
                onError={this.handleError}
                onUpdate={this.updateBranch}>
        </Branch>

        <Show when={this.props.HasDebarment === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('legal.investigations.debarred.collection.description')}
                     appendTitle={i18n.t('legal.investigations.debarred.collection.appendTitle')}
                     appendLabel={i18n.t('legal.investigations.debarred.collection.appendLabel')}>
            <Field title={i18n.t('legal.investigations.debarred.heading.agency')}
                   help="legal.investigations.debarred.help.agency"
                   adjustFor="text">
              <Text name="Agency"
                    className="legal-investigations-debarred-agency"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('legal.investigations.debarred.heading.date')}
                   help="legal.investigations.debarred.help.date"
                   adjustFor="datecontrol">
              <DateControl name="Date"
                           className="legal-investigations-debarred-date"
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('legal.investigations.debarred.heading.explanation')}
                   help="legal.investigations.debarred.help.explanation"
                   adjustFor="textarea">
              <Textarea name="Explanation"
                        className="legal-investigations-debarred-explanation"
                        bind={true}
                        />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Debarred.defaultProps = {
  name: 'debarred',
  HasDebarment: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'investigations/debarred',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalInvestigationsDebarredValidator(state, props).isValid()
  }
}
