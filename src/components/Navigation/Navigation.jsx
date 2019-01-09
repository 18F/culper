import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compact from 'lodash/compact'
import AuthenticatedView from '../../views/AuthenticatedView'
import { ScoreCard } from './../ScoreCard'
import SectionList from './SectionList'

import Identification from './../../components/Section/Identification/navigation'
// disambiguate from History class in browser
import historyNavigation from './../../components/Section/History/navigation'
import relationshipsNavigation from './../../components/Section/Relationships/navigation'
import Citizenship from './../../components/Section/Citizenship/navigation'
import Military from './../../components/Section/Military/navigation'
import Foreign from './../../components/Section/Foreign/navigation'
import Financial from './../../components/Section/Financial/navigation'
import SubstanceUse from './../../components/Section/SubstanceUse/navigation'
import Legal from './../../components/Section/Legal/navigation'
import psychologicalNavigation from './../../components/Section/Psychological/navigation'
import { Review } from './../../config/navigation'
import {
  handleUpdateNavigation,
  handleUpdateNavigationCount
} from './../../actions/NavigationActions'

class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.getNavigation = this.getNavigation.bind(this)
    this.getSectionTotal = this.getSectionTotal.bind(this)
  }

  getNavigation() {
    const { formType } = this.props
    return compact([
      Identification,
      historyNavigation(formType),
      relationshipsNavigation(formType),
      Citizenship,
      Military,
      Foreign,
      Financial,
      SubstanceUse,
      Legal,
      psychologicalNavigation(formType),
      Review
    ])
  }

  getSectionTotal(navigationSections) {
    return navigationSections
      .filter(section => !section.hidden)
      .filter(section => !section.exclude)
      .length
  }

  componentDidMount() {
    const {
      handleUpdateNavigation,
      handleUpdateNavigationCount
    } = this.props

    const navigationSections = this.getNavigation()
    handleUpdateNavigation(navigationSections)
    handleUpdateNavigationCount(
      // TODO NEED TO ADD THE COMPLETED COUNT
      0,
      this.getSectionTotal(navigationSections)
    )

  }

  render() {
    const {
      totalSectionsCount,
      completedSectionsCount,
      navigation
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
