export const query = `query ($_id: ID!) {
  module(_id: $_id) {
    _id
    type
    title
    description
    pages{
      _id
      explanation
      type
      answers{
        _id
        type
        answer
      }
    }
    user{
      _id
      name
      username
    }
  }
}`;