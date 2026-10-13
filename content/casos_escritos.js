// Módulo: Entrenador de Casos Escritos (Estructura idéntica a la Parte B del Examen Parcial)
// Diseñado para entrenar la formulación analítica escrita con rúbricas de checklist y pares "floja vs. completa".

window.CASOS_ESCRITOS_DATA = {
  title: "Entrenador de Casos Escritos (Parte B del Examen Parcial)",
  subtitle: "Entrena la redacción formal de las 6 preguntas típicas del caso práctico con rúbrica de autoevaluación estricta.",
  
  cases: [
    {
      id: "caso-sabiolatam",
      name: "Caso 1: SabioLatam (Plataforma EdTech y Certificaciones Oficiales)",
      context: `SabioLatam es una plataforma de educación online que emite diplomados y certificaciones oficiales en convenio con ministerios de educación latinoamericanos. Maneja registros académicos completos de 80,000 estudiantes (nombres, DNI, notas y estado de graduación). Además, para rendir evaluaciones, los alumnos deben activar su cámara web ante el software de supervisión de terceros 'ExamWatch', el cual almacena grabaciones en video y patrones biométricos faciales.

Durante una investigación de seguridad interna se constataron los siguientes hechos:
1. El líder de seguridad (CISO) renunció hace dos meses y medio; la gerencia general no nombró a ningún profesional interino.
2. La aplicación móvil de los estudiantes contenía una API Key embebida (hardcodeada) en el código fuente que permitía consultar cualquier registro académico sin autenticación.
3. Un investigador de seguridad externo notificó a la empresa sobre la API key expuesta. El CPO (Chief Product Officer / Gerente Comercial) decidió unilateralmente negociar con el investigador y silenciar el hallazgo sin informar a Legal ni al Directorio.
4. El proveedor 'ExamWatch' mantiene accesos directos a la infraestructura de SabioLatam desde hace 18 meses, periodo durante el cual nadie auditó ni revisó sus privilegios ni sus políticas de almacenamiento de biometría.`,
      
      questions: [
        {
          num: 1,
          title: "Pregunta 1: Tabla de las 6 Categorías de GOVERN (Valor: 3 puntos)",
          prompt: "Completa la tabla evaluando las 6 categorías de Govern del NIST CSF 2.0 (GV.OC, GV.RM, GV.RR, GV.PO, GV.OV, GV.SC). Para cada una, indica si FALLÓ en este caso y sustenta con la EVIDENCIA ESPECÍFICA del texto.",
          modelSolution: `Tabla de Análisis de Govern:
1. GV.OC (Contexto Organizacional): SÍ FALLÓ. SabioLatam opera bajo convenios oficiales con ministerios de educación, lo que impone un estándar legal riguroso; la pérdida de integridad o confidencialidad compromete directamente la validez jurídica de las certificaciones otorgadas.
2. GV.RM (Gestión de Riesgos): SÍ FALLÓ. La existencia de la API key expuesta fue notificada formalmente por un investigador, pero no existía un proceso formal que obligara a evaluar el riesgo, registrarlo en el apetito corporativo ni asignarle un responsable formal de mitigación.
3. GV.RR (Roles y Autoridad): SÍ FALLÓ. Existen 2 evidencias directas: a) Tras la renuncia del CISO no se nombró interino por más de 2 meses, dejando un vacío formal de mando; b) El CPO negoció unilateralmente con el investigador sin facultades delegadas para ello.
4. GV.PO (Políticas): SÍ FALLÓ. Inexistencia de políticas aprobadas sobre desarrollo seguro (no incrustar llaves maestras en código cliente) y sobre divulgación responsable de vulnerabilidades.
5. GV.OV (Supervisión): SÍ FALLÓ. La Junta Directiva carece de reportes periódicos de postura de seguridad y nunca auditó el estado de las credenciales de la app ni las acciones unilaterales del CPO.
6. GV.SC (Cadena de Suministro): SÍ FALLÓ. El proveedor 'ExamWatch' retiene accesos a datos biométricos y grabaciones desde hace 18 meses sin que se hayan revisado ni auditado sus controles de seguridad ni sus privilegios en todo ese periodo.`,
          rubricChecklist: [
            "Evaluó las 6 categorías completas (OC, RM, RR, PO, OV, SC).",
            "Marcó que TODAS fallaron en este caso (incluyendo GV.SC).",
            "GV.OC está sustentado con el impacto legal/regulatorio en las certificaciones ministeriales.",
            "GV.RM se sustenta en la falta de un proceso formal para tratar el hallazgo reportado.",
            "GV.RR incluye al menos una de las dos evidencias (vacío de CISO por 2 meses o negociación unilateral del CPO).",
            "GV.SC cita explícitamente al proveedor ExamWatch y los 18 meses sin revisión de accesos."
          ],
          weakVsStrong: {
            weak: "Respuesta floja: 'GV.SC no falló porque el problema fue de SabioLatam y no de ExamWatch' (Error: 0 puntos en esa fila; la falta de revisión al proveedor ES falla de GV.SC). 'GV.RM falló porque no tenían ciberseguridad' (Error: muy genérico, no cita el proceso de hallazgos).",
            strong: "Respuesta completa: Cita cada categoría con evidencia textual exacta del caso y explica por qué el hecho incumple el principio de gobierno respectivo (Puntaje: 3.0 / 3.0)."
          }
        },
        {
          num: 2,
          title: "Pregunta 2: Matriz RACI para Decisión Crítica (Valor: 1 punto)",
          prompt: "Construye la matriz RACI ideal que debió existir para la decisión de: 'Evaluar y reportar formalmente el hallazgo reportado por el investigador externo'.",
          modelSolution: `Matriz RACI para la Decisión:
Actividad: "Evaluar y reportar el hallazgo del investigador externo"
• CEO / Junta Directiva: A (Accountable) — Asume la responsabilidad patrimonial y legal final.
• CISO / Oficial de Seguridad: R (Responsible) — Ejecuta la evaluación técnica del hallazgo y propone el plan.
• Asesoría Legal: C (Consulted) — Dictamina sobre implicancias contractuales y deberes de notificación regulatoria.
• CPO / Gerente Comercial: I (Informed) — Recibe la notificación de la decisión para prever impactos de producto.
• Equipo de Desarrollo: I (Informed) — Recibe las directrices para aplicar el parche en la app.`,
          rubricChecklist: [
            "Existe exactamente un solo 'A' en la fila (CEO o Junta Directiva).",
            "El CISO o líder técnico está asignado como 'R' (ejecuta la evaluación técnica).",
            "Asesoría Legal está asignada como 'C' (consultada por temas normativos).",
            "El Gerente Comercial (CPO) NO es 'A' (debe ser Consultado o Informado).",
            "Se cumplen las reglas formales de la matriz RACI."
          ],
          weakVsStrong: {
            weak: "Poner al CPO o al CISO como 'A'. Esto diluye la rendición de cuentas corporativa o asigna responsabilidad fiduciaria a un gerente no facultado.",
            strong: "Asignar al CEO como único 'A', al CISO como 'R', a Legal como 'C' y a las áreas de producto como 'I' (Puntaje: 1.0 / 1.0)."
          }
        },
        {
          num: 3,
          title: "Pregunta 3: Identificación de 2 Activos Críticos y Triada CID (Valor: 3 puntos)",
          prompt: "Identifica los 2 activos más críticos involucrados en el caso. Para cada uno: descríbelo, indica su Dueño idóneo (Asset Owner) y califica su Confidencialidad, Integridad y Disponibilidad (CID) justificando cada nivel.",
          modelSolution: `Activo 1: Registro Académico Completo del Estudiante
• Descripción: Base de datos con información personal (nombre, DNI), historial de notas y estado de acreditación de 80,000 alumnos.
• Dueño del Activo (Asset Owner): Dirección Académica y de Certificaciones (NO es TI ni Legal). Es el área de negocio responsable de avalar los grados y que opera con la información.
• Calificación CID Justificada:
  - Confidencialidad: ALTA. Contiene datos personales y DNI protegidos por ley de protección de datos; su filtración acarrea sanciones directas.
  - Integridad: ALTA. La alteración maliciosa de una nota o estado destruye la fe pública de los títulos emitidos bajo convenio ministerial.
  - Disponibilidad: ALTA. Los alumnos y la plataforma requieren consultar constantemente el avance para avanzar en los cursos.

Activo 2: Grabaciones y Datos Biométricos de los Alumnos (en ExamWatch)
• Descripción: Videos de supervisión de exámenes y patrones de reconocimiento facial almacenados por el tercero ExamWatch.
• Dueño del Activo (Asset Owner): Área de Validación de Identidad y Admisión (el área que requiere validar que el alumno sea quien dice ser).
• Calificación CID Justificada:
  - Confidencialidad: ALTA. Los datos biométricos faciales son datos sensibles de categoría especial e irreemplazables ante un robo de identidad.
  - Integridad: ALTA. La manipulación de los patrones biométricos permitiría la suplantación de identidad en los exámenes de grado.
  - Disponibilidad: MEDIA. La verificación no detiene la navegación regular del campus; su indisponibilidad temporal no destruye el negocio inmediatamente.`,
          rubricChecklist: [
            "Identificó 2 activos pertinentes del texto (Registros Académicos y Biometría/Grabaciones).",
            "El Dueño del Activo pertenece al negocio (Dirección Académica / Validación de Identidad), NUNCA Legal ni TI.",
            "Calificó las tres dimensiones (C, I, D) para cada activo.",
            "Justificó cada nivel (Alto/Medio/Bajo) vinculándolo al impacto de negocio o daño a personas.",
            "Distinguió la criticidad superior de la biometría (Confidencialidad Alta por ser dato sensible)."
          ],
          weakVsStrong: {
            weak: "Poner como Dueño a 'Área de TI' o 'Área Legal'. (Comentario del docente: Legal conoce las leyes pero no procesa el activo; TI solo es custodio. Penalización inmediata de puntaje).",
            strong: "Asignar como Dueño al área de negocio interesada en el proceso y sustentar el CID con argumentos de negocio (Puntaje: 3.0 / 3.0)."
          }
        },
        {
          num: 4,
          title: "Pregunta 4: Vulnerabilidades, Amenazas y Redacción Formal de Riesgo (Valor: 4 puntos)",
          prompt: "Para cada uno de los 2 activos identificados en la pregunta anterior, señala 2 vulnerabilidades y 2 amenazas a las que está expuesto, y redacta 2 riesgos resultantes por activo (4 riesgos en total) bajo la fórmula oficial.",
          modelSolution: `Activo 1: Registro Académico Completo
• Vulnerabilidad 1: API key con privilegios de lectura embebida en el código cliente de la app móvil.
• Amenaza 1: Ciberdelincuente externo / atacante remoto.
• Riesgo 1: Multas regulatorias severas por violación de la Ley de Protección de Datos y pérdida de convenios con ministerios de educación (Consecuencia) debido a que un ciberdelincuente externo extrae registros de 80,000 estudiantes aprovechando la API key expuesta en el código de la app (Amenaza + Vulnerabilidad).

• Vulnerabilidad 2: Inexistencia de controles de acceso y autenticación en los endpoints de consulta de notas.
• Amenaza 2: Usuario malicioso o estudiante con conocimientos de programación.
• Riesgo 2: Pérdida total de credibilidad institucional y nulidad de certificaciones oficiales (Consecuencia) debido a que un estudiante malicioso altera calificaciones de cursos aprovechando la ausencia de autenticación y validación de roles en la API (Amenaza + Vulnerabilidad).

Activo 2: Grabaciones y Datos Biométricos en ExamWatch
• Vulnerabilidad 1: Ausencia de auditorías de seguridad y retención indefinida de accesos concedidos al proveedor durante 18 meses.
• Amenaza 1: Empleado desleal del proveedor externo (insider de ExamWatch).
• Riesgo 3: Demandas judiciales masivas por daño moral e indemnizaciones económicas (Consecuencia) debido a que un empleado desleal del proveedor comercializa datos biométricos faciales aprovechando la falta de supervisión y monitoreo de accesos por parte de SabioLatam (Amenaza + Vulnerabilidad).

• Vulnerabilidad 2: Almacenamiento de patrones biométricos sin cifrado robusto en reposo.
• Amenaza 2: Atacante que vulnera los servidores del tercero ExamWatch.
• Riesgo 4: Suplantación masiva de identidad en plataformas externas (Consecuencia) debido a que atacantes externos filtran plantillas biométricas aprovechando la carencia de cifrado en las bases de datos del proveedor (Amenaza + Vulnerabilidad).`,
          rubricChecklist: [
            "Identificó 2 vulnerabilidades y 2 amenazas coherentes para cada activo.",
            "Redactó los 4 riesgos completos bajo la fórmula: [Consecuencia] + debido a que + [Amenaza aprovecha Vulnerabilidad].",
            "Cada riesgo contiene un impacto/daño explícito en el negocio (multas, pérdida de convenios, demandas).",
            "Distinguió la amenaza (agente hostil externo/interno) de la vulnerabilidad (debilidad propia del sistema).",
            "Evitó redactar riesgos vacíos como 'Robo de datos' o 'Fuga de información'."
          ],
          weakVsStrong: {
            weak: "Escribir: 'Riesgo 1: Filtración de datos de estudiantes'. (Comentario del docente: El riesgo no es solo el evento; debe incluir el daño/consecuencia y cómo la amenaza explota la falla. Penalización del 50%).",
            strong: "Redacción formal estructurada con consecuencia corporativa + evento detonante (Puntaje: 4.0 / 4.0)."
          }
        },
        {
          num: 5,
          title: "Pregunta 5: Medición Coherente del Riesgo (Probabilidad × Impacto) (Valor: 2 puntos)",
          prompt: "Para los riesgos redactados, asigna los niveles de Probabilidad e Impacto (Baja, Media, Alta) justificando cada decisión con coherencia analítica estricta.",
          modelSolution: `Ponderación Coherente de Riesgos:

Riesgo 1 (Exfiltración vía API key embebida):
• Probabilidad: ALTA. Justificación: La app está instalada en miles de teléfonos y la llave se encuentra en texto claro; no se requiere autenticación ni habilidades avanzadas para extraerla. (Calificarla como Media sería un error de coherencia técnica).
• Impacto: ALTO. Justificación: Compromete los datos personales de 80,000 personas, provocando multas máximas del regulador de privacidad y la revocación de convenios ministeriales.

Riesgo 2 (Alteración de calificaciones en API abierta):
• Probabilidad: ALTA. Justificación: Al carecer de autenticación para consultar y modificar datos, cualquier usuario que intercepte el tráfico de red puede enviar solicitudes arbitrarias.
• Impacto: ALTO. Justificación: Afecta el núcleo del negocio educativo; la emisión de notas falsas destruye la acreditación académica de la plataforma.

Riesgo 3 (Exfiltración de biometría en ExamWatch):
• Probabilidad: MEDIA. Justificación: Requiere que la brecha ocurra del lado de la infraestructura del proveedor o que un colaborador acceda a credenciales internas de su red.
• Impacto: ALTO. Justificación: Los datos biométricos no pueden cambiarse como una contraseña; su pérdida causa daño irreparable a los titulares y sanciones severas.`,
          rubricChecklist: [
            "Mantuvo coherencia: API expuesta y sin autenticación = Probabilidad ALTA (no Media).",
            "Justificó el Impacto considerando tanto el daño a las personas como la sanción regulatoria de la empresa.",
            "Diferenció la probabilidad según la exposición del vector de ataque (frente a internet vs acceso interno de terceros).",
            "Argumentó con hechos del caso y no con suposiciones abstractas."
          ],
          weakVsStrong: {
            weak: "Poner 'Probabilidad Media' a la API key de la app diciendo que 'los alumnos no saben hackear'. (Comentario del docente: Si no hay autenticación, cualquiera puede usarla, la probabilidad es Alta por definición).",
            strong: "Asignar Probabilidad Alta sustentando que el vector carece de cualquier barrera de autenticación (Puntaje: 2.0 / 2.0)."
          }
        },
        {
          num: 6,
          title: "Pregunta 6: Priorización de Acción de Gobierno (Valor: 2 puntos)",
          prompt: "Si tuvieras que priorizar una sola acción de gobierno (no técnica) para resolver la causa raíz de este incidente en SabioLatam, ¿cuál sería? Sustenta con la función y categoría de NIST CSF 2.0 que aplique y por qué es la prioridad.",
          modelSolution: `Acción de Gobierno Prioritaria:
• Función y Categoría NIST CSF 2.0: GOVERN &middot; GV.RR (Roles, Responsabilidades y Autoridad) o GV.PO (Políticas).
• Propuesta de Acción: Nombramiento inmediato de un Director de Seguridad de la Información (CISO) con facultades formales delegadas y aprobación por el Directorio de un Procedimiento de Gestión y Escalamiento de Incidentes con matriz RACI vinculante.
• Justificación de Prioridad: La causa raíz del colapso en SabioLatam no fue la falta de un software de seguridad, sino el desgobierno: un puesto clave vacante durante más de 2 meses permitió que el Gerente Comercial actuara de espaldas a la ley, negociando unilateralmente con un investigador y ocultando el riesgo. Establecer la autoridad formal (GV.RR) garantiza que existan responsables obligados a responder ante el Directorio y aplicar las políticas de desarrollo seguro y control de terceros.`,
          rubricChecklist: [
            "Identificó la función GOVERN de NIST CSF 2.0.",
            "Citó una categoría formal válida (GV.RR o GV.PO).",
            "La acción propuesta es de GOBIERNO (no una solución técnica como 'instalar un WAF' o 'cambiar la API key').",
            "Justificó por qué ataca la causa raíz (vacío de mando, decisiones unilaterales, falta de reporte a la Junta)."
          ],
          weakVsStrong: {
            weak: "Proponer: 'Instalar un firewall de aplicaciones y eliminar la API key de la app'. (Error grave: la pregunta exige una acción de GOBIERNO no técnica; una solución técnica obtiene 0 puntos).",
            strong: "Proponer una acción organizativa (nombramiento formal de CISO y protocolo de escalamiento con RACI bajo GV.RR) (Puntaje: 2.0 / 2.0)."
          }
        }
      ]
    },

    // CASO 2: MEDISALUD DIGITAL (SALUD / FINTECH / PRIVACIDAD)
    {
      id: "caso-medisalud",
      name: "Caso 2: MediSalud Digital (Telemedicina y Receta Electrónica)",
      context: `MediSalud Digital es una clínica de telemedicina que atiende a 120,000 pacientes y emite recetas electrónicas vinculadas a farmacias asociadas. Debido a un rápido crecimiento en pandemia:
1. La Dirección Médica subcontrató a una agencia de software externa ('CloudDev') para integrar un módulo de videollamadas y recetas médicas. CloudDev recibió credenciales de administrador en la nube de AWS con privilegios permanentes que nunca han sido auditados en 12 meses.
2. Tras la desvinculación del Jefe de Seguridad de la Información en noviembre, la clínica decidió no contratar un reemplazo y asignó la supervisión de ciberseguridad al Administrador de Redes de TI sin modificar su perfil de puesto ni otorgarle facultades ejecutivas.
3. El Administrador de Redes descubrió que las grabaciones de las consultas médicas se guardaban en un servidor sin contraseña ni cifrado, pero no informó a la Gerencia General por temor a que le cancelen el presupuesto de TI.
4. Hace 5 días, un empleado de farmacia denunció que encontró recetas médicas de pacientes oncológicos con nombres y diagnósticos expuestas abiertamente en internet.`,
      
      questions: [
        {
          num: 1,
          title: "Pregunta 1: Tabla de las 6 Categorías de GOVERN (Valor: 3 puntos)",
          prompt: "Evalúa las 6 categorías de Govern de NIST CSF 2.0 para MediSalud Digital. Indica para cada una si falló y la evidencia exacta del texto.",
          modelSolution: `Tabla de Análisis:
• GV.OC (Contexto Organizacional): SÍ FALLÓ. MediSalud procesa historias clínicas y recetas sujetas a estricto secreto médico y leyes de datos de salud. Ignorar estas exigencias expone a la clínica a demandas civiles y pérdida de su autorización sanitaria.
• GV.RM (Gestión de Riesgos): SÍ FALLÓ. El Administrador de Redes detectó el servidor de grabaciones desprotegido pero el riesgo no se registró formalmente ni se presentó a la alta dirección por falta de un proceso formal de tratamiento de riesgos.
• GV.RR (Roles y Autoridad): SÍ FALLÓ. La clínica operó sin liderazgo de seguridad al cesar al CISO y delegar tareas al Administrador de Redes sin facultades ejecutivas ni autoridad delegada formal.
• GV.PO (Políticas): SÍ FALLÓ. Ausencia de políticas escritas de cifrado de grabaciones médicas y de asignación de privilegios en la nube.
• GV.OV (Supervisión): SÍ FALLÓ. La Junta Directiva nunca solicitó auditorías sobre los accesos administrativos de CloudDev ni sobre la seguridad de las recetas electrónicas.
• GV.SC (Cadena de Suministro): SÍ FALLÓ. El contratista CloudDev mantuvo credenciales de administrador con privilegios permanentes en AWS durante 12 meses sin revisión ni auditoría.`,
          rubricChecklist: [
            "Evaluó las 6 categorías completas.",
            "Sustentó GV.SC con el contratista CloudDev y sus 12 meses con privilegios permanentes.",
            "Sustentó GV.RR con el cese del CISO y la falta de facultades del Administrador de Redes.",
            "Sustentó GV.OC con la reserva legal del secreto médico y la autorización sanitaria."
          ],
          weakVsStrong: {
            weak: "Sustentar con generalidades como 'falló porque todo estaba mal configurado'.",
            strong: "Identificar los hechos específicos del texto y correlacionarlos con el estándar NIST CSF 2.0."
          }
        },
        {
          num: 2,
          title: "Pregunta 2: Matriz RACI para Decisión Crítica (Valor: 1 punto)",
          prompt: "Construye la matriz RACI para la decisión de: 'Contratar a un proveedor de desarrollo y otorgarle privilegios de acceso a la nube corporativa'.",
          modelSolution: `Matriz RACI:
Actividad: "Aprobar contrato y privilegios de acceso a la nube para un tercero"
• Gerente General (CEO): A (Accountable) — Aprueba la contratación y asume el riesgo patrimonial.
• CISO / Oficial de Seguridad: R (Responsible) — Diseña los requerimientos de seguridad y define los accesos mínimos.
• Asesoría Legal: C (Consulted) — Redacta las cláusulas de confidencialidad y derecho a auditoría técnica.
• Proveedor (CloudDev): I (Informed) — Recibe los términos aprobados y las credenciales restringidas temporales.`,
          rubricChecklist: [
            "Existe exactamente un 'A' (CEO).",
            "El área de seguridad es 'R'.",
            "Legal es 'C'.",
            "El proveedor es 'I'."
          ],
          weakVsStrong: {
            weak: "Asignar al Administrador de Redes como 'A'.",
            strong: "Asignar al CEO como 'A' y a Seguridad como 'R'."
          }
        },
        {
          num: 3,
          title: "Pregunta 3: Activos Críticos y Triada CID (Valor: 3 puntos)",
          prompt: "Identifica 2 activos críticos de MediSalud, define su Dueño formal y sustenta la calificación CID de cada uno.",
          modelSolution: `Activo 1: Expediente Clínico y Grabaciones de Telemedicina
• Dueño del Activo: Dirección Médica y Jefatura de Registros de Salud (área de negocio responsable del acto médico).
• CID Justificado:
  - C: Alta (datos de salud especialmente protegidos por ley de privacidad médica).
  - I: Alta (diagnósticos médicos erróneos o manipulados pueden costar la vida al paciente).
  - D: Media-Alta (se requieren para el seguimiento médico del paciente).

Activo 2: Sistema de Emisión de Recetas Electrónicas
• Dueño del Activo: Gerencia de Operaciones Clínicas y Farmacia.
• CID Justificado:
  - C: Alta (vincula la identidad del paciente con el medicamento prescrito).
  - I: Alta (la alteración de dosis o medicamentos genera intoxicación o fraude farmacéutico).
  - D: Alta (las farmacias asociadas no pueden despachar medicamentos si el sistema está fuera de servicio).`,
          rubricChecklist: [
            "Dueño del Activo pertenece al negocio médico (Dirección Médica / Operaciones Clínicas), nunca TI ni Legal.",
            "Confidencialidad Alta en datos de salud debidamente sustentada.",
            "Integridad Alta por riesgo vital en prescripción y diagnóstico."
          ],
          weakVsStrong: {
            weak: "Poner a TI como dueño de las recetas electrónicas.",
            strong: "Identificar que el dueño es la Jefatura Médica o de Farmacia."
          }
        },
        {
          num: 4,
          title: "Pregunta 4: Riesgos Redactados Formalmente (Valor: 4 puntos)",
          prompt: "Redacta 2 riesgos formales para el activo 'Expediente Clínico y Grabaciones' bajo la fórmula estricta de evaluación.",
          modelSolution: `Riesgos Formales para el Activo:
• Riesgo 1: Cancelación de la licencia sanitaria de funcionamiento y demandas millonarias por violación del secreto médico (Consecuencia) debido a que un ciberdelincuente externo descarga grabaciones de consultas aprovechando el servidor expuesto sin contraseña ni cifrado (Amenaza + Vulnerabilidad).
• Riesgo 2: Extorsión financiera y pérdida irreversible de reputación corporativa (Consecuencia) debido a que atacantes informáticos extraen historiales médicos aprovechando las credenciales de administrador permanentes no auditadas en poder del tercero CloudDev (Amenaza + Vulnerabilidad).`,
          rubricChecklist: [
            "Fórmula formal estricta: [Consecuencia] + debido a que + [Amenaza explota Vulnerabilidad].",
            "Consecuencia corporativa explícita (sanción sanitaria, demandas, extorsión).",
            "Identificación clara de la amenaza y la vulnerabilidad."
          ],
          weakVsStrong: {
            weak: "Escribir: 'Riesgo de que alguien robe las grabaciones de los doctores'.",
            strong: "Redacción formal con consecuencia de negocio + vector de explotación."
          }
        },
        {
          num: 5,
          title: "Pregunta 5: Coherencia de Probabilidad e Impacto (Valor: 2 puntos)",
          prompt: "Pondera y justifica la Probabilidad y el Impacto del Riesgo 1 (grabaciones en servidor sin contraseña).",
          modelSolution: `Ponderación:
• Probabilidad: ALTA. Justificación: El servidor se encuentra conectado a internet sin ningún mecanismo de autenticación ni contraseña. Cualquier rastreador de puertos (ej. Shodan) puede descubrirlo e indexarlo sin requerir credenciales.
• Impacto: ALTO. Justificación: Involucra datos de salud íntimos de miles de pacientes, lo que amerita clausura temporal por la autoridad sanitaria y demandas judiciales colectivas.`,
          rubricChecklist: [
            "Probabilidad catalogada como ALTA (servidor sin contraseña en internet).",
            "Impacto catalogado como ALTO por la sensibilidad legal de los datos clínicos.",
            "Justificación coherente sin contradicciones."
          ],
          weakVsStrong: {
            weak: "Marcar Probabilidad Media.",
            strong: "Marcar Probabilidad Alta con justificación técnica de exposición."
          }
        },
        {
          num: 6,
          title: "Pregunta 6: Acción de Gobierno Prioritaria (Valor: 2 puntos)",
          prompt: "Plantea una acción de gobierno no técnica bajo NIST CSF 2.0 que ataque la causa raíz de este caso.",
          modelSolution: `Acción de Gobierno:
• Función y Categoría: GOVERN &middot; GV.RR (Roles, Responsabilidades y Autoridad).
• Acción Prioritaria: Creación formal de la Gerencia de Seguridad de la Información, nombramiento de un CISO con reporte directo a la Junta Directiva y emisión de una directiva obligatoria de revisión de accesos de proveedores aprobada por el Directorio.
• Justificación: La raíz del desastre fue que el Administrador de Redes no tenía autoridad ejecutiva para reportar riesgos al Directorio por temor a represalias de presupuesto, mientras los contratistas operaban sin control. Restablecer la cadena de mando y reporte independiente garantiza que los riesgos detectados se eleven sin sesgos departamentales.`,
          rubricChecklist: [
            "Función GOVERN y categoría válida (GV.RR o GV.PO).",
            "Solución organizacional / no técnica.",
            "Ataque a la causa raíz demostrable."
          ],
          weakVsStrong: {
            weak: "Proponer 'poner contraseña al servidor Apache'.",
            strong: "Proponer nombrar un CISO y formalizar la línea de reporte y auditoría de terceros."
          }
        }
      ]
    }
  ]
};
