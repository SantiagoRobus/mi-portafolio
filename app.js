// 1. Selección de elementos del DOM
const formulario = document.querySelector('.form-contacto');
const mensajeConfirmacion = document.getElementById('mensajeExito');
const botonTema = document.getElementById('theme-toggle');
const htmlRoot = document.documentElement;

// --- LÓGICA DE PERSISTENCIA Y MODO OSCURO ---
const temaGuardado = localStorage.getItem('tema');
if (temaGuardado === 'dark') {
    htmlRoot.setAttribute('data-theme', 'dark');
    botonTema.textContent = '☀️ Modo Claro';
}

botonTema.addEventListener('click', () => {
    if (htmlRoot.getAttribute('data-theme') === 'dark') {
        htmlRoot.removeAttribute('data-theme');
        botonTema.textContent = '🌙 Modo Oscuro';
        localStorage.setItem('tema', 'light');
    } else {
        htmlRoot.setAttribute('data-theme', 'dark');
        botonTema.textContent = '☀️ Modo Claro';
        localStorage.setItem('tema', 'dark');
    }
});

// --- VALIDACIÓN Y ENVÍO DEL FORMULARIO ---
formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const botonEnvio = formulario.querySelector('input[type="submit"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(correo)) {
        alert("Por favor, ingresa un correo electrónico real.");
        return;
    }

    if (nombre === "" || correo === "") {
        alert("Por favor, completa los campos obligatorios.");
    } else {
        botonEnvio.value = "Enviando...";
        botonEnvio.disabled = true;
        setTimeout(() => {
            mensajeConfirmacion.style.display = 'flex'; 
            formulario.reset(); 
            botonEnvio.value = "Enviar";
            botonEnvio.disabled = false;
            setTimeout(() => { mensajeConfirmacion.style.display = 'none'; }, 5000);
        }, 1500); 
    }
});

// --- RENDERIZADO DINÁMICO DE HABILIDADES ---
// IMPORTANTE: Definimos los datos ANTES de llamar a la función
const habilidades = [
    { nombre: "HTML5", nivel: "Intermedio", icono: "🌐" },
    { nombre: "CSS3", nivel: "Intermedio", icono: "🎨" },
    { nombre: "JavaScript", nivel: "Básico", icono: "⚡" },
    { nombre: "Git & GitHub", nivel: "Básico", icono: "📁" }
];

function cargarHabilidades() {
    const contenedor = document.getElementById('lista-habilidades');
    if (contenedor) {
        contenedor.innerHTML = "";
        habilidades.forEach(hab => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${hab.icono} ${hab.nombre}</strong> - <em>${hab.nivel}</em>`;
            contenedor.appendChild(li);
        });
    }
}

// Llamamos a la función al final de todo
cargarHabilidades();