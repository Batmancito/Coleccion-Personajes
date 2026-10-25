Colección de Personajes Favoritos:
Este proyecto es una aplicación web desarrollada con HTML, CSS y JavaScript que permite crear y administrar una colección de personajes favoritos. La aplicación funciona como una SPA (Single Page Application), por lo que la navegación entre las distintas secciones ocurre sin recargar la página.

Toda la información se guarda en localStorage, así que los personajes permanecen almacenados en el navegador incluso después de cerrar la página.

¿Qué se puede hacer?
Agregar personajes nuevos.
Ver la colección completa.
Buscar personajes por nombre o rol.
Consultar los detalles de cada personaje.
Editar la información de un personaje.
Eliminar personajes con confirmación previa.
Conservar los datos mediante localStorage.
Mostrar imágenes o, en caso de error, mostrar las iniciales del personaje.
Cómo ejecutar el proyecto
Descarga o clona el proyecto.
Abre el archivo index.html en cualquier navegador moderno.
Mantén conexión a internet para que Bulma CSS pueda cargarse desde el CDN.
La primera vez que se ejecuta la aplicación se muestran automáticamente los personajes de ejemplo incluidos en el proyecto.

Si deseas reiniciar la colección puedes abrir la consola del navegador y ejecutar:

localStorage.clear();
Posteriormente recarga la página.

Estructura del proyecto
crud-personajes/
├── index.html
├── styles.css
├── app.js
├── imgs/
│   ├── Batman.jpeg
│   ├── Superman.jpeg
│   ├── Flash.jpeg
│   ├── GreenLantern.jpeg
│   ├── WonderWoman.jpeg
│   └── Shazam.jpeg
├── personajes-ejemplo.json
├── README.md
└── BITACORA.md
Tecnologías utilizadas
HTML5
CSS3
JavaScript (Vanilla JS)
Bulma CSS
localStorage
Cómo funciona
La aplicación tiene tres vistas principales:

Lista de personajes.
Vista de detalle.
Formulario para agregar o editar personajes.
Cuando el usuario interactúa con la aplicación, JavaScript se encarga de mostrar u ocultar cada sección sin necesidad de recargar la página. Además, todas las modificaciones realizadas se guardan automáticamente en localStorage.

La búsqueda funciona en tiempo real y permite encontrar personajes por nombre o rol. También se ignoran diferencias entre mayúsculas, minúsculas y acentos para hacer las búsquedas más cómodas.

Algunas funciones importantes
quitarAcentos(): permite realizar búsquedas y comparaciones sin importar los acentos.
obtenerIniciales(): genera las iniciales de un personaje cuando no hay imagen disponible.
mostrarVista(): controla la navegación entre las distintas secciones de la aplicación.
guardarPersonajes(): guarda toda la colección en localStorage.
cargarPersonajes(): recupera los datos almacenados al iniciar la aplicación.
crearTarjeta(): genera dinámicamente las tarjetas de los personajes.
dibujarLista(): actualiza la colección mostrada en pantalla.
validarFormulario(): verifica que los campos obligatorios sean correctos.
guardarFormulario(): agrega o actualiza personajes.
eliminarPersonaje(): elimina un personaje después de una confirmación.
Validaciones implementadas
Para evitar errores en los datos se agregaron algunas validaciones:

El nombre es obligatorio.
El rol es obligatorio.
No se permiten nombres duplicados.
Los espacios al inicio y al final son eliminados automáticamente.
Si una imagen no existe o no puede cargarse, se muestran las iniciales del personaje.
Si los datos de localStorage están dañados, la aplicación muestra un aviso y crea una colección vacía.
Decisiones tomadas durante el desarrollo
Se utilizó localStorage porque el proyecto debía funcionar completamente en el navegador sin depender de servidores o bases de datos.

Los personajes se identifican mediante un ID generado con Date.now(), lo que facilita operaciones como editar o eliminar registros de forma segura.

Para mostrar información escrita por el usuario se utilizó textContent en lugar de innerHTML, evitando que contenido HTML ingresado por el usuario se ejecute dentro de la página.

También se decidió utilizar una estructura SPA para mejorar la experiencia de navegación y evitar recargas innecesarias.

Autor
Aldo Torres

Proyecto desarrollado para la materia LAD319.
