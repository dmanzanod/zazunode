import  getConnection from "./../database/database.js";

const getLanguages = async(request, response) => {

    try{
        const connection= await getConnection();
        const result=await connection.query("SELECT CATEGORIA, NOMBREPRODUCTO, CODIGO, PRODUCTO PRECIO_NUEVO, PRECIO_REGISTRADO, ENVASE_DISPONIBLE FROM lubricentro_productos");
        console.log(result);
        response.json(result);
    }catch(error){
        response.status(500);
        response.send(error.message);
    }
};

export const methods = {
    getLanguages
};