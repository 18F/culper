export const address = {
  label: 'This address is',
  spinner: 'Verifying your address',
  physicalLocationRequired: 'Provide physical location data with street address, base, post, embassy, unit, and country location or home port/fleet headquarter.',
  apoFpoRequired: 'Provide APO/FPO address.',
  militaryAddress: {
    meResidence: 'Did you have an APO/FPO address while at this location?',
    meEmployment: 'Do you or did you have an APO/FPO address while at this location?',
    spouse: 'Does the person have an APO/FPO address?',
    relative: 'Does this relative have an APO/FPO address?',
    foreignNational: 'Does this person have an APO/FPO address?',
    supervisor: 'Did/does your supervisor have an APO/FPO address while at this location?',
    residenceVerifier: 'Does the person who knew you have an APO/FPO address?',
  },
  options: {
    us: {
      label: 'In the U.S.'
    },
    apoFpo: {
      label: 'APO/FPO/DPO'
    },
    international: {
      label: 'Outside the U.S.'
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
  physical: {
    street: {
      label: 'Street Address/Unit/Duty Location'
    },
    city: {
      label: 'City or Post Name'
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
