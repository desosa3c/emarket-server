import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const addUser = async (usename, plainPassword) => {

    // const password = bcrypt.hashSync(plainPassword, 10);
    // console.log(password)
    return 'asdasdSA'
}

export const loginUser = async (email, password) => {

    // // Leer archivo users.json
    // // todo el archivo users.js
    // const data = {users: []}

    // const users = data.users

    // // Buscar el usuario en base al correo -> user
    // // Convertir todo a minusculas
    // const user = 'asd'


    // if(!user){
    //     return 'El usuario no existe en la base de datos'
    // }
    // // dbPassword = user.password (password Encryptada de la base)
    // const checkPassword = bcrypt.compareSync(password, dbPassword)

    const token = jwt.sign({ email: email, userId: 25801 }, 'HOLA123', { expiresIn: '2h' })

    return {
        result: true,
        msg: 'asdasd',
        token
    }

    return {
        result: true,
        msg: 'El usuario no existe en el sistema',
    }
}
