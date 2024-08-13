## Proyecto Zara Web Challenge

# Introducción

Este proyecto es una aplicación web desarrollada con React, diseñada para explorar y gestionar información sobre personajes y cómics de Marvel. La aplicación permite a los usuarios buscar personajes, ver detalles específicos, y marcar sus favoritos.

Requisitos Previos
Antes de ejecutar la aplicación, asegúrate de tener instaladas las siguientes herramientas:

`Node.js (versión 20.15.0 o superior)`
`npm (versión 8.0.0 o superior)`

# Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu máquina local:

1- Clona el repositorio desde GitHub:

`git clone https://github.com/PabloMengibar/zara-marvel-web.git`

2- Accede al directorio del proyecto:

`cd zara-web-challenge`

3- Instala las dependencias necesarias:

`npm install`

# Ejecución

Para iniciar la aplicación en modo de desarrollo, usa el siguiente comando:

`npm run start`

Esto abrirá la aplicación en [http://localhost:3000](http://localhost:3000)

Para construir la aplicación para producción, ejecuta:

`npm run build`

La versión de producción de esta aplicación está construida y desplegada en Netlify, puedes visitar la aplicación en funcionamiento en la siguiente URL:

[https://zara-marvel.netlify.app/](https://zara-marvel.netlify.app/)

Para ejecutar los test de la aplicación puedes utilizar:

`npm run test`

# Arquitectura y Estructura del Proyecto

El proyecto sigue la estructura estándar de una aplicación creada con create-react-app. A continuación se describe la organización principal de carpetas y archivos dentro del directorio src:
```
├───assets
│   └───img
├───components
│   ├───CharacterCard
│   ├───CharacterInfo
│   ├───CharacterList
│   ├───ComicsList
│   ├───FavoriteButton
│   ├───FavoriteIcon
│   ├───Header
│   ├───Layout
│   ├───LoadingSpinner
│   ├───ResultsDisplay
│   └───SearchBar
├───context
│   └───FavoritesProvider
├───hooks
│   └───useCharacterDetails
│   └───useCharacters
├───pages
│   └───CharacterDetailPage
│   └───CharacterListPage
├───services
│   └───api
├───styles
│   └───main.css
```
# Dependencias

Las principales dependencias utilizadas en este proyecto son:

react: Biblioteca principal para la construcción de la interfaz de usuario.
react-dom: Proporciona métodos específicos para el DOM en las aplicaciones React.
react-router-dom: Utilizado para la navegación en la aplicación.
dotenv: Carga variables de entorno desde un archivo .env.
md5: Biblioteca para generar hashes MD5.
Las dependencias de desarrollo incluyen herramientas para pruebas unitarias:

jest: Marco de pruebas en JavaScript.
@testing-library/react: Utilidades para probar componentes de React.
jest-fetch-mock: Mocking de fetch para pruebas.

# Variables de Entorno

Debido a la naturaleza del proyecto, he dejado un archivo [.env.example] en la raíz del repositorio que incluye una clave API gratuita para aquellos que no tengan acceso a una clave propia o no dispongan de una.

Para utilizar estas variables, simplemente copia el archivo .env.example, renómbralo a .env, y las claves se cargarán automáticamente en tu entorno de desarrollo.

Nota: Ten en cuenta que, al ser una clave abierta y compartida, es posible que las peticiones a la API de Marvel estén limitadas o agotadas debido a un uso excesivo. Se recomienda generar y utilizar una clave API personal para evitar estas limitaciones.



# Advertencia
Importante: En las últimas semanas, varios usuarios han reportado en diferentes foros que la API de Marvel está funcionando de manera extremadamente lenta. Esto puede afectar significativamente los tiempos de carga y la experiencia de usuario en la aplicación.

Si experimentas tiempos de respuesta largos o fallos en las peticiones, ten en cuenta que esto podría estar relacionado con problemas de rendimiento en la API de Marvel y no con el código de la aplicación en sí.

Es recomendable monitorear los tiempos de respuesta y, si es necesario, implementar soluciones como caché o limitación de peticiones para mitigar estos problemas.
