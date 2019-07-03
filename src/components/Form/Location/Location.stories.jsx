import React from 'react'
import { storiesOf } from '@storybook/react'

import Location from './Location'

storiesOf('Location', module)
  .add('default', () => (
    <Location
      layout={Location.ADDRESS}
    />
  ))
  .add('birthplace', () => (
    <Location
      layout={Location.BIRTHPLACE}
    />
  ))
  .add('birthplace w/o country', () => (
    <Location
      layout={Location.BIRTHPLACE_WITHOUT_COUNTY}
    />
  ))
  .add('country only', () => (
    <Location
      layout={Location.COUNTRY}
    />
  ))
  .add('state only', () => (
    <Location
      layout={Location.STATE}
    />
  ))
  .add('city and state only', () => (
    <Location
      layout={Location.CITY_STATE}
    />
  ))
  .add('street, city, country only', () => (
    <Location
      layout={Location.STREET_CITY_COUNTRY}
    />
  ))
  .add('city and country only', () => (
    <Location
      layout={Location.CITY_COUNTRY}
    />
  ))
  .add('city, state, country only', () => (
    <Location
      layout={Location.CITY_STATE_COUNTRY}
    />
  ))
  .add('U.S. address', () => (
    <Location
      layout={Location.US_ADDRESS}
    />
  ))
  .add('city, street only', () => (
    <Location
      layout={Location.STREET_CITY}
    />
  ))
