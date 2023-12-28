
// Referencias a elementos HTML
let divUsuarios = document.querySelector('#divUsuarios');
let formEnviar = document.querySelector('#formEnviar');
let txtMensaje = document.querySelector('#txtMensaje');
let divChatbox = document.querySelector('#divChatbox');





// Para renderizar en HTML Usuarios
function mostrarUsuarios( personas ) {

    let html = '';

    html += `<li>
            <a href="#" class="active"> Chat de <span> ${ params.get( 'sala' ) } </span></a>
            </li>`;

    for (let i = 0; i < personas.length; i++) {
        html += `<li><a data-id="'${ personas[i].id }'" href="#">
        <img data-id="'${ personas[i].id }'" src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> 
        <span data-id="'${ personas[i].id }'" class="text-secondary">${ personas[i].nombre }
        <small data-id="'${ personas[i].id }'" class="text-success">online</small>
        </span></a></li>`;
    }

    divUsuarios.innerHTML = html;

}

// Para renderizar en HTML Conversaciones
function mostrarMensajes( mensaje, whoaMi ) {

    let fecha = new Date( mensaje.fecha );
    let hora = `${ fecha.getHours() } : ${ fecha.getMinutes() }`;
    let html = ``;
    let adminClass = 'info'
    if ( mensaje.nombre === 'Admin' ) {
        adminClass = 'danger';
    }


    if (whoaMi) {

        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+mensaje.nombre+'</h5>';
        html += '        <div class="box bg-light-inverse">'+mensaje.mensaje+'</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+hora+'</div>';
        html += '</li>';
    } else {

        html += '<li class="animated fadeIn">';
        if ( mensaje.nombre !== 'Admin') {
            
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '    <div class="chat-content">';
        html += '        <h5>'+mensaje.nombre+'</h5>';
        html += '        <div class="box bg-light-'+adminClass+'">'+mensaje.mensaje+'</div>';
        html += '     </div>';
        html += '    <div class="chat-time">'+hora+'</div>';
        html += '</li>';
        
    }
    divChatbox.innerHTML += html;
}

// Listeners
divUsuarios.addEventListener('click', ( e ) => {
    const usuariosConectados = e.target.getAttribute('data-id');
    if ( usuariosConectados ) {        
        console.log( usuariosConectados );
    }
});

formEnviar.addEventListener('submit', ( e ) => {
    e.preventDefault();

    if ( txtMensaje.value.trim().length === 0 ) {
        return;
    }

    // Enviar información
    socket.emit('crearMensaje', { // Emite información
        usuario: params.get( 'nombre' ),
        mensaje: txtMensaje.value
    }, ( mensaje ) => {
        txtMensaje.value = '';
        txtMensaje.focus();
        mostrarMensajes( mensaje, true );
    });

})
