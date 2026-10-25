// ------------
// Variables globales
// ------------
const CLAVE_STORAGE = "personajesFavoritos";
let personajes = [];
let idEditando = null;
let idDetalle = null;
let temporizadorMensaje = null;

const personajesEjemplo = [
  { id: 1, nombre: "Batman", rol: "Vigilante", origen: "DC Comics", imagen: "imgs/Batman.jpeg", descripcion: "Bruce Wayne protege Ciudad Gótica con su inteligencia, su entrenamiento y su tecnología.", fechaCreacion: "2026-10-01T10:00:00.000Z" },
  { id: 2, nombre: "Superman", rol: "Héroe", origen: "DC Comics", imagen: "imgs/Superman.jpeg", descripcion: "Clark Kent, el último hijo de Krypton, protege la Tierra con sus superpoderes.", fechaCreacion: "2026-10-01T10:05:00.000Z" },
  { id: 3, nombre: "Flash", rol: "Velocista", origen: "DC Comics", imagen: "imgs/Flash.jpeg", descripcion: "Héroe que corre a velocidades casi imposibles gracias a la Fuerza de la Velocidad.", fechaCreacion: "2026-10-01T10:10:00.000Z" },
  { id: 4, nombre: "Green Lantern", rol: "Guardián", origen: "DC Comics", imagen: "imgs/GreenLantern.jpeg", descripcion: "Miembro del Cuerpo de Linternas Verdes que usa un anillo de poder impulsado por la voluntad.", fechaCreacion: "2026-10-01T10:15:00.000Z" },
  { id: 5, nombre: "Wonder Woman", rol: "Guerrera", origen: "DC Comics", imagen: "imgs/WonderWoman.jpeg", descripcion: "Diana, princesa amazona de Temiscira, lucha por la justicia con su Lazo de la Verdad.", fechaCreacion: "2026-10-01T10:20:00.000Z" },
  { id: 6, nombre: "Shazam", rol: "Héroe", origen: "DC Comics", imagen: "imgs/Shazam.jpeg", descripcion: "Un joven que se transforma en un poderoso héroe al pronunciar una palabra mágica.", fechaCreacion: "2026-10-01T10:25:00.000Z" }
];

// ------------
// Elementos del HTML
// ------------
const vistaLista = document.getElementById("vistaLista");
const vistaDetalle = document.getElementById("vistaDetalle");
const vistaFormulario = document.getElementById("vistaFormulario");
const cuadricula = document.getElementById("cuadricula");
const buscador = document.getElementById("buscador");
const contador = document.getElementById("contador");
const estadoVacio = document.getElementById("estadoVacio");
const estadoSinResultados = document.getElementById("estadoSinResultados");
const mensaje = document.getElementById("mensaje");
const formulario = document.getElementById("formulario");
const campoNombre = document.getElementById("campoNombre");
const campoRol = document.getElementById("campoRol");
const campoOrigen = document.getElementById("campoOrigen");
const campoImagen = document.getElementById("campoImagen");
const campoDescripcion = document.getElementById("campoDescripcion");
const errorNombre = document.getElementById("errorNombre");
const errorRol = document.getElementById("errorRol");

// ------------
// Funciones de apoyo
// ------------
function quitarAcentos(texto) {
  let resultado = texto.toLowerCase();
  resultado = resultado.replaceAll("á", "a");
  resultado = resultado.replaceAll("é", "e");
  resultado = resultado.replaceAll("í", "i");
  resultado = resultado.replaceAll("ó", "o");
  resultado = resultado.replaceAll("ú", "u");
  resultado = resultado.replaceAll("ü", "u");
  return resultado;
}

function obtenerIniciales(nombre) {
  const palabras = nombre.split(" ").filter((palabra) => palabra !== "");
  let iniciales = "";
  for (let i = 0; i < palabras.length && i < 2; i++) {
    iniciales += palabras[i][0].toUpperCase();
  }
  return iniciales;
}

