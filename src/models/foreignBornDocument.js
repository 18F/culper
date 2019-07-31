import foreignBornDocumentTypes from 'constants/enums/foreignBornDocumentTypes'

const foreignBornDocument = {
  DocumentType: {
    presence: true,
    hasValue: {
      validator: { inclusion: foreignBornDocumentTypes },
    },
  },
  OtherExplanation: (value, attributes) => {
    if (attributes.DocumentType
      && attributes.DocumentType.value === 'Other') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  DocumentExpiration: (value, attributes, attributeName, options) => {
    if (
      (attributes.DocumentExpirationNotApplicable
      && attributes.DocumentExpirationNotApplicable.applicable === false)
    ) {
      return {}
    }

    if (options.requireForeignBornDocExpiration) {
      return {
        presence: true,
        date: true,
      }
    }

    return {}
  },
  DocumentNumber: {
    presence: true,
    hasValue: true,
  },
}

export default foreignBornDocument
