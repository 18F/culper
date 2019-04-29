import { configure } from '@storybook/react';

import '../src/eqip.scss';

function loadStories() {
  require('../src/stories/index.jsx');
  // You can require as many stories as you need.
}

configure(loadStories, module);
