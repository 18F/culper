import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalTechnologyManipulatingValidator } from '../../../../validators'
import { DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, DateControl, Address, Textarea } from '../../../Form'

export default class Manipulating extends SubsectionElement {
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
        HasManipulating: this.props.HasManipulating
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
      { name: 'HasManipulating', value: values }
    ])
  }

  summary (item, index) {
    const type = i18n.t('legal.technology.manipulating.collection.item')
    const unknown = i18n.t('legal.technology.manipulating.collection.unknown')
    const o = item || {}
    const incident = (o.Incident || {}).value
          ? o.Incident.value
          : unknown
    const dates = DateSummary(o.Date)

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span><strong>{incident}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="legal-technology-manipulating">
        <Branch name="has_manipulating"
                label={i18n.t('legal.technology.manipulating.heading.title')}
                labelSize="h3"
                className="legal-technology-manipulating-has-manipulating"
                value={this.props.HasManipulating}
                onError={this.handleError}
                onUpdate={this.updateBranch}>
        </Branch>

        <Show when={this.props.HasManipulating === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('legal.technology.manipulating.collection.description')}
                     appendTitle={i18n.t('legal.technology.manipulating.collection.appendTitle')}
                     appendLabel={i18n.t('legal.technology.manipulating.collection.appendLabel')}>
            <Field title={i18n.t('legal.technology.manipulating.heading.date')}
                   help="legal.technology.manipulating.help.date"
                   adjustFor="datecontrol">
              <DateControl name="Date"
                           className="legal-technology-manipulating-date"
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('legal.technology.manipulating.heading.incident')}
                   help="legal.technology.manipulating.help.incident"
                   adjustFor="textarea">
              <Textarea name="Incident"
                        className="legal-technology-manipulating-incident"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('legal.technology.manipulating.heading.location')}
                   help="legal.technology.manipulating.help.location"
                   adjustFor="address">
              <Address name="Location"
                       className="legal-technology-manipulating-location"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('legal.technology.manipulating.heading.action')}
                   help="legal.technology.manipulating.help.action"
                   adjustFor="textarea">
              <Textarea name="Action"
                        className="legal-technology-manipulating-action"
                        bind={true}
                        />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Manipulating.defaultProps = {
  name: 'manipulating',
  HasManipulating: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'technology/manipulating',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalTechnologyManipulatingValidator(state, props).isValid()
  }
}
