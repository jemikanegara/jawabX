// export const query = `{
//     modules {
//       title
//       pages {
//         explanation
//         answers {
//           type
//           answer
//         }
//       }
//     }
// }`;

export const query = `{
  modules {
    title
    user {
      email
    }
    description
  }
}`;