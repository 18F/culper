import React from 'react'

import i18n from 'util/i18n'
import { MILITARY } from 'config/formSections/military'

import SectionIntro from 'components/Section/shared/SectionIntro'

const Intro = () => (
  <SectionIntro
    title={i18n.t('military.intro.title')}
    body={i18n.m('military.intro.body')}
    sectionKey={MILITARY.key}
  />
)

export default Intro
