const { io } = require('../server');
const { Usuarios } = require('../clases/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

    // Cuando alguien se conecta al chat
io.on('connection', (client) => {
    client.on('entrarChat', ( data, callback ) => {

        if ( !data.nombre || !data.sala ) {
           return callback( {
            error: true,
            msg: 'Nombre y sala son requeridos!'
           });
        }

        client.join( data.sala );

        usuarios.agregarPersona( client.id, data.nombre, data.sala );

        client.broadcast.to( data.sala ).emit( 'listaPersonas', usuarios.getPersonasPorSala( data.sala ));
        // Para notificar al backend sobre quién se desconectó
        client.broadcast.to( data.sala ).emit( 'crearMensaje', crearMensaje( 'Admin', `${ data.nombre }, se unió el chat`));
        callback( usuarios.getPersonasPorSala( data.sala ) );
    });

    client.on('crearMensaje', (data, callback ) => {

        const persona = usuarios.getPersona( client.id );

        const mensaje = crearMensaje( persona.nombre , data.mensaje );
        client.broadcast.to( persona.sala ).emit( 'crearMensaje', mensaje);
        callback( mensaje );
    })

    // Para desconectar del chat
    client.on('disconnect', () => {
        const personaBorrada = usuarios.borrarPersona( client.id );

        // Para notificar al backend sobre quién se desconectó
        client.broadcast.to( personaBorrada.sala ).emit( 'crearMensaje', crearMensaje( 'Admin', `${ personaBorrada.nombre }, abandonó el chat`));

        // Para mostrar todas las personas que están conectadas
        client.broadcast.to( personaBorrada.sala ).emit( 'listaPersonas', usuarios.getPersonasPorSala( personaBorrada.sala ));
    });

    // Mensajes privados
    client.on( 'mensajePrivado', data => {
        const personaOrigen = usuarios.getPersona( client.id );
        client.broadcast.to( data.destino ).emit( 'mensajePrivado', crearMensaje( personaOrigen.nombre, data.mensaje ));
    } )




});