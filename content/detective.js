// Módulo Transversal: Detective de Categorías NIST CSF 2.0 (Rediseño Visual y Metodológico)
// Fuentes: NIST CSF 2.0 (CSWP 29) y Criterios Oficiales de Evaluación UPC CB05

window.DETECTIVE_DATA = {
  title: "Detective de Categorías NIST CSF 2.0",
  subtitle: "Situaciones prácticas para reconocer qué categoría de NIST CSF 2.0 aplica a cada hecho — desde Govern (GV.*) hasta Identify (ID.*), Protect (PR.*) y Detect (DE.*).",

  // 1. CUADRO RÁPIDO EN UNA PANTALLA (Las 6 categorías de Govern resumidas)
  quickTable: [
    {
      code: "GV.OC",
      name: "Contexto Organizacional",
      keyQuestion: "¿No se entendió la misión, las obligaciones legales/regulatorias o la criticidad del negocio?",
      signals: "\"Ignoró regulaciones de la SBS/PCI-DSS...\", \"Desconocía leyes de datos personales o salud...\", \"No consideró el impacto en la licencia operativa...\"",
      confusedWith: "GV.RM (falta de proceso interno) y GV.PO (falta de política interna)."
    },
    {
      code: "GV.RM",
      name: "Estrategia de Gestión de Riesgos",
      keyQuestion: "¿Se detectó un riesgo o hallazgo pero falta proceso, responsable, plazo o presupuesto para evaluarlo y tratarlo?",
      signals: "\"El ticket de vulnerabilidad quedó archivado 90 días en 'Pendiente'...\", \"Sin apetito ni tolerancia al riesgo definidos...\", \"Sin asignación de presupuesto para mitigar...\"",
      confusedWith: "GV.RR (usurpación de autoridad) y GV.OV (falta de auditoría)."
    },
    {
      code: "GV.RR",
      name: "Roles, Responsabilidades y Autoridad",
      keyQuestion: "¿Quién decide o aprueba? ¿Alguien actuó sin facultades delegadas en la RACI o un puesto directivo quedó vacante sin interino?",
      signals: "\"Decidió por su cuenta sin consultar a Legal ni a la Junta...\", \"El CISO renunció y operaron 4 meses sin nombrar responsable...\", \"Usurpó facultades de gasto fiduciario...\"",
      confusedWith: "GV.PO (falta de política escrita) y GV.RM (tratamiento de riesgo)."
    },
    {
      code: "GV.PO",
      name: "Políticas Organizacionales",
      keyQuestion: "¿Falta la política, reglamento o procedimiento escrito obligatorio, o nunca fue comunicado a la organización?",
      signals: "\"No existía directriz documentada...\", \"Nunca se redactó ni aprobó la política de...\", \"La política se redactó pero nunca se comunicó a los empleados...\"",
      confusedWith: "GV.OV (la política sí existe y está aprobada, pero nadie la audita)."
    },
    {
      code: "GV.OV",
      name: "Supervisión (Oversight)",
      keyQuestion: "¿La política sí existe y está aprobada, pero nadie fiscaliza su cumplimiento real ni se rinde cuentas al Directorio?",
      signals: "\"La política exigía revisiones semestrales, pero nadie auditó en 2 años...\", \"El Directorio nunca recibió métricas de seguridad...\", \"Nadie controló que se aplicara el doble factor...\"",
      confusedWith: "GV.PO (no tener la política escrita) e ID.IM (mejora continua de lecciones aprendidas)."
    },
    {
      code: "GV.SC",
      name: "Cadena de Suministro y Terceros",
      keyQuestion: "¿Hay un TERCERO involucrado (proveedor, contratista, software SaaS o nube) con accesos excesivos o sin control?",
      signals: "\"Proveedor externo contratado...\", \"Contrato sin cláusulas de auditoría ni penalidades...\", \"Accesos de un contratista que continúan activos 6 meses tras finalizar el servicio...\"",
      confusedWith: "Controles operativos internos de Protect (PR.AA) o Identify (ID.AM)."
    }
  ],

  // 2. REGLAS CARDINALES METODOLÓGICAS
  goldenRules: {
    multiCategoryRule: "Un mismo incidente suele tocar VARIAS categorías a la vez. No descartes una categoría porque otra también encaje: el análisis debe identificar la causa raíz sin descartar las demás categorías afectadas.",
    mcqVsEssayRule: "En preguntas de opción múltiple, busca la causa raíz gerencial. En preguntas de caso escrito, fundamenta cada categoría evaluada citando el hecho concreto y el estándar o principio que se incumple."
  },

  // 3. DETALLE DE CADA CATEGORÍA CON 2 EJEMPLOS Y EXPLICACIÓN DE POR QUÉ NO ES LA VECINA
  categories: [
    {
      code: "GV.OC",
      nameEs: "Contexto Organizacional",
      nameEn: "Organizational Context",
      badgeColor: "bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 border-blue-300 dark:border-blue-800",
      scope: "Asegura que la misión corporativa, los objetivos comerciales y las obligaciones legales, regulatorias y contractuales sectoriales se comprendan y orienten las prioridades de ciberseguridad.",
      keyQuestion: "¿No se entendió la misión, las obligaciones legales/regulatorias o la criticidad del negocio?",
      signals: [
        "\"Ignoró las leyes de protección de datos personales (Ley 29733)...\"",
        "\"No consideró las regulaciones de secreto bancario de la SBS...\"",
        "\"Desconocía las normativas sanitarias sobre expedientes clínicos...\"",
        "\"Omitió el impacto en la licencia para operar en el país...\""
      ],
      ejemplos: [
        {
          tipo: "Ejemplo 1 (Caso habitual)",
          descripcion: "Una plataforma de telemedicina almacena fichas médicas en la nube pública sin cifrado ni acuerdos de confidencialidad, ignorando que la legislación sanitaria exige secreto médico estricto bajo sanción de clausura de operaciones."
        },
        {
          tipo: "Ejemplo 2 (Caso límite / Trampa de examen)",
          descripcion: "Una empresa de retail lanza un monedero virtual sin consultar la normativa financiera. Aunque implementó firewalls de última generación, comete infracción regulatoria al operar sin autorización de la SBS. La falla raíz es GV.OC, no tecnológica."
        }
      ],
      porQueNoEsLaVecina: "GV.OC evalúa el entorno exterior del negocio (leyes, regulaciones, misión institucional). NO es GV.RM porque GV.RM gestiona cómo se tratan los riesgos identificados internamente; y NO es GV.PO porque GV.PO redacta los procedimientos internos, mientras que GV.OC reconoce las leyes del país que la empresa está obligada a cumplir por existir.",
      seConfundeCon: "GV.RM (Gestión de Riesgos) y GV.PO (Políticas).",
      comoDistinguirlos: "La señal que decide: ¿El error fue ignorar una ley, regulación sectorial o la misión del negocio? → GV.OC. ¿El error fue no tener un proceso para mitigar los riesgos identificados? → GV.RM.",
      trampaExamen: "Marcar GV.RM cuando una fintech no investigó el marco regulatorio de la SBS antes de salir a producción. El desconocimiento del entorno legal es GV.OC."
    },
    {
      code: "GV.RM",
      nameEs: "Estrategia de Gestión de Riesgos",
      nameEn: "Risk Management Strategy",
      badgeColor: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-800",
      scope: "Fija el apetito y la tolerancia al riesgo de la organización y establece el proceso formal obligatorio para identificar, evaluar, priorizar, asignar responsables y financiar el tratamiento de todo riesgo.",
      keyQuestion: "¿Faltan apetito/tolerancia de riesgo o un proceso que garantice que todo riesgo identificado se evalúe, asigne y trate?",
      signals: [
        "\"El hallazgo del pentesting quedó archivado 90 días en un correo...\"",
        "\"El ticket fue cerrado como 'no prioritario' sin evaluación de impacto...\"",
        "\"Sin apetito ni umbrales de tolerancia de riesgo formalmente definidos...\"",
        "\"No existe proceso institucional para priorizar hallazgos de auditoría...\""
      ],
      ejemplos: [
        {
          tipo: "Ejemplo 1 (Caso habitual)",
          descripcion: "Un informe de auditoría externa entregó 15 vulnerabilidades críticas hace 4 meses. El reporte quedó guardado en una carpeta sin que nadie calculara su impacto financiero, sin asignar un responsable de mitigación ni fijar fecha límite."
        },
        {
          tipo: "Ejemplo 2 (Caso límite / Trampa de examen)",
          descripcion: "Un jefe de soporte marca una vulnerabilidad crítica como 'riesgo aceptado' por su cuenta para evitar trabajar el fin de semana. Como la empresa no tiene una matriz de apetito de riesgo aprobada que defina qué riesgos se pueden tolerar, GV.RM falló estrepitosamente."
        }
      ],
      porQueNoEsLaVecina: "GV.RM evalúa el flujo de tratamiento de riesgos frente al apetito corporativo. NO es GV.RR porque GV.RR vigila quién tiene autoridad delegada en la cadena de mando; y NO es GV.OV porque GV.OV comprueba si las políticas se acatan, mientras que GV.RM decide qué hacer con los hallazgos de riesgo descubiertos.",
      seConfundeCon: "GV.RR (Roles y Autoridad) y GV.OV (Supervisión).",
      comoDistinguirlos: "La señal que decide: Si el problema es que un hallazgo técnico no tiene seguimiento, apetito ni tratamiento formal → GV.RM. Si alguien tomó atribuciones sin poder → GV.RR. Si nadie auditó si se cumplía una política → GV.OV.",
      trampaExamen: "Creer que registrar el hallazgo en un sistema ya cumple con gestionar el riesgo. Si el ticket permanece en 'Pendiente' semanas sin plan de tratamiento ni asignación formal, GV.RM falló."
    },
    {
      code: "GV.RR",
      nameEs: "Roles, Responsabilidades y Autoridad",
      nameEn: "Roles, Responsibilities, and Authorities",
      badgeColor: "bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200 border-purple-300 dark:border-purple-800",
      scope: "Define con precisión la cadena de mando: quién tiene facultades para decidir, quién ejecuta y quién rinde cuentas ante el Directorio (RACI), asegurando continuidad de liderazgo en puestos clave.",
      keyQuestion: "¿Quién decide o aprueba? ¿Alguien decidió sin autoridad delegada, o quedó un cargo vacío sin interino?",
      signals: [
        "\"Decidió por su cuenta sin consultar a Legal ni al Directorio...\"",
        "\"El CISO renunció y operaron 4 meses sin responsable de seguridad...\"",
        "\"Nadie asumió formalmente la dirección del equipo tras el cese...\"",
        "\"Sin facultades fiduciarias delegadas para autorizar pagos...\""
      ],
      ejemplos: [
        {
          tipo: "Ejemplo 1 (Caso habitual)",
          descripcion: "El Director de Marketing decide unilateralmente pagar $12,000 con tarjeta corporativa a un ciberdelincuente para que no publique datos robados, ocultando el incidente a Legal y a la Gerencia General."
        },
        {
          tipo: "Ejemplo 2 (Caso límite / Trampa de examen)",
          descripcion: "El CISO renuncia en enero. Durante el primer trimestre nadie es nombrado interino ni se asignan sus facultades de aprobación. Proyectos críticos se paralizan por falta de firma autorizada. Este vacío de mando tipifica GV.RR."
        }
      ],
      porQueNoEsLaVecina: "GV.RR evalúa a las personas y su investidura de poder jerárquico. NO es GV.PO porque GV.PO define los documentos y reglamentos escritos; y NO es GV.RM porque GV.RM gestiona los hallazgos técnicos de vulnerabilidades, mientras que GV.RR resuelve quién tiene la autoridad legal para firmar y decidir.",
      seConfundeCon: "GV.PO (Políticas Organizacionales) y GV.RM (Gestión de Riesgos).",
      comoDistinguirlos: "La señal que decide: ¿El error fue que una persona actuó sin facultades delegadas o que un cargo clave quedó acéfalo? → GV.RR. ¿Faltaba la regla escrita aprobada? → GV.PO.",
      trampaExamen: "Clasificar la renuncia del CISO sin reemplazo como falla de 'Políticas'. No nombrar un interino con autoridad delegada es la falla clásica de GV.RR."
    },
    {
      code: "GV.PO",
      nameEs: "Políticas Organizacionales",
      nameEn: "Organizational Policies",
      badgeColor: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800",
      scope: "Redacta, aprueba formalmente, publica y comunica a toda la organización las directrices, reglamentos y estándares obligatorios de conducta y seguridad técnica.",
      keyQuestion: "¿Falta la política o el procedimiento escrito, o no está formalmente comunicado a la organización?",
      signals: [
        "\"No existía directriz documentada sobre...\"",
        "\"Nunca se redactó una política formal de contraseñas/accesos...\"",
        "\"No había reglamento aprobado por la Gerencia sobre teletrabajo...\"",
        "\"La política se aprobó en papel pero nunca se comunicó a los empleados...\""
      ],
      ejemplos: [
        {
          tipo: "Ejemplo 1 (Caso habitual)",
          descripcion: "Los desarrolladores suben credenciales y claves maestras a repositorios públicos de GitHub porque la empresa jamás aprobó ni comunicó una política obligatoria sobre desarrollo seguro de software."
        },
        {
          tipo: "Ejemplo 2 (Caso límite / Trampa de examen)",
          descripcion: "La gerencia redactó una política de borrado seguro de discos duros pero quedó guardada en el escritorio del CISO y nunca se publicó en la intranet ni se difundió a soporte. La falta de comunicación tipifica falla en GV.PO."
        }
      ],
      porQueNoEsLaVecina: "GV.PO evalúa la existencia formal y difusión de la norma escrita. NO es GV.OV porque GV.PO se enfoca en tener la norma escrita y socializada; si la norma ya existe pero nadie la fiscaliza, la culpa es de GV.OV (Supervisión).",
      seConfundeCon: "GV.OV (Supervisión).",
      comoDistinguirlos: "La señal que decide: ¿Existe el documento formal aprobado en la intranet? Si NO existe o no se comunicó → GV.PO. Si SÍ existe pero la dirección nunca auditó su cumplimiento → GV.OV.",
      trampaExamen: "Marcar GV.PO cuando el enunciado dice: 'La empresa tiene una política aprobada desde hace dos años, pero el personal no la cumple porque nadie los controla'. En ese caso falló GV.OV."
    },
    {
      code: "GV.OV",
      nameEs: "Supervisión",
      nameEn: "Oversight",
      badgeColor: "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200 border-rose-300 dark:border-rose-800",
      scope: "Verifica de manera periódica e independiente que las políticas y estrategias de ciberseguridad se ejecuten en la realidad operativa, rindiendo cuentas continuas al Directorio.",
      keyQuestion: "¿Existe la política pero nadie verifica que se cumpla ni el Directorio revisa los resultados?",
      signals: [
        "\"Estaba documentado en la política pero nadie auditó en 18 meses...\"",
        "\"Nunca se realizaron revisiones periódicas de cumplimiento...\"",
        "\"La Junta Directiva nunca recibió informes ni métricas de seguridad...\"",
        "\"No existía fiscalización de la aplicación del procedimiento...\""
      ],
      ejemplos: [
        {
          tipo: "Ejemplo 1 (Caso habitual)",
          descripcion: "La empresa cuenta con una política formal que exige desactivar las credenciales de exempleados en menos de 24 horas. Tras 2 años sin auditorías, un peritaje descubre que el 40% de las cuentas de exempleados continúan activas."
        },
        {
          tipo: "Ejemplo 2 (Caso límite / Trampa de examen)",
          descripcion: "Un banco tiene un procedimiento obligatorio de pruebas semestrales de restauración de copias de seguridad. El Directorio nunca exigió el informe de resultados y cuando ocurrió un ransomware descubrieron que las copias fallaban desde hacía 1 año."
        }
      ],
      porQueNoEsLaVecina: "GV.OV evalúa el control y la fiscalización en el presente. NO es GV.PO porque en GV.OV la regla ya está escrita; y NO es ID.IM porque ID.IM analiza lecciones aprendidas de incidentes pasados para evolucionar procesos, mientras que GV.OV fiscaliza que las reglas actuales se cumplan hoy.",
      seConfundeCon: "GV.PO (Políticas) e ID.IM (Mejora Continua).",
      comoDistinguirlos: "La señal que decide: ¿Se trata de comprobar si una regla actual se acata en la operación ordinaria? → GV.OV. ¿Se trata de aprender de un ataque pasado para cambiar el plan hacia el futuro? → ID.IM.",
      trampaExamen: "Confundir no tener la regla escrita (GV.PO) con tener la regla pero no auditarla periódicamente (GV.OV)."
    },
    {
      code: "GV.SC",
      nameEs: "Cadena de Suministro y Terceros",
      nameEn: "Cybersecurity Supply Chain Risk Management",
      badgeColor: "bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800",
      scope: "Identifica, evalúa y mitiga los riesgos derivados de terceros: proveedores de software, contratistas, consultoras, servicios cloud y socios externos en todo su ciclo de vida.",
      keyQuestion: "¿Involucra a un tercero (acceso de proveedores, contratos, revisión o revocación de accesos)?",
      signals: [
        "\"Proveedor externo contratado...\"",
        "\"Contrato de servicios sin cláusulas de seguridad ni penalidades...\"",
        "\"Acceso temporal de un contratista que nunca fue revocado al término...\"",
        "\"Empresa consultora con llaves de infraestructura sin rotación...\""
      ],
      ejemplos: [
        {
          tipo: "Ejemplo 1 (Caso habitual)",
          descripcion: "Una empresa contrata a una consultora de desarrollo por 3 semanas para un piloto. Las credenciales de acceso administrativo total a la base de datos nunca fueron revocadas y siguen activas 9 meses después de liquidado el contrato."
        },
        {
          tipo: "Ejemplo 2 (Caso límite / Trampa de examen)",
          descripcion: "Un hospital contrata un sistema de almacenamiento cloud de rayos X sin exigir en el contrato derechos de auditoría técnica ni plazos perentorios de notificación ante brechas de datos. Esta omisión contractual tipifica GV.SC."
        }
      ],
      porQueNoEsLaVecina: "GV.SC se activa siempre que exista un TERCERO involucrado. NO es un control operativo de Protect (PR.AA) porque GV.SC gobierna la relación contractual, la homologación previa y el ciclo de vida del proveedor; si el riesgo nace de contratar a un tercero sin debida diligencia o no darle de baja, es GV.SC.",
      seConfundeCon: "Controles internos de Protect (PR.AA) o Identify (ID.AM).",
      comoDistinguirlos: "La señal que decide: ¿Aparece en el caso un proveedor, contratista o servicio externo con falta de control o cuentas no revocadas? → GV.SC falló SIEMPRE.",
      trampaExamen: "Creer que GV.SC solo falla si el proveedor ataca a la empresa. Mantenerle accesos abiertos a un tercero tras finalizar el servicio es una falla directa de GV.SC."
    }
  ],

  // 4. PARES CONFUSOS FRECUENTES (Comparaciones lado a lado con fila "La señal que decide")
  confusingPairsDetailed: [
    {
      pairId: "po-vs-ov",
      title: "GV.PO (Políticas) vs. GV.OV (Supervisión)",
      decidingSignal: "La prueba de la intranet: si buscas el documento formal y NO existe ni fue comunicado → GV.PO. Si el documento SÍ existe y está aprobado, pero nadie audita si se ejecuta en la práctica → GV.OV.",
      left: {
        code: "GV.PO (Políticas)",
        focus: "Inexistencia o falta de comunicación de la regla formal",
        evidence: "Los programadores suben llaves de AWS a repositorios públicos porque la empresa nunca formalizó ni aprobó un lineamiento obligatorio de código seguro.",
        whyThis: "Aquí no hay documento normativo ni estándar aprobado. La causa raíz es la inexistencia de la política."
      },
      right: {
        code: "GV.OV (Supervisión)",
        focus: "Ausencia de auditoría y fiscalización de la regla existente",
        evidence: "La empresa cuenta con una política aprobada que exige cifrado BitLocker en el 100% de laptops. Una auditoría externa revela que el 80% no lo tiene activo por falta de revisiones internas.",
        whyThis: "La regla sí existe en papel, pero la alta dirección nunca auditó ni supervisó su cumplimiento real."
      }
    },
    {
      pairId: "rm-vs-rr",
      title: "GV.RM (Gestión de Riesgo) vs. GV.RR (Roles y Autoridad)",
      decidingSignal: "La prueba de la acción vs. el poder: ¿El problema es que un hallazgo no tiene proceso de tratamiento ni presupuesto (RM), o que alguien se tomó atribuciones que no le correspondían o un puesto quedó acéfalo (RR)?",
      left: {
        code: "GV.RM (Gestión de Riesgos)",
        focus: "Falta de proceso institucional para evaluar y tratar hallazgos",
        evidence: "El equipo de soporte reportó formalmente en un ticket que el servidor de respaldos tiene fallas, pero la gerencia nunca evaluó el impacto ni asignó presupuesto para mitigarlo.",
        whyThis: "El riesgo está identificado pero la organización carece de un proceso formal para tratarlo según su apetito corporativo."
      },
      right: {
        code: "GV.RR (Roles y Autoridad)",
        focus: "Usurpación de facultades fiduciarias o vacío de mando",
        evidence: "El Director de Marketing decide por su cuenta pagar $10,000 a un hacker para silenciar una fuga de datos, sin consultar a Legal ni al Directorio.",
        whyThis: "Una persona toma decisiones de altísimo impacto patrimonial y penal sin tener autoridad delegada en la matriz RACI."
      }
    },
    {
      pairId: "rr-vs-po",
      title: "GV.RR (Roles y Autoridad) vs. GV.PO (Políticas)",
      decidingSignal: "La prueba de las personas vs. las reglas: ¿Falla la investidura de quién manda y quién decide (RR), o falta el marco normativo escrito sobre qué está permitido hacer (PO)?",
      left: {
        code: "GV.RR (Roles y Autoridad)",
        focus: "Vacío jerárquico o falta de cobertura de mando",
        evidence: "El CISO renuncia repentinamente y la empresa opera durante 4 meses sin nombrar interino ni definir formalmente quién aprueba cambios críticos.",
        whyThis: "Es una ausencia formal de liderazgo y responsabilidades. La falta de titular o interino con autoridad es la falla clásica de GV.RR."
      },
      right: {
        code: "GV.PO (Políticas)",
        focus: "Falta de directriz, estándar o reglamento escrito",
        evidence: "Los colaboradores descargan programas no autorizados porque no existe ningún reglamento interno que fije la prohibición ni sanciones.",
        whyThis: "Falta el documento formal aprobado que estipula qué conductas están permitidas o prohibidas."
      }
    },
    {
      pairId: "ov-vs-im",
      title: "GV.OV (Supervisión) vs. ID.IM (Mejora Continua)",
      decidingSignal: "La prueba del presente vs. el pasado: ¿Se trata de auditar si se cumple una regla existente hoy (GV.OV), o de aprender de un incidente pasado para evolucionar y cambiar los procesos (ID.IM)?",
      left: {
        code: "GV.OV (Supervisión)",
        focus: "Controlar el cumplimiento de lo definido en el presente",
        evidence: "El Directorio nunca revisó si los administradores de sistemas rotan las contraseñas de servicio como manda la política vigente.",
        whyThis: "Comprueba si las reglas aprobadas se acatan en la operación ordinaria del día a día."
      },
      right: {
        code: "ID.IM (Mejora Continua)",
        focus: "Aprender de las brechas pasadas para optimizar el futuro",
        evidence: "La empresa sufrió un ataque de ransomware hace tres meses, pero nunca utilizó los hallazgos forenses para actualizar su plan de continuidad ni parchar la brecha.",
        whyThis: "Desaprovechar las lecciones aprendidas de incidentes o auditorías previas para evolucionar las defensas tipifica ID.IM."
      }
    },
    // --- NUEVOS PARES CONFUSOS (S3, S5, S6/S7) ---
    {
      pairId: "sc-vs-am",
      title: "GV.SC (Cadena de Suministro) vs. ID.AM (Gestión de Activos)",
      decidingSignal: "La prueba del origen externo vs. interno: ¿El activo sin registrar o sin control pertenece a un TERCERO (proveedor, contratista, SaaS) que interactúa con la organización? → GV.SC. ¿Es un activo propiedad de la organización que simplemente no está inventariado en el registro oficial? → ID.AM.",
      left: {
        code: "GV.SC (Cadena de Suministro)",
        focus: "Tercero sin homologar, sin contrato de seguridad o con accesos no gestionados",
        evidence: "Una empresa SaaS de nómina accede a los datos de RRHH de la organización desde hace 18 meses sin que exista ningún contrato formal de seguridad ni cláusula de auditoría.",
        whyThis: "El riesgo proviene de la relación con un TERCERO externo cuyo ciclo de vida no ha sido gestionado: esto es GV.SC, no ID.AM."
      },
      right: {
        code: "ID.AM (Gestión de Activos)",
        focus: "Activo interno de la organización no catalogado en el inventario oficial",
        evidence: "El área de Operaciones compró 12 servidores de borde hace 8 meses. Ninguno figura en el inventario de activos de TI ni tiene un propietario de negocio asignado.",
        whyThis: "Los servidores son activos propios de la organización. El fallo es no haberlos registrado, clasificado y asignado a un área dueña: esto es ID.AM."
      }
    },
    {
      pairId: "ra-vs-rm",
      title: "ID.RA (Evaluación de Riesgos) vs. GV.RM (Gestión de Riesgos)",
      decidingSignal: "La prueba del análisis vs. el proceso: ¿El fallo es que no se calculó probabilidad × impacto de una amenaza específica ni se documentó en el registro de riesgos (RA)? ¿O el fallo es que la organización no tiene el proceso, el apetito ni el presupuesto institucional para tratar los riesgos ya identificados (RM)?",
      left: {
        code: "ID.RA (Evaluación de Riesgos)",
        focus: "Ausencia de análisis técnico de amenaza, vulnerabilidad y consecuencia para un riesgo concreto",
        evidence: "Tras detectar que el firewall perimetral tiene una versión con exploit público conocido, nadie calculó la probabilidad de explotación ni el impacto financiero; el hallazgo nunca ingresó al registro de riesgos.",
        whyThis: "La falla es analítica: no se realizó la evaluación del riesgo específico (probabilidad × impacto, amenaza, vulnerabilidad, consecuencia). Eso es ID.RA."
      },
      right: {
        code: "GV.RM (Gestión de Riesgos)",
        focus: "Falta de proceso institucional, apetito de riesgo o presupuesto para tratar los riesgos evaluados",
        evidence: "La empresa sí evaluó y documentó sus riesgos en un registro formal, pero la gerencia lleva 6 meses sin asignar responsables de mitigación ni presupuesto porque no existe una estrategia corporativa de tratamiento.",
        whyThis: "El análisis ya existe; lo que falta es el proceso institucional que mueve cada riesgo hacia una decisión de tratamiento. Eso es GV.RM."
      }
    },
    {
      pairId: "praa-vs-decm",
      title: "PR.AA (Control de Acceso) vs. DE.CM (Monitoreo Continuo)",
      decidingSignal: "La prueba del candado vs. la cámara: ¿El fallo es que no se aplicó el control que IMPIDE el acceso indebido (autenticación, MFA, privilegio mínimo)? → PR.AA. ¿O el fallo es que nadie DETECTÓ el comportamiento anómalo porque no había telemetría, EDR ni SIEM analizando la actividad en la red? → DE.CM.",
      left: {
        code: "PR.AA (Autenticación y Control de Acceso)",
        focus: "No se impidió el acceso indebido: falta autenticación fuerte, MFA o privilegio mínimo",
        evidence: "Un atacante accedió al panel de administración con credenciales comprometidas porque la organización no tenía MFA habilitado en ninguna cuenta privilegiada y las contraseñas por defecto no habían sido cambiadas.",
        whyThis: "El control preventivo que debía bloquear el acceso no estaba implementado. Es una falla de PR.AA, no de detección."
      },
      right: {
        code: "DE.CM (Monitoreo Continuo)",
        focus: "No se detectó el comportamiento anómalo en la red o en los endpoints",
        evidence: "Un actor malicioso se movió lateralmente por 47 días dentro de la red corporativa sin que ningún sistema de detección (EDR, SIEM) generara una alerta, porque el equipo de seguridad no tenía telemetría de endpoints configurada.",
        whyThis: "El acceso ocurrió, pero el problema es que nadie lo vio ni lo detectó. La ausencia de monitoreo y detección es DE.CM."
      }
    }
  ],

  // 5. BANCO DE CASOS ANALIZADOS (20 Escenarios - GV.*, ID.*, PR.*, DE.*)
  miniQuizzes: [
    // --- BLOQUE: 12 ESCENARIOS DE GV.* ---
    {
      id: "mq-oc-1",
      categoryTarget: "GV.OC",
      session: "S2",
      source: "Caso creado para esta guía (verificar con diapositivas)",
      scenario: "Una startup de pagos digitales lanza un monedero móvil en Perú sin solicitar autorización previa a la SBS ni adaptar sus controles a las normas de secreto bancario y prevención de lavado de activos.",
      options: ["GV.OC", "GV.PO", "GV.RM", "PR.AA"],
      correct: "GV.OC",
      feedback: "La startup falló en GV.OC porque ignoró el contexto regulatorio obligatorio y las obligaciones legales inherentes a la naturaleza financiera de su negocio."
    },
    {
      id: "mq-oc-2",
      categoryTarget: "GV.OC",
      session: "S2",
      source: "Caso creado para esta guía (verificar con diapositivas)",
      scenario: "Una universidad privada terceriza el almacenamiento de actas de grados y títulos en un proveedor internacional sin verificar si la legislación nacional exige residencia física de datos educativos.",
      options: ["GV.OC", "GV.SC", "GV.OV", "ID.AM"],
      correct: "GV.OC",
      feedback: "Aunque involucra un proveedor, la causa raíz del fallo es no comprender las obligaciones legales y regulatorias de soberanía de datos del sector educativo (GV.OC)."
    },
    {
      id: "mq-rm-1",
      categoryTarget: "GV.RM",
      session: "S2",
      source: "Caso creado para esta guía (verificar con diapositivas)",
      scenario: "Un informe de ethical hacking entregó 18 vulnerabilidades críticas en la pasarela transaccional. El área de seguridad las guardó en una carpeta compartida sin que se les asignara presupuesto, responsable de remediación ni fecha límite de mitigación.",
      options: ["GV.RM", "GV.PO", "GV.RR", "RS.MA"],
      correct: "GV.RM",
      feedback: "Falla GV.RM porque la organización carece de un proceso obligatorio que vincule los riesgos descubiertos con decisiones de tratamiento y asignación de recursos corporativos."
    },
    {
      id: "mq-rm-2",
      categoryTarget: "GV.RM",
      session: "S2",
      source: "Caso creado para esta guía (verificar con diapositivas)",
      scenario: "Un analista detectó que la base de datos de producción no tiene tolerancia a fallos. El ticket fue cerrado como 'Riesgo aceptado' por un jefe de área sin consultar la matriz de apetito de riesgo aprobada por la empresa.",
      options: ["GV.RM", "GV.OV", "GV.PO", "PR.IR"],
      correct: "GV.RM",
      feedback: "La aceptación de riesgos no puede realizarse de forma ad-hoc sin apego a los umbrales formales de tolerancia corporativa aprobados por la alta dirección (GV.RM)."
    },
    {
      id: "mq-rr-1",
      categoryTarget: "GV.RR",
      session: "S2",
      source: "Fuente: docs/Sesion 2.pdf, diapositivas 24-26 (caso Uber y roles)",
      scenario: "El Director de Finanzas decide por su cuenta no notificar a los clientes sobre un robo de credenciales bancarias para no perjudicar la cotización en bolsa de la empresa, sin informar al CISO ni a Legal.",
      options: ["GV.RR", "GV.PO", "GV.OC", "RS.CO"],
      correct: "GV.RR",
      feedback: "Es una usurpación de atribuciones: un directivo decide unilateralmente sobre un asunto legal de máxima gravedad sin contar con facultades delegadas en la matriz RACI (GV.RR)."
    },
    {
      id: "mq-rr-2",
      categoryTarget: "GV.RR",
      session: "S2",
      source: "Fuente: docs/Sesion 2.pdf, diapositivas 14-16 (roles vacantes)",
      scenario: "El CISO renunció abruptamente a inicios de año y la empresa lleva cuatro meses operando sin designar un interino ni establecer formalmente quién aprueba cambios de emergencia en la infraestructura.",
      options: ["GV.RR", "GV.PO", "GV.OV", "ID.AM"],
      correct: "GV.RR",
      feedback: "La existencia de un vacío prolongado en la cadena de mando sin asignación de responsabilidades formales es la falla prototípica de GV.RR."
    },
    {
      id: "mq-po-1",
      categoryTarget: "GV.PO",
      session: "S2",
      source: "Caso creado para esta guía (verificar con diapositivas)",
      scenario: "Los desarrolladores conectan sus laptops personales a los servidores productivos desde redes públicas porque la empresa nunca elaboró ni comunicó una política obligatoria de teletrabajo y acceso remoto.",
      options: ["GV.PO", "GV.OV", "GV.RR", "PR.AC"],
      correct: "GV.PO",
      feedback: "Falta la regla formal aprobada que establezca los mandatos obligatorios y límites de conducta para el acceso remoto (GV.PO)."
    },
    {
      id: "mq-po-2",
      categoryTarget: "GV.PO",
      session: "S2",
      source: "Fuente: docs/Sesion 2.pdf, diapositiva 21 (comunicación de políticas)",
      scenario: "El comité directivo aprobó una política estricta de borrado seguro de discos duros pero nunca la publicó en la intranet ni la difundió al personal de soporte técnico.",
      options: ["GV.PO", "GV.OV", "PR.DS", "GV.RR"],
      correct: "GV.PO",
      feedback: "Una política no está completada ni en vigor si no ha sido formalmente comunicada a las áreas que deben cumplirla. La falta de comunicación tipifica falla en GV.PO."
    },
    {
      id: "mq-ov-1",
      categoryTarget: "GV.OV",
      session: "S2",
      source: "Caso creado para esta guía (verificar con diapositivas)",
      scenario: "La empresa cuenta con una política aprobada que ordena ejecutar simulacros de ransomware cada 6 meses. Han pasado 3 años y el Directorio nunca revisó si se hicieron ni exigió reportes de cumplimiento.",
      options: ["GV.OV", "GV.PO", "ID.IM", "RS.RP"],
      correct: "GV.OV",
      feedback: "La política sí existe (GV.PO está cubierta). La falla radica en la total omisión de supervisión, auditoría y rendición de cuentas hacia la alta dirección (GV.OV)."
    },
    {
      id: "mq-ov-2",
      categoryTarget: "GV.OV",
      session: "S2",
      source: "Caso creado para esta guía (verificar con diapositivas)",
      scenario: "El procedimiento interno exige que TI audite trimestralmente las cuentas inactivas de usuarios. Una auditoría externa descubre que existen 500 cuentas de extrabajadores activas desde hace más de un año.",
      options: ["GV.OV", "GV.PO", "PR.AA", "GV.RM"],
      correct: "GV.OV",
      feedback: "El procedimiento estaba formalizado pero nadie supervisó ni verificó que se estuviera ejecutando en la práctica (GV.OV)."
    },
    {
      id: "mq-sc-1",
      categoryTarget: "GV.SC",
      session: "S1/S2",
      source: "Fuente: docs/Sesion1_0 y 1_1 MON.pdf, diapositivas 17-21 y Sesion 2.pdf, diapositiva 23",
      scenario: "Una empresa contrató a un proveedor de soporte de bases de datos para un proyecto piloto de 3 semanas. Las cuentas de acceso administrativo a AWS nunca fueron revocadas y siguen activas 9 meses después.",
      options: ["GV.SC", "GV.PO", "ID.AM", "GV.OV"],
      correct: "GV.SC",
      feedback: "Involucra directamente el ciclo de vida de un tercero. No revocar ni auditar los accesos de contratistas es la evidencia clásica de falla en GV.SC."
    },
    {
      id: "mq-sc-2",
      categoryTarget: "GV.SC",
      session: "S2",
      source: "Caso creado para esta guía (verificar con diapositivas)",
      scenario: "Un banco contrata un servicio en la nube para procesar microcréditos sin exigir en el contrato cláusulas de auditoría de ciberseguridad ni compromisos de notificación inmediata ante brechas de datos.",
      options: ["GV.SC", "GV.OC", "PR.DS", "GV.RM"],
      correct: "GV.SC",
      feedback: "Omitir requisitos y acuerdos de ciberseguridad en los contratos con proveedores de la cadena de suministro tipifica una falla directa en GV.SC."
    },

    // --- BLOQUE: S3 — IDENTIFY (ID.AM, ID.RA) ---
    {
      id: "mq-am-1",
      categoryTarget: "ID.AM",
      session: "S3",
      source: "Fuente: docs/Presentación - Sesion 3.pdf, diapositivas 12-16 (inventario y dueño de negocio)",
      scenario: "El área de Logística compró 20 tabletas para gestión de almacén. Ningún dispositivo figura en el inventario oficial de activos de TI, no tienen propietario de negocio asignado y nadie los incluyó en el proceso de clasificación de información.",
      options: ["ID.AM", "GV.SC", "GV.PO", "PR.PS"],
      correct: "ID.AM",
      feedback: "ID.AM (Gestión de Activos) se activa cuando un activo propiedad de la organización no está catalogado, clasificado ni tiene dueño de negocio asignado. Regla de oro: el dueño del activo es siempre el área de negocio (Logística), nunca TI. GV.SC sería si los dispositivos los hubiera entregado un proveedor externo sin contrato; GV.PO sería si faltara la política de inventario; PR.PS sería si el problema fuera la configuración insegura de los dispositivos."
    },
    {
      id: "mq-ra-1",
      categoryTarget: "ID.RA",
      session: "S3",
      source: "Fuente: docs/Presentación - Sesion 3.pdf, diapositivas 22-26 (fórmula de riesgo y registro)",
      scenario: "El equipo de seguridad detectó que el servidor de correo expone el protocolo SMTP sin autenticación hacia Internet. Nadie calculó la probabilidad de explotación ni el impacto potencial, y el hallazgo nunca ingresó al registro de riesgos (risk register) de la organización.",
      options: ["ID.RA", "GV.RM", "GV.OV", "DE.CM"],
      correct: "ID.RA",
      feedback: "ID.RA (Evaluación de Riesgos) exige analizar cada riesgo concreto: identificar la amenaza (actor externo que explota SMTP abierto), la vulnerabilidad (autenticación ausente), calcular probabilidad × impacto y registrarlo formalmente. GV.RM sería si el registro ya existiera pero faltara proceso institucional para tratar los riesgos; GV.OV sería si la política de evaluación existiera pero nadie la auditara; DE.CM sería si el problema fuera falta de monitoreo activo de la actividad en ese servidor."
    },

    // --- BLOQUE: S5 — ZERO TRUST (PR.AA, DE.CM) ---
    {
      id: "mq-praa-1",
      categoryTarget: "PR.AA",
      session: "S5",
      source: "Fuente: docs/Presentación - Sesion 5.pdf, diapositivas 9-14 (quiebre del perímetro y principio ZT 1)",
      scenario: "La red corporativa sigue un modelo perimetral tradicional: cualquier equipo conectado a la LAN tiene acceso implícito a todos los sistemas internos sin autenticación adicional. Un auditor señala que no existe segmentación por identidad ni MFA, solo se confía en estar 'dentro de la red'.",
      options: ["PR.AA", "DE.CM", "GV.SC", "GV.RM"],
      correct: "PR.AA",
      feedback: "PR.AA (Autenticación y Control de Acceso) cubre la aplicación del modelo Zero Trust: el acceso debe basarse en la identidad verificada (con MFA), no en la zona de red. El modelo perimetral fallido es la falla clásica de PR.AA. DE.CM sería si hubiera acceso ocurriendo y nadie lo detectara; GV.SC sería si el acceso fuera de un tercero externo; GV.RM sería si el riesgo estuviera identificado pero sin tratamiento institucional."
    },
    {
      id: "mq-decm-1",
      categoryTarget: "DE.CM",
      session: "S5",
      source: "Fuente: docs/Presentación - Sesion 5.pdf, diapositivas 18-22 (Assume Breach y telemetría)",
      scenario: "Un atacante comprometió credenciales válidas de un administrador y se movió lateralmente durante 63 días descargando datos confidenciales. La organización no contaba con EDR en los servidores ni con un SIEM correlacionando eventos, por lo que ninguna alerta fue generada en ese período.",
      options: ["DE.CM", "PR.AA", "GV.OV", "ID.RA"],
      correct: "DE.CM",
      feedback: "DE.CM (Monitoreo Continuo) se activa cuando la organización carece de capacidad para detectar comportamiento anómalo — movimiento lateral, exfiltración de datos — porque no tiene EDR, SIEM ni telemetría activa. PR.AA sería la falla si el atacante no hubiera podido entrar en primer lugar (autenticación débil); GV.OV sería si la política de monitoreo existiera pero nadie auditara su cumplimiento; ID.RA sería si nunca se evaluara el riesgo de ese vector de ataque."
    },

    // --- BLOQUE: S6 — IDENTIDADES Y ENDPOINTS (PR.AA, PR.PS) ---
    {
      id: "mq-praa-2",
      categoryTarget: "PR.AA",
      session: "S6",
      source: "Fuente: docs/Presentación - Sesion 6.pdf, diapositivas 15-18 (ciclo de vida de identidades y offboarding)",
      scenario: "Una empleada del área de Contabilidad dejó la empresa hace 4 meses. Su cuenta de usuario en Active Directory sigue activa, con acceso al ERP financiero y al repositorio de facturas electrónicas. Nadie ejecutó el proceso de offboarding para revocar sus privilegios.",
      options: ["PR.AA", "GV.OV", "GV.SC", "ID.AM"],
      correct: "PR.AA",
      feedback: "PR.AA (Autenticación y Control de Acceso) incluye el ciclo de vida completo de identidades: alta, modificación y BAJA de accesos. El offboarding sin revocación de privilegios es la falla más frecuente de PR.AA. GV.OV sería si la política de offboarding existiera pero nadie auditara su ejecución; GV.SC sería si la persona fuera una contratista externa (tercero); ID.AM sería si la cuenta no estuviera catalogada en el inventario."
    },
    {
      id: "mq-ps-1",
      categoryTarget: "PR.PS",
      session: "S6",
      source: "Fuente: docs/Presentación - Sesion 6.pdf, diapositivas 28-32 (CIS Control 1 y hardening)",
      scenario: "Una auditoría de seguridad descubre que los 150 endpoints de la organización ejecutan Windows Server 2008 R2 (sin soporte desde 2020), sin parches de seguridad aplicados en 18 meses y sin configuración de línea base documentada. No existe un proceso de hardening formal.",
      options: ["PR.PS", "DE.CM", "GV.RM", "GV.PO"],
      correct: "PR.PS",
      feedback: "PR.PS (Seguridad de Plataformas) cubre el hardening de endpoints, gestión de parches y configuraciones base (baseline). Sistemas sin soporte, sin parches y sin línea base de configuración es la evidencia directa de falla en PR.PS. DE.CM sería si el problema fuera la falta de detección de amenazas en esos endpoints; GV.RM sería si el hallazgo estuviera documentado pero sin plan de tratamiento; GV.PO sería si faltara la política de gestión de parches."
    },

    // --- BLOQUE: S7 — APLICACIONES Y DATOS (PR.DS) ---
    {
      id: "mq-ds-1",
      categoryTarget: "PR.DS",
      session: "S7",
      source: "Caso creado para esta guía (verificar con diapositivas)",
      scenario: "Un desarrollador sénior subió al repositorio público de GitHub un archivo de configuración que contenía credenciales de acceso a la base de datos de producción y claves de API de servicios de pago. El archivo estuvo expuesto durante 72 horas antes de ser detectado.",
      options: ["PR.DS", "PR.PS", "GV.PO", "ID.RA"],
      correct: "PR.DS",
      feedback: "PR.DS (Seguridad de Datos) cubre la protección de datos sensibles, incluyendo secretos y credenciales: cifrado, control de acceso a datos y gestión de secretos. Exponer credenciales y API keys en un repositorio público es una falla directa de PR.DS (específicamente de gestión de secretos y protección de datos en tránsito/reposo). PR.PS sería si el problema fuera la configuración insegura del entorno de desarrollo; GV.PO sería si faltara la política de desarrollo seguro; ID.RA sería si nunca se evaluara el riesgo de exposición de credenciales."
    },
    {
      id: "mq-ds-2",
      categoryTarget: "PR.DS",
      session: "S7",
      source: "Caso creado para esta guía (verificar con diapositivas)",
      scenario: "Un banco transfiere diariamente archivos de conciliación con datos de 80,000 clientes entre su datacenter y un proveedor de procesamiento mediante FTP sin cifrado. Adicionalmente, las copias de seguridad se almacenan en el mismo servidor de producción y nunca se ha verificado su integridad ni restauración.",
      options: ["PR.DS", "GV.SC", "GV.OV", "DE.CM"],
      correct: "PR.DS",
      feedback: "PR.DS (Seguridad de Datos) requiere cifrado en tránsito (FTP sin cifrado viola esto), copias de seguridad correctamente aisladas e íntegras (regla 3-2-1), y verificación periódica de restauración. GV.SC sería la categoría adicional por la relación con el proveedor externo, pero la falla técnica raíz — datos en tránsito sin cifrar y backups sin verificar — es PR.DS. GV.OV sería si la política de cifrado existiera pero nadie auditara su cumplimiento; DE.CM sería si el problema fuera la falta de detección de transferencias anómalas."
    }
  ]
};
