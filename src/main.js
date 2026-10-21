import './style.css';
import './refinements.css';
import './sections.css';

const assets = `${import.meta.env.BASE_URL}assets/`;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.documentElement.classList.toggle('motion-ready', !reducedMotion.matches);

const paths = {
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  shield: '<path d="m12 3 8 4v5c0 5-8 9-8 9s-8-4-8-9V7z"/><path d="m8 12 3 3 5-6"/>',
  book: '<path d="M12 5v16M3 3c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2Z"/>',
  sprout: '<path d="M12 21v-9C4 14 2 8 3 4c5 0 9 2 9 8 0-6 4-8 9-8 1 5-1 10-9 8"/>',
  cap: '<path d="m2 8 10-5 10 5-10 5zM6 10v7c4 3 8 3 12 0v-7M22 8v8"/>',
  play: '<path d="m9 5 11 7-11 7z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  send: '<path d="m22 2-7 20-4-9L2 9zM11 13 22 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/><path d="M16 3a4 4 0 0 1 0 8"/>',
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
const brand = `<img src="${assets}crest.svg" alt="" width="58" height="64" /><span class="brand-words"><strong>Colegio Aragón</strong><small>EXCELENCIA EDUCATIVA</small></span>`;
const facilities = [
  { key: 'cancha', title: 'Cancha deportiva', image: 'infraestructura-cancha.webp', alt: 'Cancha escolar con arcos y aros de básquetbol, imagen genérica creada con IA', description: 'Un espacio para imaginar encuentros, juegos y nuevos desafíos en equipo.' },
  { key: 'informatica', title: 'Sala de informática', image: 'infraestructura-informatica.webp', alt: 'Sala de informática luminosa con computadores y mesas, imagen genérica creada con IA', description: 'Tecnología y curiosidad para explorar nuevas formas de aprender.' },
  { key: 'biblioteca', title: 'Biblioteca', image: 'infraestructura-biblioteca.webp', alt: 'Biblioteca escolar con libros y rincones de lectura, imagen genérica creada con IA', description: 'Historias, ideas y un lugar tranquilo para descubrir otros mundos.' },
];
const activities = [
  { category: 'SALIDAS PEDAGÓGICAS', title: 'Aprender fuera de la sala', image: 'actividad-salida.webp', alt: 'Escolares explorando un jardín junto a sus profesoras, imagen ilustrativa IA', description: 'Explorar la naturaleza, hacer preguntas y descubrir juntos lo que nos rodea.' },
  { category: 'CIENCIA Y CURIOSIDAD', title: 'Pequeñas ideas, grandes descubrimientos', image: 'actividad-ciencia.webp', alt: 'Niños compartiendo sus proyectos en una feria de ciencias, imagen ilustrativa IA', description: 'Una muestra de proyectos para experimentar, crear y aprender en equipo.' },
  { category: 'ARTE Y VIDA ESCOLAR', title: 'Una comunidad llena de color', image: 'actividad-arte.webp', alt: 'Niños pintando juntos durante una actividad al aire libre, imagen ilustrativa IA', description: 'Pinceles, juegos y creatividad para compartir una jornada diferente.' },
];

document.querySelector('#app').innerHTML = `
  <div class="utility"><div class="container"><span>Un lugar para aprender. Una comunidad para crecer.</span><button data-contact>Conversemos ${icon('arrow')}</button></div></div>
  <header class="header">
    <div class="container nav-wrap">
      <a class="brand" href="#inicio" aria-label="Colegio Aragón, inicio">${brand}</a>
      <button class="menu-toggle icon-button" aria-label="Abrir menú" aria-expanded="false" aria-controls="navigation">${icon('menu')}</button>
      <nav id="navigation" aria-label="Navegación principal">
        <a href="#infraestructura">Infraestructura</a><a href="#niveles">Niveles educativos</a><a href="#familias">Nuestras familias</a><a href="#actividades">Actividades</a><a href="#admision">Admisión ${icon('down')}</a>
        <button class="button button-navy nav-contact" data-contact>Hablemos ${icon('arrow')}</button>
      </nav>
    </div>
  </header>
  <main id="contenido">
    <section class="hero" id="inicio" aria-label="Bienvenidos a Colegio Aragón">
      <video id="hero-video" class="hero-video" autoplay muted loop playsinline preload="metadata" poster="${assets}hero.webp" aria-label="Recorrido visual ilustrativo del colegio, creado con imágenes de inteligencia artificial"><source src="${assets}colegio.mp4" type="video/mp4" /></video>
      <div class="hero-shade"></div>
      <div class="container hero-content">
        <div class="eyebrow light"><span></span> BIENVENIDOS A COLEGIO ARAGÓN</div>
        <h1>Excelencia que<br>forma <em>personas.</em></h1>
        <p>El lugar donde tus hijos se sienten seguros,<br class="desktop-break"> descubren sus talentos y crecen acompañados.</p>
        <a class="hero-link" href="#infraestructura">Conoce nuestra comunidad <span class="circle-arrow">${icon('arrow')}</span></a>
      </div>
      <div class="admission-entry container" id="admision" role="group" aria-label="Procesos de admisión">
        <button class="year-card year-light reveal" data-admission="2026"><span class="year-label">CONSTRUYAMOS SU PRESENTE</span><span class="year-title">Admisión <em>2026</em></span><span class="year-detail">Conoce el proceso <span class="year-arrow">${icon('diagonal')}</span></span></button>
        <button class="year-card year-gold reveal" data-admission="2027"><span class="year-label">IMAGINEMOS LO QUE VIENE</span><span class="year-title">Admisión <em>2027</em></span><span class="year-detail">Conoce el proceso <span class="year-arrow">${icon('diagonal')}</span></span></button>
      </div>
      <div class="container hero-bottom"><a href="#niveles" class="scroll-hint"><span class="scroll-mouse"></span> Un futuro que comienza aquí</a><button id="video-control" class="video-control" aria-label="Pausar video de portada">${icon('pause')} <span>Pausar video</span></button></div>
    </section>

    <section class="values container" aria-label="Lo que nos inspira">
      <div class="value reveal"><span class="value-icon">${icon('shield')}</span><div><h3>La tranquilidad de saberlos bien</h3><p>Un entorno que cuida y acompaña.</p></div></div>
      <div class="value reveal"><span class="value-icon">${icon('heart')}</span><div><h3>Cercanos en cada etapa</h3><p>Crecemos junto a cada familia.</p></div></div>
      <div class="value reveal"><span class="value-icon">${icon('book')}</span><div><h3>Mucho más que aprender</h3><p>Personas preparadas para la vida.</p></div></div>
    </section>

    <section class="levels section-space" id="niveles">
      <div class="container">
        <div class="section-heading reveal"><div><span class="eyebrow">UN CAMINO, MUCHAS POSIBILIDADES</span><h2>Creciendo juntos,<br><em>etapa a etapa.</em></h2></div><p>Desde los primeros descubrimientos hasta los grandes<br class="desktop-break"> desafíos. Acompañamos su forma única de crecer.</p></div>
        <div class="level-grid">
          <button class="level-card reveal" data-level="prebasica"><img src="${assets}prebasica.webp" alt="Niños pequeños descubriendo y aprendiendo juntos en una sala de clases, imagen ilustrativa IA" loading="lazy" /><span class="level-shade"></span><span class="level-content"><span class="level-number">01 / LOS PRIMEROS DESCUBRIMIENTOS</span><span class="level-title">Prebásica</span><span class="level-caption">Aprender comienza con la curiosidad.</span></span><span class="level-arrow">${icon('diagonal')}</span></button>
          <button class="level-card reveal" data-level="basica"><img src="${assets}hero.webp" alt="Escolares compartiendo con su profesora en un patio, imagen ilustrativa IA" loading="lazy" /><span class="level-shade"></span><span class="level-content"><span class="level-number">02 / RAÍCES PARA CRECER</span><span class="level-title">Básica</span><span class="level-caption">Confianza para descubrir su mundo.</span></span><span class="level-arrow">${icon('diagonal')}</span></button>
          <button class="level-card reveal" data-level="media"><img src="${assets}media.webp" alt="Estudiantes de enseñanza media colaborando en un proyecto, imagen ilustrativa IA" loading="lazy" /><span class="level-shade"></span><span class="level-content"><span class="level-number">03 / UN FUTURO POR CONSTRUIR</span><span class="level-title">Media</span><span class="level-caption">Herramientas para elegir su camino.</span></span><span class="level-arrow">${icon('diagonal')}</span></button>
        </div>
        <p class="media-disclosure">Imágenes y video ilustrativos creados con IA. Pronto conocerás a nuestra comunidad en fotografías propias.</p>
      </div>
    </section>

    <section class="infrastructure section-space" id="infraestructura" aria-labelledby="infrastructure-title"><div class="container">
      <div class="section-heading reveal"><div><span class="eyebrow">ESPACIOS PARA DESCUBRIR</span><h2 id="infrastructure-title">Conoce nuestra<br><em>infraestructura.</em></h2></div><p>Un recorrido por los espacios donde aprender,<br class="desktop-break"> compartir y crecer toma forma.</p></div>
      <div class="facility-grid">${facilities.map((facility, index) => `
        <button class="facility-card reveal" data-facility="${facility.key}" aria-label="Ver foto de ${facility.title}">
          <img src="${assets}${facility.image}" alt="${facility.alt}" loading="lazy" />
          <span class="facility-shade"></span><span class="facility-number">0${index + 1} / NUESTROS ESPACIOS</span>
          <span class="facility-caption"><span class="facility-title">${facility.title}</span><span class="facility-action">Explora el espacio ${icon('diagonal')}</span></span>
        </button>`).join('')}
      </div>
      <p class="section-disclosure reveal">Galería de referencia con imágenes genéricas creadas con IA. Los espacios y sus fotografías se confirmarán con el colegio.</p>
    </div>
    </section>

    <section class="families section-space" id="familias"><div class="container">
      <div class="family-heading reveal"><div><span class="eyebrow light">VOCES QUE NOS ACERCAN</span><h2>La confianza tiene rostro.<br><em>Y una historia que contar.</em></h2></div><p>Elegir un colegio también es sentirse parte.<br>Un espacio para las voces de nuestra comunidad.</p></div>
      <div class="family-layout">
        <button class="family-film reveal" data-story-video aria-label="Reproducir video de ejemplo de familias">
          <img src="${assets}familias-portada.webp" alt="Una pareja de apoderados durante una entrevista ilustrativa creada con IA" loading="lazy" />
          <span class="film-shade"></span><span class="film-label">HISTORIAS QUE NOS UNEN</span>
          <span class="film-play">${icon('play')}</span>
          <span class="film-caption"><span class="film-title">Crecer juntos,<br>sentirse en casa.</span><span class="film-action">Ver video de ejemplo ${icon('arrow')}</span></span>
          <span class="film-duration">00:30</span>
        </button>
        <article class="quote-card reveal" aria-live="polite" aria-atomic="true">
          <div class="quote-photo"><img id="quote-photo" src="${assets}familia-madre.webp" alt="Madre e hija en un jardín escolar, imagen ilustrativa IA" loading="lazy" /><span class="quote-photo-tag">VOCES DE FAMILIAS</span></div>
          <div class="quote-body"><span class="quote-mark" aria-hidden="true">“</span><p id="quote-text">Queremos un lugar donde nuestros hijos aprendan con alegría y se sientan acompañados en cada paso.</p><div class="quote-person"><span class="avatar">${icon('heart')}</span><div><strong id="quote-person">Una familia, una nueva historia</strong><span>Testimonio de ejemplo · imagen ilustrativa IA</span></div></div>
          <div class="quote-navigation"><span id="quote-position">01 / 03</span><div class="quote-controls"><button class="icon-button quote-prev" aria-label="Testimonio anterior">${icon('arrow')}</button><button class="icon-button quote-next" aria-label="Testimonio siguiente">${icon('arrow')}</button></div></div></div>
        </article>
      </div>
      <p class="family-disclosure reveal">Una muestra de cómo contaremos sus historias. Fotografías, relatos y video de ejemplo creados con IA; no corresponden a testimonios reales.</p>
    </div></section>

    <section class="activities section-space" id="actividades" aria-labelledby="activities-title"><div class="container">
      <div class="section-heading reveal"><div><span class="eyebrow">ASÍ SE VIVE LA VIDA ESCOLAR</span><h2 id="activities-title">Nuestras últimas<br><em>actividades.</em></h2></div><p>Momentos para aprender de otra manera.<br class="desktop-break"> Recuerdos para seguir creciendo juntos.</p></div>
      <div class="activity-grid">${activities.map(activity => `
        <article class="activity-card reveal"><div class="activity-photo"><img src="${assets}${activity.image}" alt="${activity.alt}" loading="lazy" /></div>
          <div class="activity-copy"><span class="activity-category">${activity.category}</span><h3>${activity.title}</h3><p>${activity.description}</p></div>
        </article>`).join('')}
      </div>
      <p class="section-disclosure reveal">Actividades e imágenes de ejemplo. Pronto compartiremos las experiencias reales de nuestra comunidad.</p>
    </div></section>

    <section class="contact-section section-space container" id="contacto"><div class="contact-banner reveal"><span class="contact-decoration" aria-hidden="true">${icon('sprout')}</span><div><span class="eyebrow">EL PRIMER PASO ES CONOCERNOS</span><h2>Hablemos del futuro<br>de tus hijos.</h2><p>Cuéntanos qué buscas. Nos encantará orientarte.</p></div><button class="button button-navy" data-contact>Conversemos ${icon('arrow')}</button></div></section>
  </main>
  <footer><div class="container footer-top"><a class="brand footer-brand" href="#inicio">${brand}</a><p>Excelencia que forma personas.<br>Cercanía que construye comunidad.</p><a href="#inicio" class="back-top">Volver arriba ${icon('arrow')}</a></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} Colegio Aragón</span><button data-privacy>Privacidad y uso de datos</button><span>Un futuro que construimos juntos.</span></div></footer>

  <dialog id="contact-dialog" class="contact-dialog" aria-labelledby="contact-title"><button class="dialog-close icon-button" data-close aria-label="Cerrar formulario">${icon('close')}</button><div class="contact-dialog-heading"><span class="eyebrow">ESTAMOS PARA ACOMPAÑARTE</span><h2 id="contact-title">Conozcámonos.</h2><p>El primer paso para una gran historia.</p></div><form id="contact-form"><label for="name">Nombre completo</label><input id="name" name="name" autocomplete="name" placeholder="Tu nombre" required maxlength="120" /><label for="email">Correo electrónico</label><input id="email" name="email" type="email" autocomplete="email" placeholder="tucorreo@ejemplo.com" required maxlength="200" /><label for="subject">Asunto</label><input id="subject" name="subject" placeholder="¿En qué podemos ayudarte?" required maxlength="180" /><label for="message">Mensaje</label><textarea id="message" name="message" rows="3" placeholder="Escribe tu mensaje aquí…" required maxlength="3000"></textarea><p class="form-note">Esta es una vista previa. El envío de mensajes y la protección antispam aún no están habilitados. No ingreses datos sensibles.</p><button type="submit" class="button button-gold submit-button">Enviar mensaje ${icon('send')}</button><p class="form-status" role="status" id="form-status"></p></form></dialog>
  <dialog id="detail-dialog" class="detail-dialog" aria-labelledby="detail-title"><button class="dialog-close icon-button" data-close aria-label="Cerrar información">${icon('close')}</button><div id="detail-content"></div></dialog>
`;

const contactDialog = document.querySelector('#contact-dialog');
const detailDialog = document.querySelector('#detail-dialog');
let lastFocused;
const openDialog = (dialog) => {
  lastFocused = document.activeElement;
  for (const other of document.querySelectorAll('dialog[open]')) other.close();
  dialog.showModal();
  document.body.classList.add('dialog-open');
};
const closeDialog = (dialog) => dialog.close();
for (const dialog of [contactDialog, detailDialog]) {
  dialog.querySelector('[data-close]').addEventListener('click', () => closeDialog(dialog));
  dialog.addEventListener('click', event => {
    const r = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) closeDialog(dialog);
  });
  dialog.addEventListener('close', () => {
    dialog.querySelectorAll('video').forEach(player => player.pause());
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open');
    lastFocused?.focus({ preventScroll: true });
  });
}

