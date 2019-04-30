import React from 'react'

import i18n from 'util/i18n'
import { FOREIGN } from 'config/formSections/foreign'

import SectionIntro from 'components/Section/shared/SectionIntro'

const Intro = () => (
  <SectionIntro
    title={i18n.t('foreign.intro.title')}
    body={i18n.m('foreign.intro.body')}
    sectionKey={FOREIGN.key}
  />
)

export default Intro
