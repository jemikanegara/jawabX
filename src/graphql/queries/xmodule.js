export const query = `{
    modules($_id: ID) {
      title
      user {
        _id
        name
        username
      }
      description
      images {
        medium
      }
      type
    }
  }`;