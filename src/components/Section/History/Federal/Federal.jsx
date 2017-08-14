import React from 'react'
import { i18n } from '../../../../config'
import { FederalServiceValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field, DateRange, Text, Location } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'

export default class Federal extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateCollection = this.updateCollection.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasFederalService: this.props.HasFederalService,
      List: this.props.List,
      ...queue
    })
  }

  updateBranch (value, event) {
    this.update({
      HasFederalService: value,
      List: value === 'Yes' ? this.props.List : []
    })
  }

  updateCollection (values) {
    this.update({
      List: values.items
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const agency = item && item.Name && item.Name.value ? item.Name.value : ''
    const dates = DateSummary(item.Dates)

    return Summary({
      type: i18n.t('history.federal.collection.summary.item'),
      index: index,
      left: agency,
      right: dates,
      placeholder: i18n.m('history.federal.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="federal">
        <h3>{i18n.t('history.federal.heading.branch')}</h3>
        <Branch name="has_federalservice"
                help="history.federal.help.branch"
                value={this.props.HasFederalService}
                warning={true}
                onUpdate={this.updateBranch}
                onError={this.handleError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>
        <Show when={this.props.HasFederalService === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updateCollection}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('history.federal.collection.summary.title')}
                     appendLabel={i18n.t('history.federal.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <Field title={i18n.t('history.federal.heading.dates')}
                   help="history.federal.help.dates"
                   adjustFor="daterange"
                   scrollIntoView={this.props.scrollIntoView}>
              <DateRange name="Dates"
                         bind={true}
                         required={this.props.required}
                         />
            </Field>

            <Field title={i18n.t('history.federal.heading.name')}
                   className="federal-agency"
                   help="history.federal.help.name"
                   scrollIntoView={this.props.scrollIntoView}>
              <Text name="Name"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('history.federal.heading.position')}
                   className="federal-position"
                   help="history.federal.help.position"
                   scrollIntoView={this.props.scrollIntoView}>
              <Text name="Position"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('history.federal.heading.address')}
                   help="history.federal.help.address"
                   className="federal-agency-address"
                   adjustFor="address"
                   scrollIntoView={this.props.scrollIntoView}>
              <Location name="Address"
                        layout={Location.ADDRESS}
                        geocode={true}
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

Federal.defaultProps = {
  HasFederalService: '',
  List: [],
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'history',
  subsection: 'federal',
  dispatch: () => {},
  validator: (state, props) => {
    return new FederalServiceValidator(props, props).isValid()
  },
  defaultState: true
}
