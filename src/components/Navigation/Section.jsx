import AuthenticatedView from '../../views/AuthenticatedView'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'
import { updateSection } from '../../actions/SectionActions'

class Section extends React.Component {
  clicked(url, event) {
    const parts = (url || '').replace('/form/', '').split('/')
    const section = parts.shift()
    const subsection = parts.join('/') || 'intro'
    this.props.dispatch(updateSection(section, subsection))
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
      onClick = this.clicked.bind(this, url)
    }

    let topCls, iconCls
    if (this.props.isSubSection) {
      iconCls = 'mini'
      topCls = 'subsection'
    } else {
      iconCls = ''
      topCls = 'section'
    }

    return (
      <div className={topCls}>
        <span className="section-title">
          <Link to={url} className={sectionClass} onClick={onClick}>
            <span className="section-number">{this.props.showNumber ? this.props.sectionNum : ''}</span>
            <span className="section-name">
              {this.props.name}
            </span>
            <span className={`eapp-status-icon-valid ${iconCls}`}></span>
            <span className={`eapp-status-icon-error ${iconCls}`}></span>
          </Link>
        </span>
      </div>
    )
  }
}

Section.defaultProps = {
  iconCls: '',
  isSubSection: false,
  locked: true,
  showNumber: false
}

export default connect()(AuthenticatedView(Section))
