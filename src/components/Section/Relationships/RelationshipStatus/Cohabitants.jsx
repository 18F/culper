import React from 'react'
import { i18n } from '../../../../config'
import { CohabitantsValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import Cohabitant from './Cohabitant'

export default class Cohabitants extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasCohabitant: props.HasCohabitant,
      CohabitantList: props.CohabitantList,
      CohabitantListBranch: props.CohabitantListBranch
    }

    this.update = this.update.bind(this)
    this.updateHasCohabitant = this.updateHasCohabitant.bind(this)
    this.updateCohabitantList = this.updateCohabitantList.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasCohabitant: this.state.HasCohabitant,
          CohabitantList: this.state.CohabitantList,
          CohabitantListBranch: this.state.CohabitantListBranch
        })
      }
    })
  }

  updateHasCohabitant (values) {
    this.update('HasCohabitant', values)
  }

  updateCohabitantList (values) {
    this.update('CohabitantList', values.items)
    this.update('CohabitantListBranch', values.branch)
  }

  summary (item, index) {
    const itemType = i18n.t('relationships.cohabitant.collection.itemType')
    const o = (item || {}).Cohabitant || {}
    const date = (o.CohabitationBegan || {}).date ? `${o.CohabitationBegan.month}/${o.CohabitationBegan.year}` : ''
    const name = o.Name
          ? `${o.Name.first || ''} ${o.Name.middle || ''} ${o.Name.last || ''}`.trim()
          : i18n.t('relationships.relatives.collection.summary.unknown')
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
                value={this.state.HasCohabitant}
                help="relationships.cohabitant.help.hasCohabitant"
                onUpdate={this.updateHasCohabitant}
                onError={this.handleError}>
        </Branch>

        <Show when={this.state.HasCohabitant === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.CohabitantList}
                     defaultState={this.props.defaultState}
                     branch={this.state.CohabitantListBranch}
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
  onError: (value, arr) => { return arr },
  section: 'relationships',
  subsection: 'status/cohabitant',
  dispatch: () => {},
  validator: (state, props) => {
    return new CohabitantsValidator(state, props).isValid()
  },
  defaultState: true
}
