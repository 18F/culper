import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/** For use with top-level form sections only */
const InvalidSection = ({ section }) => (
  <div className="field">
    <div className="table expand">
      <div className="usa-alert usa-alert-error" role="alert">
        <div className="usa-alert-body">
          <h5 className="usa-alert-heading">
            {section.label}
          </h5>
          <ul>
            {section.subsections.map((ss) => {
              if (!ss.isValid) {
                return (
                  <li key={`package-review-errors-${ss.key}`}>
                    {ss.label}
                  </li>
                )
              }
              return null
            })}
          </ul>

          <Link to={`/form/${section.path}/review`}>
            <button
              type="button"
              className="back usa-button-outline"
            >
              Back to section
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

InvalidSection.propTypes = {
  section: PropTypes.object.isRequired,
}

export default InvalidSection
