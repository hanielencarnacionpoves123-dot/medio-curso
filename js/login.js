// 1. Credenciales correctas designadas
const USUARIO_CORRECTO = 'haniel';
const CLAVE_CORRECTA = 'haniel123';

// 2. Elementos del DOM
const loginForm = document.getElementById('loginForm');
const usuarioInput = document.getElementById('usuario');
const passwordInput = document.getElementById('password');
const btnToggleEye = document.getElementById('btnToggleEye');
const eyeIcon = document.getElementById('eyeIcon');
const modalError = document.getElementById('modalError');
const btnReintentar = document.getElementById('btnReintentar');

// 3. Función para ver/ocultar contraseña
btnToggleEye.addEventListener('click', () => {
  const esPassword = passwordInput.type === 'password';
  passwordInput.type = esPassword ? 'text' : 'password';
  eyeIcon.className = esPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
});

// 4. Funciones del Modal de Alerta
function mostrarError() {
  modalError.hidden = false;
  btnReintentar.focus();
}

function cerrarError() {
  modalError.hidden = true;
  passwordInput.value = '';
  passwordInput.focus();
}

btnReintentar.addEventListener('click', cerrarError);

modalError.addEventListener('click', (e) => {
  if (e.target === modalError) cerrarError();
});

// 5. Validación del formulario al hacer submit
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const usuarioIngresado = usuarioInput.value.trim().toLowerCase();
  const claveIngresada = passwordInput.value.trim();

  const esUsuarioValido = usuarioIngresado === USUARIO_CORRECTO || usuarioIngresado === `${USUARIO_CORRECTO}@vertex.com`;
  const esClaveValida = claveIngresada === CLAVE_CORRECTA;

  if (esUsuarioValido && esClaveValida) {
    sessionStorage.setItem('usuario_activo', USUARIO_CORRECTO);
    window.location.href = 'dashboard.html';
  } else {
    mostrarError();
  }
});
