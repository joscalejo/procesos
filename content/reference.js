// Marcos de Referencia Oficiales - Procesos de Ciberseguridad (CB05, UPC)
// Bloque 1: NIST CSF 2.0 (NIST CSWP 29)
// Bloque 2: Zero Trust Architecture (NIST SP 800-207)
// Bloque 3: CIS Controls v8.1 (Center for Internet Security)

window.NIST_CSF_REFERENCE = {
  functions: [
    {
      code: "GV",
      name: "Govern (Gobierno)",
      description: "Establece y monitorea la estrategia de gestión de riesgos de ciberseguridad, expectativas y políticas organizacionales transversales.",
      categories: [
        { code: "GV.OC", name: "Contexto Organizacional", clue: "¿No se entendió la misión, las obligaciones legales/regulatorias o la criticidad del negocio?" },
        { code: "GV.RM", name: "Estrategia de Gestión de Riesgos", clue: "¿Faltan apetito/tolerancia al riesgo o un proceso formal que garantice que todo riesgo identificado se evalúe, asigne y trate?" },
        { code: "GV.RR", name: "Roles, Responsabilidades y Autoridad", clue: "¿Quién decide o aprueba? ¿Alguien decidió sin autoridad delegada, o quedó un cargo vacante sin interino?" },
        { code: "GV.PO", name: "Políticas", clue: "¿Falta la política o el procedimiento escrito, o no está formalmente comunicado a la organización?" },
        { code: "GV.OV", name: "Supervisión (Overview)", clue: "¿Existe la política pero nadie verifica que se cumpla, ni la Junta recibe reportes periódicos de desempeño?" },
        { code: "GV.SC", name: "Gestión de Riesgo en Cadena de Suministro", clue: "¿Involucra a un tercero (proveedores, contratistas, accesos externos sin revisión o revocación)?" }
      ]
    },
    {
      code: "ID",
      name: "Identify (Identificación)",
      description: "Comprende los activos de la organización, los riesgos actuales y los procesos de mejora continua para priorizar la protección.",
      categories: [
        { code: "ID.AM", name: "Gestión de Activos", clue: "¿Se desconoce qué hardware, software, datos, personas o proveedores operan en la organización?" },
        { code: "ID.RA", name: "Evaluación de Riesgos", clue: "¿Se identificaron las amenazas y vulnerabilidades específicas para calcular probabilidad e impacto de cada riesgo?" },
        { code: "ID.IM", name: "Mejora Continua", clue: "¿Se ignoran las lecciones aprendidas de incidentes o auditorías previas para optimizar el programa?" }
      ]
    },
    {
      code: "PR",
      name: "Protect (Protección)",
      description: "Aplica salvaguardas para garantizar la entrega de servicios críticos y contener el impacto de potenciales eventos.",
      categories: [
        { code: "PR.AA", name: "Gestión de Identidad, Autenticación y Control de Acceso", clue: "¿Falla la autenticación (MFA), el acceso condicional o la gestión de credenciales privilegiadas?" },
        { code: "PR.AT", name: "Concientización y Capacitación", clue: "¿El personal incurre en errores humanos por falta de formación o simulaciones de phishing?" },
        { code: "PR.DS", name: "Seguridad de Datos", clue: "¿Los datos en reposo o tránsito carecen de cifrado, DLP o mecanismos de destrucción segura?" },
        { code: "PR.PS", name: "Seguridad de Plataformas y Software", clue: "¿Los servidores, endpoints o aplicaciones carecen de hardening, parches o pruebas de código seguro?" },
        { code: "PR.IR", name: "Resiliencia de la Infraestructura Tecnológica", clue: "¿Faltan capacidades de respaldo (backups) inmutables o tolerancia a fallos en la infraestructura?" }
      ]
    },
    {
      code: "DE",
      name: "Detect (Detección)",
      description: "Descubre y analiza anomalías y eventos potenciales de ciberseguridad en tiempo oportuno.",
      categories: [
        { code: "DE.CM", name: "Monitoreo Continuo", clue: "¿Falta telemetría en tiempo real sobre la red, terminales (EDR) o cuentas de usuario?" },
        { code: "DE.AE", name: "Análisis de Eventos Adversos", clue: "¿Se detectaron comportamientos o anomalías pero no se investigan con herramientas analíticas (SIEM/SOC)?" }
      ]
    },
    {
      code: "RS",
      name: "Respond (Respuesta)",
      description: "Acciones ejecutadas al confirmarse un incidente para contener el impacto y mitigar daños colaterales.",
      categories: [
        { code: "RS.MA", name: "Gestión de Incidentes", clue: "¿No se activó el plan de respuesta ni se coordinó la atención inmediata del ataque?" },
        { code: "RS.AN", name: "Análisis del Incidente", clue: "¿Se desconoce la causa raíz, el alcance o el vector de entrada del ciberataque?" },
        { code: "RS.CO", name: "Comunicación de Respuesta", clue: "¿No se informó oportunamente a las áreas internas, clientes o autoridades regulatorias afectadas?" },
        { code: "RS.MI", name: "Mitigación", clue: "¿Faltaron acciones de contención inmediata (ej. aislar máquinas de la red, revocar tokens) para frenar la propagación?" }
      ]
    },
    {
      code: "RC",
      name: "Recover (Recuperación)",
      description: "Restablece las capacidades y servicios afectados tras un incidente de ciberseguridad a su operación normal.",
      categories: [
        { code: "RC.RP", name: "Ejecución del Plan de Recuperación", clue: "¿Falla la restauración de sistemas críticos desde respaldos seguros hacia la operación normal?" },
        { code: "RC.CO", name: "Comunicación de Recuperación", clue: "¿No se gestionan las comunicaciones públicas, cierre reputacional ni actualización de lecciones post-incidente?" }
      ]
    }
  ],
  profiles: {
    title: "Perfiles de Ciberseguridad (Profiles)",
    description: "Herramienta de alineación del NIST CSF 2.0 para medir el estado real versus la meta deseada de la organización.",
    currentProfile: {
      name: "Current Profile (Perfil Actual)",
      definition: "Describe los resultados de ciberseguridad que la organización está alcanzando actualmente en cada subcategoría.",
      purpose: "Sirve como diagnóstico de línea base sincero sobre qué controles existen realmente hoy."
    },
    targetProfile: {
      name: "Target Profile (Perfil Objetivo)",
      definition: "Describe los resultados que la organización necesita alcanzar para satisfacer sus objetivos de negocio y apetito de riesgo.",
      purpose: "Define el estado futuro deseado hacia donde se canalizan las inversiones y proyectos."
    },
    gapAnalysis: {
      name: "Gap Analysis (Análisis de Brechas)",
      definition: "La comparación metódica entre el Current Profile y el Target Profile.",
      purpose: "Identifica las brechas de control y permite generar un plan de acción priorizado por riesgo y presupuesto."
    }
  },
  tiers: {
    title: "Niveles de Implementación (Implementation Tiers)",
    description: "Proporcionan contexto sobre cómo una organización gestiona su riesgo de ciberseguridad. NIST CSF 2.0 (CSWP 29, Sec. 3.2) aclara explícitamente que los Tiers NO son niveles de madurez tipo CMMI (no es obligatorio buscar llegar al Tier 4), sino grados de rigor y formalidad en la gobernanza del riesgo.",
    levels: [
      {
        tier: "Tier 1: Parcial (Partial)",
        caracteristica: "Procesos informales y reactivos. Poca o nula conciencia de riesgos a nivel corporativo; la seguridad se maneja de manera ad-hoc por iniciativas individuales."
      },
      {
        tier: "Tier 2: Informado por el Riesgo (Risk Informed)",
        caracteristica: "Existe conciencia directiva de los riesgos, pero las prácticas de gestión no están formalmente aprobadas como política general de la empresa."
      },
      {
        tier: "Tier 3: Repetible (Repeatable)",
        caracteristica: "Las políticas de gestión de riesgos están formalmente aprobadas por la alta dirección, comunicadas y se actualizan con base en auditorías regulares."
      },
      {
        tier: "Tier 4: Adaptativo (Adaptive)",
        caracteristica: "La organización adapta su postura y controles en tiempo real con base en análisis predictivo, lecciones aprendidas y telemetría continua de amenazas."
      }
    ]
  },
  invalid_distractors: [
    "ID.RR (No existe en NIST CSF. Roles y Responsabilidades pertenece a Govern: GV.RR)",
    "PR.SC (No existe en Protect. Cadena de suministro pertenece a Govern: GV.SC)",
    "DE.RA (No existe en Detect. Evaluación de riesgos pertenece a Identify: ID.RA)",
    "GV.AM (No existe en Govern. Gestión de activos pertenece a Identify: ID.AM)",
    "RS.PO (No existe en Respond. Políticas pertenece a Govern: GV.PO)"
  ],
  frameworkConfusions: [
    {
      pair: "Profiles vs. Tiers",
      signal: "La señal que decide: ¿El enunciado habla del QUÉ resultados logra/quiere la organización? → Profiles. ¿Habla del CUÁN formal/rigurosa es la gestión de riesgos? → Tiers.",
      profileDesc: "Profiles describen QUÉ resultados de ciberseguridad logra la organización actualmente (Current Profile) o quiere lograr (Target Profile). Son el mapa de estado vs. meta.",
      tiersDesc: "Tiers describen CUÁN formal y rigurosa es la gestión de riesgos: Tier 1 = ad-hoc/reactivo, Tier 2 = informado por riesgo, Tier 3 = repetible/formalizado, Tier 4 = adaptativo/predictivo.",
      trap: "Trampa frecuente: los Tiers NO son niveles de madurez técnica de seguridad tipo CMMI (ej. 'Tier 4 significa tener firewall de última generación'). Miden el rigor y formalidad del PROCESO de gestión de riesgos, no la sofisticación técnica de las herramientas."
    },
    {
      pair: "Current Profile vs. Target Profile",
      signal: "La señal que decide: ¿El enunciado describe el estado real y actual de los controles? → Current Profile. ¿Describe la meta futura o el estado deseado? → Target Profile. ¿Describe la brecha entre ambos? → Gap Analysis.",
      currentDesc: "Current Profile = diagnóstico honesto del estado HOY: qué subcategorías del CSF se están cumpliendo realmente en la organización en el momento del análisis.",
      targetDesc: "Target Profile = meta de mañana: qué subcategorías deben cumplirse para satisfacer los objetivos de negocio y el apetito de riesgo declarado.",
      trap: "Trampa frecuente: confundir Target Profile con Tier 4. El Tier mide el rigor del proceso de gestión de riesgos; el Target Profile mide los resultados concretos de seguridad que se desean alcanzar. Son dimensiones ortogonales: una organización puede tener un proceso Tier 3 (bien formalizado) con un Target Profile que no incluya todos los controles del CSF."
    }
  ],
  structuralTriad: {
    title: "La Tríada Estructural de NIST CSF 2.0",
    description: "NIST CSF 2.0 se organiza en tres componentes interconectados que articulan la gestión integral de ciberseguridad en la empresa:",
    components: [
      {
        name: "1. El Núcleo (Core)",
        detail: "Estructura taxonómica jerárquica de 6 Funciones, 22 Categorías y 106 Subcategorías que describen los RESULTADOS deseados de ciberseguridad, sin imponer tecnologías específicas ni soluciones propietarias."
      },
      {
        name: "2. Los Perfiles Organizacionales (Profiles)",
        detail: "Mapeo de los resultados del Núcleo adaptados a la misión, prioridades del negocio, apetito de riesgo y recursos presupuestarios. Permite comparar el estado real (Current Profile) con la meta corporativa (Target Profile) mediante un Análisis de Brechas (Gap Analysis)."
      },
      {
        name: "3. Los Niveles de Implementación (Tiers)",
        detail: "Describen el grado de rigor, formalidad e integración corporativa con la que la organización gestiona su riesgo (del Tier 1 Parcial al Tier 4 Adaptativo). Miden la cultura y madurez del PROCESO de riesgo, no la sofisticación técnica de los equipos."
      }
    ]
  },
  governanceVsRiskVsOps: {
    title: "Diferenciación Clave: Gobierno vs. Gestión de Riesgos vs. Controles Operativos",
    description: "Distinción conceptual obligatoria para el examen parcial UPC CB05 que resuelve las dudas de frontera entre niveles organizacionales:",
    pillars: [
      {
        level: "Gobierno de Ciberseguridad (Govern / GV)",
        focus: "¿Quién decide, qué políticas rigen y ante quién se rinde cuentas fiduciarias?",
        scope: "Estrategia de negocio, apetito y tolerancia al riesgo, políticas organizacionales escritas, asignación formal de roles y autoridad delegada (matriz RACI), gestión de riesgo en la cadena de suministro (GV.SC) y supervisión continua del Directorio (GV.OV).",
        badge: "bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 border-blue-300 dark:border-blue-800"
      },
      {
        level: "Gestión de Riesgos (Risk Management / ID.RA, GV.RM)",
        focus: "¿Cuáles son las amenazas y vulnerabilidades, y cómo tratamos los hallazgos según el apetito?",
        scope: "Identificación de activos críticos de negocio, estimación cuantitativa/cualitativa de probabilidad e impacto, registro de riesgos corporativo y priorización metodológica de su tratamiento (mitigar con controles, transferir con pólizas, evitar o aceptar formalmente con firma del Directorio).",
        badge: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-800"
      },
      {
        level: "Controles Operativos (Operations / Protect & Detect)",
        focus: "¿Qué salvaguardas técnicas y procesos protegen y vigilan día a día la infraestructura?",
        scope: "Autenticación multifactor (MFA), configuración segura (hardening), gestión de parches, cifrado de datos en reposo y tránsito, agentes EDR en terminales, monitoreo de registros (logs) y aislamiento de incidentes.",
        badge: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800"
      }
    ]
  },
  commonDoubts: [
    {
      question: "¿Por qué NIST CSF 2.0 agregó GOVERN como 6ta función en el centro?",
      answer: "En NIST CSF 1.1 existían 5 funciones (IPDRR: Identify, Protect, Detect, Respond, Recover). La versión 2.0 situó a GOVERN (GV) en el núcleo porque la experiencia de ciberataques globales demostró que las salvaguardas técnicas fracasan silenciosamente si la alta dirección no fija políticas claras, apetito de riesgo, facultades fiduciarias y supervisión periódica. La ciberseguridad es un riesgo estratégico de negocio que compete al Directorio, no un mero problema de TI."
    },
    {
      question: "¿Los Tiers del NIST CSF son niveles de madurez tipo CMMI? ¿Y por qué el sílabo habla de 'perfil de madurez'?",
      answer: "NO son niveles de madurez tipo CMMI. NIST CSF 2.0 (sección 3.2 de CSWP 29) recalca explícitamente que los Tiers (Tier 1 a Tier 4) no representan etapas obligatorias que toda organización deba escalar hasta llegar al 4. Los Tiers caracterizan el RIGOR Y FORMALIDAD con que se gestiona el riesgo de ciberseguridad, no la sofisticación de las herramientas ni una escala de cumplimiento forzosa. Operar en Tier 2 o Tier 3 es perfectamente adecuado si el apetito de riesgo de la empresa no justifica los costos de un Tier 4.\n\nRespecto al sílabo: el término 'perfil de madurez' que usa el sílabo describe informalmente el Análisis de Brechas (Gap Analysis) entre el Perfil Actual (Current Profile) y el Perfil Objetivo (Target Profile), contextualizado por el rigor del proceso (Tier)."
    },
    {
      question: "¿El NIST CSF 2.0 impone marcas de software o controles prescriptivos obligatorios?",
      answer: "NO. El CSF 2.0 es agnóstico a proveedores y está basado en resultados (outcome-based). Establece QUÉ resultado organizativo debe alcanzarse (ej. 'las identidades se autentican y los accesos se revocan'), pero no prescribe qué marca de firewall o software de IAM adquirir. Para el detalle técnico prescriptivo, se complementa con catálogos como CIS Controls v8.1 o NIST SP 800-53."
    }
  ]
};

