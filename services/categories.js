import fs from 'fs';

export const getAllCategories = () => {
    const data = fs.readFileSync("./data/cats/cat.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return { error: 'error:' + err };
        } else {
            console.log(data);
            return data;
        }
    });

    return JSON.parse(data);
}

export const getProductsByCategory = (catID) => {
    try {
        const data = fs.readFileSync(`./data/cats_products/${catID}.json`, "utf8", (err, data) => {
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
            return { error: 'Categoria no encontrada' };
        }
        return error;
    }
}