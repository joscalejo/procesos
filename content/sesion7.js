// Guía de Lectura y Comprensión Pedagógica Oficial - Sesión 7: Dominios Aplicaciones y Datos
// Basado directamente en: Sílabo CB05 (UPC), CIS Controls Guide v8.1 (Controles 3, 4, 11, 16) y NIST CSF 2.0 (PR.DS, PR.PS)
// Diseñado para lectura pausada en celular y laptop (Scaffolding, siglas expandidas y ejemplos prácticos)

window.SESION_7_DATA = {
  id: "s7",
  number: 7,
  title: "Sesión 7: Dominios Aplicaciones y Datos",
  shortTitle: "S7: Aplicaciones & Datos",

  // 0. CABECERA PEDAGÓGICA
  header: {
    oneLiner: "Las aplicaciones son la interfaz que procesa el negocio y los datos son el activo definitivo que los atacantes buscan monetizar: esta sesión aborda el desarrollo seguro (SSDLC), el control estricto de secretos y APIs, la clasificación de información, el cifrado en sus 3 estados y la resiliencia mediante copias de seguridad inmutables.",
    readingTime: "12 min de lectura pausada",
    prerequisites: [
      { text: "Los dominios y principios de Zero Trust (S5)", link: "s5" },
      { text: "Identidades seguras y postura de Endpoints (S6)", link: "s6" },
      { text: "Clasificación de criticidad y tríada CID de activos (S3)", link: "s3" }
    ],
    outcomes: [
      "Comprender el ciclo de desarrollo seguro (SSDLC) y la diferencia entre pruebas de código estáticas (SAST), dinámicas (DAST) y de dependencias (SCA).",
      "Eliminar el hardcoding de credenciales mediante el uso de bóvedas seguras de secretos (Secrets Managers / KMS).",
      "Diseñar políticas de clasificación formal de datos e implementar soluciones de prevención de pérdida de datos (DLP).",
      "Diferenciar con precisión técnica el cifrado en sus 3 estados: en reposo (at rest), en tránsito (in transit) y en uso (in use).",
      "Garantizar la resiliencia operativa ante ataques de ransomware mediante la regla 3-2-1 y copias de seguridad inmutables (CIS Control 11)."
    ]
  },

  // 1. LA IDEA CENTRAL
  centralIdea: {
    problemStatement: "Las organizaciones pueden tener firewalls de última generación y empleados bien capacitados, pero si los desarrolladores suben credenciales maestras de bases de datos incrustadas en código fuente a GitHub, o si las bases de datos guardan millones de números de tarjeta de crédito en texto plano sin cifrar en disco, los ciberdelincuentes no necesitan vulnerar la red: descargan el botín directamente y extorsionan a la empresa.",
    coreConcept: "El dominio de Aplicaciones traslada la seguridad al momento de diseño del software ('Shift Left' / SSDLC) para evitar que nazcan vulnerabilidades en producción. El dominio de Datos protege el activo de mayor valor de la organización sin importar dónde resida: clasificándolo, cifrándolo permanentemente y garantizando su recuperación inmutable si ocurre un desastre.",
    caseConnection: "En 2022, un repositorio público de código expuso una llave de acceso que permitió el compromiso de información de clientes en Toyota durante casi cinco años. En 2016, atacantes usaron credenciales privadas de Uber encontradas en un repositorio de GitHub para acceder a cuentas de Amazon S3 y robar datos de 57 millones de usuarios. En ambos casos, el fallo no fue un fallo de firewall de red: fue el error de hardcodear secretos y carecer de cifrado en reposo para los datos exfiltrados.",
    source: "Sílabo CB05, Unidad 2; CIS Controls Guide v8.1, Controles 3 y 16; NIST CSF 2.0, PR.DS y PR.PS"
  },

  // 2. VOCABULARIO, SIGLAS Y MNEMOTECNIAS
  vocabulary: {
    acronyms: [
      {
        sigla: "SSDLC",
        english: "Secure Software Development Life Cycle",
        spanish: "Ciclo de Vida de Desarrollo de Software Seguro",
        meaning: "Metodología que integra controles de seguridad y revisiones en cada fase del desarrollo (diseño, codificación, pruebas y despliegue)."
      },
      {
        sigla: "SAST",
        english: "Static Application Security Testing",
        spanish: "Pruebas de Seguridad de Aplicaciones Estáticas",
        meaning: "Análisis del código fuente o binario 'en reposo' (sin ejecutar el programa) para detectar vulnerabilidades y malas prácticas."
      },
      {
        sigla: "DAST",
        english: "Dynamic Application Security Testing",
        spanish: "Pruebas de Seguridad de Aplicaciones Dinámicas",
        meaning: "Pruebas de seguridad 'en caja negra' sobre la aplicación en ejecución, simulando ataques reales desde el exterior."
      },
      {
        sigla: "SCA",
        english: "Software Composition Analysis",
        spanish: "Análisis de Composición de Software",
        meaning: "Herramienta que audita las librerías y componentes de código abierto de terceros para detectar vulnerabilidades conocidas (CVE) y licencias."
      },
      {
        sigla: "DLP",
        english: "Data Loss Prevention",
        spanish: "Prevención de Pérdida de Datos",
        meaning: "Tecnología que inspecciona flujos de información en endpoints y redes para detectar y bloquear la salida no autorizada de datos sensibles."
      },
      {
        sigla: "KMS",
        english: "Key Management Service",
        spanish: "Servicio de Gestión de Claves Criptográficas",
        meaning: "Bóveda centralizada de seguridad para crear, almacenar, rotar y controlar el acceso a claves de cifrado y secretos corporativos."
      },
      {
        sigla: "JWT",
        english: "JSON Web Token",
        spanish: "Token Web JSON",
        meaning: "Estándar abierto para transmitir información de identidad y autorización de forma compacta y firmada digitalmente entre clientes y APIs."
      },
      {
        sigla: "WORM",
        english: "Write Once, Read Many",
        spanish: "Escribe Una Vez, Lee Muchas Veces (Inmutabilidad)",
        meaning: "Mecanismo de almacenamiento donde los datos escritos no pueden ser modificados, sobrescritos ni borrados por nadie durante un tiempo fijado."
      }
    ],
    codeReadingGuide: {
      explanation: "En CIS Controls v8.1 y NIST CSF 2.0, los controles de aplicaciones y datos se desglosan en salvaguardas específicas de protección técnica.",
      example: "CIS Control 3.11",
      breakdown: [
        { part: "Control 3", role: "Familia de Control", desc: "Data Protection (Protección de Datos) — Enfoque en confidencialidad y retención." },
        { part: ".11", role: "Salvaguarda Específica", desc: "Cifrar datos sensibles en reposo en todos los servidores y dispositivos de almacenamiento." }
      ],
      source: "CIS Controls Guide v8.1, Control 3, pág. 16"
    },
    mnemonics: [
      {
        name: "Los 3 Estados del Dato Cifrado",
        tag: "Mnemotecnia (propia, no oficial)",
        phrase: "\"R-T-U: Reposo (AES-256), Tránsito (TLS 1.3) y Uso (Enclaves Seguros)\"",
        breakdown: [
          "R → Reposo (At Rest): Datos guardados en disco, bases de datos o cintas de backup.",
          "T → Tránsito (In Transit): Datos viajando por cables, fibra óptica, wifi o redes públicas de internet.",
          "U → Uso (In Use): Datos cargados en memoria RAM y registros del procesador mientras son computados."
        ]
      },
      {
        name: "La Regla de Resiliencia 3-2-1 de Copias de Seguridad (CIS Control 11)",
        tag: "Mnemotecnia (propia, no oficial)",
        phrase: "\"3 Copias, 2 Medios distintos, 1 Fuera del sitio (e Inmutable)\"",
        breakdown: [
          "3 → Mantener al menos 3 copias de los datos críticos (1 original + 2 respaldos).",
          "2 → Almacenar los respaldos en 2 tipos de medios tecnológicos diferentes (ej.: disco local + almacenamiento en nube).",
          "1 → Guardar 1 copia fuera de la red local (offsite) y configurada con inmutabilidad WORM para resistir el ransomware."
        ]
      },
      {
        name: "El Trío de Pruebas de Seguridad en Software",
        tag: "Mnemotecnia (propia, no oficial)",
        phrase: "\"S-D-S: SAST (código Estático), DAST (app Dinámica), SCA (Software ajeno / librerías)\"",
        breakdown: [
          "S → SAST: Escaneo del código fuente en el editor o repositorio (caja blanca, encuentra el archivo y línea exacta).",
          "D → DAST: Ataque simulado a la aplicación levantada en un servidor de pruebas (caja negra, encuentra fallos en tiempo de ejecución).",
          "S → SCA: Verificación de las dependencias de código abierto descargadas por npm, pip o maven."
        ]
      }
    ]
  },

  // 3. CONCEPTOS PASO A PASO (De lo simple a lo complejo)
  stepByStepConcepts: [
    {
      id: "step-1-ssdlc-shift-left",
      order: 1,
      name: "Desarrollo Seguro (SSDLC) y el Principio 'Shift Left'",
      whatIs: "El enfoque de incorporar actividades y controles de ciberseguridad desde las fases más tempranas del ciclo de vida del software (diseño de arquitectura y especificación de requisitos), en lugar de intentar 'parchar' la seguridad justo antes del lanzamiento a producción.",
      whyUseful: "Corregir una falla de diseño durante la etapa de arquitectura cuesta hasta 30 veces menos dinero y tiempo que repararla cuando ya fue desplegada y explotada por atacantes en producción.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Un equipo de desarrollo modela las amenazas (Threat Modeling) antes de escribir código y define que las contraseñas se almacenarán con hash Argon2 y sal aleatoria."
        },
        {
          label: "Ejemplo Mal",
          text: "Una empresa construye una app bancaria completa en 6 meses y, el día anterior a publicarla en la tienda, le pide al área de seguridad un 'pentest de 2 horas' para que apruebe el pase."
        }
      ],
      relationships: "Aplica el principio de Security by Design y se alinea con CIS Control 16 (Application Software Security).",
      source: "CIS Controls Guide v8.1, Control 16; Diapositivas Sesión 7 (Unidad 2)"
    },
    {
      id: "step-2-sast-vs-dast-vs-sca",
      order: 2,
      name: "Pruebas de Seguridad Automatizadas: SAST, DAST y SCA",
      whatIs: "Son los 3 métodos complementarios de inspección técnica de software. SAST analiza el código fuente sin ejecutarlo; DAST ataca la aplicación en ejecución como un usuario externo; SCA audita las librerías de terceros (código abierto) para detectar vulnerabilidades conocidas (CVEs).",
      whyUseful: "Automatizan la detección de vulnerabilidades en el pipeline de Integración Continua (CI/CD) y bloquean el pase a producción si se detectan fallas críticas.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "El pipeline de GitLab ejecuta SAST (detecta una inyección SQL en la línea 45 de usuario.js), SCA (avisa que la librería de JSON tiene una vulnerabilidad crítica) y corre DAST en el entorno de pruebas antes de autorizar el despliegue."
        },
        {
          label: "Ejemplo Mal",
          text: "Desplegar código directamente a los servidores de producción confiando en que 'el desarrollador es senior y no comete errores'."
        }
      ],
      relationships: "Conecta con la salvaguarda 16.2 y 16.3 de CIS Controls v8.1 y con la función Protect (PR.PS) de NIST CSF 2.0.",
      source: "CIS Controls Guide v8.1, pág. 35; OWASP DevSecOps Guideline"
    },
    {
      id: "step-3-secret-management",
      order: 3,
      name: "Gestión Segura de Secretos (Eliminación de Hardcoding)",
      whatIs: "La práctica estricta de prohibir la inserción directa de credenciales, tokens de API, cadenas de conexión y claves criptográficas dentro del código fuente o archivos de configuración locales. Los secretos deben gestionarse a través de bóvedas especializadas (Secrets Managers) que los inyectan dinámicamente en tiempo de ejecución.",
      whyUseful: "Evita que las credenciales terminen expuestas en repositorios de control de versiones públicos o compartidos con terceros no autorizados.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "La aplicación solicita la contraseña de la base de datos a HashiCorp Vault o AWS Secrets Manager mediante una identidad administrada con rotación automática cada 30 días."
        },
        {
          label: "Ejemplo Mal",
          text: "El caso Uber (2016) y Toyota (2022): los programadores dejaron credenciales de acceso a servidores de producción escritas en el código de GitHub, permitiendo el robo masivo de bases de datos."
        }
      ],
      relationships: "Es una extensión directa del principio de mínimo privilegio (Least Privilege) y de PAM (S6).",
      source: "CIS Controls Guide v8.1, salvaguarda 16.4; NIST SP 800-57"
    },
    {
      id: "step-4-api-security",
      order: 4,
      name: "Seguridad en Interfaces de Programación (APIs) y Microservicios",
      whatIs: "El conjunto de controles técnicos aplicados a las APIs corporativas: autenticación basada en tokens criptográficos de corta duración (OAuth2 / JWT), autorización granular en cada endpoint, validación estricta de entradas y limitación de tasa (Rate Limiting).",
      whyUseful: "Impide ataques de denegación de servicio (DDoS) a nivel de aplicación, scraping masivo de información y vulnerabilidades de autorización de objetos rotos (BOLA / IDOR).",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Un API Gateway exige un token JWT firmado para cada consulta de saldo, valida que el ID solicitado coincida con el usuario autenticado y limita a 10 peticiones por minuto por dirección IP."
        },
        {
          label: "Ejemplo Mal",
          text: "Una API de consulta médica que permite cambiar en la URL el parámetro '?paciente_id=101' por '?paciente_id=102' sin validar si el solicitante es el dueño de la historia clínica."
        }
      ],
      relationships: "Se apoya en la arquitectura Zero Trust (S5), donde cada comunicación entre servicios debe verificarse explícitamente.",
      source: "OWASP API Security Top 10; CIS Controls v8.1, Control 16"
    },
    {
      id: "step-5-data-classification",
      order: 5,
      name: "Clasificación Formal de la Información (El Activo Definitivo)",
      whatIs: "El proceso formal de categorizar los datos de la empresa según su nivel de confidencialidad y el impacto económico o legal que causaría su divulgación: Pública (divulgación abierta), Uso Interno (operación diaria), Confidencial (datos financieros y comerciales estratégicos) y Restringida / Sensible (datos bancarios, salud y biometría protegida por la Ley 29733 de Protección de Datos Personales).",
      whyUseful: "Permite enfocar los presupuestos y controles más estrictos (cifrado, DLP, auditoría) en los datos que realmente comprometerían la supervivencia de la empresa si son robados.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Un hospital clasifica las historias clínicas como 'Restringida / Datos Sensibles', exigiendo cifrado obligatorio, acceso exclusivo a médicos tratantes y bloqueo total de copiado en memorias USB."
        },
        {
          label: "Ejemplo Mal",
          text: "Tratar todos los documentos corporativos con la misma etiqueta genérica; cuando se fuga una lista con sueldos de ejecutivos, nadie sabía que ese archivo requería permisos especiales."
        }
      ],
      relationships: "Alimenta directamente la calificación CID de activos de información en la función Identify (S3) y el Control 3 de CIS Controls v8.1.",
      source: "CIS Controls Guide v8.1, Control 3; Ley 29733 (Perú); NIST CSF 2.0 PR.DS-01"
    },
    {
      id: "step-6-encryption-three-states",
      order: 6,
      name: "Cifrado Criptográfico en sus 3 Estados: Reposo, Tránsito y Uso",
      whatIs: "El uso de algoritmos criptográficos robustos y estandarizados para volver los datos ilegibles ante accesos no autorizados: en Reposo (AES-256 en discos, servidores y bases de datos), en Tránsito (TLS 1.3 / mTLS en redes de comunicación) y en Uso (enclaves seguros de memoria y computación confidencial).",
      whyUseful: "Si un atacante roba físicamente un disco duro o intercepta los paquetes de red, solo obtendrá texto cifrado ininteligible sin las claves maestras.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Un banco cifra sus bases de datos con Transparent Data Encryption (AES-256) en disco y obliga a todas las aplicaciones a conectarse usando exclusivamente TLS 1.3 con certificados válidos."
        },
        {
          label: "Ejemplo Mal",
          text: "El caso Target (2013) en terminales POS: los números de tarjeta viajaban sin cifrar en la memoria interna de las cajas registradoras, permitiendo que un malware leyera los datos en texto plano."
        }
      ],
      relationships: "Cumple las salvaguardas 3.10 y 3.11 de CIS Controls v8.1 y la subcategoría PR.DS-01 y PR.DS-02 de NIST CSF 2.0.",
      source: "CIS Controls Guide v8.1, Control 3; NIST SP 800-52 y SP 800-111"
    },
    {
      id: "step-7-dlp-anti-exfiltration",
      order: 7,
      name: "Prevención de Pérdida de Datos (DLP) y Antiexfiltración",
      whatIs: "Sistemas tecnológicos (a nivel de red y agentes en endpoints) que detectan la presencia y movimiento de información clasificada o sensible mediante patrones (expresiones regulares de DNI, números de tarjeta de crédito) y bloquean su envío hacia canales externos no autorizados (correos personales, USB, servicios en la nube no aprobados o impresión).",
      whyUseful: "Neutraliza tanto la fuga involuntaria por errores de empleados como la exfiltración maliciosa cometida por empleados desleales o malware espía.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Un analista de finanzas intenta adjuntar un archivo de Excel con números de cuentas bancarias a su correo personal de Gmail; el agente DLP detecta los patrones de tarjeta, bloquea el envío y alerta al SOC."
        },
        {
          label: "Ejemplo Mal",
          text: "Un empleado renuncia y antes de irse copia toda la base de clientes y proveedores a una memoria USB personal porque la empresa no tenía bloqueados los puertos ni software DLP."
        }
      ],
      relationships: "Materializa la protección de datos (PR.DS) y la detección de anomalías (DE.CM) en NIST CSF 2.0.",
      source: "CIS Controls Guide v8.1, Control 3; Diapositivas Sesión 7 (Unidad 2)"
    },
    {
      id: "step-8-immutable-backups",
      order: 8,
      name: "Copias de Seguridad Inmutables (WORM) y Resiliencia ante Ransomware",
      whatIs: "El almacenamiento de respaldos periódicos con protección de inmutabilidad (Write Once, Read Many), donde ni siquiera las credenciales de administrador de la red pueden borrar, modificar o cifrar las copias durante el periodo de retención programado (ej.: 90 días). Se rige por la regla 3-2-1.",
      whyUseful: "El ransomware moderno ataca y borra primero las copias de seguridad antes de cifrar los servidores principales. Los respaldos inmutables garantizan que la empresa siempre pueda restaurar su operación sin pagar rescates.",
      examples: [
        {
          label: "Ejemplo Bien",
          text: "Una clínica es infectada por un ransomware que cifra todos los servidores de historias clínicas; el equipo de TI borra los servidores comprometidos y restaura los sistemas desde backups inmutables en la nube sin pagar rescate y en menos de 4 horas."
        },
        {
          label: "Ejemplo Mal",
          text: "Una empresa mantiene sus copias de seguridad en un disco duro compartido accesible por la red Windows (SMB); cuando entra el ransomware, cifra simultáneamente los servidores de producción y todas las copias de seguridad."
        }
      ],
      relationships: "Es el núcleo de CIS Control 11 (Data Recovery Management) y de la función Recover (RC.RP) de NIST CSF 2.0.",
      source: "CIS Controls Guide v8.1, Control 11; CISA Ransomware Prevention Guide"
    }
  ],

  // 4. CÓMO SE CONECTA TODO (Mapa conceptual / Flujo SVG)
  connectionDiagram: {
    description: "El flujo integral de protección une el ciclo de vida del código con la defensa del dato: las aplicaciones se diseñan bajo SSDLC con pruebas SAST/SCA y gestión de secretos; las APIs se aseguran con tokens dinámicos; los datos corporativos se clasifican formalmente, se cifran en todos sus estados, se supervisan con DLP y se respaldan de forma inmutable para garantizar la resiliencia operativa.",
    svgContent: `
      <div class="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 760 380" class="w-full max-w-[760px] mx-auto block text-executive-900 dark:text-white" style="min-width: 320px;" aria-label="Diagrama de Flujo: Aplicaciones y Datos">
          <rect x="10" y="10" width="740" height="360" rx="16" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="1.5" />
          
          <!-- BLOQUE 1: DOMINIO APLICACIONES (IZQUIERDA) -->
          <g transform="translate(30, 40)">
            <rect width="210" height="95" rx="10" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-width="2"/>
            <text x="105" y="28" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">1. Dominio Aplicaciones</text>
            <text x="105" y="48" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">SSDLC &bull; CIS Control 16</text>
            <text x="105" y="68" text-anchor="middle" font-size="10" font-weight="bold" fill="#3b82f6">SAST + DAST + SCA</text>
            <text x="105" y="84" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.8">Bóveda de Secretos (No Hardcode)</text>
          </g>

          <!-- BLOQUE 2: SEGURIDAD EN APIS & GATEWAY -->
          <g transform="translate(30, 165)">
            <rect width="210" height="85" rx="10" fill="#8b5cf6" fill-opacity="0.12" stroke="#8b5cf6" stroke-width="2"/>
            <text x="105" y="28" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">2. APIs & Microservicios</text>
            <text x="105" y="48" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Zero Trust en Tránsito</text>
            <text x="105" y="68" text-anchor="middle" font-size="10" font-weight="bold" fill="#8b5cf6">Tokens JWT + Rate Limiting</text>
          </g>

          <!-- FLECHAS CONVERGENTES HACIA EL NÚCLEO DE DATOS -->
          <path d="M 240 88 L 310 88 L 310 145 L 330 145" stroke="#3b82f6" stroke-width="2" fill="none"/>
          <path d="M 240 208 L 310 208 L 310 165 L 330 165" stroke="#8b5cf6" stroke-width="2" fill="none"/>

          <!-- BLOQUE 3: EL NÚCLEO DE DATOS (CENTRO) -->
          <g transform="translate(330, 95)">
            <rect width="210" height="120" rx="12" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="2.5"/>
            <text x="105" y="30" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">3. Dominio de Datos</text>
            <text x="105" y="50" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.85">El Activo Definitivo</text>
            <text x="105" y="70" text-anchor="middle" font-size="10" font-weight="bold" fill="#10b981">Clasificación de Información</text>
            <text x="105" y="88" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.85">Cifrado Reposo (AES-256)</text>
            <text x="105" y="106" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.85">Cifrado Tránsito (TLS 1.3)</text>
          </g>

          <!-- FLECHAS DESDE DATOS HACIA DLP Y BACKUPS -->
          <path d="M 540 135 L 575 135 L 575 85 L 590 85" stroke="#f59e0b" stroke-width="2" fill="none"/>
          <path d="M 540 175 L 575 175 L 575 225 L 590 225" stroke="#ef4444" stroke-width="2" fill="none"/>

          <!-- BLOQUE 4: PREVENCIÓN DE FUGA (DLP - ARRIBA DERECHA) -->
          <g transform="translate(590, 40)">
            <rect width="145" height="90" rx="10" fill="#f59e0b" fill-opacity="0.12" stroke="#f59e0b" stroke-width="2"/>
            <text x="72" y="28" text-anchor="middle" font-weight="bold" font-size="13" fill="currentColor">4. DLP Activo</text>
            <text x="72" y="48" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.8">CIS Control 3</text>
            <text x="72" y="66" text-anchor="middle" font-size="10" font-weight="bold" fill="#f59e0b">Bloqueo Fugas</text>
            <text x="72" y="80" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.8">Endpoint & Red</text>
          </g>

          <!-- BLOQUE 5: RESILIENCIA Y BACKUPS (ABAJO DERECHA) -->
          <g transform="translate(590, 180)">
            <rect width="145" height="90" rx="10" fill="#06b6d4" fill-opacity="0.12" stroke="#06b6d4" stroke-width="2"/>
            <text x="72" y="28" text-anchor="middle" font-weight="bold" font-size="13" fill="currentColor">5. Backups 3-2-1</text>
            <text x="72" y="48" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.8">CIS Control 11</text>
            <text x="72" y="66" text-anchor="middle" font-size="10" font-weight="bold" fill="#06b6d4">Inmutabilidad WORM</text>
            <text x="72" y="80" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.8">Anti-Ransomware</text>
          </g>

          <!-- SECCIÓN INFERIOR: RESUMEN DE PROTECCIÓN INTEGRAL -->
          <g transform="translate(130, 290)">
            <rect width="500" height="55" rx="10" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-width="1.5"/>
            <text x="250" y="24" text-anchor="middle" font-weight="bold" font-size="12" fill="#10b981">Defensa en Profundidad: De la Línea de Código a la Bóveda Inmutable</text>
            <text x="250" y="42" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.85">Código sin secretos + APIs validadas + Datos clasificados y cifrados + Copias protegidas.</text>
          </g>
        </svg>
      </div>
    `,
    summaryText: "El software seguro (CIS 16) procesa datos clasificados y cifrados (CIS 3); las herramientas DLP impiden su fuga no autorizada y los respaldos inmutables (CIS 11) blindan la continuidad operativa frente a ataques de ransomware."
  },

  // 5. DIFERENCIAS CLAVE (Tablas comparativas reales)
  keyDifferences: [
    {
      id: "diff-sast-vs-dast",
      pairTitle: "SAST (Pruebas Estáticas) vs. DAST (Pruebas Dinámicas)",
      colA: "SAST (Pruebas Estáticas)",
      colB: "DAST (Pruebas Dinámicas)",
      rows: [
        { aspect: "Enfoque de prueba", valA: "Caja blanca: inspecciona el código fuente, dependencias y reglas sintácticas.", valB: "Caja negra: inspecciona la aplicación levantada en ejecución atacando endpoints externos." },
        { aspect: "¿Cuándo se ejecuta?", valA: "Temprano en el ciclo de desarrollo (al escribir código y en el commit de CI).", valB: "En fases tardías (entorno de pruebas/staging con la aplicación compilada y corriendo)." },
        { aspect: "Precisión del hallazgo", valA: "Exacta: señala el archivo específico y el número de línea vulnerable.", valB: "Funcional: demuestra cómo la aplicación reacciona ante un payload malicioso real." },
        { aspect: "Limitación principal", valA: "Puede generar falsos positivos y no detecta fallas de configuración del servidor.", valB: "No sabe en qué línea de código está la falla ni cubre código no expuesto en endpoints." },
        { aspect: "La señal que decide", valA: "Si la herramienta escanea archivos de texto de código fuente sin correr la app → SAST.", valB: "Si la herramienta envía peticiones HTTP maliciosas a una URL viva → DAST." }
      ]
    },
    {
      id: "diff-clasificacion-vs-dlp",
      pairTitle: "Clasificación de Datos vs. Prevención de Fuga de Datos (DLP)",
      colA: "Clasificación de Información",
      colB: "Sistema DLP",
      rows: [
        { aspect: "¿Qué naturaleza tiene?", valA: "Proceso de gobernanza y política organizativa: define los niveles de sensibilidad de los datos.", valB: "Herramienta tecnológica de control operativo: hace cumplir la política técnica en la red." },
        { aspect: "Quién lo define", valA: "El Dueño del Activo (Asset Owner / negocio) en conjunto con el Oficial de Seguridad.", valB: "Los ingenieros de ciberseguridad mediante reglas, agentes y expresiones regulares." },
        { aspect: "Relación operativa", valA: "Es el requisito previo indispensable: sin etiquetas de clasificación, DLP no sabe qué proteger.", valB: "Es el brazo ejecutor: lee las etiquetas o patrones clasificados y bloquea la exfiltración." },
        { aspect: "La señal que decide", valA: "Si la discusión trata sobre si un reporte financiero es 'Confidencial' o 'Público' → Clasificación.", valB: "Si la discusión trata sobre bloquear la subida de un archivo con tarjetas a Dropbox → DLP." }
      ]
    },
    {
      id: "diff-cifrado-reposo-vs-transito",
      pairTitle: "Cifrado en Reposo (At Rest) vs. Cifrado en Tránsito (In Transit)",
      colA: "Cifrado en Reposo",
      colB: "Cifrado en Tránsito",
      rows: [
        { aspect: "Qué estado protege", valA: "Datos almacenados en soporte físico: discos duros, bases de datos, cintas y laptops.", valB: "Datos que viajan a través de redes de comunicación: internet, VPNs o enlaces internos." },
        { aspect: "Protocolos / Algoritmos típicos", valA: "AES-256, BitLocker, Transparent Data Encryption (TDE), cifrado de volumen.", valB: "TLS 1.3, HTTPS, SSH, IPSec, mTLS (Mutual TLS)." },
        { aspect: "Amenaza que neutraliza", valA: "Robo físico de servidores o laptops; volcados no autorizados de discos duros.", valB: "Intercepción de tráfico de red (Man-in-the-Middle) y espionaje en enlaces de red." },
        { aspect: "La señal que decide", valA: "¿El ataque ocurre porque alguien se llevó un disco duro o clonó una base de datos apagada? → Reposo.", valB: "¿El ataque ocurre porque alguien interceptó los paquetes que viajaban por el router? → Tránsito." }
      ]
    },
    {
      id: "diff-backup-tradicional-vs-inmutable",
      pairTitle: "Backup Tradicional vs. Backup Inmutable (WORM - CIS Control 11)",
      colA: "Backup Tradicional",
      colB: "Backup Inmutable (WORM)",
      rows: [
        { aspect: "Permisos de modificación", valA: "Los administradores con credenciales root o de dominio pueden borrar o sobrescribir archivos.", valB: "Nadie (ni el administrador global ni el proveedor) puede borrar ni editar los datos durante el periodo retenido." },
        { aspect: "Comportamiento ante Ransomware", valA: "Vulnerable: el atacante que escala privilegios cifra o borra las copias antes de extorsionar.", valB: "Resiliente: el ransomware no puede alterar los bloques de datos protegidos por política WORM." },
        { aspect: "Mecanismo técnico", valA: "Carpetas compartidas de red (SMB/NFS) o discos conectados permanentemente.", valB: "Almacenamiento S3 Object Lock con retención legal en modo 'Compliance' o cintas desconectadas (Air-Gapped)." },
        { aspect: "La señal que decide", valA: "¿Un administrador con credenciales robadas puede vaciar la carpeta de respaldos? → Tradicional.", valB: "¿El sistema rechaza cualquier solicitud de borrado o cambio durante 90 días por diseño de hardware? → Inmutable." }
      ]
    }
  ],

  // 6. PREGUNTAS PARA RAZONAR (Guía analítica de aplicaciones y datos)
  reasoningQuestions: [
    {
      step: 1,
      question: "¿Existen credenciales, llaves de API o contraseñas incrustadas en código fuente o repositorios de software?",
      action: "Si encuentras claves en texto plano en el repositorio (GitHub/GitLab), existe una falla crítica de gestión de secretos. Exige la migración a un Secrets Manager y la rotación inmediata de las credenciales comprometidas."
    },
    {
      step: 2,
      question: "¿El pipeline de desarrollo incluye escaneos automatizados SAST y de dependencias externas (SCA)?",
      action: "Verifica si el código pasa por análisis estático antes de cada merge. Si se usan librerías de código abierto sin auditar (SCA), la aplicación puede heredar vulnerabilidades críticas de terceros."
    },
    {
      step: 3,
      question: "¿Las APIs corporativas validan la autorización en cada llamada y aplican limitación de tasa (Rate Limiting)?",
      action: "Comprueba si un usuario puede cambiar el identificador en la petición para ver información de otro cliente. Cada endpoint debe validar el token de sesión y limitar peticiones abusivas."
    },
    {
      step: 4,
      question: "¿La información de la organización cuenta con una clasificación formal aprobada por los dueños de negocio?",
      action: "Determina si los datos están rotulados en Pública, Interna, Confidencial o Restringida. Sin esta taxonomía, los controles técnicos de cifrado y DLP se aplican a ciegas."
    },
    {
      step: 5,
      question: "¿Las bases de datos con información sensible están cifradas tanto en reposo (AES-256) como en tránsito (TLS 1.3)?",
      action: "Revisa si un volcado del disco o una captura de paquetes de red revela datos en texto legible. Las claves de cifrado deben guardarse fuera de la propia base de datos (KMS)."
    },
    {
      step: 6,
      question: "¿Las copias de seguridad de los sistemas críticos son inmutables y cumplen la regla 3-2-1?",
      action: "Evalúa qué pasaría si un ransomware infecta al usuario administrador del dominio. Si las copias de seguridad pueden ser borradas por ese usuario, la empresa carece de resiliencia real ante extorsión."
    }
  ],

  // 7. ERRORES TÍPICOS ("Si piensas X, ojo: ...")
  typicalErrors: [
    {
      ifYouThink: "Si piensas que ocultar una clave de API en un archivo .env o en el código fuente de una app móvil es seguro...",
      watchOut: "Ojo: Las aplicaciones móviles pueden ser descompiladas en segundos con herramientas gratuitas (jadx/apktool). Cualquier credencial guardada en el cliente es pública para el atacante. Los secretos deben residir en servidores seguros y comunicarse vía APIs autenticadas."
    },
    {
      ifYouThink: "Si piensas que correr pruebas SAST al final del proyecto reemplaza el desarrollo seguro...",
      watchOut: "Ojo: SAST es una herramienta automatizada de código, no un sustituto de la arquitectura segura. Si el diseño del sistema carece de control de accesos, SAST no resolverá las fallas de lógica de negocio. Se requiere SSDLC desde el diseño inicial."
    },
    {
      ifYouThink: "Si piensas que cifrar la conexión web con HTTPS/TLS protege tus datos si te roban el servidor de la base de datos...",
      watchOut: "Ojo: HTTPS es cifrado en tránsito. Cuando el dato llega al servidor y se guarda en el disco duro, si la base de datos no tiene cifrado en reposo (AES-256), cualquier persona con acceso al disco físico puede leer toda la información."
    },
    {
      ifYouThink: "Si piensas que instalar un software DLP resolverá mágicamente las fugas de datos sin clasificar la información...",
      watchOut: "Ojo: Si la empresa no ha definido previamente qué documentos son confidenciales y qué patrones representan datos protegidos, el DLP generará miles de falsas alarmas o no bloqueará nada. Primero se clasifica, luego se automatiza."
    },
    {
      ifYouThink: "Si piensas que tener copias de seguridad diarias en un disco conectado a la misma red de la empresa te protege de ransomware...",
      watchOut: "Ojo: Los operadores de ransomware modernos buscan y cifran deliberadamente las unidades de respaldo compartidas en la red. Si el backup no es inmutable (WORM) o está desconectado físicamente (air-gap), será destruido junto con la producción."
    }
  ],

  // 8. PARA PROFUNDIZAR (Colapsado, opcional)
  deepDive: [
    {
      title: "El Estándar OWASP Top 10 y OWASP API Security Top 10",
      content: "La Open Web Application Security Project (OWASP) publica los rankings de referencia mundial sobre las vulnerabilidades más críticas en aplicaciones web y APIs: Injection (SQLi/XSS), Broken Object Level Authorization (BOLA), Cryptographic Failures y Security Misconfiguration. Es el estándar de facto utilizado en auditorías técnicas y pruebas de penetración."
    },
    {
      title: "Gestión Criptográfica de Claves según NIST SP 800-57",
      content: "La seguridad del cifrado no depende del secreto del algoritmo (que es público), sino del secreto y ciclo de vida de la clave criptográfica. NIST SP 800-57 establece las directrices para la generación, distribución, rotación periódica y destrucción segura de claves utilizando módulos de seguridad de hardware (HSM)."
    },
    {
      title: "CIS Control 16: Application Software Security y SBOM",
      content: "CIS Control 16 exige mantener un inventario de componentes de software (SBOM - Software Bill of Materials). Cuando surge una vulnerabilidad global en una librería de código abierto (como Log4j), el SBOM permite a la empresa saber en cuestión de minutos qué aplicaciones internas contienen esa librería y requieren parches inmediatos."
    }
  ],

  // 9. FUENTES DE LA SESIÓN
  sources: [
    {
      doc: "Sílabo Oficial del Curso: 'Procesos de Ciberseguridad' (UPC, CB05)",
      detail: "Unidad 2: Arquitectura Zero Trust, Dominios de Aplicaciones y Datos, SSDLC y protección de activos de información. Sílabo CB05 disponible en docs/1ACB0005-202620-Procesos de Ciberseguridad.pdf."
    },
    {
      doc: "CIS Controls Guide v8.1 (Center for Internet Security, 2024)",
      detail: "Control 3 (Data Protection), Control 4 (Secure Configuration of Enterprise Assets and Software), Control 11 (Data Recovery Management) y Control 16 (Application Software Security). Disponible en docs/CIS_Controls_Guide_v8.1.2_0325_v2.pdf."
    },
    {
      doc: "NIST CSF 2.0 (CSWP 29, 2024)",
      detail: "Subcategorías PR.DS (Data Security) y PR.PS (Platform Security). Disponible en docs/NIST.CSWP.29.spa (1).pdf."
    },
    {
      doc: "OWASP Foundation: DevSecOps Guideline & API Security Project",
      detail: "Recomendaciones de seguridad en pipelines CI/CD, pruebas SAST/DAST y prevención de fugas de secretos en código fuente."
    }
  ]
};
