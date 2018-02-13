export const citizenship = {
  intro: {
    title: 'Section 4: Citizenship',
    body: 'You will be asked questions about your citizenship status and history and be asked to provide details if necessary.'
  },
  tour: {
    para: 'Take a guided tour through the section'
  },
  review: {
    para: 'View all the sections associated with citizenship at once',
    comments: 'Add a comment to clarify any of your responses in the citizenship section'
  },
  destination: {
    intro: 'Citizenship intro',
    review: 'Review citizenship',
    status: 'Citizenship status',
    multiple: 'Dual/multiple citizenship',
    passports: 'Foreign passports'
  },
  status: {
    heading: {
      title: 'Citizenship status',
      citizenshipstatus: 'Provide your current citizenship status',
      abroad: 'Provide type of documentation of U.S. citizen born abroad',
      documentnumber: {
        foreignborn: 'Provide document number for U.S. citizen born abroad',
        notcitizen: 'Provide document number'
      },
      documentissued: 'Provide the date the document was issued',
      placeissued: 'Provide the place of issuance',
      documentname: 'Provide the name in which document was issued',
      certificatenumber: {
        foreignborn: 'Provide your Certificate of Citizenship number',
        naturalized: 'Provide your Certificate of Naturalization number (N550 or N570)',
        derived: 'Provide your Certificate of Citizenship number (N560 or N561)'
      },
      certificateissued: {
        foreignborn: 'Provide the date the certificate was issued',
        naturalized: 'Provide the date the Certificate of Naturalization was issued',
        derived: 'Provide the date the document was issued'
      },
      certificatename: {
        foreignborn: 'Provide the name in which the certificate was issued',
        naturalized: 'Provide the name in which the Certificate of Naturalization was issued',
        derived: 'Provide the name in which the document was issued'
      },
      certificatecourtname: 'Provide the name of the court that issued the Certificate of Naturalization',
      certificatecourtaddress: 'Provide the address of the court that issued the Certificate of Naturalization',
      bornonmilitaryinstallation: 'Were you born on a U.S. military installation?',
      militarybase: 'Provide the name of the base',
      entrydate: 'Provide the date of entry into the U.S.',
      entrylocation: 'Provide your place of entry in the U.S.',
      priorcitizenship: {
        naturalized: 'Provide country(ies) of prior citizenship',
        notcitizen: 'Provide your countr(ies) of citizenship'
      },
      hasalienregistration: 'Do/did you have a U.S. alien registration number?',
      alienregistrationnumber: {
        naturalized: 'Provide your U.S. alien registration number on Certificate of Naturalization USCIS, CIS, or INS registration, I-551, I-766',
        derived: 'Provide your alien registration number (on Certificate of Citizenship - utilize USCIC, CIS, or INS registration number)',
        notcitizen: 'Provide your alien registration number (I-551, I-766)'
      },
      alienregistrationexpiration: 'Provide document expiration date (I-776 ONLY)',
      basis: {
        naturalized: 'Provide the basis of naturalization',
        derived: 'Provide the basis of derived citizenship'
      },
      permanentresidentcardnumber: 'Provide your Permanent Resident Card number (I-551)',
      residencestatus: 'Provide your residence status',
      documentexpiration: 'Provide document expiration date',
      documenttype: 'Provide type of document issued'
    },
    label: {
      explanation: 'Explanation',
      citizenshipstatus: {
        citizen: 'I am a U.S. citizen or national by birth in the U.S. or U.S. territory/commonwealth',
        foreignborn: 'I am a U.S. citizen or national by birth, born to U.S. parent(s), in a foreign country',
        naturalized: 'I am a naturalized U.S. citizen',
        derived: 'I am a derived U.S. citizen',
        notcitizen: 'I am not a U.S. citizen'
      },
      abroad: {
        fs240: 'FS-240',
        ds1350: 'DS-1350',
        fs545: 'FS-545',
        other: 'Other'
      },
      basis: {
        naturalized: 'Based on my own individual naturalization application',
        derived: 'By operation of law through my U.S. citizen parent',
        other: 'Other'
      },
      documenttype: {
        i94: 'I-94',
        visa: 'U.S. Visa',
        i20: 'I-20',
        ds2019: 'DS-2019',
        other: 'Other'
      }
    },
    help: {
      citizenshipstatus: {
        title: 'Need help with your citizenship status?',
        message: 'Select the box that reflects your current citizenship status',
        note: ''
      },
      abroad: {
        title: 'Need help with documentation of U.S. citizen born abroad?',
        message: 'Select the type of documentation',
        note: ''
      },
      documentnumber: {
        title: 'Need help with the document number?',
        message: 'Provide the document number',
        note: ''
      },
      documentissued: {
        title: 'Need help with the date the documentation was issued?',
        message: 'Provide the approximate date the documenation was issued',
        note: ''
      },
      placeissued: {
        title: 'Need help with the place the documentation was issued?',
        message: 'Provide the place where the documentation was issued',
        note: ''
      },
      documentname: {
        title: 'Need help with the name on the documentation?',
        message: 'Provide the name on the documentation',
        note: ''
      },
      certificatenumber: {
        title: 'Need help with the certificate number?',
        message: 'Provide the certificate number',
        note: ''
      },
      certificateissued: {
        title: 'Estimate the date if unsure',
        message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      certificatename: {
        title: 'Need help with the name on the certificate?',
        message: 'Provide the name on the certificate',
        note: ''
      },
      bornonmilitaryinstallation: {
        title: 'Need help with if you were born on a military installation?',
        message: 'If you were born on a military installation select "yes"',
        note: ''
      },
      militarybase: {
        title: 'Need help with military base?',
        message: 'Provide the name of the military base',
        note: ''
      },
      entrydate: {
        title: 'Estimate the date if unsure',
        message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      entrylocation: {
        title: 'Need help with the location of entry?',
        message: 'Provide the location of entry in to the U.S.',
        note: ''
      },
      priorcitizenship: {
        title: 'List all your prior citizenship(s)',
        message: 'You can provide multiple citizenships in this question.',
        note: ''
      },
      hasalienregistration: {
        title: 'Need help if you have an alien registration number?',
        message: 'If you have an alien registration number select "Yes"',
        note: ''
      },
      alienregistrationnumber: {
        title: 'Need help with your alien registration number?',
        message: 'Provide the alien registration number',
        note: ''
      },
      alienregistrationexpiration: {
        title: 'Need help with your alien registration expiration date?',
        message: 'Provide the date of expiration for the alien registration',
        note: ''
      },
      certificatecourtname: {
        title: 'Need help with the court name?',
        message: 'Provide the court name',
        note: ''
      },
      certificatecourtaddress: {
        title: 'Try looking up the court name, this could help you find the address',
        message: 'If you can only find a phone number try calling and asking for the address.',
        note: 'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.'
      },
      basis: {
        naturalized: {
          title: 'Need help with the basis of naturalization?',
          message: 'Provide the basis of naturalization',
          note: ''
        },
        derived: {
          title: 'Need help with the basis of derived citizenship?',
          message: 'Provide the basis of the derive citizenship',
          note: ''
        }
      },
      permanentresidentcardnumber: {
        title: 'Need help with your permanent resident card?',
        message: 'Provide your permanent resident card number',
        note: ''
      },
      residencestatus: {
        title: 'Need help with your residence status?',
        message: 'Provide your residence status',
        note: ''
      },
      documentexpiration: {
        title: 'Need help with the documentation expiration date?',
        message: 'Provide the approximate date of expiration',
        note: ''
      },
      documenttype: {
        title: 'Need help with the type of documentation?',
        message: 'Provide the type of documentation',
        note: ''
      }
    }
  },
  multiple: {
    heading: {
      title: 'Dual/multiple citizenship',
      hasmultiple: 'Do you now or have you EVER held dual/multiple citizenships?',
      citizenship: {
        country: 'Provide country of citizenship',
        period: 'During what period of time did you hold citizenship with this country?',
        dates: 'Provide the date range that you held this citizenship, beginning with the date it was acquired through its termination or "Present," whichever is appropriate',
        how: 'How did you acquire this non-U.S. citizenship you now have or previously had?',
        renounced: 'Have you taken any action to renounce your foreign citizenship?',
        renouncedexplanation: 'Provide explanation',
        current: 'Do you currently hold citizenship with this country?',
        currentexplanation: 'Provide explanation'
      },
      hasforeignpassport: 'Have you EVER been issued a passport (or identity card for travel) by a country other than the U.S.?',
      passport: {
        title: 'Foreign passport information',
        country: 'Provide the country in which the passport (or identity card) was issued',
        issued: 'Provide the date the passport (or identity card) was issued',
        location: 'Provide the place the passport (or identity card) was issued',
        name: 'Provide the name in which passport (or identity card) was issued',
        number: 'Provide the passport (or identity card) number',
        expiration: 'Provide the passport (or identity card) expiration date',
        used: 'Have you EVER used this passport (or identity card) for foreign travel?'
      },
      travel: {
        country: 'Provide the country to which you traveled on this passport (or identity card)',
        dates: 'Provide the dates involved'
      }
    },
    collection: {
      citizenship: {
        summary: {
          title: 'Summary of dual/multiple citizenships',
          item: 'Country',
          unknown: '*Provide citizenship details below*'
        },
        appendTitle: 'Do you have an additional citizenship to provide?',
        append: 'Add another citizenship'
      },
      passport: {
        summary: {
          title: 'Summary of foreign passports',
          item: 'Country',
          unknown: '*Provide passport details below*'
        },
        appendTitle: 'Do you have an additional foreign passport (or identity card) to report?',
        append: 'Add another foreign passport'
      },
      travel: {
        summary: {
          title: 'Summary of foreign travel',
          item: 'Country',
          unknown: '*Provide travel details below*'
        },
        append: 'Add another foreign travel'
      }
    },
    help: {
      hasmultiple: {
        title: 'Need help with multiple citizenships?',
        message: 'If you have ever had a non-U.S. citizenship then select "yes"',
        note: ''
      },
      citizenship: {
        country: {
          title: 'Need help with the country?',
          message: 'Provide the country',
          note: ''
        },
        dates: {
          title: 'Tell us the full date range you held this citizenship',
          message: 'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        how: {
          title: 'Need help with the how you acquired this citizenship?',
          message: 'Provide the how you acquired this citizenship',
          note: ''
        },
        renounced: {
          title: 'Need help with the renouncement?',
          message: 'If you have renounced this citizenship select "yes"',
          note: ''
        },
        renouncedexplanation: {
          title: 'Need help explaining your renouncement?',
          message: 'Provide the explanation for the renouncement',
          note: ''
        },
        current: {
          title: 'Need help with the current citizenship?',
          message: 'If you still retain citizenship select "yes"',
          note: ''
        },
        currentexplanation: {
          title: 'Need help explaining your current citizenship?',
          message: 'Provide the explanation for the current citizenship',
          note: ''
        }
      },
      hasforeignpassport: {
        title: 'Need help with foreign passports or identity cards?',
        message: 'If you have ever had a foreign passport or identity card then select "yes"',
        note: ''
      },
      passport: {
        country: {
          title: 'Need help with the country?',
          message: 'Provide the country',
          note: ''
        },
        issued: {
          title: 'Need help with the dates issued?',
          message: 'Provide the approximate date the item was issued',
          note: ''
        },
        location: {
          title: 'Need help with the place it was issued?',
          message: 'Provide the location the passport (or identity card) was issued',
          note: ''
        },
        name: {
          title: 'Need help with the name?',
          message: 'Provide the name on the passport (or identity card)',
          note: ''
        },
        number: {
          title: 'Need help with the passport number?',
          message: 'Provide the passport (or identity card) number',
          note: ''
        },
        expiration: {
          title: 'Need help with the expiration date?',
          message: 'Provide the approximate date the item expires',
          note: ''
        },
        used: {
          title: 'Need help determining if the passport was used?',
          message: 'If you have used the passport for travel then select "yes"',
          note: ''
        }
      },
      travel: {
        country: {
          title: 'Need help with the country?',
          message: 'Provide the country',
          note: ''
        },
        dates: {
          title: 'Not sure of the exact dates?',
          message: 'Give us your best guess and check the "Estimated" checkbox.',
          note: ''
        }
      }
    }
  }
}
