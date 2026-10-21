(function () {
    'use strict';

    var USUARIO = 'haniel';
    var SESION = 'velox_sesion';
    var LOGIN = 'index.html';

    var dashboard = document.getElementById('vista-dashboard');
    var botonSalir = document.getElementById('boton-salir');

    function haySesion() {
        try {
            return sessionStorage.getItem(SESION) === USUARIO;
        } catch (e) {
            return false;
        }
    }

    // Protege la vista: sin sesión no se muestra el dashboard
    if (!haySesion()) {
        window.location.replace(LOGIN);
        return;
    }

    dashboard.hidden = false;

    botonSalir.addEventListener('click', function () {
        try {
            sessionStorage.removeItem(SESION);
        } catch (e) { /* sin persistencia disponible */ }
        window.location.href = LOGIN;
    });
})();
