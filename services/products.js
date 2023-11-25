import fs from 'fs';


export const getProductDetail = (productID) => {
    try {
        const data = fs.readFileSync(`./data/products/${productID}.json`, "utf8", (err, data) => {
            if (err) {
                console.log(err);
                return { error: 'error:' + err };
            } else {
                return data;
            }
        });

        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return { error: 'Producto no encontrado' };
        }
        return error;
    }
}

export const getProductComents = (productID) => {
    try {
        const data = fs.readFileSync(`./data/products_comments/${productID}.json`, "utf8", (err, data) => {
            if (err) {
                console.log(err);
                return { error: 'error:' + err };
            } else {
                console.log(data);
                return data;
            }
        });

        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return { error: 'Comentarios no encontrados' };
        }
        return error;
    }
}

export const getDefaultCart = (userID) => {
    try {
        const data = fs.readFileSync(`./data/user_cart/${userID}.json`, "utf8", (err, data) => {
            if (err) {
                console.log(err);
                return { error: 'error:' + err };
            } else {
                return data;
            }
        });

        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return { error: 'No se pude mostrar el carrito' };
        }
        return error;
    }
}