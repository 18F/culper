import React from 'react'

import i18n from 'util/i18n'
import { PSYCHOLOGICAL } from 'config/formSections/psychological'

import SectionIntro from 'components/Section/shared/SectionIntro'

const Intro = () => (
  <SectionIntro
    title={i18n.t('psychological.intro.title')}
    fieldTitle={i18n.t('psychological.heading.intro')}
    body={(
      <span>
        {i18n.m('psychological.intro.para1')}
        {i18n.m('psychological.intro.para2')}
        {i18n.m('psychological.intro.para3')}
        {i18n.m('psychological.intro.para4')}
      </span>
    )}
    sectionKey={PSYCHOLOGICAL.key}
  />
)

export default Intro
