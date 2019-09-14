export const query = `{
  modules {
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