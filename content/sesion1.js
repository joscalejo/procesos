// Guía de Lectura y Comprensión Pedagógica Oficial - Sesión 1: Ciberseguridad como Proceso de Negocio & NIST CSF 2.0
// Basado directamente en: docs/Sesion1_0 y 1_1 MON.pdf, docs/NIST.CSWP.29.spa (1).pdf y Sílabo CB05 (UPC)
// Diseñado para lectura pausada en celular y laptop (Scaffolding, siglas expandidas y ejemplos prácticos)

window.SESION_1_DATA = {
  id: "s1",
  number: 1,
  title: "Sesión 1: Ciberseguridad como Proceso de Negocio & NIST CSF 2.0",
  shortTitle: "S1: Negocio & CSF 2.0",

  // 0. CABECERA PEDAGÓGICA
  header: {
    oneLiner: "La ciberseguridad ya no es una tarea técnica aislada de TI: es un proceso estratégico de negocio liderado por el gobierno corporativo para proteger el valor y la supervivencia de la empresa mediante NIST CSF 2.0.",
    readingTime: "12 min de lectura pausada",
    prerequisites: [
      { text: "Ninguno (Sesión introductoria del curso CB05)", link: "s1" }
    ],
    outcomes: [
      "Comprender por qué la ciberseguridad es una responsabilidad fiduciaria de la alta dirección y no un simple gasto técnico.",
      "Diferenciar con precisión analítica los 3 niveles de gestión: Gobierno (estrategia), Gestión de Riesgos (táctico) y Controles Operativos (técnico).",
      "Dominar la estructura de NIST CSF 2.0: Core (las 6 funciones), Profiles (Current vs. Target) y Implementation Tiers (1 al 4).",
      "Analizar la brecha de Target (2013) para demostrar cómo fallas de procesos y cadena de mando anulan tecnología de detección de última generación."
    ]
  },

  // 1. LA IDEA CENTRAL
  centralIdea: {
    problemStatement: "Durante años, las empresas trataron la ciberseguridad como 'un problema de los chicos de sistemas'. Compraban licencias caras, pero los directores no sabían qué activos eran críticos ni existían protocolos para atender alertas. Cuando ocurría un ataque, las consecuencias no eran computadoras apagadas: eran quiebras financieras, demandas de millones de dólares y la renuncia forzada de gerentes generales.",
    coreConcept: "La ciberseguridad moderna es un proceso continuo de gestión de riesgos integrado al negocio: define qué proteger según el dinero en juego, fija responsabilidades legales en el Directorio y utiliza marcos comunes como NIST CSF 2.0 para que ingenieros y directores hablen el mismo idioma.",
    caseConnection: "En la histórica brecha de Target (2013), los atacantes entraron usando credenciales robadas a un proveedor externo de aire acondicionado (HVAC) y robaron 40 millones de tarjetas de crédito. La tecnología de seguridad (FireEye) emitió alertas automáticas a tiempo; sin embargo, nadie investigó porque no existía un proceso formal ni una cadena de mando para escalar incidentes. Target gastó millones en tecnología, pero falló en gobierno y procesos.",
    source: "Diapositivas Sesión 1, diapositivas 5, 8 y 11; NIST CSF 2.0 (CSWP 29), sección 1"
  },

  // 2. VOCABULARIO, SIGLAS Y MNEMOTECNIAS
  vocabulary: {
    acronyms: [
      {
        sigla: "NIST",
        english: "National Institute of Standards and Technology",
        spanish: "Instituto Nacional de Estándares y Tecnología (EE.UU.)",
        meaning: "Agencia federal estadounidense que desarrolla estándares tecnológicos y guías de ciberseguridad de referencia mundial."
      },
      {
        sigla: "CSF",
        english: "Cybersecurity Framework",
        spanish: "Marco de Ciberseguridad",
        meaning: "Marco estructurado y flexible para ayudar a organizaciones de cualquier tamaño a gestionar y reducir riesgos cibernéticos."
      },
      {
        sigla: "CSWP",
        english: "Cybersecurity White Paper",
        spanish: "Libro Blanco / Publicación Técnica de Ciberseguridad",
        meaning: "Designación oficial del documento NIST CSF 2.0 (NIST CSWP 29)."
      },
      {
        sigla: "GV",
        english: "Govern",
        spanish: "Gobierno",
        meaning: "Función transversal del NIST CSF 2.0 que establece y monitorea la estrategia de riesgos, políticas y cadena de mando."
      },
      {
        sigla: "ID",
        english: "Identify",
        spanish: "Identificación",
        meaning: "Función encargada de inventariar activos, comprender el contexto de negocio y evaluar riesgos (amenazas y vulnerabilidades)."
      },
      {
        sigla: "PR",
        english: "Protect",
        spanish: "Protección",
        meaning: "Función que aplica salvaguardas (MFA, cifrado, concientización, hardening) para contener o frenar el impacto de ataques."
      },
      {
        sigla: "DE",
        english: "Detect",
        spanish: "Detección",
        meaning: "Función que recopila telemetría y monitorea eventos continuos para descubrir anomalías de seguridad en tiempo oportuno."
      },
      {
        sigla: "RS",
        english: "Respond",
        spanish: "Respuesta",
        meaning: "Función de contención activa: ejecuta el plan de incidentes, analiza el vector y mitiga la propagación del ataque."
      },
      {
        sigla: "RC",
        english: "Recover",
        spanish: "Recuperación",
        meaning: "Función de restauración operativa: recupera sistemas desde respaldos y gestiona la comunicación post-incidente."
      },
      {
        sigla: "POS",
        english: "Point of Sale",
        spanish: "Punto de Venta",
        meaning: "Terminales y sistemas donde los clientes pasan sus tarjetas de crédito o débito para pagar compras."
      },
      {
        sigla: "HVAC",
        english: "Heating, Ventilation, and Air Conditioning",
        spanish: "Calefacción, Ventilación y Aire Acondicionado",
        meaning: "Sistemas electromecánicos de climatización industrial que con frecuencia tienen acceso remoto de mantenimiento."
      }
    ],
    codeReadingGuide: {
      explanation: "El marco NIST CSF 2.0 organiza sus resultados en tres niveles jerárquicos: Funciones (2 letras) → Categorías (4 letras) → Subcategorías (código con número).",
      example: "PR.AA-01",
      breakdown: [
        { part: "PR", role: "Función", desc: "Protect (Protección) — El pilar general de salvaguardas preventivas." },
        { part: "AA", role: "Categoría", desc: "Authentication and Access Control (Identidad y Control de Acceso) — El dominio concreto." },
        { part: "01", role: "Subcategoría", desc: "Resultado medible específico (ej.: identidades de personas y servicios administradas formalmente)." }
      ],
      source: "NIST CSF 2.0 (CSWP 29), pág. 13"
    },
    mnemonics: [
      {
        name: "Las 6 Funciones de NIST CSF 2.0 en Orden",
        tag: "Mnemotecnia (propia, no oficial)",
        phrase: "\"G-I-P-D-R-R: Gente Inteligente Protege Datos Realmente Rápidos\"",
        breakdown: [
          "G → Govern (Gobierno: define reglas, apetito y quién manda)",
          "I → Identify (Identificar: qué activos tenemos y qué riesgos corren)",
          "P → Protect (Proteger: salvaguardas para resistir el ataque)",
          "D → Detect (Detectar: telemetría para enterarse a tiempo)",
          "R → Respond (Responder: apagar el fuego y contener la brecha)",
          "R → Recover (Recuperar: restaurar operaciones y volver a la normalidad)"
        ]
      },
      {
        name: "Los 3 Niveles de Gestión",
        tag: "Mnemotecnia (propia, no oficial)",
        phrase: "\"G-R-C: Gobierno manda, Riesgo calcula, Controles ejecutan\"",
        breakdown: [
          "Gobierno (Estratégico / Directorio) → Fija normas y asigna autoridad.",
          "Riesgo (Táctico / CISO) → Prioriza dónde invertir según probabilidad e impacto.",
          "Controles (Operativo / Ingenieros TI) → Configuran firewalls, parches y accesos diarios."
        ]
      }
    ]
  },

  // 3. CONCEPTOS PASO A PASO (De lo simple a lo complejo)
  stepByStepConcepts: [
    {
      id: "step-1-business-process",
      order: 1,
      name: "La Ciberseguridad como Proceso de Negocio",
      whatIs: "Es el enfoque que concibe la seguridad digital no como un gasto informático o un software que se instala una sola vez, sino como un proceso continuo y transversal que protege los ingresos, la reputación y la continuidad operativa de la empresa.",
      whyUseful: "Evita que las decisiones de seguridad se tomen en el sótano técnico sin presupuesto ni respaldo gerencial. Garantiza que la junta directiva asuma su deber legal de vigilar los riesgos.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "El Directorio de un banco aprueba trimestralmente el presupuesto de ciberseguridad alineado con los nuevos canales digitales de atención al cliente y exige reportes de cumplimiento normativo."
        },
        {
          label: "Ejemplo Mal",
          text: "Una tienda de comercio electrónico delega la seguridad exclusivamente al programador junior de la web; cuando sufren un secuestro de datos (ransomware), la empresa paraliza ventas 15 días y quiebra."
        }
      ],
      relationships: "Este principio alimenta directamente a la función Govern (S2) y justifica por qué el dueño del activo (S3) debe ser un gerente de negocio y no el técnico de TI.",
      source: "Diapositivas Sesión 1, diapositivas 4 y 7"
    },
    {
      id: "step-2-hierarchy-levels",
      order: 2,
      name: "Los 3 Niveles de Gestión: Gobierno, Riesgo y Controles Operativos",
      whatIs: "Es la estructura de tres pisos que divide el mando: el Gobierno corporativo fija la estrategia y las normas; la Gestión de Riesgos evalúa qué se puede perder y prioriza recursos; los Controles Operativos ejecutan las herramientas técnicas día a día.",
      whyUseful: "Elimina la desconexión habitual donde los ingenieros compran firewalls caros pero nadie sabe si están protegiendo la base de datos de mayor valor para los accionistas.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "El Directorio aprueba la política de trabajo remoto (Gobierno); el área de riesgos identifica que usar Wi-Fi público expone credenciales (Riesgo); el equipo de TI implementa VPN con MFA obligatorio en laptops (Control Operativo)."
        },
        {
          label: "Ejemplo Mal",
          text: "El equipo de TI instala una herramienta EDR avanzada de $80,000 pero nadie definió en una política quién atiende las alertas los fines de semana; un ataque ocurre en feriado y nadie responde (Control sin Gobierno)."
        }
      ],
      relationships: "Gobierno (S2) alimenta a la Gestión de Riesgos (S3), la cual prioriza los Controles Operativos de Protect (S5, S6 y S7).",
      source: "Diapositivas Sesión 1, diapositivas 14 y 16"
    },
    {
      id: "step-3-csf-evolution",
      order: 3,
      name: "Origen y Evolución: De NIST CSF 1.1 a CSF 2.0 (2024)",
      whatIs: "NIST CSF 1.1 (2018) tenía 5 funciones pensadas para infraestructura crítica estadounidense. NIST CSF 2.0 (publicado en 2024) agregó la función transversal GOVERN en el centro y expandió su alcance oficial a cualquier tipo y tamaño de organización a nivel global.",
      whyUseful: "Consagra formalmente que la tecnología de protección es inútil si la alta dirección no gobierna la estrategia, el contexto legal y el riesgo de los proveedores externos.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Una fintech peruana adopta NIST CSF 2.0 utilizando la función GOVERN para auditar contratos con sus pasarelas de pago cloud y reportar cumplimiento a la SBS."
        },
        {
          label: "Ejemplo Mal",
          text: "Una empresa continúa usando marcos antiguos que solo vigilan firewalls técnicos, ignorando que el 80% de sus brechas provienen de fallas de supervisión en sus proveedores externos."
        }
      ],
      relationships: "Explica la aparición de Sesión 2 (Govern) como función cabecera del programa y su rol rector sobre las demás funciones.",
      source: "NIST CSF 2.0 (CSWP 29), sección 1; Diapositivas Sesión 1, diapositiva 10"
    },
    {
      id: "step-4-csf-components",
      order: 4,
      name: "Los 3 Componentes de NIST CSF 2.0: Core, Profiles y Tiers",
      whatIs: "NIST CSF 2.0 no es solo una lista de funciones: consta de (1) el Core (catálogo de resultados deseados en 6 funciones), (2) los Profiles (la postura real y objetivo de la empresa) y (3) los Tiers (el grado de formalidad de la gestión de riesgos).",
      whyUseful: "Permite a una empresa saber qué hacer (Core), comparar dónde está parada hoy versus a dónde quiere llegar (Profiles) y medir la madurez del rigor de sus procesos (Tiers).",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Una aseguradora usa el Core para identificar controles faltantes, documenta su Current Profile con brechas, diseña su Target Profile a 2 años y define subir de Tier 2 a Tier 3."
        },
        {
          label: "Ejemplo Mal",
          text: "Una empresa lee el Core como si fuera una lista de compras obligatorias y adquiere herramientas al azar sin evaluar su perfil actual ni su apetito de riesgo."
        }
      ],
      relationships: "El Core provee las categorías analizadas en el Detective; los Profiles y Tiers se aplican en la evaluación de activos y riesgos de Sesión 3.",
      source: "NIST CSF 2.0 (CSWP 29), pág. 4; Diapositivas Sesión 1, diapositiva 12"
    },
    {
      id: "step-5-profiles-gap",
      order: 5,
      name: "Profiles (Perfiles) y Gap Analysis (Análisis de Brechas)",
      whatIs: "El Perfil Actual (Current Profile) describe el estado de ciberseguridad que la empresa tiene hoy; el Perfil Objetivo (Target Profile) describe a dónde necesita llegar para cumplir sus metas de negocio; el Análisis de Brechas (Gap Analysis) es la diferencia que guía el presupuesto.",
      whyUseful: "Convierte la seguridad en un plan de inversión racional sustentable ante el Directorio, justificando cada dólar gastado para cerrar brechas específicas.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "La auditoría detecta que la subcategoría de autenticación multifactor (PR.AA-01) no se cumple en el Current Profile; el Target Profile exige MFA para el 100% de usuarios; la brecha justifica comprar licencias de tokens."
        },
        {
          label: "Ejemplo Mal",
          text: "El gerente de TI pide $200,000 para 'mejorar la seguridad' sin presentar un análisis de brechas; el Directorio rechaza la solicitud por falta de justificación de negocio."
        }
      ],
      relationships: "Alimenta la priorización de riesgos de Identify (S3) y la selección de proyectos del hito práctico (S4).",
      source: "NIST CSF 2.0 (CSWP 29), pág. 9; Diapositivas Sesión 1, diapositiva 13"
    },
    {
      id: "step-6-implementation-tiers",
      order: 6,
      name: "Niveles de Implementación (Implementation Tiers 1 al 4)",
      whatIs: "Cuatro niveles (Tier 1 Parcial, Tier 2 Informado por el Riesgo, Tier 3 Repetible, Tier 4 Adaptativo) que caracterizan el rigor, formalidad e integración con que la organización gestiona el riesgo de ciberseguridad.",
      whyUseful: "Ayuda a entender que una pequeña panadería no necesita operar en Tier 4 (adaptativo continuo); el Tier debe ser proporcional a la criticidad de los activos y las obligaciones legales.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Una entidad financiera que procesa transferencias interbancarias en tiempo real opera en Tier 4 (procesos adaptativos con telemetría predictiva de amenazas)."
        },
        {
          label: "Ejemplo Mal",
          text: "Un hospital nacional almacena datos de millones de pacientes pero opera en Tier 1 (parcial, informal, reactivo ante quejas); un ransomware cifra sus servidores y no tienen plan de contingencia."
        }
      ],
      relationships: "Se confunde frecuentemente con modelos de madurez rígidos (CMMI); se utiliza en el diagnóstico de madurez de Sesión 3.",
      source: "NIST CSF 2.0 (CSWP 29), pág. 10; Diapositivas Sesión 1, diapositiva 15"
    },
    {
      id: "step-7-target-case",
      order: 7,
      name: "El Caso Target (2013): La Anatomía de una Falla de Gobierno",
      whatIs: "El ataque paradigmático donde cibercriminales robaron credenciales a un contratista de aire acondicionado (Fazio Mechanical) para ingresar a los servidores corporativos e inyectar malware en los terminales de cobro (POS) de 1,800 tiendas.",
      whyUseful: "Demuestra la lección más importante de CB05: la tecnología no basta. Target tenía instalado un sistema de detección de intrusiones de $1.6 millones (FireEye) que detectó el malware y encendió alertas, pero el equipo de seguridad las ignoró porque no existía un proceso formal de respuesta.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Una organización moderna aísla a los contratistas en redes segmentadas (Zero Trust), monitorea sus accesos y cuenta con un protocolo formal donde toda alerta crítica de seguridad se escala y revisa en menos de 1 hora."
        },
        {
          label: "Ejemplo Mal",
          text: "Target en 2013: conectó al contratista de HVAC a la misma red corporativa donde viajaban las tarjetas de crédito y no asignó personal con autoridad para actuar ante las alarmas generadas."
        }
      ],
      relationships: "Conecta la gestión de terceros (GV.SC en S2), el inventario de accesos (ID.AM en S3) y la necesidad de segmentación de redes (Zero Trust en S5).",
      source: "Diapositivas Sesión 1, diapositivas 8 y 9"
    }
  ],

  // 4. CÓMO SE CONECTA TODO (Mapa conceptual / Flujo SVG)
  connectionDiagram: {
    description: "La ciberseguridad como proceso de negocio conecta el gobierno corporativo con la operación técnica: el Directorio define la estrategia; el Core de NIST CSF 2.0 provee el marco estructurado de 6 funciones; los Profiles miden las brechas y los Tiers fijan el rigor institucional.",
    svgContent: `
      <div class="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 760 380" class="w-full max-w-[760px] mx-auto block text-executive-900 dark:text-white" style="min-width: 320px;" aria-label="Diagrama de conexiones de Sesión 1: Negocio y NIST CSF 2.0">
          <rect x="10" y="10" width="740" height="360" rx="16" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="1.5" />
          
          <!-- NODO 1: ESTRATEGIA DE NEGOCIO Y GOBIERNO -->
          <g transform="translate(30, 40)">
            <rect width="210" height="70" rx="10" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-width="2"/>
            <text x="105" y="30" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">1. Negocio & Gobierno</text>
            <text x="105" y="50" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Directorio, leyes y valor comercial</text>
          </g>

          <!-- FLECHA 1 -> 2 -->
          <path d="M 240 75 L 280 75" stroke="#3b82f6" stroke-width="2" fill="none"/>

          <!-- NODO 2: GESTIÓN DE RIESGOS (TÁCTICO) -->
          <g transform="translate(280, 40)">
            <rect width="200" height="70" rx="10" fill="#f59e0b" fill-opacity="0.12" stroke="#f59e0b" stroke-width="2"/>
            <text x="100" y="30" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">2. Gestión de Riesgos</text>
            <text x="100" y="50" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Apetito, impacto y priorización</text>
          </g>

          <!-- FLECHA 2 -> 3 -->
          <path d="M 480 75 L 520 75" stroke="#f59e0b" stroke-width="2" fill="none"/>

          <!-- NODO 3: CONTROLES OPERATIVOS (TÉCNICO) -->
          <g transform="translate(520, 40)">
            <rect width="210" height="70" rx="10" fill="#10b981" fill-opacity="0.12" stroke="#10b981" stroke-width="2"/>
            <text x="105" y="30" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">3. Controles Operativos</text>
            <text x="105" y="50" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Firewalls, parches, MFA y EDR</text>
          </g>

          <!-- FLECHA HACIA ABAJO (AL CORE DE NIST CSF 2.0) -->
          <path d="M 380 110 L 380 160" stroke="#8b5cf6" stroke-width="2" fill="none"/>

          <!-- NODO CENTRAL: EL CORE DE NIST CSF 2.0 (6 FUNCIONES) -->
          <g transform="translate(180, 160)">
            <rect width="400" height="85" rx="12" fill="#8b5cf6" fill-opacity="0.15" stroke="#8b5cf6" stroke-width="2.5"/>
            <text x="200" y="32" text-anchor="middle" font-weight="bold" font-size="15" fill="currentColor">El Core de NIST CSF 2.0 (6 Funciones)</text>
            <text x="200" y="55" text-anchor="middle" font-weight="bold" font-size="12" fill="#8b5cf6">GOVERN &middot; IDENTIFY &middot; PROTECT &middot; DETECT &middot; RESPOND &middot; RECOVER</text>
            <text x="200" y="72" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.85">El catálogo estructurado de 22 categorías y 106 subcategorías</text>
          </g>

          <!-- FLECHAS INFERIORES A PROFILES Y TIERS -->
          <path d="M 280 245 L 280 280 L 190 280 L 190 295" stroke="#0ea5e9" stroke-width="2" fill="none"/>
          <path d="M 480 245 L 480 280 L 570 280 L 570 295" stroke="#ec4899" stroke-width="2" fill="none"/>

          <!-- NODO INFERIOR IZQUIERDO: PROFILES -->
          <g transform="translate(60, 295)">
            <rect width="260" height="65" rx="10" fill="#0ea5e9" fill-opacity="0.12" stroke="#0ea5e9" stroke-width="2"/>
            <text x="130" y="28" text-anchor="middle" font-weight="bold" font-size="13" fill="currentColor">Profiles (Current vs Target)</text>
            <text x="130" y="47" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Gap Analysis para justificar inversión</text>
          </g>

          <!-- NODO INFERIOR DERECHO: TIERS -->
          <g transform="translate(440, 295)">
            <rect width="260" height="65" rx="10" fill="#ec4899" fill-opacity="0.12" stroke="#ec4899" stroke-width="2"/>
            <text x="130" y="28" text-anchor="middle" font-weight="bold" font-size="13" fill="currentColor">Implementation Tiers (1 al 4)</text>
            <text x="130" y="47" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Rigor y formalidad frente al riesgo</text>
          </g>
        </svg>
      </div>
    `,
    summaryText: "La alta dirección gobierna la estrategia que la gestión de riesgos cuantifica. Esta priorización se apoya en el Core de NIST CSF 2.0, se personaliza mediante Profiles (Current vs Target) para cerrar brechas, y se calibra en el Tier adecuado según la criticidad del negocio."
  },

  // 5. DIFERENCIAS CLAVE (Tablas comparativas con "La señal que decide")
  keyDifferences: [
    {
      id: "diff-gov-risk-controls",
      pairTitle: "Gobierno vs. Gestión de Riesgos vs. Controles Operativos",
      colA: "Gobierno Corporativo",
      colB: "Gestión de Riesgos",
      rows: [
        { aspect: "¿Quién lo lidera?", valA: "El Directorio, el CEO y el Comité de Gobierno.", valB: "El CISO y los Comités de Riesgo Operacional." },
        { aspect: "¿Qué pregunta responde?", valA: "¿Cuáles son las reglas de la empresa y quién tiene autoridad legal?", valB: "¿Qué activos podemos perder y cuánto dinero arriesgamos si fallan?" },
        { aspect: "Entregable típico", valA: "Políticas formales aprobadas y Matriz RACI.", valB: "Registro de Riesgos priorizado por Probabilidad e Impacto." },
        { aspect: "La señal que decide", valA: "Si el caso menciona vacíos de mando, aprobación de normas o directivas de la Junta → Gobierno.", valB: "Si el caso menciona apetito de riesgo, cálculo de pérdidas o priorización de presupuesto → Riesgo." }
      ]
    },
    {
      id: "diff-csf-11-vs-20",
      pairTitle: "NIST CSF 1.1 (2018) vs. NIST CSF 2.0 (2024)",
      colA: "NIST CSF 1.1",
      colB: "NIST CSF 2.0",
      rows: [
        { aspect: "Número de Funciones", valA: "5 funciones (Identify, Protect, Detect, Respond, Recover).", valB: "6 funciones (Se incorporó GOVERN como núcleo transversal)." },
        { aspect: "Alcance organizacional", valA: "Enfocado predominantemente en Infraestructura Crítica.", valB: "Diseñado explícitamente para cualquier sector, tamaño o complejidad." },
        { aspect: "Tratamiento de Terceros", valA: "Disperso como categorías operativas secundarias.", valB: "Jerarquizado bajo gobernanza directiva en GV.SC." },
        { aspect: "La señal que decide", valA: "¿Un examen menciona el marco clásico de 5 funciones sin gobierno central? → CSF 1.1.", valB: "¿El caso evalúa la función transversal GOVERN y la cadena de suministro formal? → CSF 2.0." }
      ]
    },
    {
      id: "diff-current-vs-target-profile",
      pairTitle: "Current Profile vs. Target Profile",
      colA: "Current Profile (Perfil Actual)",
      colB: "Target Profile (Perfil Objetivo)",
      rows: [
        { aspect: "Propósito", valA: "Diagnóstico sincero: describe los controles que operan realmente hoy.", valB: "Estado deseado: describe los controles que el negocio necesita alcanzar." },
        { aspect: "Cómo se construye", valA: "Mediante auditorías técnicas, entrevistas y revisión de procesos reales.", valB: "Basado en los objetivos comerciales, leyes regulatorias y apetito de riesgo." },
        { aspect: "Resultado de compararlos", valA: "Muestra las debilidades y carencias de la postura actual.", valB: "Genera el Gap Analysis que fundamenta el plan de inversiones (Roadmap)." },
        { aspect: "La señal que decide", valA: "¿El documento describe cómo opera la seguridad 'en este momento'? → Current Profile.", valB: "¿El documento describe la meta a la que se aspira llegar en 12 o 24 meses? → Target Profile." }
      ]
    },
    {
      id: "diff-tiers-vs-maturity",
      pairTitle: "NIST Tiers vs. Modelos de Madurez Tradicionales (CMMI)",
      colA: "NIST Implementation Tiers",
      colB: "Niveles de Madurez (CMMI)",
      rows: [
        { aspect: "Objetivo", valA: "Describir el grado de rigor con que el riesgo informa las decisiones.", valB: "Medir si un proceso de desarrollo o gestión está optimizado matemáticamente." },
        { aspect: "¿Todos deben llegar al nivel máximo?", valA: "NO. Llegar a Tier 4 solo se justifica si la criticidad del negocio lo amerita.", valB: "SÍ. El modelo empuja a toda empresa a subir progresivamente de nivel 1 a 5." },
        { aspect: "Costo / Beneficio", valA: "Se equilibra con el apetito de riesgo y presupuesto organizacional.", valB: "Obliga a burocratizar procesos sin importar el tamaño del negocio." },
        { aspect: "La señal que decide", valA: "¿El docente pregunta si una ferretería debe estar en Tier 4? Ojo: No, el Tier depende del apetito y criticidad.", valB: "¿Se evalúa si los procesos son ad-hoc (Tier 1) vs repetibles formalmente (Tier 3)? → Tiers de NIST." }
      ]
    }
  ],

  // 6. PREGUNTAS PARA RAZONAR (Guía analítica de casos)
  reasoningQuestions: [
    {
      step: 1,
      question: "¿La empresa trata la ciberseguridad como un problema de TI o como un riesgo estratégico de negocio?",
      action: "Verifica si el CISO reporta directamente a la alta dirección o si está subordinado al área de soporte técnico. Si TI decide en solitario qué proteger, el negocio tiene una falla estructural de gobernanza."
    },
    {
      step: 2,
      question: "¿El problema analizado fue por falta de tecnología o por falta de procedimientos y cadena de mando?",
      action: "Recuerda el caso Target: tener software que detecta no sirve si no hay procedimientos escritos para actuar. Pregúntate si alguien tenía la responsabilidad explícita de responder a la alerta."
    },
    {
      step: 3,
      question: "¿La organización tiene documentado su Current Profile y su Target Profile?",
      action: "Si una empresa compra herramientas caras sin saber qué controles ya tiene cubiertos ni cuáles exige su negocio, está desperdiciando recursos por falta de un Gap Analysis."
    },
    {
      step: 4,
      question: "¿En qué Implementation Tier opera la compañía frente a su nivel de criticidad?",
      action: "Si una entidad financiera o de salud opera con procesos informales y reactivos (Tier 1), su riesgo operacional es inaceptable. El rigor debe ser proporcional a las vidas o dinero que custodia."
    },
    {
      step: 5,
      question: "¿A qué función del Core de NIST CSF 2.0 pertenece la necesidad del caso?",
      action: "Usa el descarte secuencial: ¿Fijan reglas o mandos? → Govern (GV). ¿Descubren qué tienen o qué riesgos corren? → Identify (ID). ¿Previenen y endurecen sistemas? → Protect (PR). ¿Detectan anomalías en vivo? → Detect (DE). ¿Contienen el ataque? → Respond (RS). ¿Restauran y aprenden? → Recover (RC)."
    }
  ],

  // 7. ERRORES TÍPICOS ("Si piensas X, ojo: ...")
  typicalErrors: [
    {
      ifYouThink: "Si piensas que la ciberseguridad le pertenece al área de TI...",
      watchOut: "Ojo: La ciberseguridad es una responsabilidad fiduciaria de la Gerencia General y el Directorio. TI administra la tecnología; el negocio administra el riesgo."
    },
    {
      ifYouThink: "Si piensas que en el caso Target (2013) falló el antivirus o faltó tecnología...",
      watchOut: "Ojo: Target tenía FireEye instalado y la herramienta detectó el malware y emitió las alertas a tiempo. Falló el proceso humano y la gobernanza: el equipo desestimó las alertas y nadie escaló el incidente."
    },
    {
      ifYouThink: "Si piensas que toda empresa debe aspirar obligatoriamente a estar en Tier 4...",
      watchOut: "Ojo: NIST CSF aclara explícitamente que los Tiers no son niveles de madurez forzosos. Alcanzar Tier 4 es extremadamente costoso y solo se justifica para infraestructuras críticas nacionales o banca de alto volumen."
    },
    {
      ifYouThink: "Si piensas que NIST CSF 2.0 es una ley obligatoria de cumplimiento penal...",
      watchOut: "Ojo: NIST CSF es un marco voluntario no prescriptivo de mejores prácticas, aunque muchas regulaciones obligatorias (como SBS en Perú o HIPAA en EE.UU.) exijan controles basados en sus principios."
    },
    {
      ifYouThink: "Si piensas que comprar software costoso reemplaza a los perfiles de ciberseguridad...",
      watchOut: "Ojo: Sin un Perfil Objetivo (Target Profile) y un Análisis de Brechas (Gap Analysis), las herramientas quedan subutilizadas, sin configuración adecuada y sin personal asignado para operarlas."
    },
    {
      ifYouThink: "Si piensas que NIST CSF 2.0 solo cambió detalles estéticos respecto a la versión 1.1...",
      watchOut: "Ojo: La adición de la función transversal GOVERN es el cambio más radical en la historia del marco, posicionando la gobernanza corporativa al mismo nivel que las operaciones de protección técnica."
    }
  ],

  // 8. PARA PROFUNDIZAR (Colapsado, opcional)
  deepDive: [
    {
      title: "El Origen Histórico: Executive Order 13636 (2013)",
      content: "NIST CSF fue creado por mandato presidencial en EE.UU. tras la Orden Ejecutiva 13636 de Barack Obama, con la misión de diseñar un marco voluntario basado en estándares abiertos para proteger infraestructuras críticas del país sin imponer regulaciones gubernamentales asfixiantes."
    },
    {
      title: "Diferencia Estructural: NIST CSF vs. ISO/IEC 27001",
      content: "NIST CSF es un marco descriptivo basado en resultados ('qué objetivos lograr en lenguaje accesible de negocio'), mientras que ISO/IEC 27001 es una norma internacional prescriptiva auditable y certificable que define los requisitos para establecer un Sistema de Gestión de Seguridad de la Información (SGSI)."
    },
    {
      title: "La Estructura Numérica de NIST CSF 2.0",
      content: "La versión 2.0 consta formalmente de 6 Funciones, 22 Categorías y 106 Subcategorías medibles, complementadas por una suite oficial de plantillas de implementación y perfiles comunitarios de referencia (Community Profiles)."
    }
  ],

  // 9. FUENTES DE LA SESIÓN
  sources: [
    {
      doc: "NIST Cybersecurity Framework (CSF) 2.0 (NIST CSWP 29, Febrero 2024)",
      detail: "Secciones 1 a 3: El Core, Funciones, Categorías, Perfiles y Niveles de Implementación (Tiers), páginas 1-13. Documento público disponible en docs/NIST.CSWP.29.spa (1).pdf."
    },
    {
      doc: "Diapositivas Sesión 1: 'Ciberseguridad como Proceso de Negocio' (UPC, CB05)",
      detail: "Material pedagógico oficial de la docente, diapositivas 1 a 20. Incluye caso Target 2013, los 3 niveles de gestión y la jerarquía de gobierno. Disponible en docs/Sesion1_0 y 1_1 MON.pdf."
    },
    {
      doc: "Sílabo Oficial del Curso CB05: Procesos de Ciberseguridad (UPC, 2026)",
      detail: "Unidad 1: Marco de Ciberseguridad y Gobierno Corporativo. Disponible en docs/1ACB0005-202620-Procesos de Ciberseguridad.pdf."
    },
    {
      doc: "Análisis del Caso de Estudio: Brecha de Datos de Target Corporation (2013)",
      detail: "Reporte forense del Comité de Comercio del Senado de EE.UU. sobre la intrusión vía contratista de HVAC y alertas desatendidas de FireEye."
    }
  ]
};
