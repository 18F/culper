import React from 'react'
import { storiesOf } from '@storybook/react'

import Modal from './Modal'

storiesOf('Modal', module)
  .add('default', () => (
    <Modal
      show
    >
      <h3>Modal title</h3>
      <p>Content that shows within the modal body</p>
    </Modal>
  ))
  .add('default (closable)', () => (
    <Modal
      show
      closeable
    >
      <h3>Modal title</h3>
      <p>Content that shows within the modal body</p>
    </Modal>
  ))
