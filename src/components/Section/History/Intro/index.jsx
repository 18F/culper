import React from 'react'

import i18n from 'util/i18n'
import { HISTORY } from 'config/formSections/history'

import SectionIntro from 'components/Section/shared/SectionIntro'

const Intro = () => (
  <SectionIntro
    title={i18n.t('history.intro.title')}
    body={i18n.m('history.intro.body')}
    sectionKey={HISTORY.key}
  />
)

export default Intro
