// Guía de Lectura y Comprensión Pedagógica Oficial - Sesión 6: Dominios Identidades y Endpoints
// Basado directamente en: docs/Presentación - Sesion 6.pdf, docs/CIS_Controls_Guide_v8.1.2_0325_v2.pdf y Sílabo CB05 (UPC)
// Diseñado para lectura pausada en celular y laptop (Scaffolding, siglas expandidas y ejemplos prácticos)

window.SESION_6_DATA = {
  id: "s6",
  number: 6,
  title: "Sesión 6: Dominios Identidades y Endpoints (Dispositivos)",
  shortTitle: "S6: Identidades & Endpoints",

  // 0. CABECERA PEDAGÓGICA
  header: {
    oneLiner: "La Identidad es el nuevo perímetro corporativo y el Endpoint es la puerta física de entrada: esta sesión aborda el ciclo de vida de cuentas, MFA resistente a phishing, PAM, verificación de postura, agentes EDR y los controles esenciales de CIS Controls v8.1.",
    readingTime: "12 min de lectura pausada",
    prerequisites: [
      { text: "Los principios de Zero Trust: Verify Explicitly y Least Privilege (S5)", link: "s5" },
      { text: "El inventario de activos de hardware y personas (S3)", link: "s3" }
    ],
    outcomes: [
      "Comprender el ciclo de vida integral de las identidades: Alta (Onboarding), Movilidad (Mover) y Baja Inmediata (Offboarding).",
      "Diferenciar Autenticación (AuthN) de Autorización (AuthZ) y el rol de las cuentas privilegiadas mediante PAM y JIT.",
      "Entender la superioridad del EDR frente al antivirus tradicional basado en firmas en un entorno que asume la brecha.",
      "Distinguir el Hardening (endurecimiento de configuración) del Parcheo de vulnerabilidades de software.",
      "Dominar la aplicación práctica de los Controles 1, 2, 5, 6 y 10 de CIS Controls v8.1."
    ]
  },

  // 1. LA IDEA CENTRAL
  centralIdea: {
    problemStatement: "En la era de la nube y el teletrabajo, las oficinas ya no tienen paredes fijas: los empleados acceden a los sistemas desde cualquier parte del mundo. Los cibercriminales ya no intentan hackear firewalls complejos; simplemente roban o clonan contraseñas legítimas a través de phishing, ingeniería social o computadoras personales desprotegidas, caminando hacia adentro como si fueran usuarios autorizados.",
    coreConcept: "El dominio de Identidades convierte a la persona y a su contexto en la frontera de seguridad más importante, mientras que el dominio de Endpoints asegura que la computadora o teléfono móvil desde donde se conecta esté endurecida, verificada y libre de malware activo antes de permitir cualquier transacción.",
    caseConnection: "En el ciberataque a Twitter (2020), adolescentes engañaron por teléfono a empleados de soporte técnico mediante ingeniería social (vishing). Como los empleados tenían acceso irrestricto y carecían de controles de privilegio mínimo (CIS Control 6), los atacantes utilizaron las herramientas internas de administración para secuestrar las cuentas de Barack Obama, Elon Musk y Joe Biden. En 2022, el atacante de LastPass infectó la laptop personal de un ingeniero con malware para robar llaves de acceso a las bóvedas en la nube. Ambos casos demuestran que una identidad o un endpoint desprotegido compromete a toda la organización.",
    source: "Diapositivas Sesión 6, diapositivas 3, 5 y 10; CIS Controls v8.1, Controles 5 y 6"
  },

  // 2. VOCABULARIO, SIGLAS Y MNEMOTECNIAS
  vocabulary: {
    acronyms: [
      {
        sigla: "MFA",
        english: "Multi-Factor Authentication",
        spanish: "Autenticación Multifactor",
        meaning: "Exigir al menos dos factores distintos de autenticación: algo que sabes (clave), algo que tienes (llave FIDO2) o algo que eres (biometría)."
      },
      {
        sigla: "PAM",
        english: "Privileged Access Management",
        spanish: "Gestión de Accesos Privilegiados",
        meaning: "Plataforma de seguridad para proteger, monitorear y aislar cuentas con permisos administrativos críticos (Domain Admin, root)."
      },
      {
        sigla: "EDR",
        english: "Endpoint Detection and Response",
        spanish: "Detección y Respuesta en Puntos Finales",
        meaning: "Agente instalado en computadoras que analiza comportamientos sospechosos en memoria y puede aislar la máquina de la red automáticamente."
      },
      {
        sigla: "MDM",
        english: "Mobile Device Management",
        spanish: "Gestión de Dispositivos Móviles",
        meaning: "Software para administrar, configurar de forma remota y aplicar políticas de seguridad en laptops y teléfonos corporativos."
      },
      {
        sigla: "FIDO2",
        english: "Fast Identity Online 2",
        spanish: "Estándar FIDO2 (WebAuthn)",
        meaning: "Estándar de autenticación criptográfica basado en llaves de hardware (YubiKey) inmune al phishing y al robo de códigos."
      },
      {
        sigla: "UEBA",
        english: "User and Entity Behavior Analytics",
        spanish: "Analítica del Comportamiento de Usuarios y Entidades",
        meaning: "Algoritmos que detectan anomalías cuando un usuario hace algo fuera de su patrón habitual (ej.: descargar 5,000 archivos a las 3 a.m.)."
      },
      {
        sigla: "AuthN",
        english: "Authentication",
        spanish: "Autenticación",
        meaning: "El proceso técnico de verificar '¿Quién eres tú?' mediante credenciales válidas."
      },
      {
        sigla: "AuthZ",
        english: "Authorization",
        spanish: "Autorización",
        meaning: "El proceso técnico de verificar '¿A qué recursos específicos tienes permiso de entrar?' según tu rol formal."
      }
    ],
    codeReadingGuide: {
      explanation: "En CIS Controls v8.1, cada salvaguarda se identifica por el número de Control seguido del número específico de salvaguarda.",
      example: "CIS Control 6.1",
      breakdown: [
        { part: "Control 6", role: "Familia de Control", desc: "Access Control Management (Gestión del Control de Acceso) — El dominio general." },
        { part: ".1", role: "Salvaguarda Específica", desc: "Establecer un proceso formal de control de acceso para otorgar y revocar permisos." }
      ],
      source: "CIS Controls Guide v8.1, pág. 24"
    },
    mnemonics: [
      {
        name: "Autenticación vs. Autorización",
        tag: "Mnemotecnia (propia, no oficial)",
        phrase: "\"AuthN es tu DNI (quién eres); AuthZ es tu llave (a qué cuarto puedes pasar)\"",
        breakdown: [
          "Autenticación (AuthN): Valida la identidad de la persona (DNI, contraseña, huella).",
          "Autorización (AuthZ): Valida los permisos de esa persona (llave de acceso a la base de datos de nóminas)."
        ]
      },
      {
        name: "El Ciclo de Vida de la Cuenta (CIS Control 5)",
        tag: "Mnemotecnia (propia, no oficial)",
        phrase: "\"A-M-B: Alta, Movilidad, Baja Inmediata\"",
        breakdown: [
          "A → Alta (Onboarding: cuenta creada con privilegios mínimos tras aprobación formal)",
          "M → Movilidad (Mover: cambio de puesto implica revocar permisos antiguos y asignar nuevos)",
          "B → Baja (Offboarding: desactivación de todas las sesiones activas en menos de 24 horas)"
        ]
      }
    ]
  },

  // 3. CONCEPTOS PASO A PASO (De lo simple a lo complejo)
  stepByStepConcepts: [
    {
      id: "step-1-identity-new-perimeter",
      order: 1,
      name: "La Identidad como Nuevo Perímetro de Seguridad",
      whatIs: "El principio que establece que los controles de seguridad deben orbitar alrededor del usuario y de su contexto digital (su cuenta, su rol, su dispositivo), independientemente de la red física donde se encuentre.",
      whyUseful: "Permite proteger los sistemas corporativos aunque los empleados trabajen desde casa, cafeterías o viajes internacionales sin comprometer la seguridad central.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Un banco centraliza todos sus accesos a través de un proveedor de identidades en la nube (IdP) con inicio de sesión único (SSO) y autenticación multifactor obligatoria para el 100% de usuarios."
        },
        {
          label: "Ejemplo Mal",
          text: "Una empresa mantiene 10 aplicaciones con contraseñas locales independientes creadas por cada usuario en hojas de cálculo, sin forma de saber quién accede a qué sistema."
        }
      ],
      relationships: "Es la materialización práctica del principio 'Verify Explicitly' de Zero Trust (S5).",
      source: "Diapositivas Sesión 6, diapositiva 4"
    },
    {
      id: "step-2-mfa-phishing-resistant",
      order: 2,
      name: "Autenticación Multifactor (MFA) Phishing-Resistant vs. MFA por SMS",
      whatIs: "MFA exige al menos 2 factores distintos. Sin embargo, el MFA tradicional por mensaje de texto SMS o llamadas es inseguro porque los atacantes pueden interceptar los códigos (SIM Swapping) o engañar al usuario para que los digite en páginas falsas (phishing inverso). El MFA moderno resistente al phishing (FIDO2 / llaves YubiKey) utiliza criptografía de clave pública vinculada al dominio legítimo, impidiendo que la clave sea robada.",
      whyUseful: "Neutraliza el 99% de los ataques de phishing dirigidos que logran engañar a los empleados.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Los empleados de finanzas y administradores utilizan llaves físicas USB FIDO2 para ingresar a los servidores; si abren un correo de phishing falso, el navegador detecta que no es el dominio real y bloquea el envío de la clave."
        },
        {
          label: "Ejemplo Mal",
          text: "Un banco envía códigos de 6 dígitos por SMS a teléfonos personales; un cibercriminal clona el chip de la víctima (SIM swap) e ingresa a la cuenta bancaria sin resistencia."
        }
      ],
      relationships: "Se alinea con la subcategoría PR.AA-01 de NIST CSF 2.0 y el Control 6 de CIS Controls v8.1.",
      source: "Diapositivas Sesión 6, diapositiva 7; CIS Controls v8.1, salvaguarda 6.3"
    },
    {
      id: "step-3-pam-jit",
      order: 3,
      name: "Gestión de Accesos Privilegiados (PAM) y Acceso Just-In-Time (JIT)",
      whatIs: "Las cuentas de administrador (Domain Admin, root) son el tesoro más codiciado por los atacantes. Con PAM y JIT, ningún empleado tiene permisos administrativos permanentes: las contraseñas maestras están encriptadas en una bóveda central, se solicitan bajo justificación, duran un tiempo limitado (ej. 2 horas) y la sesión es grabada y auditada.",
      whyUseful: "Evita que el compromiso de la computadora de un administrador entregue las llaves totales de la empresa al atacante.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Un ingeniero de redes solicita acceso temporal mediante PAM para parchar un firewall; el sistema aprueba por 1 hora, rota la contraseña automáticamente al finalizar y graba toda la sesión de comandos ejecutados."
        },
        {
          label: "Ejemplo Mal",
          text: "El caso Twitter (2020): los empleados de soporte tenían permisos administrativos permanentes activos en sus herramientas diarias, permitiendo a los atacantes secuestrar cuentas de líderes mundiales en minutos."
        }
      ],
      relationships: "Aplica de forma estricta el principio de 'Privilegio Mínimo' (Least Privilege de S5).",
      source: "Diapositivas Sesión 6, diapositiva 8"
    },
    {
      id: "step-4-identity-lifecycle",
      order: 4,
      name: "El Ciclo de Vida de la Identidad: Alta, Movilidad y Baja (Offboarding)",
      whatIs: "El proceso formal de gobernar una cuenta desde su creación (Alta con verificación), pasando por cambios de rol (Movilidad con revocación de accesos anteriores), hasta su eliminación definitiva (Baja inmediata cuando la persona renuncia o es despedida).",
      whyUseful: "Resuelve el problema de las 'cuentas zombies': usuarios que ya no trabajan en la empresa pero cuyas credenciales siguen activas en servidores y nubes corporativas durante meses.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Cuando un empleado renuncia, el sistema de RR.HH. dispara automáticamente un evento que revoca todas sus sesiones activas de SSO, elimina tokens y desactiva su cuenta en menos de 10 minutos."
        },
        {
          label: "Ejemplo Mal",
          text: "Un desarrollador contratado deja la empresa; 6 meses después, sus credenciales en GitHub corporativo siguen activas y un atacante las utiliza para descargar el código fuente de la compañía."
        }
      ],
      relationships: "Es el núcleo del Control 5 de CIS Controls v8.1 (Gestión de Cuentas) y de GV.SC (S2).",
      source: "CIS Controls Guide v8.1, Control 5; Diapositivas Sesión 6, diapositiva 6"
    },
    {
      id: "step-5-endpoint-domain-posture",
      order: 5,
      name: "El Dominio de Endpoints y la Verificación de Postura (Posture Check)",
      whatIs: "Los endpoints (laptops, servidores, terminales móviles) son los dispositivos físicos donde interactúan los datos. La Verificación de Postura condiciona el acceso a que el dispositivo demuestre estar saludable en tiempo real: sistema operativo homologado, disco cifrado con BitLocker, EDR activo y parches al día.",
      whyUseful: "Impide que un empleado use su computadora personal infectada de virus (BYOD no administrado) para conectarse a las bases de datos de la empresa.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Un ejecutivo intenta abrir el ERP desde una laptop personal con Windows desactualizado; el gateway de acceso condicional bloquea la conexión y le avisa que solo puede ingresar desde su laptop corporativa administrada."
        },
        {
          label: "Ejemplo Mal",
          text: "El caso LastPass (2022): un ingeniero accedió a la infraestructura cloud desde su computadora de casa donde tenía instalado un software multimedia no administrado con una vulnerabilidad crítica que permitió a los atacantes robar credenciales."
        }
      ],
      relationships: "Conecta directamente con el Tenet 5 de NIST SP 800-207 (monitoreo de integridad de activos).",
      source: "Diapositivas Sesión 6, diapositiva 11"
    },
    {
      id: "step-6-edr-vs-traditional-antivirus",
      order: 6,
      name: "EDR (Endpoint Detection & Response) vs. Antivirus Tradicional",
      whatIs: "El antivirus tradicional se basa en firmas estáticas: compara los archivos del disco contra una lista negra de virus conocidos. El EDR opera bajo el principio 'Assume Breach': monitorea continuamente los procesos en memoria, analiza patrones de comportamiento sospechosos en vivo y tiene capacidad de respuesta activa (aislar la máquina de la red automáticamente).",
      whyUseful: "Detiene el malware sin archivos (Fileless Malware) y el ransomware de día cero que no tiene una firma conocida en los antivirus viejos.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Un atacante ejecuta un script malicioso en PowerShell en memoria sin guardar ningún archivo en disco; el antivirus tradicional no ve nada sospechoso, pero el EDR detecta que PowerShell intenta inyectar código en el proceso lsass.exe y bloquea el proceso de inmediato aislando la laptop."
        },
        {
          label: "Ejemplo Mal",
          text: "Confiar exclusivamente en un antivirus gratuito de firmas; los atacantes compilan un ransomware personalizado y cifran todos los servidores sin que el antivirus emita una sola alerta."
        }
      ],
      relationships: "Es el Control 10 de CIS Controls v8.1 y la salvaguarda de referencia para la función Detect (DE).",
      source: "Diapositivas Sesión 6, diapositiva 13; CIS Controls Guide v8.1, Control 10"
    },
    {
      id: "step-7-hardening-vs-patching",
      order: 7,
      name: "Hardening (Endurecimiento de Sistemas) vs. Parcheo de Vulnerabilidades",
      whatIs: "El Parcheo consiste en actualizar el software para corregir fallos de código publicados (aplicar parches de Windows o Linux). El Hardening es la configuración segura del sistema para reducir su superficie de ataque: deshabilitar puertos innecesarios, cerrar servicios que no se usan, apagar protocolos viejos (SMBv1, Telnet) y cambiar contraseñas por defecto.",
      whyUseful: "Un servidor con todos los parches instalados pero con puertos abiertos y contraseñas débiles sigue siendo vulnerable; el hardening complementa al parcheo cerrando puertas antes de que sean descubiertas.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Antes de poner en producción un servidor web, el equipo de TI aplica la guía de configuración segura de CIS Benchmarks: desactiva el acceso root directo por SSH, deshabilita puertos no usados y activa el cortafuegos local."
        },
        {
          label: "Ejemplo Mal",
          text: "Instalar un servidor nuevo con la configuración de fábrica, dejando activos servidores Telnet y cuentas de prueba sin contraseña; los atacantes ingresan sin necesidad de explotar ningún exploit técnico."
        }
      ],
      relationships: "Corresponde al Control 4 de CIS Controls v8.1 y a la categoría PR.PS de NIST CSF 2.0.",
      source: "Diapositivas Sesión 6, diapositiva 14; CIS Controls Guide v8.1, Control 4"
    },
    {
      id: "step-8-cis-controls-identity-endpoints",
      order: 8,
      name: "Los Controles Clave de CIS Controls v8.1 en Identidades y Endpoints",
      whatIs: "La aplicación práctica y priorizada de los 5 controles esenciales del Center for Internet Security: Control 1 (Inventario de Hardware), Control 2 (Inventario de Software), Control 5 (Gestión de Cuentas), Control 6 (Gestión de Control de Accesos) y Control 10 (Defensas contra Malware / EDR).",
      whyUseful: "Proporciona una lista de verificación técnica objetiva y medible para auditar la postura de seguridad de cualquier organización.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Una empresa implementa el Grupo de Implementación 1 (IG1) de CIS Controls: garantiza inventario automático de terminales (Control 1), elimina cuentas huérfanas en 24h (Control 5), exige MFA para accesos remotos (Control 6) y despliega EDR centralizado (Control 10)."
        },
        {
          label: "Ejemplo Mal",
          text: "Comprar una herramienta de escaneo de vulnerabilidades (Control 7) sin haber hecho antes el inventario de software (Control 2) ni la gestión de cuentas (Control 5), saltándose la higiene cibernética básica."
        }
      ],
      relationships: "Se conecta directamente con la pestaña de Marcos de Referencia (Bloque 3) y con las preguntas de caso escrito de la evaluación.",
      source: "CIS Controls Guide v8.1, páginas 12-32; Diapositivas Sesión 6, diapositiva 16"
    }
  ],

  // 4. CÓMO SE CONECTA TODO (Mapa conceptual / Flujo SVG)
  connectionDiagram: {
    description: "El flujo de acceso seguro combina la Identidad y el Endpoint: el usuario se autentica con MFA; la postura del dispositivo es verificada por el agente EDR/MDM; el motor de acceso condicional evalúa el contexto y otorga acceso temporal acotado mediante PAM y microsegmentación.",
    svgContent: `
      <div class="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 760 380" class="w-full max-w-[760px] mx-auto block text-executive-900 dark:text-white" style="min-width: 320px;" aria-label="Diagrama de Flujo: Identidades y Endpoints">
          <rect x="10" y="10" width="740" height="360" rx="16" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="1.5" />
          
          <!-- NODO 1: IDENTIDAD DEL USUARIO -->
          <g transform="translate(30, 40)">
            <rect width="210" height="85" rx="10" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-width="2"/>
            <text x="105" y="28" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">1. Dominio Identidades</text>
            <text x="105" y="48" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">CIS Control 5 & 6</text>
            <text x="105" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#3b82f6">MFA Phishing-Resistant + PAM</text>
          </g>

          <!-- NODO 2: POSTURA DEL ENDPOINT -->
          <g transform="translate(30, 160)">
            <rect width="210" height="85" rx="10" fill="#10b981" fill-opacity="0.12" stroke="#10b981" stroke-width="2"/>
            <text x="105" y="28" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">2. Dominio Endpoints</text>
            <text x="105" y="48" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">CIS Control 1, 2 & 10</text>
            <text x="105" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#10b981">Hardening + EDR Activo</text>
          </g>

          <!-- FLECHAS CONVERGENTES HACIA EL ACCESO CONDICIONAL -->
          <path d="M 240 82 L 310 82 L 310 140 L 330 140" stroke="#3b82f6" stroke-width="2" fill="none"/>
          <path d="M 240 202 L 310 202 L 310 160 L 330 160" stroke="#10b981" stroke-width="2" fill="none"/>

          <!-- NODO CENTRAL: ACCESO CONDICIONAL (PDP) -->
          <g transform="translate(330, 105)">
            <rect width="200" height="90" rx="12" fill="#8b5cf6" fill-opacity="0.15" stroke="#8b5cf6" stroke-width="2.5"/>
            <text x="100" y="32" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">Acceso Condicional</text>
            <text x="100" y="52" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.85">¿Identidad válida? &iquest;PC sana?</text>
            <text x="100" y="72" text-anchor="middle" font-size="10" font-weight="bold" fill="#8b5cf6">Evaluación de Riesgo Dinámica</text>
          </g>

          <!-- FLECHA HACIA LOS RECURSOS -->
          <path d="M 530 150 L 570 150" stroke="#8b5cf6" stroke-width="2.5" fill="none"/>

          <!-- NODO DERECHA: RECURSOS CORPORATIVOS -->
          <g transform="translate(570, 105)">
            <rect width="160" height="90" rx="10" fill="#f59e0b" fill-opacity="0.12" stroke="#f59e0b" stroke-width="2"/>
            <text x="80" y="32" text-anchor="middle" font-weight="bold" font-size="13" fill="currentColor">Acceso Seguro</text>
            <text x="80" y="52" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Sesión Just-In-Time</text>
            <text x="80" y="72" text-anchor="middle" font-size="10" font-weight="bold" fill="#f59e0b">Privilegio Mínimo</text>
          </g>

          <!-- SECCIÓN INFERIOR: RESUMEN DE RESPUESTA EDR -->
          <g transform="translate(140, 275)">
            <rect width="480" height="60" rx="10" fill="#ef4444" fill-opacity="0.1" stroke="#ef4444" stroke-width="1.5"/>
            <text x="240" y="26" text-anchor="middle" font-weight="bold" font-size="12" fill="#ef4444">Respuesta Activa ante Anomalías (Assume Breach)</text>
            <text x="240" y="45" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.85">Si el EDR detecta actividad maliciosa en memoria, aísla la máquina y revoca el token de identidad.</text>
          </g>
        </svg>
      </div>
    `,
    summaryText: "La autenticación robusta de identidades (CIS 5 y 6) se combina con la verificación de salud del endpoint (CIS 1, 2 y 10) en un motor de acceso condicional que autoriza sesiones temporales acotadas y reacciona aislando amenazas en tiempo real."
  },

  // 5. DIFERENCIAS CLAVE (Tablas comparativas reales)
  keyDifferences: [
    {
      id: "diff-authn-vs-authz",
      pairTitle: "Autenticación (AuthN) vs. Autorización (AuthZ)",
      colA: "Autenticación (AuthN)",
      colB: "Autorización (AuthZ)",
      rows: [
        { aspect: "¿Qué pregunta responde?", valA: "¿Quién eres tú? (Verificación de la identidad declarada).", valB: "¿Qué tienes derecho a hacer? (Verificación de permisos y roles)." },
        { aspect: "Mecanismo técnico típico", valA: "Contraseña + MFA con llave FIDO2 o biométrico.", valB: "Listas de control de acceso (ACL), roles RBAC o políticas ABAC." },
        { aspect: "Consecuencia si falla", valA: "Suplantación de identidad: un atacante entra haciéndose pasar por ti.", valB: "Escalada de privilegios: un usuario legítimo accede a datos confidenciales que no le corresponden." },
        { aspect: "La señal que decide", valA: "Si el problema es verificar si el usuario es quien dice ser → AuthN.", valB: "Si el problema es si el usuario tiene permiso de borrar una tabla → AuthZ." }
      ]
    },
    {
      id: "diff-edr-vs-antivirus",
      pairTitle: "EDR (Endpoint Detection and Response) vs. Antivirus Tradicional",
      colA: "Antivirus Tradicional",
      colB: "Agente EDR",
      rows: [
        { aspect: "Método de detección", valA: "Firmas estáticas de archivos conocidos guardados en disco.", valB: "Análisis de comportamiento en tiempo real de procesos en memoria." },
        { aspect: "Capacidad de respuesta", valA: "Pasiva: borra o manda a cuarentena el archivo infectado.", valB: "Activa: aísla la computadora de la red, mata procesos y toma telemetría forense." },
        { aspect: "Detección de malware sin archivo (Fileless)", valA: "Ineficaz: si el malware no toca el disco, no lo detecta.", valB: "Eficaz: detecta inyecciones de código en memoria y comandos anómalos de PowerShell." },
        { aspect: "La señal que decide", valA: "¿El software solo escanea archivos en el disco buscando firmas? → Antivirus.", valB: "¿El software detecta comportamientos sospechosos en memoria y aísla la máquina? → EDR." }
      ]
    },
    {
      id: "diff-hardening-vs-patching",
      pairTitle: "Hardening (Endurecimiento) vs. Parcheo de Software",
      colA: "Hardening (Endurecimiento)",
      colB: "Parcheo de Software",
      rows: [
        { aspect: "¿Qué modifica?", valA: "La configuración operativa del sistema (servicios, puertos, contraseñas, políticas).", valB: "El código binario de la aplicación o del sistema operativo para tapar un bug." },
        { aspect: "¿Cuándo se aplica?", valA: "Antes de salir a producción (línea base de configuración segura).", valB: "De forma periódica y reactiva cuando los fabricantes publican parches de seguridad." },
        { aspect: "Guía de referencia", valA: "CIS Benchmarks y guías DISA STIG.", valB: "Planes de gestión de vulnerabilidades (CIS Control 7 y CVE)." },
        { aspect: "La señal que decide", valA: "Si la acción es cerrar el puerto 23 de Telnet y desactivar cuentas de prueba → Hardening.", valB: "Si la acción es instalar la actualización acumulativa de Windows Update → Parcheo." }
      ]
    },
    {
      id: "diff-cis-5-vs-cis-6",
      pairTitle: "CIS Control 5 (Gestión de Cuentas) vs. CIS Control 6 (Gestión de Control de Accesos)",
      colA: "CIS Control 5: Gestión de Cuentas",
      colB: "CIS Control 6: Gestión de Accesos",
      rows: [
        { aspect: "Foco principal", valA: "El ciclo de vida de la credencial: creación, inventario, contraseñas y desactivación.", valB: "Los privilegios y permisos que esa credencial tiene sobre los datos y sistemas." },
        { aspect: "Falla prototípica", valA: "Mantener activa la cuenta de un extrabajador meses después de su renuncia.", valB: "Dar permisos de administrador total a un practicante de contabilidad." },
        { aspect: "La señal que decide", valA: "¿El problema es que la cuenta existe o no fue dada de baja? → Control 5.", valB: "¿El problema es que la cuenta tiene demasiados permisos o carece de MFA? → Control 6." }
      ]
    }
  ],

  // 6. PREGUNTAS PARA RAZONAR (Guía analítica de identidades y endpoints)
  reasoningQuestions: [
    {
      step: 1,
      question: "¿La autenticación multifactor (MFA) utilizada es resistente a phishing o vulnerable a SIM Swapping?",
      action: "Si la empresa utiliza SMS o llamadas telefónicas para enviar códigos de verificación, sus cuentas VIP son vulnerables a ingeniería social. Recomienda el despliegue de llaves FIDO2 o aplicaciones con confirmación de número (Number Matching)."
    },
    {
      step: 2,
      question: "¿Existen cuentas con privilegios administrativos permanentes o se utiliza PAM y JIT?",
      action: "Revisa si los administradores usan cuentas root para trabajar a diario. Los privilegios elevados deben solicitarse en plataformas PAM y expirar en pocas horas tras la tarea."
    },
    {
      step: 3,
      question: "¿Qué ocurre con las cuentas cuando un empleado cambia de puesto o renuncia?",
      action: "Verifica si el proceso de baja (offboarding) es automático. Dejar credenciales activas tras la terminación contractual viola CIS Control 5 y NIST CSF GV.SC."
    },
    {
      step: 4,
      question: "¿Los endpoints cuentan con verificación de postura antes de conectarse a la red?",
      action: "Comprueba si se permite el acceso desde computadoras personales no administradas. Exige agentes MDM que validen BitLocker, sistema homologado y parches al día."
    },
    {
      step: 5,
      question: "¿La protección contra malware se limita a firmas tradicionales o cuenta con agente EDR con capacidad de aislamiento?",
      action: "Si el malware opera en memoria (fileless) o es ransomware de día cero, el antivirus clásico no lo verá. El EDR es indispensable bajo la filosofía Assume Breach."
    }
  ],

  // 7. ERRORES TÍPICOS ("Si piensas X, ojo: ...")
  typicalErrors: [
    {
      ifYouThink: "Si piensas que el MFA por mensaje de texto SMS es suficiente para proteger cuentas de alta criticidad...",
      watchOut: "Ojo: El SMS es vulnerable a clonación de chip (SIM swapping), interceptación de red y phishing en tiempo real. Cuentas privilegiadas y transacciones bancarias deben usar MFA resistente a phishing (FIDO2 / WebAuthn)."
    },
    {
      ifYouThink: "Si piensas que un antivirus tradicional te protegerá del ransomware moderno...",
      watchOut: "Ojo: Los atacantes modernos usan malware que no toca el disco o compilan variantes únicas que burlan las firmas. Se requiere EDR para monitorear comportamientos anómalos en memoria viva y aislar el endpoint."
    },
    {
      ifYouThink: "Si piensas que tener cuentas de administrador compartido (ej. una sola clave de 'admin' usada por 5 personas) es aceptable...",
      watchOut: "Ojo: Viola el principio básico de no repudio y rendición de cuentas. Si ocurre un borrado de datos o sabotaje, es imposible saber cuál de los 5 ingenieros ejecutó el comando. Cada persona debe tener su cuenta nominativa con PAM."
    },
    {
      ifYouThink: "Si piensas que actualizar Windows y tener todos los parches al día significa que la máquina está asegurada...",
      watchOut: "Ojo: Los parches corrigen fallas de código; pero si dejas el puerto de Escritorio Remoto (RDP) abierto con contraseñas débiles y servicios heredados activos, la máquina sigue expuesta. Se requiere Hardening de configuración."
    },
    {
      ifYouThink: "Si piensas que la gestión de cuentas (CIS Control 5) solo importa cuando contratas empleados...",
      watchOut: "Ojo: La etapa más crítica es la baja (Offboarding). Las cuentas huérfanas de extrabajadores son uno de los vectores más comunes de intrusión silenciosa en auditorías forenses."
    }
  ],

  // 8. PARA PROFUNDIZAR (Colapsado, opcional)
  deepDive: [
    {
      title: "El Estándar FIDO2 y la Alianza FIDO",
      content: "FIDO2 es un estándar abierto desarrollado por la Alianza FIDO y el W3C para habilitar inicios de sesión sin contraseña o con autenticación multifactor criptográfica. Utiliza criptografía asimétrica donde la clave privada nunca abandona la llave física de seguridad y la firma digital queda atada al origen criptográfico del navegador, haciendo imposible el robo de credenciales en sitios web fraudulentos."
    },
    {
      title: "La Matriz MITRE ATT&CK para Enterprise",
      content: "Base de conocimiento accesible globalmente de tácticas, técnicas y procedimientos (TTPs) de adversarios basada en observaciones reales. Los agentes EDR mapean cada alerta sospechosa detectada en los endpoints contra técnicas específicas de MITRE (ej.: T1059 Command and Scripting Interpreter, T1003 OS Credential Dumping) para acelerar la respuesta a incidentes."
    },
    {
      title: "CIS Benchmarks: Guías de Hardening Homologadas",
      content: "El Center for Internet Security publica más de 100 guías de configuración segura (CIS Benchmarks) gratuitas para sistemas operativos (Windows 11, Ubuntu, Red Hat), servidores web (Apache, Nginx) y nubes (AWS, Azure, GCP), divididas en Nivel 1 (configuraciones esenciales sin impacto operativo) y Nivel 2 (máxima seguridad para entornos de alto riesgo)."
    }
  ],

  // 9. FUENTES DE LA SESIÓN
  sources: [
    {
      doc: "Diapositivas Sesión 6: 'Dominios Identidades y Endpoints' (UPC, CB05)",
      detail: "Material pedagógico oficial de la docente, diapositivas 1 a 24. Incluye ciclo de vida de cuentas, MFA phishing-resistant, EDR vs antivirus y caso Twitter 2020. Disponible en docs/Presentación - Sesion 6.pdf."
    },
    {
      doc: "CIS Controls Guide v8.1 (Center for Internet Security, 2024)",
      detail: "Control 1 (Activos Empresariales), Control 2 (Activos de Software), Control 5 (Gestión de Cuentas), Control 6 (Control de Accesos) y Control 10 (Defensas contra Malware). Documento oficial disponible en docs/CIS_Controls_Guide_v8.1.2_0325_v2.pdf."
    },
    {
      doc: "NIST SP 800-63B: Digital Identity Guidelines (Authentication and Lifecycle)",
      detail: "Recomendaciones sobre autenticación multifactor, almacenamiento seguro de credenciales y eliminación de preguntas secretas."
    },
    {
      doc: "Reportes de Incidentes Corporativos: Twitter Inc. (2020) y LastPass Inc. (2022)",
      detail: "Análisis de fallas de privilegios mínimos en herramientas de soporte y compromiso de endpoints no administrados."
    }
  ]
};
