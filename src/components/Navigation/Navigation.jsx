import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AuthenticatedView from '../../views/AuthenticatedView'
import { navigation } from '../../config'
import { ScoreCard } from './../ScoreCard'
import SectionList from './SectionList'

import Identification from './../../components/Section/Identification/navigation'
// disambiguate from History class in browser
import HistoryNav from './../../components/Section/History/navigation'
import Relationships from './../../components/Section/Relationships/navigation'
import Citizenship from './../../components/Section/Citizenship/navigation'
import Military from './../../components/Section/Military/navigation'
import Foreign from './../../components/Section/Foreign/navigation'
import Financial from './../../components/Section/Financial/navigation'
import SubstanceUse from './../../components/Section/SubstanceUse/navigation'
import Legal from './../../components/Section/Legal/navigation'
import Psychological from './../../components/Section/Psychological/navigation'
import { Review } from './../../config/navigation'
import {
  handleUpdateNavigation,
  handleUpdateNavigationCount
} from './../../actions/NavigationActions'

class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.generateNavigation = this.generateNavigation.bind(this)
    this.get85Navigation = this.get85Navigation.bind(this)
    this.get86Navigation = this.get86Navigation.bind(this)
    this.getSectionTotal = this.getSectionTotal.bind(this)
  }

  get85Navigation() {
    return [
      Identification,
      HistoryNav,
      Citizenship,
      Military,
      Foreign,
      Financial,
      SubstanceUse,
      Legal,
      Review
    ]
  }

  /**
   * Gets the Navigation for SF-86
   * This is considered the 'default' for eApp
   */
  get86Navigation() {
    return [
      Identification,
      HistoryNav,
      Relationships,
      Citizenship,
      Military,
      Foreign,
      Financial,
      SubstanceUse,
      Legal,
      Psychological,
      Review
    ]
  }

  getSectionTotal(navigationSections) {
    return navigationSections
      .filter(section => !section.hidden)
      .filter(section => !section.exclude)
      .length
  }

  generateNavigation() {
    const { formType } = this.props
    switch (formType) {
      case '85':
        return this.get85Navigation()
      case '86':
        return this.get86Navigation()
      default:
        return this.get86Navigation()
    }
  }

  componentDidMount() {
    const {
      handleUpdateNavigation,
      handleUpdateNavigationCount
    } = this.props

    const navigationSections = this.generateNavigation()
    handleUpdateNavigation(navigationSections)
    handleUpdateNavigationCount(
      // TODO NEED TO ADD THE COMPLETED COUNT
      0,
      this.getSectionTotal(navigationSections)
    )

  }

  render() {
    const {
      formType,
      totalSectionsCount,
      completedSectionsCount
    } = this.props
    return (
      <nav className="form-navigation" role="navigation">
        <ScoreCard
          totalSectionsCount={totalSectionsCount}
          completedSectionsCount={completedSectionsCount}
        />
        <SectionList sections={navigation} />
      </nav>
    )
  }
}

Navigation.propTypes = {
  formType: PropTypes.string,
  navigation: PropTypes.array.isRequired,
  completedSectionsCount: PropTypes.number.isRequired,
  totalSectionsCount: PropTypes.number.isRequired,
  handleUpdateNavigation: PropTypes.func.isRequired,
  handleUpdateNavigationCount: PropTypes.func.isRequired
}

Navigation.defaultProps = {
  formType: '86'
}

function mapStateToProps(state) {
  const { application } = state

  return {
    navigation: application.Navigation.sections,
    completedSectionsCount: application.Navigation.completedSectionsCount,
    totalSectionsCount: application.Navigation.totalSectionsCount
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleUpdateNavigation: sections => {
      dispatch(handleUpdateNavigation(sections))
    },
    handleUpdateNavigationCount: (completed, total) => {
      dispatch(handleUpdateNavigationCount(completed, total))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticatedView(Navigation))