function darFormatoFecha(textoFecha) {
  const fecha = new Date(textoFecha);
  return fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
}

function mostrarMensaje(texto, tipo) {
  clearTimeout(temporizadorMensaje);
  mensaje.textContent = texto;
  mensaje.className = "notification is-" + tipo;
  temporizadorMensaje = setTimeout(() => {
    mensaje.className = "notification is-hidden";
  }, 5000);
}

function mostrarVista(nombreVista) {
  vistaLista.classList.add("is-hidden");
  vistaDetalle.classList.add("is-hidden");
  vistaFormulario.classList.add("is-hidden");

  if (nombreVista === "lista") {
    vistaLista.classList.remove("is-hidden");
  } else if (nombreVista === "detalle") {
    vistaDetalle.classList.remove("is-hidden");
  } else {
    vistaFormulario.classList.remove("is-hidden");
  }
  window.scrollTo(0, 0);
}

function buscarPersonaje(id) {
  for (let i = 0; i < personajes.length; i++) {
    if (personajes[i].id === id) {
      return personajes[i];
    }
  }
  return null;
}

// ------------
// localStorage
// ------------
function esPersonajeValido(personaje) {
  return personaje.nombre !== undefined && personaje.rol !== undefined;
}

function guardarPersonajes() {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(personajes));
  } catch (error) {
    mostrarMensaje("No se pudo guardar en el navegador.", "danger");
  }
}

function cargarPersonajes() {
  const textoGuardado = localStorage.getItem(CLAVE_STORAGE);

  if (textoGuardado === null) {
    personajes = personajesEjemplo.slice();
    guardarPersonajes();
    return;
  }

  try {
    const datos = JSON.parse(textoGuardado);
    personajes = datos.filter(esPersonajeValido);
  } catch (error) {
    personajes = [];
    mostrarMensaje("Los datos guardados estaban dañados. Se inició una colección vacía.", "danger");
  }
}

// ------------
// Imágenes
// ------------
function crearIniciales(personaje, claseExtra) {
  const caja = document.createElement("div");
  caja.className = "iniciales " + claseExtra;
  caja.textContent = obtenerIniciales(personaje.nombre);
  return caja;
}

function crearImagen(personaje, claseExtra) {
  const contenedor = document.createElement("div");

  if (personaje.imagen) {
    const img = document.createElement("img");
    img.src = personaje.imagen;
    img.alt = "Imagen de " + personaje.nombre;
    img.className = "imagen-personaje " + claseExtra;
    img.addEventListener("error", () => {
      contenedor.textContent = "";
      contenedor.appendChild(crearIniciales(personaje, claseExtra));
    });
    contenedor.appendChild(img);
  } else {
    contenedor.appendChild(crearIniciales(personaje, claseExtra));
  }
  return contenedor;
}

// ------------
// Lista, búsqueda y detalle
// ------------
function crearTarjeta(personaje) {
  const columna = document.createElement("div");
  columna.className = "column is-4-desktop is-6-tablet";

  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";
  tarjeta.appendChild(crearImagen(personaje, ""));

  const texto = document.createElement("div");
  texto.className = "tarjeta-texto";

  const titulo = document.createElement("h3");
  titulo.className = "title is-5 mb-2";
  titulo.textContent = personaje.nombre;

  const rol = document.createElement("span");
  rol.className = "tag is-warning mb-2";
  rol.textContent = personaje.rol;

  const origen = document.createElement("p");
  origen.className = "texto-claro";
  origen.textContent = personaje.origen || "Origen no indicado";

  texto.appendChild(titulo);
  texto.appendChild(rol);
  texto.appendChild(origen);

  const botones = document.createElement("div");
  botones.className = "buttons p-3 pt-0";

  const botonVer = document.createElement("button");
  botonVer.className = "button is-small is-warning";
  botonVer.textContent = "Ver";
  botonVer.addEventListener("click", () => verDetalle(personaje.id));

  const botonEditar = document.createElement("button");
  botonEditar.className = "button is-small is-light";
  botonEditar.textContent = "Editar";
  botonEditar.addEventListener("click", () => abrirFormulario(personaje.id));

  const botonEliminar = document.createElement("button");
  botonEliminar.className = "button is-small is-danger";
  botonEliminar.textContent = "Eliminar";
  botonEliminar.addEventListener("click", () => eliminarPersonaje(personaje.id));

  botones.appendChild(botonVer);
  botones.appendChild(botonEditar);
  botones.appendChild(botonEliminar);

  tarjeta.appendChild(texto);
  tarjeta.appendChild(botones);
  columna.appendChild(tarjeta);
  return columna;
}

