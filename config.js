import {config} from "dotenv";

config();
 
export default {
//host: process.env.HOST || "localhost",
    //database: process.env.DATABASE || "zazu_mobil",
    //user: process.env.USER || "root",
    //password: process.env.PASSWORD || "password",
    host     : process.env.HOST,
    port     : process.env.PORT,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
};