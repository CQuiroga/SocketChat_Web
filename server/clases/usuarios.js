

class Usuarios {
    
    constructor() {
        this.personas = [];
    }

    // Cuando una persona se une al chat
    agregarPersona( id, nombre, sala ) {
        
        const persona = { id, nombre, sala };
        this.personas.push( persona );
        return this.personas;

    }

    // Obtener datos de una sola persona
    getPersona( id ) {
        const persona = this.personas.filter( persona => persona.id === id)[0];

        return persona;
    }

    // Obtener todas las personas en el chat

    getPersonas () {
        return this.personas;
    }

    // Concepto de las salas
    getPersonasPorSala( sala ) {
        const personasEnSala = this.personas.filter( persona => persona.sala === sala);
            return personasEnSala;
    }

    // Quitar persona de la sala
    borrarPersona( id ) {

        const personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter( persona => persona.id != id);
        return personaBorrada;
    }

}

module.exports = {
    Usuarios
};