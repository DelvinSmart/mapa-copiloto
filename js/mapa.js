/*
 * mapa.js — dibuja el mapa a partir de datos.js.
 *
 * Todo se dibuja en un solo SVG con las medidas del lienzo (1400 × 2790).
 * El SVG se escala entero al tamaño de la pantalla, así que los cables nunca
 * se separan de sus placas. Aquí no hay textos ni números del mapa: están
 * todos en datos.js.
 */
(function () {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const capas = {};

  /* ---------- piezas básicas ---------- */

  function crear(tipo, atributos, padre) {
    const el = document.createElementNS(SVG_NS, tipo);
    for (const [clave, valor] of Object.entries(atributos || {})) el.setAttribute(clave, valor);
    if (padre) padre.appendChild(el);
    return el;
  }

  function caja([x, y, ancho, alto], clase, radio, padre) {
    return crear('rect', { x, y, width: ancho, height: alto, rx: radio, class: clase }, padre);
  }

  function texto(x, y, contenido, tam, clase, padre, centrado) {
    const el = crear('text', { x, y, 'font-size': tam, class: clase }, padre);
    if (centrado) el.setAttribute('text-anchor', 'middle');
    el.textContent = contenido;
    return el;
  }

  /** Los 4 tornillos de las esquinas de una placa. */
  function tornillos([x, y, ancho, alto], padre) {
    const puntos = [[x + 12, y + 12], [x + ancho - 12, y + 12], [x + 12, y + alto - 12], [x + ancho - 12, y + alto - 12]];
    for (const [cx, cy] of puntos) crear('circle', { cx, cy, r: 4.5, class: 'tornillo' }, padre);
  }

  /** Una pieza que se puede tocar para resaltar sus cables. */
  function grupoTocable(id, nombre, padre) {
    return crear('g', { class: 'tocable', 'data-id': id, tabindex: 0, role: 'button', 'aria-label': `Ver las conexiones de ${nombre}` }, padre);
  }

  /* ---------- partes del mapa ---------- */

  function dibujarTitulo(t, padre) {
    caja(t.caja, 'titulo-fondo', 10, padre);
    tornillos(t.caja, padre);
    const centro = t.caja[0] + t.caja[2] / 2;
    texto(centro, t.caja[1] + 48, t.texto, 44, 'titulo-texto', padre, true);
    texto(centro, t.caja[1] + 86, t.subtitulo, 28, 'titulo-sub', padre, true);
  }

  function dibujarPlaca(p, padre) {
    const g = grupoTocable(p.id, p.titulo, padre);
    caja(p.caja, 'placa contorno', 8, g);
    tornillos(p.caja, g);
    const [x, y] = p.caja;
    const tam = p.tam || 22;
    let yy = y + 36;
    texto(x + 22, yy, p.titulo, p.tamTitulo || 25, 'placa-titulo', g);
    yy += 31;
    for (const linea of p.lineas) {
      texto(x + 22, yy, linea, tam, 'placa-texto', g);
      yy += tam + 7;
    }
  }

  function dibujarRegleta(r, padre) {
    r.filas.forEach((fila, f) => {
      const y = r.y + f * r.altoFila;
      crear('path', { d: `M${r.lineaDesde} ${y + 24} H${r.lineaHasta}`, class: 'regleta-linea' }, padre);
      fila.forEach((nombre, c) => {
        const x = r.x + c * r.paso;
        caja([x, y, r.placa[0], r.placa[1]], 'placa', 6, padre);
        texto(x + r.placa[0] / 2, y + 31, nombre, r.tam, 'regleta-texto', padre, true);
      });
    });
  }

  function dibujarZona(z, padre) {
    // Las zonas con placas propias no se tocan enteras: se tocan sus placas.
    const g = z.placas ? crear('g', { 'data-zona': z.id }, padre) : grupoTocable(z.id, z.titulo, padre);
    const [x, y] = z.caja;
    caja(z.caja, 'zona contorno', 14, g);
    tornillos(z.caja, g);
    caja([x + 20, y + 18, z.anchoTitulo, 48], 'zona-banda', 8, g);
    texto(x + 36, y + 52, z.titulo, 29, 'zona-titulo', g);

    for (const [lx, ly, contenido, tam] of z.lineas || []) texto(lx, ly, contenido, tam, 'zona-texto', g);

    if (z.candado) {
      caja(z.candado.caja, 'candado', 8, g);
      const [cx, cy, cw] = z.candado.caja;
      texto(cx + cw / 2, cy + 26, z.candado.texto, 22, 'candado-texto', g, true);
    }

    if (z.regleta) dibujarRegleta(z.regleta, g);

    if (z.puentes) {
      caja(z.puentes.caja, 'placa', 8, g);
      for (const [lx, ly, contenido] of z.puentes.lineas) texto(lx, ly, contenido, z.puentes.tam, 'puentes-texto', g);
    }

    for (const p of z.placas || []) dibujarPlaca(p, g);
  }

  /** La punta de flecha al final del cable, apuntando hacia la placa. */
  function flecha(puntos, grosor) {
    const [ex, ey] = puntos[puntos.length - 1];
    const [px, py] = puntos[puntos.length - 2];
    const s = Math.max(10, grosor / 2 + 7);
    if (px === ex) {
      const dy = ey > py ? 1 : -1;
      return `${ex - s} ${ey - dy * s * 1.3} ${ex + s} ${ey - dy * s * 1.3} ${ex} ${ey}`;
    }
    const dx = ex > px ? 1 : -1;
    return `${ex - dx * s * 1.3} ${ey - s} ${ex - dx * s * 1.3} ${ey + s} ${ex} ${ey}`;
  }

  function dibujarCable(c, padre) {
    const d = 'M' + c.puntos.map(([x, y]) => `${x} ${y}`).join(' L');
    const g = crear('g', { class: `cable cable--${c.color}`, 'data-desde': c.desde, 'data-hasta': c.hasta }, padre);
    crear('path', { d, class: 'cable-borde', 'stroke-width': c.grosor + 6 }, g);
    crear('path', { d, class: 'cable-linea', 'stroke-width': c.grosor }, g);
    const [sx, sy] = c.puntos[0];
    crear('circle', { cx: sx, cy: sy, r: Math.max(8, c.grosor / 2 + 3), class: 'cable-puerto' }, g);
    crear('polygon', { points: flecha(c.puntos, c.grosor), class: 'cable-flecha' }, g);
  }

  function dibujarEtiqueta(c, padre) {
    if (!c.numero) return;
    const [x, y] = c.etiqueta;
    const ancho = Math.max(52, c.numero.length * 15 + 22);
    const g = crear('g', { class: `etiqueta${c.especial ? ' etiqueta--especial' : ''}`, 'data-desde': c.desde, 'data-hasta': c.hasta }, padre);
    caja([x - ancho / 2, y - 17, ancho, 34], 'etiqueta-fondo', 7, g);
    texto(x, y + 9, c.numero, 25, 'etiqueta-texto', g, true);
  }

  function dibujarNotas(notas, ci, padre) {
    for (const n of notas) {
      const [x, y] = n.caja;
      caja(n.caja, `nota nota--${n.tono}`, 6, padre);
      texto(x + 24, y + 40, n.titulo, 27, `nota-titulo nota-titulo--${n.tono}`, padre);
      n.items.forEach((item, i) => texto(x + 24, y + 76 + i * 29, n.marca + item, 24, `nota-texto nota-titulo--${n.tono}`, padre));
    }
    caja(ci.caja, 'ci', 10, padre);
    texto(ci.caja[0] + ci.caja[2] / 2, ci.caja[1] + 46, ci.texto, 34, 'ci-texto', padre, true);
  }

  /* ---------- tocar una placa: resaltar sus cables ---------- */

  /** Qué ids incluye lo tocado (una zona con placas incluye sus placas). */
  function idsDe(id) {
    const zona = MAPA.zonas.find((z) => z.id === id);
    return new Set([id, ...(zona && zona.placas ? zona.placas.map((p) => p.id) : [])]);
  }

  function seleccionar(id, svg) {
    const actual = svg.dataset.seleccion;
    svg.querySelectorAll('.activa').forEach((el) => el.classList.remove('activa'));
    if (!id || id === actual) {
      delete svg.dataset.seleccion;
      svg.classList.remove('hay-seleccion');
      return;
    }
    const ids = idsDe(id);
    const unidas = new Set(ids);
    svg.querySelectorAll('.cable, .etiqueta').forEach((el) => {
      if (ids.has(el.dataset.desde) || ids.has(el.dataset.hasta)) {
        el.classList.add('activa');
        unidas.add(el.dataset.desde);
        unidas.add(el.dataset.hasta);
      }
    });
    svg.querySelectorAll('.tocable').forEach((el) => {
      if (unidas.has(el.dataset.id)) el.classList.add('activa');
    });
    svg.dataset.seleccion = id;
    svg.classList.add('hay-seleccion');
  }

  function activarToques(svg) {
    svg.addEventListener('click', (evento) => {
      const pieza = evento.target.closest('.tocable');
      seleccionar(pieza ? pieza.dataset.id : null, svg);
    });
    svg.addEventListener('keydown', (evento) => {
      if (evento.key !== 'Enter' && evento.key !== ' ') return;
      const pieza = evento.target.closest('.tocable');
      if (!pieza) return;
      evento.preventDefault();
      seleccionar(pieza.dataset.id, svg);
    });
  }

  /* ---------- ver completo o más grande ---------- */

  function activarZoom() {
    const boton = document.getElementById('boton-tamano');
    const contenedor = document.getElementById('contenedor');
    if (!boton || !contenedor) return;
    boton.addEventListener('click', () => {
      const grande = contenedor.classList.toggle('contenedor--grande');
      boton.textContent = grande ? 'Ver completo' : 'Ver más grande';
      boton.setAttribute('aria-pressed', String(grande));
    });
  }

  /* ---------- armar todo ---------- */

  function dibujarMapa() {
    const { ancho, alto } = MAPA.lienzo;
    const svg = crear('svg', {
      viewBox: `0 0 ${ancho} ${alto}`,
      class: 'mapa',
      role: 'img',
      'aria-label': `${MAPA.titulo.texto}. ${MAPA.titulo.subtitulo}.`,
    });
    crear('rect', { width: ancho, height: alto, class: 'mapa-fondo' }, svg);
    for (const nombre of ['base', 'cables', 'etiquetas']) capas[nombre] = crear('g', { class: `capa-${nombre}` }, svg);

    dibujarTitulo(MAPA.titulo, capas.base);
    for (const z of MAPA.zonas) dibujarZona(z, capas.base);
    dibujarNotas(MAPA.notas, MAPA.ci, capas.base);
    for (const c of MAPA.cables) dibujarCable(c, capas.cables);
    for (const c of MAPA.cables) dibujarEtiqueta(c, capas.etiquetas);

    document.getElementById('mapa').appendChild(svg);
    activarToques(svg);
    activarZoom();
  }

  dibujarMapa();
})();
