// 1. Selección de elementos
const formulario = document.querySelector('.form-contacto');
const mensajeConfirmacion = document.getElementById('mensajeExito');
const botonTema = document.getElementById('theme-toggle');
const htmlRoot = document.documentElement;

const temaGuardado = localStorage.getItem('tema');

if (temaGuardado === 'dark') {
    htmlRoot.setAttribute('data-theme', 'dark');
    botonTema.textContent = '☀️ Modo Claro';
}
// 3. Lógica del Modo Oscuro
botonTema.addEventListener('click', () => {
    if (htmlRoot.getAttribute('data-theme') === 'dark') {
        htmlRoot.removeAttribute('data-theme');
        botonTema.textContent = '🌙 Modo Oscuro';
        localStorage.setItem('tema', 'light');
    } else {
        htmlRoot.setAttribute('data-theme', 'dark');
        botonTema.textContent = '☀️ Modo Claro';
        localStorage.setItem('tema', 'dark')
    }
});

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const boton = formulario.querySelector('input[type="submit"]');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(!emailRegex.test(correo)){
        alert("Por favor, ingresa un correo electronico real (ejemplo@correo.com).");
        return;
    }

    if (nombre === "" || correo === "") {
        alert("Por favor, completa los campos obligatorios.");
    } else {
        boton.value = "Enviando...";
        boton.disabled = true;
        boton.style.opacity= "0.7";
        

        setTimeout(() => {
            mensajeConfirmacion.style.display = 'flex'; 
            formulario.reset(); 
            boton.value = "Enviar";
            boton.disabled = false;
            boton.style.opacity = "1";

            setTimeout(() => {
                mensajeConfirmacion.style.display = 'none';
            }, 5000);
        }, 1500); 
    }
});

const habilidades = [
    {nombre: "HTML5", nivel: "Intermedio", icono: "🌐"},
    {nombre: "CSS3", nivel: "Intermedio", icono: "🎨"},
    {nombre: "JavaScript", nivel: "Basico", icono: "⚡"},
    {nombre: "Git & GitHub", nivel: "Basico", icono: "📁"},
];

function cargarHabilidades() {
    const contenedor = document.getElementById('lista-habilidades');
    contenedor.innerHTML = "";
    habilidades.forEach(hab => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${hab.icono} ${hab.nombre}</strong> - <em>${hab.nivel}</em>`;
        contenedor.appendChild(li);
    });

    cargarHabilidades();

}