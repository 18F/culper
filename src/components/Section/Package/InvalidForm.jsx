import React from 'react'
import { i18n, env } from '../../../config'
import { Link } from 'react-router-dom'
import { Show } from '../../Form'
import InvalidSection from './InvalidSection'

export default class InvalidForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valid: null,
      width: 0
    }
    this.errors = this.errors.bind(this)
  }

  errors() {
    let errors = []
    for (const sectionName in this.props.tally) {
      const mark = this.props.tally[sectionName]
      if (mark.errors) {
        errors.push(<InvalidSection key={mark.section.url} mark={mark} />)
      }
    }
    return errors
  }

  render() {
    return (
      <div className="invalid-form">
        {i18n.m(`application.invalidForm`)}
        {this.errors()}
        <Show when={!env.IsProduction()}>
          <Link to="/form/package/submit">Simulate valid form</Link>
        </Show>
      </div>
    )
  }
}

InvalidForm.defaultProps = {
  tally: {},
  dispatch: action => {}
}
