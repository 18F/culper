import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import i18n from 'util/i18n'

import { Field } from 'components/Form'

import { getSectionNumber } from 'helpers/navigation'

const SectionIntro = ({
  title, body, sectionNumber, fieldTitle,
}) => {
  const introTitle = `${i18n.t('section.section')} ${sectionNumber}: ${title}`

  return (
    <div>
      <h1 className="section-header">{introTitle}</h1>

      <Field title={fieldTitle} optional className="no-margin-bottom">
        {body}
      </Field>
    </div>
  )
}

SectionIntro.propTypes = {
  title: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  sectionNumber: PropTypes.number.isRequired,
  fieldTitle: PropTypes.node,
}

SectionIntro.defaultProps = {
  fieldTitle: undefined,
}

const mapStateToProps = (state, ownProps) => ({
  sectionNumber: getSectionNumber(state, ownProps),
})

export default connect(mapStateToProps)(SectionIntro)
