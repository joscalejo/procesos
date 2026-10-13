// Matriz RACI - Procesos de Ciberseguridad (CB05)
// Formalización exhaustiva de GV.RR (Roles, Responsabilidades y Autoridad)

window.RACI_MODULE_DATA = {
  title: "Matriz RACI: Gobernanza de Autoridad (GV.RR)",
  subtitle: "La herramienta directiva que hace visible GV.RR: quién decide (A), quién ejecuta (R), a quién se consulta (C) y a quién se informa (I).",
  
  // a) QUÉ ES UNA RACI Y PARA QUÉ SIRVE
  intro: {
    whatIs: "La Matriz RACI es una herramienta de gobernanza de ciberseguridad que asigna y formaliza de manera explícita los roles y niveles de autoridad para cada actividad crítica o decisión estratégica en la organización.",
    whyItMatters: "Hace visible la categoría GV.RR del NIST CSF 2.0. En un ciberincidente, la falta de una RACI genera usurpación de autoridad (ej. un gerente comercial negociando con atacantes) o parálisis institucional (nadie toma la decisión porque nadie sabe a quién le compete responder ante la ley)."
  },

  // b) CUATRO FICHAS GRANDES (R, A, C, I)
  roles: [
    {
      code: "R",
      letterName: "Responsible (Ejecutor)",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800",
      queEs: "Quien hace el trabajo. Es la persona o equipo asignado para ejecutar materialmente las tareas necesarias para completar la actividad.",
      queHace: "Ejecuta, investiga, analiza técnicamente, prepara informes, desarrolla propuestas y realiza las operaciones cotidianas. Puede haber varios 'R' en una misma actividad.",
      confusiones: [
        "'R es el jefe' → FALSO: El R trabaja y ejecuta; el jefe que aprueba y asume la responsabilidad fiduciaria es el A.",
        "'Solo puede haber un R por fila' → FALSO: Una actividad compleja puede requerir que varios roles colaboren en la ejecución técnica.",
        "'Si soy R, decido' → FALSO: El R propone y entrega resultados, pero la autoridad de decisión final pertenece exclusivamente al A."
      ],
      ejemploCaso: "El CISO es 'R' en la declaración de una brecha de datos: prepara el dictamen pericial técnico y el análisis de impacto; pero el CEO es quien decide y aprueba la declaración pública.",
      truco: "¿Quién tiene las manos en la masa y hace el trabajo real?"
    },
    {
      code: "A",
      letterName: "Accountable (Aprobador, dueño del resultado)",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800",
      queEs: "Quien responde por el resultado, aprueba y tiene la decisión final. Debe haber EXACTAMENTE UNO por actividad en cada fila.",
      queHace: "Aprueba, decide, ejerce derecho de veto y rinde cuentas fiduciarias ante accionistas, entes reguladores y tribunales si el resultado sale mal.",
      confusiones: [
        "'A es el que más sabe técnicamente' → FALSO: El analista que detectó el ataque o el proveedor externo forense NO son A; son técnicos consultados o ejecutores.",
        "'Dos A en una fila para compartir la culpa' → FALSO: Dos 'A' en una fila significa que NADIE responde. La responsabilidad final es estrictamente individual.",
        "'Un proveedor externo puede ser A' → FALSO: El proveedor puede ser R (ejecutar tareas), pero NUNCA A; la responsabilidad penal y legal ante la ley sigue siendo indelegable de la organización.",
        "'El A siempre es el CEO' → FALSO: Depende del nivel de la decisión. Decisiones estratégicas, legales o patrimoniales (pagar un rescate, declarar una brecha pública, aprobar presupuesto anual) → CEO o Comité Ejecutivo. Decisiones operativas de seguridad (rotar accesos de un proveedor, aislar una subred de prueba) → CISO.",
        "'A y R no pueden coincidir' → FALSO: A y R pueden ser la misma persona si el líder además ejecuta la tarea, pero un A no ejecuta por el solo hecho de ser A."
      ],
      trampaExamen: "En la decisión de pagar o no un rescate de ransomware, el 'A' es estrictamente el CEO. No el CISO, ni soporte técnico, ni el analista, ni el proveedor externo contratado.",
      truco: "Si esto sale desastrosamente mal y llega la policía o la junta, ¿a quién le piden cuentas y le exigen responsabilidades legales?"
    },
    {
      code: "C",
      letterName: "Consulted (Consultado)",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-800",
      queEs: "Quien aporta criterio experto, conocimiento técnico, normativo o financiero especializado ANTES de que se tome la decisión. Comunicación de ida y vuelta.",
      queHace: "Opina, advierte riesgos, aporta contexto legal o técnico y delibera activamente. Su criterio profesional puede cambiar el rumbo de la decisión.",
      confusiones: [
        "'C vs. I' → AL C se le pide opinión ANTES y su dictamen puede cambiar la decisión; al I solo se le notifica después de decidida.",
        "'C decide o veta' → FALSO: El C asesora y opina, pero carece de facultad de veto o aprobación final (eso le compete al A).",
        "'Legal siempre es el dueño de la decisión' → FALSO: Asesoría Legal casi siempre es C: conoce la norma pero no es quien decide el negocio ni es el dueño del activo.",
        "'Poner a toda la empresa como C' → FALSO: Poner a demasiados consultados paraliza y burocratiza la capacidad de respuesta ante un incidente."
      ],
      ejemploCaso: "Asesoría Legal es 'C' al evaluar si una filtración califica para notificación obligatoria a la SBS según los plazos de ley.",
      truco: "¿Su opinión experta puede cambiar el rumbo de la decisión antes de que se apruebe?"
    },
    {
      code: "I",
      letterName: "Informed (Informado)",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800",
      queEs: "Quien recibe la notificación oficial del resultado o de la decisión tomada. Comunicación unidireccional (en un solo sentido).",
      queHace: "Se entera de la decisión para actuar en consecuencia, alinear sus procesos o estar al tanto; no opina, no delibera y no decide.",
      confusiones: [
        "'I vs. C' → El I recibe la noticia una vez tomada la decisión; no participa en la deliberación previa.",
        "'Ser I es poco importante' → FALSO: Omitir informar a quien debía ser I (ej. ocultarle el incidente a la Junta Directiva o a Legal) es una gravísima falla de gobierno (GV.RR / GV.OV).",
        "'I significa poner a todos en copia de correo' → FALSO: Solo se informa a los roles cuyos procesos operativos dependen del resultado de la decisión."
      ],
      ejemploCaso: "El equipo de Helpdesk (Mesa de Ayuda) y el Gerente de Comunicaciones son 'I' cuando se confirma una caída de servicio para preparar el speech ante clientes.",
      truco: "¿Solo necesita enterarse de lo que se decidió para poder hacer su trabajo derivado?"
    }
  ],

  // c) REGLAS PARA CONSTRUIR UNA RACI CORRECTA
  rules: [
    { title: "Exactamente un solo 'A' por fila", desc: "La responsabilidad fiduciaria final es única e indelegable. Si pones dos 'A', en la práctica nadie rinde cuentas." },
    { title: "Al menos un 'R' por fila", desc: "Toda actividad requiere al menos una persona o equipo que ejecute materialmente las tareas técnicas." },
    { title: "A y R pueden coincidir en el mismo rol", desc: "Si el tomador de decisiones además ejecuta la tarea técnica, puede figurar como 'A/R'. Pero ser 'A' no implica ejecutar automáticamente." },
    { title: "Usar roles organizacionales, nunca nombres propios", desc: "Se escribe 'CISO', 'CEO', 'Director Legal', nunca 'Juan Pérez' o 'María'. Las personas rotan, los roles y autoridades permanecen." },
    { title: "El 'A' debe poseer autoridad real y coherente", desc: "Decisiones estratégicas/patrimoniales/legales $\\rightarrow$ CEO/Directorio. Decisiones técnicas operativas de seguridad $\\rightarrow$ CISO." },
    { title: "No dejar celdas vacías sin justificación", desc: "Cada rol listado en la matriz debe tener clara su participación o quedar explícitamente sin asignación deliberada." }
  ],

  // d) CÓMO LEER UNA FILA Y LA TABLA MODELO GRANDE
  tableModel: [
    {
      activity: "Declarar brecha pública a clientes y reguladores (SBS / ANPDP)",
      ciso: "R",
      ceo: "A",
      legal: "C",
      tiOps: "I",
      comercial: "I",
      whyConsistency: "Decisión de máximo impacto legal, patrimonial y reputacional: el CEO es estrictamente 'A'. El CISO es 'R' porque elabora el dictamen técnico pericial pero NO decide la notificación pública. Legal es 'C' porque fija plazos legales."
    },
    {
      activity: "Decidir si se paga o no el rescate ante un ataque de ransomware",
      ciso: "R",
      ceo: "A",
      legal: "C",
      tiOps: "C",
      comercial: "I",
      whyConsistency: "Decisión crítica: Pagar una extorsión compromete fondos corporativos y posibles implicancias penales. El 'A' es única y exclusivamente el CEO o la Junta Directiva. CISO es 'R' analizando la viabilidad de recuperación sin pagar."
    },
    {
      activity: "Rotar accesos y revocar credenciales de un proveedor externo",
      ciso: "A",
      ceo: "I",
      legal: "I",
      tiOps: "R",
      comercial: "I",
      whyConsistency: "Consistencia de autoridad: Esta es una decisión OPERATIVA DE SEGURIDAD delegada. No requiere autorización del CEO. El CISO tiene autoridad formal para ser 'A', mientras el Administrador de TI/Ops es 'R' ejecutando el cambio en el firewall/IAM."
    },
    {
      activity: "Aprobar el presupuesto anual del Programa de Ciberseguridad",
      ciso: "R",
      ceo: "A",
      legal: "I",
      tiOps: "C",
      comercial: "C",
      whyConsistency: "Asignación de capital corporativo: La alta dirección (CEO/Directorio) es 'A' para aprobar gastos de inversión. El CISO es 'R' sustentando la justificación de riesgo y ROI."
    }
  ],

  // e) ERRORES FRECUENTES EN LA ASIGNACIÓN RACI
  examTraps: [
    { title: "Poner dos 'A' en una misma fila", impact: "Error grave", reason: "Viola el principio cardinal de la RACI: la responsabilidad final no se divide." },
    { title: "Asignar al CISO como 'A' en pagar ransomware", impact: "Falla conceptual", reason: "El CISO es un líder técnico; no tiene mandato patrimonial ni representación fiduciaria ante los accionistas para autorizar pagos de extorsión." },
    { title: "Asignar al proveedor externo como 'A'", impact: "Falla de gobierno", reason: "Un tercero contratado puede ser R (ejecutar análisis) o C (asesorar), pero la responsabilidad ante la ley JAMÁS se terceriza." },
    { title: "Confundir 'C' con 'I'", impact: "Error de asignación", reason: "Si al rol se le consulta antes de tomar la decisión, es C. Si solo se le envía una notificación cuando ya está decidido, es I." }
  ],

  // f) CASOS PRÁCTICOS RESUELTOS (ANÁLISIS CELDA POR CELDA)
  interactiveScenarios: [
    {
      id: "raci-sim-1",
      title: "Decisión 1: Pagar o no el rescate ante un ataque de ransomware",
      source: "Fuente: docs/Sesion 2.pdf, diapositivas 28-31 (criterio de A en rescates)",
      context: "Un ransomware cifró los servidores principales. Los atacantes exigen $200,000 en Bitcoin antes de 24 horas para entregar la llave de descifrado.",
      roles: [
        { roleKey: "ceo", roleLabel: "CEO / Gerente General", correct: "A", feedback: "El CEO es Accountable ('A') porque asume la responsabilidad fiduciaria, patrimonial y penal ante los accionistas y la ley." },
        { roleKey: "ciso", roleLabel: "CISO (Líder de Seguridad)", correct: "R", feedback: "El CISO es Responsible ('R') porque evalúa técnicamente si existen copias de seguridad viables y lidera el análisis forense." },
        { roleKey: "legal", roleLabel: "Asesoría Legal Externa", correct: "C", feedback: "Legal es Consulted ('C') porque dictamina sobre las implicancias penales y normativas de pagar extorsiones antes de decidir." },
        { roleKey: "finanzas", roleLabel: "Gerente de Finanzas", correct: "C", feedback: "Finanzas es Consulted ('C') porque informa sobre la liquidez disponible y el impacto en el flujo de caja." },
        { roleKey: "soporte", roleLabel: "Jefe de Soporte Técnico", correct: "I", feedback: "Soporte es Informed ('I') porque solo debe enterarse de la decisión para preparar el plan de restauración o formateo de terminales." }
      ]
    },
    {
      id: "raci-sim-2",
      title: "Decisión 2: Evaluar y reportar el hallazgo de un investigador externo",
      source: "Fuente: docs/Sesion 2.pdf, diapositivas 24-26 (caso Uber 2016 y asignación de A)",
      context: "Un hacker ético notificó que la API móvil expone DNI y números de cuenta de 80,000 usuarios sin autenticación.",
      roles: [
        { roleKey: "ceo", roleLabel: "CEO / Directorio", correct: "A", feedback: "El CEO es Accountable ('A') porque responde ante la SBS y la autoridad de protección de datos si el hallazgo no se trata con transparencia." },
        { roleKey: "ciso", roleLabel: "CISO / Oficial de Seguridad", correct: "R", feedback: "El CISO es Responsible ('R') porque reproduce la vulnerabilidad técnica, cuantifica el impacto y diseña el plan de remediación." },
        { roleKey: "legal", roleLabel: "Asesoría Legal", correct: "C", feedback: "Legal es Consulted ('C') porque evalúa si la exposición activa el deber legal de notificación formal dentro de las 48 horas." },
        { roleKey: "cpo", roleLabel: "Gerente de Producto (CPO)", correct: "I", feedback: "El CPO es Informed ('I') porque debe enterarse de la decisión para prever impactos comerciales; NO tiene autoridad delegada para decidir ni silenciar el hallazgo." },
        { roleKey: "dev", roleLabel: "Equipo de Desarrollo Web/Móvil", correct: "I", feedback: "El equipo de desarrollo es Informed ('I') de la directriz oficial y luego recibirá la orden técnica para desplegar el parche." }
      ]
    },
    {
      id: "raci-sim-3",
      title: "Decisión 3: Revocar accesos y credenciales de un proveedor de servicios TI",
      source: "Fuente: docs/Sesion 2.pdf, diapositiva 23 (GV.SC y roles de terceros)",
      context: "El contrato de 3 meses con la empresa de analítica de datos 'CloudData' venció ayer. Sus cuentas con privilegios administrativos siguen activas en AWS.",
      roles: [
        { roleKey: "ciso", roleLabel: "CISO (Oficial de Seguridad)", correct: "A", feedback: "El CISO es Accountable ('A') porque tiene la autoridad técnica delegada para gobernar las identidades y accesos operativos de la infraestructura sin requerir elevar al CEO." },
        { roleKey: "admin_ti", roleLabel: "Administrador de Red/IAM", correct: "R", feedback: "El Administrador de IAM es Responsible ('R') porque ejecuta técnicamente el bloqueo de cuentas y la rotación de llaves en la consola de AWS." },
        { roleKey: "compras", roleLabel: "Jefe de Compras y Contratos", correct: "C", feedback: "Compras es Consulted ('C') porque confirma si existe alguna adenda contractual vigente o si el servicio concluyó formalmente." },
        { roleKey: "proveedor", roleLabel: "Proveedor 'CloudData'", correct: "I", feedback: "El proveedor es Informed ('I') porque recibe la notificación formal de revocación de credenciales por cierre de contrato." }
      ]
    },
    {
      id: "raci-sim-4",
      title: "Decisión 4: Revocar acceso de identidad comprometida en entorno Zero Trust",
      source: "Caso creado para esta guía (verificar con diapositivas)",
      context: "El sistema de monitoreo detectó un comportamiento anómalo en la cuenta de un gerente de ventas: accedió a 3,000 registros de clientes en 2 horas fuera de su horario habitual. El equipo SOC sospecha de compromiso de credenciales.",
      roles: [
        { roleKey: "ciso", roleLabel: "CISO", correct: "A", feedback: "El CISO tiene la autoridad técnica delegada para suspender identidades comprometidas. La decisión de revocar acceso a un usuario interno en respuesta a un incidente de seguridad activo es competencia del CISO, no del CEO." },
        { roleKey: "soc", roleLabel: "Analista SOC", correct: "R", feedback: "El analista SOC ejecuta técnicamente la suspensión de la cuenta en el IAM, la contención del endpoint y el análisis forense inicial." },
        { roleKey: "legal", roleLabel: "Asesoría Legal", correct: "C", feedback: "Legal es consultado antes de notificar al empleado y para evaluar implicancias laborales de la suspensión de acceso." },
        { roleKey: "rrhh", roleLabel: "Recursos Humanos", correct: "I", feedback: "RRHH es informado del incidente para coordinar el protocolo laboral con el empleado afectado." },
        { roleKey: "gerente_ventas", roleLabel: "Gerente de Ventas (usuario afectado)", correct: "I", feedback: "El usuario afectado recibe la notificación oficial de la suspensión temporal de su cuenta pendiente de investigación." }
      ]
    }
  ],

  // g) ALGORITMO DE 5 PASOS PARA IDENTIFICAR EL 'A' EN UN ENUNCIADO DE EXAMEN
  readingAlgorithm: [
    {
      step: 1,
      question: "¿Quién responde legalmente si esto sale mal?",
      signal: "El que firma ante reguladores o accionistas = A",
      example: "Una filtración de datos llega a la SBS: quien firma la declaración formal es el CEO → CEO es 'A'."
    },
    {
      step: 2,
      question: "¿Es una decisión estratégica/patrimonial (pago, declaración pública, presupuesto)?",
      signal: "CEO / Directorio = A",
      example: "Aprobar el pago de un rescate de ransomware compromete fondos corporativos → CEO es estrictamente 'A'."
    },
    {
      step: 3,
      question: "¿Es una decisión técnica-operativa delegada (revocar acceso, aislar servidor, parche de emergencia)?",
      signal: "CISO = A",
      example: "Revocar las credenciales de un proveedor cuyo contrato venció es una decisión operativa de seguridad → CISO es 'A'."
    },
    {
      step: 4,
      question: "¿Aparece un proveedor externo ejecutando tareas?",
      signal: "Proveedor = R, NUNCA A",
      example: "Una empresa forense externa analiza los logs tras el ataque → Proveedor es 'R'; la responsabilidad legal sigue en la organización contratante."
    },
    {
      step: 5,
      question: "¿Aparece 'asesora', 'evalúa', 'opina antes de decidir'?",
      signal: "Ese rol = C, no A",
      example: "Asesoría Legal evalúa si la brecha activa el deber de notificación en 48 horas → Legal es 'C', el CEO sigue siendo 'A'."
    }
  ],

  // h) CONEXIONES CON OTRAS SESIONES DEL CURSO
  sessionLinks: [
    {
      session: "S2",
      category: "GV.RR",
      connection: "La RACI es el instrumento que hace visible GV.RR. Si no existe una RACI formalizada en la organización, la categoría GV.RR falla por definición: nadie puede demostrar que los roles y la autoridad estén asignados."
    },
    {
      session: "S2",
      category: "GV.SC",
      connection: "En GV.SC (Gestión de Riesgo en Cadena de Suministro), el proveedor siempre es R (ejecuta las tareas contratadas), pero nunca A: la responsabilidad fiduciaria y legal ante la ley es de la organización contratante y es indelegable a un tercero."
    },
    {
      session: "S3",
      category: "ID.AM",
      connection: "El 'Dueño del Activo' (Owner) del inventario de activos (ID.AM) es el área de negocio que depende del activo para su operación — exactamente el rol que figura como 'A' en la RACI de decisiones sobre ese activo. Regla de oro: el dueño del activo es el negocio, NUNCA TI ni Legal."
    },
    {
      session: "S5",
      category: "PR.AA",
      connection: "En Zero Trust (PR.AA), la decisión de revocar o conceder acceso a una identidad se asigna con RACI: quien decide la revocación (A = CISO) vs. quien la ejecuta técnicamente en el sistema IAM (R = Analista SOC o Administrador IAM)."
    }
  ]
};
