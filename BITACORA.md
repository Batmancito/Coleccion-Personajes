Bitácora del proyecto


1. ¿Por qué usar un id único en lugar de identificar al personaje por su nombre? ¿Qué pasaría si dos personajes se llaman igual?
Se usa un id único para identificar correctamente cada personaje al editarlo o eliminarlo. Si dos personajes tuvieran el mismo nombre, el sistema podría confundirlos; por eso además se valida que no existan nombres duplicados.

2. ¿Conviene guardar todo el arreglo en una sola clave de localStorage o un personaje por clave? 
Compara ventajas y desventajas. Guardar todo el arreglo en una sola clave simplifica la lectura y escritura de datos. Guardar un personaje por clave facilita modificaciones individuales, pero hace más compleja la administración de los registros.

3. ¿La búsqueda debe ejecutarse en cada tecla o al presionar Enter? ¿Cómo cambia la experiencia con 10 vs. 1,000 personajes?
En este proyecto se ejecuta en cada tecla usando el evento input, ofreciendo resultados inmediatos. Con 10 personajes funciona sin problema; con 1,000 podría requerir optimizaciones para mantener un buen rendimiento.

4. ¿Qué ocurre si alguien modifica manualmente localStorage desde la consola y deja un JSON inválido?
La aplicación no se rompe porque JSON.parse() está dentro de un try/catch. Si el JSON es inválido, se crea una colección vacía y se muestra un mensaje al usuario.

5. ¿Qué pasa si la URL de la imagen no existe? Propón un comportamiento de respaldo.
Si la imagen no carga, el evento error sustituye la imagen por las iniciales del personaje. Esto evita espacios vacíos y mantiene la interfaz funcional.