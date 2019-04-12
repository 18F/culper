import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import i18n from 'util/i18n'
import { CheckboxGroup, Checkbox } from 'components/Form'

const Infractions = (props) => {
  const {
    values, onUpdate, onError, name, years, yearsString, className,
  } = props

  const update = (newValues) => {
    const selected = newValues.value
    const list = [...(values || [])]

    if (list.includes(selected)) {
      list.splice(list.indexOf(selected), 1)
    } else {
      list.push(selected)
    }

    if (onUpdate) {
      onUpdate({
        name,
        values: list,
      })
    }
  }

  const classes = classnames(
    'option-list',
    'option-list-vertical',
    className,
  )

  return (
    <div>
      {i18n.m('financial.delinquent.para.checkAll')}
      <CheckboxGroup
        className={classes}
        selectedValues={values}
      >
        <Checkbox
          label={i18n.m('financial.delinquent.para.alimony', { years, yearsString })}
          value="Alimony"
          className="delinquent-alimony"
          onUpdate={update}
          onError={onError}
        />
        <Checkbox
          label={i18n.m('financial.delinquent.para.judgement', { years, yearsString })}
          value="Judgement"
          className="delinquent-judgement"
          onUpdate={update}
          onError={onError}
        />
        <Checkbox
          label={i18n.m('financial.delinquent.para.lien', { years, yearsString })}
          value="Lien"
          className="delinquent-lien"
          onUpdate={update}
          onError={onError}
        />
        <Checkbox
          label={i18n.m('financial.delinquent.para.federal')}
          value="Federal"
          className="delinquent-federal"
          onUpdate={update}
          onError={onError}
        />
      </CheckboxGroup>
    </div>
  )
}

Infractions.propTypes = {
  values: PropTypes.array,
  onUpdate: PropTypes.func,
  onError: PropTypes.func,
  name: PropTypes.string.isRequired,
  years: PropTypes.number.isRequired,
  yearsString: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Infractions.defaultProps = {
  values: [],
  onUpdate: () => {},
  onError: (value, arr) => arr,
  className: null,
}

export default Infractions
