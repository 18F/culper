export const login = {
  title: 'Welcome to the Questionnaire for\nNational Security Positions',
  error: {
    title: 'Sorry, but we couldn\'t log you in!',
    generic: 'The username or password was incorrect.'
  },
  twofactor: {
    title: 'Two-factor authentication',
    para: 'Two-factor authentication (also known as 2FA) is a method of confirming a user\'s claimed identity by utilizing a combination of two different components.',
    disabled: 'Multiple factor authentication is currently disabled.'
  },
  saml: {
    title: 'Log in with CAC/PIV',
    para: 'This option is for users with a computer configured for CAC or PIV use.\nWhen prompted for a certificate, select the one with "EMAIL" in the name.',
    button: 'Log in with CAC/PIV'
  },
  basic: {
    title: 'Log in with username',
    para: 'Enter your username and password, then click the "Submit" button to continue. If you do not remember your password click "Forgot Password". If you do not remember your username contact your sponsoring agency.',
    button: 'Submit',
    username: {
      label: 'Username',
      placeholder: 'Enter your username'
    },
    password: {
      label: 'Password',
      placeholder: 'Enter your password'
    },
    show: {
      title: 'Show password',
      text: 'Show password'
    },
    hide: {
      title: 'Hide password',
      text: 'Hide password'
    },
    forgot: {
      title: 'Forgot password',
      text: 'Forgot password'
    }
  },
  denied: {
    title: 'We couldn\'t log you in',
    para: [
      'Looks like your access hasn\'t been approved for this form.',
      'If this message was received in error contact [email@gov.gov](mailto:email@gov.gov) or try loggin in again below.'
    ],
    button: 'Log in with CAC'
  },
  locked: {
    title: 'Your form has been submitted and is locked',
    para: [
      'If you need assistance contact the office who initiated your form.'
    ],
    button: 'Back to login'
  },
  token: {
    heading: 'Questionnaire for National Security Positions',
    title: 'For security reasons you have been logged out',
    saved: 'Your data was saved 1 minute prior to logout at {time}.',
    para: [
      'This may be due to a slow connection speed and/or inactivity. Please log in again to continue.'
    ],
    button: 'Back to login'
  }
}
