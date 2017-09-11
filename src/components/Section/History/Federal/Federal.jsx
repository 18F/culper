import React from 'react'
import { i18n } from '../../../../config'
import { FederalServiceValidator, FederalServiceItemValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import FederalItem from './FederalItem'

export default class Federal extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasFederalService: this.props.HasFederalService,
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      ...queue
    })
  }

  updateBranch (value, event) {
    this.update({
      HasFederalService: value,
      List: value === 'Yes' ? this.props.List : [],
      ListBranch: value === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    item = ((item && item.Item) || {})
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
                     branch={this.props.ListBranch}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('history.federal.collection.summary.title')}
                     appendTitle={i18n.t('history.federal.collection.appendTitle')}
                     appendLabel={i18n.t('history.federal.collection.append')}
                     required={this.props.required}
                     validator={FederalServiceItemValidator}
                     scrollIntoView={this.props.scrollIntoView}>
                     <FederalItem name="Item"
                       bind={true}
                       required={this.props.required}
                       scrollIntoView={this.props.scrollIntoView}
                       onError={this.props.onError}
                     />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Federal.defaultProps = {
  HasFederalService: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'history',
  subsection: 'federal',
  addressBooks: {},
  dispatch: () => {},
  validator: (state, props) => {
    return new FederalServiceValidator(props).isValid()
  },
  defaultState: true
}
