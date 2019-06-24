import React from 'react'
import { storiesOf } from '@storybook/react'

import Location from './Location'

storiesOf('Location', module)
  .add('default', () => (
    <Location
      layout={Location.ADDRESS}
    />
  ))
  .add('default (birthplace)', () => (
    <Location
      layout={Location.BIRTHPLACE}
    />
  ))
  .add('default (birthplace w/o country)', () => (
    <Location
      layout={Location.BIRTHPLACE_WITHOUT_COUNTY}
    />
  ))
  .add('default (country only)', () => (
    <Location
      layout={Location.COUNTRY}
    />
  ))
  .add('default (state only)', () => (
    <Location
      layout={Location.STATE}
    />
  ))
  .add('default (city and state only)', () => (
    <Location
      layout={Location.CITY_STATE}
    />
  ))
  .add('default (street, city, country only)', () => (
    <Location
      layout={Location.STREET_CITY_COUNTRY}
    />
  ))
  .add('default (city and country only)', () => (
    <Location
      layout={Location.CITY_COUNTRY}
    />
  ))
  .add('default (city, state, country only)', () => (
    <Location
      layout={Location.CITY_STATE_COUNTRY}
    />
  ))
  .add('default (U.S. address)', () => (
    <Location
      layout={Location.US_ADDRESS}
    />
  ))
  .add('default (city, street only)', () => (
    <Location
      layout={Location.STREET_CITY}
    />
  ))
