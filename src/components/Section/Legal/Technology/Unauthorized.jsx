import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalTechnologyUnauthorizedValidator } from '../../../../validators'
import { DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, DateControl, Location, Textarea } from '../../../Form'

export default class Unauthorized extends SubsectionElement {
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
      HasUnauthorized: this.props.HasUnauthorized,
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
      HasUnauthorized: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const type = i18n.t('legal.technology.unauthorized.collection.item')
    const unknown = i18n.m('legal.technology.unauthorized.collection.unknown')
    const o = item || {}
    const dates = DateSummary(o.Date)
    const incident = (o.Incident || {}).value
          ? o.Incident.value
          : dates === '' ? unknown : ''

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
      <div className="legal-technology-unauthorized">
        {i18n.m('legal.technology.unauthorized.para.intro')}

        <Branch name="has_unauthorized"
                label={i18n.t('legal.technology.unauthorized.heading.title')}
                labelSize="h3"
                className="legal-technology-unauthorized-has-unauthorized"
                value={this.props.HasUnauthorized}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateBranch}>
        </Branch>

        <Show when={this.props.HasUnauthorized === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('legal.technology.unauthorized.collection.description')}
                     appendTitle={i18n.t('legal.technology.unauthorized.collection.appendTitle')}
                     appendLabel={i18n.t('legal.technology.unauthorized.collection.appendLabel')}>
            <Field title={i18n.t('legal.technology.unauthorized.heading.date')}
                   help="legal.technology.unauthorized.help.date"
                   adjustFor="datecontrol">
              <DateControl name="Date"
                           className="legal-technology-unauthorized-date"
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('legal.technology.unauthorized.heading.incident')}
                   help="legal.technology.unauthorized.help.incident"
                   adjustFor="textarea">
              <Textarea name="Incident"
                        className="legal-technology-unauthorized-incident"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('legal.technology.unauthorized.heading.location')}
                   help="legal.technology.unauthorized.help.location"
                   adjustFor="address">
              <Location name="Location"
                        className="legal-technology-unauthorized-location"
                        layout={Location.ADDRESS}
                        geocode={true}
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('legal.technology.unauthorized.heading.action')}
                   help="legal.technology.unauthorized.help.action"
                   adjustFor="textarea">
              <Textarea name="Action"
                        className="legal-technology-unauthorized-action"
                        bind={true}
                        />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Unauthorized.defaultProps = {
  name: 'unauthorized',
  HasUnauthorized: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'technology/unauthorized',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalTechnologyUnauthorizedValidator(state, props).isValid()
  }
}
