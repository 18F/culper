export const substance = {
  intro: {
    title: 'Section 8: Substance use',
    body:
      'You will be asked questions about your substance use and be asked to provide details if necessary.'
  },
  tour: {
    para: 'Take a guided tour through the section'
  },
  review: {
    title: "Review your answers",
    para: 'View the full section to make sure everything looks right and make changes if needed.'
  },
  destination: {
    intro: 'Substance use intro',
    police: {
      negative: 'Negative impact',
      ordered: 'Mandatory counseling or treatment',
      voluntary: 'Voluntary counseling or treatment',
      additional: 'Additional instances'
    },
    drugs: {
      usage: 'Usage',
      purchase: 'Purchase',
      clearance: 'Security clearance position',
      publicsafety: 'Public safety position',
      misuse: 'Misuse',
      ordered: 'Mandatory counseling or treatment',
      voluntary: 'Voluntary counseling or treatment'
    },
    review: 'Review substance use'
  },
  alcohol: {
    heading: {
      negativeImpact:
        'In the last seven (7) years has your use of alcohol had a negative impact on your work performance, your professional or personal relationships, your finances, or resulted in intervention by law enforcement/public safety personnel?',
      orderedCounseling:
        'Have you EVER been ordered, advised, or asked to seek counseling or treatment as a result of your use of alcohol?',
      voluntaryCounseling:
        'Have you EVER voluntarily sought counseling or treatment as a result of your use of alcohol?',
      receivedCounseling:
        'Have you EVER received counseling or treatment as a result of your use of alcohol in addition to what you have already listed on this form?'
    },
    negativeImpact: {
      heading: {
        occurred: 'Provide the month/year when this negative impact occurred',
        circumstances:
          'Provide an explanation of the circumstances and the negative impact',
        used: 'Provide dates of involvement or use'
      },
      label: {
        circumstances: 'Provide circumstances',
        negativeImpact: 'Provide negative impact'
      },
      help: {
        occurred: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        circumstances: {
          title: 'Need help with the circumstances?',
          message:
            'Provide an explanation of the circumstances and the negative impact',
          note: ''
        },
        used: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
        }
      },
      collection: {
        description: 'Summary of negative impacts',
        summary: 'Provide your negative impact details below',
        appendTitle:
          'Has the use of alcohol had other negative impacts on your work performance, your professional or personal relationships, your finances, or resulted in intervention by law enforcement/public safety personnel?',
        appendLabel: 'Add another negative impact',
        itemType: 'Negative impact'
      }
    },
    orderedCounseling: {
      heading: {
        seekers:
          'Have any of the following ordered, advised, or asked you to seek counseling or treatment as a result of your use of alcohol?',
        actionTaken: 'Did you take action to seek counseling or treatment?',
        noActionTakenExplanation:
          'You responded ‘No’ to having taken action to seek counseling or treatment. Explain the reasons for not taking action to seek counseling or treatment.',
        counselingDates: 'Provide the dates of counseling or treatment',
        treatmentProviderName:
          'Provide the name of the individual counselor or treatment provider',
        treatmentProviderAddress:
          'Provide the full address of the counseling/treatment provider',
        treatmentProviderTelephone: 'Provide telephone number',
        completedTreatment:
          'Did you successfully complete the treatment program?',
        noCompletedTreatment:
          'You responded “No” to having successfully completed the treatment program. Provide explanation.'
      },
      label: {
        seekers: 'Check all that apply',
        otherSeeker: 'Provide explanation'
      },
      seekers: {
        label: {
          employer:
            'An employer, military commander, or employee assistance program',
          medicalProfessional: 'A medical professional',
          mentalHealthProfessional: 'A mental health professional',
          courtOfficial: 'A court official / judge',
          notOrdered:
            'I have not been ordered, advised, or asked to seek counseling or treatment by any of the above',
          other: 'Other (provide explanation)'
        }
      },
      collection: {
        description: 'Summary of counselings',
        summary: 'Provide your counseling details below',
        appendTitle:
          'Do you have additional instances of having been ordered, advised or asked to seek counseling or treatment as a result of your use of alcohol to enter?',
        appendLabel: 'Add another counseling',
        itemType: 'Counseling'
      },
      help: {
        seekers: {
          title:
            'Need help with determining who has ordered you to seek treatment?',
          message:
            'Check all who ordered, advised, or asked you to seek counseling or treatment as a result of your use of alcohol',
          note: ''
        },
        counselingDates: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        actionTaken: {
          title: 'Need help with action taken to seek counseling or treatment',
          message:
            'Select if you have taken action to seek counseling or treatment.',
          note: ''
        },
        treatmentProviderName: {
          title: 'Need help with the treatment provider name?',
          message:
            'Provide the name of the individual counselor or treatment provider',
          note: ''
        },
        treatmentProviderAddress: {
          title:
            "Try looking up the treatment provider's name, this could help you find the address",
          message:
            'If you can only find a phone number try calling and asking for the address.',
          note:
            'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.'
        },
        treatmentProviderTelephone: {
          title: 'Look up the treatment provider',
          message:
            "Try looking up the treatment provider's name, this could help you find the phone number.",
          note: ''
        },
        completedTreatment: {
          title: 'Need help with your treatment completion?',
          message: 'Mark if you successfully completed a treatment program',
          note: ''
        }
      }
    },
    voluntaryCounseling: {
      heading: {
        counselingDates: 'Provide the dates of counseling or treatment',
        treatmentProviderName:
          'Provide the name of the individual counselor or treatment provider',
        treatmentProviderAddress:
          'Provide the full address of the counseling/treatment provider',
        treatmentProviderTelephone: 'Provide telephone number',
        completedTreatment:
          'Did you successfully complete the treatment program?',
        noCompletedTreatment:
          'You responded “No” to having successfully completed the treatment program. Provide explanation.'
      },
      collection: {
        description: 'Summary of counselings',
        summary: 'Provide your counseling details below',
        appendTitle:
          'Do you have additional instances where you have voluntarily sought counseling or treatment as a result of your use of alcohol to enter?',
        appendLabel: 'Add another counseling',
        itemType: 'Counseling'
      },
      help: {
        counselingDates: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        treatmentProviderName: {
          title: 'Need help with the treatment provider name?',
          message:
            'Provide the name of the individual counselor or treatment provider',
          note: ''
        },
        treatmentProviderAddress: {
          title:
            "Try looking up the treatment provider's name, this could help you find the address",
          message:
            'If you can only find a phone number try calling and asking for the address.',
          note:
            'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.'
        },
        treatmentProviderTelephone: {
          title: 'Look up the treatment provider',
          message:
            "Try looking up the treatment provider's name, this could help you find the phone number.",
          note: ''
        },
        completedTreatment: {
          title: 'Need help with your treatment completion?',
          message: 'Mark if you successfully completed a treatment program',
          note: ''
        },
        noCompletedTreatment: {
          title: 'Need help with this explanation?',
          message:
            'Provide details as to why you responded No to having successfully completed the treatment program',
          note: ''
        }
      }
    },
    receivedCounseling: {
      heading: {
        counselingDates: 'Provide the dates of counseling or treatment',
        treatmentProviderName:
          'Provide the name of the individual counselor or treatment provider',
        treatmentProviderAddress:
          'Provide the full address of the counseling/treatment provider',
        agencyName:
          'Provide the name of agency/organization where counseling/treatment was provided',
        agencyAddress:
          'Provide the address of agency/organization where counseling/treatment was provided',
        completedTreatment:
          'Did you successfully complete your counseling or treatment?',
        treatmentBeganDate: 'Provide the date counseling or treatment began',
        treatmentEndDate: 'Provide the date counseling or treatment ended',
        noCompletedTreatment: 'Provide explanation'
      },
      collection: {
        description: 'Summary of counselings',
        summary: 'Provide your counseling details below',
        appendTitle:
          'Did you receive alcohol-related counseling or treatment another time?',
        appendLabel: 'Add another counseling',
        itemType: 'Counseling'
      },
      help: {
        treatmentProviderName: {
          title: 'Need help with the treatment provider name?',
          message:
            'Provide the name of the individual counselor or treatment provider',
          note: ''
        },
        treatmentProviderAddress: {
          title:
            "Try looking up the treatment provider's name, this could help you find the address",
          message:
            'If you can only find a phone number try calling and asking for the address.',
          note:
            'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.'
        },
        agencyName: {
          title: 'Need help with the agency name?',
          message:
            'Provide the name of agency/organization where counseling/treatment was provided',
          note: ''
        },
        agencyAddress: {
          title:
            "Try looking up the agency's name, this could help you find the address",
          message:
            'If you can only find a phone number try calling and asking for the address.',
          note:
            'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.'
        },
        treatmentBeganDate: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        treatmentEndDate: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        completedTreatment: {
          title: 'Need help with your treatment completion?',
          message: 'Mark if you successfully completed a treatment program',
          note: ''
        },
        noCompletedTreatment: {
          title: 'Need help with this explanation?',
          message:
            'Provide details as to why you responded No to having successfully completed the treatment program',
          note: ''
        }
      }
    }
  },
  drugs: {
    heading: {
      drugUses:
        'In the last seven (7) years, have you illegally used any drugs or controlled substances?',
      drugInvolvement:
        'In the last seven (7) years, have you been involved in the illegal purchase, manufacture, cultivation, trafficking, production, transfer, shipping, receiving, handling or sale of any drug or controlled substance?',
      drugClearanceUses:
        'Have you EVER illegally used or otherwise been illegally involved with a drug or controlled substance while possessing a security clearance other than previously listed?',
      drugPublicSafetyUses:
        'Have you EVER illegally used or otherwise been involved with a drug or controlled substance while employed as a law enforcement officer, prosecutor, or courtroom official; or while in a position directly and immediately affecting the public safety other than previously listed?',
      prescriptionUses:
        'In the last seven (7) years have you intentionally engaged in the misuse of prescription drugs, regardless of whether or not the drugs were prescribed for you or someone else?',
      orderedTreatments:
        'Have you EVER been ordered, advised, or asked to seek counseling or treatment as a result of your illegal use of drugs or controlled substances?',
      voluntaryTreatments:
        'Have you EVER voluntarily sought counseling or treatment as a result of your use of a drug or controlled substance?'
    },
    para: {
      drugUses:
        'We note, with reference to this section, that neither your truthful responses nor information derived from your responses to this section will be used as evidence against you in a subsequent criminal proceeding. As to this particular section, this applies whether or not you are currently employed by the Federal government. The following questions pertain to the illegal use of drugs or controlled substances or drug or controlled substance activity in accordance with Federal laws, even though permissible under state laws.'
    },
    use: {
      heading: {
        drugType: 'Provide the type of drug or controlled substance',
        firstUse: 'Provide an estimate of the month and year of first use',
        recentUse:
          'Provide an estimate of the month and year of most recent use',
        natureOfUse:
          'Provide nature of use, frequency, and number of times used',
        useWhileEmployed:
          'Was your use while you were employed as a law enforcement officer, prosecutor, or courtroom official, or while in a position directly and immediately affecting the public?',
        useWithClearance: 'Was your use while possessing a security clearance?',
        useInFuture:
          'Do you intend to use this drug or controlled substance in the future?',
        explanation:
          'Provide explanation of why you intend or do not intend to use this drug or controlled substance in the future'
      },
      para: {
        drugUses:
          'Use of a drug or controlled substance includes injecting, snorting, inhaling, swallowing, experimenting with or otherwise consuming any drug or controlled substance.'
      },
      help: {
        drugType: {
          title: 'Need help with the drug type?',
          message: 'Provide the type of drug or controlled substance used',
          note: ''
        },
        firstUse: {
          title: 'Need help with the date of first use?',
          message: 'Provide an estimate of the month and year of first use',
          note: ''
        },
        recentUse: {
          title: 'Need help with the date of most recent use?',
          message: 'Provide an estimate of the month and year of first use',
          note: ''
        },
        natureOfUse: {
          title: 'Need help with the nature of drug use?',
          message: 'Provide nature of use, frequency, and number of times used',
          note: ''
        },
        useWhileEmployed: {
          title: 'Need help with the use?',
          message:
            'Was your use while you were employed as a law enforcement officer, prosecutor, or courtroom official, or while in a position directly and immediately affecting the public',
          note: ''
        },
        useWithClearance: {
          title: 'Need help with the drug use with a security clearance?',
          message: 'Was your use while possessing a security clearance?',
          note: ''
        },
        useInFuture: {
          title: 'Need help with the drug use in the future?',
          message:
            'Mark if you intend to use this drug or controlled substance in the future',
          note: ''
        },
        explanation: {
          title: 'Need help with the explanation?',
          message:
            'Provide explanation of why you intend or do not intend to use this drug or controlled substance in the future',
          note: ''
        }
      },
      collection: {
        description: 'Summary of drug uses',
        summary: 'Provide your drug use details below',
        appendTitle:
          'Do you have an additional instance(s) of illegal use of a drug or controlled substance to enter?',
        appendLabel: 'Add another drug use',
        itemType: 'Drug Use'
      }
    },
    involvement: {
      heading: {
        drugType: 'Provide the type of drug or controlled substance',
        firstInvolvement:
          'Provide an estimate of the month and year of first involvement',
        recentInvolvement:
          'Provide an estimate of the month and year of most recent involvement',
        natureOfInvolvement: 'Provide nature of and frequency of activity',
        involvementWhileEmployed:
          'Was your involvement while you were employed as a law enforcement officer, prosecutor, or courtroom official, or while in a position directly and immediately affecting the public safety?',
        involvementWithClearance:
          'Was your involvement while possessing a security clearance?',
        involvementInFuture:
          'Do you intend to engage in this activity in the future?',
        reasons: 'Provide the reason(s) why you engaged in the activity',
        explanation:
          'You have indicated that you plan to engage in the illegal purchase, manufacture, cultivation, trafficking, production, transfer, shipping, receiving, handling or sale of a drug or controlled substance in the future. Provide explanation.'
      },
      help: {
        drugType: {
          title: 'Need help with the drug type?',
          message: 'Provide the type of drug or controlled substance used',
          note: ''
        },
        firstInvolvement: {
          title: 'Need help with the date of first involvement?',
          message:
            'Provide an estimate of the month and year of first involvement',
          note: ''
        },
        recentInvolvement: {
          title: 'Need help with the date of most recent involvement?',
          message:
            'Provide an estimate of the month and year of first involvement',
          note: ''
        },
        natureOfInvolvement: {
          title: 'Need help with the nature of drug involvement?',
          message: 'Provide nature of use, frequency, and number of times used',
          note: ''
        },
        involvementWhileEmployed: {
          title: 'Need help with the use?',
          message:
            'Was your use while you were employed as a law enforcement officer, prosecutor, or courtroom official, or while in a position directly and immediately affecting the public',
          note: ''
        },
        involvementWithClearance: {
          title: 'Need help with the drug use with a security clearance?',
          message: 'Was your use while possessing a security clearance?',
          note: ''
        },
        involvementInFuture: {
          title: 'Need help with the drug use in the future?',
          message:
            'Mark if you intend to use this drug or controlled substance in the future',
          note: ''
        },
        reasons: {
          title: 'Need help with the reasoning?',
          message: 'Provide the reason(s) why you engaged in the activity',
          note: ''
        },
        explanation: {
          title: 'Need help with the explanation?',
          message:
            'Provide explanation of why you intend or do not intend to use this drug or controlled substance in the future',
          note: ''
        }
      },
      collection: {
        description: 'Summary of drug involvement',
        summary: 'Provide your drug involvement details below',
        appendTitle:
          'Do you have an additional instance(s) of having been involved in the illegal purchase, manufacture, cultivation, trafficking, production, transfer, shipping, receiving, handling or sale of a drug or controlled substance to enter?',
        appendLabel: 'Add another drug involvement',
        itemType: 'Drug involvement'
      }
    },
    clearance: {
      heading: {
        description: 'Provide a description of your involvement',
        involvementDates: 'Provide the dates of involvement/use',
        estimatedUse:
          'Provide an estimate of the number of times you used and/or were involved with this drug or controlled substance while possessing a security clearance'
      },
      help: {
        description: {
          title: 'Need help with the description?',
          message: 'Provide a description of your involvement',
          note: ''
        },
        involvementDates: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        estimatedUse: {
          title: 'Need help with the estimated times used?',
          message:
            'Provide an estimate of the number of times you used and/or were involved with this drug or controlled substance while possessing a security clearance',
          note: ''
        }
      },
      collection: {
        description: 'Summary of drug involvement',
        summary: 'Provide your drug involvement details below',
        appendTitle:
          'Do you have an additional instance(s) of the illegal use or involvement with a drug or controlled substance while possessing a security clearance to enter?',
        appendLabel: 'Add another drug involvement',
        itemType: 'Drug involvement'
      }
    },
    publicSafety: {
      heading: {
        description:
          'Provide a description of the drugs or controlled substances used and your involvement',
        involvementDates: 'Provide the dates of involvement/use',
        estimatedUse:
          'Provide an estimate of the number of times you used and/or were involved with this drug or controlled substance while employed in this capacity'
      },
      help: {
        description: {
          title: 'Need help with the description?',
          message: 'Provide a description of your involvement',
          note: ''
        },
        involvementDates: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        estimatedUse: {
          title: 'Need help with the estimated times used?',
          message:
            'Provide an estimate of the number of times you used and/or were involved with this drug or controlled substance while possessing a security clearance',
          note: ''
        }
      },
      collection: {
        description: 'Summary of drug involvement',
        summary: 'Provide your drug involvement details below',
        appendTitle:
          'Do you have an additional instance(s) of illegal use or involvement with a drug or controlled substance while employed as a law enforcement officer, prosecutor, or courtroom official; or while in a position directly and immediately affecting the public safety to enter?',
        appendLabel: 'Add another drug involvement',
        itemType: 'Drug involvement'
      }
    },
    prescription: {
      heading: {
        prescriptionName:
          'Provide the name of the prescription drug that you misused',
        involvementDates: 'Provide the dates of involvement in the above',
        reason:
          'Provide the reason(s) for and circumstances of the misuse of the prescription drug',
        useWhileEmployed:
          'Was your involvement while you were employed as a law enforcement officer, prosecutor, or courtroom official, or while in a position directly and immediately affecting the public safety?',
        useWithClearance:
          'Was your involvement while possessing a security clearance?'
      },
      help: {
        prescriptionName: {
          title: 'Need help with the prescriptin name?',
          message: 'Provide the name of the prescription drug that you misused',
          note: ''
        },
        reason: {
          title: 'Need help with the reason?',
          message:
            'Provide the reason(s) for and circumstances of the misuse of the prescription drug',
          note: ''
        },
        involvementDates: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        useWhileEmployed: {
          title: 'Need help with the use?',
          message:
            'Was your involvement while you were employed as a law enforcement officer, prosecutor, or courtroom official, or while in a position directly and immediately affecting the public safety?',
          note: ''
        },
        useWithClearance: {
          title: 'Need help with the drug use with a security clearance?',
          message:
            'Was your involvement while possessing a security clearance?',
          note: ''
        }
      },
      collection: {
        description: 'Summary of drug misuse',
        summary: 'Provide your drug misuse details below',
        appendTitle:
          'Do you have an additional instance(s) of intentionally engaging in the misuse of prescription drugs in the last seven (7) years to enter?',
        appendLabel: 'Add another drug misuse',
        itemType: 'Drug misuse'
      }
    },
    ordered: {
      heading: {
        orderedBy:
          'Have any of the following ordered, advised, or asked you to seek counseling or treatment as a result of your illegal use of drugs or controlled substances?',
        explanation: 'Provide explanation',
        actionTaken: 'Did you take action to receive counseling or treatment?',
        noActionTakenExplanation:
          'You have indicated that you did not receive treatment. Provide explanation',
        drugType:
          'Provide the type of drug or controlled substance for which you were treated',
        treatmentProvider: 'Provide the name of the treatment provider',
        treatmentProviderAddress:
          'Provide the address for this treatment provider',
        treatmentProviderTelephone:
          'Provide a telephone number for the treatment provider',
        treatmentDates: 'Provide the dates of treatment',
        treatmentCompleted: 'Did you successfully complete the treatment?',
        noTreatmentExplanation:
          'You have indicated that you did not successfully complete the treatment. Provide explanation.'
      },
      para: {
        orderedBy: 'Check all that apply',
        treatmentProvider: 'Last name, First name'
      },
      help: {
        drugType: {
          title: 'Need help with the drug type?',
          message: 'Provide the type of drug or controlled substance used',
          note: ''
        },
        orderedBy: {
          title: 'Need help with who ordered treatment?',
          message:
            'Have any of the following ordered, advised, or asked you to seek counseling or treatment as a result of your illegal use of drugs or controlled substances?',
          note: ''
        },
        explanation: {
          title: 'Need help with the explanation?',
          message: 'Provide explanation',
          note: ''
        },
        actionTaken: {
          title:
            'Need help with taking action to receive counseling or treatment?',
          message: 'Mark if you took action to receive counseling or treatment',
          note: ''
        },
        noActionTakenExplanation: {
          title: 'Need help with not having taken action?',
          message:
            'Provide explanation as to why you did not receive treatment',
          note: ''
        },
        treatmentProvider: {
          title: 'Need help with the treatment provider?',
          message: 'Provide the name of the treatment provider',
          note: ''
        },
        treatmentProviderAddress: {
          title:
            "Try looking up the provider's name, this could help you find the address",
          message:
            'If you can only find a phone number try calling and asking for the address.',
          note:
            'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.'
        },
        treatmentProviderTelephone: {
          title: 'Look up the provider',
          message:
            "Try looking up the provider's name, this could help you find the phone number.",
          note: ''
        },
        treatmentDates: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        treatmentCompleted: {
          title: 'Need help with the treatment completion?',
          message: 'Mark yes if you successfully completed the treatment',
          note: ''
        },
        noTreatmentExplanation: {
          title: 'Need help with the explanation for not completing treatment?',
          message: 'Explain why you did not complete treatment',
          note: ''
        }
      },
      collection: {
        description: 'Summary of treatments',
        summary: 'Provide your treatment details below',
        appendTitle:
          'Do you have another instance of having been ordered, advised, or asked to seek drug or controlled substance counseling or treatment to enter?',
        appendLabel: 'Add another treatment',
        itemType: 'Treatment'
      },
      orderedBy: {
        label: {
          employer:
            'An employer, military commander, or employee assistance program',
          medicalProfessional: 'A medical professional',
          mentalHealthProfessional: 'A mental health professional',
          judge: 'A court official / judge',
          none:
            'I have not been ordered, advised, or asked to seek counseling or treatment by any of the above.'
        }
      }
    },
    voluntary: {
      heading: {
        drugType:
          'Provide the type of drug or controlled substance for which you were treated',
        treatmentProvider: 'Provide the name of the treatment provider',
        treatmentProviderAddress:
          'Provide the address for this treatment provider',
        treatmentProviderTelephone:
          'Provide a telephone number for the treatment provider',
        treatmentDates: 'Provide the dates of treatment',
        treatmentCompleted: 'Did you successfully complete the treatment?',
        noTreatmentExplanation:
          'You have indicated that you did not you successfully complete the treatment. Provide explanation.'
      },
      para: {
        treatmentProvider: 'Last name, First name'
      },
      help: {
        drugType: {
          title: 'Need help with the drug type?',
          message: 'Provide the type of drug or controlled substance used',
          note: ''
        },
        treatmentProvider: {
          title: 'Need help with the treatment provider?',
          message: 'Provide the name of the treatment provider',
          note: ''
        },
        treatmentProviderAddress: {
          title:
            "Try looking up the provider's name, this could help you find the address",
          message:
            'If you can only find a phone number try calling and asking for the address.',
          note:
            'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.'
        },
        treatmentProviderTelephone: {
          title: 'Look up the provider',
          message:
            "Try looking up the provider's name, this could help you find the phone number.",
          note: ''
        },
        treatmentDates: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates gives us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        treatmentCompleted: {
          title: 'Need help with the treatment completion?',
          message: 'Mark yes if you successfully completed the treatment',
          note: ''
        },
        noTreatmentExplanation: {
          title: 'Need help with the explanation for not completing treatment?',
          message: 'Explain why you did not complete treatment',
          note: ''
        }
      },
      collection: {
        description: 'Summary of treatments',
        summary: 'Provide your treatment details below',
        appendTitle:
          'Do you have another instance of EVER voluntarily seeking counseling or treatment as a result of your use of a drug or controlled substance?',
        appendLabel: 'Add another treatment',
        itemType: 'Treatment'
      },
      orderedBy: {
        label: {
          employer:
            'An employer, military commander, or employee assistance program',
          medicalProfessional: 'A medical professional',
          mentalHealthProfessional: 'A mental health professional',
          judge: 'A court official / judge',
          none:
            'I have not been ordered, advised, or asked to seek counseling or treatment by any of the above.'
        }
      }
    },
    drugType: {
      label: {
        cocaine: 'Cocaine or crack cocaine (Such as rock, freebase, etc.)',
        stimulants: 'Stimulants (Such as amphetamines, speed, crystal meth, ecstasy, etc.)',
        thc: 'THC (Such as marijuana, weed, pot, hashish, etc.)',
        depressants: 'Depressants (Such as barbiturates, methaqualone, tranquilizers, etc.)',
        ketamine: 'Ketamine (Such as special K, jet, etc.)',
        narcotics: 'Narcotics (Such as opium, morphine, codeine, heroin, etc.)',
        hallucinogenic: 'Hallucinogenic (Such as LSD, PCP, mushrooms, etc.)',
        steroids: 'Steroids(Such as the clear, juice, etc.)',
        inhalants: 'Inhalants (Such as toluene, amyl nitrate, etc.)',
        other: 'Other (Provide explanation)',
        drugTypeOther: 'Provide explanation'
      }
    }
  }
}
