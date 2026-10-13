// Aplicación Front-End Senior - Procesos de Ciberseguridad (CB05)
// Sistema Completo: Renderizador Modular de Sesiones 1-7, Diagnóstico, Mazo Leitner, Planificador, Detective y Simulacro

(function() {
  'use strict';

  // ALMACENAMIENTO SEGURO (FALLBACK TRANSPARENTE PARA FILE:// Y POLÍTICAS DE ORIGEN OPACO)
  const memoryStorage = {};
  const safeStorage = {
    getItem: function(key) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(key);
        }
      } catch(e) {}
      return memoryStorage[key] || null;
    },
    setItem: function(key, val) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, val);
          return;
        }
      } catch(e) {}
      memoryStorage[key] = String(val);
    },
    removeItem: function(key) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key);
          return;
        }
      } catch(e) {}
      delete memoryStorage[key];
    }
  };

  // ALMACENAMIENTO SEGURO: EXCLUSIVAMENTE PARA PREFERENCIA DE TEMA (CLARO/OSCURO)
  const THEME_KEY = 'CB05_THEME_PREFERENCE';
  let appState = {
    theme: 'dark',
    currentSessionId: 's1'
  };

  function loadState() {
    try {
      const savedTheme = safeStorage.getItem(THEME_KEY);
      if (savedTheme) {
        appState.theme = savedTheme;
      }
      // Limpieza exhaustiva de claves obsoletas de versiones anteriores
      safeStorage.removeItem('CB05_STUDY_STATE_V2');
      safeStorage.removeItem('CB05_LEITNER_BOXES');
      safeStorage.removeItem('CB05_DIAG_SCORES');
      safeStorage.removeItem('CB05_MISTAKES');
      safeStorage.removeItem('CB05_STUDY_STATE');
    } catch(e) {
      console.warn("Almacenamiento no disponible:", e);
    }
  }

  function saveState() {
    try {
      safeStorage.setItem(THEME_KEY, appState.theme);
    } catch(e) {
      console.warn("No se pudo guardar preferencia de tema:", e);
    }
  }

  // GESTIÓN DE TEMA
  function initTheme() {
    const isDark = appState.theme === 'dark' || (!appState.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    applyTheme(isDark);

    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const currentlyDark = document.documentElement.classList.contains('dark');
        applyTheme(!currentlyDark);
        appState.theme = !currentlyDark ? 'dark' : 'light';
        saveState();
      });
    }
  }

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      const label = document.getElementById('themeLabel');
      if (label) label.textContent = 'Modo Claro';
    } else {
      document.documentElement.classList.remove('dark');
      const label = document.getElementById('themeLabel');
      if (label) label.textContent = 'Modo Oscuro';
    }
  }

  // NAVEGACIÓN Y ENRUTADOR DE VISTAS (4 ENTRADAS: SESIONES, DETECTIVE, RACI, MARCOS)
  window.navigateTo = function(viewId, payload) {
    const views = document.querySelectorAll('.app-view');
    views.forEach(v => v.classList.add('hidden'));

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(b => b.classList.remove('bg-executive-200', 'dark:bg-executive-800', 'text-executive-900', 'dark:text-white', 'font-bold'));

    const activeBtn = document.getElementById(`nav-${viewId}`);
    if (activeBtn) {
      activeBtn.classList.add('bg-executive-200', 'dark:bg-executive-800', 'text-executive-900', 'dark:text-white', 'font-bold');
    }

    const target = document.getElementById(viewId);
    if (target) {
      target.classList.remove('hidden');
      try {
        if (typeof window.scrollTo === 'function') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (e) {}
    }

    // Inicializadores de las 4 vistas activas
    if (viewId === 'view-session') renderSession(payload || appState.currentSessionId || 's1');
    if (viewId === 'view-detective') renderDetective();
    if (viewId === 'view-raci') renderRaciModule();
    if (viewId === 'view-reference') renderReference();
  };

  // CONTROL DE MENÚ MÓVIL
  window.toggleMobileMenu = function() {
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.toggle('hidden');
  };

  window.closeMobileMenu = function() {
    const nav = document.getElementById('mainNav');
    if (nav && window.innerWidth < 640) nav.classList.add('hidden');
  };

  // ==============================================================
  // 1. RENDERIZADOR UNIVERSAL DE SESIONES (S1 A S7)
  // ==============================================================
  const SESSIONS_MAP = {
    s1: () => window.SESION_1_DATA,
    s2: () => window.SESION_2_DATA,
    s3: () => window.SESION_3_DATA,
    s4: () => window.SESION_4_DATA,
    s5: () => window.SESION_5_DATA,
    s6: () => window.SESION_6_DATA,
    s7: () => window.SESION_7_DATA
  };

  // ==============================================================
  // COMPONENTE UNIVERSAL: FICHA DE CONCEPTO (REGLA GLOBAL DE CLARIDAD)
  // ==============================================================
  function renderConceptCard(c) {
    if (!c) return '';
    return `
      <article class="p-6 sm:p-7 rounded-xl bg-white dark:bg-executive-900 border border-executive-200 dark:border-executive-800 shadow-sm space-y-4 text-executive-900 dark:text-executive-100 w-full">
        <div class="border-b border-executive-200 dark:border-executive-800 pb-3 flex flex-wrap justify-between items-baseline gap-2">
          <h4 class="text-lg sm:text-xl font-bold tracking-tight text-executive-900 dark:text-white">${c.nombre}</h4>
          <span class="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-executive-100 dark:bg-executive-800 text-executive-600 dark:text-executive-300 font-bold">${c.categoria || 'Concepto'}</span>
        </div>

        <div class="space-y-1">
          <span class="text-[11px] font-mono uppercase font-bold text-executive-500 dark:text-executive-400 block tracking-wider">¿Qué es?</span>
          <p class="text-[16px] sm:text-[17px] leading-relaxed text-executive-900 dark:text-white font-medium">${c.queEs}</p>
        </div>

        <div class="space-y-1">
          <span class="text-[11px] font-mono uppercase font-bold text-executive-500 dark:text-executive-400 block tracking-wider">¿Qué hace / Para qué sirve?</span>
          <p class="text-[15px] sm:text-[16px] leading-relaxed text-executive-700 dark:text-executive-300">${c.queHace}</p>
        </div>

        <div class="p-4 rounded-lg bg-executive-50/70 dark:bg-executive-950/60 border border-executive-200 dark:border-executive-800 space-y-1">
          <span class="text-[11px] font-mono uppercase font-bold text-executive-500 dark:text-executive-400 block tracking-wider">Cómo se ve en un caso real</span>
          <p class="text-[14px] sm:text-[15px] leading-relaxed text-executive-800 dark:text-executive-200 italic">${c.ejemploCaso}</p>
        </div>

        <div class="p-5 rounded-lg bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-900/60 space-y-2.5">
          <div class="flex items-center gap-2">
            <span class="text-base">⚠️</span>
            <strong class="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 font-mono">Punto Crítico: Se Confunde Con…</strong>
          </div>
          <p class="text-[14px] sm:text-[15px] leading-relaxed text-amber-950 dark:text-amber-100 font-medium">
            ${c.seConfundeCon}
          </p>
          <div class="pt-2 border-t border-amber-200 dark:border-amber-900/50">
            <span class="text-[11px] font-mono uppercase font-bold text-amber-800 dark:text-amber-300 block tracking-wider">La señal o pregunta que decide:</span>
            <p class="text-[14px] sm:text-[15px] leading-relaxed text-amber-950 dark:text-amber-100 font-semibold mt-0.5">
              ${c.comoDistinguirlos}
            </p>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-1">
          <div class="flex items-center gap-2">
            <span class="text-sm">❌</span>
            <span class="text-[11px] font-mono uppercase font-bold text-rose-800 dark:text-rose-300 tracking-wider">Error Típico en el Examen</span>
          </div>
          <p class="text-[13px] sm:text-[14px] leading-relaxed text-rose-950 dark:text-rose-200">
            ${c.errorTipicoExamen}
          </p>
        </div>
      </article>
    `;
  }
  window.renderConceptCard = renderConceptCard;

  function renderConceptCardById(conceptId) {
    if (!window.CONCEPTOS_DATA) return '';
    const found = window.CONCEPTOS_DATA.find(c => c.id === conceptId);
    return found ? renderConceptCard(found) : '';
  }
  window.renderConceptCardById = renderConceptCardById;

  const SESSION_CONCEPTS_MAP = {
    s1: ['gobierno', 'gestion_riesgos', 'controles_operativos', 'perfil_actual', 'perfil_objetivo', 'tiers_nist', 'fn_govern', 'fn_identify', 'fn_protect', 'fn_detect', 'fn_respond', 'fn_recover'],
    s2: ['gv_oc', 'gv_rm', 'gv_rr', 'gv_po', 'gv_ov', 'gv_sc', 'raci_r', 'raci_a', 'raci_c', 'raci_i'],
    s3: ['amenaza', 'vulnerabilidad', 'riesgo', 'impacto', 'dueno_activo', 'custodio_ti', 'usuario', 'id_im'],
    s4: [],
    s5: ['zt_verify_explicitly', 'zt_least_privilege', 'zt_assume_breach', 'pdp_vs_pep', 'microsegmentacion_zt', 'acceso_condicional_zt'],
    s6: ['authn_vs_authz', 'edr_vs_antivirus', 'hardening_vs_parcheo', 'cis_controls_v8'],
    s7: ['clasificacion_vs_dlp', 'cifrado_reposo_transito', 'backups_inmutables', 'sast_vs_dast', 'cifrado_en_uso']
  };

  function getSessionSelectorHtml(sessionId) {
    return `
      <!-- SELECTOR RÁPIDO DE SESIÓN -->
      <div class="flex items-center justify-between border-b border-executive-200 dark:border-executive-800 pb-3">
        <div class="flex items-center gap-1.5 overflow-x-auto text-xs py-1">
          <span class="text-executive-400 font-mono text-[11px] mr-1">Ir a:</span>
          ${['s1', 's2', 's3', 's4', 's5', 's6', 's7'].map(sId => `
            <button onclick="renderSession('${sId}')" 
              class="px-2.5 py-1 rounded text-xs font-semibold ${sId === sessionId ? 'bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900 shadow-sm' : 'bg-executive-100 dark:bg-executive-800 text-executive-600 dark:text-executive-300 hover:bg-executive-200 dark:hover:bg-executive-700'} transition">
              S${sId.replace('s', '')}
            </button>
          `).join('')}
        </div>
        <button onclick="window.print()" class="hidden sm:inline-flex items-center gap-1 text-xs text-executive-500 hover:text-executive-900 dark:hover:text-white" title="Imprimir hoja resumen">
          🖨️ Hoja Imprimible
        </button>
      </div>
    `;
  }

  function renderPedagogicalSession(data, container) {
    const sId = data.id || ('s' + data.number);
    let html = `
      <div class="space-y-8">
        ${getSessionSelectorHtml(sId)}

        <!-- ENCABEZADO SESIÓN (SECCIÓN 0: CABECERA PEDAGÓGICA) -->
        <header id="sec-${sId}-header" class="scroll-mt-24 space-y-4 border-b border-executive-200 dark:border-executive-800 pb-6">
          <div class="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-executive-500 font-bold">
            <span>Sesión Oficial CB05</span> &middot; 
            <span>Semana ${data.number}</span> &middot; 
            <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold">${data.shortTitle || data.title}</span> &middot;
            <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold font-sans">⏱️ ${data.header.readingTime || '12 min de lectura pausada'}</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-executive-900 dark:text-white">${data.title}</h2>
          <p class="text-[18px] text-executive-800 dark:text-executive-200 leading-[1.7] font-medium">${data.header.oneLiner}</p>

          <!-- PRERREQUISITOS Y RESULTADOS ESPERADOS -->
          <div class="grid sm:grid-cols-2 gap-4 pt-2">
            <div class="p-4 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-2 text-xs sm:text-sm">
              <strong class="text-executive-900 dark:text-white font-bold block flex items-center gap-1.5">
                <span>📚</span> Prerrequisitos recomendados:
              </strong>
              <div class="space-y-1.5 text-executive-700 dark:text-executive-300">
                ${(data.header.prerequisites || []).map(p => `
                  <div>
                    &bull; <button onclick="renderSession('${p.link}')" class="underline hover:text-blue-600 dark:hover:text-blue-400 font-medium text-left">
                      ${p.text}
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="block-rule p-4 rounded-xl space-y-2 text-xs sm:text-sm">
              <strong class="text-blue-950 dark:text-blue-100 font-bold block flex items-center gap-1.5">
                <span>🎯</span> Qué vas a entender al terminar:
              </strong>
              <ul class="space-y-1 text-blue-900 dark:text-blue-200">
                ${(data.header.outcomes || []).map(o => `
                  <li class="flex items-start gap-1.5">
                    <span class="font-bold text-emerald-600 dark:text-emerald-400">✓</span>
                    <span>${o}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </header>

        <!-- LAYOUT DE 2 COLUMNAS EN ESCRITORIO CON ÍNDICE LATERAL STICKY -->
        <div class="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          
          <!-- COLUMNA IZQUIERDA: ÍNDICE DE SECCIONES FIJO/STICKY (lg:col-span-3) -->
          <aside class="toc-sidebar hidden lg:block lg:col-span-3 sticky top-24 space-y-4">
            <div class="p-5 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] shadow-xs space-y-3">
              <span class="text-xs uppercase font-mono tracking-wider font-bold text-executive-500 dark:text-executive-400 block">Índice de Lectura</span>
              <nav class="space-y-1 text-[14px] font-medium text-executive-700 dark:text-executive-300">
                <a href="#sec-${sId}-header" class="block p-1.5 rounded hover:bg-executive-100 dark:hover:bg-executive-800 transition">0. Cabecera y Objetivos</a>
                <a href="#sec-${sId}-idea" class="block p-1.5 rounded hover:bg-executive-100 dark:hover:bg-executive-800 transition">1. La Idea Central</a>
                <a href="#sec-${sId}-vocab" class="block p-1.5 rounded hover:bg-executive-100 dark:hover:bg-executive-800 transition">2. Vocabulario y Siglas</a>
                <a href="#sec-${sId}-conceptos" class="block p-1.5 rounded hover:bg-executive-100 dark:hover:bg-executive-800 transition">3. Conceptos Paso a Paso</a>
                <a href="#sec-${sId}-conexion" class="block p-1.5 rounded hover:bg-executive-100 dark:hover:bg-executive-800 transition">4. Cómo se Conecta Todo</a>
                <a href="#sec-${sId}-diferencias" class="block p-1.5 rounded hover:bg-executive-100 dark:hover:bg-executive-800 transition">5. Diferencias Clave</a>
                <a href="#sec-${sId}-razonar" class="block p-1.5 rounded hover:bg-executive-100 dark:hover:bg-executive-800 transition">6. Preguntas para Razonar</a>
                <a href="#sec-${sId}-errores" class="block p-1.5 rounded hover:bg-executive-100 dark:hover:bg-executive-800 transition">7. Errores Típicos</a>
                <a href="#sec-${sId}-profundizar" class="block p-1.5 rounded hover:bg-executive-100 dark:hover:bg-executive-800 transition">8. Para Profundizar</a>
                <a href="#sec-${sId}-fuentes" class="block p-1.5 rounded hover:bg-executive-100 dark:hover:bg-executive-800 transition">9. Fuentes de la Sesión</a>
              </nav>
            </div>

            <div class="p-4 rounded-xl border border-executive-200 dark:border-executive-800 bg-executive-50 dark:bg-executive-900/40 text-xs space-y-2">
              <strong class="text-executive-900 dark:text-white font-bold block">💡 Herramientas de Apoyo:</strong>
              <button onclick="navigateTo('view-detective')" class="w-full text-left p-2 rounded bg-white dark:bg-executive-800 border border-executive-200 dark:border-executive-700 font-semibold text-executive-800 dark:text-executive-200 hover:text-blue-600 transition flex items-center justify-between">
                <span>🔍 Detective de Categorías</span>
                <span>&rarr;</span>
              </button>
              <button onclick="navigateTo('view-raci')" class="w-full text-left p-2 rounded bg-white dark:bg-executive-800 border border-executive-200 dark:border-executive-700 font-semibold text-executive-800 dark:text-executive-200 hover:text-blue-600 transition flex items-center justify-between">
                <span>📊 Matriz RACI Oficial</span>
                <span>&rarr;</span>
              </button>
              <button onclick="navigateTo('view-reference')" class="w-full text-left p-2 rounded bg-white dark:bg-executive-800 border border-executive-200 dark:border-executive-700 font-semibold text-executive-800 dark:text-executive-200 hover:text-blue-600 transition flex items-center justify-between">
                <span>📖 Marcos de referencia</span>
                <span>&rarr;</span>
              </button>
            </div>
          </aside>

          <!-- COLUMNA PRINCIPAL DE CONTENIDO (lg:col-span-9) -->
          <div class="lg:col-span-9 space-y-12">

            <!-- 1. LA IDEA CENTRAL -->
            <section id="sec-${sId}-idea" class="scroll-mt-24 space-y-4">
              <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-executive-500 font-mono">Paso 1</span>
                <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white">1. La Idea Central</h3>
              </div>

              <div class="block-rule p-6 sm:p-7 rounded-xl space-y-3">
                <strong class="text-[16px] font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
                  <span>⚡</span> El problema en una empresa real
                </strong>
                <p class="text-[18px] leading-[1.7] text-executive-900 dark:text-executive-100 font-medium">
                  ${data.centralIdea.problemStatement}
                </p>
              </div>

              <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-3">
                <strong class="text-[16px] font-bold text-executive-900 dark:text-white block">
                  📌 Concepto Esencial y Necesidad de Negocio:
                </strong>
                <p class="text-[17px] leading-[1.7] text-executive-700 dark:text-executive-300">
                  ${data.centralIdea.coreConcept}
                </p>

                <div class="block-danger p-5 rounded-lg space-y-2 mt-2">
                  <strong class="text-[15px] font-bold text-rose-950 dark:text-rose-100 flex items-center gap-2">
                    <span>🏢</span> Caso de estudio real ilustrativo:
                  </strong>
                  <p class="text-[16px] leading-[1.6] text-rose-950 dark:text-rose-100">
                    ${data.centralIdea.caseConnection}
                  </p>
                </div>

                <div class="text-right text-xs text-executive-500 font-mono pt-1">
                  [Fuente: ${data.centralIdea.source}]
                </div>
              </div>
            </section>

            <!-- 2. VOCABULARIO, SIGLAS Y MNEMOTECNIAS -->
            <section id="sec-${sId}-vocab" class="scroll-mt-24 space-y-6">
              <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-executive-500 font-mono">Paso 2</span>
                <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white">2. Vocabulario y Siglas de la Sesión</h3>
                <p class="text-sm text-executive-600 dark:text-executive-300 mt-0.5">Toda sigla expandida y clarificada antes de avanzar, junto a recursos mnemotécnicos de apoyo:</p>
              </div>

              <!-- TABLA DE SIGLAS EXPANDIDAS -->
              <div class="overflow-x-auto rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a]">
                <table class="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr class="bg-executive-100 dark:bg-executive-900 border-b border-executive-200 dark:border-executive-800 text-executive-800 dark:text-executive-200 font-bold">
                      <th class="p-3.5 w-24">Sigla</th>
                      <th class="p-3.5 w-1/4">Nombre en Inglés</th>
                      <th class="p-3.5 w-1/4">Nombre en Español</th>
                      <th class="p-3.5">Qué significa en la práctica</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-executive-200 dark:divide-executive-800">
                    ${(data.vocabulary.acronyms || []).map(a => `
                      <tr>
                        <td class="p-3.5 font-mono font-bold text-blue-700 dark:text-blue-300">${a.sigla}</td>
                        <td class="p-3.5 text-executive-700 dark:text-executive-300 font-medium">${a.english}</td>
                        <td class="p-3.5 text-executive-900 dark:text-white font-semibold">${a.spanish}</td>
                        <td class="p-3.5 text-executive-700 dark:text-executive-300 leading-relaxed">${a.meaning}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>

              <!-- GUÍA DE LECTURA DE CÓDIGOS (SI APLICA) -->
              ${data.vocabulary.codeReadingGuide ? `
              <div class="p-6 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4">
                <div class="flex items-center justify-between border-b border-executive-100 dark:border-executive-800 pb-2">
                  <h4 class="text-[17px] font-bold text-executive-900 dark:text-white">📖 Cómo leer los códigos oficiales (${data.vocabulary.codeReadingGuide.example})</h4>
                  <span class="font-mono text-xs px-2 py-0.5 rounded bg-executive-200 dark:bg-executive-800 text-executive-900 dark:text-white font-bold">${data.vocabulary.codeReadingGuide.example}</span>
                </div>
                <p class="text-[16px] text-executive-700 dark:text-executive-300">${data.vocabulary.codeReadingGuide.explanation}</p>
                <div class="grid sm:grid-cols-3 gap-3">
                  ${data.vocabulary.codeReadingGuide.breakdown.map(b => `
                    <div class="p-3.5 rounded-lg border border-executive-200 dark:border-executive-800 bg-executive-50 dark:bg-executive-950/40 space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="font-mono font-bold text-blue-700 dark:text-blue-300 text-sm">${b.part}</span>
                        <span class="text-xs uppercase font-bold text-executive-500">${b.role}</span>
                      </div>
                      <p class="text-xs text-executive-700 dark:text-executive-300 leading-relaxed">${b.desc}</p>
                    </div>
                  `).join('')}
                </div>
                <div class="text-right text-xs text-executive-500 font-mono">[Fuente: ${data.vocabulary.codeReadingGuide.source}]</div>
              </div>
              ` : ''}

              <!-- MNEMOTECNIAS PROPIAS EXPLICADAS (SI APLICA) -->
              ${(data.vocabulary.mnemonics && data.vocabulary.mnemonics.length > 0) ? `
              <div class="grid sm:grid-cols-2 gap-4">
                ${data.vocabulary.mnemonics.map(m => `
                  <div class="block-warning p-5 rounded-xl space-y-2.5">
                    <div class="flex items-center justify-between">
                      <h5 class="text-[16px] font-bold text-amber-950 dark:text-amber-100">${m.name}</h5>
                      <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200">${m.tag}</span>
                    </div>
                    <div class="text-[17px] font-bold text-amber-950 dark:text-amber-100 italic bg-white/60 dark:bg-amber-950/40 p-3 rounded-lg border border-amber-300 dark:border-amber-800">
                      ${m.phrase}
                    </div>
                    <ul class="space-y-1 text-xs text-amber-950 dark:text-amber-200 pt-1">
                      ${m.breakdown.map(b => `<li>&bull; ${b}</li>`).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
              ` : ''}
            </section>

            <!-- 3. CONCEPTOS EXPLICADOS PASO A PASO (DE LO SIMPLE A LO COMPLEJO) -->
            <section id="sec-${sId}-conceptos" class="scroll-mt-24 space-y-6">
              <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-executive-500 font-mono">Paso 3</span>
                <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white">3. Conceptos Explicados Paso a Paso</h3>
                <p class="text-sm text-executive-600 dark:text-executive-300 mt-0.5">Ordenados de lo simple a lo complejo. Cada concepto con su utilidad real, ejemplos contrastados y relaciones:</p>
              </div>

              <div class="space-y-8">
                ${(data.stepByStepConcepts || []).map(c => `
                  <article id="${c.id}" class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] shadow-xs space-y-5">
                    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-executive-100 dark:border-executive-800/80 pb-3">
                      <div class="flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900 flex items-center justify-center font-bold text-xs shrink-0">
                          ${c.order < 10 ? '0' + c.order : c.order}
                        </span>
                        <h4 class="text-[20px] font-bold text-executive-900 dark:text-white">${c.name}</h4>
                      </div>
                      <span class="text-xs font-mono text-executive-400">[Fuente: ${c.source}]</span>
                    </div>

                    <div class="space-y-1">
                      <span class="text-[14px] font-bold text-executive-500 dark:text-executive-400 uppercase tracking-wider block">📌 ¿Qué es?</span>
                      <p class="text-[18px] leading-[1.7] text-executive-900 dark:text-executive-100 font-medium">${c.whatIs}</p>
                    </div>

                    <div class="space-y-1">
                      <span class="text-[14px] font-bold text-executive-500 dark:text-executive-400 uppercase tracking-wider block">🎯 ¿Para qué sirve / qué problema evita?</span>
                      <p class="text-[17px] leading-[1.7] text-executive-700 dark:text-executive-300">${c.whyUseful}</p>
                    </div>

                    <!-- EJEMPLOS BIEN VS MAL -->
                    <div class="grid md:grid-cols-2 gap-4 pt-1">
                      ${(c.examples || []).map(ex => {
                        const isGood = ex.label.toLowerCase().includes('bien');
                        return `
                          <div class="${isGood ? 'block-example' : 'block-danger'} p-4 rounded-lg space-y-1">
                            <strong class="text-[15px] font-bold ${isGood ? 'text-emerald-900 dark:text-emerald-200' : 'text-rose-900 dark:text-rose-200'} flex items-center gap-1.5">
                              <span>${isGood ? '✓' : '✗'}</span> ${ex.label}:
                            </strong>
                            <p class="text-[16px] leading-[1.6] ${isGood ? 'text-emerald-950 dark:text-emerald-100' : 'text-rose-950 dark:text-rose-100'}">${ex.text}</p>
                          </div>
                        `;
                      }).join('')}
                    </div>

                    <!-- RELACIONES CON OTROS CONCEPTOS -->
                    <div class="p-4 rounded-lg bg-executive-50 dark:bg-executive-900/40 border border-executive-200 dark:border-executive-800 space-y-1.5 text-xs sm:text-sm">
                      <span class="font-bold text-executive-900 dark:text-white uppercase tracking-wider text-[11px] block flex items-center gap-1.5">
                        <span>🔗</span> Relaciones con otros conceptos y sesiones:
                      </span>
                      <p class="text-executive-700 dark:text-executive-300 leading-relaxed text-[15px]">
                        ${c.relationships}
                      </p>
                    </div>
                  </article>
                `).join('')}
              </div>
            </section>

            <!-- 4. CÓMO SE CONECTA TODO (MAPA CONCEPTUAL O FLUJO SVG) -->
            <section id="sec-${sId}-conexion" class="scroll-mt-24 space-y-5">
              <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-executive-500 font-mono">Paso 4</span>
                <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white">4. Cómo se Conecta Todo</h3>
                <p class="text-sm text-executive-600 dark:text-executive-300 mt-0.5">Estructura visual de cómo interactúan los conceptos entre sí y con el negocio:</p>
              </div>

              <div class="p-6 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4">
                <p class="text-[17px] leading-[1.7] text-executive-700 dark:text-executive-300">
                  ${(data.connectionDiagram || data.connectionsDiagram || {}).description || ''}
                </p>

                <!-- DIAGRAMA SVG NATIVO RESPONSIVE -->
                <div class="py-2">
                  ${(data.connectionDiagram || data.connectionsDiagram || {}).svgContent || ''}
                </div>

                <div class="block-rule p-4 rounded-lg space-y-1">
                  <strong class="text-blue-950 dark:text-blue-100 font-bold block text-sm">💡 En resumen (3 líneas):</strong>
                  <p class="text-[16px] leading-[1.6] text-blue-900 dark:text-blue-200 font-medium">
                    ${(data.connectionDiagram || data.connectionsDiagram || {}).summaryText || ''}
                  </p>
                </div>
              </div>
            </section>

            <!-- 5. DIFERENCIAS CLAVE (TABLAS COMPARATIVAS) -->
            <section id="sec-${sId}-diferencias" class="scroll-mt-24 space-y-6">
              <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-executive-500 font-mono">Paso 5</span>
                <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white">5. Diferencias Clave (Tablas Comparativas Reales)</h3>
                <p class="text-sm text-executive-600 dark:text-executive-300 mt-0.5">Pares de conceptos que suelen confundirse, con la señal decisiva destacada para desempate en casos reales:</p>
              </div>

              <div class="space-y-6">
                ${(data.keyDifferences || []).map(comp => `
                  <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] shadow-xs space-y-4">
                    <h4 class="text-[19px] font-bold text-executive-900 dark:text-white">${comp.pairTitle}</h4>

                    <div class="overflow-x-auto rounded-lg border border-executive-200 dark:border-executive-800">
                      <table class="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr class="bg-executive-100 dark:bg-executive-900 border-b border-executive-200 dark:border-executive-800 text-executive-800 dark:text-executive-200 font-bold">
                            <th class="p-3.5 w-1/4">Aspecto</th>
                            <th class="p-3.5 w-[37.5%] text-blue-700 dark:text-blue-300 font-mono">${comp.colA}</th>
                            <th class="p-3.5 w-[37.5%] text-purple-700 dark:text-purple-300 font-mono">${comp.colB}</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-executive-200 dark:divide-executive-800">
                          ${comp.rows.map(row => {
                            const isSignal = row.aspect === 'La señal que decide';
                            return `
                              <tr class="${isSignal ? 'bg-amber-50/80 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 font-bold border-l-4 border-amber-500' : ''}">
                                <td class="p-3.5 font-bold text-executive-900 dark:text-white ${isSignal ? 'text-amber-950 dark:text-amber-200' : 'bg-executive-50/50 dark:bg-executive-950/30'}">${row.aspect}</td>
                                <td class="p-3.5 ${isSignal ? 'font-bold' : 'text-executive-800 dark:text-executive-200'}">${row.valA}</td>
                                <td class="p-3.5 ${isSignal ? 'font-bold' : 'text-executive-800 dark:text-executive-200'}">${row.valB}</td>
                              </tr>
                            `;
                          }).join('')}
                        </tbody>
                      </table>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- 6. PREGUNTAS PARA RAZONAR (ANÁLISIS DE CASOS) -->
            <section id="sec-${sId}-razonar" class="scroll-mt-24 space-y-4">
              <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-executive-500 font-mono">Paso 6</span>
                <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white">6. Preguntas para Razonar (Guía de Pensamiento para Casos)</h3>
                <p class="text-sm text-executive-600 dark:text-executive-300 mt-0.5">Sigue este algoritmo secuencial de pasos ante cualquier caso real para identificar el problema de raíz:</p>
              </div>

              <div class="block-method p-6 sm:p-7 rounded-xl space-y-4">
                ${(data.reasoningQuestions || []).map(step => `
                  <div class="flex items-start gap-3.5 pt-3 first:pt-0 border-t first:border-t-0 border-violet-200 dark:border-violet-900/40">
                    <span class="w-7 h-7 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ${step.step}
                    </span>
                    <div class="space-y-1">
                      <strong class="text-[17px] font-bold text-violet-950 dark:text-violet-100 block">
                        ${step.question}
                      </strong>
                      <p class="text-[16px] leading-[1.6] text-violet-900 dark:text-violet-200">
                        ${step.action}
                      </p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- 7. ERRORES TÍPICOS ("SI PIENSAS X, OJO: ...") -->
            <section id="sec-${sId}-errores" class="scroll-mt-24 space-y-4">
              <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-executive-500 font-mono">Paso 7</span>
                <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white">7. Errores Típicos ("Si piensas X, ojo: ...")</h3>
                <p class="text-sm text-executive-600 dark:text-executive-300 mt-0.5">Advertencias formativas basadas en las correcciones reales de la docente y confusiones frecuentes:</p>
              </div>

              <div class="space-y-3">
                ${(data.typicalErrors || []).map(err => `
                  <div class="block-warning p-4 sm:p-5 rounded-xl space-y-1">
                    <strong class="text-[16px] font-bold text-amber-950 dark:text-amber-100 block">
                      ⚠️ ${err.ifYouThink}
                    </strong>
                    <p class="text-[16px] leading-[1.6] text-amber-900 dark:text-amber-200 font-medium">
                      ${err.watchOut}
                    </p>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- 8. PARA PROFUNDIZAR (PLEGADO / COLAPSADO) -->
            <section id="sec-${sId}-profundizar" class="scroll-mt-24 space-y-4">
              <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-executive-500 font-mono">Paso 8</span>
                <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white">8. Para Profundizar (Opcional)</h3>
                <p class="text-sm text-executive-600 dark:text-executive-300 mt-0.5">Detalles técnicos complementarios, otros estándares y referencias avanzadas:</p>
              </div>

              <details class="group p-6 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] shadow-xs cursor-pointer">
                <summary class="font-bold text-[17px] text-executive-900 dark:text-white flex items-center justify-between list-none">
                  <span>📖 Desplegar lecturas avanzadas y profundización técnica (${data.title})</span>
                  <span class="text-executive-400 group-open:rotate-180 transition-transform">&darr;</span>
                </summary>
                <div class="pt-5 mt-4 border-t border-executive-100 dark:border-executive-800 space-y-5 text-xs sm:text-sm">
                  ${(data.deepDive || []).map(dd => `
                    <div class="p-4 rounded-lg bg-executive-50 dark:bg-executive-950/40 border border-executive-200 dark:border-executive-800 space-y-1.5">
                      <strong class="text-sm font-bold text-executive-900 dark:text-white block">${dd.title}</strong>
                      <p class="text-[15px] leading-relaxed text-executive-700 dark:text-executive-300">${dd.content}</p>
                    </div>
                  `).join('')}
                </div>
              </details>
            </section>

            <!-- 9. FUENTES DE LA SESIÓN -->
            <section id="sec-${sId}-fuentes" class="scroll-mt-24 space-y-4">
              <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-executive-500 font-mono">Paso 9</span>
                <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white">9. Fuentes de la Sesión (Ground Truth)</h3>
                <p class="text-sm text-executive-600 dark:text-executive-300 mt-0.5">Documentos originales de donde procede cada definición y principio explicado:</p>
              </div>

              <div class="grid sm:grid-cols-2 gap-4">
                ${(data.sources || []).map(src => `
                  <div class="p-4 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-1.5 text-xs sm:text-sm">
                    <strong class="text-executive-900 dark:text-white font-bold block">${src.doc}</strong>
                    <p class="text-executive-600 dark:text-executive-300 leading-relaxed">${src.detail}</p>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- NAVEGACIÓN INFERIOR DE SESIONES -->
            <div class="pt-8 border-t border-executive-200 dark:border-executive-800 flex flex-wrap items-center justify-between gap-4">
              ${data.number > 1 ? `
                <button onclick="renderSession('s${data.number - 1}')" class="px-4 py-2.5 rounded-lg border border-executive-300 dark:border-executive-700 text-executive-700 dark:text-executive-300 hover:bg-executive-100 dark:hover:bg-executive-800 text-xs sm:text-sm font-semibold transition">
                  &larr; Sesión Anterior (S${data.number - 1})
                </button>
              ` : `<div></div>`}
              ${data.number < 7 ? `
                <button onclick="renderSession('s${data.number + 1}')" class="px-5 py-2.5 rounded-lg bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900 text-xs sm:text-sm font-bold hover:opacity-90 transition shadow-xs">
                  Siguiente Sesión (S${data.number + 1}) &rarr;
                </button>
              ` : `<div></div>`}
            </div>

          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }
  window.renderPedagogicalSession = renderPedagogicalSession;
  window.renderRedesignedSession2 = renderPedagogicalSession;

  function renderSession(sessionId) {
    appState.currentSessionId = sessionId;
    saveState();

    const getter = SESSIONS_MAP[sessionId];
    const data = getter ? getter() : window.SESION_2_DATA;
    const container = document.getElementById('session-render-container');
    if (!data || !container) return;

    if (typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch(e) {}
    }

    // Si es sesión práctica (Sesión 4)
    if (data.isPracticalSession) {
      container.innerHTML = `
        <div class="space-y-10">
          ${getSessionSelectorHtml(sessionId)}

          <header class="border-b border-executive-200 dark:border-executive-800 pb-6 space-y-2">
            <span class="text-xs font-mono uppercase tracking-wider text-executive-500">Sesión 4 &middot; Hito Práctico</span>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-executive-900 dark:text-white">${data.title}</h2>
            <p class="text-sm text-executive-600 dark:text-executive-300">${data.description}</p>
          </header>

          <div class="p-6 rounded-lg bg-white dark:bg-executive-900 border border-executive-200 dark:border-executive-800 space-y-4">
            <h3 class="text-base font-bold text-executive-900 dark:text-white">Criterios Obligatorios de Selección de Empresa (Proyecto Integrador)</h3>
            <p class="text-xs text-executive-500">Tu equipo debe sustentar la organización elegida según estos 6 requisitos estrictos:</p>
            <div class="grid sm:grid-cols-2 gap-3 text-xs">
              ${data.projectCriteria.map(c => `
                <div class="p-3.5 rounded border border-executive-200 dark:border-executive-800 bg-executive-50/50 dark:bg-executive-950/40 space-y-1">
                  <strong class="text-executive-900 dark:text-white font-semibold block">${c.title}</strong>
                  <p class="text-executive-600 dark:text-executive-300">${c.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="p-6 rounded-lg bg-executive-100/70 dark:bg-executive-900/60 border border-executive-200 dark:border-executive-800 space-y-4">
            <h3 class="text-base font-bold text-executive-900 dark:text-white">Entrenamiento para la Práctica Calificada (PC1)</h3>
            <p class="text-xs text-executive-600 dark:text-executive-300">Como la Sesión 4 es una evaluación formal de las Sesiones 1 a 3, entrena directamente con estos módulos interactivos:</p>
            <div class="grid sm:grid-cols-2 gap-3 text-xs">
              ${data.practiceLinks.map(l => `
                <div class="p-4 rounded bg-white dark:bg-executive-900 border border-executive-200 dark:border-executive-800 space-y-2">
                  <strong class="text-executive-900 dark:text-white block text-sm">${l.title}</strong>
                  <p class="text-executive-600 dark:text-executive-400">${l.desc}</p>
                  <button onclick="${l.action}" class="px-3 py-1.5 rounded bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900 font-semibold text-xs transition">
                    Ir al Entrenamiento &rarr;
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- BOTÓN SIGUIENTE SESIÓN -->
          <div class="flex flex-wrap justify-between items-center gap-3 pt-6 border-t border-executive-200 dark:border-executive-800">
            <span class="text-xs text-executive-500 font-medium">¿Completaste la revisión del hito práctico?</span>
            <button onclick="goToNextSession('s4')" class="px-5 py-2.5 rounded-lg bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900 font-bold text-xs hover:opacity-90 transition shadow-sm">
              Avanzar a Sesión 5 (Zero Trust) &rarr;
            </button>
          </div>
        </div>
      `;
      return;
    }

    // Si tiene la estructura pedagógica de lectura completa (S1, S2, S3, S5, S6, S7)
    if (data.header && data.centralIdea && data.stepByStepConcepts) {
      renderPedagogicalSession(data, container);
      return;
    }
  }

  window.goToNextSession = function(sessionId) {
    const order = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'];
    const currIdx = order.indexOf(sessionId);
    const nextSession = order[currIdx + 1] || 's1';
    appState.currentSessionId = nextSession;
    renderSession(nextSession);
    if (typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch(e) {}
    }
  };

  // ==============================================================
  // 6B. RENDERIZADO: MÓDULO OFICIAL DE MATRIZ RACI (GV.RR)
  // ==============================================================
  function getBadgeClassForRole(letter) {
    if (letter === 'R') return 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800';
    if (letter === 'A') return 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800';
    if (letter === 'C') return 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-800';
    if (letter === 'I') return 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800';
    return 'bg-executive-100 text-executive-800 border-executive-300 dark:bg-executive-950 dark:text-executive-300 dark:border-executive-800';
  }

  function renderRaciModule() {
    const data = window.RACI_MODULE_DATA;
    const container = document.getElementById('raci-container');
    if (!data || !container) return;

    let html = `
      <div class="space-y-12">
        <!-- HEADER -->
        <header class="border-b border-executive-200 dark:border-executive-800 pb-6 space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-[15px] font-bold text-executive-800 dark:text-executive-200 flex items-center gap-1.5">
              <span>🏛️</span> Asignación de Autoridad y Responsabilidad
            </span>
            <span class="text-[14px] font-bold text-executive-500 dark:text-executive-400">NIST CSF 2.0 · GV.RR</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-executive-900 dark:text-white">${data.title}</h2>
          <p class="text-[17px] text-executive-700 dark:text-executive-300 leading-[1.7]">${data.subtitle}</p>

          <!-- A) QUÉ ES Y PARA QUÉ SIRVE -->
          <div class="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 space-y-3 shadow-xs">
            <div class="flex items-center gap-2 text-executive-900 dark:text-white font-bold">
              <span class="text-xl">🏛️</span>
              <h3 class="text-[18px] sm:text-[19px] font-bold">¿Qué es la Matriz RACI y por qué hace visible la categoría GV.RR?</h3>
            </div>
            <p class="text-executive-700 dark:text-executive-300 leading-[1.7] text-[16px] sm:text-[17px]">${data.intro.whatIs}</p>
            <div class="block-warning p-4 rounded-lg space-y-1">
              <strong class="text-[15px] font-bold text-amber-950 dark:text-amber-100 block flex items-center gap-1.5">
                <span>⚠️</span> Importancia Crítica ante Incidentes:
              </strong>
              <p class="text-[15px] sm:text-[16px] leading-[1.6] text-amber-950 dark:text-amber-100">${data.intro.whyItMatters}</p>
            </div>
          </div>
        </header>

        <!-- B) CUATRO FICHAS GRANDES (R, A, C, I) -->
        <div class="space-y-6">
          <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
            <span class="text-[15px] font-bold text-executive-600 dark:text-executive-300 flex items-center gap-1.5">
              <span>👥</span> Roles fundamentales
            </span>
            <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">Los 4 Roles de la Matriz RACI (R, A, C, I)</h3>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            ${data.roles.map(r => `
              <article class="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 shadow-xs space-y-4 text-executive-900 dark:text-executive-100 w-full">
                <div class="border-b border-executive-200 dark:border-executive-800 pb-3 flex items-center justify-between gap-2">
                  <div class="flex items-center gap-3">
                    <span class="font-mono text-xl font-black w-10 h-10 rounded-lg flex items-center justify-center border ${r.badgeColor}">${r.code}</span>
                    <h4 class="text-lg font-bold tracking-tight text-executive-900 dark:text-white">${r.letterName}</h4>
                  </div>
                </div>

                <div class="space-y-1">
                  <span class="text-[14px] font-bold text-executive-600 dark:text-executive-400 block">📌 Definición:</span>
                  <p class="text-[16px] sm:text-[17px] leading-[1.7] text-executive-900 dark:text-white font-medium">${r.queEs}</p>
                </div>

                <div class="space-y-1">
                  <span class="text-[14px] font-bold text-executive-600 dark:text-executive-400 block">🎯 Función práctica:</span>
                  <p class="text-[15px] sm:text-[16px] leading-[1.6] text-executive-700 dark:text-executive-300">${r.queHace}</p>
                </div>

                <div class="block-warning p-4 rounded-lg space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="text-base">⚠️</span>
                    <strong class="text-[15px] font-bold text-amber-950 dark:text-amber-100">Punto Crítico: Confusiones Típicas</strong>
                  </div>
                  <ul class="text-[15px] sm:text-[16px] space-y-1.5 text-amber-950 dark:text-amber-100 pl-4 list-disc leading-[1.6]">
                    ${r.confusiones.map(c => `<li>${c}</li>`).join('')}
                  </ul>
                </div>

                ${r.ejemploCaso ? `
                  <div class="block-example p-4 rounded-lg space-y-1">
                    <span class="text-[14px] font-bold text-emerald-900 dark:text-emerald-300 block">💡 Cómo se ve en un caso real:</span>
                    <p class="text-[15px] sm:text-[16px] leading-[1.6] text-emerald-950 dark:text-emerald-100">${r.ejemploCaso}</p>
                  </div>
                ` : ''}

                ${r.trampaExamen ? `
                  <div class="block-danger p-4 rounded-lg space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="text-sm">❌</span>
                      <strong class="text-[15px] font-bold text-rose-950 dark:text-rose-100">Trampa Típica de Examen</strong>
                    </div>
                    <p class="text-[15px] sm:text-[16px] leading-[1.6] text-rose-950 dark:text-rose-100 font-medium">${r.trampaExamen}</p>
                  </div>
                ` : ''}

                <div class="block-method p-3.5 rounded-lg space-y-1">
                  <span class="text-[14px] font-bold text-violet-900 dark:text-violet-300 block">🧭 Clave de Memoria:</span>
                  <p class="text-[15px] sm:text-[16px] font-semibold text-violet-950 dark:text-violet-100 mt-0.5">"${r.truco}"</p>
                </div>
              </article>
            `).join('')}
          </div>
        </div>

        <!-- C) REGLAS PARA CONSTRUIR UNA RACI CORRECTA -->
        <div class="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 space-y-5 shadow-xs">
          <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
            <span class="text-[15px] font-bold text-executive-600 dark:text-executive-300 flex items-center gap-1.5">
              <span>📏</span> Reglas de construcción
            </span>
            <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">Las 6 Reglas Cardinales para una Matriz RACI Válida</h3>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${data.rules.map((rule, idx) => `
              <div class="p-4 rounded-xl bg-executive-50/70 dark:bg-executive-900/50 border border-executive-200 dark:border-executive-800 space-y-2 flex flex-col justify-between">
                <div class="space-y-1.5">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900 font-bold text-xs flex items-center justify-center shrink-0">${idx + 1}</span>
                    <strong class="text-executive-900 dark:text-white font-bold text-[15px] sm:text-[16px]">${rule.title}</strong>
                  </div>
                  <p class="text-executive-700 dark:text-executive-300 leading-[1.6] text-[14px] sm:text-[15px]">${rule.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- D1) ALGORITMO DE LECTURA: CÓMO DECIDIR QUIÉN ES 'A' EN EL EXAMEN -->
        ${data.readingAlgorithm ? `
        <div class="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 space-y-5 shadow-xs">
          <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
            <span class="text-[15px] font-bold text-violet-700 dark:text-violet-300 flex items-center gap-1.5">
              <span>🧭</span> Método de razonamiento
            </span>
            <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">Algoritmo de 5 Pasos: ¿Cómo identificar al 'A' en el enunciado?</h3>
            <p class="text-[15px] text-executive-600 dark:text-executive-300 mt-1">Aplica estas preguntas en orden al leer cualquier caso que pida asignar roles RACI:</p>
          </div>
          <div class="space-y-3">
            ${data.readingAlgorithm.map(step => `
              <div class="p-4 rounded-xl bg-executive-50/70 dark:bg-executive-900/50 border border-executive-200 dark:border-executive-800 space-y-2">
                <div class="flex items-start gap-3">
                  <span class="w-7 h-7 rounded-full bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">${step.step}</span>
                  <div class="space-y-1 flex-1">
                    <strong class="text-[16px] sm:text-[17px] font-bold text-executive-900 dark:text-white block">${step.question}</strong>
                    <p class="text-[15px] sm:text-[16px] text-executive-700 dark:text-executive-300 leading-[1.6]"><span class="font-bold text-amber-700 dark:text-amber-300">→ Señal:</span> ${step.signal}</p>
                    ${step.example ? `<p class="text-[14px] text-executive-500 dark:text-executive-400 mt-1">Ej.: ${step.example}</p>` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- D2) CÓMO LEER UNA FILA Y LA TABLA MODELO REAL HTML -->
        <div class="space-y-6">
          <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
            <span class="text-[15px] font-bold text-executive-600 dark:text-executive-300 flex items-center gap-1.5">
              <span>📊</span> Matriz modelo
            </span>
            <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">Matriz Modelo: Ejemplos de Asignación Coherente</h3>
            <p class="text-[15px] text-executive-600 dark:text-executive-300 mt-1">Observa la coherencia de autoridad: en decisiones estratégicas/patrimoniales el CEO es 'A'; en decisiones operativas delegadas de seguridad el CISO es 'A'.</p>
          </div>

          <div class="overflow-x-auto bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 rounded-xl shadow-xs">
            <table class="w-full text-left border-collapse text-[15px] sm:text-[16px]">
              <thead>
                <tr class="bg-executive-100 dark:bg-executive-900 border-b border-executive-200 dark:border-executive-800 text-executive-800 dark:text-executive-200 font-bold">
                  <th class="p-3.5 sm:p-4 min-w-[220px]">Actividad / Decisión Crítica</th>
                  <th class="p-3.5 text-center">CISO</th>
                  <th class="p-3.5 text-center">CEO</th>
                  <th class="p-3.5 text-center">Legal</th>
                  <th class="p-3.5 text-center">TI / Ops</th>
                  <th class="p-3.5 text-center">Comercial</th>
                  <th class="p-3.5 sm:p-4 min-w-[260px]">Criterio de Consistencia de Autoridad</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-executive-200 dark:divide-executive-800 text-executive-700 dark:text-executive-300">
                ${data.tableModel.map(row => `
                  <tr class="hover:bg-executive-50/50 dark:hover:bg-executive-950/40 transition">
                    <td class="p-3.5 sm:p-4 font-semibold text-executive-900 dark:text-white">${row.activity}</td>
                    <td class="p-3.5 text-center font-mono font-bold"><span class="px-2.5 py-1 rounded border ${getBadgeClassForRole(row.ciso)}">${row.ciso}</span></td>
                    <td class="p-3.5 text-center font-mono font-bold"><span class="px-2.5 py-1 rounded border ${getBadgeClassForRole(row.ceo)}">${row.ceo}</span></td>
                    <td class="p-3.5 text-center font-mono font-bold"><span class="px-2.5 py-1 rounded border ${getBadgeClassForRole(row.legal)}">${row.legal}</span></td>
                    <td class="p-3.5 text-center font-mono font-bold"><span class="px-2.5 py-1 rounded border ${getBadgeClassForRole(row.tiOps)}">${row.tiOps}</span></td>
                    <td class="p-3.5 text-center font-mono font-bold"><span class="px-2.5 py-1 rounded border ${getBadgeClassForRole(row.comercial)}">${row.comercial}</span></td>
                    <td class="p-3.5 sm:p-4 text-[14px] sm:text-[15px] leading-[1.6] text-executive-700 dark:text-executive-300 bg-executive-50/30 dark:bg-executive-950/20">${row.whyConsistency}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="block-rule p-5 rounded-xl space-y-2">
            <strong class="text-blue-950 dark:text-blue-100 block font-bold text-[15px] sm:text-[16px]">Guía para Leer Cualquier Fila de la RACI en el Examen:</strong>
            <p class="text-blue-900 dark:text-blue-200 leading-[1.6] text-[15px]">
              1. Identifica el <strong>Accountable ('A')</strong>: ¿Quién rinde cuentas ante reguladores o accionistas? Verifica que haya exactamente uno.<br>
              2. Identifica al <strong>Responsible ('R')</strong>: ¿Quién hace el trabajo técnico pericial, despliega el parche o prepara el informe?<br>
              3. Identifica a los <strong>Consulted ('C')</strong>: ¿A quién se le pide dictamen legal, financiero o técnico antes de firmar?<br>
              4. Identifica a los <strong>Informed ('I')</strong>: ¿Quiénes necesitan enterarse después de la resolución para operar?
            </p>
          </div>
        </div>

        <!-- E) ERRORES QUE CUESTAN PUNTOS EN EL EXAMEN -->
        <div class="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 space-y-5 shadow-xs">
          <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
            <span class="text-[15px] font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
              <span>⚠️</span> Errores frecuentes
            </span>
            <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">Errores Típicos que Cuestan Puntos en la Pregunta RACI</h3>
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            ${data.examTraps.map(trap => `
              <div class="block-danger p-4 rounded-xl space-y-1.5">
                <div class="flex items-center justify-between">
                  <strong class="text-rose-950 dark:text-rose-100 font-bold text-[15px] sm:text-[16px]">${trap.title}</strong>
                  <span class="text-[12px] font-bold px-2 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100">${trap.impact}</span>
                </div>
                <p class="text-rose-900 dark:text-rose-200 leading-[1.6] text-[14px] sm:text-[15px]">${trap.reason}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- F) CASOS RESUELTOS DE ASIGNACIÓN RACI (SIN TARJETA DENTRO DE TARJETA) -->
        <div class="space-y-6">
          <div class="border-b border-executive-200 dark:border-executive-800 pb-3">
            <span class="text-[15px] font-bold text-executive-600 dark:text-executive-300 flex items-center gap-1.5">
              <span>📝</span> Casos de estudio resueltos
            </span>
            <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">Casos Resueltos de Asignación de Autoridad (${data.interactiveScenarios.length} Decisiones Críticas)</h3>
            <p class="text-[15px] text-executive-600 dark:text-executive-300 mt-1">Análisis rol por rol de cómo se distribuye la autoridad y por qué cada asignación (R, A, C, I) es correcta según las 6 reglas cardinales:</p>
          </div>

          <div class="space-y-6">
            ${data.interactiveScenarios.map((sc, scIdx) => `
              <div class="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 space-y-4 shadow-xs">
                <div class="border-b border-executive-100 dark:border-executive-800 pb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span class="text-[14px] font-bold text-executive-500">Caso Resuelto ${scIdx + 1} de ${data.interactiveScenarios.length}</span>
                    <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">${sc.title}</h4>
                  </div>
                  ${sc.source ? `<span class="text-[13px] font-medium text-executive-500 dark:text-executive-400 bg-executive-50 dark:bg-executive-900 px-2.5 py-1 rounded border border-executive-200 dark:border-executive-800">${sc.source}</span>` : ''}
                </div>

                <div class="p-4 rounded-lg bg-executive-50/70 dark:bg-executive-950/50 border border-executive-200 dark:border-executive-800">
                  <span class="text-[14px] font-bold text-executive-600 dark:text-executive-400 block mb-1">Situación descrita:</span>
                  <p class="text-[15px] sm:text-[16px] text-executive-800 dark:text-executive-200 leading-[1.7] italic">
                    "${sc.context}"
                  </p>
                </div>

                <div class="overflow-x-auto rounded-xl border border-executive-200 dark:border-executive-800">
                  <table class="w-full text-left border-collapse text-[15px] sm:text-[16px]">
                    <thead>
                      <tr class="bg-executive-100 dark:bg-executive-900 border-b border-executive-200 dark:border-executive-800 text-executive-800 dark:text-executive-200 font-bold">
                        <th class="p-3.5 w-1/4 min-w-[140px]">Rol Organizacional</th>
                        <th class="p-3.5 text-center w-28 min-w-[90px]">Asignación</th>
                        <th class="p-3.5">Justificación Pedagógica y Criterio de Autoridad</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-executive-200 dark:divide-executive-800 text-executive-700 dark:text-executive-300">
                      ${sc.roles.map(r => `
                        <tr class="hover:bg-executive-50/50 dark:hover:bg-executive-950/40 transition">
                          <td class="p-3.5 font-semibold text-executive-900 dark:text-white">${r.roleLabel}</td>
                          <td class="p-3.5 text-center">
                            <span class="inline-flex items-center justify-center font-mono font-bold text-[14px] px-3 py-1 rounded border ${getBadgeClassForRole(r.correct)}">
                              ${r.correct}
                            </span>
                          </td>
                          <td class="p-3.5 text-[15px] sm:text-[16px] leading-[1.6] text-executive-700 dark:text-executive-300">
                            ${r.feedback}
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- G) CÓMO SE CONECTA LA RACI CON OTRAS SESIONES DEL CURSO -->
        ${data.sessionLinks ? `
        <div class="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 space-y-5 shadow-xs">
          <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
            <span class="text-[15px] font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
              <span>🔗</span> Conexión curricular
            </span>
            <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">¿Cómo se Conecta la Matriz RACI con las Demás Sesiones?</h3>
            <p class="text-[15px] text-executive-600 dark:text-executive-300 mt-1">La RACI articula la gobernanza (GV.RR) de manera transversal con los activos, terceros y controles de todo el curso:</p>
          </div>
          <div class="grid sm:grid-cols-2 gap-4 pt-1">
            ${data.sessionLinks.map(link => `
              <div class="p-4 rounded-xl bg-executive-50/70 dark:bg-executive-900/50 border border-executive-200 dark:border-executive-800 space-y-2">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200">${link.session}</span>
                  <span class="font-mono text-xs font-bold px-2 py-0.5 rounded bg-executive-200 dark:bg-executive-800 text-executive-800 dark:text-executive-200">${link.category}</span>
                </div>
                <p class="text-executive-800 dark:text-executive-200 leading-[1.6] text-[15px] font-medium">
                  ${link.connection}
                </p>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

      </div>
    `;

    container.innerHTML = html;
  }

  window.evaluateRaciScenario = function(scId) {
    // Modo lectura analítica: las soluciones ya están visibles en la tabla oficial
    return true;
  };

  // ==============================================================
  // 7. RENDERIZADO: DETECTIVE DE CATEGORÍAS NIST CSF 2.0 (REDISEÑO VISUAL)
  // ==============================================================
  window.detectiveActiveCategory = 'GV.OC';

  window.selectDetectiveCategory = function(catCode) {
    window.detectiveActiveCategory = catCode;
    renderDetectiveDetailPanel();
    // Actualizar estilos de las pestañas
    const buttons = document.querySelectorAll('.detective-cat-tab');
    buttons.forEach(btn => {
      const code = btn.getAttribute('data-cat');
      if (code === catCode) {
        btn.classList.add('bg-executive-900', 'text-white', 'dark:bg-executive-100', 'dark:text-executive-900', 'font-bold', 'shadow-sm');
        btn.classList.remove('bg-white', 'dark:bg-executive-900', 'text-executive-700', 'dark:text-executive-300');
      } else {
        btn.classList.remove('bg-executive-900', 'text-white', 'dark:bg-executive-100', 'dark:text-executive-900', 'font-bold', 'shadow-sm');
        btn.classList.add('bg-white', 'dark:bg-executive-900', 'text-executive-700', 'dark:text-executive-300');
      }
    });
  };

  function renderDetectiveDetailPanel() {
    const data = window.DETECTIVE_DATA;
    const panel = document.getElementById('detective-detail-panel');
    if (!data || !panel) return;

    const cat = data.categories.find(c => c.code === window.detectiveActiveCategory) || data.categories[0];

    panel.innerHTML = `
      <article class="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 shadow-xs space-y-6 text-executive-900 dark:text-executive-100 w-full">
        <!-- CABECERA DE CATEGORÍA -->
        <div class="border-b border-executive-200 dark:border-executive-800 pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2.5">
              <span class="font-mono text-xs font-black px-2.5 py-1 rounded border ${cat.badgeColor}">${cat.code}</span>
              <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-executive-900 dark:text-white">${cat.nameEs}</h3>
            </div>
            <span class="text-[13px] text-executive-500 dark:text-executive-400 block mt-1">Nombre oficial NIST CSF 2.0: ${cat.nameEn}</span>
          </div>
        </div>

        <!-- ALCANCE OFICIAL -->
        <div class="space-y-1">
          <span class="text-[15px] font-bold text-executive-600 dark:text-executive-400 block">📌 Alcance oficial según NIST CSF 2.0:</span>
          <p class="text-[17px] sm:text-[18px] leading-[1.7] text-executive-800 dark:text-executive-200 font-medium">${cat.scope}</p>
        </div>

        <!-- LA PREGUNTA CLAVE EN GRANDE (20-22px, no itálica, contraste) -->
        <div class="block-warning p-6 rounded-xl space-y-1">
          <span class="text-[14px] font-bold text-amber-900 dark:text-amber-200 block">La pregunta clave que decide la categoría:</span>
          <div class="text-[20px] sm:text-[22px] font-bold leading-snug tracking-tight text-amber-950 dark:text-amber-100">
            ${cat.keyQuestion}
          </div>
        </div>

        <!-- SEÑALES EN EL ESCENARIO -->
        <div class="space-y-2">
          <span class="text-[15px] font-bold text-executive-600 dark:text-executive-400 block">🔍 Señales en el escenario (frases típicas):</span>
          <div class="grid sm:grid-cols-2 gap-2.5">
            ${cat.signals.map(sig => `
              <div class="p-3.5 rounded-lg bg-executive-50/80 dark:bg-executive-900/50 border border-executive-200 dark:border-executive-800 text-[15px] sm:text-[16px] font-semibold text-executive-800 dark:text-executive-200">
                ${sig}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- DOS EJEMPLOS CONCRETOS (HABITUAL VS CASO LÍMITE) -->
        ${cat.ejemplos ? `
          <div class="space-y-3 pt-1">
            <span class="text-[16px] font-bold text-executive-900 dark:text-white flex items-center gap-2">
              <span>💡</span> Dos ejemplos concretos (habitual vs. caso límite / trampa):
            </span>
            <div class="grid md:grid-cols-2 gap-4">
              ${cat.ejemplos.map(ej => `
                <div class="block-example p-4 sm:p-5 rounded-lg space-y-1.5">
                  <strong class="text-[15px] font-bold text-emerald-900 dark:text-emerald-200 block">${ej.tipo}</strong>
                  <p class="text-[15px] sm:text-[16px] leading-[1.6] text-emerald-950 dark:text-emerald-100 font-medium">${ej.descripcion}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : (cat.ejemplo ? `
          <div class="block-example p-5 rounded-lg space-y-1">
            <strong class="text-[15px] font-bold text-emerald-900 dark:text-emerald-200 block">💡 Ejemplo en caso real:</strong>
            <p class="text-[15px] sm:text-[16px] leading-[1.6] text-emerald-950 dark:text-emerald-100">${cat.ejemplo}</p>
          </div>
        ` : '')}

        <!-- POR QUÉ NO ES LA CATEGORÍA VECINA -->
        ${cat.porQueNoEsLaVecina ? `
          <div class="block-method p-5 sm:p-6 rounded-xl space-y-1.5">
            <strong class="text-[16px] font-bold text-violet-900 dark:text-violet-200 flex items-center gap-2">
              <span>🧭</span> Por qué NO es la categoría vecina:
            </strong>
            <p class="text-[15px] sm:text-[16px] leading-[1.7] text-violet-950 dark:text-violet-100 font-medium">
              ${cat.porQueNoEsLaVecina}
            </p>
          </div>
        ` : ''}

        <!-- PUNTO CRÍTICO: SE CONFUNDE CON Y CÓMO DISTINGUIRLAS -->
        <div class="block-warning p-6 rounded-xl space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-base">⚠️</span>
            <strong class="text-[15px] font-bold text-amber-900 dark:text-amber-200">Punto Crítico: Se confunde con…</strong>
          </div>
          <p class="text-[15px] sm:text-[16px] leading-relaxed text-amber-950 dark:text-amber-100 font-medium">${cat.seConfundeCon}</p>
          <div class="pt-2 border-t border-amber-200 dark:border-amber-900/50">
            <span class="text-[14px] font-bold text-amber-800 dark:text-amber-300 block">La señal que decide:</span>
            <p class="text-[15px] sm:text-[16px] leading-relaxed text-amber-950 dark:text-amber-100 font-bold mt-0.5">${cat.comoDistinguirlos}</p>
          </div>
        </div>

        <!-- TRAMPA DE EXAMEN -->
        <div class="block-danger p-5 rounded-lg space-y-1">
          <div class="flex items-center gap-2">
            <span class="text-sm">❌</span>
            <strong class="text-[15px] font-bold text-rose-800 dark:text-rose-300">Trampa Típica de Examen</strong>
          </div>
          <p class="text-[15px] sm:text-[16px] leading-relaxed text-rose-950 dark:text-rose-200">${cat.trampaExamen}</p>
        </div>
      </article>
    `;
  }

  function renderDetective() {
    const data = window.DETECTIVE_DATA;
    const container = document.getElementById('detective-container');
    if (!data || !container) return;

    let html = `
      <div class="space-y-12">
        <!-- HEADER -->
        <header class="border-b border-executive-200 dark:border-executive-800 pb-6 space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-[15px] font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
              <span>🧭</span> Guía transversal
            </span>
            <span class="text-[14px] font-bold text-executive-500 dark:text-executive-400">NIST CSF 2.0 · Categorías de Gobernanza</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-executive-900 dark:text-white">${data.title}</h2>
          <p class="text-[17px] text-executive-700 dark:text-executive-300 leading-[1.7]">${data.subtitle}</p>

          <!-- REGLAS CARDINALES METODOLÓGICAS -->
          <div class="grid sm:grid-cols-2 gap-4 pt-2">
            <div class="block-rule p-5 rounded-xl space-y-1">
              <strong class="text-blue-900 dark:text-blue-200 block font-bold text-[15px] flex items-center gap-1.5">
                <span>📌</span> Regla Multi-Categoría (Casos Complejos)
              </strong>
              <p class="text-blue-950 dark:text-blue-100 leading-relaxed text-[15px] sm:text-[16px]">${data.goldenRules.multiCategoryRule}</p>
            </div>
            <div class="block-method p-5 rounded-xl space-y-1">
              <strong class="text-violet-900 dark:text-violet-200 block font-bold text-[15px] flex items-center gap-1.5">
                <span>🎯</span> Opción Múltiple vs. Desarrollo Escrito
              </strong>
              <p class="text-violet-950 dark:text-violet-100 leading-relaxed text-[15px] sm:text-[16px]">${data.goldenRules.mcqVsEssayRule}</p>
            </div>
          </div>
        </header>

        <!-- 1. CUADRO RÁPIDO EN UNA PANTALLA -->
        <div class="space-y-4">
          <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
            <span class="text-[15px] font-bold text-executive-600 dark:text-executive-300 flex items-center gap-1.5">
              <span>📊</span> Visión panorámica
            </span>
            <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">Cuadro Rápido: Las 6 Categorías de Govern</h3>
            <p class="text-[15px] text-executive-600 dark:text-executive-300 mt-0.5">Consulta veloz en una sola pantalla para descarte rápido en preguntas de examen:</p>
          </div>

          <div class="overflow-x-auto rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] shadow-xs">
            <table class="w-full text-left border-collapse text-[15px] sm:text-[16px]">
              <thead>
                <tr class="bg-executive-100 dark:bg-executive-900 border-b border-executive-200 dark:border-executive-800 text-executive-800 dark:text-executive-200 font-bold">
                  <th class="p-3.5 sm:p-4 min-w-[140px]">Categoría</th>
                  <th class="p-3.5 sm:p-4 min-w-[240px]">La Pregunta Clave</th>
                  <th class="p-3.5 sm:p-4 min-w-[220px]">Señal Típica en el Caso</th>
                  <th class="p-3.5 sm:p-4 min-w-[180px]">Se Confunde Con</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-executive-200 dark:divide-executive-800 text-executive-700 dark:text-executive-300">
                ${(data.quickTable || []).map(row => `
                  <tr class="hover:bg-executive-50/60 dark:hover:bg-executive-900/40 transition">
                    <td class="p-3.5 sm:p-4 font-bold text-executive-900 dark:text-white whitespace-nowrap">
                      <span class="font-mono px-2 py-0.5 rounded bg-executive-200 dark:bg-executive-800 text-xs font-bold">${row.code}</span>
                      <span class="block text-xs mt-1 text-executive-600 dark:text-executive-400 font-normal">${row.name}</span>
                    </td>
                    <td class="p-3.5 sm:p-4 font-semibold text-executive-900 dark:text-executive-100 text-[15px] sm:text-[16px]">${row.keyQuestion}</td>
                    <td class="p-3.5 sm:p-4 text-[15px] sm:text-[16px] not-italic text-executive-800 dark:text-executive-200 font-medium leading-[1.6]">${row.signals}</td>
                    <td class="p-3.5 sm:p-4 text-[15px] sm:text-[16px] text-amber-800 dark:text-amber-300 font-medium">${row.confusedWith}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2. SELECTOR DE LAS 6 CATEGORÍAS + PANEL DE DETALLE GRANDE -->
        <div class="space-y-6">
          <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
            <span class="text-[15px] font-bold text-executive-600 dark:text-executive-300 flex items-center gap-1.5">
              <span>🔍</span> Fichas detalladas y claves de decisión
            </span>
            <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">Selector de las 6 Categorías de Govern</h3>
          </div>

          <!-- SELECTOR EN PESTAÑAS GRANDES -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            ${data.categories.map(c => `
              <button onclick="selectDetectiveCategory('${c.code}')" data-cat="${c.code}" class="detective-cat-tab p-3.5 rounded-xl border border-executive-200 dark:border-executive-800 transition text-left flex flex-col justify-between gap-2 ${c.code === window.detectiveActiveCategory ? 'bg-executive-900 text-white dark:bg-executive-100 dark:text-executive-900 font-bold shadow-xs' : 'bg-white dark:bg-[#0f172a] text-executive-700 dark:text-executive-300 hover:bg-executive-50 dark:hover:bg-executive-800/60'}">
                <span class="font-mono text-xs uppercase tracking-wider block font-black">${c.code}</span>
                <span class="text-xs font-medium truncate block">${c.nameEs}</span>
              </button>
            `).join('')}
          </div>

          <!-- PANEL DE DETALLE GRANDE -->
          <div id="detective-detail-panel"></div>
        </div>

        <!-- 3. ÁRBOL DE DECISIÓN VISUAL "¿QUÉ FALLÓ?" -->
        <div class="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 space-y-6 shadow-xs">
          <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
            <span class="text-[15px] font-bold text-executive-600 dark:text-executive-300 flex items-center gap-1.5">
              <span>🌳</span> Algoritmo de razonamiento
            </span>
            <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">Árbol de Decisión: ¿Qué Falló? (Secuencia para Resolver Casos)</h3>
            <p class="text-[15px] text-executive-600 dark:text-executive-300 mt-1">Sigue estas 5 preguntas en estricto orden al leer cualquier escenario:</p>
          </div>

          <div class="space-y-4">
            ${(data.decisionTree || [
              { stepNumber: 1, question: "¿Involucra a un TERCERO (proveedor, contratista, software externo o consultora)?", ifYes: "GV.SC (Cadena de Suministro) — Revisa si faltó evaluar al proveedor o si sus accesos no se revocaron.", ifNo: "Pasa a la siguiente pregunta." },
              { stepNumber: 2, question: "¿El problema principal fue no entender la misión, las leyes sectoriales o las obligaciones regulatorias del negocio?", ifYes: "GV.OC (Contexto Organizacional) — No se comprendió el entorno legal o la criticidad institucional.", ifNo: "Pasa a la siguiente pregunta." },
              { stepNumber: 3, question: "¿Se descubrió un riesgo o hallazgo pero NO existe proceso formal para evaluarlo, clasificarlo o tratarlo con presupuesto?", ifYes: "GV.RM (Gestión de Riesgos) — Falla en el proceso de tratamiento y apetito de riesgo corporativo.", ifNo: "Pasa a la siguiente pregunta." },
              { stepNumber: 4, question: "¿Alguien tomó decisiones sin tener autoridad delegada, o hubo un cargo directivo vacante sin interino?", ifYes: "GV.RR (Roles y Autoridad) — Vacío formal de mando o usurpación de atribuciones fiduciarias.", ifNo: "Pasa a la siguiente pregunta." },
              { stepNumber: 5, question: "¿Existe la política o procedimiento formal escrito y comunicado a la empresa?", ifYes: "Si existe pero nadie verifica que se cumpla ni se informa a la Junta → GV.OV (Supervisión).", ifNo: "Si no existe documento formal o nunca se comunicó a los empleados → GV.PO (Políticas)." }
            ]).map(step => `
              <div class="p-5 rounded-xl bg-executive-50/70 dark:bg-executive-900/50 border border-executive-200 dark:border-executive-800 space-y-3">
                <div class="flex items-start gap-3">
                  <span class="w-7 h-7 rounded-full bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">${step.stepNumber}</span>
                  <div>
                    <strong class="text-[16px] sm:text-[17px] font-bold text-executive-900 dark:text-white block">${step.question}</strong>
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-3 pl-10 text-[14px] sm:text-[15px]">
                  <div class="block-example p-3.5 rounded-lg space-y-1">
                    <strong class="text-emerald-900 dark:text-emerald-300 font-bold block flex items-center gap-1.5">
                      <span>✓</span> Si la respuesta es SÍ:
                    </strong>
                    <p class="text-emerald-950 dark:text-emerald-100 font-medium">${step.ifYes}</p>
                  </div>
                  <div class="p-3.5 rounded-lg bg-executive-100/70 dark:bg-executive-800/60 border border-executive-200 dark:border-executive-800 space-y-1">
                    <strong class="text-executive-700 dark:text-executive-300 font-bold block flex items-center gap-1.5">
                      <span>&rarr;</span> Si la respuesta es NO:
                    </strong>
                    <p class="text-executive-600 dark:text-executive-400 font-medium">${step.ifNo}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. PARES CONFUSOS FRECUENTES (TABLAS COMPARATIVAS REALES) -->
        <div class="space-y-6">
          <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
            <span class="text-[15px] font-bold text-executive-600 dark:text-executive-300 flex items-center gap-1.5">
              <span>⚖️</span> Criterios de desempate
            </span>
            <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">Pares Confusos Frecuentes (Tablas Comparativas Reales)</h3>
            <p class="text-[15px] text-executive-600 dark:text-executive-300 mt-1">Diferencias clave resueltas mediante señales decisorias claras:</p>
          </div>

          <div class="space-y-6">
            ${data.confusingPairsDetailed.map(pair => `
              <div class="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 space-y-4 shadow-xs">
                <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white">${pair.title}</h4>

                <div class="overflow-x-auto rounded-lg border border-executive-200 dark:border-executive-800">
                  <table class="w-full text-left border-collapse text-[15px] sm:text-[16px]">
                    <thead>
                      <tr class="bg-executive-100 dark:bg-executive-900 border-b border-executive-200 dark:border-executive-800 text-executive-800 dark:text-executive-200 font-bold">
                        <th class="p-3.5 w-1/4">Aspecto</th>
                        <th class="p-3.5 w-[37.5%] font-mono text-[14px] sm:text-[15px] text-blue-700 dark:text-blue-300">${pair.left.code}</th>
                        <th class="p-3.5 w-[37.5%] font-mono text-[14px] sm:text-[15px] text-purple-700 dark:text-purple-300">${pair.right.code}</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-executive-200 dark:divide-executive-800">
                      <tr>
                        <td class="p-3.5 font-bold text-executive-900 dark:text-white bg-executive-50/50 dark:bg-executive-950/30">Foco Principal</td>
                        <td class="p-3.5 text-executive-800 dark:text-executive-200 font-medium">${pair.left.focus}</td>
                        <td class="p-3.5 text-executive-800 dark:text-executive-200 font-medium">${pair.right.focus}</td>
                      </tr>
                      <tr>
                        <td class="p-3.5 font-bold text-executive-900 dark:text-white bg-executive-50/50 dark:bg-executive-950/30">Evidencia Textual del Caso</td>
                        <td class="p-3.5 text-executive-800 dark:text-executive-200 font-medium not-italic">"${pair.left.evidence}"</td>
                        <td class="p-3.5 text-executive-800 dark:text-executive-200 font-medium not-italic">"${pair.right.evidence}"</td>
                      </tr>
                      <tr>
                        <td class="p-3.5 font-bold text-executive-900 dark:text-white bg-executive-50/50 dark:bg-executive-950/30">Por qué aplica esta y no la otra</td>
                        <td class="p-3.5 text-executive-700 dark:text-executive-300 leading-[1.6]">${pair.left.whyThis}</td>
                        <td class="p-3.5 text-executive-700 dark:text-executive-300 leading-[1.6]">${pair.right.whyThis}</td>
                      </tr>
                      <tr class="bg-amber-50/80 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 font-bold border-l-4 border-amber-500">
                        <td class="p-3.5 text-amber-900 dark:text-amber-200">La Señal que Decide</td>
                        <td colspan="2" class="p-3.5 text-[15px] sm:text-[16px] font-semibold">${pair.decidingSignal}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 5. BANCO DE CASOS ANALIZADOS (SIN TARJETA DENTRO DE TARJETA) -->
        <div class="space-y-6">
          <div class="border-b border-executive-200 dark:border-executive-800 pb-3 flex flex-wrap justify-between items-center gap-2">
            <div>
              <span class="text-[15px] font-bold text-executive-600 dark:text-executive-300 flex items-center gap-1.5">
                <span>📝</span> Casos de estudio analizados
              </span>
              <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">Banco de Casos Analizados (${data.miniQuizzes ? data.miniQuizzes.length : 20} Situaciones de Estudio)</h3>
              <p class="text-[15px] text-executive-600 dark:text-executive-300 mt-1">Escenarios prácticos con su categoría correcta y justificación analítica fundamentada:</p>
            </div>
            <span class="text-[14px] font-bold px-3 py-1 rounded bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900">${data.miniQuizzes ? data.miniQuizzes.length : 20} Casos</span>
          </div>

          <!-- FILTRO POR FUNCIÓN -->
          <div class="flex flex-wrap items-center gap-2 pt-1">
            <span class="text-[14px] font-bold text-executive-700 dark:text-executive-300 mr-1">Filtrar por función:</span>
            ${[
              { code: 'ALL', label: 'Todos (20)' },
              { code: 'GV', label: 'Govern - GV (12)' },
              { code: 'ID', label: 'Identify - ID (2)' },
              { code: 'PR', label: 'Protect - PR (4)' },
              { code: 'DE', label: 'Detect - DE (2)' }
            ].map(f => {
              const active = (window.detectiveFilterFunc || 'ALL') === f.code;
              return `
                <button onclick="handleDetectiveFilter('${f.code}')" class="detective-func-filter px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${active ? 'bg-executive-900 text-white dark:bg-executive-100 dark:text-executive-900 font-bold shadow-xs' : 'bg-white dark:bg-executive-800 text-executive-700 dark:text-executive-300 hover:bg-executive-100 dark:hover:bg-executive-700'}">
                  ${f.label}
                </button>
              `;
            }).join('')}
          </div>

          <!-- LISTA DE ESCENARIOS ANALIZADOS -->
          <div id="detective-scenarios-list" class="space-y-6">
            ${(() => {
              const fCode = window.detectiveFilterFunc || 'ALL';
              const list = (data.miniQuizzes || []).filter(mq => {
                if (fCode === 'ALL') return true;
                return (mq.categoryTarget || mq.correct || '').startsWith(fCode);
              });
              return list.map((mq, idx) => `
                <div class="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 space-y-4 shadow-xs">
                  <div class="flex flex-wrap items-center justify-between gap-2 border-b border-executive-100 dark:border-executive-800 pb-2.5">
                    <div class="flex items-center gap-2">
                      <span class="text-[14px] font-bold text-executive-600 dark:text-executive-300">Caso ${idx + 1} de ${list.length}</span>
                      ${mq.session ? `<span class="text-[13px] font-semibold px-2.5 py-0.5 rounded bg-executive-100 dark:bg-executive-800 text-executive-700 dark:text-executive-300">Sesión ${mq.session}</span>` : ''}
                      <span class="font-mono text-xs px-2.5 py-0.5 rounded font-bold bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                        Categoría: ${mq.categoryTarget}
                      </span>
                    </div>
                    <span class="text-[15px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                      <span>✓</span> Categoría correcta: ${mq.correct}
                    </span>
                  </div>

                  <div class="space-y-1">
                    <span class="text-[14px] font-bold text-executive-600 dark:text-executive-400 block">Situación analizada:</span>
                    <p class="font-semibold text-executive-900 dark:text-white text-[16px] sm:text-[17px] leading-[1.7] bg-executive-50/70 dark:bg-executive-950/50 p-4 rounded-lg border border-executive-200 dark:border-executive-800">
                      "${mq.scenario}"
                    </p>
                  </div>

                  <!-- Comparación de las 4 opciones planteadas -->
                  <div class="space-y-1.5 pt-1">
                    <span class="text-[14px] font-bold text-executive-600 dark:text-executive-400 block">Opciones de la categoría:</span>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      ${mq.options.map(opt => `
                        <div class="p-2.5 rounded-lg border text-center font-mono font-bold text-[14px] sm:text-[15px] ${opt === mq.correct ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200 shadow-xs' : 'border-executive-200 dark:border-executive-800 bg-executive-50/40 dark:bg-executive-900/40 text-executive-500 dark:text-executive-400'}">
                          ${opt === mq.correct ? `✓ ${opt} (Correcta)` : opt}
                        </div>
                      `).join('')}
                    </div>
                  </div>

                  <!-- Justificación analítica y descarte pedagógico -->
                  <div class="block-example p-4 rounded-lg space-y-1.5">
                    <strong class="text-emerald-950 dark:text-emerald-100 font-bold block flex items-center gap-1.5 text-[15px]">
                      <span>💡</span> Análisis:
                    </strong>
                    <p class="text-emerald-900 dark:text-emerald-200 leading-[1.7] font-medium text-[15px] sm:text-[16px]">
                      ${mq.feedback}
                    </p>
                  </div>

                  ${mq.source ? `<div class="text-[13px] text-executive-500 dark:text-executive-400 font-medium pt-1">Fuente: ${mq.source}</div>` : ''}
                </div>
              `).join('');
            })()}
          </div>
        </div>

      </div>
    `;

    container.innerHTML = html;
  }

  window.detectiveFilterFunc = 'ALL';
  window.handleDetectiveFilter = function(filterCode) {
    window.detectiveFilterFunc = filterCode;
    renderDetective();
  };

  window.handleDetectiveAnswer = function(id, chosen, correct, justification, btn) {
    return true;
  };




  // ==============================================================
  // 8. RENDERIZADO: MARCOS DE REFERENCIA OFICIALES (3 BLOQUES CONDENSADOS)
  // Bloque 1: NIST CSF 2.0
  // Bloque 2: NIST SP 800-207 (Zero Trust Architecture)
  // Bloque 3: CIS Controls v8.1
  // ==============================================================
  let refFilterQuery = '';
  let refFilterFunc = 'ALL';
  let refActiveTab = 'all';

  function renderReference() {
    const csfData = window.NIST_CSF_REFERENCE;
    const ztData = window.NIST_SP_800_207_REFERENCE;
    const cisData = window.CIS_CONTROLS_REFERENCE;
    const container = document.getElementById('reference-container');
    if (!csfData || !container) return;

    let html = `
      <div class="space-y-10">
        <header class="border-b border-executive-200 dark:border-executive-800 pb-6 space-y-4">
          <div class="flex items-center gap-2">
            <span class="text-[15px] font-bold text-executive-700 dark:text-executive-300 flex items-center gap-1.5">
              <span>📚</span> Marcos oficiales de referencia
            </span>
            <span class="text-[14px] font-bold text-executive-500 dark:text-executive-400">Fundamentos normativos CB05</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-executive-900 dark:text-white">Marcos de Referencia Oficiales</h2>
          <p class="text-[17px] text-executive-700 dark:text-executive-300 leading-[1.7]">
            Consulta condensada de los tres marcos evaluados en el curso: <strong>NIST CSF 2.0</strong> (gestión y gobierno), <strong>NIST SP 800-207</strong> (arquitectura Zero Trust) y <strong>CIS Controls v8.1</strong> (higiene y controles operativos).
          </p>

          <!-- SELECTOR DE MARCO -->
          <div class="flex flex-wrap gap-2 pt-2">
            <button onclick="handleRefTab('all')"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${refActiveTab === 'all' ? 'bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900 shadow-xs' : 'bg-executive-100 dark:bg-executive-800 text-executive-700 dark:text-executive-300 hover:bg-executive-200'}">
              📑 Ver Todos
            </button>
            <button onclick="handleRefTab('csf')"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${refActiveTab === 'csf' ? 'bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900 shadow-xs' : 'bg-executive-100 dark:bg-executive-800 text-executive-700 dark:text-executive-300 hover:bg-executive-200'}">
              🏛️ 1. NIST CSF 2.0
            </button>
            <button onclick="handleRefTab('zt')"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${refActiveTab === 'zt' ? 'bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900 shadow-xs' : 'bg-executive-100 dark:bg-executive-800 text-executive-700 dark:text-executive-300 hover:bg-executive-200'}">
              🛡️ 2. Zero Trust (NIST SP 800-207)
            </button>
            <button onclick="handleRefTab('cis')"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${refActiveTab === 'cis' ? 'bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900 shadow-xs' : 'bg-executive-100 dark:bg-executive-800 text-executive-700 dark:text-executive-300 hover:bg-executive-200'}">
              🔧 3. CIS Controls v8.1
            </button>
          </div>
        </header>

        <!-- ============================================================== -->
        <!-- BLOQUE 1: NIST CSF 2.0 -->
        <!-- ============================================================== -->
        ${(refActiveTab === 'all' || refActiveTab === 'csf') ? `
          <section id="block-nist-csf" class="space-y-6">
            <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
              <span class="text-[15px] font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                <span>🏛️</span> Bloque 1 · Gestión y gobierno
              </span>
              <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">NIST Cybersecurity Framework 2.0 (CSWP 29)</h3>
              <p class="text-[15px] text-executive-600 dark:text-executive-300 mt-0.5">Las 6 funciones fundamentales, sus categorías oficiales, perfiles y niveles de implementación (Tiers):</p>
            </div>

            <!-- LA TRÍADA ESTRUCTURAL DE NIST CSF 2.0 -->
            ${csfData.structuralTriad ? `
              <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4 shadow-xs">
                <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
                  <span class="text-[15px] font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                    <span>📐</span> Arquitectura del marco
                  </span>
                  <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">${csfData.structuralTriad.title}</h4>
                  <p class="text-[14px] text-executive-500 mt-0.5">${csfData.structuralTriad.description}</p>
                </div>
                <div class="grid sm:grid-cols-3 gap-3">
                  ${csfData.structuralTriad.components.map(comp => `
                    <div class="p-4 rounded-xl bg-executive-50/70 dark:bg-executive-950/40 border border-executive-200 dark:border-executive-800 space-y-1.5">
                      <strong class="text-executive-900 dark:text-white font-bold block text-[15px] sm:text-[16px] text-blue-800 dark:text-blue-300">${comp.name}</strong>
                      <p class="text-executive-700 dark:text-executive-300 leading-[1.6] text-[14px] sm:text-[15px]">${comp.detail}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- GOBIERNO VS. GESTIÓN DE RIESGOS VS. CONTROLES OPERATIVOS -->
            ${csfData.governanceVsRiskVsOps ? `
              <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4 shadow-xs">
                <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
                  <span class="text-[15px] font-bold text-violet-700 dark:text-violet-300 flex items-center gap-1.5">
                    <span>⚖️</span> Diferenciación clave
                  </span>
                  <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">${csfData.governanceVsRiskVsOps.title}</h4>
                  <p class="text-[14px] text-executive-500 mt-0.5">${csfData.governanceVsRiskVsOps.description}</p>
                </div>
                <div class="grid sm:grid-cols-3 gap-4">
                  ${csfData.governanceVsRiskVsOps.pillars.map(p => `
                    <div class="p-4 rounded-xl border border-executive-200 dark:border-executive-800 bg-executive-50/60 dark:bg-executive-950/30 space-y-2 flex flex-col justify-between">
                      <div class="space-y-1.5">
                        <span class="font-mono text-[11px] uppercase font-bold px-2 py-0.5 rounded border block w-fit ${p.badge}">${p.level}</span>
                        <strong class="text-executive-900 dark:text-white font-bold block text-[15px] sm:text-[16px] leading-snug">${p.focus}</strong>
                        <p class="text-executive-700 dark:text-executive-300 leading-[1.6] text-[14px] sm:text-[15px]">${p.scope}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- BUSCADOR Y FILTROS POR FUNCIÓN -->
            <div class="flex flex-col sm:flex-row gap-3">
              <input type="text" id="ref-search-input" value="${refFilterQuery}" oninput="handleRefSearch(this.value)"
                placeholder="Buscar categoría, nombre o palabra clave (ej. proveedor, RACI, BitLocker, EDR)..."
                class="flex-1 p-3 rounded-lg border border-executive-300 dark:border-executive-700 bg-white dark:bg-[#0f172a] text-[15px] outline-none focus:border-executive-500">
              
              <div class="flex gap-1.5 overflow-x-auto text-xs py-1">
                ${['ALL', 'GV', 'ID', 'PR', 'DE', 'RS', 'RC'].map(code => `
                  <button onclick="handleRefFuncFilter('${code}')"
                    class="px-3.5 py-1.5 rounded-lg text-xs font-semibold ${refFilterFunc === code ? 'bg-executive-900 dark:bg-executive-100 text-white dark:text-executive-900' : 'bg-executive-100 dark:bg-executive-800 text-executive-600 dark:text-executive-300 hover:bg-executive-200'} transition font-mono">
                    ${code}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- TRAMPAS FRECUENTES (CÓDIGOS INVENTADOS) -->
            <div class="block-danger p-5 rounded-xl space-y-2">
              <strong class="font-bold text-rose-950 dark:text-rose-100 flex items-center gap-1.5 text-[15px]">
                <span>⚠️</span> ¡Cuidado con los Códigos Inventados en el Examen!
              </strong>
              <p class="text-rose-900 dark:text-rose-200 leading-[1.6] text-[14px] sm:text-[15px]">Las evaluaciones suelen incluir opciones distractoras que parecen categorías pero <strong>no existen</strong> en NIST CSF 2.0:</p>
              <ul class="list-disc list-inside space-y-1 text-rose-900 dark:text-rose-200 font-mono text-[13px] pt-1">
                ${csfData.invalid_distractors.map(d => `<li>${d}</li>`).join('')}
              </ul>
            </div>

            <!-- LISTA DE FUNCIONES Y CATEGORÍAS FILTRADAS -->
            <div id="ref-results-list" class="space-y-6">
              ${getFilteredReferenceHtml(csfData)}
            </div>

            <!-- PERFILES Y TIERS (COMPLEMENTO CLAVE DEL MARCO) -->
            <div class="grid md:grid-cols-2 gap-6 pt-2">
              <!-- PERFILES DE CIBERSEGURIDAD -->
              <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4 shadow-xs">
                <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
                  <span class="text-[15px] font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                    <span>🎯</span> Perfiles de ciberseguridad
                  </span>
                  <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">${csfData.profiles.title}</h4>
                  <p class="text-[14px] text-executive-500 mt-0.5">${csfData.profiles.description}</p>
                </div>
                <div class="space-y-3">
                  <div class="p-3.5 rounded-lg bg-executive-50 dark:bg-executive-950/40 border border-executive-200 dark:border-executive-800 space-y-1">
                    <strong class="text-executive-900 dark:text-white font-bold block text-[15px] sm:text-[16px]">${csfData.profiles.currentProfile.name}</strong>
                    <p class="text-executive-700 dark:text-executive-300 text-[14px] sm:text-[15px] leading-[1.6]">${csfData.profiles.currentProfile.definition}</p>
                    <span class="text-[13px] text-executive-500 block italic mt-1">Propósito: ${csfData.profiles.currentProfile.purpose}</span>
                  </div>
                  <div class="p-3.5 rounded-lg bg-executive-50 dark:bg-executive-950/40 border border-executive-200 dark:border-executive-800 space-y-1">
                    <strong class="text-executive-900 dark:text-white font-bold block text-[15px] sm:text-[16px]">${csfData.profiles.targetProfile.name}</strong>
                    <p class="text-executive-700 dark:text-executive-300 text-[14px] sm:text-[15px] leading-[1.6]">${csfData.profiles.targetProfile.definition}</p>
                    <span class="text-[13px] text-executive-500 block italic mt-1">Propósito: ${csfData.profiles.targetProfile.purpose}</span>
                  </div>
                  <div class="block-rule p-3.5 rounded-lg space-y-1">
                    <strong class="text-blue-950 dark:text-blue-100 font-bold block text-[15px] sm:text-[16px]">${csfData.profiles.gapAnalysis.name}</strong>
                    <p class="text-blue-900 dark:text-blue-200 text-[14px] sm:text-[15px] leading-[1.6]">${csfData.profiles.gapAnalysis.definition}</p>
                    <span class="text-[13px] text-blue-700 dark:text-blue-300 block italic mt-1">Propósito: ${csfData.profiles.gapAnalysis.purpose}</span>
                  </div>
                </div>
              </div>

              <!-- NIVELES DE IMPLEMENTACIÓN (TIERS) -->
              <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4 shadow-xs">
                <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
                  <span class="text-[15px] font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                    <span>📊</span> Niveles de implementación (Tiers)
                  </span>
                  <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">${csfData.tiers.title}</h4>
                  <p class="text-[14px] text-executive-500 mt-0.5">${csfData.tiers.description}</p>
                </div>
                <div class="space-y-2.5">
                  ${csfData.tiers.levels.map(t => `
                    <div class="p-3 rounded-lg border border-executive-200 dark:border-executive-800 bg-executive-50/50 dark:bg-executive-950/30 space-y-1">
                      <strong class="text-executive-900 dark:text-white font-bold block text-[14px] sm:text-[15px] font-mono">${t.tier}</strong>
                      <p class="text-executive-700 dark:text-executive-300 text-[14px] sm:text-[15px] leading-[1.6]">${t.caracteristica}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- CONFUSIONES CLAVE EN NIST CSF 2.0 -->
            ${csfData.frameworkConfusions ? `
              <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4 shadow-xs">
                <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
                  <span class="text-[15px] font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                    <span>⚠️</span> Puntos críticos de confusión
                  </span>
                  <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">Confusiones Clave en el NIST CSF 2.0</h4>
                  <p class="text-[14px] text-executive-500 mt-0.5">Diferencias decisivas entre conceptos que los estudiantes suelen confundir:</p>
                </div>
                <div class="space-y-4">
                  ${csfData.frameworkConfusions.map(fc => `
                    <div class="p-4 rounded-xl bg-executive-50/70 dark:bg-executive-950/40 border border-executive-200 dark:border-executive-800 space-y-2">
                      <strong class="text-[15px] sm:text-[16px] font-bold text-executive-900 dark:text-white block">${fc.pair}</strong>
                      <div class="block-warning p-3 rounded-lg text-amber-950 dark:text-amber-100 font-semibold text-[14px] sm:text-[15px] leading-[1.6]">
                        ${fc.signal}
                      </div>
                      <div class="grid sm:grid-cols-2 gap-2.5 pt-1 text-[14px] sm:text-[15px]">
                        <div class="p-3 rounded-lg bg-white dark:bg-executive-900 border border-executive-200 dark:border-executive-800 space-y-1">
                          <strong class="font-bold text-executive-900 dark:text-white block">Primer Concepto:</strong>
                          <p class="text-executive-700 dark:text-executive-300 leading-[1.6]">${fc.profileDesc || fc.currentDesc}</p>
                        </div>
                        <div class="p-3 rounded-lg bg-white dark:bg-executive-900 border border-executive-200 dark:border-executive-800 space-y-1">
                          <strong class="font-bold text-executive-900 dark:text-white block">Segundo Concepto:</strong>
                          <p class="text-executive-700 dark:text-executive-300 leading-[1.6]">${fc.tiersDesc || fc.targetDesc}</p>
                        </div>
                      </div>
                      <p class="text-rose-800 dark:text-rose-300 text-[14px] italic"><strong class="font-bold">❌ Trampa de Examen:</strong> ${fc.trap}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- DUDAS FRECUENTES RESUELTAS (NIST CSF 2.0) -->
            ${csfData.commonDoubts ? `
              <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4 shadow-xs">
                <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
                  <span class="text-[15px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <span>💡</span> Absolución de dudas frecuentes
                  </span>
                  <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">Preguntas Clave y Dudas Frecuentes sobre NIST CSF 2.0</h4>
                  <p class="text-[14px] text-executive-500 mt-0.5">Respuestas directas fundamentadas en el documento oficial CSWP 29:</p>
                </div>
                <div class="space-y-3">
                  ${csfData.commonDoubts.map(d => `
                    <div class="p-4 rounded-xl bg-executive-50/70 dark:bg-executive-950/40 border border-executive-200 dark:border-executive-800 space-y-1.5">
                      <strong class="text-executive-900 dark:text-white font-bold block text-[15px] sm:text-[16px] flex items-center gap-2">
                        <span class="text-blue-600 dark:text-blue-400 font-mono">Q:</span> ${d.question}
                      </strong>
                      <p class="text-executive-700 dark:text-executive-300 leading-[1.6] pl-5 text-[14px] sm:text-[15px]">${d.answer}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </section>
        ` : ''}

        <!-- ============================================================== -->
        <!-- BLOQUE 2: NIST SP 800-207 (ZERO TRUST ARCHITECTURE) -->
        <!-- ============================================================== -->
        ${(refActiveTab === 'all' || refActiveTab === 'zt') ? `
          <section id="block-nist-zt" class="space-y-6 pt-4 border-t border-executive-200 dark:border-executive-800">
            <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
              <span class="text-[15px] font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                <span>🛡️</span> Bloque 2 · Arquitectura de seguridad
              </span>
              <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">${ztData.title}</h3>
              <p class="text-[15px] text-executive-600 dark:text-executive-300 mt-0.5">${ztData.subtitle}</p>
            </div>

            <div class="block-rule p-5 rounded-xl space-y-2">
              <strong class="text-blue-950 dark:text-blue-100 font-bold block text-[15px] sm:text-[16px] flex items-center gap-1.5">
                <span>🛡️</span> Fundamento Central: Eliminación del Perímetro Implícito
              </strong>
              <p class="text-blue-900 dark:text-blue-200 text-[15px] sm:text-[16px] leading-[1.6]">${ztData.definition}</p>
            </div>

            <!-- ¿POR QUÉ CAYÓ EL MODELO PERIMETRAL TRADICIONAL? -->
            ${ztData.perimeterModelFailure ? `
              <div class="block-danger p-6 sm:p-7 rounded-xl space-y-3">
                <div class="border-b border-rose-200 dark:border-rose-900/40 pb-2">
                  <span class="text-[15px] font-bold text-rose-800 dark:text-rose-200 flex items-center gap-1.5">
                    <span>❌</span> Quiebre del modelo perimetral tradicional
                  </span>
                  <h4 class="text-[18px] font-bold text-rose-950 dark:text-rose-100 mt-0.5">${ztData.perimeterModelFailure.title}</h4>
                </div>
                <div class="grid sm:grid-cols-2 gap-3 pt-1">
                  ${(ztData.perimeterModelFailure.points || ztData.perimeterModelFailure.flaws || []).map(flaw => `
                    <div class="p-3.5 rounded-lg bg-white/80 dark:bg-executive-900 border border-rose-200 dark:border-rose-900/40 space-y-1">
                      <strong class="text-rose-900 dark:text-rose-300 font-bold block text-[14px] sm:text-[15px]">${flaw.flaw}</strong>
                      <p class="text-executive-700 dark:text-executive-300 leading-[1.6] text-[14px]">${flaw.detail}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- LOS 3 PRINCIPIOS FUNDAMENTALES -->
            <div class="space-y-3">
              <h4 class="text-[17px] font-bold text-executive-900 dark:text-white">Los 3 Principios Guía de Zero Trust:</h4>
              <div class="grid sm:grid-cols-3 gap-3">
                ${ztData.threePrinciples.map(p => `
                  <div class="p-4 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-1.5 shadow-xs">
                    <strong class="text-executive-900 dark:text-white font-bold block text-[15px] sm:text-[16px] text-blue-700 dark:text-blue-300">${p.name}</strong>
                    <p class="text-[14px] sm:text-[15px] text-executive-700 dark:text-executive-300 leading-[1.6]">${p.detail}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- LOS 7 TENETS OFICIALES -->
            <div class="space-y-3">
              <h4 class="text-[17px] font-bold text-executive-900 dark:text-white">Los 7 Tenets de NIST SP 800-207 (Sec. 2.1):</h4>
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                ${ztData.sevenTenets.map(t => `
                  <div class="p-3.5 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-1 text-[14px] sm:text-[15px] shadow-xs">
                    <div class="flex items-center gap-2">
                      <span class="w-6 h-6 rounded-full bg-executive-200 dark:bg-executive-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">${t.number}</span>
                      <strong class="text-executive-900 dark:text-white font-semibold leading-tight text-[15px]">${t.title}</strong>
                    </div>
                    <p class="text-executive-600 dark:text-executive-300 pl-8 leading-[1.6] text-[14px]">${t.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- LOS 6 DOMINIOS / PILARES CLAVE DE ZERO TRUST -->
            ${ztData.sixDomains ? `
              <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4 shadow-xs">
                <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
                  <span class="text-[15px] font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                    <span>🌐</span> Dominios arquitectónicos
                  </span>
                  <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">Los 6 Dominios Clave de la Arquitectura Zero Trust</h4>
                  <p class="text-[14px] text-executive-500 mt-0.5">La verificación continua se aplica de manera holística a través de estos 6 planos de control:</p>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  ${ztData.sixDomains.map(d => `
                    <div class="p-3.5 rounded-xl bg-executive-50/70 dark:bg-executive-950/40 border border-executive-200 dark:border-executive-800 space-y-1">
                      <strong class="text-blue-700 dark:text-blue-300 font-bold block text-[15px] sm:text-[16px]">${d.domain}</strong>
                      <p class="text-executive-700 dark:text-executive-300 leading-[1.6] text-[14px] sm:text-[15px]">${d.focus}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- ARQUITECTURA LÓGICA (PE, PA, PEP) -->
            <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4 shadow-xs">
              <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
                <span class="text-[15px] font-bold text-violet-700 dark:text-violet-300 flex items-center gap-1.5">
                  <span>⚙️</span> Arquitectura lógica
                </span>
                <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">Plano de Control vs. Plano de Datos (PE, PA, PEP)</h4>
                <p class="text-[14px] text-executive-500 mt-0.5">${ztData.architectureComponents.description}</p>
              </div>

              <div class="grid sm:grid-cols-3 gap-3">
                ${ztData.architectureComponents.components.map(c => `
                  <div class="p-4 rounded-xl bg-executive-50 dark:bg-executive-950/40 border border-executive-200 dark:border-executive-800 space-y-1.5">
                    <span class="font-mono text-[11px] uppercase font-bold px-2 py-0.5 rounded ${c.plane.includes('Control') ? 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300' : 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300'}">
                      ${c.plane}
                    </span>
                    <strong class="text-executive-900 dark:text-white font-bold block text-[15px] sm:text-[16px] pt-1">${c.name}</strong>
                    <p class="text-executive-700 dark:text-executive-300 leading-[1.6] text-[14px] sm:text-[15px]">${c.role}</p>
                  </div>
                `).join('')}
              </div>

              <!-- RELACIÓN CON NIST CSF 2.0 -->
              <div class="block-rule p-4 rounded-xl space-y-1.5">
                <strong class="text-blue-950 dark:text-blue-100 font-bold block text-[15px] sm:text-[16px]">🔗 ¿Cómo se relaciona Zero Trust con NIST CSF 2.0?</strong>
                <p class="text-blue-900 dark:text-blue-200 leading-[1.6] text-[14px] sm:text-[15px]">
                  <strong>${ztData.relationWithCsf.csfRole}</strong> ${ztData.relationWithCsf.csfDesc}
                </p>
                <p class="text-blue-900 dark:text-blue-200 leading-[1.6] text-[14px] sm:text-[15px]">
                  <strong>${ztData.relationWithCsf.ztRole}</strong> ${ztData.relationWithCsf.ztDesc}
                </p>
              </div>
            </div>

            <!-- CONFUSIONES CLAVE EN ZERO TRUST -->
            ${ztData.componentConfusions ? `
              <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4 shadow-xs">
                <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
                  <span class="text-[15px] font-bold text-violet-700 dark:text-violet-300 flex items-center gap-1.5">
                    <span>⚠️</span> Puntos críticos de confusión
                  </span>
                  <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">Confusiones Clave en Arquitectura Zero Trust</h4>
                  <p class="text-[14px] text-executive-500 mt-0.5">Diferenciación conceptual precisa según NIST SP 800-207:</p>
                </div>
                <div class="space-y-4">
                  ${ztData.componentConfusions.map(cc => `
                    <div class="p-4 rounded-xl bg-executive-50/70 dark:bg-executive-950/40 border border-executive-200 dark:border-executive-800 space-y-2">
                      <strong class="text-[15px] sm:text-[16px] font-bold text-executive-900 dark:text-white block">${cc.pair}</strong>
                      <div class="block-warning p-3 rounded-lg text-amber-950 dark:text-amber-100 font-semibold text-[14px] sm:text-[15px] leading-[1.6]">
                        ${cc.signal}
                      </div>
                      <div class="grid sm:grid-cols-2 gap-2.5 pt-1 text-[14px] sm:text-[15px]">
                        <div class="p-3 rounded-lg bg-white dark:bg-executive-900 border border-executive-200 dark:border-executive-800 space-y-1">
                          <strong class="font-bold text-executive-900 dark:text-white block">Primer Componente / Marco:</strong>
                          <p class="text-executive-700 dark:text-executive-300 leading-[1.6]">${cc.pdpDesc || cc.csfRole}</p>
                        </div>
                        <div class="p-3 rounded-lg bg-white dark:bg-executive-900 border border-executive-200 dark:border-executive-800 space-y-1">
                          <strong class="font-bold text-executive-900 dark:text-white block">Segundo Componente / Marco:</strong>
                          <p class="text-executive-700 dark:text-executive-300 leading-[1.6]">${cc.pepDesc || cc.ztRole}</p>
                        </div>
                      </div>
                      <p class="text-rose-800 dark:text-rose-300 text-[14px] italic"><strong class="font-bold">❌ Trampa de Examen:</strong> ${cc.trap}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- DUDAS FRECUENTES Y MITOS EN ZERO TRUST -->
            ${ztData.commonDoubts ? `
              <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4 shadow-xs">
                <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
                  <span class="text-[15px] font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                    <span>💡</span> Dudas frecuentes y mitos
                  </span>
                  <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">Dudas Frecuentes y Mitos en Zero Trust</h4>
                  <p class="text-[14px] text-executive-500 mt-0.5">Claridad conceptual indispensable para preguntas analíticas de examen:</p>
                </div>
                <div class="space-y-3">
                  ${ztData.commonDoubts.map(d => `
                    <div class="p-4 rounded-xl bg-executive-50/70 dark:bg-executive-950/40 border border-executive-200 dark:border-executive-800 space-y-1.5">
                      <strong class="text-executive-900 dark:text-white font-bold block text-[15px] sm:text-[16px] flex items-center gap-2">
                        <span class="text-indigo-600 dark:text-indigo-400 font-mono">Q:</span> ${d.question}
                      </strong>
                      <p class="text-executive-700 dark:text-executive-300 leading-[1.6] pl-5 text-[14px] sm:text-[15px]">${d.answer}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </section>
        ` : ''}

        <!-- ============================================================== -->
        <!-- BLOQUE 3: CIS CONTROLS V8.1 -->
        <!-- ============================================================== -->
        ${(refActiveTab === 'all' || refActiveTab === 'cis') ? `
          <section id="block-cis-controls" class="space-y-6 pt-4 border-t border-executive-200 dark:border-executive-800">
            <div class="border-b border-executive-200 dark:border-executive-800 pb-2">
              <span class="text-[15px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <span>🔧</span> Bloque 3 · Salvaguardas prácticas
              </span>
              <h3 class="text-xl sm:text-2xl font-bold text-executive-900 dark:text-white mt-1">${cisData.title}</h3>
              <p class="text-[15px] text-executive-600 dark:text-executive-300 mt-0.5">${cisData.subtitle}</p>
            </div>

            <p class="text-[16px] text-executive-700 dark:text-executive-300 leading-[1.7]">
              ${cisData.definition} En el curso CB05, los controles de CIS complementan a Protect (PR) y Detect (DE) ofreciendo acciones operativas específicas y medibles.
            </p>

            <!-- GRUPOS DE IMPLEMENTACIÓN (IG1, IG2, IG3) -->
            <div class="space-y-3">
              <h4 class="text-[17px] font-bold text-executive-900 dark:text-white">Grupos de Implementación (Implementation Groups - IGs):</h4>
              <div class="grid sm:grid-cols-3 gap-3">
                ${cisData.implementationGroups.map(ig => `
                  <div class="p-4 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-2 text-[14px] sm:text-[15px] shadow-xs">
                    <strong class="text-executive-900 dark:text-white font-bold block text-[15px] sm:text-[16px] text-emerald-700 dark:text-emerald-300">${ig.group}</strong>
                    <div class="text-executive-600 dark:text-executive-400"><strong>Para quién:</strong> ${ig.target}</div>
                    <div class="text-executive-700 dark:text-executive-300 leading-[1.6]"><strong>Foco:</strong> ${ig.focus}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- CONTROLES ESENCIALES CB05 EN PROFUNDIDAD (DEEP DIVE) -->
            ${cisData.essentialControlsDeepDive ? `
              <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4 shadow-xs">
                <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
                  <span class="text-[15px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <span>🎓</span> Enfoque curricular CB05
                  </span>
                  <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">Los 8 Controles Esenciales del Curso en Profundidad</h4>
                  <p class="text-[14px] text-executive-500 mt-0.5">Análisis de criticidad, alineación con NIST CSF 2.0 y fallas reales de auditoría:</p>
                </div>
                <div class="grid sm:grid-cols-2 gap-3.5">
                  ${cisData.essentialControlsDeepDive.map(cd => `
                    <div class="p-4 rounded-xl bg-executive-50/70 dark:bg-executive-950/40 border border-executive-200 dark:border-executive-800 space-y-2 text-[14px] sm:text-[15px]">
                      <div class="flex items-center justify-between gap-2">
                        <strong class="text-executive-900 dark:text-white font-bold text-[15px] sm:text-[16px]">${cd.name}</strong>
                        <span class="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-bold whitespace-nowrap">${cd.csfAlignment}</span>
                      </div>
                      <div class="space-y-1">
                        <span class="text-executive-600 dark:text-executive-400 font-semibold block text-[12px] uppercase tracking-wider">¿Por qué es crítico?</span>
                        <p class="text-executive-800 dark:text-executive-200 leading-[1.6]">${cd.whyCritical}</p>
                      </div>
                      <div class="space-y-1 pt-1 border-t border-executive-200/60 dark:border-executive-800/60">
                        <span class="text-rose-600 dark:text-rose-400 font-semibold block text-[12px] uppercase tracking-wider">Falla real en la práctica:</span>
                        <p class="text-rose-950 dark:text-rose-200 leading-[1.6] italic">${cd.realWorldFailure}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- CONTROLES DESTACADOS EN EL CURSO -->
            <div class="block-warning p-5 sm:p-6 rounded-xl space-y-3">
              <strong class="text-[15px] sm:text-[16px] font-bold text-amber-950 dark:text-amber-100 flex items-center gap-1.5">
                <span>⭐</span> Controles de CIS Clave Vistos en las Sesiones CB05:
              </strong>
              <div class="grid sm:grid-cols-2 gap-3">
                ${cisData.courseSpotlight.map(cs => `
                  <div class="p-3.5 rounded-lg bg-white/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1">
                    <div class="flex items-center justify-between font-bold">
                      <span class="text-amber-950 dark:text-amber-100 text-[15px]">${cs.control}</span>
                      <span class="font-mono text-[11px] px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">${cs.session}</span>
                    </div>
                    <p class="text-amber-900 dark:text-amber-200 leading-[1.6] text-[14px]">${cs.note}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- LOS 18 CONTROLES CONDENSADOS (1 LÍNEA EN PALABRAS PROPIAS) -->
            <div class="space-y-3">
              <h4 class="text-[17px] font-bold text-executive-900 dark:text-white">Los 18 Controles de CIS (Resumen en Palabras Propias):</h4>
              <div class="grid sm:grid-cols-2 gap-2.5">
                ${cisData.controlsList.map(ctrl => `
                  <div class="p-3.5 rounded-xl border border-executive-200 dark:border-executive-800 ${ctrl.courseHighlight ? 'bg-blue-50/40 dark:bg-blue-950/20 border-l-4 border-blue-500' : 'bg-white dark:bg-[#0f172a]'} space-y-1 shadow-xs">
                    <div class="flex items-center justify-between">
                      <span class="font-mono font-bold text-executive-900 dark:text-white text-[14px] sm:text-[15px]">Control ${ctrl.id}: ${ctrl.name}</span>
                      ${ctrl.courseHighlight ? '<span class="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">En el curso</span>' : ''}
                    </div>
                    <p class="text-executive-600 dark:text-executive-300 leading-[1.6] text-[14px]">${ctrl.summary}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- CONFUSIONES CLAVE ENTRE CONTROLES CIS -->
            ${cisData.controlConfusions ? `
              <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4 shadow-xs">
                <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
                  <span class="text-[15px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <span>⚠️</span> Puntos críticos de confusión
                  </span>
                  <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">Confusiones Clave entre Controles CIS</h4>
                  <p class="text-[14px] text-executive-500 mt-0.5">Diferencias prácticas entre salvaguardas que suelen confundirse en preguntas de escenario:</p>
                </div>
                <div class="space-y-4">
                  ${cisData.controlConfusions.map(ctrlC => `
                    <div class="p-4 rounded-xl bg-executive-50/70 dark:bg-executive-950/40 border border-executive-200 dark:border-executive-800 space-y-2">
                      <strong class="text-[15px] sm:text-[16px] font-bold text-executive-900 dark:text-white block">${ctrlC.pair}</strong>
                      <div class="block-warning p-3 rounded-lg text-amber-950 dark:text-amber-100 font-semibold text-[14px] sm:text-[15px] leading-[1.6]">
                        ${ctrlC.signal}
                      </div>
                      <div class="grid sm:grid-cols-2 gap-2.5 pt-1 text-[14px] sm:text-[15px]">
                        <div class="p-3 rounded-lg bg-white dark:bg-executive-900 border border-executive-200 dark:border-executive-800 space-y-1">
                          <strong class="font-bold text-executive-900 dark:text-white block">Primer Control:</strong>
                          <p class="text-executive-700 dark:text-executive-300 leading-[1.6]">${ctrlC.c5Desc || ctrlC.c10Desc}</p>
                        </div>
                        <div class="p-3 rounded-lg bg-white dark:bg-executive-900 border border-executive-200 dark:border-executive-800 space-y-1">
                          <strong class="font-bold text-executive-900 dark:text-white block">Segundo Control:</strong>
                          <p class="text-executive-700 dark:text-executive-300 leading-[1.6]">${ctrlC.c6Desc || ctrlC.c13Desc}</p>
                        </div>
                      </div>
                      <p class="text-rose-800 dark:text-rose-300 text-[14px] italic"><strong class="font-bold">❌ Trampa de Examen:</strong> ${ctrlC.trap}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- DUDAS FRECUENTES EN CIS CONTROLS -->
            ${cisData.commonDoubts ? `
              <div class="p-6 sm:p-7 rounded-xl border border-executive-200 dark:border-executive-800 bg-white dark:bg-[#0f172a] space-y-4 shadow-xs">
                <div class="border-b border-executive-100 dark:border-executive-800 pb-2">
                  <span class="text-[15px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <span>💡</span> Dudas frecuentes en la práctica
                  </span>
                  <h4 class="text-[18px] sm:text-[19px] font-bold text-executive-900 dark:text-white mt-0.5">Dudas Frecuentes en la Aplicación de CIS Controls</h4>
                  <p class="text-[14px] text-executive-500 mt-0.5">Respuestas directas con base en estándares de auditoría:</p>
                </div>
                <div class="space-y-3">
                  ${cisData.commonDoubts.map(d => `
                    <div class="p-4 rounded-xl bg-executive-50/70 dark:bg-executive-950/40 border border-executive-200 dark:border-executive-800 space-y-1.5">
                      <strong class="text-executive-900 dark:text-white font-bold block text-[15px] sm:text-[16px] flex items-center gap-2">
                        <span class="text-emerald-600 dark:text-emerald-400 font-mono">Q:</span> ${d.question}
                      </strong>
                      <p class="text-executive-700 dark:text-executive-300 leading-[1.6] pl-5 text-[14px] sm:text-[15px]">${d.answer}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </section>
        ` : ''}

      </div>
    `;

    container.innerHTML = html;
  }

  function getFilteredReferenceHtml(data) {
    const q = refFilterQuery.toLowerCase().trim();
    const filteredFuncs = data.functions.filter(f => {
      if (refFilterFunc !== 'ALL' && f.code !== refFilterFunc) return false;
      return true;
    });

    return filteredFuncs.map(fn => {
      const cats = fn.categories.filter(c => {
        if (!q) return true;
        return c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.clue.toLowerCase().includes(q);
      });

      if (cats.length === 0) return '';

      return `
        <div class="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 space-y-4 shadow-xs">
          <div class="border-b border-executive-100 dark:border-executive-800 pb-2 flex items-center gap-2">
            <span class="font-mono text-xs font-bold px-2.5 py-1 rounded bg-executive-200 dark:bg-executive-800 text-executive-900 dark:text-white">${fn.code}</span>
            <h3 class="text-[17px] sm:text-[18px] font-bold text-executive-900 dark:text-white">${fn.name}</h3>
          </div>
          <p class="text-[14px] text-executive-500">${fn.description}</p>

          <div class="grid sm:grid-cols-2 gap-3">
            ${cats.map(c => `
              <div class="p-4 rounded-xl border border-executive-200 dark:border-executive-800 bg-executive-50/50 dark:bg-executive-950/40 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-mono font-bold text-executive-900 dark:text-white text-[14px]">${c.code}</span>
                  <span class="font-semibold text-executive-800 dark:text-executive-200 text-[14px]">${c.name}</span>
                </div>
                <div class="p-3 rounded-lg bg-white dark:bg-[#0f172a] border border-executive-200 dark:border-executive-800 text-executive-700 dark:text-executive-300 text-[13px] sm:text-[14px] leading-[1.6]">
                  <strong>Pregunta clave:</strong> ${c.clue}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  window.handleRefSearch = function(val) {
    refFilterQuery = val;
    const box = document.getElementById('ref-results-list');
    if (box && window.NIST_CSF_REFERENCE) {
      box.innerHTML = getFilteredReferenceHtml(window.NIST_CSF_REFERENCE);
    }
  };

  window.handleRefFuncFilter = function(code) {
    refFilterFunc = code;
    renderReference();
  };

  window.handleRefTab = function(tab) {
    refActiveTab = tab;
    renderReference();
  };

  // AUXILIARES
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  // EXPORTACIÓN EXPLÍCITA AL OBJETO WINDOW (PARA ACCESO GLOBAL Y EVENT HANDLERS EN LÍNEA)
  window.renderSession = renderSession;
  window.renderReference = renderReference;
  window.renderRaciModule = renderRaciModule;
  window.renderDetective = renderDetective;
  window.renderDetectiveDetailPanel = renderDetectiveDetailPanel;
  window.renderConceptCard = renderConceptCard;
  window.renderConceptCardById = renderConceptCardById;

  // INICIALIZACIÓN GLOBAL
  document.addEventListener('DOMContentLoaded', () => {
    loadState();
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryTheme = urlParams.get('theme');
      if (queryTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (queryTheme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        initTheme();
      }
      const initialView = urlParams.get('view') || (window.location.hash ? window.location.hash.replace('#', '') : null) || 'view-session';
      const initialSession = urlParams.get('session') || appState.currentSessionId || 's2';
      window.navigateTo(initialView, initialSession);
    } catch (e) {
      initTheme();
      window.navigateTo('view-session', appState.currentSessionId || 's2');
    }
  });

})();
