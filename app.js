// 1. Selección de elementos del DOM
const formulario = document.querySelector('.form-contacto');
const mensajeConfirmacion = document.getElementById('mensajeExito');
const botonTema = document.getElementById('theme-toggle');
const htmlRoot = document.documentElement;

// --- LÓGICA DE PERSISTENCIA Y MODO OSCURO ---
// Al cargar, revisamos si ya existe una preferencia guardada
const temaGuardado = localStorage.getItem('tema');

if (temaGuardado === 'dark') {
    htmlRoot.setAttribute('data-theme', 'dark');
    botonTema.textContent = '☀️ Modo Claro';
}

// Evento para cambiar el tema
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
    event.preventDefault(); // Evita que la página se recargue

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const botonEnvio = formulario.querySelector('input[type="submit"]');

    // Expresión regular para validar el formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(correo)) {
        alert("Por favor, ingresa un correo electrónico real (ejemplo@correo.com).");
        return;
    }

    if (nombre === "" || correo === "") {
        alert("Por favor, completa los campos obligatorios.");
    } else {
        // Feedback visual de envío
        botonEnvio.value = "Enviando...";
        botonEnvio.disabled = true;
        botonEnvio.style.opacity = "0.7";

        setTimeout(() => {
            mensajeConfirmacion.style.display = 'flex'; 
            formulario.reset(); 
            botonEnvio.value = "Enviar";
            botonEnvio.disabled = false;
            botonEnvio.style.opacity = "1";

            setTimeout(() => {
                mensajeConfirmacion.style.display = 'none';
            }, 5000);
        }, 1500); 
    }
});

// --- RENDERIZADO DINÁMICO DE HABILIDADES ---
const habilidades = [
    { nombre: "HTML5", nivel: "Intermedio", icono: "🌐" },
    { nombre: "CSS3", nivel: "Intermedio", icono: "🎨" },
    { nombre: "JavaScript", nivel: "Básico", icono: "⚡" },
    { nombre: "Git & GitHub", nivel: "Básico", icono: "📁" }
];

function cargarHabilidades() {
    const contenedor = document.getElementById('lista-habilidades');
    if (!contenedor) return; // Seguridad por si no encuentra el ID
    
    contenedor.innerHTML = "";
    
    habilidades.forEach(hab => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${hab.icono} ${hab.nombre}</strong> - <em>${hab.nivel}</em>`;
        contenedor.appendChild(li);
    });
}

// Ejecutamos la función una sola vez al cargar el script
cargarHabilidades();