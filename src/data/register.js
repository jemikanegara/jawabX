export const regFields = [
    {
        label: "Nama",
        type: "text",
        bind: "name"
    },
    {
        label: "Email",
        type: "text",
        bind: "email"
    },
    {
        label: "Kata Sandi",
        type: "password",
        bind: "password"
    },
    {
        label: "Konfirmasi Kata Sandi",
        type: "password",
        bind: "confirm"
    },
    {
        label: "Nomor Ponsel (Opsional)",
        type: "text",
        bind: "phone"
    }
];

export const regEl = {
    name: {
        value: "",
        errors: {
            empty: false
        }
    },
    email: {
        value: "",
        errors: {
            empty: false
        }
    },
    password: {
        value: "",
        errors: {
            empty: false
        }
    },
    confirm: {
        value: "",
        errors: {
            empty: false
        }
    },
    phone: {
        value: "",
        optional: true,
        errors: {
            empty: false
        }
    }
};