const GIST_RAW_URL = 'https://gist.githubusercontent.com/cbale7218-bot/7c21a30b5a4f1a8a3892ff8236236a58/raw/gistfile1.txt';

const REFRESH_MS = 5000;

const fallback = {
  companyName: 'VALORA',
  tagline: 'Tu aliado financiero.',
  telegramUrl: 'https://t.me/REPLACE_WITH_YOUR_TELEGRAM',

  texts: {
    eyebrow: 'PAGOS DIGITALES',

    heroTitle: 'Paga de forma rápida, segura',
    heroAccent: 'y sin complicaciones',

    heroText: 'Realiza tu pago de forma rápida y segura utilizando los datos bancarios indicados.',

    benefit1Title: 'Pago seguro',
    benefit1Text: 'Tus datos siempre protegidos',

    benefit2Title: 'Rápido',
    benefit2Text: 'Confirmación en segundos',

    benefit3Title: 'Confiable',
    benefit3Text: 'Información verificada',

    telegramButton: 'Contactar en Telegram',

    paymentTitle: 'Información de pago',
    paymentSubtitle: 'Datos para realizar tu operación',

    copyAll: 'Copiar todo',
    copySuccess: '¡Copiado!',

    holder: 'Titular',
    bank: 'Banco',
    account: 'Número de cuenta',
    cci: 'CCI',

    paymentWarning: 'Verifica cuidadosamente la información antes de realizar tu operación.',

    trust1Title: 'Seguridad garantizada',
    trust1Text: 'Conexión cifrada y protegida',

    trust2Title: 'Datos verificados',
    trust2Text: 'Información actualizada en tiempo real',

    trust3Title: 'Soporte disponible',
    trust3Text: 'Estamos para ayudarte siempre',

    followText: 'Contáctanos',

    securityFooter: 'Tu seguridad es nuestra prioridad',
    copyright: '© 2026 VALORA · Perú'
  },

  payment: {
    name: 'VALORA SAC',
    bank: 'BCP',
    account: '123456789',
    cci: '00212345678901234567'
  },

  design: {
    primaryColor: '#1F9BFF',
    accentColor: '#7657FF',
    successColor: '#20E6D5',
    backgroundColor: '#07111F',
    panelColor: '#111F34',
    textColor: '#F4F8FF',
    mutedColor: '#9AACBF',
    borderRadius: '16px',
    buttonRadius: '11px'
  }
};


const $ = id => document.getElementById(id);


const safe = (value, fallbackValue = '') => {
  return value == null ? fallbackValue : String(value);
};


function txt(id, value) {

  const el = $(id);

  if (el) {
    el.textContent = safe(value);
  }

}


function applyDesign(d = {}) {

  const root = document.documentElement;

  const vars = {

    '--primary': d.primaryColor,
    '--accent': d.accentColor,
    '--success': d.successColor,

    '--bg': d.backgroundColor,
    '--panel-color': d.panelColor,

    '--text': d.textColor,
    '--muted': d.mutedColor,

    '--radius': d.borderRadius,
    '--button-radius': d.buttonRadius

  };


  Object.entries(vars).forEach(([name, value]) => {

    if (value) {
      root.style.setProperty(name, value);
    }

  });

}


