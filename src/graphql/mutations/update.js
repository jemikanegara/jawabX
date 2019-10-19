export const query = `
mutation update($email: String, $password: String, $newPass: String, $phone: String, $username: String) {
    update(email: $email, password: $password, newPass: $newPass, phone: $phone, username: $username)
}`;