// Guía de Lectura y Comprensión Pedagógica Oficial - Sesión 3: IDENTIFY (Gestión de Activos, Riesgos y Perfiles)
// Basado directamente en: docs/Presentación - Sesion 3.pdf, docs/NIST.CSWP.29.spa (1).pdf y Sílabo CB05 (UPC)
// Diseñado para lectura pausada en celular y laptop (Scaffolding, siglas expandidas y ejemplos prácticos)

window.SESION_3_DATA = {
  id: "s3",
  number: 3,
  title: "Sesión 3: Función IDENTIFY (Gestión de Activos, Riesgos y Perfiles)",
  shortTitle: "S3: Identify",

  // 0. CABECERA PEDAGÓGICA
  header: {
    oneLiner: "No se puede proteger lo que no se conoce: IDENTIFY cataloga los activos críticos, les asigna dueños de negocio, califica su tríada CID y evalúa sus riesgos para construir el Perfil Actual (Current Profile).",
    readingTime: "12 min de lectura pausada",
    prerequisites: [
      { text: "La diferencia entre Gobierno, Riesgo y Controles (S1)", link: "s1" },
      { text: "El Core de NIST CSF 2.0 y la función Govern (S2)", link: "s2" }
    ],
    outcomes: [
      "Comprender por qué la gestión de activos (ID.AM) es el cimiento de toda la seguridad mediante el caso Equifax (2017).",
      "Asignar correctamente el Dueño del Activo (Asset Owner) al área de negocio que procesa la información, evitando el error de poner a TI o Legal.",
      "Calificar la Tríada CID (Confidencialidad, Integridad, Disponibilidad) justificando con el impacto real en el negocio.",
      "Formular riesgos bajo la estructura obligatoria de evaluación: [Consecuencia] + debido a que + [Amenaza explota Vulnerabilidad].",
      "Ponderar de forma coherente Probabilidad e Impacto para construir el Current Profile y los Tiers de la organización."
    ]
  },

  // 1. LA IDEA CENTRAL
  centralIdea: {
    problemStatement: "Una empresa puede contratar a los mejores ingenieros de seguridad y comprar herramientas avanzadas de parches, pero si no sabe qué servidores tiene encendidos, qué software está instalado en ellos ni quién es el responsable de cada base de datos, los atacantes encontrarán el activo olvidado y tomarán el control total de la red.",
    coreConcept: "La función Identify (ID) es la base empírica de NIST CSF 2.0: responde a las preguntas '¿Qué tenemos?', '¿Cuánto vale para el negocio?' y '¿Qué amenazas y vulnerabilidades lo ponen en riesgo?'. Sin este mapa, la protección (PR) dispara a ciegas y la detección (DE) no sabe qué vigilar.",
    caseConnection: "En el megaataque a Equifax (2017), los cibercriminales robaron datos personales y financieros de 147 millones de personas. La falla de entrada fue una vulnerabilidad pública en Apache Struts (CVE-2017-5638). El parche existía desde hacía meses, pero Equifax no lo aplicó porque carecía de un inventario actualizado de activos (ID.AM): no sabían en qué servidores corría la aplicación vulnerable. No puedes parchar lo que no sabes que tienes.",
    source: "Diapositivas Sesión 3, diapositivas 4, 7 y 9; NIST CSF 2.0 (CSWP 29), sección ID.AM"
  },

  // 2. VOCABULARIO, SIGLAS Y MNEMOTECNIAS
  vocabulary: {
    acronyms: [
      {
        sigla: "ID",
        english: "Identify",
        spanish: "Identificación",
        meaning: "Función de NIST CSF 2.0 encargada de comprender los activos, el contexto de negocio y los riesgos para priorizar recursos."
      },
      {
        sigla: "ID.AM",
        english: "Asset Management",
        spanish: "Gestión de Activos",
        meaning: "Categoría que inventaría, clasifica y asigna propiedad formal a hardware, software, datos, personas y proveedores."
      },
      {
        sigla: "ID.RA",
        english: "Risk Assessment",
        spanish: "Evaluación de Riesgos",
        meaning: "Categoría que identifica amenazas, vulnerabilidades, probabilidades e impactos para calcular el nivel de riesgo de cada activo."
      },
      {
        sigla: "ID.IM",
        english: "Improvement",
        spanish: "Mejora Continua",
        meaning: "Categoría que incorpora lecciones aprendidas de auditorías y eventos previos para optimizar las evaluaciones de seguridad."
      },
      {
        sigla: "CID",
        english: "Confidentiality, Integrity, Availability",
        spanish: "Confidencialidad, Integridad, Disponibilidad",
        meaning: "La tríada fundamental de objetivos de seguridad para clasificar la criticidad de un activo de información."
      },
      {
        sigla: "CMDB",
        english: "Configuration Management Database",
        spanish: "Base de Datos de Gestión de Configuración",
        meaning: "Repositorio automatizado que registra los componentes de TI (hardware, software, dependencias) y sus relaciones en tiempo real."
      },
      {
        sigla: "CVE",
        english: "Common Vulnerabilities and Exposures",
        spanish: "Vulnerabilidades y Exposiciones Comunes",
        meaning: "Diccionario público mundial que asigna un código identificador único a cada fallo de seguridad descubierto en software."
      },
      {
        sigla: "CVSS",
        english: "Common Vulnerability Scoring System",
        spanish: "Sistema Estándar de Puntuación de Vulnerabilidades",
        meaning: "Métrica técnica que califica la severidad intrínseca de una vulnerabilidad de 0.0 a 10.0 (Baja, Media, Alta, Crítica)."
      },
      {
        sigla: "PII",
        english: "Personally Identifiable Information",
        spanish: "Información de Identificación Personal (Datos Personales)",
        meaning: "Cualquier dato que permita identificar a un individuo (DNI, nombres, huellas, historiales médicos, tarjetas de crédito)."
      }
    ],
    codeReadingGuide: {
      explanation: "En la función Identify, los códigos clasifican los resultados entre la gestión de activos físicos y lógicos (ID.AM) y la valoración de amenazas (ID.RA).",
      example: "ID.AM-01",
      breakdown: [
        { part: "ID", role: "Función", desc: "Identify (Identificación) — Comprender activos y riesgos." },
        { part: "AM", role: "Categoría", desc: "Asset Management (Gestión de Activos) — Inventario y propiedad." },
        { part: "01", role: "Subcategoría", desc: "Inventario de hardware mantenido formalmente (computadoras, servidores, dispositivos de red)." }
      ],
      source: "NIST CSF 2.0 (CSWP 29), pág. 18"
    },
    mnemonics: [
      {
        name: "Los 5 Tipos de Activos Organizacionales",
        tag: "Mnemotecnia (propia, no oficial)",
        phrase: "\"H-S-D-P-T: Hay Sistemas Donde Personas Trabajan\"",
        breakdown: [
          "H → Hardware (servidores, laptops, routers, firewalls físicos)",
          "S → Software (sistemas ERP, aplicaciones web, APIs, bases de datos)",
          "D → Datos (historias clínicas, registros contables, números de tarjetas, contraseñas)",
          "P → Personas (usuarios, administradores de sistemas, directivos)",
          "T → Terceros / Proveedores (servicios cloud AWS/Azure, soporte técnico externo)"
        ]
      },
      {
        name: "La Tríada CID y sus Preguntas Clave",
        tag: "Mnemotecnia (propia, no oficial)",
        phrase: "\"C-I-D: Confidencialidad (Nadie lea), Integridad (Nadie altere), Disponibilidad (Nunca caiga)\"",
        breakdown: [
          "C → Confidencialidad: ¿Qué daño legal o comercial ocurre si un curioso o atacante lee la información?",
          "I → Integridad: ¿Qué daño causa si un atacante modifica un registro o corrompe los datos?",
          "D → Disponibilidad: ¿Qué pérdidas financieras genera si el sistema deja de operar durante varias horas?"
        ]
      }
    ]
  },

  // 3. CONCEPTOS PASO A PASO (De lo simple a lo complejo)
  stepByStepConcepts: [
    {
      id: "step-1-id-am-overview",
      order: 1,
      name: "Gestión de Activos (ID.AM): El Inventario Integral",
      whatIs: "Es el proceso sistemático de identificar, documentar y mantener actualizado el catálogo de todos los activos de la empresa: hardware, software, datos, personas y proveedores, determinando su ubicación y criticidad.",
      whyUseful: "Evita los 'sistemas sombra' (shadow IT) y servidores huérfanos. Como demostró Equifax, si una empresa no sabe qué software tiene instalado, jamás podrá aplicar parches ni protegerse de vulnerabilidades conocidas.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Una clínica mantiene un CMDB automatizado que detecta cada servidor conectado a la red, qué versión de base de datos corre y qué aplicaciones acceden a ella."
        },
        {
          label: "Ejemplo Mal",
          text: "Un banco registra sus servidores en una hoja de Excel creada en 2021 que nadie actualiza; un servidor antiguo de pruebas con datos reales queda expuesto a internet sin parches."
        }
      ],
      relationships: "ID.AM es el insumo indispensable que alimenta a la Evaluación de Riesgos (ID.RA): no puedes calcular el riesgo de un activo que no sabes que existe.",
      source: "Diapositivas Sesión 3, diapositiva 5; NIST CSF 2.0, ID.AM"
    },
    {
      id: "step-2-asset-owner",
      order: 2,
      name: "El Dueño del Activo (Asset Owner) vs. Custodio de TI vs. Usuario",
      whatIs: "El Dueño del Activo es SIEMPRE la jefatura o gerencia de negocio que genera, procesa y se beneficia de la información. El Custodio de TI es quien administra la infraestructura técnica (servidores, backups). El Usuario es quien opera el sistema en su día a día.",
      whyUseful: "Elimina la evasión de responsabilidades. Quien mejor conoce cuánto daño causaría la pérdida del dato es quien lidera el proceso de negocio, no el administrador de sistemas.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Para el padrón de postulantes y notas de una universidad: el Dueño del Activo es la Dirección de Admisión y Registros Académicos; el Custodio técnico es la Gerencia de TI (mantiene los servidores)."
        },
        {
          label: "Ejemplo Mal",
          text: "Designar al Gerente de TI o al Asesor Legal como Dueño del Activo de las historias clínicas de un hospital. Legal no atiende pacientes y TI no conoce el proceso médico; ante una auditoría, la asignación es rechazada."
        }
      ],
      relationships: "La regla de oro del examen y de la docente: el Asset Owner es SIEMPRE el área de negocio. Asignar a TI o Legal como dueño en el examen acarrea penalización inmediata de puntaje.",
      source: "Diapositivas Sesión 3, diapositiva 8"
    },
    {
      id: "step-3-cid-triad",
      order: 3,
      name: "Clasificación de Criticidad: La Tríada CID",
      whatIs: "Metodología que califica cada activo en tres dimensiones independientes: Confidencialidad (acceso no autorizado), Integridad (modificación no autorizada) y Disponibilidad (interrupción de acceso), típicamente en niveles Alto, Medio o Bajo.",
      whyUseful: "Permite enfocar los presupuestos de seguridad. No todos los sistemas requieren cifrado militar ni redundancia del 99.999%; la tríada indica exactamente qué salvaguarda necesita cada activo.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Base de datos de historias clínicas: Confidencialidad ALTA (secreto médico, ley sanciona divulgación), Integridad ALTA (un diagnóstico modificado puede matar a un paciente), Disponibilidad ALTA en emergencias."
        },
        {
          label: "Ejemplo Mal",
          text: "Catálogo público de productos de una tienda online: calificar Confidencialidad como ALTA cuando los precios e imágenes son públicos en internet, gastando presupuesto innecesario en cifrado complejo."
        }
      ],
      relationships: "La calificación CID determina qué controles de Protect (PR en S5, S6 y S7) son obligatorios y define el Impacto potencial en la evaluación de riesgos (ID.RA).",
      source: "Diapositivas Sesión 3, diapositivas 11 y 12"
    },
    {
      id: "step-4-threat-vuln-risk",
      order: 4,
      name: "Amenaza vs. Vulnerabilidad vs. Riesgo (La Ecuación Fundamental)",
      whatIs: "Una Vulnerabilidad es una debilidad interna de la empresa (un fallo de configuración, software sin parchar). Una Amenaza es un agente o factor externo con potencial hostil (cibercriminales, ransomware, desastres). El Riesgo es la posibilidad de que la amenaza explote la vulnerabilidad causando un impacto negativo en el negocio.",
      whyUseful: "Evita confundir la falla con el atacante. Tener una puerta abierta (vulnerabilidad) no genera daño por sí sola hasta que un ladrón (amenaza) la cruza para robar (riesgo).",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Vulnerabilidad: Servidor web con puerto 445 expuesto sin parches. Amenaza: Grupos cibercriminales que escanean internet buscando ransomware. Riesgo: Interrupción total de operaciones y extorsión millonaria."
        },
        {
          label: "Ejemplo Mal",
          text: "Decir que 'el phishing es una vulnerabilidad' (error: el phishing es una amenaza externa; la vulnerabilidad es la falta de concientización del empleado o la ausencia de filtros antispam)."
        }
      ],
      relationships: "Esta distinción es indispensable para redactar correctamente la fórmula de evaluación de riesgos exigida en la Parte B del examen parcial.",
      source: "Diapositivas Sesión 3, diapositivas 14 y 15"
    },
    {
      id: "step-5-risk-formula",
      order: 5,
      name: "La Fórmula Obligatoria de Redacción del Riesgo",
      whatIs: "Estructura formal de redacción exigida por la docente en los exámenes: [Consecuencia / Daño de Negocio o Sanción Legal] + debido a que + [Amenaza explota la Vulnerabilidad identificada].",
      whyUseful: "Garantiza que el riesgo se exprese en lenguaje de negocio entendible por el Directorio, conectando el impacto comercial con la causa técnica raíz.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "'Sanciones económicas y pérdida de reputación de la clínica debido a que atacantes filtran historias clínicas aprovechando un bucket de almacenamiento en la nube sin contraseña ni cifrado'."
        },
        {
          label: "Ejemplo Mal",
          text: "Escribir en el examen: 'Riesgo: Nos pueden hackear' o 'Riesgo: El servidor se cae'. Estas respuestas son penalizadas con cero puntos por no indicar consecuencia de negocio, amenaza ni vulnerabilidad."
        }
      ],
      relationships: "Conecta directamente con la Parte B del examen escrito; debe aplicarse a cada uno de los 2 activos críticos seleccionados.",
      source: "Rúbrica de Evaluación UPC CB05; Diapositivas Sesión 3, diapositiva 16"
    },
    {
      id: "step-6-prob-impact-matrix",
      order: 6,
      name: "Ponderación Coherente: Probabilidad × Impacto = Nivel de Riesgo",
      whatIs: "El cálculo del nivel de riesgo cruzando qué tan probable es que ocurra el evento (Probabilidad: 1 a 5 o Baja/Media/Alta) con la magnitud del daño que causaría al negocio (Impacto: 1 a 5 o Bajo/Medio/Alto).",
      whyUseful: "Evita sobreestimar o subestimar peligros. Permite que el Comité de Riesgos priorice qué problemas financiar primero en el plan de mitigación.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Si un servicio de pago con tarjetas está expuesto directamente a internet sin doble factor de autenticación, la Probabilidad es ALTA (los atacantes escanean continuamente) y el Impacto es ALTO (multas de pasarelas, demandas), resultando en Riesgo CRÍTICO."
        },
        {
          label: "Ejemplo Mal",
          text: "Calificar un servidor de desarrollo interno sin datos de clientes y aislado de internet como de 'Impacto Crítico y Probabilidad Alta' solo porque tiene una vulnerabilidad técnica teórica."
        }
      ],
      relationships: "La coherencia de la justificación de Probabilidad e Impacto con el caso es el criterio que define los 15 puntos de la Parte B del examen parcial.",
      source: "Diapositivas Sesión 3, diapositiva 17"
    },
    {
      id: "step-7-equifax-case",
      order: 7,
      name: "El Caso Equifax (2017): La Tragedia de no Conocer tus Activos",
      whatIs: "La brecha donde una de las tres grandes centrales de riesgo crediticio de EE.UU. perdió datos de 147 millones de consumidores debido a una falla en Apache Struts que el equipo de seguridad olvidó parchar en servidores web clave.",
      whyUseful: "Demuestra que la gestión de vulnerabilidades es inútil si la gestión de activos (ID.AM) falla: Equifax tenía escáneres de seguridad y conocía el parche, pero su inventario de software estaba tan fragmentado que el servidor web atacado nunca fue identificado para mantenimiento.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Una organización moderna mantiene un inventario de software con números de versión y dependencias (SBOM: Software Bill of Materials) que alerta automáticamente en qué servidores corre una librería vulnerable."
        },
        {
          label: "Ejemplo Mal",
          text: "Equifax en 2017: el atacante permaneció 76 días dentro de la red ejecutando consultas a más de 48 bases de datos diferentes sin ser detectado porque nadie sabía qué hacía ese servidor."
        }
      ],
      relationships: "Conecta con la necesidad de inventario de software en CIS Controls v8.1 (Control 2) y con la detección de anomalías continuas en Detect (DE).",
      source: "Diapositivas Sesión 3, diapositivas 9 y 10"
    },
    {
      id: "step-8-current-profile-identify",
      order: 8,
      name: "El Current Profile y los Tiers en la Función Identify",
      whatIs: "La evaluación sincera de cómo la organización ejecuta hoy la gestión de activos y riesgos: si maneja inventarios manuales en hojas de cálculo (Tier 1 Parcial) o si cuenta con CMDB automatizado y análisis continuo de riesgos frente al apetito directivo (Tier 3 Repetible o Tier 4 Adaptativo).",
      whyUseful: "Permite establecer la línea base real de la empresa antes de gastar presupuesto en herramientas complejas de protección.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Reconocer en el diagnóstico inicial que la empresa opera en Tier 1 en gestión de activos porque el 40% de laptops no están registradas, y fijar como Target Profile subir a Tier 3 mediante un agente de inventario centralizado."
        },
        {
          label: "Ejemplo Mal",
          text: "Afirmar que la empresa opera en Tier 4 cuando no existe un inventario de APIs y los riesgos se evalúan una vez al año de manera informal sin aprobación del Directorio."
        }
      ],
      relationships: "Es el entregable clave que se articula en el proyecto integrador del hito práctico de la Sesión 4.",
      source: "NIST CSF 2.0 (CSWP 29), pág. 10; Diapositivas Sesión 3, diapositiva 19"
    }
  ],

  // 4. CÓMO SE CONECTA TODO (Mapa conceptual / Flujo SVG)
  connectionDiagram: {
    description: "El flujo de la función Identify transforma el conocimiento de los activos en decisiones financieras de protección: mapea los activos (ID.AM), les asigna un Dueño de Negocio, califica su criticidad CID, evalúa sus riesgos específicos (ID.RA) y define el Perfil Actual para justificar los proyectos de mitigación.",
    svgContent: `
      <div class="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 760 380" class="w-full max-w-[760px] mx-auto block text-executive-900 dark:text-white" style="min-width: 320px;" aria-label="Diagrama de conexiones de Sesión 3: Función IDENTIFY">
          <rect x="10" y="10" width="740" height="360" rx="16" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="1.5" />
          
          <!-- NODO 1: INVENTARIO DE ACTIVOS (ID.AM) -->
          <g transform="translate(30, 40)">
            <rect width="210" height="70" rx="10" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-width="2"/>
            <text x="105" y="30" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">1. Inventario (ID.AM)</text>
            <text x="105" y="50" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Hardware, Software, Datos, Gente</text>
          </g>

          <!-- FLECHA 1 -> 2 -->
          <path d="M 240 75 L 280 75" stroke="#3b82f6" stroke-width="2" fill="none"/>

          <!-- NODO 2: DUEÑO DEL ACTIVO & CID -->
          <g transform="translate(280, 40)">
            <rect width="200" height="70" rx="10" fill="#8b5cf6" fill-opacity="0.12" stroke="#8b5cf6" stroke-width="2"/>
            <text x="100" y="30" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">2. Dueño & Tríada CID</text>
            <text x="100" y="50" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Área de Negocio + Conf./Integ./Disp.</text>
          </g>

          <!-- FLECHA 2 -> 3 -->
          <path d="M 480 75 L 520 75" stroke="#8b5cf6" stroke-width="2" fill="none"/>

          <!-- NODO 3: AMENAZAS & VULNERABILIDADES -->
          <g transform="translate(520, 40)">
            <rect width="210" height="70" rx="10" fill="#f59e0b" fill-opacity="0.12" stroke="#f59e0b" stroke-width="2"/>
            <text x="105" y="30" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">3. Hallazgos Técnicos</text>
            <text x="105" y="50" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Vulnerabilidades internas vs Amenazas</text>
          </g>

          <!-- FLECHA HACIA EL CENTRO -->
          <path d="M 625 110 L 625 145 L 380 145 L 380 165" stroke="#f59e0b" stroke-width="2" fill="none"/>

          <!-- NODO CENTRAL: EVALUACIÓN DE RIESGOS (ID.RA) -->
          <g transform="translate(180, 165)">
            <rect width="400" height="80" rx="12" fill="#ef4444" fill-opacity="0.15" stroke="#ef4444" stroke-width="2.5"/>
            <text x="200" y="32" text-anchor="middle" font-weight="bold" font-size="15" fill="currentColor">4. Registro de Riesgos (ID.RA)</text>
            <text x="200" y="52" text-anchor="middle" font-weight="bold" font-size="12" fill="#ef4444">Fórmula: [Consecuencia] debido a que [Amenaza explota Vulnerabilidad]</text>
            <text x="200" y="68" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.85">Nivel de Riesgo = Probabilidad (1-5) &times; Impacto (1-5)</text>
          </g>

          <!-- FLECHAS INFERIORES -->
          <path d="M 280 245 L 280 280 L 190 280 L 190 295" stroke="#10b981" stroke-width="2" fill="none"/>
          <path d="M 480 245 L 480 280 L 570 280 L 570 295" stroke="#6366f1" stroke-width="2" fill="none"/>

          <!-- NODO INFERIOR IZQUIERDO: CURRENT PROFILE -->
          <g transform="translate(60, 295)">
            <rect width="260" height="65" rx="10" fill="#10b981" fill-opacity="0.12" stroke="#10b981" stroke-width="2"/>
            <text x="130" y="28" text-anchor="middle" font-weight="bold" font-size="13" fill="currentColor">Current Profile & Tiers</text>
            <text x="130" y="47" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Línea base sincera de madurez actual</text>
          </g>

          <!-- NODO INFERIOR DERECHO: PRIORIZACIÓN PROTECT -->
          <g transform="translate(440, 295)">
            <rect width="260" height="65" rx="10" fill="#6366f1" fill-opacity="0.12" stroke="#6366f1" stroke-width="2"/>
            <text x="130" y="28" text-anchor="middle" font-weight="bold" font-size="13" fill="currentColor">Hacia Protect (PR en S5/S6/S7)</text>
            <text x="130" y="47" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Inversión priorizada por mayor riesgo</text>
          </g>
        </svg>
      </div>
    `,
    summaryText: "Identificar los activos (ID.AM) y a sus dueños de negocio permite calificar su impacto CID. Cruzar amenazas y vulnerabilidades genera el Registro de Riesgos (ID.RA) que nutre el Current Profile y define qué controles de Protect priorizar."
  },

  // 5. DIFERENCIAS CLAVE (Tablas comparativas reales)
  keyDifferences: [
    {
      id: "diff-asset-owner-vs-custodian",
      pairTitle: "Dueño del Activo (Asset Owner) vs. Custodio de TI (IT Custodian)",
      colA: "Dueño del Activo (Asset Owner)",
      colB: "Custodio de TI (IT Custodian)",
      rows: [
        { aspect: "¿Quién lo asume?", valA: "El área de negocio que procesa la información (Admisión, Finanzas, Ventas).", valB: "El área de infraestructura, soporte o base de datos de TI." },
        { aspect: "Responsabilidad principal", valA: "Define los requisitos de criticidad CID y aprueba quién tiene acceso.", valB: "Aplica las medidas técnicas (parches, servidores, copias de respaldo)." },
        { aspect: "En caso de auditoría", valA: "Rinde cuentas de por qué autorizó los permisos y la clasificación del dato.", valB: "Demuestra que la máquina está asegurada y el backup funciona." },
        { aspect: "La señal que decide", valA: "¿Quién necesita el dato para su trabajo diario de negocio? Ese es el DUEÑO.", valB: "¿Quién conecta los cables y configura el sistema operativo? Ese es el CUSTODIO." }
      ]
    },
    {
      id: "diff-vuln-vs-threat",
      pairTitle: "Vulnerabilidad vs. Amenaza",
      colA: "Vulnerabilidad (Debilidad Interna)",
      colB: "Amenaza (Agente Externo Hostil)",
      rows: [
        { aspect: "Naturaleza", valA: "Falla propia, defecto o carencia bajo control de la organización.", valB: "Factor del entorno exterior fuera del control de la organización." },
        { aspect: "Ejemplo típico", valA: "Puerto 3389 (RDP) expuesto sin contraseña fuerte o software sin parchar.", valB: "Bandas de ransomware, ciberdelincuentes o phishing masivo." },
        { aspect: "Acción correctiva", valA: "Se puede corregir, parchar o mitigar directamente con controles.", valB: "No se puede eliminar; solo se puede monitorear, detectar y resistir." },
        { aspect: "La señal que decide", valA: "Si es un defecto de los sistemas o procesos de la empresa → Vulnerabilidad.", valB: "Si es un atacante, desastre o evento que busca aprovecharse → Amenaza." }
      ]
    },
    {
      id: "diff-cvss-vs-business-risk",
      pairTitle: "Severidad Técnica (CVSS) vs. Riesgo Corporativo de Negocio",
      colA: "Severidad Técnica (CVSS)",
      colB: "Riesgo Corporativo de Negocio",
      rows: [
        { aspect: "¿Qué mide?", valA: "La facilidad técnica intrínseca para explotar una falla de software (0.0 a 10.0).", valB: "El daño financiero, legal y reputacional real si el activo es atacado." },
        { aspect: "Contexto del activo", valA: "Ignora si el servidor está en producción o en una red de prueba apagada.", valB: "Considera la exposición a internet, los datos almacenados y las leyes que aplican." },
        { aspect: "Ejemplo de discrepancia", valA: "Una falla 9.8 en un servidor de prueba aislado sin datos es técnicamente Crítica.", valB: "El riesgo corporativo real para el negocio es BAJO (no hay dinero ni datos que perder)." },
        { aspect: "La señal que decide", valA: "¿Se evalúa la vulnerabilidad de software aislada en el laboratorio? → CVSS.", valB: "¿Se evalúa el impacto en la operación y los clientes de la empresa? → Riesgo de Negocio." }
      ]
    },
    {
      id: "diff-id-am-vs-id-ra",
      pairTitle: "ID.AM (Gestión de Activos) vs. ID.RA (Evaluación de Riesgos)",
      colA: "ID.AM (Gestión de Activos)",
      colB: "ID.RA (Evaluación de Riesgos)",
      rows: [
        { aspect: "¿Qué responde?", valA: "¿Qué tenemos, dónde está y a quién le pertenece?", valB: "¿Qué puede salir mal con ese activo y cuánto nos costaría?" },
        { aspect: "Entregable típico", valA: "Inventario de activos clasificado con calificación CID y Dueño.", valB: "Matriz de riesgos con Probabilidad, Impacto y Fórmula de redacción." },
        { aspect: "Falla prototípica", valA: "Equifax en 2017: no saber en qué servidores corría Apache Struts.", valB: "Archivar un informe de pentest sin calcular si el impacto quiebra a la empresa." },
        { aspect: "La señal que decide", valA: "Si el problema es falta de inventario, software no rastreado o sin dueño → ID.AM.", valB: "Si el problema es falta de cálculo de impacto o ignorar probabilidades → ID.RA." }
      ]
    }
  ],

  // 6. PREGUNTAS PARA RAZONAR (Guía de análisis de casos escritos)
  reasoningQuestions: [
    {
      step: 1,
      question: "¿Cuáles son los 2 activos más críticos para la supervivencia del negocio en el caso?",
      action: "Identifica los activos que procesan el dinero o la información más confidencial de la empresa (ej.: base de datos de clientes, pasarela transaccional). Describe qué hacen en 2 líneas concretas."
    },
    {
      step: 2,
      question: "¿Quién es el Dueño del Activo (Asset Owner) de cada uno?",
      action: "Aplica la regla de oro: busca el área de negocio que procesa el activo (Admisión, Finanzas, Operaciones). Recuerda que poner a Legal o a TI acarreará penalización inmediata de puntaje."
    },
    {
      step: 3,
      question: "¿Cómo califico y justifico la Tríada CID para cada activo?",
      action: "Asigna Alta, Media o Baja a Confidencialidad, Integridad y Disponibilidad. Para cada una, justifica con hechos del caso: 'Confidencialidad Alta porque la Ley 29733 multa la filtración de datos de salud'."
    },
    {
      step: 4,
      question: "¿Cuáles son las 2 vulnerabilidades y 2 amenazas específicas asociadas a cada activo?",
      action: "Asegúrate de que la vulnerabilidad sea un defecto interno propio (falta de parches, credenciales por defecto) y que la amenaza sea un agente externo hostil (cibercriminales, malware)."
    },
    {
      step: 5,
      question: "¿Cómo redacto los riesgos bajo la fórmula obligatoria de la profesora?",
      action: "Usa estrictamente la plantilla: '[Consecuencia / Daño de Negocio o Multa] + debido a que + [Amenaza explota la Vulnerabilidad]'. Si omites el conector o la consecuencia comercial, perderás puntaje."
    },
    {
      step: 6,
      question: "¿Cómo justifico la Probabilidad y el Impacto de forma coherente con el caso?",
      action: "Si el sistema está expuesto a internet sin controles, la probabilidad es Alta. Si compromete la operación total o acarrea multas millonarias, el impacto es Alto. Nivel = Probabilidad × Impacto."
    }
  ],

  // 7. ERRORES TÍPICOS ("Si piensas X, ojo: ...")
  typicalErrors: [
    {
      ifYouThink: "Si piensas que el Gerente de TI o Asesoría Legal pueden ser los Dueños del Activo (Asset Owner)...",
      watchOut: "Ojo: El Dueño del Activo es SIEMPRE el área de negocio que procesa y se beneficia de la información (Admisión, Finanzas, Ventas). TI solo es custodio técnico; Legal solo asesora. Poner a TI o Legal resta puntaje inmediato en el examen."
    },
    {
      ifYouThink: "Si piensas que un riesgo se redacta simplemente diciendo 'Riesgo: Ataque de phishing'...",
      watchOut: "Ojo: El phishing es una amenaza, no un riesgo. La profesora exige la fórmula: [Consecuencia comercial/legal] debido a que [Amenaza explota Vulnerabilidad]. Ejemplo: 'Pérdida financiera por transferencias ilícitas debido a que atacantes engañan a tesorería mediante correos fraudulentos aprovechando la falta de capacitación'."
    },
    {
      ifYouThink: "Si piensas que una vulnerabilidad con CVSS 10.0 siempre representa un Riesgo Crítico para el negocio...",
      watchOut: "Ojo: Si el servidor afectado está en una red aislada de pruebas sin internet y sin datos reales, la probabilidad de ataque es casi nula y el impacto es cero. Riesgo = Probabilidad × Impacto; sin valor en juego, el riesgo de negocio disminuye."
    },
    {
      ifYouThink: "Si piensas que puedes justificar 'Impacto Alto' diciendo únicamente que 'el sistema es muy crítico'...",
      watchOut: "Ojo: La docente rechaza 'es un sistema crítico' como justificación. El impacto debe sustentarse con la consecuencia concreta descrita en el texto: monto económico en riesgo, número de registros expuestos, horas de parálisis operativa o sanciones legales específicas."
    },
    {
      ifYouThink: "Si piensas que en el caso Equifax (2017) la culpa fue exclusivamente de Apache Struts por tener un bug...",
      watchOut: "Ojo: El parche de Apache Struts existía desde hacía meses. Equifax falló en gestión de activos (ID.AM) porque no sabía en qué servidores estaba instalada la librería y no pudo parcharla a tiempo."
    },
    {
      ifYouThink: "Si piensas que calificar CID significa poner 'Alta' a las tres dimensiones por defecto...",
      watchOut: "Ojo: Si no justificas con argumentos de negocio por qué es Alta, Media o Baja, la respuesta es invalidada. Un catálogo público de productos tiene Disponibilidad Alta pero Confidencialidad Baja."
    },
    {
      ifYouThink: "Si piensas que los activos son únicamente computadoras y servidores físicos...",
      watchOut: "Ojo: Los activos más valiosos son los Datos (PII, tarjetas, historiales) y las Personas (administradores con credenciales privilegiadas). Ambos deben catalogarse en ID.AM."
    }
  ],

  // 8. PARA PROFUNDIZAR (Colapsado, opcional)
  deepDive: [
    {
      title: "Vínculo con ISO/IEC 27005: Metodologías de Gestión del Riesgo",
      content: "La norma ISO/IEC 27005 proporciona directrices para la gestión del riesgo de seguridad de la información. Define el proceso de valoración de riesgos en cuatro etapas: identificación, análisis, evaluación y tratamiento (mitigar, transferir, evitar o aceptar el riesgo dentro del apetito corporativo)."
    },
    {
      title: "El Concepto de SBOM (Software Bill of Materials)",
      content: "Para evitar desastres como el de Equifax (2017) o Log4j (2021), la industria moderna exige un SBOM: una lista formal de todos los componentes, librerías y dependencias de código abierto que integran una aplicación de software, permitiendo identificar en segundos qué servidores están afectados cuando se publica un nuevo CVE."
    },
    {
      title: "Subcategorías Oficiales de ID.RA en NIST CSF 2.0",
      content: "NIST CSWP 29 detalla 10 subcategorías para ID.RA (ID.RA-01 a ID.RA-10), incluyendo la identificación de vulnerabilidades en activos (RA-01), inteligencia de amenazas cibernéticas (RA-02), estimación de impacto potencial (RA-04) y priorización de respuestas según apetito de riesgo (RA-07)."
    }
  ],

  // 9. FUENTES DE LA SESIÓN
  sources: [
    {
      doc: "NIST Cybersecurity Framework (CSF) 2.0 (NIST CSWP 29, 2024)",
      detail: "Función Identify (ID), categorías ID.AM (Gestión de Activos), ID.RA (Evaluación de Riesgos) e ID.IM (Mejora Continua), páginas 18-20. Documento público disponible en docs/NIST.CSWP.29.spa (1).pdf."
    },
    {
      doc: "Diapositivas Sesión 3: 'Identify: Gestión de Activos y Riesgos' (UPC, CB05)",
      detail: "Material pedagógico oficial de la docente, diapositivas 1 a 22. Incluye caso Equifax 2017, la regla del Dueño del Activo de Negocio, Tríada CID y fórmula de riesgos. Disponible en docs/Presentación - Sesion 3.pdf."
    },
    {
      doc: "Rúbricas de Evaluación del Examen Parcial (UPC CB05, 2026)",
      detail: "Criterios estrictos de la Parte B: penalización de Dueño del Activo asignado a TI/Legal y exigencia de la fórmula [Consecuencia] + debido a que + [Amenaza explota Vulnerabilidad]."
    },
    {
      doc: "Reporte de Investigación del Senado de EE.UU.: Caso Equifax Inc. (2018)",
      detail: "Análisis forense de la brecha de 147 millones de consumidores por falta de visibilidad en el inventario de software de Apache Struts (CVE-2017-5638)."
    }
  ]
};
