import React from 'react'
import { i18n, env } from '../../../config'
import { updateSection } from '../../../actions/SectionActions'
import { Link } from 'react-router-dom'
import { Show } from '../../Form'
import InvalidSection from './InvalidSection'

export default class InvalidForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      valid: null,
      width: 0
    }
    this.clicked = this.clicked.bind(this)
    this.errors = this.errors.bind(this)
  }

  clicked (section, subsection, event) {
    this.props.dispatch(updateSection(section, subsection))
  }

  errors () {
    let errors = []
    for (const sectionName in this.props.tally) {
      const mark = this.props.tally[sectionName]
      if (mark.errors) {
        errors.push(<InvalidSection key={mark.section.url} mark={mark} onClick={this.clicked} />)
      }
    }
    return errors
  }

  render () {
    return (
      <div className="invalid-form">
        { i18n.m(`application.invalidForm`) }
        { this.errors() }
        <Show when={!env.IsProduction()}>
          <Link to={`/form/package/submit`} onClick={this.clicked.bind(this, 'package', 'submit')}>Simulate valid form</Link>
        </Show>
      </div>
    )
  }
}

InvalidForm.defaultProps = {
  tally: {},
  dispatch: (action) => {}
}
