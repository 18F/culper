export const general = (type, data = {}) => {
  return {
    type: type,
    props: {
      ...data
    }
  }
}
