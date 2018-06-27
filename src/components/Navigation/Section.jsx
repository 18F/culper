import AuthenticatedView from '../../views/AuthenticatedView'
import React from 'react'
import SectionLink from './SectionLink'

class Section extends React.Component {
  render() {
    let url
    let sectionClass = this.props.sectionClass
    if (this.props.locked) {
      url = 'javascript:;;;'
      sectionClass += ' locked'
    } else {
      url = this.props.subUrl
    }

    const topCls = this.props.isSubSection ? 'subsection' : 'section'

    return (
      <div className={topCls}>
        <span className="section-title">
          <SectionLink
            className={sectionClass}
            title={this.props.name}
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

export default AuthenticatedView(Section)
