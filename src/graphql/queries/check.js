export const query = `query accountCheck($email: String, $phone: String, $username: String) {
    accountCheck(email: $email, phone: $phone, username: $username)
}`;