window.NIST_SP_800_207_REFERENCE = {
  title: "NIST SP 800-207: Zero Trust Architecture (ZTA)",
  subtitle: "Arquitectura de Seguridad sin Perímetro Implícito (Sílabo / CISA y NIST SP 800-207)",
  definition: "Zero Trust es un paradigma arquitectónico que elimina la confianza implícita por zona de red. En el curso CB05 convergen dos fuentes pedagógicas: el modelo del sílabo basado en CISA / Microsoft (3 principios rectores y 6 dominios de arquitectura) y el estándar formal NIST SP 800-207 (7 tenets normativos y arquitectura lógica de control PDP/PEP).",
  threePrinciples: [
    {
      name: "1. Verify Explicitly (Verificar Explícitamente)",
      detail: "Siempre autenticar y autorizar basándose en todos los puntos de datos disponibles: identidad del usuario, ubicación, salud del dispositivo, servicio o carga de trabajo, y clasificación de los datos."
    },
    {
      name: "2. Least Privilege (Privilegio Mínimo)",
      detail: "Limitar el acceso de los usuarios con acceso Just-In-Time (JIT) y Just-Enough-Access (JEA), políticas adaptativas basadas en riesgo y protección de datos."
    },
    {
      name: "3. Assume Breach (Asumir la Brecha)",
      detail: "Minimizar el radio de impacto segmentando el acceso por red, usuario, dispositivos y aplicaciones. Cifrar todas las sesiones de extremo a extremo y utilizar telemetría para obtener visibilidad e impulsar la detección de amenazas."
    }
  ],
  sevenTenets: [
    { number: 1, title: "Todos los orígenes de datos y servicios de cómputo son recursos.", desc: "Cualquier servidor, base de datos, API, dispositivo IoT o archivo se trata individualmente como recurso protegido." },
    { number: 2, title: "Toda comunicación está asegurada independientemente de la ubicación de red.", desc: "Estar dentro de la oficina física o red LAN no otorga privilegios ni exime de cifrado (TLS)." },
    { number: 3, title: "El acceso a recursos individuales se otorga por sesión dinámica.", desc: "La autenticación previa no concede acceso ilimitado a otros recursos ni a la misma sesión indefinidamente." },
    { number: 4, title: "El acceso se determina por una política dinámica basada en contexto.", desc: "Se evalúa identidad, postura de seguridad del dispositivo, geolocalización y patrones de comportamiento en cada intento." },
    { number: 5, title: "La organización monitorea y mide la integridad y seguridad de todos los activos.", desc: "Ningún dispositivo accede a recursos corporativos si carece de parches al día, cifrado de disco o EDR activo." },
    { number: 6, title: "La autenticación y autorización son estrictamente dinámicas y continuas.", desc: "Se impone MFA y re-evaluación continua de tokens de sesión antes y durante el consumo de servicios." },
    { number: 7, title: "La organización recopila tanta telemetría como sea posible para mejorar la postura.", desc: "Los registros de red, accesos e incidentes alimentan el análisis de mejora continua de las reglas de decisión." }
  ],
  architectureComponents: {
    description: "NIST SP 800-207 divide la arquitectura lógica en dos planos fundamentales: el Plano de Control (Control Plane) y el Plano de Datos (Data Plane).",
    components: [
      {
        name: "Policy Engine (PE) — Motor de Políticas",
        plane: "Plano de Control (PDP)",
        role: "Es el cerebro analítico. Toma la decisión definitiva de conceder, revocar o denegar el acceso a un recurso basándose en las reglas organizacionales y datos contextuales."
      },
      {
        name: "Policy Administrator (PA) — Administrador de Políticas",
        plane: "Plano de Control (PDP)",
        role: "Es el ejecutor del plano de control. Da la orden técnica para emitir o revocar credenciales de sesión y comanda al PEP para abrir o cerrar el canal de comunicación."
      },
      {
        name: "Policy Enforcement Point (PEP) — Punto de Aplicación de Políticas",
        plane: "Plano de Datos (Data Plane)",
        role: "Es el guardián de la puerta en el flujo de tráfico real. Intercepta, inspecciona y habilita o bloquea físicamente las conexiones entre el usuario y el recurso."
      }
    ]
  },
  relationWithCsf: {
    csfRole: "NIST CSF 2.0 es el MARCO DE GESTIÓN Y GOBIERNO:",
    csfDesc: "Responde a 'QUÉ' resultados organizacionales debemos buscar (políticas GV.PO, gestión de identidades PR.AA, monitoreo DE.CM).",
    ztRole: "NIST SP 800-207 es el MODELO DE ARQUITECTURA TÉCNICA:",
    ztDesc: "Responde a 'CÓMO' estructurar técnicamente la red, identidades y endpoints para cumplir esos requisitos sin confiar ciegamente en perímetros físicos."
  },
  componentConfusions: [
    {
      pair: "PDP (Policy Decision Point) vs. PEP (Policy Enforcement Point)",
      signal: "La señal que decide: ¿Quién DECIDE si concede o deniega el acceso? → PDP (PE + PA). ¿Quién BLOQUEA o DEJA PASAR el tráfico real? → PEP.",
      pdpDesc: "PDP = PE + PA juntos forman el Plano de Control. El PE (cerebro) evalúa la política y toma la decisión; el PA (ejecutor de control) emite o revoca las credenciales de sesión y ordena al PEP abrir o cerrar el canal.",
      pepDesc: "PEP = Plano de Datos. Es el guardián físico de la puerta en el flujo de tráfico real: intercepta la solicitud de acceso, consulta la decisión del PDP y aplica (permite o bloquea) la conexión entre el sujeto y el recurso.",
      trap: "Trampa frecuente: el PEP no decide nada por sí mismo. Solo obedece las órdenes del PDP. Si el enunciado dice 'el componente que evalúa la política y determina si se otorga acceso', la respuesta es PDP, no PEP."
    },
    {
      pair: "CSF 2.0 vs. NIST SP 800-207 (Zero Trust)",
      signal: "La señal que decide: ¿El enunciado habla de GESTIÓN, GOBIERNO, POLÍTICAS o RESULTADOS organizacionales? → CSF 2.0. ¿Habla de ARQUITECTURA TÉCNICA, segmentación de red, PEP/PDP o implementación sin perímetro? → NIST SP 800-207.",
      csfRole: "NIST CSF 2.0 es el marco de GESTIÓN Y GOBIERNO (el QUÉ): define qué resultados organizacionales de ciberseguridad se deben alcanzar a través de sus funciones (GV, ID, PR, DE, RS, RC).",
      ztRole: "NIST SP 800-207 es el modelo de ARQUITECTURA TÉCNICA (el CÓMO): especifica cómo estructurar técnicamente redes, identidades y flujos de acceso bajo el paradigma Zero Trust para eliminar la confianza implícita por zona de red.",
      trap: "Trampa frecuente: CSF y Zero Trust NO son alternativas ni competidores entre sí. Zero Trust implementa técnicamente lo que el CSF define como objetivos de gobierno (ej. PR.AA define que se debe gestionar el acceso → ZT define el PEP/PDP como arquitectura para cumplirlo)."
    }
  ],
  perimeterModelFailure: {
    title: "¿Por qué Fracasó el Modelo Perimetral Tradicional (\"Castillo y Foso\")?",
    subtitle: "Los 4 límites críticos que obligaron a adoptar la Arquitectura Zero Trust (NIST SP 800-207):",
    points: [
      {
        flaw: "1. Confianza Ciega e Implícita en la Red Interna (LAN)",
        detail: "El modelo tradicional asumía que cualquier dispositivo dentro del cable de red o conectado por VPN corporativa era confiable por defecto. Una vez superado el firewall perimetral, el atacante operaba sin obstáculos internos."
      },
      {
        flaw: "2. Movimiento Lateral Incontrolado",
        detail: "Si un intruso comprometía la computadora de una recepcionista o una laptop de soporte mediante phishing, podía escanear la subred completa y saltar libremente hacia bases de datos críticas o controladores de dominio."
      },
      {
        flaw: "3. Disolución del Perímetro Físico (Nube, SaaS y Teletrabajo)",
        detail: "Hoy los colaboradores acceden desde sus hogares y las cargas de trabajo residen en nubes públicas híbridas (AWS, Azure, Microsoft 365). Ya no existe una 'oficina fortificada' que aislar; la IDENTIDAD y el DISPOSITIVO son el nuevo perímetro de seguridad."
      },
      {
        flaw: "4. Robo de Credenciales Legítimas y Amenaza Interna",
        detail: "Ataques emblemáticos (como la Operación Aurora en 2009 o el caso Target en 2013) evidenciaron que los adversarios modernos no derriban firewalls: usan credenciales válidas robadas a contratistas o colaboradores, pareciendo usuarios normales ante el perímetro."
      }
    ]
  },
  sixDomains: [
    { domain: "1. Identidades", focus: "Autenticación continua, MFA resistente a phishing (FIDO2) y evaluación de riesgo contextual en cada inicio de sesión." },
    { domain: "2. Endpoints / Terminales", focus: "Validación de postura de salud (EDR activo, disco cifrado, SO parchado) antes de conceder cualquier token de acceso." },
    { domain: "3. Aplicaciones", focus: "Micro-acceso Just-In-Time a nivel de aplicación con privilegios mínimos, validación de APIs y ciclo de desarrollo seguro (SSDLC)." },
    { domain: "4. Datos", focus: "Clasificación formal de información, cifrado robusto en reposo y tránsito, y políticas de DLP para impedir exfiltración no autorizada." },
    { domain: "5. Infraestructura", focus: "Microsegmentación de cargas de trabajo en la nube, hardening de servidores y accesos efímeros Just-Enough-Access (JEA)." },
    { domain: "6. Redes", focus: "Eliminación de la confianza por zona de red local, segmentación lógica estricta y cifrado obligatorio de tráfico extremo a extremo." }
  ],
  commonDoubts: [
    {
      question: "¿Zero Trust significa que desconfiamos de los colaboradores y el trabajo se vuelve imposible?",
      answer: "NO. Zero Trust no es paranoia humana hacia las personas: es una arquitectura técnica que sustituye la confianza estática basada en ubicación por una verificación dinámica basada en evidencia (identidad verificada + equipo sano + solicitud legítima). Para el colaborador válido, permite trabajar con total libertad y seguridad desde cualquier lugar del mundo."
    },
    {
      question: "¿Comprar un firewall de última generación (NGFW) convierte nuestra red en Zero Trust?",
      answer: "NO. Zero Trust no es una caja de hardware ni un producto comercial que se adquiera en una tienda. Es un paradigma y una estrategia arquitectónica transversal que integra identidades, dispositivos, datos y redes bajo el mandato de verificar siempre y asumir la brecha."
    },
    {
      question: "¿Cuál es la diferencia exacta entre el PE (Policy Engine) y el PA (Policy Administrator)?",
      answer: "El Policy Engine (PE) es el CEREBRO analítico del plano de control: procesa las políticas y los datos de contexto para emitir el veredicto de conceder o denegar acceso. El Policy Administrator (PA) es el EJECUTOR del plano de control: recibe la decisión del PE y comanda técnicamente al PEP para emitir tokens temporales o abrir el canal. Juntos constituyen el PDP (Policy Decision Point)."
    }
  ]
};

