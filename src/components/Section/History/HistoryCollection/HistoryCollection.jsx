import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Text, RadioGroup, Radio, Show } from '../../../Form'
import { ResidenceItem } from '../Residence/Residence'
import { EmploymentItem } from '../Employment/Employment'

export default class HistoryCollection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      List: [],
      currentNewItem: null,
      collectionType: ''
    }
  }

  componentDidMount () {
    if (this.isEmpty() && this.props.addOnLoad) {
      this.selectCollectionType(this.props.addOnLoad)
      return
    }
    this.prepare(this.props.history)
  }

  isEmpty () {
    return !this.containsResidence() && !this.containsEmployment()
  }

  containsResidence () {
    return this.props.history && this.props.history.Residence && this.props.history.Residence.List
  }

  containsEmployment () {
    return this.props.history && this.props.history.Employment && this.props.history.Employment.List
  }

  componentWillReceiveProps (nextProps) {
    this.prepare(nextProps.history)
  }

  prepare (history) {
    if (!history) {
      return
    }

    let list = []
    if (history.Residence && history.Residence.List) {
      let residences = history.Residence.List.map (r => {
        r.type = 'Residence'
        return r
      })
      list = list.concat(residences)
    }

    if (history.Employment && history.Employment.List) {
      let employment = history.Employment.List.map (r => {
        r.type = 'Employment'
        return r
      })
      list = list.concat(employment)
    }
    list.sort(this.sort)

    this.setState({
      List: list
    })
  }

  sort (a, b) {
    if (!a.Dates && !b.Dates) {
      return 0
    }
    if (!a.Dates || !a.Dates.to) {
      return -1
    }

    if (!b.Dates || !b.Dates.to) {
      return 1
    }

    return b.Dates.to.getTime() - a.Dates.to.getTime()
  }

  onUpdate (field, index, values) {
    let items = [...this.state.List]
    items[index] = {
      type: field,
      ...values
    }
    this.doUpdate(field, items)
  }

  doUpdate (type, items) {
    this.setState({
      List: items
    }, () => {

      // filter list by current collection type being updated
      let filtered = this.state.List.filter(i => {
        return i.type === type
      })

      switch (type) {
        case 'Residence':
          if (this.props.onResidenceUpdate) {
            this.props.onResidenceUpdate({ List: filtered })
          }
          break
        case 'Employment':
          if (this.props.onEmploymentUpdate) {
            this.props.onEmploymentUpdate({ List: filtered })
          }
          break
        default:
          console.warn('No update callback method was provided in HistoryCollection')
      }

    })
  }

  create () {
    console.log('Creating....')
    const type = this.state.collectionType
    let items = [...this.state.List]
    items.push({
      type: type,
      ...this.state.currentNewItem.values
    })
    this.setState({ currentNewItem: null, collectionType: null }, () => {
      this.doUpdate(type, items)
      this.refs.createOptions.scrollIntoView()
    })
  }
  /**
   * Keeps a temporary copy of a new item being updated. At this point, the item
   * has NOT been added to the redux store. This is being held in local state
   */
  onNewUpdate (field, values) {
    this.setState({
      currentNewItem: {
        type: field,
        values: values
      }
    })
  }

  handleCollectionTypeChange(e) {
    let type = e.target.value
    this.selectCollectionType(type)
  }

  selectCollectionType (type) {
    this.setState({
      collectionType: type,
      currentNewItem: {
        type: type,
        values: {}
      }
    }, () => {
      this.refs.createOptions.scrollIntoView()
    })
  }

  createOptions () {
    return (
      <RadioGroup className="option-list eapp-extend-labels create"
        name="createOptions"
        selectedValue={this.state.collectionType}>
        <Radio
          label="Residence"
          value="Residence"
          onChange={this.handleCollectionTypeChange.bind(this)}>
          <div className="eye-icon">
          </div>
        </Radio>
        <Radio
          label="Employer"
          value="Employment"
          onChange={this.handleCollectionTypeChange.bind(this)}>
          <div className="eye-icon">
          </div>
        </Radio>
      </RadioGroup>
      )
  }

  render () {
    return (
      <div className="history-collection collection">
        <label>Summary of your history</label>
        {
          this.state.List.map((item, i, arr) => {
            if (item.type === 'Residence') {
              let header = (<ResidenceHeader residence={item} />)
              return (
              <Row
                header={header}
                key={i}
                show={item.isNew}>
                <ResidenceItem name="Residence"
                  {...item}
                  onUpdate={this.onUpdate.bind(this, 'Residence', i)}
                />
              </Row>
              )
            }

            if (item.type === 'Employment') {
              let header = (<EmploymentHeader employment={item} />)
              return (
              <Row
                header={header}
                key={i}
                show={item.isNew}>
                <div className="eapp-field-wrap employment">
                  <EmploymentItem
                    name="Employment"
                    {...item}
                    onUpdate={this.onUpdate.bind(this, 'Employment', i)} />
                </div>
              </Row>
              )
            }
          })
        }
        <div>
          <h3>Add new</h3>
          <div className="eapp-field-wrap" ref="createOptions">
            {this.createOptions()}
          </div>
          <Show when={this.state.collectionType === 'Residence'}>
            <ResidenceItem name="Residence" onUpdate={this.onNewUpdate.bind(this, 'Residence')} />
          </Show>
          <Show when={this.state.collectionType === 'Employment'}>
            <div className="employment">
              <EmploymentItem name="Employment" onUpdate={this.onNewUpdate.bind(this, 'Employment')} />
            </div>
          </Show>

          <Show when={this.state.collectionType}>
            <div>
              <h3>Done! Now let's add some more</h3>
              <p>Use the button below to save your first history entry and start another</p>
              <div className="text-center">
                <button className="add usa-button-outline" onClick={this.create.bind(this)}>
                  <span>Save and add another address, job, or school</span>
                  <i className="fa fa-plus-circle"></i>
                </button>
              </div>
            </div>
          </Show>
        </div>
      </div>
      )
  }

}