function openContact(subject = '') {
  document.querySelector('#subject').value = subject;
  document.querySelector('#form-status').textContent = '';
  openDialog(contactDialog);
}
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => openContact()));
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#form-status').textContent = 'El formulario está en modo demostración: no se envió ni guardó ningún dato. Habilitaremos el contacto cuando el colegio confirme el correo de recepción.';
});

const levels = {
  prebasica: { title: 'Prebásica', eyebrow: 'LOS PRIMEROS DESCUBRIMIENTOS', photo: 'prebasica', intro: 'Pequeños pasos. Grandes descubrimientos.', copy: 'Un espacio para explorar, jugar y aprender con confianza. Aquí comienza una nueva etapa para los niños y también para sus familias.', features: ['Aprender a través del juego', 'Vínculos cercanos y acompañamiento', 'Curiosidad, autonomía y expresión'] },
  basica: { title: 'Enseñanza Básica', eyebrow: 'RAÍCES PARA CRECER', photo: 'hero', intro: 'La confianza para descubrir su mundo.', copy: 'Una etapa para hacer preguntas, construir amistades y descubrir nuevas capacidades, con una comunidad que acompaña cada avance.', features: ['Bases para nuevos aprendizajes', 'Convivencia y sentido de comunidad', 'Espacios para descubrir sus intereses'] },
  media: { title: 'Enseñanza Media', eyebrow: 'UN FUTURO POR CONSTRUIR', photo: 'media', intro: 'Crecer también es elegir un camino.', copy: 'Una etapa para desarrollar autonomía, explorar intereses y mirar el futuro con confianza, acompañados por su comunidad educativa.', features: ['Pensamiento crítico y autonomía', 'Colaboración y desarrollo personal', 'Exploración de proyectos de vida'] },
};
document.querySelectorAll('[data-level]').forEach(button => button.addEventListener('click', () => {
  const level = levels[button.dataset.level];
  document.querySelector('#detail-content').innerHTML = `<img class="detail-cover" src="${assets}${level.photo}.webp" alt="Representación ilustrativa del nivel ${level.title}" /><div class="detail-body"><span class="eyebrow">${level.eyebrow}</span><h2 id="detail-title">${level.title}</h2><h3>${level.intro}</h3><p>${level.copy}</p><ul class="feature-list">${level.features.map(item => `<li>${icon('check')}${item}</li>`).join('')}</ul><p class="detail-note">Presentación ilustrativa. La propuesta educativa y los niveles disponibles deben ser confirmados por el colegio.</p><button class="button button-navy" id="level-contact">Quiero saber más ${icon('arrow')}</button></div>`;
  document.querySelector('#level-contact').addEventListener('click', () => openContact(`Consulta sobre ${level.title}`));
  openDialog(detailDialog);
}));

