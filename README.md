# Tienda Fidel Morales

Página web estática para vender los libros del escritor **Fidel Morales D.**
(Editorial La Inspiración).

## Abrir la tienda

Doble clic en `index.html` o abre la carpeta en tu navegador. No necesita
servidor para funcionar.

## Configurar (lo primero que debes hacer)

### 1. Número de WhatsApp
Abre **`js/libros.js`** y cambia el valor de `WHATSAPP_FIDEL` por el número
real de Fidel Morales, sin espacios ni símbolos. Ejemplo:

```js
const WHATSAPP_FIDEL = "50761234567"; // +507 6123-4567
```

Boletos: mientras el número quede como "50700000000", los botones mostrarán
"Configurar WhatsApp" en lugar de enviar el pedido.

### 2. Portada del libro
Coloca la imagen de la portada en la carpeta `img/` con el nombre que aparece
en `portada` del libro en `js/libros.js` (por defecto `negociador-emprendedor.jpg`).
Mientras no exista, se muestra una portada genérica con el título.

### 3. Precios
En `js/libros.js`, cada libro tiene `precioFisico` y `precioDigital`:
- `null` → muestra "Precio por confirmar" (el cliente pregunta el precio por WhatsApp).
- Un número (ej. `12.50`) → muestra `$12.50` y calcula el total en el mensaje.

## Agregar otro libro

En `js/libros.js`, dentro del arreglo `LIBROS`, copia el bloque de un libro
existente (desde `{` hasta `}`) y pégalo después del último `}` con una coma.
Cambia `titulo`, `isbn`, `portada` (nombre del archivo en `img/`), `precio*` y
`capitulos`. Los campos válidos de `formato` son `"fisico"` y `"digital"`.

## Estructura

```
TiendaFidelMorales/
├── index.html       página principal
├── css/style.css    estilos
├── js/libros.js     CONFIG: WhatsApp, tienda y catálogo de libros
├── js/app.js        lógica (render y pedidos por WhatsApp)
└── img/             portadas de los libros (.jpg)
```