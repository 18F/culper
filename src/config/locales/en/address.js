export const address = {
  label: 'This address is',
  spinner: 'Verifying your address',
  physicalLocationRequired: 'Please provide a physical address for this location',
  militaryAddress: 'Do you or did you have an APO/FPO address at this location',
  options: {
    us: {
      label: 'In the United States'
    },
    apoFpo: {
      label: 'APO/FPO/DPO'
    },
    international: {
      label: 'Outside of the United States'
    }
  },
  us: {
    street: {
      label: 'Street address',
      placeholder: 'Enter street address'
    },
    street2: {
      label: 'Apt, suite, building, floor, etc.',
      optional: '(Optional)'
    },
    city: {
      label: 'City',
      placeholder: 'Enter city'
    },
    state: {
      label: 'State',
      placeholder: 'Enter state'
    },
    county: {
      label: 'County',
      placeholder: 'Enter county'
    },
    zipcode: {
      label: 'ZIP Code',
      placeholder: 'Enter ZIP Code'
    }
  },
  international: {
    street: {
      label: 'Address',
      placeholder: 'Enter mailing address'
    },
    city: {
      label: 'City',
      placeholder: 'Enter city'
    },
    country: {
      label: 'Country',
      placeholder: 'Enter country'
    },
    zipcode: {
      label: 'ZIP Code',
      placeholder: 'Enter ZIP Code'
    }
  },
  apoFpo: {
    select: {
      label: 'Select APO, FPO or DPO'
    },
    street: {
      label: 'Address',
      placeholder: 'Enter address'
    },
    city: {
      label: 'City',
      placeholder: 'Enter city'
    },
    state: {
      label: 'State',
      placeholder: 'Enter state'
    },
    zipcode: {
      label: 'ZIP Code',
      placeholder: 'Enter ZIP Code'
    },
    apoFpo: {
      label: 'APO/FPO/DPO State Code',
      placeholder: 'Enter state code (AA, AE, AP)'
    },
    apoFpoType: {
      apo: {
        label: 'APO'
      },
      fpo: {
        label: 'FPO'
      },
      dpo: {
        label: 'DPO'
      },
      apoFpo: {
        label: 'APO/FPO/DPO',
        placeholder: 'Enter APO/FPO/DPO'
      }
    }
  },
  addressBook: {
    reuse: 'Choose a previously used address'
  }
}
