import AuthenticatedView from '../../views/AuthenticatedView'
import { connect } from 'react-redux'
import { parseFormUrl } from './navigation-helpers'
import React from 'react'
import SectionLink from './SectionLink'
import { updateSection } from '../../actions/SectionActions'

class Section extends React.Component {
  clicked() {
    const parts = parseFormUrl(this.props.subUrl)
    this.props.dispatch(updateSection(parts.section, parts.subsection))
  }

  render() {
    let url, onClick
    let sectionClass = this.props.sectionClass
    if (this.props.locked) {
      url = 'javascript:;;;'
      onClick = ''
      sectionClass += ' locked'
    } else {
      url = this.props.subUrl
      onClick = this.clicked.bind(this)
    }

    const topCls = this.props.isSubSection ? 'subsection' : 'section'

    return (
      <div className={topCls}>
        <span className="section-title">
          <SectionLink
            className={sectionClass}
            title={this.props.name}
            onClick={onClick}
            sectionNum={this.props.sectionNum}
            to={url} />
        </span>
      </div>
    )
  }
}

Section.defaultProps = {
  isSubSection: false,
  locked: false,
  sectionNum: null
}

export default connect()(AuthenticatedView(Section))
