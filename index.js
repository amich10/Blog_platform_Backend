import http from "http";
import app from "./src/config/express.config.js";

const httpServer = http.createServer(app);
const PORT = 9006;

httpServer.listen(PORT,'0.0.0.0',(err) =>{
    if(!err){
        console.log(`The server is runing on PORT:${PORT}`)
        console.log(`Press ctrl + C to exit the server`)
    }
})
