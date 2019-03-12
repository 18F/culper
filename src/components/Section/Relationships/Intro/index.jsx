import React from 'react'
import i18n from 'util/i18n'
import { Field } from 'components/Form'

const Intro = () => (
  <div>
    <h1 className="section-header">{i18n.t('relationships.intro.title')}</h1>
    <Field
      optional
      className="no-margin-bottom"
    >
      {i18n.m('relationships.intro.body')}
    </Field>
  </div>
)

export default Intro
