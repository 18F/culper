import React from 'react'
import { i18n } from '../../../config'
import { Location, ValidationElement, Field, Text, DateControl, BranchCollection, Svg, Show } from '../../Form'

export default class Order extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateOccurred = this.updateOccurred.bind(this)
    this.updateCourtName = this.updateCourtName.bind(this)
    this.updateCourtAddress = this.updateCourtAddress.bind(this)
    this.updateDisposition = this.updateDisposition.bind(this)
    this.updateAppeals = this.updateAppeals.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Occurred: this.props.Occurred,
      CourtName: this.props.CourtName,
      CourtAddress: this.props.CourtAddress,
      Disposition: this.props.Disposition,
      Appeals: this.props.Appeals,
      ...queue
    })
  }

  updateOccurred (values) {
    this.update({
      Occurred: values
    })
  }

  updateCourtName (values) {
    this.update({
      CourtName: values
    })
  }

  updateCourtAddress (values) {
    this.update({
      CourtAddress: values
    })
  }

  updateDisposition (values) {
    this.update({
      Disposition: values
    })
  }

  updateAppeals (values) {
    this.update({
      Appeals: values
    })
  }

  render () {
    const prefix = this.props.prefix
    return (
      <div className="order">
        <Field title={i18n.t(`psychological.${prefix}.heading.occurred`)}
               help={`psychological.${prefix}.help.occurred`}
               adjustFor="labels"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <DateControl name="Occurred"
                       {...this.props.Occurred}
                       label={i18n.t(`psychological${prefix}.label.occurred`)}
                       hideDay={true}
                       minDate={this.props.ApplicantBirthDate}
                       prefix="order"
                       onUpdate={this.updateOccurred}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t(`psychological.${prefix}.heading.courtName`)}
          help={`psychological.${prefix}.help.courtName`}
          scrollIntoView={this.props.scrollIntoView}>
          <Text name="CourtName"
                className="courtname"
                {...this.props.CourtName}
                onUpdate={this.updateCourtName}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t(`psychological.${prefix}.heading.courtAddress`)}
               help={`psychological.${prefix}.help.courtAddress`}
               adjustFor="address"
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="CourtAddress"
                    {...this.props.CourtAddress}
                    label={i18n.t(`psychological.${prefix}.label.courtAddress`)}
                    layout={Location.ADDRESS}
                    geocode={true}
                    onUpdate={this.updateCourtAddress}
                    onError={this.props.onError}
                    required={this.props.required}
                    scrollIntoView={this.props.scrollIntoView}
                    />
        </Field>

        <Show when={prefix !== 'competence'}>
          <Field title={i18n.t(`psychological.${prefix}.heading.disposition`)}
            help={`psychological.consultation.help.disposition`}
            scrollIntoView={this.props.scrollIntoView}>
            <Text name="Disposition"
                  className="disposition"
                  {...this.props.Disposition}
                  onUpdate={this.updateDisposition}
                  onError={this.props.onError}
                  required={this.props.required}
                  />
          </Field>
        </Show>

        <BranchCollection className="appeals"
                          label={i18n.t(`psychological.${prefix}.heading.appealed`)}
                          appendLabel={i18n.t(`psychological.${prefix}.heading.appealedAnother`)}
                          items={this.props.Appeals}
                          onError={this.props.onError}
                          required={this.props.required}
                          onUpdate={this.updateAppeals}
                          scrollIntoView={this.props.scrollIntoView}
                          >

          <Field title={i18n.t(`psychological.${prefix}.heading.needMore`)}
            className="more title"
            scrollIntoView={this.props.scrollIntoView}>
            <Svg src="/img/date-down-arrow.svg" className="more arrow" />
          </Field>

          <Field title={i18n.t(`psychological.${prefix}.heading.appealCourtName`)}
            scrollIntoView={this.props.scrollIntoView}>
            <Text name="CourtName"
                  className="courtname"
                  bind={true}
                  onError={this.props.onError}
                  required={this.props.required}
                  />
          </Field>

          <Field title={i18n.t(`psychological.${prefix}.heading.appealCourtName`)}
            adjustFor="address"
            scrollIntoView={this.props.scrollIntoView}>
            <Location name="CourtAddress"
                      bind={true}
                      label={i18n.t(`psychological.${prefix}.label.courtAddress`)}
                      layout={Location.ADDRESS}
                      geocode={true}
                      onError={this.props.onError}
                      required={this.props.required}
                      scrollIntoView={this.props.scrollIntoView}
                      />
          </Field>

          <Field title={i18n.t(`psychological.${prefix}.heading.disposition`)}
            help={`psychological.${prefix}.help.disposition`}
            scrollIntoView={this.props.scrollIntoView}>
            <Text name="Disposition"
                  className="disposition"
                  bind={true}
                  onError={this.props.onError}
                  required={this.props.required}
                  />
          </Field>
        </BranchCollection>
      </div>
    )
  }
}

Order.defaultProps = {
  List: [],
  prefix: 'order',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
