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
                let dayOfWeekIndex2=0;
                const { nombre } = request.params;
                var date = new Date();
                let hour = date.getHours();

                var dayNames = ['', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
                var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
              
                var dayOfMonth = date.getDate();
                var dayOfWeekIndex = date.getDay();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();

                if(hour > 14)
                {
                    dayOfWeekIndex++;    
                }

                //busco el día mayor

                const connection= await getConnection();
                let qString = "SELECT dia FROM zazu_mobil.depachos where comuna LIKE CONCAT('%', ? , '%') and dia > " + dayOfWeekIndex + " limit 1"; 
                const result = await connection.query(qString, nombre);
                //response.json(result);

                console.log(qString + " ---- " + dayOfWeekIndex + " ---- " + nombre +  ' ----' + result);  
                
                if(!result)
                {
                    const connection= await getConnection();
                    let qString = "SELECT dia FROM zazu_mobil.depachos where comuna LIKE CONCAT('%', ? , '%') and dia >= " + dayOfWeekIndex + " limit 1"; 
                    const result = await connection.query(qString, nombre);
                    dayOfWeekIndex2=result[0].dia;

                    }else{
                    
                    const connection= await getConnection();
                    let qString = "SELECT dia FROM zazu_mobil.depachos where comuna LIKE CONCAT('%', ? , '%') and dia <= " + dayOfWeekIndex + " limit 1"; 
                    const result = await connection.query(qString, nombre);

                    dayOfWeekIndex2=result[0].dia;
                }

                response.json(dayNames[dayOfWeekIndex2]);  
                //busco el día menor
                //SELECT dia FROM zazu_mobil.depachos where comuna = 'linares' and dia < 8 limit 1;
                //console.log(dayNames[dayOfWeekIndex2] + ' ' + monthNames[monthIndex] + ' ' +  dayOfMonth + ' ' + year + '-' + hour); 
                //date.setDate(date.getDate() + 1);
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