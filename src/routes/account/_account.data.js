export let accountText = {
    name: {
        label: "Nama",
        edit: false
    },
    username: {
        label: "Username",
        edit: false
    },
    email: {
        label: "Email",
        edit: false
    },
    phone: {
        label: "Telepon",
        edit: false
    }
};

export let accountEditText = {
    username: {
        content:
            " Username merupakan nama unik yang dapat dimiliki pengguna. \n Pemilihan username hanya dapat dilakukan sekali, selanjutnya tidak dapat diubah",
        error: "Username sudah terdaftar atau tidak dapat digunakan",
        success: "Username dapat digunakan",
        isError: undefined
    },
    email: {
        content: "Ubah email",
        error: "Email sudah terdaftar atau tidak dapat digunakan",
        success: "Email dapat digunakan",
        isError: undefined
    },
    phone: {
        content: "Ubah nomor telepon",
        error: "Nomor sudah terdaftar atau tidak dapat digunakan",
        success: "Nomor dapat digunakan",
        isError: undefined
    },
    password: {
        content: "Masukkan kata sandi",
        error: "Kata sandi minimal 6 karakter",
        success: "Kata sandi sesuai persyaratan",
        isError: undefined
    },
    newPassword: {
        content: "Kata sandi baru",
        error: "Kata sandi minimal 6 karakter",
        success: "Kata sandi sesuai persyaratan",
        isError: false,
        isNewPassword: true
    },
    confirmNewPasswordText: {
        content: "Ulangi kata sandi",
        error: "Konfirmasi kata sandi tidak sesuai",
        isError: false
    }
}