function ordenarPorNombre(personajeA, personajeB) {
  const nombreA = quitarAcentos(personajeA.nombre);
  const nombreB = quitarAcentos(personajeB.nombre);

  if (nombreA > nombreB) {
    return 1;
  } else if (nombreA < nombreB) {
    return -1;
  } else {
    return 0;
  }
}

function dibujarLista() {
  const textoBusqueda = quitarAcentos(buscador.value.trim());
  const resultados = [];

  for (let i = 0; i < personajes.length; i++) {
    const nombre = quitarAcentos(personajes[i].nombre);
    const rol = quitarAcentos(personajes[i].rol);
    if (nombre.includes(textoBusqueda) || rol.includes(textoBusqueda)) {
      resultados.push(personajes[i]);
    }
  }

  resultados.sort(ordenarPorNombre);

  cuadricula.textContent = "";
  for (let i = 0; i < resultados.length; i++) {
    cuadricula.appendChild(crearTarjeta(resultados[i]));
  }

  if (personajes.length === 0) {
    estadoVacio.classList.remove("is-hidden");
    estadoSinResultados.classList.add("is-hidden");
    contador.textContent = "";
  } else if (resultados.length === 0) {
    estadoVacio.classList.add("is-hidden");
    estadoSinResultados.classList.remove("is-hidden");
    contador.textContent = "0 coincidencias";
  } else {
    estadoVacio.classList.add("is-hidden");
    estadoSinResultados.classList.add("is-hidden");
    if (textoBusqueda === "") {
      contador.textContent = personajes.length + " personajes en la colección";
    } else {
      contador.textContent = resultados.length + " coincidencias de " + personajes.length;
    }
  }
}

function verDetalle(id) {
  const personaje = buscarPersonaje(id);
  if (personaje === null) {
    return;
  }
  idDetalle = id;

  document.getElementById("detalleNombre").textContent = personaje.nombre;
  document.getElementById("detalleRol").textContent = personaje.rol;
  document.getElementById("detalleOrigen").textContent = personaje.origen || "No indicado";
  document.getElementById("detalleDescripcion").textContent = personaje.descripcion || "Sin descripción.";
  document.getElementById("detalleFecha").textContent = darFormatoFecha(personaje.fechaCreacion);

  const contenedorImagen = document.getElementById("detalleImagen");
  contenedorImagen.textContent = "";
  contenedorImagen.appendChild(crearImagen(personaje, "grande"));

  mostrarVista("detalle");
}

// ------------
// Formulario: agregar y editar
// ------------
function abrirFormulario(id) {
  errorNombre.textContent = "";
  errorRol.textContent = "";

  if (id === null) {
    idEditando = null;
    document.getElementById("tituloFormulario").textContent = "Agregar personaje";
    formulario.reset();
  } else {
    const personaje = buscarPersonaje(id);
    idEditando = id;
    document.getElementById("tituloFormulario").textContent = "Editar personaje";
    campoNombre.value = personaje.nombre;
    campoRol.value = personaje.rol;
    campoOrigen.value = personaje.origen || "";
    campoImagen.value = personaje.imagen || "";
    campoDescripcion.value = personaje.descripcion || "";
  }
  mostrarVista("formulario");
}

