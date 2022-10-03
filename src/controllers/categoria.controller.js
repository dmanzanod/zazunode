import  getConnection  from "./../database/database.js";

const getCateoria = async(request, response) => {

    try{
        const connection= await getConnection();
        const result = await connection.query("SELECT categoria FROM `lubricentro_productos` group by CATEGORIA");
        console.log(result);
        response.json(result);
    }catch(error){
        response.status(500);
        response.send(error.message);
    }
};

const getProducto = async(request, response) => {
//CAMBIAR STOREPROCEDURE
    try{
        const { nombre } = request.params;
        const connection= await getConnection();
        let qString = `SELECT NOMBREPRODUCTO, id 
        FROM lubricentro_productos  
        WHERE NOMBREPRODUCTO LIKE CONCAT('%', ? , '%')
        GROUP BY NOMBREPRODUCTO;`; 
        const result = await connection.query(qString, nombre);
        console.log(result);
        response.json(result);
    }catch(error){
        response.status(500);
        response.send(error.message);
    }
};

const getFormato = async(request, response) => {
    //CAMBIAR STOREPROCEDURE
        try{
            const { nombre } = request.params;
            const aux = nombre.replace('{"name":"', '');
            const aux1 = aux.replace('"}', '');
            
            const connection= await getConnection();
            let qString = `SELECT envase_disponible, PRECIO_NUEVO, PRECIO_REGISTRADO from lubricentro_productos where NOMBREPRODUCTO = ?`; 
            const result = await connection.query(qString, aux1);
            console.log(result);
            console.log(aux1);
            response.json(result);
        }catch(error){
            response.status(500);
            response.send(error.message);
        }
    };


export const methods = {
    getCateoria,
    getProducto,
    getFormato
};