import React from 'react'

import Selective from '@components/Section/Military/Selective'
import History from '@components/Section/Military/History'
import Disciplinary from '@components/Section/Military/Disciplinary'
import Foreign from '@components/Section/Military/Foreign'

const Review = ({AddressBooks}) => {
  const subsectionProps = {
    required: true,
    scrollIntoView: false,
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

      //<h1 className="section-header">{i18n.t('military.destination.selective')}</h1>
            //<Show when={showSelectiveService}>
              //<Selective
            //<History

            //<Show when={showDisciplinary}>
              //<hr className="section-divider" />
              //<h1 className="section-header">{i18n.t('military.destination.disciplinary')}</h1>
              //<Disciplinary
            //</Show>

            //<Foreign
              //name="foreign"
              //{...this.props.Foreign}
              //section="military"
              //subsection="foreign"
              //addressBooks={this.props.AddressBooks}
              //dispatch={this.props.dispatch}
              //onUpdate={this.updateForeign}
              //onError={this.handleError}
              //required={true}
              //scrollIntoView={false}
            ///>
  return (
    <div>
      <Selective {...subsectionProps} />
      {sectionDivider}
      <History {...subsectionProps} />
      {sectionDivider}
      <Disciplinary {...subsectionProps} />
      {sectionDivider}
      <Foreign
        {...subsectionProps}
        addressBooks={AddressBooks} />
    </div>
  )
}

Review.defaultProps = {
  AddressBooks: {},
}

export default Review
