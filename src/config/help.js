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
      let text = id.split('.').reduce((o, i) => o[i], messages) || ''
      if (!text || text === '') {
        throw 'No text found'
      }
      return text
    } catch (e) {
      return 'No help text found for "' + id + '"'
    }
  }
}

const help = new Help()
export default help
