import { test, expect } from '@playwright/test';

async function visit(page) {
  await page.addInitScript(() => sessionStorage.setItem('aragon-contact-seen', 'yes'));
  await page.goto('/');
}

test('la portada carga con imágenes, fuentes y video locales, sin errores', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await visit(page);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Excelencia queforma personas.');
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(image => image.decode());
  }
  await page.locator('#inicio').scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.fonts.ready.then(() => document.fonts.check('16px Manrope')))).toBe(true);
  await expect.poll(() => page.locator('#hero-video').evaluate(video => video.readyState)).toBeGreaterThanOrEqual(2);
  await expect.poll(() => page.locator('#hero-video').evaluate(video => video.currentTime)).toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Pausar video de portada' }).click();
  expect(await page.locator('#hero-video').evaluate(video => video.paused)).toBe(true);
  expect(errors).toEqual([]);
});

test('el contacto inicial se muestra una vez y puede cerrarse', async ({ page }) => {
  await page.goto('/');
  const dialog = page.getByRole('dialog', { name: 'Conozcámonos.' });
  await expect(dialog).toBeVisible({ timeout: 6000 });
  await expect(dialog.getByLabel('Nombre completo')).toBeVisible();
  await dialog.getByRole('button', { name: 'Cerrar formulario' }).click();
  await expect(dialog).not.toBeVisible();
  await page.reload();
  await page.waitForTimeout(2600);
  await expect(dialog).not.toBeVisible();
});

test('cada admisión abre su año y permite pasar a contacto', async ({ page }) => {
  await visit(page);
  for (const year of ['2026', '2027']) {
    await page.locator(`[data-admission="${year}"]`).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(`Admisión ${year}`);
    await expect(dialog.locator('.admission-steps article')).toHaveCount(3);
    await expect(dialog).toContainText(`requisitos y etapas para ${year}`);
    const other = year === '2026' ? '2027' : '2026';
    await dialog.getByRole('button', { name: other, exact: true }).click();
    await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(`Admisión ${other}`);
    await dialog.getByRole('button', { name: `Consultar por admisión ${other}` }).click();
    await expect(page.getByLabel('Asunto', { exact: true })).toHaveValue(`Consulta de admisión ${other}`);
    await page.getByRole('button', { name: 'Cerrar formulario' }).click();
  }
});

test('los tres niveles muestran información y contacto contextual', async ({ page }) => {
  await visit(page);
  for (const key of ['prebasica', 'basica', 'media']) {
    await page.locator(`[data-level="${key}"]`).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('.feature-list li')).toHaveCount(3);
    await expect(dialog).toContainText('deben ser confirmados por el colegio');
    const title = await dialog.getByRole('heading', { level: 2 }).textContent();
    await dialog.getByRole('button', { name: 'Quiero saber más' }).click();
    await expect(page.getByLabel('Asunto', { exact: true })).toHaveValue(`Consulta sobre ${title}`);
    await page.getByRole('button', { name: 'Cerrar formulario' }).click();
  }
});

test('el formulario valida y explica que no envía ni guarda datos', async ({ page }) => {
  await visit(page);
  await page.locator('.utility [data-contact]').click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: 'Enviar mensaje' }).click();
  expect(await dialog.locator('form').evaluate(form => form.checkValidity())).toBe(false);
  await dialog.getByLabel('Nombre completo').fill('Familia de prueba');
  await dialog.getByLabel('Correo electrónico').fill('familia@example.com');
  await dialog.getByLabel('Asunto', { exact: true }).fill('Admisión');
  await dialog.getByLabel('Mensaje', { exact: true }).fill('Quisiera conocer el colegio.');
  const posts = [];
  page.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
  await dialog.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(dialog.getByRole('status')).toContainText('no se envió ni guardó ningún dato');
  expect(posts).toEqual([]);
});

test('navegación adaptable y página sin desbordamiento horizontal', async ({ page }, testInfo) => {
  await visit(page);
  const mobile = testInfo.project.name === 'mobile';
  if (mobile) {
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'true');
  }
  await page.getByRole('navigation').getByRole('link', { name: 'Niveles educativos' }).click();
  await expect(page).toHaveURL(/#niveles$/);
  if (mobile) await expect(page.getByRole('navigation')).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.locator('[data-privacy]').click();
  await expect(page.getByRole('dialog')).toContainText('no transmite ni almacena');
  await page.getByRole('button', { name: 'Cerrar información' }).click();
});

