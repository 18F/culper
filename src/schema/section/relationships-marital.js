import * as form from '../form'

export const relationshipsMarital = (data = {}) => {
  return {
    Status: form.radio({ value: data.Status }),
    CivilUnion: form.civilunion(data.CivilUnion),
    DivorcedList: form.collection(data.DivorcedList, data.DivorcedListBranch)
  }
}
