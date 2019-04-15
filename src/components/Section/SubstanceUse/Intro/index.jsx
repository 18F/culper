import React from 'react'

import i18n from 'util/i18n'
import { SUBSTANCE_USE } from 'config/formSections/substanceUse'

import SectionIntro from 'components/Section/shared/SectionIntro'

const Intro = () => (
  <SectionIntro
    title={i18n.t('substance.intro.title')}
    body={i18n.m('substance.intro.body')}
    sectionKey={SUBSTANCE_USE.key}
  />
)

export default Intro
