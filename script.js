const submitFunction = (event) => {
    if(!validarFormulario()){
        event.preventDefault()
    } else {
        event.preventDefault()

        let nombre =  document.getElementById('nombre').value
        let apellido =  document.getElementById('apellido').value
        let documento =  document.getElementById('documento').value
        let email =  document.getElementById('email').value
        let edad =  document.getElementById('edad').value
        let actividad =  document.getElementById('actividad').value
        let nivelEstudio =  document.getElementById('nivelEstudio').value
        let aceptoTerminos =  document.getElementById('aceptoTerminos').checked

        const publicidad = []
        document.querySelectorAll('[name="publicidad"]').forEach((element) => {
            if(element.checked){
                publicidad.push(element.value.charAt(0).toUpperCase() + element.value.slice(1))
            }
        })

        alert(
            'Nombre: ' + nombre + '\n' +
            'Apellido: ' + apellido + '\n' +
            'Documento: ' + documento + '\n' +
            'Email: ' + email + '\n' +
            'Edad: ' + edad + '\n' +
            'Actividad: ' + actividad + '\n' +
            'Nivel de Estudio: ' + nivelEstudio + '\n' +
            'Acepto TyC: ' + (aceptoTerminos ? 'Si' : 'No') + '\n' +
            'Publicidad: ' + (publicidad.length ? publicidad.toString() : 'No') + '\n'
        )
    }
}

document.getElementById('formulario').addEventListener('submit', submitFunction)

function validarFormulario(){
    const camposTexto = document.querySelectorAll('input[type="text"]')
    let validacionCorrecta = true

    camposTexto.forEach(campo => {
        let errorCampo = document.getElementById('error' + campo.id.charAt(0).toUpperCase() + campo.id.slice(1))
        if(campo.value.length == ''){
            mostrarError(errorCampo, 'Este campo es Requerido!')
            validacionCorrecta = false
        } else if (campo.value.length > 0  && campo.value.length < 3) {
            mostrarError(errorCampo, 'Este campo debe tener al menos 3 caracteres!')
            validacionCorrecta = false
        } else {
            ocultarError(errorCampo)
        }
    })

    const email = document.getElementById('email')
    const errorEmail = document.getElementById('errorEmail')

    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){ // Regex validar formato de email
        ocultarError(errorEmail);
    } else {
        mostrarError(errorEmail, 'El email ingresado no es Valido!')
        validacionCorrecta = false
    }
    
    const edad = document.getElementById('edad')
    const errorEdad = document.getElementById('errorEdad')

    if(edad.value < 18) {
        mostrarError(errorEdad, 'Usted debe ser Mayor de 18 años!')
        validacionCorrecta = false
    } else {
        ocultarError(errorEdad)
    }

    const actividad = document.getElementById('actividad')
    const errorActividad = document.getElementById('errorActividad')

    if(actividad.value == ''){
        mostrarError(errorActividad, 'Seleccione una Actividad!')
        validacionCorrecta = false
    } else {
        ocultarError(errorActividad)
    }

    const nivelEstudio = document.getElementById('nivelEstudio')
    const errorNivelEstudio = document.getElementById('errorNivelEstudio')

    if(nivelEstudio.value == ''){
        mostrarError(errorNivelEstudio, 'Seleccione un Nivel de Estudio!')
        validacionCorrecta = false
    } else {
        ocultarError(errorNivelEstudio)
    }

    const aceptoTerminos = document.getElementById('aceptoTerminos')
    const errorAceptoTerminos = document.getElementById('errorAceptoTerminos')

    if(!aceptoTerminos.checked){
        mostrarError(errorAceptoTerminos, 'Debe Aceptar los Terminos y Condiciones!')
        validacionCorrecta = false
    } else {
        ocultarError(errorAceptoTerminos)
    }

    return validacionCorrecta
}

const mostrarError = (elemento, mensaje) => {
    let input = elemento.previousElementSibling.classList.add('error-input')
    elemento.textContent = mensaje
    elemento.style.display = 'block'
}

const ocultarError = (elemento) => {
    let input = elemento.previousElementSibling.classList.remove('error-input')
    elemento.textContent = ''
    elemento.style.display = 'none'
}