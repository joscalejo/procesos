// Guía de Lectura y Comprensión Pedagógica Oficial - Sesión 2: GOVERN (Gobierno de Ciberseguridad)
// Basado directamente en: docs/Sesion 2.pdf, docs/NIST.CSWP.29.spa (1).pdf y Sílabo CB05 (UPC)
// Diseñado para lectura pausada en celular y laptop (Scaffolding, siglas expandidas y ejemplos prácticos)

window.SESION_2_DATA = {
  id: "s2",
  number: 2,
  title: "Sesión 2: Función GOVERN (Gobierno de Ciberseguridad)",
  shortTitle: "S2: Govern",

  // 0. CABECERA PEDAGÓGICA
  header: {
    oneLiner: "Define quién tiene la autoridad, qué reglas escritas guían la seguridad, cuánto riesgo acepta el negocio y cómo la alta dirección vigila que las normas se cumplan en la práctica.",
    readingTime: "12 min de lectura pausada",
    prerequisites: [
      { text: "La diferencia entre Gobierno, Riesgo y Controles Operativos (S1)", link: "s1" },
      { text: "El Core de NIST CSF 2.0 y las 6 funciones fundamentales (S1)", link: "s1" }
    ],
    outcomes: [
      "Comprender por qué la seguridad sin gobierno formal fracasa aunque una empresa compre tecnología costosa.",
      "Identificar con claridad las 6 categorías de Govern (GV.OC, GV.RM, GV.RR, GV.PO, GV.OV, GV.SC) en cualquier caso real.",
      "Construir y validar una Matriz RACI para decisiones críticas sin duplicar la rendición de cuentas (regla de un solo Accountable)."
    ]
  },

  // 1. LA IDEA CENTRAL
  centralIdea: {
    problemStatement: "Una empresa puede contratar a los mejores ingenieros y comprar firewalls de última generación, pero si un directivo decide en solitario pagar una extorsión a cibercriminales, o si el CISO renuncia y pasan meses sin que nadie asuma formalmente el mando, la tecnología queda completamente anulada.",
    coreConcept: "La función Govern (Gobierno) es el cerebro estratégico de la ciberseguridad: no instala herramientas técnicas; define la postura de riesgo del negocio, asigna quién tiene la investidura legal para decidir y supervisa que las políticas se cumplan.",
    caseConnection: "En el escándalo de Uber (2016), los atacantes robaron datos de 57 millones de usuarios. El equipo de seguridad decidió pagar $100,000 bajo un supuesto acuerdo de recompensa y ocultó la brecha al Directorio y a los reguladores. No falló el firewall: falló el gobierno porque una decisión de altísimo impacto fiduciario y legal se tomó sin pasar por los canales formales de autoridad.",
    source: "Diapositivas Sesión 2, diapositivas 7, 8 y 10; NIST CSF 2.0 (CSWP 29), sección 2.1"
  },

  // 2. VOCABULARIO, SIGLAS Y MNEMOTECNIAS
  vocabulary: {
    acronyms: [
      {
        sigla: "GV",
        english: "Govern",
        spanish: "Gobierno",
        meaning: "Función transversal de NIST CSF 2.0 que establece la estrategia corporativa, políticas y supervisión."
      },
      {
        sigla: "GV.OC",
        english: "Organizational Context",
        spanish: "Contexto Organizacional",
        meaning: "Entender la misión del negocio, sus partes interesadas y las obligaciones legales y regulatorias que debe cumplir."
      },
      {
        sigla: "GV.RM",
        english: "Risk Management Strategy",
        spanish: "Estrategia de Gestión de Riesgo",
        meaning: "Definir cuánto riesgo tolera la empresa (apetito) y el proceso formal para evaluar y financiar el tratamiento de hallazgos."
      },
      {
        sigla: "GV.RR",
        english: "Roles, Responsibilities, and Authorities",
        spanish: "Roles, Responsabilidades y Autoridad",
        meaning: "Asignar quién decide, quién ejecuta y quién rinde cuentas ante el Directorio, evitando vacíos de mando y usurpaciones."
      },
      {
        sigla: "GV.PO",
        english: "Policy",
        spanish: "Política",
        meaning: "Las reglas formales escritas, aprobadas por la gerencia y comunicadas a todos los empleados para guiar su conducta."
      },
      {
        sigla: "GV.OV",
        english: "Oversight",
        spanish: "Supervisión",
        meaning: "Auditorías y reportes periódicos que la Junta Directiva revisa para verificar si las políticas aprobadas se acatan en la realidad."
      },
      {
        sigla: "GV.SC",
        english: "Cybersecurity Supply Chain Risk Management",
        spanish: "Riesgo en Cadena de Suministro / Terceros",
        meaning: "Evaluar, exigir cláusulas de seguridad y revocar accesos a contratistas externos, proveedores de TI y servicios en la nube."
      },
      {
        sigla: "RACI",
        english: "Responsible, Accountable, Consulted, Informed",
        spanish: "Responsable, Aprobador, Consultado, Informado",
        meaning: "Matriz organizativa de 4 roles que elimina ambigüedades en decisiones críticas asegurando un único Accountable ('A')."
      },
      {
        sigla: "CISO",
        english: "Chief Information Security Officer",
        spanish: "Director de Seguridad de la Información",
        meaning: "Líder ejecutivo encargado de diseñar y coordinar la estrategia técnica y de gestión de la ciberseguridad."
      },
      {
        sigla: "CEO",
        english: "Chief Executive Officer",
        spanish: "Director Ejecutivo / Gerente General",
        meaning: "Máxima autoridad de la empresa que asume la responsabilidad legal, fiduciaria y patrimonial ante los accionistas."
      },
      {
        sigla: "SBS",
        english: "Superintendence of Banking, Insurance and Private Pension Fund Administrators",
        spanish: "Superintendencia de Banca, Seguros y AFP (Perú)",
        meaning: "Organismo regulador financiero que exige normativas estrictas de secreto bancario y gestión de riesgo operacional."
      }
    ],
    codeReadingGuide: {
      explanation: "NIST CSF 2.0 utiliza códigos jerárquicos compuestos por Función, Categoría y Subcategoría.",
      example: "GV.SC-01",
      breakdown: [
        { part: "GV", role: "Función", desc: "Govern (Gobierno) — El cerebro directivo transversal." },
        { part: "SC", role: "Categoría", desc: "Supply Chain (Cadena de Suministro) — El tema concreto de gestión." },
        { part: "01", role: "Subcategoría", desc: "Resultado específico medible (ej.: procesos de gestión de riesgos con terceros formalmente acordados)." }
      ],
      source: "NIST CSF 2.0 (CSWP 29), pág. 14"
    },
    mnemonics: [
      {
        name: "Las 6 Categorías de Govern",
        tag: "Mnemotecnia (propia, no oficial)",
        phrase: "\"Ocurrió un Riesgo Raro, Ponle Ojo al Contratista\"",
        breakdown: [
          "Ocurrió → GV.OC (Contexto Organizacional)",
          "Riesgo → GV.RM (Gestión de Riesgo)",
          "Raro → GV.RR (Roles y Autoridad)",
          "Ponle → GV.PO (Políticas)",
          "Ojo → GV.OV (Supervisión / Oversight)",
          "Contratista → GV.SC (Supply Chain / Terceros)"
        ]
      },
      {
        name: "Los 4 Roles de la Matriz RACI",
        tag: "Mnemotecnia (propia, no oficial)",
        phrase: "\"R-A-C-I: Realiza, Aprueba, Consulta, Informa\"",
        breakdown: [
          "R → Realiza (quien hace el trabajo operativo; puede haber varios)",
          "A → Aprueba (quien rinde cuentas ante el Directorio y la ley; EXACTAMENTE UNO)",
          "C → Consulta (experto técnico o legal al que se le pide opinión antes de firmar)",
          "I → Informa (a quien solo se le avisa después para que esté enterado)"
        ]
      }
    ]
  },

  // 3. CONCEPTOS PASO A PASO (De lo simple a lo complejo)
  stepByStepConcepts: [
    {
      id: "step-1-gov-vs-risk",
      order: 1,
      name: "Gobierno, Riesgo y Controles Operativos: La Cadena de Valor",
      whatIs: "El Gobierno fija las reglas y define quién decide; la Gestión de Riesgos identifica qué se puede perder y su probabilidad; los Controles Operativos ejecutan la protección en el día a día.",
      whyUseful: "Permite entender que las herramientas técnicas no se instalan por moda, sino porque una evaluación de riesgos las priorizó y una política de gobierno las ordenó formalmente.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "El Directorio aprueba la política de teletrabajo (Gobierno); el área de riesgos identifica que usar Wi-Fi público expone contraseñas (Riesgo); el equipo de TI instala VPN con doble factor en todas las laptops (Control Operativo)."
        },
        {
          label: "Ejemplo Mal",
          text: "TI compra un software antivirus de $50,000 sin consultar las necesidades del negocio ni definir quién administrará las alertas, quedando el sistema abandonado (Control sin Gobierno)."
        }
      ],
      relationships: "Gobierno define la estrategia que alimenta a la Gestión de Riesgos (S1), y el Riesgo prioriza qué Controles Operativos ejecutar (S1).",
      source: "Diapositivas Sesión 2, diapositiva 4"
    },
    {
      id: "step-2-gv-oc",
      order: 2,
      name: "GV.OC — Contexto Organizacional (El Entorno Externo)",
      whatIs: "Comprensión profunda de la misión de la empresa, sus partes interesadas (clientes, socios, reguladores) y las obligaciones legales que la rigen antes de armar cualquier plan de seguridad.",
      whyUseful: "Evita diseñar defensas desconectadas de la ley. Un banco y una biblioteca pública tienen misiones y marcos normativos totalmente distintos; su ciberseguridad también debe serlo.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Una empresa de préstamos online mapea las circulares de la SBS y la Ley 29733 de Protección de Datos Personales antes de diseñar sus bases de datos."
        },
        {
          label: "Ejemplo Mal",
          text: "Una clínica privada almacena historias clínicas en un servidor sin cifrar, ignorando que la ley nacional de salud sanciona con clausura la divulgación del secreto médico."
        }
      ],
      relationships: "GV.OC es el punto de partida que alimenta a GV.RM: no puedes calcular cuánto riesgo toleras sin saber qué leyes te multan si ocurre una filtración.",
      source: "Diapositivas Sesión 2, diapositiva 12; NIST CSF 2.0, GV.OC"
    },
    {
      id: "step-3-gv-rm",
      order: 3,
      name: "GV.RM — Estrategia de Gestión de Riesgo (El Apetito Interno)",
      whatIs: "Establece el apetito de riesgo (cuánto riesgo tolera el negocio para operar) y el proceso institucional obligatorio para evaluar, priorizar y tratar con presupuesto todo hallazgo identificado.",
      whyUseful: "Garantiza que ningún reporte de vulnerabilidad quede olvidado en un correo. Obliga a que todo riesgo pase por un flujo formal: evaluar impacto, asignar responsable y fijar fecha límite de solución.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Tras un informe de ethical hacking con 5 fallas críticas, el Comité de Riesgos revisa el apetito corporativo, asigna presupuesto y fija 10 días para parchar."
        },
        {
          label: "Ejemplo Mal",
          text: "Soporte técnico reporta que el servidor de respaldos falla con frecuencia; el ticket queda 90 días en estado 'Pendiente' porque nadie evalúa el impacto ni asigna fondos de solución."
        }
      ],
      relationships: "GV.RM toma el contexto de GV.OC y dicta qué políticas obligatorias deben redactarse en GV.PO para mitigar los riesgos no tolerados.",
      source: "Diapositivas Sesión 2, diapositiva 13; NIST CSF 2.0, GV.RM"
    },
    {
      id: "step-4-gv-rr",
      order: 4,
      name: "GV.RR — Roles, Responsabilidades y Autoridad (Quién Manda)",
      whatIs: "Establece quién tiene investidura legal y facultades delegadas para decidir, ejecutar y rendir cuentas, desde el Directorio hasta los administradores de sistemas.",
      whyUseful: "Resuelve dos problemas críticos de gestión: (a) vacíos de mando cuando un líder renuncia y nadie asume formalmente, y (b) usurpación de atribuciones cuando alguien decide por su cuenta sin facultades.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Ante la renuncia imprevista del CISO, la Gerencia General nombra formalmente un interino con facultades delegadas de firma para no paralizar aprobaciones de seguridad."
        },
        {
          label: "Ejemplo Mal",
          text: "El Director de Marketing decide por su cuenta pagar $15,000 con fondos corporativos a un cibercriminal para silenciar un ataque, sin consultar a Legal ni al Directorio (caso prototípico de Uber 2016)."
        }
      ],
      relationships: "De GV.RR nace directamente la Matriz RACI; GV.RR define quién aprueba formalmente las políticas redactadas en GV.PO.",
      source: "Diapositivas Sesión 2, diapositiva 14; NIST CSF 2.0, GV.RR"
    },
    {
      id: "step-5-gv-po",
      order: 5,
      name: "GV.PO — Política (Las Reglas Escritas)",
      whatIs: "Reglas formales, documentadas, aprobadas por la gerencia y comunicadas a toda la organización que establecen mandatos obligatorios sobre el uso de sistemas, datos y conductas.",
      whyUseful: "Impide que el personal decida 'sobre la marcha'. Si una regla no está formalmente escrita y comunicada, los colaboradores no tienen cómo saber qué está permitido o prohibido.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "La empresa redacta, aprueba y publica en la intranet una política clara que prohíbe conectar dispositivos personales a la red corporativa sin autorización previa."
        },
        {
          label: "Ejemplo Mal",
          text: "Los programadores suben contraseñas maestras a repositorios públicos de internet porque la compañía jamás redactó ni comunicó una directriz sobre desarrollo seguro de software."
        }
      ],
      relationships: "GV.PO formaliza las decisiones tomadas en GV.RM y GV.RR. Si la política no existe, falla GV.PO; si existe pero nadie la vigila, falla GV.OV.",
      source: "Diapositivas Sesión 2, diapositiva 15; NIST CSF 2.0, GV.PO"
    },
    {
      id: "step-6-gv-ov",
      order: 6,
      name: "GV.OV — Supervisión (Oversight / Fiscalización)",
      whatIs: "Proceso periódico mediante el cual la alta dirección y la Junta Directiva revisan reportes y métricas de seguridad para verificar si las políticas aprobadas se están cumpliendo en la realidad operativa.",
      whyUseful: "Evita que las políticas sean letra muerta. Tener un manual de seguridad guardado en un cajón no protege a la empresa si la dirección nunca fiscaliza su adopción.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Auditoría Interna entrega trimestralmente al Directorio un informe con el porcentaje de cuentas de extrabajadores dadas de baja en menos de 24 horas."
        },
        {
          label: "Ejemplo Mal",
          text: "Existe una política aprobada desde hace 2 años que exige activar doble factor (MFA) a todos los empleados, pero la Junta nunca pidió métricas y solo el 15% lo tiene activo."
        }
      ],
      relationships: "GV.OV fiscaliza a GV.PO en el presente. Se diferencia de ID.IM (Mejora Continua, S3) porque GV.OV controla las normas actuales, mientras ID.IM aprende de incidentes pasados para cambiar el futuro.",
      source: "Diapositivas Sesión 2, diapositiva 16; NIST CSF 2.0, GV.OV"
    },
    {
      id: "step-7-gv-sc",
      order: 7,
      name: "GV.SC — Riesgo en Cadena de Suministro (Terceros)",
      whatIs: "Gestionar el riesgo de proveedores, consultores y servicios cloud que acceden a sistemas o datos: evaluarlos antes de contratarlos, exigir cláusulas de seguridad y revocar accesos al culminar.",
      whyUseful: "Los atacantes frecuentemente eligen ingresar vulnerando al proveedor externo más débil en lugar de atacar directamente a la empresa principal.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "El contrato con un proveedor de nube exige certificaciones de seguridad, acuerdos de confidencialidad y revocación automática de llaves de acceso el mismo día que termina el servicio."
        },
        {
          label: "Ejemplo Mal",
          text: "En el caso Target (2013), un proveedor de aire acondicionado (HVAC) tenía acceso libre a la red interna sin controles ni segmentación, permitiendo que atacantes robaran datos de millones de tarjetas de crédito."
        }
      ],
      relationships: "GV.SC se apoya en la Matriz RACI (GV.RR) para definir con precisión qué funcionario interno supervisa las conexiones y contratos de los proveedores.",
      source: "Diapositivas Sesión 2, diapositivas 17-18; NIST CSF 2.0, GV.SC"
    },
    {
      id: "step-8-raci",
      order: 8,
      name: "La Matriz RACI: La Herramienta de Gobernanza en la Práctica",
      whatIs: "Matriz que cruza actividades críticas (filas) con roles de la empresa (columnas), asignando las letras R (Responsible), A (Accountable), C (Consulted) e I (Informed).",
      whyUseful: "Garantiza la regla de oro: exactamente un solo Accountable ('A') por actividad. Si dos personas son 'A', ninguna asume la culpa final y la responsabilidad se diluye.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Para actualizar la política de contraseñas: el CISO es 'A' (aprueba y rinde cuentas), el Gerente de TI es 'R' (redacta el procedimiento), Legal es 'C' (dictamina conformidad con leyes) y los empleados son 'I' (reciben la notificación)."
        },
        {
          label: "Ejemplo Mal",
          text: "Para pagar un rescate de ransomware, asignar al CISO y al Gerente de TI como 'A' simultáneos. Si el pago resulta en fraude o delito, ambos se culpan mutuamente y la empresa queda sin mando definido."
        }
      ],
      relationships: "Es la materialización práctica de GV.RR y GV.SC; define con claridad quién supervisa a los contratistas externos y quién asume la responsabilidad fiduciaria.",
      source: "Diapositivas Sesión 2, diapositivas 20-22"
    }
  ],

  // 4. CÓMO SE CONECTA TODO (Diagrama SVG/HTML simple y legible en celular)
  connectionDiagram: {
    description: "El flujo de gobernanza conecta el entorno externo con la operación interna: GV.OC entiende las leyes exteriores; GV.RM fija cuánto riesgo toleramos; GV.RR define quién manda; GV.PO redacta las normas; GV.OV vigila hacia arriba (Directorio) y GV.SC controla hacia afuera (proveedores).",
    svgContent: `
      <div class="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 760 380" class="w-full max-w-[760px] mx-auto block text-executive-900 dark:text-white" style="min-width: 320px;" aria-label="Diagrama de conexiones de la Función Govern">
          <!-- FONDO / CONTENEDOR GENERAL -->
          <rect x="10" y="10" width="740" height="360" rx="16" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="1.5" />
          
          <!-- NODO 1: GV.OC (Entorno Externo) -->
          <g transform="translate(30, 40)">
            <rect width="210" height="70" rx="10" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-width="2"/>
            <text x="105" y="30" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">1. GV.OC (Contexto)</text>
            <text x="105" y="50" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Leyes, reguladores y misión</text>
          </g>

          <!-- FLECHA 1 -> 2 -->
          <path d="M 240 75 L 280 75" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow)" fill="none"/>

          <!-- NODO 2: GV.RM (Apetito de Riesgo) -->
          <g transform="translate(280, 40)">
            <rect width="200" height="70" rx="10" fill="#f59e0b" fill-opacity="0.12" stroke="#f59e0b" stroke-width="2"/>
            <text x="100" y="30" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">2. GV.RM (Estrategia)</text>
            <text x="100" y="50" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Apetito y tratamiento de riesgos</text>
          </g>

          <!-- FLECHA 2 -> 3 -->
          <path d="M 480 75 L 520 75" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrow)" fill="none"/>

          <!-- NODO 3: GV.RR (Roles y Autoridad) -->
          <g transform="translate(520, 40)">
            <rect width="210" height="70" rx="10" fill="#8b5cf6" fill-opacity="0.12" stroke="#8b5cf6" stroke-width="2"/>
            <text x="105" y="30" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">3. GV.RR (Autoridad)</text>
            <text x="105" y="50" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Cadena de mando & Matriz RACI</text>
          </g>

          <!-- FLECHA 3 -> 4 (Hacia abajo al centro) -->
          <path d="M 625 110 L 625 150 L 380 150 L 380 170" stroke="#8b5cf6" stroke-width="2" fill="none"/>

          <!-- NODO 4: GV.PO (Políticas Escritas - Centro) -->
          <g transform="translate(260, 170)">
            <rect width="240" height="75" rx="12" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="2.5"/>
            <text x="120" y="32" text-anchor="middle" font-weight="bold" font-size="15" fill="currentColor">4. GV.PO (Políticas)</text>
            <text x="120" y="52" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.85">Reglas formales aprobadas y comunicadas</text>
          </g>

          <!-- FLECHA 4 -> 5 (Hacia abajo izquierda: Supervisión) -->
          <path d="M 330 245 L 330 275 L 200 275 L 200 290" stroke="#ef4444" stroke-width="2" fill="none"/>

          <!-- FLECHA 4 -> 6 (Hacia abajo derecha: Cadena de suministro) -->
          <path d="M 430 245 L 430 275 L 560 275 L 560 290" stroke="#6366f1" stroke-width="2" fill="none"/>

          <!-- NODO 5: GV.OV (Supervisión - Hacia la Junta) -->
          <g transform="translate(70, 290)">
            <rect width="260" height="65" rx="10" fill="#ef4444" fill-opacity="0.12" stroke="#ef4444" stroke-width="2"/>
            <text x="130" y="28" text-anchor="middle" font-weight="bold" font-size="13" fill="currentColor">5. GV.OV (Supervisión / Oversight)</text>
            <text x="130" y="47" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Fiscalización y reportes a la Junta Directiva</text>
          </g>

          <!-- NODO 6: GV.SC (Cadena de Suministro - Hacia Terceros) -->
          <g transform="translate(430, 290)">
            <rect width="260" height="65" rx="10" fill="#6366f1" fill-opacity="0.12" stroke="#6366f1" stroke-width="2"/>
            <text x="130" y="28" text-anchor="middle" font-weight="bold" font-size="13" fill="currentColor">6. GV.SC (Cadena de Suministro)</text>
            <text x="130" y="47" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Contratos, control y revocación de proveedores</text>
          </g>
        </svg>
      </div>
    `,
    summaryText: "El contexto legal (GV.OC) condiciona el apetito de riesgo (GV.RM). Los líderes (GV.RR) formalizan las reglas en políticas escritas (GV.PO). Hacia arriba, la Junta supervisa su efectividad (GV.OV); hacia afuera, se gobierna a los proveedores contratados (GV.SC)."
  },

  // 5. DIFERENCIAS CLAVE (Pares que se confunden con la fila "La señal que decide")
  keyDifferences: [
    {
      id: "diff-po-vs-ov",
      pairTitle: "GV.PO (Políticas) vs. GV.OV (Supervisión)",
      colA: "GV.PO (Políticas)",
      colB: "GV.OV (Supervisión)",
      rows: [
        { aspect: "¿Qué evalúa?", valA: "La redacción, aprobación formal y difusión de la regla escrita.", valB: "La auditoría y fiscalización periódica de que la regla existente se cumpla." },
        { aspect: "Causa raíz del fallo", valA: "El documento normativo no existe, no fue aprobado o nunca se comunicó a los empleados.", valB: "El documento sí existe y está aprobado, pero la alta dirección nunca auditó su cumplimiento real." },
        { aspect: "Evidencia textual típica", valA: "\"No había ninguna directriz escrita sobre...\" / \"Nunca se comunicó el lineamiento a TI...\"", valB: "\"La política exigía revisiones trimestrales, pero nadie auditó su cumplimiento en 2 años.\"" },
        { aspect: "La señal que decide", valA: "Si buscas el documento formal en la intranet y NO existe o no se comunicó → GV.PO.", valB: "Si el documento SÍ existe y está aprobado pero nadie controla su aplicación práctica → GV.OV." }
      ]
    },
    {
      id: "diff-rm-vs-rr",
      pairTitle: "GV.RM (Gestión de Riesgos) vs. GV.RR (Roles y Autoridad)",
      colA: "GV.RM (Gestión de Riesgos)",
      colB: "GV.RR (Roles y Autoridad)",
      rows: [
        { aspect: "¿Qué evalúa?", valA: "El flujo de tratamiento, evaluación frente al apetito y asignación de fondos ante un hallazgo.", valB: "La cadena jerárquica de mando, las facultades delegadas y la cobertura ininterrumpida de puestos clave." },
        { aspect: "Causa raíz del fallo", valA: "Un riesgo identificado se ignora, queda sin presupuesto o nadie evalúa su impacto.", valB: "Una persona actúa sin facultades legales delegadas o un cargo queda acéfalo sin nombramiento." },
        { aspect: "Evidencia textual típica", valA: "\"El ticket de vulnerabilidad permaneció 90 días archivado sin plan de mitigación.\"", valB: "\"El Director de Marketing decidió por su cuenta pagar al atacante sin consultar a Legal ni a la Junta.\"" },
        { aspect: "La señal que decide", valA: "¿Un hallazgo técnico no tiene proceso de tratamiento ni presupuesto frente al apetito? → GV.RM.", valB: "¿Alguien tomó atribuciones sin tener poder delegado o un mando quedó vacío? → GV.RR." }
      ]
    },
    {
      id: "diff-rr-vs-po",
      pairTitle: "GV.RR (Roles y Autoridad) vs. GV.PO (Políticas)",
      colA: "GV.RR (Roles y Autoridad)",
      colB: "GV.PO (Políticas)",
      rows: [
        { aspect: "¿Qué evalúa?", valA: "A las personas con poder de decisión: quién manda, quién aprueba y quién rinde cuentas (RACI).", valB: "A las reglas escritas de conducta: qué está permitido o prohibido en los sistemas." },
        { aspect: "Causa raíz del fallo", valA: "Vacío de liderazgo (renuncia del CISO sin interino) o usurpación de funciones fiduciarias.", valB: "Falta de directriz, procedimiento o reglamento documentado que guíe el trabajo." },
        { aspect: "La señal que decide", valA: "¿El problema es quién manda o quién tiene la investidura para decidir? → GV.RR.", valB: "¿El problema es qué norma faltaba redactar y publicar? → GV.PO." }
      ]
    },
    {
      id: "diff-raci-a-vs-r",
      pairTitle: "RACI: Accountable ('A') vs. Responsible ('R')",
      colA: "Accountable ('A')",
      colB: "Responsible ('R')",
      rows: [
        { aspect: "Definición", valA: "El único rol que rinde cuentas fiduciarias, legales y patrimoniales ante la ley y los accionistas.", valB: "El colaborador o equipo que ejecuta materialmente la labor técnica o redacta el entregable." },
        { aspect: "Regla de cantidad", valA: "EXACTAMENTE UNO por actividad (regla de oro: si hay dos 'A', la responsabilidad se diluye).", valB: "Uno o varios colaboradores según la magnitud del proyecto." },
        { aspect: "Ejemplo en extorsión", valA: "El CEO o la Junta Directiva (asumen la responsabilidad penal y patrimonial corporativa).", valB: "El CISO o equipo de respuesta técnica (investigan el alcance técnico y evalúan las opciones)." },
        { aspect: "La señal que decide", valA: "¿Quién va a responder ante un juez o regulador si la decisión sale mal? Ese es 'A'.", valB: "¿Quién se sienta a ejecutar los comandos técnicos o preparar los informes? Ese es 'R'." }
      ]
    }
  ],

  // 6. PREGUNTAS PARA RAZONAR (Algoritmo secuencial para analizar casos)
  reasoningQuestions: [
    {
      step: 1,
      question: "¿Aparece un TERCERO involucrado (proveedor, consultora externa, servicio cloud o contratista)?",
      action: "Revisa de inmediato GV.SC (Cadena de Suministro). Pregúntate: ¿Se evaluó al proveedor antes de firmar? ¿El contrato incluye cláusulas de seguridad y auditoría? ¿Sus credenciales o accesos remotos fueron revocados al terminar el servicio? Si cualquiera falló, GV.SC está comprometida."
    },
    {
      step: 2,
      question: "¿El problema principal fue violar una ley sectorial, regulación obligatoria o la misión institucional?",
      action: "Revisa GV.OC (Contexto Organizacional). Aplica si la empresa opera en banca (SBS), salud (secreto médico) o maneja datos personales (Ley 29733) y actuó ignorando esas obligaciones regulatorias externas."
    },
    {
      step: 3,
      question: "¿Se descubrió un riesgo o vulnerabilidad pero nadie evaluó su impacto ni asignó presupuesto para tratarlo?",
      action: "Revisa GV.RM (Estrategia de Gestión de Riesgo). Falla cuando existe un ticket o informe de pentesting archivado por meses sin asignación de responsable, sin fecha límite y sin presupuesto de mitigación."
    },
    {
      step: 4,
      question: "¿Alguien tomó una decisión crítica sin tener facultades, o un puesto directivo clave quedó vacío?",
      action: "Revisa GV.RR (Roles y Autoridad). Falla cuando un directivo decide por su cuenta sin facultades delegadas en la RACI o cuando el CISO renuncia y la empresa opera meses sin nombrar interino."
    },
    {
      step: 5,
      question: "¿Existe la norma formal por escrito y comunicada a los colaboradores?",
      action: "Si la política NO existe o nunca se comunicó a los empleados → Falla GV.PO (Políticas). Si la política SÍ existe y está aprobada pero la gerencia nunca audita si se cumple en la práctica → Falla GV.OV (Supervisión)."
    },
    {
      step: 6,
      question: "¿Cómo estructuro la Matriz RACI para una decisión crítica?",
      action: "Identifica primero al 'A' (quien rinde cuentas legales/fiduciarias; asegúrate de que sea EXACTAMENTE UNO). Luego asigna 'R' a quien ejecuta técnicamente. Asigna 'C' a quien aporta dictamen previo (Legal, Finanzas). Asigna 'I' a quien solo se le avisa después."
    }
  ],

  // 7. ERRORES TÍPICOS ("Si piensas X, ojo: ...")
  typicalErrors: [
    {
      ifYouThink: "Si piensas que el CISO es el 'A' para autorizar el pago de un rescate de ransomware...",
      watchOut: "Ojo: El CISO aporta criterio técnico (es rol C o R). Autorizar el pago compromete el patrimonio societario y genera contingencias penales ante la ley; esa decisión fiduciaria solo la puede tomar el CEO o la Junta Directiva ('A')."
    },
    {
      ifYouThink: "Si piensas que registrar un hallazgo de auditoría en un ticket ya cumple con gestionar riesgos...",
      watchOut: "Ojo: Abrir el ticket es solo detección. Si el ticket pasa 90 días en estado 'Pendiente' sin responsable asignado ni presupuesto frente al apetito de riesgo, GV.RM falló rotundamente."
    },
    {
      ifYouThink: "Si piensas que cuando los colaboradores no acatan una norma la falla es de Políticas (GV.PO)...",
      watchOut: "Ojo: Si la política ya está aprobada y publicada en la intranet, la falla es de Supervisión (GV.OV) porque la dirección no auditó ni fiscalizó su cumplimiento real."
    },
    {
      ifYouThink: "Si piensas que la gestión de terceros (GV.SC) solo falla si el proveedor ataca a la compañía...",
      watchOut: "Ojo: Dejarle credenciales activas a un contratista meses después de concluido su contrato ya constituye una falla formal y evidente de GV.SC."
    },
    {
      ifYouThink: "Si piensas que en una fila de la Matriz RACI pueden colocarse dos 'A'...",
      watchOut: "Ojo: La regla cardinal de la RACI es UN solo 'A' por actividad. Duplicar el rol Accountable anula la rendición de cuentas porque ambas personas se culparán mutuamente si ocurre una catástrofe."
    },
    {
      ifYouThink: "Si piensas que Asesoría Legal o TI pueden ser los Dueños del Activo (Asset Owner)...",
      watchOut: "Ojo: El Dueño del Activo es SIEMPRE el área de negocio que procesa y se beneficia de la información (Admisión, Finanzas, Operaciones). Legal conoce la norma pero no procesa el activo; TI solo es el custodio técnico de la infraestructura."
    }
  ],

  // 8. PARA PROFUNDIZAR (Colapsado, opcional)
  deepDive: [
    {
      title: "Vínculo con COBIT 2019: Separación entre Gobierno y Gestión",
      content: "El marco internacional COBIT 2019 (ISACA) establece una distinción tajante que adopta NIST CSF 2.0: el Gobierno evalúa necesidades, orienta la dirección estratégica y supervisa el cumplimiento (responsabilidad de la Junta Directiva); mientras que la Gestión planifica, construye, ejecuta y monitorea las actividades alineadas a esa dirección (responsabilidad de la Gerencia Operativa)."
    },
    {
      title: "Niveles de Implementación (NIST Tiers) aplicados a Gobernanza",
      content: "NIST CSF 2.0 define 4 Tiers de madurez. En Gobierno: Tier 1 (Parcial) carece de políticas formales y reacciona de forma ad-hoc; Tier 2 (Informado por el riesgo) tiene conciencia pero sin aprobación formal de la Junta; Tier 3 (Repetible) cuenta con políticas aprobadas formalmente por el Directorio y actualizadas periódicamente; Tier 4 (Adaptativo) ajusta su postura en tiempo real basándose en telemetría continua de amenazas."
    },
    {
      title: "Subcategorías Oficiales de GV.SC en NIST CSF 2.0",
      content: "NIST CSWP 29 detalla 10 subcategorías para GV.SC (GV.SC-01 a GV.SC-10), incluyendo: identificación formal de proveedores críticos (SC-04), inclusión de requisitos de ciberseguridad en contratos (SC-05), debida diligencia previa a la firma (SC-06) y procedimientos de terminación y baja de accesos (SC-08)."
    }
  ],

  // 9. FUENTES DE LA SESIÓN
  sources: [
    {
      doc: "NIST Cybersecurity Framework (CSF) 2.0 (NIST CSWP 29, 2024)",
      detail: "Función Govern (GV), categorías GV.OC, GV.RM, GV.RR, GV.PO, GV.OV, GV.SC, páginas 14-17. Documento público de dominio público disponible en docs/NIST.CSWP.29.spa (1).pdf."
    },
    {
      doc: "Diapositivas Sesión 2: 'Govern: Gobierno de Ciberseguridad' (UPC, CB05)",
      detail: "Material pedagógico oficial de la docente, diapositivas 1 a 24. Incluye caso Uber 2016, preguntas guía por categoría y pasos para la Matriz RACI. Disponible en docs/Sesion 2.pdf."
    },
    {
      doc: "COBIT 2019 Framework: Governance and Management Objectives (ISACA, 2018)",
      detail: "Diferenciación estructural entre gobierno corporativo y gestión operativa. Referencia del sílabo del curso."
    },
    {
      doc: "Caso de Estudio Corporativo: Brecha de Datos de Uber Technologies Inc. (2016)",
      detail: "Análisis forense y ético sobre decisiones unilaterales de pago sin gobierno formal, revisado en clase."
    }
  ]
};
