/* Relux Transport — väike skript: aastanumber, päringuvorm (mailto) ja pildivaade. */
(function () {
  'use strict';

  /* --- jooksev aasta jaluses ------------------------------------------ */
  document.querySelectorAll('#aasta').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --- päringuvorm: koostab eeltäidetud e-kirja ----------------------- */
  var AADRESS = 'reluxtransport.info@gmail.com';
  var form = document.getElementById('paringForm');

  if (form) {
    var status = document.getElementById('formStatus');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.reportValidity()) return;

      var v = function (name) {
        var f = form.elements[name];
        return f && f.value ? f.value.trim() : '';
      };

      var teenus = v('teenus') || 'Transporditeenus';
      var subject = 'Päring: ' + teenus + (v('nimi') ? ' — ' + v('nimi') : '');

      var read = [
        ['Nimi', v('nimi')],
        ['Telefon', v('telefon')],
        ['E-post', v('email')],
        ['Teenus', teenus],
        ['Kust', v('kust')],
        ['Kuhu', v('kuhu')],
        ['Soovitud aeg', v('aeg')]
      ].filter(function (r) { return r[1]; })
       .map(function (r) { return r[0] + ': ' + r[1]; });

      var body = 'Tere!\n\n' + read.join('\n') +
        '\n\nVeose kirjeldus:\n' + v('sonum') +
        '\n\n--\nSaadetud Relux Transpordi kodulehe päringuvormist';

      var href = 'mailto:' + AADRESS +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      if (status) {
        status.hidden = false;
        status.innerHTML =
          '<strong>Kiri on koostatud.</strong> Sinu e-posti rakendus peaks avanema — vajuta seal veel „Saada”.' +
          '<br>Kui rakendus ei avanenud, kirjuta meile <a href="mailto:' + AADRESS + '" style="color:inherit">' + AADRESS + '</a> ' +
          'või helista <a href="tel:+37258512124" style="color:inherit">+372 5851 2124</a>.' +
          '<br><button type="button" id="kopeeriParing">Kopeeri päringu tekst lõikelauale</button>';

        var copyBtn = document.getElementById('kopeeriParing');
        if (copyBtn) {
          copyBtn.addEventListener('click', function () {
            var text = subject + '\n\n' + body;
            var done = function () { copyBtn.textContent = 'Kopeeritud ✓'; };
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
            } else {
              fallbackCopy(text, done);
            }
          });
        }
        status.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }

      /* Avame e-posti rakenduse alles pärast seda, kui varuvariant on ekraanil. */
      try {
        window.location.href = href;
      } catch (err) {
        /* mõni brauser blokeerib mailto: — kasutaja saab teksti kopeerida */
      }
    });
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (err) { /* vaikimisi ei tee midagi */ }
    document.body.removeChild(ta);
  }

  /* --- pildivaade (lightbox) ------------------------------------------ */
  var lb = document.getElementById('lightbox');
  if (!lb) return;

  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var items = Array.prototype.slice.call(document.querySelectorAll('.gal__item'));
  var index = 0;
  var lastFocus = null;

  function show(i) {
    index = (i + items.length) % items.length;
    var el = items[index];
    lbImg.src = el.getAttribute('data-full');
    lbImg.alt = el.querySelector('img') ? el.querySelector('img').alt : '';
    lbCap.textContent = el.getAttribute('data-cap') || '';
  }

  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lb.querySelector('[data-lb-close]').focus();
  }

  function close() {
    lb.classList.remove('is-open');
    lbImg.src = '';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  items.forEach(function (el, i) {
    el.addEventListener('click', function () { open(i); });
  });

  lb.querySelector('[data-lb-close]').addEventListener('click', close);
  lb.querySelector('[data-lb-prev]').addEventListener('click', function () { show(index - 1); });
  lb.querySelector('[data-lb-next]').addEventListener('click', function () { show(index + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();