test('los testimonios cambian y están identificados como ejemplos', async ({ page }) => {
  await visit(page);
  const quote = page.locator('#quote-text');
  const initial = await quote.textContent();
  const initialPhoto = await page.locator('#quote-photo').getAttribute('src');
  await page.getByRole('button', { name: 'Testimonio siguiente' }).click();
  await expect(quote).not.toHaveText(initial);
  await expect(page.locator('#quote-photo')).not.toHaveAttribute('src', initialPhoto);
  await expect(page.locator('#quote-position')).toHaveText('02 / 03');
  await page.getByRole('button', { name: 'Testimonio anterior' }).click();
  await expect(quote).toHaveText(initial);
  await expect(page.locator('.quote-person')).toContainText('Testimonio de ejemplo');
});

test('las admisiones están sobre el video y comparten la tipografía de portada', async ({ page }) => {
  await visit(page);
  const geometry = await page.evaluate(() => {
    const hero = document.querySelector('.hero').getBoundingClientRect();
    const titleFont = getComputedStyle(document.querySelector('h1')).fontFamily;
    return [...document.querySelectorAll('[data-admission]')].map(button => {
      const rect = button.getBoundingClientRect();
      return {
        inside: rect.top > hero.top + hero.height / 2 && rect.bottom < hero.bottom && rect.left >= hero.left && rect.right <= hero.right,
        fontMatches: getComputedStyle(button.querySelector('.year-title')).fontFamily === titleFont,
      };
    });
  });
  expect(geometry).toEqual([{ inside: true, fontMatches: true }, { inside: true, fontMatches: true }]);
});

test('los niveles tienen un 33 por ciento más de altura y mantienen el ancho de pantalla', async ({ page }, testInfo) => {
  await visit(page);
  const originalHeight = testInfo.project.name === 'mobile' ? 380 : 411;
  const height = await page.locator('.level-card').first().evaluate(element => element.getBoundingClientRect().height);
  expect(height).toBeCloseTo(originalHeight * 1.33, 1);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('el video de familias reproduce narración y subtítulos y se detiene al cerrar', async ({ page }) => {
  await visit(page);
  await page.getByRole('button', { name: 'Reproducir video de ejemplo de familias' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('No es una entrevista real');
  const film = page.locator('#family-video');
  await expect.poll(() => film.evaluate(video => video.currentTime)).toBeGreaterThan(0);
  expect(await film.evaluate(video => video.muted)).toBe(false);
  expect(await film.evaluate(video => video.duration)).toBeCloseTo(30, 0);
  await expect.poll(() => film.evaluate(video => video.textTracks[0]?.cues?.length || 0)).toBeGreaterThan(0);
  await dialog.getByText('Leer el relato de ejemplo').click();
  await expect(dialog.locator('details')).toHaveAttribute('open', '');
  await dialog.getByRole('button', { name: 'Cerrar información' }).click();
  expect(await film.evaluate(video => video.paused)).toBe(true);
  expect(await page.locator('#hero-video').evaluate(video => video.paused)).toBe(true);
});

test('los bloques se revelan suavemente desde abajo al desplazarse', async ({ page }) => {
  await visit(page);
  const target = page.locator('.about-copy');
  expect(await target.evaluate(element => getComputedStyle(element).opacity)).toBe('0');
  expect(await target.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m42)).toBe(40);
  await target.scrollIntoViewIfNeeded();
  await expect(target).toHaveClass(/visible/);
  await expect.poll(() => target.evaluate(element => Number(getComputedStyle(element).opacity))).toBe(1);
  expect(await target.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m42)).toBe(0);
});

test('respeta movimiento reducido y mantiene los contenidos visibles', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await visit(page);
  await expect.poll(() => page.locator('#hero-video').evaluate(video => video.readyState)).toBeGreaterThanOrEqual(2);
  expect(await page.locator('#hero-video').evaluate(video => video.paused)).toBe(true);
  expect(await page.locator('.reveal').first().evaluate(element => getComputedStyle(element).opacity)).toBe('1');
});
