// Contenido Pedagógico Oficial - Sesión 4: Práctica Calificada 1 & Hito del Proyecto Integrador
// Basado directamente en Sílabo CB05 (Semana 4, UPC)

window.SESION_4_DATA = {
  id: "s4",
  number: 4,
  title: "Sesión 4: Práctica Calificada 1 & Criterios del Proyecto Integrador",
  shortTitle: "S4: PC1 & Proyecto",
  description: "En el diseño curricular de CB05, la Semana 4 no introduce nuevos conceptos teóricos: es el hito de evaluación calificada (PC1 sobre las Sesiones 1 a 3) y la sustentación formal de la organización real elegida para el Proyecto Integrador.",
  
  isPracticalSession: true,

  outcomes: [
    "Validar el dominio de las funciones Govern (S1 y S2) e Identify (S3) bajo el formato oficial de evaluación del curso.",
    "Aplicar con rigor los 6 criterios obligatorios para la selección de la organización real del Proyecto Integrador.",
    "Formular el sustento ejecutivo del ciberataque documentado (ocurrido entre 2019 y 2025) elegido para el trabajo final.",
    "Demostrar repercusiones en al menos dos de las cinco dimensiones de impacto: salud, economía, sociedad, ambiente o cultura."
  ],

  // 6 CRITERIOS OBLIGATORIOS DE ELECCIÓN DE EMPRESA (SÍLABO CB05)
  projectCriteria: [
    {
      title: "1. Organización REAL",
      desc: "No se admiten empresas ficticias, simuladas ni escenarios hipotéticos inventados. Debe ser una compañía formalmente constituida."
    },
    {
      title: "2. Incidente Documentado (2019–2025)",
      desc: "El ciberataque o brecha de seguridad debe haber ocurrido y estar acreditado públicamente en fuentes formales entre los años 2019 y 2025."
    },
    {
      title: "3. Información Pública Confiable",
      desc: "El caso debe sustentarse en reportes oficiales de agencias regulatorias (SEC, CISA, SBS), comunicados corporativos formales, noticias de prensa reconocida o análisis técnicos forenses confiables."
    },
    {
      title: "4. Complejidad Multidominio",
      desc: "La empresa debe poseer infraestructura y procesos de suficiente envergadura para poder evaluar los 6 dominios de Confianza Cero (Identidades, Endpoints, Aplicaciones, Datos, Infraestructura y Redes)."
    },
    {
      title: "5. Al menos 2 Factores de Impacto",
      desc: "El incidente debe permitir evaluar repercusiones en al menos dos dimensiones: salud (servicios asistenciales), economía (pérdidas financieras/multas), sociedad (datos personales ciudadanos), ambiente o cultura."
    },
    {
      title: "6. Exclusividad por Equipo (No Repetida)",
      desc: "La organización elegida no debe haber sido seleccionada previamente por otro equipo de trabajo del salón en la sesión de registro."
    }
  ],

  // DIMENSIONES DE IMPACTO
  impactDimensions: [
    { name: "Impacto Económico", desc: "Pérdidas operativas, costos de remediación forense, demandas indemnizatorias o multas regulatorias impuestas por autoridades de protección de datos o bancarias." },
    { name: "Impacto en Salud", desc: "Paralización de historias clínicas digitales, desvío de ambulancias, suspensión de cirugías o alteración de tratamientos médicos a pacientes." },
    { name: "Impacto Social", desc: "Filtración masiva de datos personales sensibles (PII), pérdida de confianza ciudadana o exposición de credenciales ciudadanas." },
    { name: "Impacto Ambiental", desc: "Afectación de sistemas SCADA o de control industrial en distribución de agua, energía eléctrica o tratamiento de residuos." },
    { name: "Impacto Cultural / Reputacional", desc: "Deterioro severo del prestigio institucional, pérdida de clientes o cobertura mediática internacional adversa." }
  ],

  // ENLACES A MÓDULOS DE PRÁCTICA
  practiceLinks: [
    {
      title: "🔍 Detective de Categorías (Govern)",
      action: "navigateTo('view-detective')",
      desc: "Entrena el descarte quirúrgico de las 6 categorías de gobernanza de NIST CSF 2.0 (GV.OC, GV.RM, GV.RR, GV.PO, GV.OV, GV.SC) en 12 escenarios de examen."
    },
    {
      title: "📊 Matriz RACI Oficial (GV.RR)",
      action: "navigateTo('view-raci')",
      desc: "Practica la regla de oro de un solo Accountable ('A') y la asignación precisa de roles (R, A, C, I) en decisiones corporativas críticas."
    },
    {
      title: "📖 Marcos de Referencia (NIST CSF 2.0)",
      action: "navigateTo('view-reference')",
      desc: "Repasa las preguntas clave de decisión, los distractores de códigos inventados y los Tiers de implementación evaluados en la PC1."
    }
  ]
};
