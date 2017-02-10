import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Svg, RadioGroup, Radio, Show } from '../../../Form'
import { ResidenceItem } from '../Residence/Residence'
import { EmploymentItem } from '../Employment/Employment'

/**
 * Contains a collection of Residence and Employment information. This component
 * reconciles the information in the History redux state key and generates one
 * single array `List`. Each item is added a type to distinguish them and to allow
 * us to apply the approriate component and sory them by common criteria.
 */
export default class HistoryCollection extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      // List of history items managed by this collection
      List: [],

      // Current item that user is creating (NOT editing)
      currentNewItem: null,

      // Contains the type of item the user is requesting to create. This may included
      // Residence, Employment or School
      collectionType: '',

      // Error codes for each of the child collections
      errorCodes: []
    }
  }

  componentDidMount () {
    // If user has requested to show create form for a specific type when,
    // first loading the component, check that here and do so
    if (this.isEmpty() && this.props.addOnLoad) {
      this.selectCollectionType(this.props.addOnLoad)
      return
    }
    this.prepare(this.props.history)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    // } else if (this.isValid()) {
    //   complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      let e = { [this.props.name]: codes }
      let s = { [this.props.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, s, e)
        return
      }

      super.handleValidation(event, s, e)
    })
  }

  /**
   * Determines if any items exist in the collection. This includes residence and employer
   * information
   */
  isEmpty () {
    return !this.containsResidence() && !this.containsEmployment()
  }

  /**
   * Determines if any residence items exist
   */
  containsResidence () {
    return this.props.history && this.props.history.Residence && this.props.history.Residence.List
  }

  /**
   * Determines if any employment items exist
   */
  containsEmployment () {
    return this.props.history && this.props.history.Employment && this.props.history.Employment.List
  }

  componentWillReceiveProps (nextProps) {
    this.prepare(nextProps.history)
  }

  /**
   * Creates an array of items consisting of Residence and Employment items. These items are obtained
   * from History. For each, a type property is added to indicate the type of item it is in the collection.
   * Since this collection can contain a mix of history objects (Residence, Employer, School), this allows
   * us to differentiate when iterating and rendering them.
   */
  prepare (history) {
    if (!history) {
      return
    }

    let list = []
    if (history.Residence && history.Residence.List) {
      let residences = history.Residence.List.map(r => {
        r.type = 'Residence'
        return r
      })
      list = list.concat(residences)
    }

    if (history.Employment && history.Employment.List) {
      let employment = history.Employment.List.map(r => {
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

  /**
   * Default sorting of history objects. This assumes that all objects contain a `Dates` property
   * with date range values.
   */
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

  /**
   * Updates an existing item in the collection.
   */
  onUpdate (field, index, values) {
    let items = [...this.state.List]
    items[index] = {
      type: field,
      Item: values
    }
    this.doUpdate(field, items)
  }

  /**
   * Helper func that takes the combined list of History items and then
   * generates a new list containing only objects matching the `type` property
   * passed in. When items are updated, we don't trigger all object types to be updated
   * in redux. For instance, if a user updates a Residence, we only send up Residence objects,
   * not Employer and School.
   */
  doUpdate (type, items, callback) {
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
      if (callback) {
        callback()
      }
    })
  }

  /**
   * Takes a populated entry and actually adds it to the array of items
   */
  create () {
    const type = this.state.collectionType
    let items = [...this.state.List]

    items.push({
      type: type,
      Item: this.state.currentNewItem.values
    })

    this.setState({ currentNewItem: null, collectionType: null }, () => {
      this.doUpdate(type, items, () => {
        this.refs.createOptions.scrollIntoView()
      })
    })
  }

  /**
   * Removes an item from the collection and then sends the data back out
   * based on the type that was updated
   */
  remove (type, index) {
    let items = [...this.state.List]
    items.splice(index, 1)
    this.doUpdate(type, items)
  }

  /**
   * Keeps a temporary copy of a new item being updated. At this point, the item
   * has NOT been added to the redux store. This is being held in local state
   * Since the flow for this collection is slightly different, the create
   * process uses a temporary state property `currentNewItem` to store a `new` history item
   * being worked on. This item is not added to the List until the user explicitly saves.
   */
  onNewUpdate (field, values) {
    this.setState({
      currentNewItem: {
        type: field,
        values: values
      }
    })
  }

  /**
   * Handles when user is choosing between which new object type to create. This includes
   * Residence | Employment | School
   */
  handleCollectionTypeChange (e) {
    let type = e.target.value
    this.selectCollectionType(type)
  }

  /**
   * Helper func that sets the current object type being created and then ensures to
   * scroll the user to those options
   */
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

  /**
   * Contains the types of History objects a user can create
   */
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
            <Svg src="img/residence-house.svg" />
          </div>
        </Radio>
        <Radio
          label="Employer"
          value="Employment"
          onChange={this.handleCollectionTypeChange.bind(this)}>
          <div className="eye-icon">
            <Svg src="img/employer-briefcase.svg" />
          </div>
        </Radio>
      </RadioGroup>
    )
  }

  render () {
    const listItems = this.state.List.map((item, i, arr) => {
      let firstRow = (i === 0)
      let lastRow = arr.length === (i + 1)
      if (item.type === 'Residence') {
        let header = (<ResidenceSummary residence={item} />)
        return (
          <Row header={header}
               index={i}
               key={i}
               first={firstRow}
               last={lastRow}
               onRemove={this.remove.bind(this, item.type)}
               show={item.isNew}>
            <ResidenceItem name="Residence"
                           {...item.Item}
                           onUpdate={this.onUpdate.bind(this, 'Residence', i)}
                           onValidate={this.handleValidation}
                           />
          </Row>
        )
      }

      if (item.type === 'Employment') {
        let header = (<EmploymentSummary employment={item} />)
        return (
          <Row header={header}
               index={i}
               key={i}
               first={firstRow}
               last={lastRow}
               onRemove={this.remove.bind(this, item.type)}
               show={item.isNew}>
            <div className="employment">
              <EmploymentItem name="Employment"
                              {...item.Item}
                              onUpdate={this.onUpdate.bind(this, 'Employment', i)}
                              onValidate={this.handleValidation}
                              />
            </div>
          </Row>
        )
      }

      return null
    })

    return (
      <div className="history-collection collection">
        { listItems }
        <div>
          <h3>Add new</h3>
          <div className="eapp-field-wrap" ref="createOptions">
            {this.createOptions()}
          </div>
          <Show when={this.state.collectionType === 'Residence'}>
            <ResidenceItem name="Residence"
                           onUpdate={this.onNewUpdate.bind(this, 'Residence')}
                           onValidate={this.handleValidation}
                           />
          </Show>
          <Show when={this.state.collectionType === 'Employment'}>
            <div className="employment">
              <EmploymentItem name="Employment"
                              onUpdate={this.onNewUpdate.bind(this, 'Employment')}
                              onValidate={this.handleValidation}
                              />
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

/**
 * Renders a formatted summary information for a residence row
 */
function ResidenceSummary (props) {
  const res = props.residence.Item || {}

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
        <Svg src="img/residence-house.svg" />
        {i18n.t('history.residence.collection.summary.item')}:
      </div>
      <div className="table-cell employer">{address1}<br />{address2}</div>
      <div className="table-cell dates">{from}-{to}</div>
    </div>
  )
}

/**
 * Renders a formatted summary information for an employment row
 */
function EmploymentSummary (props) {
  let item = props.employment.Item
  const employer = (item.Employment && item.Employment.value ? item.Employment.value : 'N/A')
  const dates = dateSummary(item)

  return (
    <div className="table">
      <div className="table-cell index">
        <Svg src="img/employer-briefcase.svg" />
        {i18n.t('history.employment.collection.summary.employer')}:
      </div>
      <div className="table-cell employer">{ employer }</div>
      <div className="table-cell dates">{ dates }</div>
    </div>
  )
}

function dateSummary (item) {
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

/**
 * Row represents a row of summary information as well as the form elemens when they are
 * expanded
 */
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

  /**
   * Triggers onRemove callback passing the index of the row item
   */
  remove () {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.index)
    }
  }

  render () {
    const klassOpen = this.state.show === true ? 'open' : 'closed'
    const klassLast = this.props.last === true ? 'last' : ''
    return (
      <div className="item">
        <div className={`summary ${klassOpen} ${klassLast}`.trim()}>
          <Show when={this.props.first === true}>
            <div className="title">
              <h4>{i18n.t('collection.summary')}</h4>
              <hr />
            </div>
          </Show>
          <a href="javascript:;;" className="toggle" onClick={this.toggle.bind(this)}>
            <div className="brief">
              { this.props.header }
            </div>
            <div className="expander">
              <i className={`fa fa-chevron-${this.state.show === true ? 'up' : 'down'} fa-2`} aria-hidden="true"></i>
            </div>
          </a>
          <div className="divider">
            <hr />
          </div>
        </div>
        <div className={`details gutters ${this.state.show === true ? '' : 'hidden'}`.trim()}>
          <div className="byline top">
            <a href="javascript:;;" className="remove" onClick={this.remove.bind(this)}>
              <span>{i18n.t('collection.remove')}</span>
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </a>
          </div>
          { this.state.show && this.props.children }
        </div>
      </div>
    )
  }
}

Row.defaultProps = {
  show: false
}
