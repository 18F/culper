import { configure, addDecorator } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'

import '../src/eqip.scss'

addDecorator(withA11y)

function loadStories() {
  const req = require.context('../src', true, /\.stories\.jsx$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
