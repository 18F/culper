import React from 'react'
import { i18n } from '../../../../config'
import { Summary, NameSummary } from '../../../Summary'
import { RelativesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion } from '../../../Form'
import Relative from './Relative'

export default class Relatives extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      ...queue
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
    const o = (item || {}).Item || {}
    const relation = (o.Relations || []).length > 0
          ? o.Relations[0]
          : i18n.t('relationships.relatives.collection.summary.item')
    const name = NameSummary(o.Name)

    return Summary({
      type: relation,
      index: index,
      left: name,
      right: null,
      placeholder: i18n.m('relationships.relatives.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="relatives">
        <h2>{i18n.t('relationships.relatives.heading.title')}</h2>
        {i18n.m('relationships.relatives.para.opportunity')}

        <Accordion items={this.props.List}
                   defaultState={this.props.defaultState}
                   branch={this.props.ListBranch}
                   onUpdate={this.updateList}
                   onError={this.handleError}
                   summary={this.summary}
                   description={i18n.t('relationships.relatives.collection.summary.title')}
                   appendTitle={i18n.t('relationships.relatives.collection.appendTitle')}
                   appendLabel={i18n.t('relationships.relatives.collection.append')}>
          <Relative name="Item"
                    bind={true}
                    scrollIntoView={this.props.scrollIntoView}
                    required={this.props.required}
                    />
        </Accordion>
      </div>
    )
  }
}

Relatives.defaultProps = {
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'relationships',
  subsection: 'relatives',
  dispatch: () => {},
  validator: (state, props) => {
    return new RelativesValidator(props, props).isValid()
  },
  defaultState: true
}
