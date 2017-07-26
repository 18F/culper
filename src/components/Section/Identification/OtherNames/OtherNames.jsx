import React from 'react'
import { i18n } from '../../../../config'
import { Summary, NameSummary, DateSummary } from '../../../Summary'
import { OtherNamesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Accordion, MaidenName, Name, Textarea, DateRange, Branch, Show } from '../../../Form'

export default class OtherNames extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasOtherNames: this.props.HasOtherNames,
      ...queue
    })
  }

  updateBranch (value) {
    this.update({
      HasOtherNames: value,
      List: value === 'Yes' ? this.props.List : []
    })
  }

  updateList (values) {
    this.update({
      List: values.items
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const dates = DateSummary(item.DatesUsed)
    const name = NameSummary(item.Name)

    return Summary({
      type: i18n.t('identification.othernames.collection.summary.name'),
      index: index,
      left: name,
      right: dates,
      placeholder: i18n.m('identification.othernames.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="other-names">
        <p>{i18n.t('identification.othernames.info')}</p>
        <h3>{i18n.t('identification.othernames.branch.question')}</h3>
        <Branch name="has_othernames"
                value={this.props.HasOtherNames}
                help="identification.othernames.branch.help"
                warning={true}
                onUpdate={this.updateBranch}
                required={this.props.required}
                onError={this.handleError}>
        </Branch>
        <Show when={this.props.HasOtherNames === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('identification.othernames.collection.summary.title')}
                     appendLabel={i18n.t('identification.othernames.collection.append')}>

            <h3>{i18n.t('identification.othernames.heading.name')}</h3>
            <Name name="Name"
                  key="name"
                  bind={true}
                  required={this.props.required}
                  />

            <Field title={i18n.t('identification.othernames.heading.maiden')}
                   help="alias.maiden.help"
                   adjustFor="buttons"
                   shrink={true}>
              <MaidenName name="MaidenName"
                          bind={true}
                          required={this.props.required}
                          />
            </Field>

            <Field title={i18n.t('identification.othernames.heading.used')}
                   help="alias.used.help"
                   adjustFor="daterange"
                   shrink={true}>
              <DateRange name="DatesUsed"
                         bind={true}
                         required={this.props.required}
                         />
            </Field>

            <Field title={i18n.t('identification.othernames.heading.reason')}
                   help="alias.reason.help">
              <Textarea name="Reason"
                        className="reason"
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

OtherNames.defaultProps = {
  List: [],
  HasOtherNames: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'othernames',
  dispatch: () => {},
  validator: (state, props) => {
    return new OtherNamesValidator(props, props).isValid()
  },
  defaultState: true,
  required: false
}
