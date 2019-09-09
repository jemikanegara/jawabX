export const query = `
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
}`;