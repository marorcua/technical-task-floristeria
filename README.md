<!-- @format -->

# Floristeria Dulces Pétalos

Queremos crear una aplicación que muestre el catálogo de la floristería Dulces Pétalos.

La aplicación tendrá dos vistas:
Listado de productos
Detalle de producto
El diseño es libre, aunque la estructura deberá ceñirse a los mockups presentados en el documento.
Se puede utilizar un boilerplate template para inicializar el proyecto.
Se utilizará React, con la posibilidad de instalar las librerías necesarias.
El proyecto se presentará en un repositorio abierto en GitHub.

Mockups
Listado de productos
En esta página se visualizarán todos los productos que devuelve la petición al API.
Permitirá hacer un filtrado de los productos según el criterio de búsqueda del usuario.
Al seleccionar un producto, permitirá navegar al detalle de este.
Se mostrarán un máximo de cuatro elementos por fila, adaptándose a la resolución del dispositivo.
Detalle de producto
En esta página se visualizarán los detalles de un producto.
Permitirá volver atrás en la navegación.

Componentes
Cabecera
Mostrará el nombre de la empresa y/o un icono, que será un enlace a la home.
Mostrará breadcrumbs con links para la navegación.
Buscador
Permitirá la introducción de una cadena de texto.
Se filtrarán los productos en función de la cadena de texto, comparando el nombre y el nombre científico de la planta.
El filtrado se hará en tiempo real, a medida que el usuario introduzca la cadena de texto.
Elemento del listado
Cada producto mostrará la siguiente información:

Imagen
Nombre
Nombre científico
Precio
Imagen del producto
Mostrará la imagen del producto.
Descripción del producto
Mostrará detalles del producto:
Nombre
Nombre científico
Precio
Riegos por semana
Fertilizante recomendado: Podrá ser "fosforado" o "nitrogenado".
Altura

Definición de API
El dominio al que hay que apuntar es:

📌 Base URL: https://dulces-petalos.jakala.es

Listado de productos:
GET /api/v1/product
Detalle de producto:
GET /api/v1/product/:id
