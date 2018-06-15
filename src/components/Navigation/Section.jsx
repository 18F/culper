import AuthenticatedView from '../../views/AuthenticatedView'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'
import { Show } from '../Form'
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

    const topCls = this.props.isSubSection ? 'subsection' : 'section'

    return (
      <div className={topCls}>
        <span className="section-title">
          <Link to={url} className={sectionClass} onClick={onClick}>
            <Show when={this.props.sectionNum}>
              <span className="section-number">{this.props.sectionNum}</span>
            </Show>
            <span className="section-name">
              {this.props.name}
            </span>
            <span className="eapp-status-icon eapp-status-icon-valid"></span>
            <span className="eapp-status-icon eapp-status-icon-error"></span>
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
  sectionNum: null
}

export default connect()(AuthenticatedView(Section))
