# Colegio Aragón

Primera propuesta visual para familias que buscan colegio. Página vertical, adaptable a celular, en azul marino, blanco y dorado. Construida con Vite, JavaScript y CSS, sin servicios externos necesarios para visualizarla.

## Desarrollo

Desde `/workspace/pagina-web-aragon`, con Node.js 22.12 o posterior (validado con Node 24):

```sh
npm ci
npm run dev -- --port 5173
```

```sh
npm run build
npm run preview -- --port 4173
```

La compilación estática se genera en `dist/`. La disponibilidad pública debe comprobarse después del despliegue; una compilación local no publica el sitio.

## Publicación gratuita en GitHub Pages

El flujo `.github/workflows/pages.yml` compila y publica al recibir cambios en `main`, o al ejecutarlo manualmente desde GitHub Actions. Usa el token automático de GitHub Actions; no requiere claves añadidas al código.

En el repositorio de GitHub, entrar a **Settings → Pages → Build and deployment → Source** y seleccionar **GitHub Actions**. El alojamiento gratuito presupone que el repositorio sea público o que la cuenta incluya Pages para repositorios privados. No cambiar la visibilidad sin autorización del propietario.

Para comprobar localmente las mismas rutas que usa este alojamiento:

```sh
VITE_BASE_PATH=/pagina-web-aragon/ npm run build
VITE_BASE_PATH=/pagina-web-aragon/ npm run preview -- --port 4180
```

La ruta interna que debe probarse es `/pagina-web-aragon/`. Las imágenes, el video y las fuentes deben cargar desde ese prefijo. Para alojamiento en la raíz de otro dominio, ejecutar `npm run build` sin `VITE_BASE_PATH`.

## Verificación

```sh
npm test
```

Pruebas de navegador en escritorio (1440 px) y celular (390 px): carga de recursos, reproducción y pausa de video, aparición del formulario una vez por sesión, ambos años de admisión, los tres niveles, validación del formulario, navegación, privacidad, testimonios y movimiento reducido. Playwright usa `/usr/bin/chromium` cuando existe; se puede indicar otra instalación con `CHROMIUM_PATH`. En otra máquina se puede instalar Chromium mediante `npx playwright install chromium`.

## Interacciones

- Formulario emergente después de 2,2 segundos, con cierre, navegación por teclado y una aparición por sesión. También se abre desde los botones de contacto.
- Admisión 2026 y 2027 aparecen sobre la parte inferior del video de portada, con tipografía y colores coordinados. Muestran una guía visual independiente, con selector de año y consulta contextual.
- Prebásica, Básica y Media abren su presentación y permiten consultar por ese nivel.
- Tarjetas de niveles con un 33% más de altura que la propuesta inicial.
- Galería de infraestructura con imágenes ampliables de una cancha, una sala de informática y una biblioteca. Son referencias genéricas, no instalaciones confirmadas del colegio.
- Sección de últimas actividades con ejemplos de salidas pedagógicas, feria de ciencias y arte, y una descripción breve bajo cada fotografía. No se presentan como actividades efectivamente realizadas.
- Testimonios con fotografías que cambian con el relato y controles anterior y siguiente. Un apartado de video abre una pieza ilustrativa de 30 segundos con narración sintética en español, subtítulos y transcripción. No simula una entrevista real ni animación labial.
- Menú móvil y animaciones suaves de abajo hacia arriba al desplazarse. Los elementos pueden volver a animarse si se regresa a ellos, y respetan la preferencia de movimiento reducido.
- Se retiró el bloque «El sello Aragón» y se actualizaron sus enlaces para dirigirlos a infraestructura.
- Video local silencioso de 19 segundos, con pausa y respeto a la preferencia de movimiento reducido.

## Material provisional y pendientes antes de publicar

- Las fotografías fueron generadas con IA para este diseño. No representan al alumnado, los apoderados ni las instalaciones reales. Los videos son montajes animados de estas imágenes, no grabaciones reales. El ejemplo de familias incorpora voz sintética creada con eSpeak NG; está identificado como recreación y no representa una experiencia real. Los originales están en `/workspace/generated_images`; los WebP optimizados, los MP4 y los subtítulos usados por la web están en `public/assets/`.
- El escudo SVG es una recreación provisional inspirada en la referencia compartida; debe sustituirse por el archivo oficial del colegio. El nombre y la paleta siguen la referencia del usuario.
- Los textos educativos, las etapas de admisión y los testimonios son ejemplos identificados como tales. No se inventaron fechas, vacantes ni requisitos oficiales.
- El formulario valida campos pero **no envía ni almacena datos**. Nunca muestra un éxito de envío ficticio. Falta confirmar el correo o servicio receptor, conectar un backend con validación, incorporar la política definitiva y configurar protección antispam. No se simula una verificación Cloudflare.
- No se incluyen herramientas de analítica, publicidad ni fuentes de terceros en ejecución. Solo se usa `sessionStorage` para recordar la aparición del formulario.

## Tipografías y licencias

Manrope y DM Serif Display se sirven localmente. Proceden del repositorio oficial `google/fonts`; sus licencias OFL están incluidas en `public/assets/Manrope-OFL.txt` y `public/assets/DMSerif-OFL.txt`.

## Entorno en la nube

Usar el checkout existente; cada tarea ya tiene su entorno aislado y no necesita otro worktree. Las dependencias pueden persistir, pero el servidor debe iniciarse en cada nueva sesión. No se requieren secretos para revisar esta versión. Las instrucciones de instalación e inicio están guardadas en el borrador de configuración del entorno.
