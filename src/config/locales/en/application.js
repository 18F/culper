export const application = {
  destination: {
    attachments: 'Attachments',
    submit: 'Submit'
  },
  header: [
    '## All required fields are complete',
    'Not a guarantee of acceptance. We are checking that all required fields are complete'
  ],
  additional: [
    '### Additional comments',
    'After completing this form and any attachments, you should review your answers to all questions to make sure the form is complete and accurate, and then sign and date the following certification and the following release(s). You will not be able to submit until each release below is signed'
  ],
  validForm: {
    certificationItem: 'Certification',
    generalItem: 'Release of Information & HIPAA',
    creditItem: 'Credit reporting disclosure',
    submit: 'Submit your SF-86',
    next: 'Go to next release',
    submitting: 'Submitting form...'
  },
  invalidForm: [
    '### List of incomplete sections',
    'Use the list below to complete all incomplete sections or sections with errors.'
  ],
  submissionStatus: {
    validating: [
      '## Verifying your information is complete',
      'Checking your form...'
    ],
    valid: [
      '## All required fields are complete',
      'Not a guarantee of acceptance, but all required fields are complete.'
    ],
    valid2: [
      '### Please sign the releases below and submit your form'
    ],
    invalid: [
      '## Some required fields are incomplete',
      'Please fix the errors listed below.'
    ]
  },
  submissionComplete: [
    '## You are done!',
    '### Thanks for submitting your SF-86',
    'Please print and save your submission below, they will be your only copies'
  ],
  print: {
    title: [
      '## Please print and save your responses',
      '**This will be your only opportunity.** Your form will be locked when you logout. Be sure to print and save your responses before leaving this screen. To save a PDF click the Save/Print button then change the printer "Destination" to "Save as PDF".'
    ],
    button: 'Save/Print',
    done: [
      '## You are done!',
      '### Thanks for submitting for your SF-86',
      'If you need assistance contact the office who initiated your form.',
      '## We would love your feedback!',
      'Striving to provide the most enjoyable experience through the application process any feedback you would be willing to [provide in our survey](https://docs.google.com/forms/d/e/1FAIpQLSeRQj_m3Ot0ILFuLg2LtFKJPTEAqMATw3kc3MiFOkj3fxs3ug/viewform) is appreciated.'
    ]
  },
  attachments: {
    method: {
      title: 'Specify your attachment method',
      para: 'Choose the method you will use to provide attachments for your Investigation Request.'
    },
    type: {
      upload: 'Upload file',
      fax: 'Direct fax',
      other: 'Other'
    },
    help: {
      title: 'Need help with the attachment methods?',
      message: [
        '**Upload file**',
        'Upload to e-QIP directly - scan and electronically upload directly to your e-QIP request.',
        '*Must be done prior to releasing the request*',
        '**Direct fax**',
        'Fax attachment to e-QIP directly, e-QIP offers an automated fax solution to attach a fax to your Investigation Request. Print a cover sheet and fax to the telephone number listed on the cover sheet.',
        '*Must be done prior to releasing the request*',
        '**Other**',
        'Standard Fax, Mail, or Other - if not using one of the two methods above indicate how you plan to provide each attachment.'
      ],
      note: ''
    },
    upload: {
      title: 'Upload file to e-QIP directly',
      para: [
        'Certification, General Release and Medical Release forms must be attached separately as single page documents. Items such as a resume or OF 612 can be uploaded as multi-page documents.',
      ],
      limits: '{types} files only. Maximum file size allowed is {max_size}.',
      description: 'Description',
      send: 'Upload attachment',
      files: {
        title: 'Uploaded files',
        para: 'The following documents and/or files have been associated with your Investigation Request.',
        remove: 'Remove'
      },
      error: {
        title: 'We had a problem with your attachment!',
        delete: 'Failed to delete attachment.',
        download: 'Failed to download attachment.',
        save: 'Failed to save attachment. Please check the size and type of attachment.',
        update: 'Failed to save attachment description.'
      }
    },
    fax: {
      title: 'Direct fax',
      para: [
        'Fax attachment to e-QIP directly, e-QIP offers an automated fax solution to attach a fax to your Investigation Request. Print a cover sheet and fax to the telephone number listed on the cover sheet.',
        '*Must be done prior to releasing the request.*'
      ],
      print: 'Print cover sheet'
    },
    other: {
      title: 'Other',
      para: [
        'Standard Fax, Mail, or Other - if not using one of the two methods above indicate how you plan to provide each attachment.'
      ],
      method: 'Specify other attachment method',
      address: 'Mailing address'
    }
  },
  hashCode: {
    title: 'Data hash code'
  },
  alert: {
    navigation: 'Your form has been submitted and is locked',
    logout: 'Make sure you save and/or print your responses before logging out'
  },
  loading: {
    title: '#### We are loading your data'
  },
  timeout: {
    title: 'Are you still working?',
    message: 'Let us know below or you will be logged out in {time} seconds.',
    button: 'Yes I\'m still working'
  }
}