function render(c) {

  const t = c.texts || {};
  const p = c.payment || {};

  applyDesign(c.design || {});


  /*
   * COMPANY
   */

  txt('companyName', c.companyName);
  txt('tagline', c.tagline);

  txt('footerName', c.companyName);
  txt('footerTagline', c.tagline);


  /*
   * HERO
   */

  txt('eyebrow', t.eyebrow);
  txt('heroTitle', t.heroTitle);
  txt('heroAccent', t.heroAccent);
  txt('heroText', t.heroText);


  /*
   * BENEFITS
   */

  txt('benefit1Title', t.benefit1Title);
  txt('benefit1Text', t.benefit1Text);

  txt('benefit2Title', t.benefit2Title);
  txt('benefit2Text', t.benefit2Text);

  txt('benefit3Title', t.benefit3Title);
  txt('benefit3Text', t.benefit3Text);


  /*
   * TELEGRAM
   */

  txt('telegramTopText', t.telegramButton);
  txt('telegramFooter', 'Telegram');


  const telegram = c.telegramUrl || '#';

  const telegramTop = $('telegramTop');
  const telegramFooter = $('telegramFooter');

  if (telegramTop) {
    telegramTop.href = telegram;
  }

  if (telegramFooter) {
    telegramFooter.href = telegram;
  }


  /*
   * PAYMENT
   */

  txt('paymentTitle', t.paymentTitle);
  txt('paymentSubtitle', t.paymentSubtitle);

  txt('copyAllText', t.copyAll);

  txt('labelName', t.holder);
  txt('labelBank', t.bank);
  txt('labelAccount', t.account);
  txt('labelCCI', t.cci);

  txt('paymentWarning', t.paymentWarning);


  /*
   * BANK DETAILS
   */

  txt('paymentName', p.name || '—');
  txt('paymentBank', p.bank || '—');
  txt('paymentAccount', p.account || '—');
  txt('paymentCCI', p.cci || '—');


  /*
   * TRUST
   */

  txt('trust1Title', t.trust1Title);
  txt('trust1Text', t.trust1Text);

  txt('trust2Title', t.trust2Title);
  txt('trust2Text', t.trust2Text);

  txt('trust3Title', t.trust3Title);
  txt('trust3Text', t.trust3Text);


  /*
   * FOOTER
   */

  txt('followText', t.followText);
  txt('securityFooter', t.securityFooter);
  txt('copyright', t.copyright);


  /*
   * SAVE CONFIG
   */

  window.__config = c;

}


async function load() {

  try {

    const url =
      GIST_RAW_URL +
      (GIST_RAW_URL.includes('?') ? '&' : '?') +
      'v=' +
      Date.now();


    const response = await fetch(url, {
      cache: 'no-store'
    });


    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }


    const data = await response.json();


    render(data);


    const now = new Date().toLocaleTimeString();

    console.log('Gist actualizado:', now);


  } catch (error) {

    console.error('Gist error:', error);

  }

}


/*
 * COPY FUNCTION
 */

function legacyCopy(text) {

  return new Promise((resolve, reject) => {

    const area = document.createElement('textarea');

    area.value = text;

    area.setAttribute('readonly', '');

    area.style.position = 'fixed';
    area.style.opacity = '0';

    document.body.appendChild(area);

    area.focus();
    area.select();


    let ok = false;

    try {
      ok = document.execCommand('copy');
    } catch (_) {}


    area.remove();


    if (ok) {
      resolve();
    } else {
      reject(new Error('copy failed'));
    }

  });

}


async function copyText(text) {

  if (!text) {
    throw new Error('empty text');
  }


  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {

    await navigator.clipboard.writeText(text);

    return;
  }


  await legacyCopy(text);

}


/*
 * COPIED BUTTON
 */

function showCopied(button) {

  const original =
    button.dataset.originalText ||
    button.textContent.trim();


  button.dataset.originalText = original;


  const t =
    window.__config?.texts ||
    fallback.texts;


  button.textContent =
    t.copySuccess ||
    '¡Copiado!';


  button.classList.add('copied');


  clearTimeout(button._copyTimer);


  button._copyTimer = setTimeout(() => {

    button.textContent = original;

    button.classList.remove('copied');

  }, 1400);

}


/*
 * HANDLE COPY
 */

async function handleCopy(button, text) {

  try {

    await copyText(text);

    showCopied(button);

  } catch (error) {

    console.error(error);

    button.textContent = 'Selecciona y copia';


    setTimeout(() => {

      button.textContent =
        button.dataset.originalText ||
        'Copiar';

    }, 1800);

  }

}


/*
 * COPY ALL
 */

const copyAllButton = $('copyAll');


if (copyAllButton) {

  copyAllButton.addEventListener('click', function () {

    const text =
      `Titular: ${$('paymentName')?.textContent || ''}\n` +
      `Banco: ${$('paymentBank')?.textContent || ''}\n` +
      `Cuenta: ${$('paymentAccount')?.textContent || ''}\n` +
      `CCI: ${$('paymentCCI')?.textContent || ''}`;


    handleCopy(this, text);

  });

}


/*
 * COPY INDIVIDUAL DETAILS
 */

document
  .querySelectorAll('[data-copy]')
  .forEach(button => {

    button.addEventListener('click', function () {

      const target =
        $(this.dataset.copy);


      const text =
        target
          ? target.textContent.trim()
          : '';


      handleCopy(this, text);

    });

  });


/*
 * FIRST LOAD
 */

render(fallback);

load();


/*
 * AUTOMATIC UPDATE EVERY 5 SECONDS
 */

setInterval(load, REFRESH_MS);
