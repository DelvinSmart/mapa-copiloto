/*
 * datos.js — TODO lo que dice el mapa y dónde va.
 *
 * Si cambia un número o un texto, se cambia SOLO aquí.
 * Las medidas están en "puntos del lienzo" (1400 × 2790), las mismas de la
 * imagen original; la página las escala sola al tamaño de cada pantalla.
 *
 * Cajas: [x, y, ancho, alto]. Puntos: [x, y].
 */
const MAPA = {
  lienzo: { ancho: 1400, alto: 2790 },

  titulo: {
    caja: [130, 36, 1140, 100],
    texto: 'COPILOTO DRIVER — MAPA DE LA APP',
    subtitulo: '837 archivos · 5.038 conexiones',
  },

  /*
   * Las 7 zonas. Cada una puede tener:
   *  - lineas: textos sueltos (x, y, texto, tamaño)
   *  - candado: la etiqueta amarilla
   *  - placas: placas de metal con título y líneas (cada una con su id)
   *  - regleta: las filas de proveedores de la zona 5
   */
  zonas: [
    {
      id: 'panel',
      caja: [130, 160, 370, 310],
      titulo: '1. PANEL WEB',
      anchoTitulo: 250,
      lineas: [
        [170, 262, 'Tema', 22],
        [170, 288, 'Términos', 22],
        [170, 314, 'Usuarios', 22],
        [170, 340, 'Vehículos', 22],
        [170, 366, 'Suscripciones', 22],
        [170, 392, 'Costos de IA', 22],
        [170, 418, 'Configuración remota', 22],
        [170, 444, 'Estadísticas de landing', 22],
      ],
    },
    {
      id: 'motores',
      caja: [560, 160, 710, 310],
      titulo: '2. LOS 11 MOTORES DE DISEÑO',
      anchoTitulo: 430,
      lineas: [
        [582, 258, '1. Colores (15)', 21],
        [582, 284, '2. Radios (9)', 21],
        [582, 310, '3. Vidrio (opacidad, escarcha, tinte)', 21],
        [582, 336, '4. Bordes (5 grosores, color, intensidad)', 21],
        [582, 362, '5. Títulos (tamaño, fuente, sombra)', 21],
        [582, 388, '6. Separación entre bloques', 21],
        [925, 258, '7. Fondo (foto y degradado)', 21],
        [925, 284, '8. Gráficos', 21],
        [925, 310, '9. Pantalla de éxito', 21],
        [925, 336, '10. Movimiento (velocidad, subida,', 21],
        [956, 362, 'cascada, Android, toque)', 21],
        [925, 388, '11. Tema claro (9 colores)', 21],
      ],
      candado: { caja: [700, 420, 430, 36], texto: 'Candado de diseño: prohibido valores a mano' },
    },
    {
      id: 'piezas',
      caja: [130, 540, 960, 130],
      titulo: '3. PIEZAS ÚNICAS',
      anchoTitulo: 270,
      lineas: [
        [152, 640, 'Touchable · Button · Card · GlassFill · OsSectionLabel · OsScrollView · LoadFailedCard · dateFormat · dashSpring (13 resortes)', 20.5],
      ],
    },
    {
      id: 'app',
      caja: [130, 760, 1140, 370],
      titulo: '4. LA APP',
      anchoTitulo: 170,
      placas: [
        { id: 'navegacion', caja: [152, 850, 165, 250], titulo: 'Navegación', lineas: ['Tabs', 'Stack', 'San Stack'] },
        {
          id: 'pantallas',
          caja: [335, 850, 265, 250],
          titulo: 'Pantallas (62)',
          lineas: ['Início, San, Copiloto,', 'Ganhos, Gastos, Lucro,', 'Metas, Stats, Vehículos,', 'Menú, Registro'],
          tam: 21,
        },
        {
          id: 'componentes',
          caja: [690, 850, 330, 250],
          titulo: 'Componentes (357)',
          lineas: ['dashboard 69, os 72,', 'vehicles 37, profile 23,', 'auth 19, vehicle 17,', 'copilot 15, finance 14'],
        },
        { id: 'idiomas', caja: [1100, 850, 150, 250], titulo: 'Idiomas (6)', lineas: ['pt-BR, en, es,', 'fr, de, it'], tam: 21, tamTitulo: 23 },
      ],
    },
    {
      id: 'datos',
      caja: [130, 1240, 1140, 360],
      titulo: '5. DATOS DE LA APP (21 proveedores en cadena)',
      anchoTitulo: 560,
      regleta: {
        filas: [
          ['SafeArea', 'UserAccount', 'UserSettings', 'I18n', 'AppConfig', 'AppCurrency', 'AppTheme'],
          ['Expenses', 'PersonalExpenses', 'RecurringExpenses', 'SanCaixinha', 'Earnings', 'VehicleTracking', 'GrupoSan'],
          ['LiveWeather', 'AIEngine', 'Subscription', 'Support', 'DataDeletion', 'CopilotChat', 'FinanceModulePeriod'],
        ],
        x: 150,
        y: 1324,
        paso: 157.5,
        altoFila: 60,
        placa: [146, 48],
        lineaDesde: 160,
        lineaHasta: 1240,
        tam: 18.5,
      },
      puentes: {
        caja: [150, 1510, 1100, 74],
        lineas: [
          [170, 1540, 'Puentes: AIEngineBridge · RecurringExpensesBridge · DataCleanupBridge · NotificationResponseBridge'],
          [170, 1570, 'Control: AppConfigGate'],
        ],
        tam: 21,
      },
    },
    {
      id: 'cerebros',
      caja: [130, 1720, 1140, 315],
      titulo: '6. CEREBROS Y LÓGICA',
      anchoTitulo: 300,
      placas: [
        {
          id: 'brain',
          caja: [150, 1800, 370, 215],
          titulo: 'Copiloto Brain',
          lineas: [
            'AIEventBus, AIMemory, ModuleRegistry, Analytics,',
            'Herramientas. 15 módulos: user, earnings, expenses,',
            'personalExpenses, recurringExpenses, vehicles, san,',
            'weather, work, reminders, conversations,',
            'subscription, support, rideProfit, dataLifecycle',
          ],
          tam: 17,
        },
        {
          id: 'utilidades',
          caja: [590, 1800, 265, 215],
          titulo: 'Utilidades y cálculos (103)',
          lineas: ['Día fiscal, Ganancias,', 'Gastos, Metas,', 'Vehículo, San'],
          tam: 21,
          tamTitulo: 22,
        },
        {
          id: 'san',
          caja: [872, 1800, 170, 215],
          titulo: 'Módulo San',
          lineas: ['controller, service,', 'repository, events,', 'notifications'],
          tam: 18,
          tamTitulo: 23,
        },
        {
          id: 'carton',
          caja: [1058, 1800, 195, 215],
          titulo: 'Cartón automático',
          lineas: ['(solo Android, Kotlin)', 'RideReaderService,', 'OfferParser, RideAppCatalog,', 'RideOverlayWindow,', 'ScreenOcr'],
          tam: 16,
          tamTitulo: 20,
        },
      ],
    },
    {
      id: 'nube',
      caja: [130, 2100, 1140, 340],
      titulo: '7. SERVICIOS Y NUBE',
      anchoTitulo: 300,
      placas: [
        { id: 'almacenamiento', caja: [150, 2180, 320, 115], titulo: 'Almacenamiento', lineas: ['Copia local en el teléfono +', '22 archivos de nube'], tam: 20, tamTitulo: 23 },
        { id: 'firebase', caja: [540, 2180, 340, 115], titulo: 'Firebase', lineas: ['Auth, Firestore, Storage,', 'Cloud Functions, Hosting'], tam: 20, tamTitulo: 23 },
        { id: 'servicios', caja: [950, 2180, 300, 115], titulo: 'Servicios (83)', lineas: ['OCR, Notificaciones, Ubicación,', 'Clima, Sesión, Copia de seguridad'], tam: 18.5, tamTitulo: 23 },
        {
          id: 'cloudfunctions',
          caja: [150, 2310, 490, 115],
          titulo: 'Cloud Functions',
          lineas: ['aiCopilot (Gemini), classifyReceiptVision, OTP, Suscripciones,', 'Soporte, Borrado de cuenta, Admin, Costos de IA, Backup'],
          tam: 17,
          tamTitulo: 23,
        },
        { id: 'externos', caja: [710, 2310, 270, 115], titulo: 'Servicios externos', lineas: ['Google Gemini, RevenueCat,', 'Sentry, Twilio'], tam: 20, tamTitulo: 23 },
        { id: 'reglas', caja: [1000, 2310, 250, 115], titulo: 'Reglas de Firestore', lineas: ['Con candado'], tam: 20, tamTitulo: 23 },
      ],
    },
  ],

  /*
   * Los cables. Cada uno:
   *  - desde / hasta: el id de la zona o placa que une (para resaltarlo al tocar)
   *  - color: azul, verde, morado, naranja o amarillo (los define styles.css)
   *  - grosor: el ancho del cable (más conexiones, más grueso)
   *  - puntos: el recorrido; el primero es el puerto de salida y el último la flecha
   *  - numero y etiqueta: el número y dónde va su etiqueta (si tiene)
   */
  cables: [
    { desde: 'panel', hasta: 'motores', color: 'azul', grosor: 6, puntos: [[500, 300], [560, 300]] },
    { desde: 'motores', hasta: 'piezas', color: 'azul', grosor: 6, puntos: [[800, 470], [800, 540]] },
    { desde: 'componentes', hasta: 'motores', color: 'azul', grosor: 13, puntos: [[960, 850], [960, 700], [1230, 700], [1230, 470]], numero: '582', etiqueta: [1230, 590] },
    { desde: 'pantallas', hasta: 'motores', color: 'azul', grosor: 5, puntos: [[520, 850], [520, 725], [1150, 725], [1150, 470]], numero: '117', etiqueta: [1150, 590] },
    { desde: 'pantallas', hasta: 'componentes', color: 'azul', grosor: 11, puntos: [[600, 975], [690, 975]], numero: '509', etiqueta: [645, 936] },
    { desde: 'componentes', hasta: 'idiomas', color: 'amarillo', grosor: 5, puntos: [[1020, 975], [1100, 975]], numero: '208', etiqueta: [1060, 936] },
    { desde: 'pantallas', hasta: 'datos', color: 'morado', grosor: 5, puntos: [[450, 1100], [450, 1240]], numero: '143', etiqueta: [450, 1172] },
    { desde: 'componentes', hasta: 'datos', color: 'morado', grosor: 5, puntos: [[880, 1100], [880, 1240]], numero: '118', etiqueta: [880, 1172] },
    { desde: 'pantallas', hasta: 'utilidades', color: 'verde', grosor: 5, puntos: [[380, 1100], [380, 1160], [72, 1160], [72, 1660], [650, 1660], [650, 1800]], numero: '135', etiqueta: [72, 1300] },
    { desde: 'componentes', hasta: 'utilidades', color: 'verde', grosor: 6, puntos: [[800, 1100], [800, 1195], [36, 1195], [36, 1690], [760, 1690], [760, 1800]], numero: '225', etiqueta: [36, 1500] },
    { desde: 'componentes', hasta: 'servicios', color: 'naranja', grosor: 4, puntos: [[960, 1100], [960, 1165], [1352, 1165], [1352, 2265], [1250, 2265]], numero: '70', etiqueta: [1352, 1700] },
    { desde: 'datos', hasta: 'servicios', color: 'naranja', grosor: 4, puntos: [[1270, 1420], [1308, 1420], [1308, 2215], [1250, 2215]], numero: '78', etiqueta: [1308, 1900] },
    { desde: 'datos', hasta: 'brain', color: 'morado', grosor: 6, puntos: [[480, 1600], [480, 1800]], numero: 'eventos', etiqueta: [480, 1628], especial: true },
    { desde: 'brain', hasta: 'utilidades', color: 'verde', grosor: 4, puntos: [[520, 1905], [590, 1905]], numero: '21', etiqueta: [555, 1866] },
    { desde: 'servicios', hasta: 'firebase', color: 'naranja', grosor: 6, puntos: [[950, 2237], [880, 2237]] },
    { desde: 'cloudfunctions', hasta: 'externos', color: 'verde', grosor: 6, puntos: [[640, 2367], [710, 2367]] },
  ],

  notas: [
    {
      tono: 'verde',
      caja: [130, 2480, 590, 180],
      titulo: 'ESTADO DE LA REVISIÓN',
      marca: '✓ ',
      items: [
        '0 botones sueltos',
        '0 ciclos',
        '0 archivos TypeScript de más de 1.000 líneas',
        'Pruebas: app 104 · backend 133 · reglas 21 · cartón 61',
      ],
    },
    {
      tono: 'amarillo',
      caja: [740, 2480, 530, 180],
      titulo: 'PENDIENTE',
      marca: '',
      items: ['21 proveedores anidados', '2 archivos Kotlin de más de 1.000 líneas', '22 vulnerabilidades moderadas en producción'],
    },
  ],

  ci: { caja: [130, 2690, 1140, 66], texto: 'CI activa: 5 revisiones en cada subida' },
};
