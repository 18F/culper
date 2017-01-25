require('nightwatch-cucumber')({
  cucumberArgs: [
    '--require', 'timeout.js',
    '--require', 'features/step_definitions',
    '--format', 'pretty',
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
    host: process.env.SELENIUM_ADDR,
    port: process.env.SELENIUM_PORT
  },
  test_settings: {
    default: {
      launch_url: 'http://' + process.env.WEB_PORT_2015_TCP_ADDR + ':' + process.env.WEB_PORT,
      selenium_host: process.env.SELENIUM_ADDR,
      selenium_port: process.env.SELENIUM_PORT,
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
