import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalAssociationsTerroristValidator, TerroristValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show } from '../../../Form'
import TerroristOrganizationItem from './TerroristOrganizationItem'

export default class TerroristOrganization extends SubsectionElement {
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
      HasTerrorist: this.props.HasTerrorist,
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
      HasTerrorist: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = ((item && item.Item) || {})
    const dates = DateSummary(o.Dates)
    const details = (o.Organization || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.terrorist.collection.item'),
      index: index,
      left: details,
      right: dates,
      placeholder: i18n.m('legal.associations.terrorist.collection.unknown')
    })
  }

  render () {
    return (
      <div className="legal-associations-terrorist">
        {i18n.m('legal.associations.terrorist.para.intro')}

        <Branch name="has_terrorist"
                label={i18n.t('legal.associations.terrorist.heading.title')}
                labelSize="h2"
                className="legal-associations-terrorist-has-terrorist"
                value={this.props.HasTerrorist}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateBranch}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasTerrorist === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={TerroristValidator}
                     description={i18n.t('legal.associations.terrorist.collection.description')}
                     appendTitle={i18n.t('legal.associations.terrorist.collection.appendTitle')}
                     appendLabel={i18n.t('legal.associations.terrorist.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
                     <TerroristOrganizationItem name="Item"
                       bind={true}
                       addressBooks={this.props.addressBooks}
                       dispatch={this.props.dispatch}
                       required={this.props.required}
                     />

          </Accordion>
        </Show>
      </div>
    )
  }
}

TerroristOrganization.defaultProps = {
  name: 'terrorist-organization',
  HasTerroristOrganization: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/terrorist-organization',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return new LegalAssociationsTerroristValidator(props).isValid()
  },
  scrollToBottom: ''
}
