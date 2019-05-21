/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import { SectionLink } from './SectionLink'

storiesOf('SectionLink', module)
  .addDecorator(StoryRouter())
  .add('default', () => (
    <ol className="usa-sidenav-list">
      <SectionLink
        section={{ label: 'Test Link' }}
      />
    </ol>
  ))
  .add('with errors', () => (
    <ol className="usa-sidenav-list">
      <SectionLink
        section={{ label: 'Test Link' }}
        errors
      />
    </ol>
  ))
  .add('completed', () => (
    <ol className="usa-sidenav-list">
      <SectionLink
        section={{ label: 'Test Link' }}
        completed
      />
    </ol>
  ))
  .add('locked', () => (
    <ol className="usa-sidenav-list">
      <SectionLink
        section={{ label: 'Test Link' }}
        locked
      />
    </ol>
  ))