document.querySelectorAll('[data-facility]').forEach(button => button.addEventListener('click', () => {
  const facility = facilities.find(item => item.key === button.dataset.facility);
  document.querySelector('#detail-content').innerHTML = `<img class="facility-preview" src="${assets}${facility.image}" alt="${facility.alt}" /><div class="detail-body"><span class="eyebrow">UN ESPACIO PARA CADA DESCUBRIMIENTO</span><h2 id="detail-title">${facility.title}</h2><p>${facility.description}</p><p class="detail-note">Imagen genérica creada con IA. No representa una instalación real ni confirma los espacios disponibles en Colegio Aragón.</p></div>`;
  openDialog(detailDialog);
}));

function showAdmission(year) {
  document.querySelector('#detail-content').innerHTML = `<div class="admission-dialog-head"><span class="eyebrow light">CADA GRAN HISTORIA TIENE UN COMIENZO</span><h2 id="detail-title">Admisión <em>${year}</em></h2><p>Conozcámonos, paso a paso.</p><div class="year-tabs" role="group" aria-label="Seleccionar año de admisión"><button data-year="2026" aria-pressed="${year === '2026'}">2026</button><button data-year="2027" aria-pressed="${year === '2027'}">2027</button></div></div><div class="detail-body"><p class="admission-notice">Guía ilustrativa de diseño. El colegio aún debe confirmar fechas, vacantes, requisitos y etapas para ${year}. No constituye una postulación.</p><div class="admission-steps"><article><img src="${assets}hero.webp" alt="Comunidad escolar, imagen ilustrativa" /><div><span class="step-number">01</span><h3>Conoce nuestra comunidad</h3><p>Explora los niveles y cuéntanos qué esperas de esta nueva etapa.</p></div></article><article><img src="${assets}prebasica.webp" alt="Aprendizaje en el aula, imagen ilustrativa" /><div><span class="step-number">02</span><h3>Resuelve tus preguntas</h3><p>Solicita orientación sobre el proceso ${year} y los requisitos del nivel que te interesa.</p></div></article><article><img src="${assets}media.webp" alt="Estudiantes compartiendo un proyecto, imagen ilustrativa" /><div><span class="step-number">03</span><h3>Descubre el siguiente paso</h3><p>El equipo de admisión podrá confirmar la información y las alternativas disponibles.</p></div></article></div><button class="button button-gold" id="admission-contact">Consultar por admisión ${year} ${icon('arrow')}</button></div>`;
  document.querySelectorAll('[data-year]').forEach(button => button.addEventListener('click', () => showAdmission(button.dataset.year)));
  document.querySelector('#admission-contact').addEventListener('click', () => openContact(`Consulta de admisión ${year}`));
}
document.querySelectorAll('[data-admission]').forEach(button => button.addEventListener('click', () => { showAdmission(button.dataset.admission); openDialog(detailDialog); }));
document.querySelector('[data-privacy]').addEventListener('click', () => {
  document.querySelector('#detail-content').innerHTML = `<div class="detail-body privacy-body"><span class="eyebrow">TU INFORMACIÓN IMPORTA</span><h2 id="detail-title">Privacidad</h2><p>Esta primera versión es una demostración visual. El formulario no transmite ni almacena los datos ingresados y no está conectado a un servicio de contacto.</p><p>Usamos el almacenamiento de sesión de tu navegador únicamente para recordar que ya se mostró la ventana de contacto durante esta visita. No se usan herramientas de publicidad ni analítica.</p><p>Las imágenes son ilustraciones generadas con inteligencia artificial y no representan a estudiantes ni instalaciones reales del colegio. Los testimonios son ejemplos de diseño.</p><p>Antes de habilitar la recepción de mensajes, se incorporarán la política de privacidad definitiva, el destinatario autorizado y la protección antispam.</p></div>`;
  openDialog(detailDialog);
});

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
menu.addEventListener('click', () => {
  const opened = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(opened));
  nav.classList.toggle('is-open', opened);
});
nav.querySelectorAll('a, button').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const video = document.querySelector('#hero-video');
const control = document.querySelector('#video-control');
function syncVideoControl() {
  const paused = video.paused;
  control.innerHTML = `${icon(paused ? 'play' : 'pause')} <span>${paused ? 'Reproducir video' : 'Pausar video'}</span>`;
  control.setAttribute('aria-label', paused ? 'Reproducir video de portada' : 'Pausar video de portada');
}
video.addEventListener('play', syncVideoControl);
video.addEventListener('pause', syncVideoControl);
video.addEventListener('error', () => { control.hidden = true; });
control.addEventListener('click', () => { if (video.paused) video.play().catch(() => {}); else video.pause(); });
function applyMotionPreference() {
  document.documentElement.classList.toggle('motion-ready', !reducedMotion.matches);
  if (reducedMotion.matches) video.pause();
}
reducedMotion.addEventListener('change', applyMotionPreference);
applyMotionPreference();

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
  // Rearm only elements that have moved below the viewport, never those just
  // leaving through the top. This avoids flicker during downward scrolling.
  else if (entry.boundingClientRect.top >= window.innerHeight) entry.target.classList.remove('visible');
}), { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const quotes = [
  ['Queremos un lugar donde nuestros hijos aprendan con alegría y se sientan acompañados en cada paso.', 'Una familia, una nueva historia', 'familia-madre.webp', 'Madre e hija en un jardín escolar, imagen ilustrativa IA'],
  ['Conocer a las personas que acompañarán a nuestros hijos hace que una gran decisión se sienta más cercana.', 'La confianza comienza al conocernos', 'familia-padre.webp', 'Padre e hijo compartiendo en el colegio, imagen ilustrativa IA'],
  ['Crecer es atreverse a descubrir. Acompañarlos con cariño y confianza hace toda la diferencia.', 'Un camino que compartimos', 'familias-portada.webp', 'Pareja de apoderados en un patio escolar, imagen ilustrativa IA'],
];
let quoteIndex = 0;
function changeQuote(direction) {
  quoteIndex = (quoteIndex + direction + quotes.length) % quotes.length;
  document.querySelector('#quote-text').textContent = quotes[quoteIndex][0];
  document.querySelector('#quote-person').textContent = quotes[quoteIndex][1];
  document.querySelector('#quote-photo').src = `${assets}${quotes[quoteIndex][2]}`;
  document.querySelector('#quote-photo').alt = quotes[quoteIndex][3];
  document.querySelector('#quote-position').textContent = `0${quoteIndex + 1} / 03`;
  if (!reducedMotion.matches) document.querySelector('.quote-body').animate(
    [{ opacity: 0.35, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 400, easing: 'ease-out' },
  );
}
document.querySelector('.quote-prev').addEventListener('click', () => changeQuote(-1));
document.querySelector('.quote-next').addEventListener('click', () => changeQuote(1));

document.querySelector('[data-story-video]').addEventListener('click', () => {
  video.pause();
  document.querySelector('#detail-content').innerHTML = `<div class="story-dialog-heading"><span class="eyebrow">HISTORIAS QUE NOS UNEN</span><h2 id="detail-title">Crecer juntos,<br><em>sentirse en casa.</em></h2><p>Video de ejemplo · recreación ilustrativa con IA</p></div><video id="family-video" class="family-video" controls playsinline preload="metadata" poster="${assets}familias-portada.webp" aria-label="Video de ejemplo de familias, con imágenes IA y narración sintética en español"><source src="${assets}familias-ejemplo.mp4" type="video/mp4" /><track kind="captions" src="${assets}familias-es.vtt" srclang="es" label="Español" default /></video><div class="story-dialog-note"><p>Imágenes y voz sintéticas para mostrar el formato de esta sección. No es una entrevista real ni representa experiencias de apoderados del colegio.</p><details><summary>Leer el relato de ejemplo</summary><p>Como familia, buscamos un lugar donde nuestros hijos puedan aprender con alegría y sentirse seguros. Para nosotros, la cercanía y la confianza son lo más importante. Queremos acompañarlos en sus primeros descubrimientos y verlos crecer con personas que los escuchen. Porque elegir colegio también es elegir una comunidad.</p></details></div>`;
  openDialog(detailDialog);
  document.querySelector('#family-video').play().catch(() => { /* Native controls remain available if autoplay is restricted. */ });
});

let contactSeen = false;
try { contactSeen = sessionStorage.getItem('aragon-contact-seen') === 'yes'; } catch { /* Storage can be unavailable in private contexts. */ }
if (!contactSeen) setTimeout(() => {
  if (document.querySelector('dialog[open]') || menu.getAttribute('aria-expanded') === 'true') return;
  try { sessionStorage.setItem('aragon-contact-seen', 'yes'); } catch { /* The dialog remains usable without storage. */ }
  openContact();
}, 2200);
