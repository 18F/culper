const en = {
  identification: {
    name: {
      last: {
        help: '',
        error: {
          required: '',
          length: 'The last name cannot exceed 100 characters',
          pattern: 'We only support letters, hyphens (-), periods (.), apostrophes (\'), and spaces'
        }
      },
      first: {
        help: '',
        error: {
          length: 'The first name cannot exceed 100 characters',
          pattern: 'We only support letters, hyphens (-), periods (.), apostrophes (\'), and spaces'
        }
      },
      middle: {
        help: '',
        error: {
          length: 'The middle name cannot exceed 100 characters',
          pattern: 'We only support letters, hyphens (-), periods (.), apostrophes (\'), and spaces'
        }
      },
      suffix: {
        help: ''
      },
      ssn: {
        help: ''
      }
    },
    birthdate: {
      help: ''
    },
    birthplace: {
      help: ''
    }
  },
  traits: {
    hair: {
      help: ''
    },
    eye: {
      help: ''
    },
    sex: {
      help: ''
    }
  },
  alias: {
    reason: {
      help: ''
    }
  }
}

export default en
