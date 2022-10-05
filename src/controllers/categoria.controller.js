import  getConnection  from "./../database/database.js";

const getCateoria = async(request, response) => {

    try{
        const connection= await getConnection();
        const result = await connection.query("SELECT categoria as name FROM `lubricentro_productos` group by CATEGORIA");
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
        let qString = "SELECT NOMBREPRODUCTO as name FROM lubricentro_productos WHERE NOMBREPRODUCTO LIKE CONCAT('%', ? , '%') GROUP BY NOMBREPRODUCTO"; 
        const result = await connection.query(qString, nombre);
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
            let qString = "SELECT CONCAT(envase_disponible, ' $', PRECIO_REGISTRADO) as name from lubricentro_productos where NOMBREPRODUCTO = ?"; 
            const result = await connection.query(qString, aux1);
            response.json(result);
        }catch(error){
            response.status(500);
            response.send(error.message);
        }
    };


    const getProductosCat = async(request, response) => {
        //CAMBIAR STOREPROCEDURE
            try{
                const { nombre } = request.params;
                const aux = nombre.replace('{"name":"', '');
                const aux1 = aux.replace('"}', '');
                const connection= await getConnection();
                let qString = "SELECT NOMBREPRODUCTO as name from lubricentro_productos where CATEGORIA = ? GROUP BY NOMBREPRODUCTO"; 
                const result = await connection.query(qString, aux1);
                response.json(result);
            }catch(error){
                response.status(500);
                response.send(error.message);
            }
        };


    const getDespacho = async(request, response) => {
        //CAMBIAR STOREPROCEDURE
            try{
                var date = new Date();
                var dayNames = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
              
                var dayOfMonth = date.getDate();
                var dayOfWeekIndex = date.getDay();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();
              
                console.log(dayNames[dayOfWeekIndex] + ' ' + monthNames[monthIndex] + ' ' +  dayOfMonth + ' ' + year); 

                //date.setDate(date.getDate() + 1);
                response.json(dayOfWeekIndex);

            }catch(error){
                response.status(500);
                response.send(error.message);
            }
        };


export const methods = {
    getCateoria,
    getProducto,
    getFormato,
    getProductosCat,
    getDespacho
};