window.CIS_CONTROLS_REFERENCE = {
  title: "CIS Controls v8.1 (Center for Internet Security)",
  subtitle: "Guía Práctica y Priorizada de Salvaguardas Esenciales de Ciberseguridad",
  definition: "Los Controles de Seguridad de CIS son un conjunto priorizado de salvaguardas de defensa cibernética formuladas para mitigar los vectores de ataque más comunes. Nota de alineación con el curso: CIS Control 1 aparece citado expresamente en las diapositivas de la Sesión 6 (diapositiva 29) y la versión v8.1 se menciona en la diapositiva 35. Los demás controles específicos aquí detallados no figuran en las diapositivas disponibles en docs/; se incluyen como material de referencia curricular mapeado a los temas del sílabo (verificar con diapositivas si el docente los evaluó en clase).",
  implementationGroups: [
    {
      group: "IG1 — Higiene Cibernética Básica (Essential Cyber Hygiene)",
      target: "Empresas pequeñas y medianas con recursos de TI limitados.",
      focus: "Fundación indispensable de seguridad para resistir ataques oportunistas y masivos (56 salvaguardas)."
    },
    {
      group: "IG2 — Mayor Complejidad y Datos Sensibles",
      target: "Empresas medianas o grandes con múltiples áreas operativas y procesamiento de información confidencial.",
      focus: "Salvaguardas intermedias para proteger contra amenazas dirigidas y pérdida de datos (130 salvaguardas)."
    },
    {
      group: "IG3 — Alto Riesgo e Infraestructura Crítica",
      target: "Organizaciones expuestas a ataques persistentes avanzados (APTs) o requisitos regulatorios estrictos.",
      focus: "Salvaguardas completas de máxima madurez para mitigar adversarios sofisticados (153 salvaguardas)."
    }
  ],
  controlsList: [
    { id: 1, name: "Inventario y Control de Activos Empresariales", summary: "Descubrir y rastrear todo hardware corporativo conectado a la infraestructura para evitar dispositivos no autorizados.", courseHighlight: false },
    { id: 2, name: "Inventario y Control de Activos de Software", summary: "Identificar y autorizar el software instalado en los sistemas para bloquear ejecutables maliciosos o no licenciados.", courseHighlight: false },
    { id: 3, name: "Protección de Datos", summary: "Clasificar, cifrar y gestionar la retención y destrucción segura de datos confidenciales según su criticidad.", courseHighlight: true },
    { id: 4, name: "Configuración Segura de Activos Empresariales y Software", summary: "Establecer y mantener configuraciones endurecidas (hardening) en servidores, terminales y routers según guías base.", courseHighlight: true },
    { id: 5, name: "Gestión de Cuentas", summary: "Asignar, monitorear y revocar credenciales de usuario y cuentas privilegiadas evitando contraseñas compartidas.", courseHighlight: true },
    { id: 6, name: "Gestión del Control de Acceso", summary: "Imponer autenticación multifactor (MFA) y accesos basados en privilegios mínimos según el rol de negocio.", courseHighlight: true },
    { id: 7, name: "Gestión Continua de Vulnerabilidades", summary: "Escanear y remediar vulnerabilidades de software y sistemas operativos mediante planes formales de parches.", courseHighlight: false },
    { id: 8, name: "Gestión de Registros de Auditoría", summary: "Recolectar, centralizar y proteger bitácoras (logs) para posibilitar la detección e investigación forense.", courseHighlight: false },
    { id: 9, name: "Defensas de Correo Electrónico y Navegador Web", summary: "Filtrar contenido malicioso en buzones de correo y navegadores para frenar vectores comunes de phishing.", courseHighlight: false },
    { id: 10, name: "Defensas Contra Malware (EDR)", summary: "Desplegar herramientas avanzadas de detección y respuesta en terminales para neutralizar código malicioso en tiempo real.", courseHighlight: true },
    { id: 11, name: "Recuperación de Datos (Copias de Seguridad)", summary: "Mantener copias de respaldo automatizadas, aisladas e inmutables (regla 3-2-1) y verificar su restauración.", courseHighlight: true },
    { id: 12, name: "Gestión de Infraestructura de Red", summary: "Asegurar y mantener actualizados los firewalls, switches y gateways de red corporativos.", courseHighlight: false },
    { id: 13, name: "Monitoreo y Defensa de Redes", summary: "Inspeccionar flujos y telemetría de red para detectar anomalías o tráfico de comando y control sospechoso.", courseHighlight: false },
    { id: 14, name: "Concientización y Capacitación en Seguridad", summary: "Entrenar periódicamente al personal en hábitos seguros y simular ataques de ingeniería social.", courseHighlight: false },
    { id: 15, name: "Gestión de Proveedores de Servicios", summary: "Evaluar la postura de seguridad de terceros y vigilar que cumplan cláusulas contractuales de protección.", courseHighlight: true },
    { id: 16, name: "Seguridad del Software de Aplicación", summary: "Incorporar pruebas de seguridad en el ciclo de vida del desarrollo de software (SAST y DAST).", courseHighlight: true },
    { id: 17, name: "Gestión de Respuesta a Incidentes", summary: "Disponer de planes documentados, roles asignados y simulacros periódicos para responder a ciberataques.", courseHighlight: false },
    { id: 18, name: "Pruebas de Penetración", summary: "Contratar ejercicios de intrusión éticos para evaluar la resistencia real de las defensas y procesos organizacionales.", courseHighlight: false }
  ],
  courseSpotlight: [
    { control: "Control 5 & 6 (Identidades y Control de Acceso)", session: "Sesión 6", note: "Vital para el modelo Zero Trust: ningún usuario mantiene permisos permanentes sin justificación y todo acceso sensible requiere MFA." },
    { control: "Control 10 (Defensas contra Malware / EDR)", session: "Sesión 6", note: "Marca la evolución del antivirus tradicional basado en firmas hacia agentes EDR basados en análisis de comportamiento y respuesta activa." },
    { control: "Control 11 (Recuperación de Datos)", session: "Sesión 7", note: "Resiliencia ante ransomware: los backups deben ser inmutables o estar offline (air-gapped) para que el atacante no pueda cifrarlos también." },
    { control: "Control 16 (Seguridad en Aplicaciones)", session: "Sesión 7", note: "Diferenciación esencial entre análisis estático (SAST - código fuente sin ejecutar) y análisis dinámico (DAST - aplicación en ejecución)." }
  ],
  controlConfusions: [
    {
      pair: "CIS Control 5 (Gestión de Cuentas) vs. CIS Control 6 (Gestión del Control de Acceso)",
      signal: "La señal que decide: ¿El problema es que la cuenta existe cuando no debería o no se dio de baja al salir el empleado (ciclo de vida de la cuenta)? → CIS Control 5. ¿El problema es qué permisos tiene una cuenta activa o la ausencia de MFA/privilegio mínimo? → CIS Control 6.",
      c5Desc: "CIS Control 5 gobierna el CICLO DE VIDA de las credenciales: inventario de cuentas activas, deshabilitar cuentas inactivas de exempleados (offboarding), prohibir cuentas compartidas y auditar cuentas de servicio.",
      c6Desc: "CIS Control 6 gobierna las POLÍTICAS DE AUTORIZACIÓN Y ACCESO: autenticación multifactor (MFA), principio de privilegio mínimo (Least Privilege), acceso condicional y revocación dinámica de permisos innecesarios.",
      trap: "Trampa de examen: 'Un exempleado mantiene su usuario activo 90 días después de cesar' → Falla CIS Control 5 (gestión de cuentas). 'Un empleado en nómina puede acceder a la base de datos de clientes sin necesitarla para su labor diaria' → Falla CIS Control 6 (control de acceso excesivo)."
    },
    {
      pair: "CIS Control 10 (Defensas Contra Malware / EDR) vs. CIS Control 13 (Monitoreo y Defensa de Redes)",
      signal: "La señal que decide: ¿El control inspecciona y actúa sobre los PROCESOS y ARCHIVOS dentro del terminal/servidor? → CIS Control 10 (EDR). ¿El control inspecciona PAQUETES y FLUJOS de comunicación que viajan por la red? → CIS Control 13 (NIDS / NDR).",
      c10Desc: "CIS Control 10 actúa a nivel de ENDPOINT / HOST: agentes EDR instalados en laptops y servidores que analizan comportamiento en memoria, bloquean ejecución de binarios maliciosos y aíslan equipos infectados.",
      c13Desc: "CIS Control 13 actúa a nivel de INFRAESTRUCTURA DE RED: analizadores de tráfico, inspección profunda de paquetes, cortafuegos y sensores que detectan balizas de comando y control (C2) o escaneos laterales.",
      trap: "Trampa de examen: Si un ransomware se ejecuta en una estación de trabajo apagada de la red mediante una memoria USB, las defensas de red (CIS Control 13) son ciegas; la salvaguarda responsable de neutralizarlo en el disco y la memoria es CIS Control 10 (EDR)."
    }
  ],
  essentialControlsDeepDive: [
    {
      id: 3,
      name: "CIS Control 3: Protección de Datos",
      whyCritical: "Los atacantes buscan robar o extorsionar con datos confidenciales. Sin clasificación previa ni cifrado, cualquier fuga expone información sensible en texto claro.",
      realWorldFailure: "Almacenar registros médicos o contraseñas en bases de datos sin cifrado en reposo o transmitir datos confidenciales por HTTP plano sin TLS 1.3.",
      csfAlignment: "Protect &middot; PR.DS (Data Security)"
    },
    {
      id: 4,
      name: "CIS Control 4: Configuración Segura de Activos y Software (Hardening)",
      whyCritical: "Los sistemas operativos y servidores vienen de fábrica con configuraciones permisivas y servicios innecesarios que multiplican la superficie de ataque.",
      realWorldFailure: "Dejar contraseñas por defecto de administrador, mantener protocolos obsoletos activos (SMBv1, Telnet) o dejar puertos de depuración abiertos en producción.",
      csfAlignment: "Protect &middot; PR.PS (Platform Security)"
    },
    {
      id: 5,
      name: "CIS Control 5: Gestión de Cuentas (Ciclo de Vida de Identidades)",
      whyCritical: "Las cuentas huérfanas o no revocadas de extrabajadores son el vector predilecto para accesos no autorizados sin levantar sospechas.",
      realWorldFailure: "No desactivar las credenciales corporativas de un colaborador en las primeras 24 horas tras su desvinculación (falla crítica de offboarding).",
      csfAlignment: "Protect &middot; PR.AA (Identity Management)"
    },
    {
      id: 6,
      name: "CIS Control 6: Gestión del Control de Acceso (MFA y Privilegio Mínimo)",
      whyCritical: "Las contraseñas simples se filtran o reutilizan. El acceso privilegiado ilimitado permite a un atacante tomar control total de la infraestructura.",
      realWorldFailure: "Permitir accesos a consolas cloud administrativas sin MFA o asignar permisos de administrador global permanente a cuentas de uso diario.",
      csfAlignment: "Protect &middot; PR.AA (Access Control)"
    },
    {
      id: 10,
      name: "CIS Control 10: Defensas Contra Malware (EDR)",
      whyCritical: "El malware moderno (sin archivos en disco / fileless, ransomware polimórfico) evade los antivirus basados en firmas estáticas; requiere análisis de comportamiento en memoria.",
      realWorldFailure: "Tener solo un antivirus tradicional que no detecta la ejecución de scripts maliciosos de PowerShell en memoria ni aísla la máquina de la red automáticamente.",
      csfAlignment: "Protect &middot; PR.PS / Detect &middot; DE.CM"
    },
    {
      id: 11,
      name: "CIS Control 11: Recuperación de Datos (Copias Inmutables y Regla 3-2-1)",
      whyCritical: "Ante un ransomware, las copias de seguridad conectadas a la red local son cifradas junto con los servidores. La inmutabilidad garantiza la supervivencia operativa.",
      realWorldFailure: "Tener respaldos automatizados en una carpeta compartida en la misma red LAN que el ransomware cifra durante las primeras horas del ataque.",
      csfAlignment: "Protect &middot; PR.IR / Recover &middot; RC.RP"
    },
    {
      id: 15,
      name: "CIS Control 15: Gestión de Proveedores de Servicios",
      whyCritical: "Los terceros con accesos directos representan una puerta trasera desgobernada hacia los activos más críticos de la organización.",
      realWorldFailure: "Contratar a una agencia de desarrollo sin cláusulas de auditoría de seguridad y mantener sus credenciales activas meses después de liquidado el contrato.",
      csfAlignment: "Govern &middot; GV.SC (Supply Chain Risk)"
    },
    {
      id: 16,
      name: "CIS Control 16: Seguridad del Software de Aplicación (SSDLC)",
      whyCritical: "Vulnerabilidades como inyección SQL, API keys hardcodeadas o dependencias desactualizadas abren brechas directas hacia la base de datos.",
      realWorldFailure: "Subir llaves maestras de AWS o tokens de API en código cliente dentro de repositorios públicos de GitHub sin análisis SAST en el pipeline CI/CD.",
      csfAlignment: "Protect &middot; PR.PS (Software Security)"
    }
  ],
  commonDoubts: [
    {
      question: "¿Cuál es la diferencia entre Hardening (CIS Control 4) y Parcheo (CIS Control 7)?",
      answer: "El Hardening (Control 4) consiste en ENDURECER la configuración base del sistema: deshabilitar puertos no usados, cerrar servicios innecesarios, eliminar cuentas por defecto y aplicar guías CIS Benchmarks. El Parcheo (Control 7) consiste en DETECTAR fallas de software conocidas (CVEs) y aplicar actualizaciones de seguridad del fabricante. Un sistema puede tener todos los parches al día pero ser vulnerable si tiene puertos y contraseñas por defecto abiertas."
    },
    {
      question: "¿Por qué el Implementation Group 1 (IG1) es la prioridad obligatoria de partida?",
      answer: "IG1 define la 'Higiene Cibernética Esencial' (56 salvaguardas básicas). Representa la línea base indispensable que toda organización debe implementar para defenderse de los ataques masivos y oportunistas más comunes, con un esfuerzo técnico enfocado en los controles de mayor impacto defensivo."
    },
    {
      question: "¿Por qué una copia de seguridad en red no protege contra ransomware sin la regla 3-2-1 e inmutabilidad?",
      answer: "Los grupos de ransomware modernos pasan días o semanas infiltrados en la red antes de cifrar: su primera orden técnica es buscar los servidores de respaldo y destruirlos para forzar el pago del rescate. Para ser resiliente, el respaldo debe seguir la regla 3-2-1 (3 copias, 2 soportes distintos, 1 copia fuera de sitio) y contar con inmutabilidad (WORM) o desconexión física (air-gap)."
    }
  ]
};
