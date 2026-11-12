"""Mide el mapa de Copiloto Driver: archivos, conexiones y cables entre grupos.

Uso:  python3 herramientas/medir.py /ruta/a/copiloto-driver

- Archivos: los .ts y .tsx de src/ y modules/, sin las pruebas.
- Conexiones: cada archivo que importa a otro (sin los imports de solo tipos).
- Cables: las conexiones entre grupos (pantallas -> componentes, etc.).

Comprobado el 12/11/2026: sobre el código del 5/11/2026 (commit 63ccfca) da
los mismos 11 números de cables del mapa original y los mismos 837 archivos.
Pantallas: el mapa no cuenta el archivo de estilos del Copiloto (resta 1).
"""
import os, re, sys, json
from collections import Counter

raiz = sys.argv[1]
EXT = ('.ts', '.tsx')

def es_prueba(p):
    return '__tests__' in p or '.test.' in p

archivos = []
for base in ('src', 'modules'):
    for d, _, fs in os.walk(os.path.join(raiz, base)):
        if 'node_modules' in d or '/android/' in d or '/ios/' in d:
            continue
        for f in fs:
            p = os.path.relpath(os.path.join(d, f), raiz)
            if p.endswith(EXT) and not es_prueba(p):
                archivos.append(p)
conjunto = set(archivos)

IMPORT = re.compile(r"""^\s*(import|export)\s+(type\s+)?([^'";]*?)\s*from\s*['"]([^'"]+)['"]|^\s*import\s+['"]([^'"]+)['"]|require\(\s*['"]([^'"]+)['"]\s*\)""", re.M)

def resolver(desde, ruta):
    if not ruta.startswith('.'):
        return None
    base = os.path.normpath(os.path.join(os.path.dirname(desde), ruta))
    for c in (base, base + '.ts', base + '.tsx', base + '/index.ts', base + '/index.tsx'):
        if c in conjunto:
            return c
    return None

def solo_tipos(clausula):
    # `import { type A, type B } from` también es solo de tipos.
    m = re.match(r'^\{(.*)\}$', clausula.strip(), re.S)
    if not m:
        return False
    partes = [p.strip() for p in m.group(1).split(',') if p.strip()]
    return bool(partes) and all(p.startswith('type ') for p in partes)

aristas = []
for a in archivos:
    texto = open(os.path.join(raiz, a), encoding='utf-8').read()
    destinos = set()
    for m in IMPORT.finditer(texto):
        if m.group(2):  # import type
            continue
        if m.group(3) is not None and solo_tipos(m.group(3)):
            continue
        ruta = m.group(4) or m.group(5) or m.group(6)
        b = resolver(a, ruta)
        if b and b != a:
            destinos.add(b)
    for b in destinos:
        aristas.append((a, b))

def grupo(p):
    if p.startswith('src/screens/'): return 'pantallas'
    if p.startswith('src/components/'): return 'componentes'
    if p.startswith('src/navigation/'): return 'navegacion'
    if p.startswith('src/i18n/'): return 'idiomas'
    if p.startswith('src/theme/'): return 'motores'
    if p.startswith('src/context/'): return 'datos'
    if p.startswith('src/utils/'): return 'utilidades'
    if p.startswith('src/services/'): return 'servicios'
    if p.startswith('src/ai-engine/'): return 'brain'
    return 'otro:' + '/'.join(p.split('/')[:2])

cables = Counter((grupo(a), grupo(b)) for a, b in aristas if grupo(a) != grupo(b))
cuenta = Counter(grupo(p) for p in archivos)
print(json.dumps({
    'archivos': len(archivos),
    'conexiones': len(aristas),
    'pantallas': cuenta['pantallas'], 'componentes': cuenta['componentes'],
    'utilidades': cuenta['utilidades'], 'servicios': cuenta['servicios'],
    'cables': {f'{a}->{b}': n for (a, b), n in cables.most_common(40)},
}, ensure_ascii=False, indent=1))
