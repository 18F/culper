export const address = {
  label: 'This address is',
  spinner: 'Verifying your address',
  physicalLocationRequired: 'Please provide a physical address for this location',
  militaryAddress: 'Do you or did you have an APO/FPO address at this location',
  options: {
    us: {
      label: 'In the<br>United States'
    },
    apoFpo: {
      label: 'APO/FPO/DPO'
    },
    international: {
      label: 'Outside of the<br>United States'
    }
  },
  us: {
    street: {
      label: 'Street address'
    },
    street2: {
      label: 'Apt, suite, building, floor, etc.',
      optional: '(Optional)'
    },
    city: {
      label: 'City'
    },
    state: {
      label: 'State'
    },
    county: {
      label: 'County'
    },
    zipcode: {
      label: 'ZIP Code'
    }
  },
  international: {
    street: {
      label: 'Address'
    },
    city: {
      label: 'City'
    },
    country: {
      label: 'Country'
    },
    zipcode: {
      label: 'ZIP Code'
    }
  },
  apoFpo: {
    select: {
      label: 'Select APO, FPO or DPO'
    },
    street: {
      label: 'Address'
    },
    city: {
      label: 'City'
    },
    state: {
      label: 'State'
    },
    zipcode: {
      label: 'ZIP Code'
    },
    apoFpo: {
      label: 'APO/FPO/DPO State Code'
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
        label: 'APO/FPO/DPO'
      }
    }
  },
  addressBook: {
    reuse: 'Choose a previously used address'
  }
}
