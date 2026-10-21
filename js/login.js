(function () {
    'use strict';

    var USUARIO = 'haniel';
    var PASSWORD = 'hanielpoves123';
    var SESION = 'velox_sesion';
    var DESTINO = 'dashboard.html';

    var form = document.getElementById('form-login');
    var campoUsuario = document.getElementById('usuario');
    var campoPassword = document.getElementById('password');
    var botonIngresar = document.getElementById('boton-ingresar');
    var modal = document.getElementById('modal-error');
    var modalTitulo = document.getElementById('modal-error-titulo');
    var modalTexto = document.getElementById('modal-error-texto');
    var botonReintentar = document.getElementById('boton-reintentar');

    function abrirModal(titulo, texto) {
        modalTitulo.textContent = titulo;
        modalTexto.textContent = texto;
        modal.hidden = false;
        botonReintentar.focus();
    }

    function cerrarModal() {
        if (modal.hidden) return;
        modal.hidden = true;
        campoPassword.value = '';
        campoPassword.focus();
    }

    form.addEventListener('submit', function (evento) {
        evento.preventDefault();

        var usuario = campoUsuario.value.trim();
        var password = campoPassword.value;

        if (!usuario || !password) {
            abrirModal('Campos incompletos', 'Completa tu correo y tu contraseña para continuar.');
            return;
        }

        botonIngresar.disabled = true;
        botonIngresar.textContent = 'Verificando...';

        window.setTimeout(function () {
            botonIngresar.disabled = false;
            botonIngresar.textContent = 'Ingresar a mi Cuenta';

            var coincideUsuario = usuario.toLowerCase() === USUARIO || usuario.toLowerCase() === USUARIO + '@veloxmarket.com';

            if (coincideUsuario && password === PASSWORD) {
                try {
                    sessionStorage.setItem(SESION, USUARIO);
                } catch (e) { /* modo privado: se continúa sin persistir */ }
                window.location.href = DESTINO;
            } else {
                abrirModal('Usuario o contraseña incorrectos.', 'Intenta de nuevo.');
            }
        }, 400);
    });

    botonReintentar.addEventListener('click', cerrarModal);

    // Clic en el fondo o tecla Escape cierran el modal
    modal.addEventListener('click', function (evento) {
        if (evento.target === modal) cerrarModal();
    });

    document.addEventListener('keydown', function (evento) {
        if (evento.key === 'Escape' && !modal.hidden) cerrarModal();
    });
})();
