import React from 'react'
import { Switch, Route } from 'react-router'

/** Form Section components */
import Identification from './Identification'
import Financial from './Financial'
import Relationships from './Relationships'
import Citizenship from './Citizenship'
import Foreign from './Foreign'
import Military from './Military'
import History from './History'
import Legal from './Legal'
import Psychological from './Psychological'
import SubstanceUse from './SubstanceUse'
import Package from './Package'

const Section = () => (
  <Switch>
    <Route path="/form/identification" component={Identification} />
    <Route path="/form/history" component={History} />
    <Route path="/form/relationships" component={Relationships} />
    <Route path="/form/citizenship" component={Citizenship} />
    <Route path="/form/military" component={Military} />
    <Route path="/form/foreign" component={Foreign} />
    <Route path="/form/financial" component={Financial} />
    <Route path="/form/substance" component={SubstanceUse} />
    <Route path="/form/legal" component={Legal} />
    <Route path="/form/psychological" component={Psychological} />

    <Route path="/form/package" component={Package} />
  </Switch>
)

export default Section
