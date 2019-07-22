import residence from 'models/residence'

const historyResidence = {
  List: {
    presence: true,
    accordion: { validator: residence },
  },
}

export default historyResidence
