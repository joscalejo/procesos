// Guía de Lectura y Comprensión Pedagógica Oficial - Sesión 5: Arquitectura Confianza Cero (Zero Trust)
// Basado directamente en: docs/Presentación - Sesion 5.pdf, docs/NIST.SP.800-207.pdf y Sílabo CB05 (UPC)
// Diseñado para lectura pausada en celular y laptop (Scaffolding, siglas expandidas y ejemplos prácticos)

window.SESION_5_DATA = {
  id: "s5",
  number: 5,
  title: "Sesión 5: Arquitectura Confianza Cero (Zero Trust Architecture)",
  shortTitle: "S5: Zero Trust",

  // 0. CABECERA PEDAGÓGICA
  header: {
    oneLiner: "La ubicación física o de red ya no otorga confianza: Zero Trust asume que la red corporativa ya está comprometida y exige verificar explícitamente cada intento de acceso mediante políticas dinámicas antes de conceder privilegios mínimos.",
    readingTime: "12 min de lectura pausada",
    prerequisites: [
      { text: "La diferencia entre Gobierno, Riesgo y Controles (S1)", link: "s1" },
      { text: "La clasificación de activos y la tríada CID (S3)", link: "s3" }
    ],
    outcomes: [
      "Comprender el colapso del modelo tradicional de 'Castillo y Foso' y el surgimiento de BeyondCorp y NIST SP 800-207.",
      "Dominar los 3 principios rectores de Confianza Cero: Verificar explícitamente, Privilegio mínimo y Asumir la brecha.",
      "Entender los 7 Tenets de NIST SP 800-207 y su relación con la arquitectura lógica (PDP [PE, PA] vs. PEP).",
      "Diferenciar la microsegmentación moderna frente a la segmentación tradicional por VLAN.",
      "Identificar los 6 dominios de Zero Trust evaluados en el curso CB05 (Identidades, Endpoints, Aplicaciones, Datos, Infraestructura, Redes)."
    ]
  },

  // 1. LA IDEA CENTRAL
  centralIdea: {
    problemStatement: "El modelo tradicional de seguridad ('Castillo y Foso') asumía que todo lo que estaba fuera de la empresa era peligroso y todo lo que estaba dentro de la red local (LAN o VPN) era de total confianza. Si un atacante lograba engañar a un solo empleado con phishing o conectaba una laptop infectada a la red Wi-Fi de la oficina, tenía barra libre para moverse lateralmente sin obstáculos e infectar servidores críticos.",
    coreConcept: "Zero Trust Architecture (ZTA) elimina por completo la 'confianza implícita' basada en la ubicación geográfica o de red. Trata la red interna de la empresa con el mismo nivel de desconfianza que si fuera un cibercafé público: cada solicitud individual a cualquier dato o aplicación debe autenticarse, autorizarse y cifrarse continuamente basándose en la identidad del usuario y la salud del dispositivo.",
    caseConnection: "En la histórica Operación Aurora (2009), atacantes patrocinados por un estado vulneraron las defensas perimetrales de Google y decenas de corporaciones multinacionales. Una vez dentro de la red interna, se movieron lateralmente a sus anchas hacia servidores de código fuente. La lección obligó a Google a rediseñar su seguridad desde cero creando BeyondCorp (2014), el proyecto pionero que demostró que los empleados pueden trabajar de forma segura desde cualquier red sin depender de una VPN corporativa abierta.",
    source: "Diapositivas Sesión 5, diapositivas 3, 6 y 8; NIST SP 800-207, sección 1"
  },

  // 2. VOCABULARIO, SIGLAS Y MNEMOTECNIAS
  vocabulary: {
    acronyms: [
      {
        sigla: "ZTA",
        english: "Zero Trust Architecture",
        spanish: "Arquitectura de Confianza Cero",
        meaning: "Marco de diseño de ciberseguridad basado en principios de no confiar en nadie por defecto y verificar continuamente."
      },
      {
        sigla: "PDP",
        english: "Policy Decision Point",
        spanish: "Punto de Decisión de Políticas",
        meaning: "El cerebro analítico central (compuesto por PE y PA) que evalúa si un usuario o máquina tiene derecho a acceder a un recurso."
      },
      {
        sigla: "PEP",
        english: "Policy Enforcement Point",
        spanish: "Punto de Aplicación de Políticas",
        meaning: "El guardián en la puerta del flujo de datos que intercepta el tráfico y ejecuta físicamente la orden de abrir o bloquear la conexión."
      },
      {
        sigla: "PE",
        english: "Policy Engine",
        spanish: "Motor de Políticas",
        meaning: "Componente del PDP que toma la decisión definitiva de acceso comparando las reglas con el contexto de riesgo."
      },
      {
        sigla: "PA",
        english: "Policy Administrator",
        spanish: "Administrador de Políticas",
        meaning: "Componente del PDP que emite las credenciales y comanda al PEP para establecer o revocar la sesión."
      },
      {
        sigla: "JIT",
        english: "Just-In-Time Access",
        spanish: "Acceso Justo a Tiempo",
        meaning: "Otorgar privilegios elevados únicamente durante el tiempo exacto que dura la tarea técnica, revocándolos de inmediato."
      },
      {
        sigla: "JEA",
        english: "Just-Enough-Access",
        spanish: "Acceso Solo lo Suficiente",
        meaning: "Limitar los comandos o permisos exactamente a los necesarios para la tarea, evitando privilegios administrativos totales."
      },
      {
        sigla: "RBAC",
        english: "Role-Based Access Control",
        spanish: "Control de Acceso Basado en Roles",
        meaning: "Asignación de permisos vinculados formalmente al puesto de trabajo de la persona en el organigrama."
      },
      {
        sigla: "ABAC",
        english: "Attribute-Based Access Control",
        spanish: "Control de Acceso Basado en Atributos",
        meaning: "Asignación dinámica de permisos según atributos contextuales (hora, ubicación, salud del dispositivo, tipo de red)."
      },
      {
        sigla: "mTLS",
        english: "Mutual Transport Layer Security",
        spanish: "Seguridad de Capa de Transporte Mutua",
        meaning: "Protocolo criptográfico donde cliente y servidor se autentican mutuamente mediante certificados digitales antes de comunicarse."
      }
    ],
    codeReadingGuide: {
      explanation: "NIST SP 800-207 clasifica los componentes en dos planos arquitectónicos: el Plano de Control (Control Plane) y el Plano de Datos (Data Plane).",
      example: "PDP vs. PEP",
      breakdown: [
        { part: "Plano de Control", role: "PDP (PE + PA)", desc: "El cerebro lógico que analiza atributos contextuales y decide autorizar o rechazar." },
        { part: "Plano de Datos", role: "PEP", desc: "El ejecutor operativo que intercepta los paquetes y habilita el túnel seguro hacia el recurso." }
      ],
      source: "NIST SP 800-207, sección 3.1"
    },
    mnemonics: [
      {
        name: "Los 3 Principios Fundamentales de Confianza Cero",
        tag: "Mnemotecnia (propia, no oficial)",
        phrase: "\"V-L-A: Verifica Siempre, Limita Privilegios, Asume la Brecha\"",
        breakdown: [
          "V → Verify Explicitly (Verifica explícitamente con identidad + dispositivo + contexto)",
          "L → Least Privilege (Limita al privilegio mínimo indispensable con JIT y JEA)",
          "A → Assume Breach (Asume que ya están adentro: microsegmenta y reduce el blast radius)"
        ]
      },
      {
        name: "Los 6 Dominios Zero Trust de CB05",
        tag: "Mnemotecnia (propia, no oficial)",
        phrase: "\"I-E-A-D-I-R: Identidades y Equipos Acceden a Datos sobre Infraestructura y Redes\"",
        breakdown: [
          "I → Identidades (usuarios y cuentas)",
          "E → Endpoints (laptops, servidores, móviles)",
          "A → Aplicaciones (sistemas, APIs)",
          "D → Datos (información en reposo y tránsito)",
          "I → Infraestructura (servidores cloud, contenedores)",
          "R → Redes (microsegmentación)"
        ]
      }
    ]
  },

  // 3. CONCEPTOS PASO A PASO (De lo simple a lo complejo)
  stepByStepConcepts: [
    {
      id: "step-1-castle-and-moat-collapse",
      order: 1,
      name: "El Colapso del Modelo Perimetral ('Castillo y Foso')",
      whatIs: "El modelo tradicional construía un muro perimetral fuerte (firewalls, VPN) alrededor de la empresa, pero dentro de ese muro la red era plana y confiaba ciegamente en cualquier dispositivo conectado. El modelo colapsó con la nube, el trabajo remoto y los ataques dirigidos.",
      whyUseful: "Permite entender por qué las empresas con firewalls perimetrales de última generación siguen sufriendo filtraciones masivas cuando un atacante compromete una simple credencial de VPN.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "En un enfoque moderno, un empleado que se conecta desde casa a la red corporativa no recibe acceso libre a toda la LAN; solo se le abre una sesión autenticada punto a punto hacia la aplicación que necesita."
        },
        {
          label: "Ejemplo Mal",
          text: "En el modelo antiguo, otorgar acceso VPN a un consultor de soporte le daba visibilidad de toda la subred 192.168.1.0/24, permitiéndole escanear bases de datos de recursos humanos y finanzas."
        }
      ],
      relationships: "Este colapso justifica el nacimiento de Zero Trust y conecta con el caso Target de Sesión 1 y la gestión de accesos de Sesión 6.",
      source: "Diapositivas Sesión 5, diapositiva 4"
    },
    {
      id: "step-2-verify-explicitly",
      order: 2,
      name: "Principio 1: Verificar Explícitamente (Verify Explicitly)",
      whatIs: "Exige validar siempre todas las señales disponibles antes de conceder acceso: identidad del usuario, autenticación multifactor (MFA), estado de salud y parches del dispositivo, ubicación geográfica y anomalías en el comportamiento.",
      whyUseful: "Impide que un atacante que robó una contraseña pueda usarla desde una computadora no corporativa o desde un país donde la empresa no tiene operaciones.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "El sistema de acceso condicional exige MFA y verifica que la laptop tenga BitLocker activado y antivirus actualizado antes de permitir abrir el correo corporativo."
        },
        {
          label: "Ejemplo Mal",
          text: "Validar únicamente si el usuario escribió la contraseña correcta, permitiendo que un atacante en el extranjero ingrese sin pedir ningún segundo factor ni validar el dispositivo."
        }
      ],
      relationships: "Se apoya en la gestión de identidades y endpoints (Sesión 6) y se materializa mediante el Policy Engine del NIST SP 800-207.",
      source: "Diapositivas Sesión 5, diapositiva 9; NIST SP 800-207, sección 2.1"
    },
    {
      id: "step-3-least-privilege",
      order: 3,
      name: "Principio 2: Privilegio Mínimo (Least Privilege) con JIT y JEA",
      whatIs: "Garantiza que los usuarios, aplicaciones y servicios solo tengan los permisos estrictamente indispensables para cumplir su tarea. Incorpora Just-In-Time (permisos temporales que caducan) y Just-Enough-Access (solo los comandos necesarios).",
      whyUseful: "Limita el impacto si una cuenta es comprometida. Si un empleado de contabilidad es atacado, el adversario solo puede acceder a lo que ese empleado ve, no a la infraestructura completa.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Un administrador de sistemas utiliza una cuenta estándar para su trabajo diario y solo eleva permisos a 'Administrador' durante 2 horas tras solicitar autorización formal en una herramienta PAM."
        },
        {
          label: "Ejemplo Mal",
          text: "Dar permisos de 'Domain Admin' (administrador total) a 20 ingenieros de soporte de forma permanente para que 'no tengan problemas al configurar impresoras'."
        }
      ],
      relationships: "Se vincula directamente con los Controles 5 y 6 de CIS Controls v8.1 y la Matriz RACI (S2).",
      source: "Diapositivas Sesión 5, diapositiva 10"
    },
    {
      id: "step-4-assume-breach",
      order: 4,
      name: "Principio 3: Asumir la Brecha (Assume Breach) y Blast Radius",
      whatIs: "Diseñar toda la arquitectura asumiendo que los atacantes ya tienen una máquina o cuenta comprometida dentro de la red interna. Se enfoca en minimizar el 'radio de impacto' (Blast Radius) mediante microsegmentación, cifrado de extremo a extremo y telemetría continua.",
      whyUseful: "Evita el 'movimiento lateral'. Si un atacante infecta la laptop de la recepcionista, queda encerrado en un microsegmento aislado sin poder alcanzar los servidores de bases de datos.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Una empresa aísla cada servidor en su propio microsegmento y cifra todas las comunicaciones internas con TLS 1.3; un ransomware en una PC no puede propagarse a ningún servidor vecino."
        },
        {
          label: "Ejemplo Mal",
          text: "Mantener todos los servidores y terminales en la misma VLAN sin firewalls internos; un malware entra por una máquina y cifra 500 computadoras en 20 minutos."
        }
      ],
      relationships: "Alimenta los controles de resiliencia y copias de respaldo de Sesión 7 y los sistemas EDR de Sesión 6.",
      source: "Diapositivas Sesión 5, diapositiva 11"
    },
    {
      id: "step-5-nist-sp-800-207-tenets",
      order: 5,
      name: "Los 7 Tenets de NIST SP 800-207 (Axiomas Fundamentales)",
      whatIs: "Los 7 principios técnicos oficiales estandarizados por NIST que definen formalmente una arquitectura Zero Trust: (1) Todo origen de datos y servicio es un recurso, (2) Toda comunicación se asegura sin importar la red, (3) Acceso otorgado por sesión individual, (4) Acceso determinado por política dinámica, (5) Monitoreo de integridad de activos, (6) Autenticación y autorización estrictamente dinámicas, (7) Recolección continua de telemetría.",
      whyUseful: "Ofrece un estándar de ingeniería verificable para auditar si una arquitectura es verdaderamente Zero Trust o solo una etiqueta publicitaria de marketing.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "La empresa aplica el Tenet 2 (toda comunicación se asegura independientemente de la ubicación) cifrando el tráfico entre dos servidores colocados en el mismo rack del centro de datos propio."
        },
        {
          label: "Ejemplo Mal",
          text: "Transmitir contraseñas en texto plano por HTTP o Telnet dentro de la red interna de la oficina argumentando que 'estamos detrás del firewall corporativo'."
        }
      ],
      relationships: "Establece el puente técnico directo con la pestaña de Marcos de Referencia del curso.",
      source: "NIST SP 800-207, sección 2.1; Diapositivas Sesión 5, diapositivas 13 y 14"
    },
    {
      id: "step-6-pdp-pep-architecture",
      order: 6,
      name: "Arquitectura Lógica: PDP (PE + PA) vs. PEP",
      whatIs: "La división fundamental entre el plano de control y el plano de datos. El PDP (Policy Decision Point) es el cerebro que decide; se compone del Policy Engine (PE, motor que evalúa las reglas) y del Policy Administrator (PA, emite comandos y credenciales). El PEP (Policy Enforcement Point) es el guardián en el plano de datos que aplica la decisión abriendo o cerrando el paso.",
      whyUseful: "Resuelve una trampa clásica de arquitectura: el componente que inspecciona los paquetes (PEP) no decide las reglas de negocio; solo ejecuta las órdenes emitidas por el cerebro central (PDP).",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "El PEP (un gateway inverso) intercepta una petición web; consulta al PDP; el PE revisa la política y decide autorizar; el PA genera un token firmado; el PEP permite el paso al servidor."
        },
        {
          label: "Ejemplo Mal",
          text: "Configurar reglas estáticas directamente en el router sin consulta a un motor central de políticas; si la cuenta del usuario es suspendida en el directorio, el router sigue permitiendo el acceso."
        }
      ],
      relationships: "Se confunde frecuentemente en preguntas de examen: PE decide, PA comanda credenciales, PEP aplica la conexión en el tráfico real.",
      source: "NIST SP 800-207, sección 3.1; Diapositivas Sesión 5, diapositiva 15"
    },
    {
      id: "step-7-microsegmentation",
      order: 7,
      name: "Microsegmentación de Redes vs. Segmentación Tradicional por VLAN",
      whatIs: "La segmentación tradicional agrupa cientos de máquinas en una misma subred VLAN según su piso o departamento. La microsegmentación Zero Trust crea perímetros de seguridad individuales y granulares alrededor de cada carga de trabajo o aplicación, bloqueando el tráfico este-oeste (lateral).",
      whyUseful: "Neutraliza el movimiento lateral de los atacantes dentro de la red corporativa.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Cada contenedor y máquina virtual en la nube tiene políticas que solo le permiten comunicarse con la base de datos por el puerto 5432 y bloquean todo intento de conexión hacia otros servidores vecinos."
        },
        {
          label: "Ejemplo Mal",
          text: "Poner todos los servidores de producción en la misma VLAN; cuando un atacante compromete un servidor web, escanea libremente los puertos de toda la infraestructura."
        }
      ],
      relationships: "Es el mecanismo técnico indispensable para hacer realidad el principio de 'Asumir la Brecha' (Assume Breach).",
      source: "Diapositivas Sesión 5, diapositiva 16"
    },
    {
      id: "step-8-six-domains-cisa",
      order: 8,
      name: "Los 6 Dominios Zero Trust de CB05 y el Modelo CISA",
      whatIs: "El curso organiza la arquitectura en 6 dominios: 1. Identidades (S6), 2. Endpoints (S6), 3. Aplicaciones (S7), 4. Datos (S7), 5. Infraestructura y 6. Redes. La agencia CISA agrupa estos conceptos en 5 pilares con niveles de madurez (Tradicional, Inicial, Avanzado, Óptimo).",
      whyUseful: "Estructura el alcance completo del Proyecto Integrador y garantiza que los estudiantes aborden la seguridad holísticamente y no solo desde el cable de red.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Evaluar la madurez de una empresa diagnosticando cada uno de los 6 dominios para diseñar un Target Profile integral y equilibrado."
        },
        {
          label: "Ejemplo Mal",
          text: "Invertir el 100% del presupuesto de ciberseguridad en firewalls de red mientras las identidades carecen de MFA y los datos en reposo están sin cifrar."
        }
      ],
      relationships: "Es el mapa que guía las Sesiones 6 (Identidad y Endpoints) y 7 (Aplicaciones y Datos) y el sustento del proyecto.",
      source: "Sílabo Oficial CB05; CISA Zero Trust Maturity Model v2.0"
    }
  ],

  // 4. CÓMO SE CONECTA TODO (Mapa conceptual / Flujo SVG)
  connectionDiagram: {
    description: "La arquitectura Zero Trust conecta al sujeto y al recurso a través de un plano de control y un plano de datos: el usuario y su dispositivo son interceptados por el PEP; el PDP (PE + PA) evalúa atributos contextuales; si se aprueba, se abre un canal seguro microsegmentado exclusivo para esa sesión.",
    svgContent: `
      <div class="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 760 380" class="w-full max-w-[760px] mx-auto block text-executive-900 dark:text-white" style="min-width: 320px;" aria-label="Diagrama de Arquitectura Zero Trust: NIST SP 800-207">
          <rect x="10" y="10" width="740" height="360" rx="16" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="1.5" />
          
          <!-- PLANO DE CONTROL (ARRIBA - PDP) -->
          <g transform="translate(180, 30)">
            <rect width="400" height="110" rx="12" fill="#8b5cf6" fill-opacity="0.12" stroke="#8b5cf6" stroke-width="2"/>
            <text x="200" y="24" text-anchor="middle" font-weight="bold" font-size="14" fill="#8b5cf6">PLANO DE CONTROL (PDP - Policy Decision Point)</text>
            
            <!-- POLICY ENGINE (PE) -->
            <rect x="20" y="38" width="170" height="55" rx="8" fill="#8b5cf6" fill-opacity="0.2" stroke="#8b5cf6" stroke-width="1.5"/>
            <text x="105" y="60" text-anchor="middle" font-weight="bold" font-size="12" fill="currentColor">Policy Engine (PE)</text>
            <text x="105" y="78" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.85">Cerebro: Decide autorizar</text>

            <!-- POLICY ADMINISTRATOR (PA) -->
            <rect x="210" y="38" width="170" height="55" rx="8" fill="#8b5cf6" fill-opacity="0.2" stroke="#8b5cf6" stroke-width="1.5"/>
            <text x="295" y="60" text-anchor="middle" font-weight="bold" font-size="12" fill="currentColor">Policy Admin (PA)</text>
            <text x="295" y="78" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.85">Emite comandos y credenciales</text>
          </g>

          <!-- FLECHAS DE CONTROL ENTRE PLANO DE CONTROL Y DATOS -->
          <path d="M 380 140 L 380 200" stroke="#8b5cf6" stroke-width="2.5" stroke-dasharray="5 5" fill="none"/>
          <text x="430" y="175" font-size="11" font-weight="bold" fill="#8b5cf6">Comandos de Control</text>

          <!-- PLANO DE DATOS (ABAJO - FLUJO REAL) -->
          <!-- USUARIO / DISPOSITIVO (IZQUIERDA) -->
          <g transform="translate(30, 200)">
            <rect width="190" height="90" rx="10" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-width="2"/>
            <text x="95" y="32" text-anchor="middle" font-weight="bold" font-size="13" fill="currentColor">Sujeto / Dispositivo</text>
            <text x="95" y="52" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Identidad + Postura del Endpoint</text>
            <text x="95" y="72" text-anchor="middle" font-size="10" font-weight="bold" fill="#3b82f6">Verify Explicitly</text>
          </g>

          <!-- FLECHA HACIA EL PEP -->
          <path d="M 220 245 L 280 245" stroke="#3b82f6" stroke-width="2.5" fill="none"/>

          <!-- NODO CENTRAL: PEP (Policy Enforcement Point) -->
          <g transform="translate(280, 200)">
            <rect width="200" height="90" rx="12" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="2.5"/>
            <text x="100" y="32" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">PEP (Plano de Datos)</text>
            <text x="100" y="52" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.85">Guardián de la puerta</text>
            <text x="100" y="72" text-anchor="middle" font-size="10" font-weight="bold" fill="#10b981">Intercepta & Aplica Acceso</text>
          </g>

          <!-- FLECHA HACIA EL RECURSO -->
          <path d="M 480 245 L 540 245" stroke="#10b981" stroke-width="2.5" fill="none"/>

          <!-- RECURSO CORPORATIVO (DERECHA) -->
          <g transform="translate(540, 200)">
            <rect width="190" height="90" rx="10" fill="#f59e0b" fill-opacity="0.12" stroke="#f59e0b" stroke-width="2"/>
            <text x="95" y="32" text-anchor="middle" font-weight="bold" font-size="13" fill="currentColor">Recurso Corporativo</text>
            <text x="95" y="52" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">App, Base de Datos, API</text>
            <text x="95" y="72" text-anchor="middle" font-size="10" font-weight="bold" fill="#f59e0b">Least Privilege & Blast Radius</text>
          </g>

          <!-- RESUMEN INFERIOR -->
          <text x="380" y="335" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor" opacity="0.9">
            Toda conexión se cifra, se otorga por sesión dinámica y se evalúa continuamente sin confiar en la red interna.
          </text>
        </svg>
      </div>
    `,
    summaryText: "El plano de control (PDP: PE y PA) evalúa dinámicamente el riesgo de la identidad y del dispositivo; el guardián operativo (PEP) intercepta el tráfico y aplica la orden de acceso exclusivo hacia el recurso, limitando el movimiento lateral."
  },

  // 5. DIFERENCIAS CLAVE (Tablas comparativas reales)
  keyDifferences: [
    {
      id: "diff-traditional-vs-zero-trust",
      pairTitle: "Modelo Perimetral Tradicional vs. Arquitectura Confianza Cero (Zero Trust)",
      colA: "Modelo Tradicional (Castillo y Foso)",
      colB: "Confianza Cero (Zero Trust)",
      rows: [
        { aspect: "Base de la confianza", valA: "Ubicación de red: si estás dentro de la oficina o VPN, eres de confianza.", valB: "Identidad del usuario, salud del endpoint y contexto dinámico en cada acceso." },
        { aspect: "Comportamiento tras autenticar", valA: "Acceso libre a subredes enteras; permite movimiento lateral de atacantes.", valB: "Acceso punto a punto acotado exclusivamente a un recurso específico." },
        { aspect: "Cifrado de tráfico", valA: "Cifrado solo en el perímetro externo; tráfico interno sin cifrar.", valB: "Cifrado integral de extremo a extremo en todo el tráfico (Tenet 2)." },
        { aspect: "La señal que decide", valA: "¿El caso confía en que los usuarios están protegidos porque 'están en la LAN de la oficina'? → Perimetral.", valB: "¿El caso exige validar la postura de la máquina y MFA dinámico en cada consulta? → Zero Trust." }
      ]
    },
    {
      id: "diff-pe-vs-pa-vs-pep",
      pairTitle: "Policy Engine (PE) vs. Policy Administrator (PA) vs. Policy Enforcement Point (PEP)",
      colA: "Policy Engine (PE) + Policy Admin (PA)",
      colB: "Policy Enforcement Point (PEP)",
      rows: [
        { aspect: "Plano arquitectónico", valA: "Plano de Control (Control Plane / PDP).", valB: "Plano de Datos (Data Plane)." },
        { aspect: "¿Qué función cumple?", valA: "El PE decide si corresponde autorizar; el PA emite órdenes y credenciales.", valB: "Intercepta el tráfico de red y abre o bloquea físicamente la sesión." },
        { aspect: "Ejemplo de tecnología", valA: "Motor de Acceso Condicional de Azure AD / Okta Identity Engine.", valB: "Proxy inverso, gateway de API, agente de endpoint o firewall de aplicaciones." },
        { aspect: "La señal que decide", valA: "¿El componente es el que 'piensa y decide' según las reglas? → PE / PA (PDP).", valB: "¿El componente es el 'portero que intercepta paquetes' en la red? → PEP." }
      ]
    },
    {
      id: "diff-vlan-vs-microsegmentation",
      pairTitle: "Segmentación Tradicional (VLAN) vs. Microsegmentación Zero Trust",
      colA: "Segmentación por VLAN",
      colB: "Microsegmentación Zero Trust",
      rows: [
        { aspect: "Nivel de granularidad", valA: "Agrupa cientos de equipos en una subred IP amplia (ej.: toda Contabilidad).", valB: "Perímetro granular individual alrededor de cada carga de trabajo o proceso." },
        { aspect: "Tráfico Este-Oeste (lateral)", valA: "Permitido libremente entre todas las computadoras de la misma VLAN.", valB: "Bloqueado por defecto; cada máquina solo habla con lo que tiene autorizado." },
        { aspect: "Resistencia a Ransomware", valA: "Baja: un equipo infectado infecta a todos los compañeros de su VLAN.", valB: "Alta: el ransomware queda confinado en la máquina infectada sin propagarse." },
        { aspect: "La señal que decide", valA: "¿Las reglas se basan en subredes IP e interfaces de routers? → VLAN.", valB: "¿Las reglas aíslan procesos individuales independientemente de la IP? → Microsegmentación." }
      ]
    },
    {
      id: "diff-static-vpn-vs-conditional-access",
      pairTitle: "VPN Tradicional vs. Acceso Condicional Dinámico (ZTA)",
      colA: "VPN Tradicional",
      colB: "Acceso Condicional Dinámico (ZTA)",
      rows: [
        { aspect: "Tipo de acceso otorgado", valA: "Acceso amplio a la capa de red (Capa 3); túnel hacia toda la subred.", valB: "Acceso por aplicación individual (Capa 7); sin visibilidad de la red interna." },
        { aspect: "Re-evaluación de sesión", valA: "Estática: una vez conectado, dura 8 o 24 horas sin volver a validar.", valB: "Continua: si el dispositivo pierde parches o viaja de país, se revoca la sesión." },
        { aspect: "La señal que decide", valA: "¿Un atacante con credenciales de VPN puede escanear IPs internas? → VPN Tradicional.", valB: "¿El sistema evalúa si la laptop corporativa tiene antivirus activo antes de cada clic? → Acceso Condicional ZTA." }
      ]
    }
  ],

  // 6. PREGUNTAS PARA RAZONAR (Guía de análisis de casos de arquitectura)
  reasoningQuestions: [
    {
      step: 1,
      question: "¿La empresa otorga acceso por ubicación de red o verifica explícitamente en cada solicitud?",
      action: "Pregúntate si un empleado dentro de la oficina física tiene más privilegios que uno en su casa. Si la red local no exige MFA ni valida el estado de la máquina, viola el Tenet 2 de NIST SP 800-207."
    },
    {
      step: 2,
      question: "¿Se aplican privilegios mínimos permanentes o dinámicos (Just-In-Time)?",
      action: "Revisa si las cuentas de administrador tienen privilegios totales 24/7. En Zero Trust, los permisos elevados solo se conceden bajo solicitud formal y caducan automáticamente tras pocas horas."
    },
    {
      step: 3,
      question: "¿La infraestructura está diseñada asumiendo que ya hay un atacante adentro (Assume Breach)?",
      action: "Verifica si existe microsegmentación. Si una laptop infectada en Marketing puede enviar tráfico libremente a los servidores de base de datos, el radio de impacto (Blast Radius) es inaceptable."
    },
    {
      step: 4,
      question: "¿Dónde residen el PDP (Policy Decision Point) y el PEP (Policy Enforcement Point)?",
      action: "Identifica qué componente toma la decisión analítica (PDP) y qué agente o gateway intercepta el tráfico real (PEP). Asegúrate de que el PEP no tome decisiones huérfanas."
    },
    {
      step: 5,
      question: "¿Qué dominio de los 6 del curso está fallando en el escenario?",
      action: "Identifica si la debilidad está en Identidades (falta de MFA), Endpoints (dispositivos sin parches), Aplicaciones (APIs abiertas), Datos (sin cifrado), Infraestructura o Redes (red plana)."
    }
  ],

  // 7. ERRORES TÍPICOS ("Si piensas X, ojo: ...")
  typicalErrors: [
    {
      ifYouThink: "Si piensas que Zero Trust es un producto o software que se compra e instala en un servidor...",
      watchOut: "Ojo: Zero Trust es una estrategia y modelo de arquitectura integral, no un producto único. Ningún fabricante vende 'Zero Trust en una caja'; requiere coordinar identidades, dispositivos, redes y datos."
    },
    {
      ifYouThink: "Si piensas que conectarse mediante una VPN corporativa ya cumple con Zero Trust...",
      watchOut: "Ojo: La VPN tradicional es el ejemplo clásico del modelo perimetral antiguo: otorga acceso amplio a la red interna (Capa 3). Zero Trust busca reemplazar las VPNs tradicionales por accesos condicionales por aplicación (ZTNA)."
    },
    {
      ifYouThink: "Si piensas que el PEP (Policy Enforcement Point) es el que analiza las políticas de riesgo y decide el acceso...",
      watchOut: "Ojo: El PEP solo intercepta el tráfico y obedece órdenes. Quien analiza los atributos y toma la decisión de autorizar o denegar es el Policy Engine (PE) dentro del PDP."
    },
    {
      ifYouThink: "Si piensas que estar físicamente dentro de la sede de la empresa te exime de verificar tu identidad...",
      watchOut: "Ojo: El Tenet 2 de NIST SP 800-207 prohíbe explícitamente confiar en la ubicación de red. La red de la oficina se trata con la misma desconfianza que una red Wi-Fi de un aeropuerto."
    },
    {
      ifYouThink: "Si piensas que la microsegmentación y la segmentación por VLAN son lo mismo...",
      watchOut: "Ojo: La VLAN agrupa cientos de máquinas en una subred donde pueden atacarse lateralmente entre sí. La microsegmentación aísla cargas de trabajo individuales a nivel de aplicación."
    },
    {
      ifYouThink: "Si piensas que Zero Trust entorpece el trabajo porque 'no confía en los empleados'...",
      watchOut: "Ojo: Zero Trust no desconfía de la integridad moral de los empleados; desconfía de que sus credenciales o computadoras hayan sido comprometidas silenciosamente por atacantes externos."
    }
  ],

  // 8. PARA PROFUNDIZAR (Colapsado, opcional)
  deepDive: [
    {
      title: "El Modelo de Madurez de CISA v2.0 (Zero Trust Maturity Model)",
      content: "La Cybersecurity and Infrastructure Security Agency (CISA) de EE.UU. define 4 etapas de madurez evolutiva en Confianza Cero: Tradicional (procesos manuales y perimetrales), Inicial (primeras automatizaciones de MFA y segmentación), Avanzado (políticas centralizadas de PDP y visibilidad transversal) y Óptimo (decisiones dinámicas automatizadas con aprendizaje automático y respuesta en tiempo real)."
    },
    {
      title: "La Estrategia BeyondCorp de Google (2014)",
      content: "Tras Operación Aurora, Google eliminó el acceso privilegiado a la intranet. En BeyondCorp, todos los colaboradores acceden a las aplicaciones corporativas exclusivamente a través de internet público mediado por un proxy inverso central que verifica la identidad del empleado y el certificado criptográfico de la máquina en cada solicitud."
    },
    {
      title: "Relación entre NIST SP 800-207 y NIST CSF 2.0",
      content: "NIST CSF 2.0 actúa como el marco de gestión y gobierno ('QUÉ resultados organizacionales lograr en políticas y riesgos'), mientras que NIST SP 800-207 actúa como la arquitectura técnica de ingeniería ('CÓMO diseñar los sistemas y redes para lograr esos resultados sin perímetros implícitos')."
    }
  ],

  // 9. FUENTES DE LA SESIÓN
  sources: [
    {
      doc: "NIST SP 800-207: Zero Trust Architecture (NIST, Agosto 2020)",
      detail: "Sección 2: Conceptos fundamentales y los 7 Tenets; Sección 3: Arquitectura lógica (PDP, PE, PA, PEP), páginas 1-18. Documento público disponible en docs/NIST.SP.800-207.pdf."
    },
    {
      doc: "Diapositivas Sesión 5: 'Arquitectura Confianza Cero (Zero Trust)' (UPC, CB05)",
      detail: "Material pedagógico oficial de la docente, diapositivas 1 a 20. Incluye límites del modelo perimetral, los 3 principios rectores, los 6 dominios y Operación Aurora. Disponible en docs/Presentación - Sesion 5.pdf."
    },
    {
      doc: "CISA Zero Trust Maturity Model (Versión 2.0, 2023)",
      detail: "Pilares de madurez técnica: Identidades, Dispositivos, Redes, Aplicaciones y Datos, con gobierno transversal."
    },
    {
      doc: "Caso de Estudio Corporativo: Operación Aurora (Google Inc. y McAfee, 2009-2010)",
      detail: "Análisis forense del ataque APT que impulsó el desarrollo de la arquitectura BeyondCorp."
    }
  ]
};
