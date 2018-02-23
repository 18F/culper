# Feature Specification Automated Testing
The eApp project uses the [nightwatch.js](http://nightwatchjs.org/) end-to-end test framework to perform automated browser-based feature specification testing via the **Selenium/WebDriver** server.  

The eApp feature spec test suite is written using `cucumber` syntax and the test cases are found in the [e-QIP-prototype/spec/features](https://github.com/truetandem/e-QIP-prototype/tree/master/specs/features) directory in GitHub.  Each `.feature` file represents a test case covering a section of the eApp application form.  For each section, there is a correspoinding [step definition](https://github.com/truetandem/e-QIP-prototype/tree/master/specs/features/step_definitions) JavaScript file containing the code defining the test execution steps.


## Instructions for running the eApp feature spec test suite
Running the feature specification test suite is an on-demand process and is run through docker-compose by specifying a different [configuration file](https://github.com/truetandem/e-QIP-prototype/blob/master/nightwatch-compose.yml).  

Follow these instructions to start the Selenium hub and run the automated feature tests.

### 1. Initiate the eApp environment using docker
`docker-compose up`

### 2. Start the Selenium hub and chrome browser
`docker-compose -f nightwatch-compose.yml up hub chrome`

### 3. Shell into the nightwatch docker container
`docker-compose -f nightwatch-compose.yml run nightwatch /bin/bash`

### 4. From the nightwatch shell prompt, start a feature test
`npm test -t features/**.feature`   (where ** is the spec name)

E.g. to run the test cases related to the Foreign Activities section:

`npm test -t features/foreign.feature`


#### Check the test results
The shell running the test case will output the test case results.  If there is an error during the test run, you can find a screen capture of the browser state when the error occurred by using the rollowing URL: 
`file:///<<home>>/Code/go/src/github.com/18F/e-QIP-prototype/specs/screenshots/`  (where <<home>> is the


## Cleanup
It is a good practice to clean up the docker containers after completing the test case runs, or after a code refresh. 

### **Down** - stops docker container and removes container image from cache
`docker system down`
`docker-compose -f nightwatch-compose.yml down`

### **Prune** - Clean all cached containers (good for freeing up space) 
`docker system prune`
`docker-compose -f nightwatch-compose.yml prune`

### **Check what's running** - If you are unsure what docker containers are currently running
`sudo docker-compose ps`
