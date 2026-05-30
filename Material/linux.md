---
title: Linux
author: Nahuel Lescano
description: Conceptos base de Linux, terminal y comandos frecuentes.
---

# Linux

## Índice

- [¿Qué es un sistema operativo "UNIX-like"?](#qué-es-un-sistema-operativo-unix-like)
- [Árbol de directorios de Linux](#árbol-de-directorios-de-linux)
- [Rutas en el sistema de archivos](#rutas-en-el-sistema-de-archivos)
- [La línea de comandos y el shell](#la-línea-de-comandos-y-el-shell)
- [Shell prompt](#shell-prompt)
- [Uso básico de la terminal](#uso-básico-de-la-terminal)
- [Texto puro](#texto-puro)
- [Importancia del texto puro](#importancia-del-texto-puro)
- [Comandos más usados en Linux](#comandos-más-usados-en-linux)

## ¿Qué es un sistema operativo "UNIX-like"?

Un sistema operativo Unix-like es un tipo de software que funciona de manera parecida a Unix, un sistema operativo muy antiguo y famoso. Aunque estos sistemas no tienen que ser idénticos a Unix, siguen algunas de sus ideas y características principales.

**Características principales**

- **Estructura de archivos**: Organizan los archivos en una forma jerárquica, parecida a un árbol, comenzando desde un directorio raíz (`/`) y dividiéndose en carpetas y subcarpetas. El directorio raíz (root directory) contiene archivos y subdirectorios que contienen más archivos y subdirectorios y así sucesivamente. A diferencia de Windows, Linux tiene un único árbol con los archivos del sistema sin importar cuántos dispositivos de almacenamiento estén conectados a la computadora.
- **Interfaz de línea de comandos**: Permiten a los usuarios escribir comandos en lugar de solo hacer clic con el ratón. Esto puede ser muy útil para realizar tareas y controlar el sistema.
- **Multitarea y multiusuario**: Pueden manejar varias tareas al mismo tiempo y permitir que múltiples personas usen el sistema simultáneamente sin interferir entre sí.
- **Permisos y seguridad**: Controlan quién puede acceder a qué archivos y recursos del sistema, asegurando que solo las personas autorizadas puedan hacer ciertas cosas.
- **POSIX**: Muchos sistemas Unix-like siguen un estándar llamado POSIX, que significa Portable Operating System Interface (Interfaz de Sistema Operativo Portátil). Este estándar define reglas y especificaciones sobre cómo deben comportarse los sistemas operativos para garantizar la compatibilidad entre ellos. En otras palabras, POSIX asegura que los programas escritos para un sistema Unix-like puedan ejecutarse también en otros sistemas similares que cumplan con este estándar.

***Ejemplos de sistemas Unix-like*** incluyen Linux, macOS y BSD (que incluye varios sistemas derivados como FreeBSD).

### Árbol de directorios de Linux

![foto de arbol de directorios](./images/arbol_directorio.png)

### Rutas en el sistema de archivos

Para navegar en esta estructura, se utilizan dos tipos de rutas:

- **Rutas absolutas (Absolute Pathnames)**: Estas rutas comienzan desde el directorio raíz (`/`) y siguen la jerarquía del sistema de archivos hasta llegar al archivo o directorio deseado. Una ruta absoluta siempre inicia en el directorio raíz, proporcionando una ubicación completa en el sistema.
- **Rutas relativas (Relative Pathnames)**: Estas rutas comienzan desde el directorio de trabajo actual en lugar del directorio raíz. Utilizan símbolos especiales para representar posiciones relativas en el sistema de archivos. El símbolo `.` representa el directorio de trabajo actual, mientras que `..` representa el directorio padre o el directorio anterior.

## La línea de comandos y el shell

Cuando hablamos de la línea de comandos en un sistema operativo, nos referimos a una herramienta que te permite interactuar con el sistema mediante texto en lugar de gráficos. Esta herramienta es conocida como **shell**.

### ¿Qué es?

Es un programa que actúa como intermediario entre quien usa la línea de comandos y el sistema operativo. Su función principal es tomar los comandos que escribe el usuario y traducirlos en acciones que el sistema operativo puede ejecutar. En otras palabras, cuando escribís un comando en el shell y presionás Enter, el shell toma ese comando, lo envía al sistema operativo, y después te muestra el resultado en la pantalla.

### ¿Cómo funciona?

- Ingresamos un comando: Abrimos el shell e ingresamos un comando, como `ls` para listar archivos en una carpeta.
- El shell lo procesa: El shell toma ese comando y lo envía al sistema operativo.
- El sistema operativo ejecuta el comando: El sistema operativo realiza la acción solicitada, como mostrar los archivos.
- El shell muestra el resultado: El shell muestra el resultado en la pantalla, como la lista de archivos.

En la mayoría de las distribuciones de Linux, el shell que se utiliza por defecto es **bash** (Bourne Again Shell). Este nombre hace referencia a **sh** (Bourne Shell), un shell más antiguo.

### Emuladores de terminal

Cuando usamos una interfaz gráfica de usuario (GUI), solemos necesitar un **emulador de terminal** para interactuar con el sistema operativo a través del shell. El emulador de terminal es una aplicación que nos permite escribir comandos y ejecutar programas en modo texto, similar a cómo se haría en una consola de texto puro.

## Shell prompt

`[username@machinename~]$:`

Este es el prompt del shell. `username` es tu nombre de usuario, `machinename` es el nombre de tu computadora, y el símbolo `$` te dice que estás trabajando como usuario normal. Si en vez de `$` ves un `#`, significa que estás trabajando como root o superusuario, que tiene todos los permisos para hacer cambios importantes en el sistema.

## Uso básico de la terminal

- **Historial de comandos**: Si querés ver los comandos que usaste antes, podés usar la flecha hacia arriba en tu teclado. Esto te permite recorrer el historial de comandos que escribiste.
- **Mover el cursor**: Usá las flechas izquierda (←) y derecha (→) para mover el cursor dentro de la línea de texto. Así podés corregir o modificar lo que estás escribiendo.
- **Agregar opciones a un comando (flags)**: Las flags son opciones adicionales que podés agregar a un comando para modificar su comportamiento o salida. Se especifican usando un guión (`-`) o doble guión (`--`) seguido de una letra o palabra clave.
- **Copiar y pegar**:
  - **Copiar**: Para copiar texto, seleccionás lo que querés con un doble clic o simplemente pintando lo que querés copiar con el cursor.
  - **Pegar**: Para pegar lo copiaste, se puede utilizar el botón de la rueda del mouse (o el clic central, dependiendo del sistema) o `Ctrl+Shift+V`.

## Texto puro

Mencionamos en la explicación anterior un concepto muy interesante: texto puro. ¿Qué es?

Es un formato básico de datos que se compone únicamente de caracteres, sin ningún tipo de formato adicional. A diferencia de los archivos creados en procesadores de texto como Microsoft Word, que pueden incluir estilos, colores, fuentes y otros elementos de formato, el texto puro es simplemente una secuencia de caracteres representada por números.

### ¿Cómo funciona el texto puro?

- **Asignación directa**: En el texto puro, cada carácter se asigna directamente a un número a través de una codificación estándar (como ASCII o UTF-8). Por ejemplo, la letra "A" tiene un valor numérico específico en estas codificaciones.
- **Tamaño de archivo**: Si tenés 50 caracteres en un archivo de texto puro, esos 50 caracteres se traducen a 50 bytes de datos. Es decir, cada carácter ocupa exactamente un byte en el archivo, sin contar con ningún formato adicional.

## Importancia del texto puro

- **Archivos de configuración**: Muchos archivos que configuran el sistema y las aplicaciones están en formato de texto puro. Estos archivos, como `config.txt` o `/etc/fstab`, contienen ajustes esenciales que el sistema necesita para funcionar correctamente.
- **Scripts y programas**: Muchos scripts y programas en Linux y otros sistemas operativos están escritos en texto puro. Esto incluye scripts de shell, scripts de Python, y otros programas que se ejecutan en el sistema. El texto puro permite que estos scripts sean fácilmente leídos y editados.
- **Facilidad de lectura**: Al ser un formato simple, el texto puro es fácil de leer y editar usando cualquier editor de texto básico. Esto lo hace ideal para ver y modificar configuraciones y scripts sin necesidad de herramientas especializadas.

## Comandos más usados en Linux

Para facilitar el manejo del sistema y mejorar la eficiencia en la administración, es esencial familiarizarse con los comandos básicos que se utilizan en la terminal. En la siguiente lista vas a encontrar comandos básicos junto con sus usos y opciones adicionales (flags) que amplían su funcionalidad.

### `ls`

- **Uso**: Lista el contenido de un directorio.
- **Flags útiles**:
  - `-l`: Muestra detalles extensos como permisos, tamaño y fecha de los archivos.
  - `-a`: Muestra los archivos ocultos (los que empiezan con un punto `.`).
  - `-h`: Muestra tamaños en un formato legible (ej. KB, MB).

### `alias`

- **Uso**: Define o muestra alias para comandos, que son atajos para comandos más largos.
- **Ejemplo**: `alias ll='ls -l'` define `ll` como un alias para `ls -l`.

### `unalias`

- **Uso**: Elimina los alias que hayas definido.
- **Ejemplo**: `unalias ll` elimina el alias `ll`.

### `pwd`

- **Uso**: Muestra el directorio de trabajo actual (Print Working Directory).

### `cd`

- **Uso**: Cambia al directorio especificado (Change Directory).
- **Ejemplo**: `cd /home/usuario/` te lleva al directorio `/home/usuario/`.

### `cp`

- **Uso**: Copia archivos y directorios.
- **Flags útiles**:
  - `-r`: Copia directorios de forma recursiva.
  - `-i`: Te pregunta antes de sobrescribir archivos.

### `rm`

- **Uso**: Borra archivos y directorios.
- **Flags útiles**:
  - `-r`: Borra directorios y su contenido de forma recursiva.
  - `-f`: Fuerza la eliminación sin pedir confirmación.

### `mv`

- **Uso**: Mueve o renombra archivos y directorios.
- **Flags útiles**:
  - `-i`: Pregunta antes de sobrescribir archivos.

### `mkdir`

- **Uso**: Crea nuevos directorios (carpetas).
- **Flags útiles**:
  - `-p`: Crea directorios padres si es necesario.

### `man`

- **Uso**: Muestra la página del manual para otros comandos.
- **Ejemplo**: `man ls` te da la documentación para el comando `ls`.

### `touch`

- **Uso**: Crea archivos vacíos o actualiza la fecha de modificación de archivos existentes.

### `chmod`

- **Uso**: Cambia los permisos de archivos y directorios.
- **Ejemplo**: `chmod 755 archivo` establece permisos de lectura, escritura y ejecución para el propietario, y solo lectura y ejecución para otros.

### `./archivo`

- **Uso**: Ejecuta un archivo ejecutable en el directorio actual.
- **Ejemplo**: `./script.sh` corre el script `script.sh`.

### `exit`

- **Uso**: Sale de la sesión actual del shell.

### `sudo`

- **Uso**: Ejecuta comandos con permisos de superusuario o administrador.
- **Ejemplo**: `sudo apt update` actualiza los paquetes del sistema con permisos elevados.

### `shutdown`

- **Uso**: Apaga o reinicia la computadora.
- **Flags útiles**:
  - `-h`: Apaga la computadora.
  - `-r`: Reinicia la computadora.

### `htop`

- **Uso**: Muestra información interactiva sobre los procesos y los recursos del sistema.

### `unzip`

- **Uso**: Extrae archivos de un archivo ZIP comprimido.
- **Flags útiles**:
  - `-d`: Especifica el directorio donde se extraerán los archivos.

### `apt`, `yum`, `pacman`

- **Uso**: Gestores de paquetes para instalar, actualizar y eliminar software.
- **Ejemplos**:
  - `apt-get install paquete`: En sistemas basados en Debian.
  - `yum install paquete`: En sistemas basados en Red Hat.
  - `pacman -S paquete`: En Arch Linux.

### `echo`

- **Uso**: Muestra texto o variables en la terminal.
- **Ejemplo**: `echo "Hola Mundo"` imprime "Hola Mundo" en la terminal.

### `cat`

- **Uso**: Muestra el contenido de un archivo.
- **Flags útiles**:
  - `-n`: Numera las líneas de la salida.

### `bat`

- **Uso**: Alternativa moderna de `cat` con resaltado y paginación.
- **Flags útiles**:
  - `-A`: Resalta tabuladores, espacios y saltos de línea.

### `ps`

- **Uso**: Muestra información sobre los procesos en ejecución.
- **Flags útiles**:
  - `-e`: Muestra todos los procesos.
  - `-f`: Muestra información detallada sobre los procesos.

### `kill`

- **Uso**: Termina procesos.
- **Flags útiles**:
  - `-9`: Fuerza la terminación inmediata del proceso.

### `ping`

- **Uso**: Verifica la conectividad de red con otro host.
- **Flags útiles**:
  - `-c`: Especifica el número de paquetes a enviar.

### `vim`

- **Uso**: Editor de texto avanzado y eficiente para editar archivos.

### `history`

- **Uso**: Muestra una lista de los comandos que has usado recientemente.

### `passwd`

- **Uso**: Cambia la contraseña del usuario actual.

### `which`

- **Uso**: Muestra la ruta completa del ejecutable de un programa.
- **Ejemplo**: `which python` muestra la ubicación del ejecutable de Python.

### `shred`

- **Uso**: Sobrescribe un archivo para ocultar su contenido y hacerlo más difícil de recuperar.
- **Flags útiles**:
  - `-u`: Elimina el archivo después de sobreescribirlo.

### `less`

- **Uso**: Permite inspeccionar archivos de manera interactiva, desplazándote hacia adelante y hacia atrás.

### `tail`

- **Uso**: Muestra las últimas líneas de un archivo.
- **Flags útiles**:
  - `-f`: Muestra en tiempo real las nuevas líneas añadidas al archivo.

### `head`

- **Uso**: Muestra las primeras líneas de un archivo.
- **Flags útiles**:
  - `-n`: Especifica el número de líneas a mostrar.

### `grep`

- **Uso**: Busca y muestra líneas que coinciden con un patrón de texto.
- **Flags útiles**:
  - `-i`: Ignora mayúsculas y minúsculas durante la búsqueda.
  - `-r`: Realiza la búsqueda de manera recursiva en directorios.

### `whoami`

- **Uso**: Muestra el nombre del usuario actual.

### `whatis`

- **Uso**: Proporciona una breve descripción del comando.
- **Ejemplo**: `whatis ls` muestra una breve descripción del comando `ls`.

### `wc`

- **Uso**: Cuenta palabras, líneas y caracteres en archivos.
- **Flags útiles**:
  - `-l`: Cuenta solo las líneas.
  - `-w`: Cuenta solo las palabras.

### `uname`

- **Uso**: Muestra información sobre el sistema operativo.
- **Flags útiles**:
  - `-a`: Muestra toda la información disponible sobre el sistema.

### `neofetch`

- **Uso**: Muestra una vista estilizada de la información del sistema operativo y del hardware.

### `find`

- **Uso**: Busca archivos y directorios que coincidan con un patrón.
- **Flags útiles**:
  - `-name`: Busca por nombre de archivo.
  - `-type`: Busca por tipo de archivo (por ejemplo, `f` para archivos regulares).

### `wget`

- **Uso**: Descarga archivos desde Internet.
- **Flags útiles**:
  - `-O`: Especifica el nombre del archivo de salida.
  - `-r`: Descarga de forma recursiva desde un directorio web.
