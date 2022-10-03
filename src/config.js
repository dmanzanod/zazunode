import {config} from "dotenv";

config();
 
export default {
//host: process.env.HOST || "localhost",
    //database: process.env.DATABASE || "zazu_mobil",
    //user: process.env.USER || "root",
    //password: process.env.PASSWORD || "password",
    host     : 'ec2-3-87-203-241.compute-1.amazonaws.com',
    port     : '3306',
    user     : 'zazudb2',
    password : 'zazu2023',
    database : 'zazu_mobil'
};