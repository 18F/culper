import React from 'react'
import { Route } from 'react-router'

import Review from './Review'
import Errors from './Errors'
import Submit from './Submit'
import Print from './Print/index'

const Package = () => (
  <div className="section-view">
    <Route path="/form/package/review" component={Review} />
    <Route path="/form/package/errors" component={Errors} />
    <Route path="/form/package/submit" component={Submit} />
    <Route path="/form/package/print" component={Print} />
  </div>
)


export default Package
