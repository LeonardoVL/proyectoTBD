//Import modules
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectToDatabase from './db/db.js';
import { PORT } from './config.js';

//Import APIs
import usuario from './routes/usuario.js';
import autor from './routes/autor.js'
import categoria from './routes/categoria.js'
import editorial from './routes/editorial.js'
import estadousuario from './routes/estadousuario.js'
import libro from './routes/libro.js'
import prestamo from './routes/prestamo.js'
import tipousuario from './routes/tipousuario.js'
import trabajador from './routes/trabajador.js'

//Init app
const app = express();

//Init Mongodb Connection
connectToDatabase()

//Settings
app.set("port", PORT || 3001);



//Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'));

//Routes
app.use("/api/usuario", usuario)
app.use("/api/autor", autor)
app.use("/api/categoria", categoria)
app.use("/api/editorial", editorial)
app.use("/api/estadousuario", estadousuario)
app.use("/api/libro", libro)
app.use("/api/prestamo", prestamo)
app.use("/api/tipousuario", tipousuario)
app.use("/api/trabajador", trabajador)

//Start server
app.listen(app.get("port"), () => {
    console.log(`Server on port ` + app.get("port"))
})