function ResidenceHeader (props) {
  const res = props.residence || {}

  let address1 = ''
  let address2 = ''
  if (res.Address) {
    address1 += `${res.Address.address || ''}`.trim()
    if (res.Address.addressType === 'United States') {
      address2 = `${res.Address.city || ''}, ${res.Address.state || ''} ${res.Address.zipcode || ''}`.trim()
    } else if (res.Address.addressType === 'APOFPO') {
      address2 = `${res.Address.apoFpoType || ''}, ${res.Address.apoFpo || ''} ${res.Address.zipcode || ''}`.trim()
    } else if (res.Address.addressType === 'International') {
      address2 = `${res.Address.city || ''}, ${res.Address.country || ''}`.trim()
    }
  }

  if (address1.length === 0 || address2.length === 1) {
    address1 = i18n.t('history.residence.collection.summary.unknown')
  }

  const dates = res.Dates || {}
  let from = i18n.t('history.residence.collection.summary.unknown')
  if (dates.from) {
    from = '' + dates.from.getMonth() + '/' + dates.from.getFullYear()
  }
  let to = i18n.t('history.residence.collection.summary.unknown')
  if (dates.to) {
    to = '' + dates.to.getMonth() + '/' + dates.to.getFullYear()
  }

  return (
    <div className="table">
      <div className="table-cell index">
        <i className="fa fa-home" aria-hidden="true"></i>
        {i18n.t('history.residence.collection.summary.item')}:
      </div>
      <div className="table-cell employer">{address1}<br />{address2}</div>
      <div className="table-cell dates">{from}-{to}</div>
    </div>
    )
}

function dateSummary(item) {

    let noDateLabel = i18n.t('history.employment.noDate.label')
    function format (d) {
      return `${d.getMonth()}/${d.getFullYear()}`
    }

    let vals = []
    if (!item.Dates) {
      return ''
    }

    if (item.Dates.from) {
      vals.push(format(item.Dates.from))
    } else {
      vals.push(noDateLabel)
    }

    if (item.Dates.to) {
      vals.push(format(item.Dates.to))
    } else {
      vals.push(noDateLabel)
    }

    return vals.join('-')
}

function EmploymentHeader (props) {
  let item = props.employment
  const employer = (item.Employment && item.Employment.value ? item.Employment.value : 'N/A')
  const dates = dateSummary(item)

  return (
    <div className="table">
      <div className="table-cell index">
        <i className="fa fa-briefcase" aria-hidden="true"></i>
        {i18n.t('history.employment.collection.summary.employer')}:
      </div>
      <div className="table-cell employer">{ employer }</div>
      <div className="table-cell dates">{ dates }</div>
    </div>
    )
}

class Row extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: this.props.show
    }
  }

  toggle () {
    this.setState({
      show: !this.state.show
    })
  }

  render () {
    return (
      <div className="item">
        <div className="summary">
          <a href="javascript:;;" className="toggle" onClick={this.toggle.bind(this)}>
            <div className="brief">
              { this.props.header }
            </div>
            <div className="expander">
              <i className={`fa fa-chevron-${this.state.show === true ? 'up' : 'down'} fa-2`} aria-hidden="true"></i>
            </div>
          </a>
        </div>
        <div className={`details gutters`}>
          { this.state.show && this.props.children }
        </div>
      </div>
      )
  }
}

Row.defaultProps = {
  show: false
}
