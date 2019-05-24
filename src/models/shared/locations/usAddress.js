import locationModel from '../location'

const locationUSAddress = {
  street: locationModel.street,
  street2: {
    ...locationModel.street,
    presence: false,
  },
  city: locationModel.city,
  state: locationModel.state,
  zipcode: locationModel.zipcode,
  country: {
    presence: true,
    inclusion: ['United States'],
  },
}

export default locationUSAddress
