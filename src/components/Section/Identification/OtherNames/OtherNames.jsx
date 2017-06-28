import React from 'react'
import { i18n } from '../../../../config'
import { NameSummary, DateSummary } from '../../../Summary'
import { OtherNamesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Accordion, MaidenName, Name, Textarea, DateRange, Branch, Show } from '../../../Form'

export default class OtherNames extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      List: props.List,
      HasOtherNames: props.HasOtherNames
    }

    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  updateBranch (value) {
    this.setState({ HasOtherNames: value }, () => {
      this.updateList({
        items: value === 'Yes' ? this.state.List : [],
        branch: ''
      })
    })
  }

  updateList (values) {
    this.setState({ List: values.items }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          HasOtherNames: this.state.HasOtherNames
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const name = NameSummary(item.Name, i18n.t('identification.othernames.collection.summary.unknown'))
    const dates = DateSummary(item.DatesUsed, i18n.t('identification.othernames.collection.summary.nodates'))

    return (
      <span>
        <span className="index">
          {i18n.t('identification.othernames.collection.summary.name')} {index + 1}:
        </span>
        <span><strong>{name}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="other-names">
        <p>{i18n.t('identification.othernames.info')}</p>
        <h3>{i18n.t('identification.othernames.branch.question')}</h3>
        <Branch name="has_othernames"
                value={this.state.HasOtherNames}
                help="identification.othernames.branch.help"
                warning={true}
                onUpdate={this.updateBranch}
                onError={this.handleError}>
        </Branch>
        <Show when={this.state.HasOtherNames === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
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
                  />

            <Field title={i18n.t('identification.othernames.heading.maiden')}
                   help="alias.maiden.help"
                   adjustFor="buttons"
                   shrink={true}>
              <MaidenName name="MaidenName"
                          bind={true}
                          />
            </Field>

            <Field title={i18n.t('identification.othernames.heading.used')}
                   help="alias.used.help"
                   adjustFor="daterange"
                   shrink={true}>
              <DateRange name="DatesUsed"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('identification.othernames.heading.reason')}
                   help="alias.reason.help">
              <Textarea name="Reason"
                        className="reason"
                        bind={true}
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
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'othernames',
  dispatch: () => {},
  validator: (state, props) => {
    return new OtherNamesValidator(state, props).isValid()
  },
  defaultState: true
}
