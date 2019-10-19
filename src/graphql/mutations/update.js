export const query = `
mutation register($email: String!, $password: String, $newPass: String, $phone: String, $username: String) {
    register(email: $email, password: $password, newPass: $newPass, phone: $phone, username: $username)
}`;