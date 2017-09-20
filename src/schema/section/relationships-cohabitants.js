import * as form from '../form'

export const relationshipsCohabitants = (data = {}) => {
  return {
    HasCohabitant: form.branch(data.HasCohabitant),
    CohabitantList: form.collection(data.CohabitantList)
  }
}
