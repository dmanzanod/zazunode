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
            const { nuevo } = request.params;
            const aux = nombre.replace('{"name":"', '');
            const aux1 = aux.replace('"}', '');
            console.log("NUEVO: " + nuevo);
            const connection= await getConnection();
            let qString="";

            if(parseInt(nuevo) == 0)
            { 
                qString = "SELECT CONCAT(envase_disponible, ' $', ROUND((PRECIO_NUEVO / 1.06))) as name from lubricentro_productos where NOMBREPRODUCTO = ?"; 
            } else {
                qString = "SELECT CONCAT(envase_disponible, ' $', PRECIO_NUEVO) as name from lubricentro_productos where NOMBREPRODUCTO = ?"; 
            }
            
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
                var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
              
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

                var j = 1;
                var dias = 0;
                var dias2 = dayOfWeekIndex;
                for(var i=dias2; i<=7; i++)
                {
                    if(i==7 && dias == 0)
                    {
                        dias2=1;
                    }
                    if(dayOfWeekIndex == dayOfWeekIndex2){
                        dias = j;
                    }

                    j++;
                }

                var fecha = new Date(date);
                fecha.setDate(fecha.getDate() + j+1);
                
                //fecha = fecha.toUTCString();

                var dayOfMonth = fecha.getDate();
                var dayOfWeekIndexfecha = fecha.getDay();
                var monthIndexfecha = fecha.getMonth();

                response.send(dayNames[dayOfWeekIndexfecha] + ' ' + dayOfMonth + ' de ' + monthNames[monthIndexfecha]);

                //response.send(dayNames[dayOfWeekIndex2]);

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