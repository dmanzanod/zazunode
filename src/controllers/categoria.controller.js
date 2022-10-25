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
        response.json(result + "Menú Principal");
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
                qString = "SELECT CONCAT(envase_disponible, ' $', FORMAT(ROUND((PRECIO_NUEVO / 1.06)),0, 'de_DE'),  '+IVA') as name from lubricentro_productos where NOMBREPRODUCTO = ?"; 
            } else {
                qString = "SELECT CONCAT(envase_disponible, ' $', FORMAT(PRECIO_NUEVO, 0, 'de_DE'), ' +IVA') as name from lubricentro_productos where NOMBREPRODUCTO = ?"; 
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

                var dayNames = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
                var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
              
                var dayOfMonth = date.getDate();
                var dayOfWeekIndex = date.getDay();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();

                console.log(hour);

                if(hour >= 14)
                {
                    dayOfWeekIndex++;    
                }

                //busco el día mayor

                const connection= await getConnection();
                let qString = "SELECT count(dia) dia FROM zazu_mobil.depachos where comuna LIKE CONCAT('%', ? , '%') and dia > " + dayOfWeekIndex + " limit 1"; 
                const result2 = await connection.query(qString, nombre);
                //response.json(result2[0].dia);
                console.log(dayOfWeekIndex);
                
                if(result2[0].dia != null)
                {
                    console.log("a");
                    const connection= await getConnection();
                    let qString = "SELECT dia FROM zazu_mobil.depachos where comuna LIKE CONCAT('%', ? , '%') and dia >= " + dayOfWeekIndex + " limit 1"; 
                    const result = await connection.query(qString, nombre);
                    dayOfWeekIndex2=result[0].dia;

                    }else{
                    console.log("b");

                    const connection= await getConnection();
                    let qString = "SELECT dia FROM zazu_mobil.depachos where comuna LIKE CONCAT('%', ? , '%') and dia <= " + dayOfWeekIndex + " limit 1"; 
                    const result = await connection.query(qString, nombre);

                    dayOfWeekIndex2=result[0].dia;
                }

                var j = 1;
                var dias = 0;
                var dias2 = dayOfWeekIndex;

                console.log("dayOfWeekIndex_ =>" + dayOfWeekIndex);


                for(var i=dias2; i<=7; i++)
                {
                    if(i==7 && dias == 0)
                    {
                        dias2=1;
                    }

                    console.log("dayOfWeekIndex =>" + dayOfWeekIndex);
                    console.log("dayOfWeekIndex2 =>" + dayOfWeekIndex2);

                    if(parseInt(dayOfWeekIndex) == parseInt(dayOfWeekIndex2))
                    {
                        dias = j;
                        i=8;
                    }else{
                        dayOfWeekIndex++;
                        j++;
                    }
                }

                console.log("dias==>" + dias);

                console.log("j=>" + j);   

                var fecha = new Date(date);
                fecha.setDate(fecha.getDate() + dias);
                
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