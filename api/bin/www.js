const app = require('../app');
const debug = require('debug')('express-good-example:server');
const http = require('http');
const {postMessage} = require('../components/messages/dao');
const port = normalizePort(process.env.PORT);
app.set('port', port);

const server = http.createServer(app);
/* SOCKET IO */
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    let usuario;
    socket.on('join', ({user}) => {
        usuario = user.name + " " + user.lastname;
        io.emit("mensajes", {
            user: user.name + " " + user.lastname,
            role: user.role,
            message: "Se ha conectado a la clase"
        })
    })
    socket.on('mensaje', async ({user, message}) => {
        usuario = user.user.name + " " + user.user.lastname;
        io.emit('mensajes', {
            user: `${user.user.name} ${user.user.lastname}`,
            role: user.user.role,
            message: message
        });
        await postMessage(message, user.user.name + " " + user.user.lastname, user.user.role)
    })
    socket.on('disconnect', () => {
        io.emit("mensajes", {user: usuario, message: "Ha abandonado el chat"})
    })
})

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log("Server on port", port)
}

