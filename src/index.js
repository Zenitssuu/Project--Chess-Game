import express from "express"
import http from "http"
import { Server } from "socket.io";
import { Chess } from "chess.js";
import path from "path";
import { render } from "ejs";
import { title } from "process";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine","ejs");
// app.set('view',path.resolve('./views'));
app.use(express.static('public'))


const chess = new Chess(); //hold the brain of chess

let players = {};
let currentPlayer = "w";

app.get('/',(req,res)=>{
    res.render("index",{title:"chess game"});
});

io.on('connection',(newSocket)=>{
    console.log("connected with id: ",newSocket.id);  
    
    if(!players.white){
        players.white = newSocket.id;
        newSocket.emit("playerRole","w");
    }
    else if(!players.black){
        players.black = newSocket.id;
        newSocket.emit("playerRole","b");
    }
    else{
        newSocket.emit("spectator");
    }

    newSocket.on('disconnect',()=>{
        if(newSocket.id === players.white){
            delete players.white;
        }
        else if(newSocket.id === players.black){
            delete players.black;
        }
    })

    newSocket.on("move",(move)=>{

        try {
            if(chess.turn() === 'w' && newSocket.id !== players.white) return;
            if(chess.turn() === 'b' && newSocket.id !== players.black) return;

            const isCorrectMove = chess.move(move);

            if(isCorrectMove){
                currentPlayer = chess.turn();
                io.emit('move',move);
                io.emit("boardState",chess.fen());
            }

            else{
                console.log("invalid move: ", move);
                newSocket.emit("invalid move", move);
                
            }            
        } catch (error) {
            console.log(error);
            newSocket.emit("invalid move: ", move);
            
        }
    })
})

server.listen(3000,()=>console.log('listening on server 3000')
)


