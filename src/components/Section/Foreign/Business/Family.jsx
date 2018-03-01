import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, NameSummary } from '../../../Summary'
import { ForeignBusinessFamilyValidator, FamilyValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import FamilyItem from './FamilyItem'

export default class Family extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignFamily = this.updateHasForeignFamily.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasForeignFamily: this.props.HasForeignFamily,
      ...queue
    })
  }

  updateHasForeignFamily (values) {
    this.update({
      HasForeignFamily: values,
      List: values.value === 'Yes' ? this.props.List : { items: [], branch: {} }
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  summary (item, index) {
    const obj = ((item && item.Item) || {})
    const name = NameSummary(obj.Name)

    return Summary({
      type: i18n.t('foreign.business.family.collection.summary.item'),
      index: index,
      left: name,
      right: null,
      placeholder: i18n.m('foreign.business.family.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="section-content foreign-business-family" {...super.dataAttributes(this.props)}>
        <Branch name="has_foreign_family"
                label={i18n.t('foreign.business.family.heading.title')}
                labelSize="h2"
                adjustFor="p"
                {...this.props.HasForeignFamily}
                warning={true}
                onUpdate={this.updateHasForeignFamily}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.business.family.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignFamily.value === 'Yes'}>
          <Accordion {...this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={FamilyValidator}
                     summary={this.summary}
                     description={i18n.t('foreign.business.family.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.family.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.family.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.family.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <FamilyItem name="Item"
                        bind={true}
                        onError={this.props.onError}
                        required={this.props.required}
                        scrollIntoView={this.props.scrollIntoView}
                        />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Family.defaultProps = {
  name: 'Family',
  HasForeignFamily: {},
  List: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/family',
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('foreign.business.family', data))
  },
  defaultState: true,
  scrollToBottom: ''
}
