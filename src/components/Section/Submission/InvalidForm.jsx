import React from 'react'
import { i18n } from '../../../config'
import { Link } from 'react-router'
import { navigationWalker } from '../../../config'

export default class InvalidForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      valid: null,
      width: 0
    }
    this.errors = this.errors.bind(this)
  }

  errors () {
    let tally = {}

    navigationWalker((path, child) => {
      if (path.length && path[0].store && child.store && child.validator) {
        if (child.excluded || child.hidden || (child.hiddenFunc && child.hiddenFunc(this.props.application))) {
          return
        }

        const sectionName = path[0].url
        const data = (this.props.application[path[0].store] || {})[child.store] || {}

        let subsectionName = child.url
        if (path.length > 1) {
          for (let i = path.length - 1; i > 0; i--) {
            subsectionName = `${path[i].url}/${subsectionName}`
          }
        }

        let valid = null
        try {
          valid = new child.validator(data, data).isValid()
        } catch (e) {
          valid = null
        }

        if (!tally[sectionName]) {
          tally[sectionName] = {}
        }

        tally[sectionName].section = path[0]
        if (valid === false) {
          tally[sectionName].errors = (tally[sectionName].errors || 0) + (valid === false ? 1 : 0)
          tally[sectionName].subsections = [...(tally[sectionName].subsections || []), child]
        }
      }
    })

    let errors = []
    for (const sectionName in tally) {
      const mark = tally[sectionName]
      if (mark.errors) {
        errors.push(<InvalidSection key={mark.section.url} mark={mark} />)
      }
    }
    return errors
  }

  render () {
    const errors = this.errors()
    return (
      <div className="invalid-form">
        { i18n.m(`submission.invalidForm`) }
        { errors }
      </div>
    )
  }
}

export class InvalidSection extends React.Component {
  render () {
    const incompleteSubsections = this.props.mark.subsections
      .map(subsection => {
        return (<div key={subsection.url}>{ subsection.name }</div>)
      })

    return (
      <div className="field">
        <div className="table expand">
          <span className="messages error-messages">
            <div className="message error">
              <i className="fa fa-exclamation"></i>
              <h3>{ this.props.mark.section.title }</h3>
              { incompleteSubsections }
              <Link to={`/form/${this.props.mark.section.url}/review`}>
                <button className="back usa-button-outline">Back to section</button>
              </Link>
            </div>
          </span>
        </div>
      </div>
    )
  }
}

InvalidForm.defaultProps = {
  application: {}
}
