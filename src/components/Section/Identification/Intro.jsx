import React from 'react'

import i18n from 'util/i18n'
import { IDENTIFICATION } from 'config/formSections/identification'

import SectionIntro from 'components/Section/shared/SectionIntro'

const Intro = () => (
  <SectionIntro
    title={i18n.t('identification.intro.title')}
    body={i18n.m('identification.intro.body')}
    sectionKey={IDENTIFICATION.key}
  />
)

export default Intro
