const messages = {
  identification: {
    name: {
      last: 'Info about last name'
    }
  }
}

class Help {
  ById (id) {
    try {
      return id.split('.').reduce((o, i) => o[i], messages) || ''
    } catch (e) {
      return 'No help text found for "' + id + '"'
    }
  }
}

const help = new Help()
export default help
