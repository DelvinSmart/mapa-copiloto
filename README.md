# Copiloto Driver — Mapa de la app

El mapa de la app Copiloto Driver como página web: 837 archivos y 5.038
conexiones, en 7 zonas, con los cables que las unen.

**Verlo:** https://delvinsmart.github.io/mapa-copiloto/

- Toca una placa (o una zona) y se resaltan sus cables y sus números. Toca
  otra vez, o fuera, para volver a ver todo.
- **Ver más grande:** agranda el mapa para leerlo en el teléfono; se mueve
  con el dedo.
- **Descargar PNG / PDF:** el mapa como imagen o como documento.

## Qué hace cada archivo

| Archivo | Qué hace |
|---|---|
| `index.html` | Solo la estructura: la barra de botones y el lugar donde se dibuja el mapa. |
| `css/styles.css` | Los colores (como variables, todos arriba), las letras y el diseño. Para cambiar un color se cambia su variable. |
| `js/datos.js` | **Todo lo que dice el mapa:** las zonas, las placas, los textos, los números y la lista de cables (de dónde a dónde, color, grosor y número). Si cambia un número, se toca solo este archivo. |
| `js/mapa.js` | Dibuja el mapa a partir de `datos.js` y hace que, al tocar una placa, se resalten sus cables. No tiene textos ni números del mapa. |
| `descargas/` | El mapa en PNG y en PDF para descargar (sacados de la misma página). |
| `herramientas/medir.py` | Mide los números del mapa en el código de la app. |

## Cómo funciona

Todo el mapa es un solo dibujo SVG, con las mismas medidas de la imagen
original (1400 × 2790 puntos). El navegador lo escala entero al tamaño de cada
pantalla. Por eso los cables nunca se separan de sus placas: se agrandan y se
achican juntos.

Las letras son Barlow Condensed y Patrick Hand, de Google Fonts.

## De dónde salen los números

Se midieron en el código de la app el **12/11/2026** (commit `24680b9`) con
[`herramientas/medir.py`](herramientas/medir.py). Ese programa cuenta los
archivos, las conexiones (cada archivo que importa a otro) y los cables entre
grupos. Las listas de texto (pantallas, proveedores, funciones) y las notas de
abajo se revisaron a mano contra el código, las pruebas y `npm audit`.

Para actualizar el mapa:

```bash
python3 herramientas/medir.py /ruta/a/copiloto-driver
```

y se pasan los números nuevos a `js/datos.js`.

## Cambiar algo

- **Un número o un texto:** en `js/datos.js`, busca el texto y cámbialo.
- **Un color:** en `css/styles.css`, en las variables de arriba.
- **Un cable nuevo:** en `js/datos.js`, agrega uno a la lista `cables` con
  sus puntos, como los que ya están.

Para verlo en la computadora antes de subir:

```bash
python3 -m http.server 8000
```

y abre `http://localhost:8000`.
