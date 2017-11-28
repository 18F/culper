export const name = (data = {}) => {
  return {
    type: 'name',
    props: { ...data }
  }
}
