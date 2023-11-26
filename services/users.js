import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";

const users_file = './data/users.js';

export const addUser = async (email, plainPassword) => {

    //Leer users.json.
    const rawData = await fs.readFile(users_file);
    const data = JSON.parse(rawData);

    //Chequeo si el usuario ya existe.
    const existingUser = data.users.find((user) => user.email === email);
    if (existingUser) {
        return 'El usuario ya existe.';
    };

    //Hash del password.
    const password = bcrypt.hashSync(plainPassword, 10);
    // console.log(password)

    //Add user.
    const newUser = {
        id: data.users.length + 1,
        email: email.toLowerCase(),
        password,
        rol: 'client'
    };

    data.users.push(newUser);

    //Actualizo los cambios en users.json.
    await fs.writeFile(users_file,
        JSON.stringify(data, null, 2));

    return 'Usuario creado.';

};

export const loginUser = async (email, password) => {

    //Leer archivo users.json.
    const rawData = await fs.readFile(users_file);
    const data = JSON.parse(rawData);

    //Busco al usuario en base al email.
    const user = data.users.find((item) => item.email === email);
    if (!user) {
        return 'El usuario no ha sido encontrado.';
    };

    //Verifico el password.
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return 'Contraseña incorrecta';
    };

    const token = jwt.sign({ email: email, userId: 25801 }, 'HOLA123', { expiresIn: '2h' })

    return {
        result: true,
        msg: 'asdasd',
        token
    };

    // return {
    //     result: true,
    //     msg: 'El usuario no existe en el sistema',
    // }
};
