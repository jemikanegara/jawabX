export const query = ({ name, email, password, phone }) => `
mutation register($name: String!, $email: String!, $password: String!, $phone: String) {
    register(name: $name, email: $email, password: $password, phone: $phone)
}`;