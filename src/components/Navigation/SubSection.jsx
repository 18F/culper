import AuthenticatedView from '../../views/AuthenticatedView'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'
import { updateSection } from '../../actions/SectionActions'

class SubSection extends React.Component {
  clicked(url, event) {
    const parts = (url || '').replace('/form/', '').split('/')
    const section = parts.shift()
    const subsection = parts.join('/') || 'intro'
    this.props.dispatch(updateSection(section, subsection))
  }

  render () {
    let href, onClick
    let subClass = this.props.subClass
    if (this.props.locked) {
      href = 'javascript:;;;'
      onClick = ''
      subClass += ' locked'
    } else {
      href = this.props.subUrl
      onClick = this.clicked.bind(this, href)
    }

    return (
      <div className="subsection">
        <Link to={href} className={subClass} onClick={onClick}>
          <span className="section-name">
            {this.props.name}
          </span>
          <span className="mini eapp-status-icon-valid"></span>
          <span className="mini eapp-status-icon-error"></span>
        </Link>
      </div>
    )
  }
}

SubSection.defaultProps = {
  locked: false
}

export default connect()(AuthenticatedView(SubSection))
