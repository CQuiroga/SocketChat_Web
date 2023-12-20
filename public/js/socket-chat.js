const socket = io();

const params = new URLSearchParams( window.location.search );

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('Se requiere ingresar un nombre de usuario y sala a ingresar!');
}

const usuario = {
    nombre: params.get( 'nombre' ),
    sala:  params.get( 'sala' )
};


socket.on('connect', () => {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, (response) => {
        console.log('Usuarios conectados: ', response );
    } )
});

// escuchar
socket.on('disconnect', () => {
    console.log('Perdimos conexión con el servidor');
});


// Enviar información
/* socket.emit('crearMensaje', { // Emite información
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, (resp) => {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('crearMensaje', (mensaje) => { // Escucha información
    console.log('Servidor: ', mensaje);
});

// Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersonas', ( personas ) => {
    console.log( personas );
});

// Mensaje privados

socket.on( 'mensajePrivado', ( mensaje )=> {
    console.log('mensaje privado: ', mensaje);
})