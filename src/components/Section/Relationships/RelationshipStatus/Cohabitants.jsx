import React from 'react'
import { i18n } from '../../../../config'
import { CohabitantsValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import Cohabitant from './Cohabitant'

export default class Cohabitants extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasCohabitant = this.updateHasCohabitant.bind(this)
    this.updateCohabitantList = this.updateCohabitantList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasCohabitant: this.props.HasCohabitant,
      CohabitantList: this.props.CohabitantList,
      CohabitantListBranch: this.props.CohabitantListBranch,
      ...queue
    })
  }

  updateHasCohabitant (values) {
    this.update({
      HasCohabitant: values,
      CohabitantList: values === 'Yes' ? values.items : [],
      CohabitantListBranch: values === 'Yes' ? values.branch : ''
    })
  }

  updateCohabitantList (values) {
    this.update({
      CohabitantList: values.items,
      CohabitantListBranch: values.branch
    })
  }

  summary (item, index) {
    const itemType = i18n.t('relationships.cohabitant.collection.itemType')
    const o = (item || {}).Cohabitant || {}
    const date = (o.CohabitationBegan || {}).date ? `${o.CohabitationBegan.month}/${o.CohabitationBegan.year}` : ''
    const name = o.Name
          ? `${o.Name.first || ''} ${o.Name.middle || ''} ${o.Name.last || ''}`.trim()
          : date === '' ? i18n.m('relationships.relatives.collection.summary.unknown') : ''
    return (
      <span>
        <span className="index">{itemType}:</span>
        <span className="info"><strong>{name} {date}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="cohabitants">
        <Branch name="hasCohabitant"
                label={i18n.t('relationships.cohabitant.heading.hasCohabitant')}
                labelSize="h3"
                className="has-cohabitant"
                value={this.props.HasCohabitant}
                warning={true}
                help="relationships.cohabitant.help.hasCohabitant"
                onUpdate={this.updateHasCohabitant}
                onError={this.handleError}>
        </Branch>

        <Show when={this.props.HasCohabitant === 'Yes'}>
          <Accordion items={this.props.CohabitantList}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.CohabitantListBranch}
                     summary={this.summary}
                     onUpdate={this.updateCohabitantList}
                     onError={this.handleError}
                     description={i18n.t('relationships.cohabitant.collection.description')}
                     appendTitle={i18n.t('relationships.cohabitant.collection.appendTitle')}
                     appendLabel={i18n.t('relationships.cohabitant.collection.appendLabel')}>
            <Cohabitant name="Cohabitant" spouse={this.props.spouse} bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Cohabitants.defaultProps = {
  HasCohabitant: '',
  CohabitantList: [],
  CohabitantListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'relationships',
  subsection: 'status/cohabitant',
  dispatch: () => {},
  validator: (state, props) => {
    return new CohabitantsValidator(props, props).isValid()
  },
  defaultState: true,
  scrollToBottom: ''
}
