import express from "express";
import morgan from "morgan";
import logger from "morgan";


//Routes
import languageRoutes from "./routes/language.routes.js";
import categoriaroutes from "./routes/categorias.route.js";

const app=express();

//setings
//app.set("port", 4000);

const port = process.env.port;

app.listen(port, () => {
    console.log("zazu");
});
 
//middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/languages", languageRoutes);
app.use("/api/getcategorias", categoriaroutes);

export default app;

