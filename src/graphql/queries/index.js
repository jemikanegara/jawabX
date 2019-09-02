export const query = `{
    modules {
      title
      pages {
        explanation
        answers {
          type
          answer
        }
      }
    }
}`;