export const query = `{
  modules {
    _id
    title
    user {
      _id
      name
    }
    description
    images {
      medium
    }
    type
  }
}`;