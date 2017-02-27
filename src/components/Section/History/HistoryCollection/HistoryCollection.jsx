import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Svg, RadioGroup, Radio, Show } from '../../../Form'
import { ResidenceItem } from '../Residence'
import { EmploymentItem } from '../Employment'
import { EducationItem } from '../Education'
import { Row } from './Row'
import { Gap } from './Gap'
import { InjectGaps, EmploymentSummary, ResidenceSummary, EducationSummary } from './summaries'
import { daysAgo, today } from '../dateranges'

const threeYearsAgo = daysAgo(today, 365 * 3)
const withinThreeYears = (from, to) => {
  return (from && from >= threeYearsAgo) || (to && to >= threeYearsAgo)
}

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
      collectionType: props.types.length === 1 ? props.types[0] : '',

      // Error codes for each of the child collections
      errorCodes: []
    }

    this.handleCollectionTypeChange = this.handleCollectionTypeChange.bind(this)
    this.create = this.create.bind(this)
    this.fillGap = this.fillGap.bind(this)
  }

  componentDidMount () {
    // If user has requested to show create form for a specific type when,
    // first loading the component, check that here and do so
    if (this.isEmpty() && this.props.addOnLoad && this.props.types.length > 1) {
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
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      let e = { [this.props.name]: codes }
      let s = { [this.props.name]: { status: complexStatus } }
      if (complexStatus === false || complexStatus === true) {
        super.handleValidation(event, s, e)
        return
      }

      super.handleValidation(event, s, e)
    })
  }

  isValid () {
    if (!this.state.List || !this.state.List.length) {
      return false
    }

    return this.validateEmploymentList(this.state.List)
      && this.validateResidenceList(this.state.List)
      && this.validateEducationList(this.state.List)
  }

  validateEmploymentList (list) {
    for (const employment of list.filter(item => { return item.type === 'Employment' })) {
      if (!this.validateEmployment(employment.Item)) {
        return false
      }
    }

    return true
  }

  validateEmployment (item) {
    if (!item) {
      return false
    }

    if (!item.EmploymentActivity || !item.EmploymentActivity.value) {
      return false
    }

    if (item.EmploymentActivity.value === 'Other' && item.EmploymentActivity.otherExplanation === '') {
      return false
    }

    if (!item.Dates || !item.Dates.from || !item.Dates.to) {
      return false
    }

    const { from, to } = item.Dates
    if (from > to) {
      return false
    }

    // Only some portions have employment section
    if (!['Unemployment', 'ActiveMilitary', 'NationalGuard', 'USPHS'].includes(item.EmploymentActivity.value)) {
      if ((!item.Employment || !item.Employment.value)) {
        return false
      }

      if (!item.Additional || !item.Additional.HasAdditionalActivity) {
        return false
      }

      if (item.Additional.HasAdditionalActivity === 'Yes') {
        for (let activity of item.Additional.List) {
          if (!activity.Position || !activity.Position.value) {
            return false
          }
          if (!activity.Supervisor || !activity.Supervisor.value) {
            return false
          }

          if (!activity.DatesEmployed || !activity.DatesEmployed.from || !activity.DatesEmployed.to) {
            return false
          }

          const { from, to } = activity.DatesEmployed
          if (from > to) {
            return false
          }
        }
      }

      if (!item.Status || !item.Status.value) {
        return false
      }

      if (!item.Title || !item.Title.value) {
        return false
      }

      if (!item.Address) {
        return false
      }

      let address = item.Address
      switch (address.addressType) {
        case 'United States':
          if (!address.address || !address.city || !address.state || !address.zipcode) {
            return false
          }
          break

        case 'International':
          if (!address.address || !address.city || !address.country) {
            return false
          }
          break

        case 'APOFPO':
          if (!address.address || !address.apoFpo || !address.apoFpoType || !address.zipcode) {
            return false
          }
          break

        default:
          return false
      }

      let telephone = item.Telephone
      if (!telephone) {
        return false
      }

      if (telephone.noNumber !== 'NA') {
        if (!telephone.number) {
          return false
        }

        if (!telephone.numberType) {
          return false
        }

        if (!telephone.timeOfDay) {
          return false
        }
      }
    }

    // Some employment does not require physical address
    if (['ActiveMilitary', 'NationalGuard', 'USPHS', 'OtherFederal', 'StateGovernment', 'FederalContractor', 'NonGovernment', 'Other', 'SelfEmployment'].includes(item.EmploymentActivity.value)) {
      if (!item.PhysicalAddress) {
        return false
      }

      if (item.PhysicalAddress.HasDifferentAddress !== 'No' && item.PhysicalAddress.HasDifferentAddress !== 'Yes') {
        return false
      }

      if (item.PhysicalAddress.HasDifferentAddress === 'Yes') {
        // Checking the address fields are present
        let address = item.PhysicalAddress.Address
        if (!address) {
          return false
        }

        switch (address.addressType) {
          case 'United States':
            if (!address.address || !address.city || !address.state || !address.zipcode) {
              return false
            }
            break

          case 'International':
            if (!address.address || !address.city || !address.country) {
              return false
            }
            break

          case 'APOFPO':
            if (!address.address || !address.apoFpo || !address.apoFpoType || !address.zipcode) {
              return false
            }
            break

          default:
            return false
        }

        // Checking the telephone is present
        let telephone = item.PhysicalAddress.Telephone
        if (!telephone) {
          return false
        }

        if (telephone.noNumber !== 'NA') {
          if (!telephone.number) {
            return false
          }

          if (!telephone.numberType) {
            return false
          }

          if (!telephone.timeOfDay) {
            return false
          }
        }
      }
    }

    // The reason for leaving is only required if within the last seven years
    const sevenYearsAgo = daysAgo(today, 365 * 7)
    if ((from && from >= sevenYearsAgo) || (to && to >= sevenYearsAgo)) {
      if (!item.ReasonLeft) {
        return false
      }

      if (!item.ReasonLeft.Reason) {
        return false
      }

      if (!item.ReasonLeft.Date || !item.ReasonLeft.Date.date) {
        return false
      }

      if (!item.ReasonLeft.Text || !item.ReasonLeft.Text.value) {
        return false
      }
    }

    // Some employment does not require supervisor
    if (['ActiveMilitary', 'NationalGuard', 'USPHS', 'OtherFederal', 'StateGovernment', 'FederalContractor', 'NonGovernment', 'Other'].includes(item.EmploymentActivity.value)) {
      if (!item.Supervisor) {
        return false
      }

      if (!item.Supervisor.SupervisorName || !item.Supervisor.SupervisorName.value) {
        return false
      }

      if (!item.Supervisor.Title || !item.Supervisor.Title.value) {
        return false
      }

      if (!item.Supervisor.Email || !item.Supervisor.Email.value) {
        return false
      }

      // Checking the address fields are present
      let address = item.Supervisor.Address
      if (!address) {
        return false
      }

      switch (address.addressType) {
        case 'United States':
          if (!address.address || !address.city || !address.state || !address.zipcode) {
            return false
          }
          break

        case 'International':
          if (!address.address || !address.city || !address.country) {
            return false
          }
          break

        case 'APOFPO':
          if (!address.address || !address.apoFpo || !address.apoFpoType || !address.zipcode) {
            return false
          }
          break

        default:
          return false
      }

      // Checking the telephone is present
      let telephone = item.Supervisor.Telephone
      if (!telephone) {
        return false
      }

      if (telephone.noNumber !== 'NA') {
        if (!telephone.number) {
          return false
        }

        if (!telephone.numberType) {
          return false
        }

        if (!telephone.timeOfDay) {
          return false
        }
      }
    }

    if (!item.Reference) {
      return false
    }

    if (!item.Reference.FullName) {
      return false
    }

    if (!item.Reference.FullName.first || !item.Reference.FullName.last) {
      return false
    }

    if (!item.Reference.LastContact) {
      return false
    }

    if (!item.Reference.LastContact.date) {
      return false
    }

    if (!item.Reference.Relationship) {
      return false
    }

    if (!item.Reference.Phone) {
      return false
    }

    if (!item.Reference.Phone.number) {
      return false
    }

    if (!item.Reference.Email) {
      return false
    }

    if (!item.Reference.Address) {
      return false
    }

    switch (item.Reference.Address.addressType) {
      case 'United States':
        if (!item.Reference.Address.address || !item.Reference.Address.city || !item.Reference.Address.state || !item.Reference.Address.zipcode) {
          return false
        }
        break

      case 'International':
        if (!item.Reference.Address.address || !item.Reference.Address.city || !item.Reference.Address.country) {
          return false
        }
        break

      case 'APOFPO':
        if (!item.Reference.Address.address || !item.Reference.Address.apoFpo || !item.Reference.Address.apoFpoType || !item.Reference.Address.zipcode) {
          return false
        }
        break

      default:
        return false
    }

    return true
  }

  validateResidenceList (list) {
    for (const residence of list.filter(item => { return item.type === 'Residence' })) {
      if (!this.validateResidence(residence.Item)) {
        return false
      }
    }

    return true
  }

  validateResidence (item) {
    if (!item || !item.Dates || !item.Dates.from || (!item.Dates.to && !item.Dates.present)) {
      return false
    }

    if (!item.Address) {
      return false
    }

    switch (item.Address.addressType) {
      case 'United States':
        if (!item.Address.address || !item.Address.city || !item.Address.state || !item.Address.zipcode) {
          return false
        }
        break

      case 'International':
        if (!item.Address.address || !item.Address.city || !item.Address.country) {
          return false
        }
        break

      case 'APOFPO':
        if (!item.Address.address || !item.Address.apoFpo || !item.Address.apoFpoType || !item.Address.zipcode) {
          return false
        }
        break

      default:
        return false
    }

    if (!item.Role) {
      return false
    }

    if (withinThreeYears(item.Dates.from, item.Dates.to)) {
      if (!item.Reference) {
        return false
      }

      if (!item.Reference.FullName) {
        return false
      }

      if (!item.Reference.FullName.first || !item.Reference.FullName.last) {
        return false
      }

      if (!item.Reference.LastContact) {
        return false
      }

      if (!item.Reference.LastContact.date) {
        return false
      }

      if (!item.Reference.Relationship) {
        return false
      }

      if (!item.Reference.Phone) {
        return false
      }

      if (!item.Reference.Phone.number) {
        return false
      }

      if (!item.Reference.Email) {
        return false
      }

      if (!item.Reference.Address) {
        return false
      }

      switch (item.Reference.Address.addressType) {
        case 'United States':
          if (!item.Reference.Address.address || !item.Reference.Address.city || !item.Reference.Address.state || !item.Reference.Address.zipcode) {
            return false
          }
          break

        case 'International':
          if (!item.Reference.Address.address || !item.Reference.Address.city || !item.Reference.Address.country) {
            return false
          }
          break

        case 'APOFPO':
          if (!item.Reference.Address.address || !item.Reference.Address.apoFpo || !item.Reference.Address.apoFpoType || !item.Reference.Address.zipcode) {
            return false
          }
          break

        default:
          return false
      }
    }

    return true
  }

  validateEducationList (list) {
    for (const education of list.filter(item => { return item.type === 'Education' })) {
      if (!this.validateEducation(education.Item)) {
        return false
      }
    }

    return true
  }

  validateEducation (item) {
    if (!item) {
      return false
    }

    if (!(item.HasAttended === 'No' || item.HasAttended === 'Yes')) {
      return false
    }

    if (item.HasAttended === 'No' && !(item.HasDegree10 === 'No' || item.HasDegree10 === 'Yes')) {
      return false
    }

    if (item.HasAttended === 'Yes' || item.HasDegree10 === 'Yes') {
      if (!item.Address) {
        return false
      }

      switch (item.Address.addressType) {
        case 'United States':
          if (!item.Address.address || !item.Address.city || !item.Address.state || !item.Address.zipcode) {
            return false
          }
          break

        case 'International':
          if (!item.Address.address || !item.Address.city || !item.Address.country) {
            return false
          }
          break

        case 'APOFPO':
          if (!item.Address.address || !item.Address.apoFpo || !item.Address.apoFpoType || !item.Address.zipcode) {
            return false
          }
          break

        default:
          return false
      }

      if (!item.Name || !item.Name.value) {
        return false
      }

      if (!item.Type) {
        return false
      }

      if (!item.Dates || !item.Dates.from || (!item.Dates.to && !item.Dates.present)) {
        return false
      }

      if (withinThreeYears(item.Dates.from, item.Dates.to)) {
        if (!item.Reference) {
          return false
        }

        if (!item.Reference.FullName) {
          return false
        }

        if (!item.Reference.FullName.first || !item.Reference.FullName.last) {
          return false
        }

        if (!item.Reference.LastContact) {
          return false
        }

        if (!item.Reference.LastContact.date) {
          return false
        }

        if (!item.Reference.Relationship) {
          return false
        }

        if (!item.Reference.Phone) {
          return false
        }

        if (!item.Reference.Phone.number) {
          return false
        }

        if (!item.Reference.Email) {
          return false
        }

        if (!item.Reference.Address) {
          return false
        }

        switch (item.Reference.Address.addressType) {
          case 'United States':
            if (!item.Reference.Address.address || !item.Reference.Address.city || !item.Reference.Address.state || !item.Reference.Address.zipcode) {
              return false
            }
            break

          case 'International':
            if (!item.Reference.Address.address || !item.Reference.Address.city || !item.Reference.Address.country) {
              return false
            }
            break

          case 'APOFPO':
            if (!item.Reference.Address.address || !item.Reference.Address.apoFpo || !item.Reference.Address.apoFpoType || !item.Reference.Address.zipcode) {
              return false
            }
            break

          default:
            return false
        }
      }

      if (!(item.HasDegree === 'No' || item.HasDegree === 'Yes')) {
        return false
      }

      if (item.HasDegree === 'Yes') {
        if (!item.Diplomas) {
          return false
        }

        for (const diplomaItem of item.Diplomas) {
          if (!diplomaItem.Diploma) {
            return false
          }

          const diploma = diplomaItem.Diploma
          if (!diploma.Diploma) {
            return false
          }

          if (diploma.Diploma === 'Other' && !diploma.DiplomaOther) {
            return false
          }

          if (!diploma.Date || !diploma.Date.date) {
            return false
          }
        }
      }
    }

    return true
  }

  /**
   * Determines if any items exist in the collection. This includes residence and employer
   * information
   */
  isEmpty () {
    return !this.containsResidence() && !this.containsEmployment() && !this.containsEducation()
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

  /**
   * Determines if any education items exist
   */
  containsEducation () {
    return this.props.history && this.props.history.Education && this.props.history.Education.List
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
    if (this.props.types.includes('Residence') && history.Residence && history.Residence.List) {
      const residences = history.Residence.List.map(r => {
        r.type = 'Residence'
        return r
      })

      list = list.concat(residences)
    }

    if (this.props.types.includes('Employment') && history.Employment && history.Employment.List) {
      const employment = history.Employment.List.map(r => {
        r.type = 'Employment'
        return r
      })

      list = list.concat(employment)
    }

    if (this.props.types.includes('Education') && history.Education && history.Education.List) {
      const education = history.Education.List.map(r => {
        r.type = 'Education'
        return r
      })

      list = list.concat(education)
    }

    this.setState({
      List: list.sort(this.sort)
    })
  }

  /**
   * Default sorting of history objects. This assumes that all objects contain a `Dates` property
   * with date range values.
   */
  sort (a, b) {
    const first = ((a || {}).Item || {}).Dates
    const second = ((b || {}).Item || {}).Dates

    if (!first && !second) {
      return 0
    }

    if (!first || !first.to) {
      return -1
    }

    if (!second || !second.to) {
      return 1
    }

    return second.to.getTime() - first.to.getTime()
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
    this.setState({ List: items }, () => {
      // filter list by current collection type being updated
      const filtered = items.filter(i => { return i.type === type })

      if (type === 'Residence' && this.props.onResidenceUpdate) {
        this.props.onResidenceUpdate({List: filtered})
      } else if (type === 'Employment' && this.props.onEmploymentUpdate) {
        this.props.onEmploymentUpdate({List: filtered})
      } else if (type === 'Education' && this.props.onEducationUpdate) {
        this.props.onEducationUpdate({List: filtered})
      } else {
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
        // Check to see if there are multiple types of items supported
        if (this.props.types.length === 1) {
          this.selectCollectionType(this.props.types[0])
        } else {
          this.refs.createOptions.scrollIntoView()
        }
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
   * Residence | Employment | Education
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
      if (this.refs.createOptions.scrollIntoView) {
        this.refs.createOptions.scrollIntoView()
      }
    })
  }

  /**
   * Prepoulate a new item to fill in a particular gap.
   */
  fillGap (type, dates) {
    this.setState({
      collectionType: type,
      currentNewItem: {
        type: type,
        force: true,
        values: {
          Dates: {
            from: dates.from,
            to: dates.to
          }
        }
      }
    }, () => {
      if (this.refs.createOptions.scrollIntoView) {
        this.refs.createOptions.scrollIntoView()
      }
    })
  }

  /**
   * Contains the types of History objects a user can create
   */
  createOptions () {
    if (this.props.types.length < 2) {
      return (
        <div className="eapp-field-wrap" ref="createOptions"></div>
      )
    }

    let options = []
    if (this.props.types.includes('Residence')) {
      options.push(
        <Radio label="Residence"
               value="Residence"
               onChange={this.handleCollectionTypeChange}>
          <div className="eye-icon">
            <Svg src="img/residence-house.svg" />
          </div>
        </Radio>
      )
    }

    if (this.props.types.includes('Employment')) {
      options.push(
        <Radio label="Employer"
               value="Employment"
               onChange={this.handleCollectionTypeChange}>
          <div className="eye-icon">
            <Svg src="img/employer-briefcase.svg" />
          </div>
        </Radio>
      )
    }

    if (this.props.types.includes('Education')) {
      options.push(
        <Radio label="School/Degree"
               value="Education"
               onChange={this.handleCollectionTypeChange}>
          <div className="eye-icon">
            <Svg src="img/school-cap.svg" />
          </div>
        </Radio>
      )
    }

    return (
      <div>
        <h3>Add new</h3>
        <div className="eapp-field-wrap" ref="createOptions">
          <RadioGroup className="option-list eapp-extend-labels create"
                      name="createOptions"
                      selectedValue={this.state.collectionType}>
            {options}
          </RadioGroup>
        </div>
        <hr className="section-divider" />
      </div>
    )
  }

  render () {
    // Inject any gaps in to our timeline
    const start = daysAgo(today, 365 * parseInt(this.props.total || 10))
    const list = this.props.showGaps
          ? InjectGaps(this.state.List, ['Residence', 'Employment'], start).sort(this.sort)
          : this.state.List.sort(this.sort)

    // Create the list items
    const listItems = list.map((item, i, arr) => {
      const firstRow = (i === 0)
      const lastRow = arr.length === (i + 1)

      if (item.type === 'Residence') {
        const hasErrors = !this.validateResidence(item.Item)
        const header = (<ResidenceSummary residence={item} hasErrors={hasErrors} />)
        const errorMessage = i18n.t('history.residence.collection.summary.incomplete')

        return (
          <Row header={header}
               index={i}
               key={i}
               first={firstRow}
               last={lastRow}
               hasErrors={hasErrors}
               errorMessage={errorMessage}
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
        const hasErrors = !this.validateEmployment(item.Item)
        const header = (<EmploymentSummary employment={item} hasErrors={hasErrors} />)
        const errorMessage = i18n.t('history.employment.default.collection.summary.incomplete')

        return (
          <Row header={header}
               index={i}
               key={i}
               first={firstRow}
               last={lastRow}
               hasErrors={hasErrors}
               errorMessage={errorMessage}
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

      if (item.type === 'Education') {
        const hasErrors = !this.validateEducation(item.Item)
        const header = (<EducationSummary education={item} hasErrors={hasErrors} />)
        const errorMessage = i18n.t('history.education.collection.school.summary.incomplete')

        return (
          <Row header={header}
               index={i}
               key={i}
               first={firstRow}
               last={lastRow}
               hasErrors={hasErrors}
               errorMessage={errorMessage}
               onRemove={this.remove.bind(this, item.type)}
               show={item.isNew}>
            <div className="education">
              <EducationItem name="Education"
                              {...item.Item}
                              onUpdate={this.onUpdate.bind(this, 'Education', i)}
                              onValidate={this.handleValidation}
                              />
            </div>
          </Row>
        )
      }

      if (item.type === 'Gap') {
        return (
          <Gap index={i}
               key={i}
               first={firstRow}
               last={lastRow}
               dates={item.Item.Dates}
               type={item.Item.Type}
               onClick={this.fillGap.bind(this, item.Item.Type, item.Item.Dates)}
               />
        )
      }

      return null
    })

    const force = (this.state.currentNewItem || {}).force || false
    const values = (this.state.currentNewItem || {}).values || {}

    // Render the defaults
    return (
      <div className="history-collection collection">

        <Show when={listItems.length === 0}>
          <div className="item">
            <div className="summary">
              <div className="caption gutters">
                <div className="title">
                  <h4>{i18n.t('collection.summary')}</h4>
                  <hr />
                </div>
              </div>
              <div className="gutters">
                There hasn&rsquo;t been any history saved yet. Please add details below.
              </div>
              <div className="divider gutters closed last">
                <hr />
              </div>
            </div>
          </div>
        </Show>

        { listItems }

        <div>
          {this.createOptions()}

          <Show when={this.state.collectionType === 'Residence'}>
            <div>
              <h2>{i18n.t('history.residence.heading.details')}</h2>
              {i18n.m('history.residence.para.details')}
              <ResidenceItem name="Residence"
                             {...values}
                             receiveProps={force}
                             onUpdate={this.onNewUpdate.bind(this, 'Residence')}
                             onValidate={this.handleValidation}
                             />
            </div>
          </Show>

          <Show when={this.state.collectionType === 'Employment' && this.props.types.length > 1}>
            <div>
              <h2>{i18n.t('history.employment.heading.employment')}</h2>
              {i18n.m('history.employment.para.employment')}
              {i18n.m('history.employment.para.employment2')}
            </div>
          </Show>

          <Show when={this.state.collectionType === 'Employment'}>
            <div className="employment">
              <EmploymentItem name="Employment"
                              {...values}
                              receiveProps={force}
                              onUpdate={this.onNewUpdate.bind(this, 'Employment')}
                              onValidate={this.handleValidation}
                              />
            </div>
          </Show>

          <Show when={this.state.collectionType === 'Education' && this.props.types.length > 1}>
            <div>
              <h2>{i18n.t('history.education.title')}</h2>
              {i18n.m('history.education.info')}
            </div>
          </Show>

          <Show when={this.state.collectionType === 'Education'}>
            <div className="education">
              <EducationItem name="Education"
                             onUpdate={this.onNewUpdate.bind(this, 'Education')}
                             onValidate={this.handleValidation}
                             />
            </div>
          </Show>

          <Show when={this.state.collectionType}>
            <div>
              <hr className="section-divider" />
              <h2>Done! Now let's add some more</h2>
              <p>Use the button below to save your first history entry and start another</p>
              <div>
                <button className="add usa-button-outline" onClick={this.create}>
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
