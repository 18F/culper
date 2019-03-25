import React from 'react'
import i18n from 'util/i18n'
import { Field } from 'components/Form'

const Intro = () => (
  <div>
    <h1 className="section-header">{i18n.t('psychological.intro.title')}</h1>
    <Field
      title={i18n.t('psychological.heading.intro')}
      titleSize="h4"
      optional
      className="no-margin-bottom"
    >
      {i18n.m('psychological.intro.para1')}
      {i18n.m('psychological.intro.para2')}
      {i18n.m('psychological.intro.para3')}
      {i18n.m('psychological.intro.para4')}
    </Field>
  </div>
)

export default Intro
