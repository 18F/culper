require('nightwatch-cucumber')({
  cucumberArgs: [
    '--require', 'timeout.js',
    '--require', 'features/step_definitions',
    '--format', 'json:reports/cucumber.json',
    'features'
  ]
})
require('dotenv').config()

module.exports = {
  output_folder: 'reports',
  custom_assertions_path: '',
  live_output: false,
  disable_colors: false,
  selenium: {
    start_process: false,
    start_session: true,
    host: 'hub',
    port: '4444'
  },
  test_settings: {
    default: {
      launch_url: 'http://web:8080',
      selenium_host: 'hub',
      selenium_port: '4444',
      silent: true,
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['disable-web-security', 'test-type']
        }
      },
      screenshots: {
        enabled: true,
        on_failure: true,
        path: 'screenshots'
      }
    }
  }
}