function nombreDuplicado(nombre) {
  for (let i = 0; i < personajes.length; i++) {
    const mismoNombre = quitarAcentos(personajes[i].nombre) === quitarAcentos(nombre);
    if (mismoNombre && personajes[i].id !== idEditando) {
      return true;
    }
  }
  return false;
}

function validarFormulario(nombre, rol) {
  let esValido = true;
  errorNombre.textContent = "";
  errorRol.textContent = "";

  if (nombre === "") {
    errorNombre.textContent = "El nombre es obligatorio.";
    esValido = false;
  } else if (nombreDuplicado(nombre)) {
    errorNombre.textContent = "Ya existe un personaje con ese nombre.";
    esValido = false;
  }

  if (rol === "") {
    errorRol.textContent = "El rol es obligatorio.";
    esValido = false;
  }
  return esValido;
}

function guardarFormulario(evento) {
  evento.preventDefault();

  const nombre = campoNombre.value.trim();
  const rol = campoRol.value.trim();

  if (!validarFormulario(nombre, rol)) {
    return;
  }

  if (idEditando === null) {
    const nuevoPersonaje = {
      id: Date.now(),
      nombre: nombre,
      rol: rol,
      origen: campoOrigen.value.trim(),
      imagen: campoImagen.value.trim(),
      descripcion: campoDescripcion.value.trim(),
      fechaCreacion: new Date().toISOString()
    };
    personajes.push(nuevoPersonaje);
    mostrarMensaje("Personaje agregado.", "success");
  } else {
    const personaje = buscarPersonaje(idEditando);
    personaje.nombre = nombre;
    personaje.rol = rol;
    personaje.origen = campoOrigen.value.trim();
    personaje.imagen = campoImagen.value.trim();
    personaje.descripcion = campoDescripcion.value.trim();
    mostrarMensaje("Personaje actualizado.", "success");
  }

  guardarPersonajes();
  dibujarLista();
  mostrarVista("lista");
}

// ------------
// Eliminar con confirmación
// ------------
function eliminarPersonaje(id) {
  const personaje = buscarPersonaje(id);
  const confirmado = confirm("¿Seguro que quieres eliminar a " + personaje.nombre + "? Esta acción no se puede deshacer.");

  if (confirmado) {
    personajes = personajes.filter((p) => p.id !== id);
    guardarPersonajes();
    dibujarLista();
    mostrarVista("lista");
    mostrarMensaje("Personaje eliminado.", "success");
  }
}

// ------------
// Inicio de la aplicación
// ------------
document.addEventListener("DOMContentLoaded", () => {
  cargarPersonajes();
  dibujarLista();

  buscador.addEventListener("input", dibujarLista);

  formulario.addEventListener("submit", guardarFormulario);
  document.getElementById("botonCancelar").addEventListener("click", () => mostrarVista("lista"));

  document.getElementById("botonVolver").addEventListener("click", () => mostrarVista("lista"));
  document.getElementById("botonEditarDetalle").addEventListener("click", () => abrirFormulario(idDetalle));
  document.getElementById("botonEliminarDetalle").addEventListener("click", () => eliminarPersonaje(idDetalle));

  document.getElementById("menuInicio").addEventListener("click", () => mostrarVista("lista"));
  document.getElementById("menuColeccion").addEventListener("click", () => mostrarVista("lista"));
  document.getElementById("menuAgregar").addEventListener("click", () => abrirFormulario(null));
  document.getElementById("botonAgregarVacio").addEventListener("click", () => abrirFormulario(null));

  const burger = document.getElementById("botonBurger");
  const menu = document.getElementById("menuNavbar");
  burger.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
    burger.setAttribute("aria-expanded", burger.classList.contains("is-active"));
  });
});
