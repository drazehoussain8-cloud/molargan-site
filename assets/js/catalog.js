/* MolArgan — catalogue : cartes produits, filtres, recherche, fenêtre de détails, commande WhatsApp.
 * Données : assets/data/products.js (window.PRODUCTS, window.CATEGORIES, window.WHATSAPP) */
(function () {
  var PRODUCTS = window.PRODUCTS || [], CATS = window.CATEGORIES || [], WA = window.WHATSAPP;
  var byId = {}; PRODUCTS.forEach(function (p) { byId[p.id] = p; });
  var catLabel = {}; CATS.forEach(function (c) { catLabel[c.id] = c.label; });

  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); };
  var ic = function (n, cls) { return '<svg class="ic ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; };
  var norm = function (s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
  var priceText = function (p) { return p.price || p.priceNote || ''; };
  function waUrl(p, opt) {
    var msg = 'Bonjour MolArgan, je souhaite commander : ' + p.name + (opt ? ' (' + opt + ')' : '') + '.';
    return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
  }

  function card(p, i) {
    return '<article class="pcard rv" style="--d:' + Math.min(i % 8, 7) * 0.05 + 's">' +
      '<button type="button" class="pmain" data-open="' + esc(p.id) + '" aria-label="Voir les détails : ' + esc(p.name) + '">' +
        '<span class="pimg"><img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async" data-fallback>' +
        '<span class="ptag">' + esc(catLabel[p.cat] || p.cat) + '</span></span>' +
        '<span class="pbody"><span class="pname">' + esc(p.name) + '</span>' +
        '<span class="pdesc">' + esc(p.desc) + '</span>' +
        '<span class="pprice' + (p.price ? ' has' : '') + '">' + esc(priceText(p)) + '</span></span>' +
      '</button>' +
      '<a class="pwa" href="' + waUrl(p) + '" target="_blank" rel="noopener" aria-label="Commander ' + esc(p.name) + ' sur WhatsApp">' + ic('wa') + '</a>' +
    '</article>';
  }

  // image cassée -> repli élégant
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG' && t.hasAttribute('data-fallback')) t.closest('.pimg, .mimg').classList.add('noimg');
  }, true);

  /* ---------- fenêtre de détails ---------- */
  var dlg = document.getElementById('pmodal'), current = null, currentOpt = '';
  function openModal(id) {
    var p = byId[id]; if (!p || !dlg) return;
    current = p; currentOpt = p.options.length ? p.options[0] : '';
    var opts = p.options.length
      ? '<div class="mopts"><span class="mlabel">' + esc(p.optionLabel || 'Option') + '</span><div class="mchips" role="radiogroup">' +
        p.options.map(function (o, i) { return '<button type="button" class="mchip' + (i === 0 ? ' on' : '') + '" role="radio" aria-checked="' + (i === 0) + '" data-opt="' + esc(o) + '">' + esc(o) + '</button>'; }).join('') + '</div></div>'
      : '';
    dlg.innerHTML =
      '<button type="button" class="mclose" data-close aria-label="Fermer">' + ic('close') + '</button>' +
      '<div class="mimg"><img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" data-fallback></div>' +
      '<div class="minfo"><span class="ptag solid">' + esc(catLabel[p.cat] || p.cat) + '</span>' +
      '<h2>' + esc(p.name) + '</h2>' +
      '<p class="mprice' + (p.price ? ' has' : '') + '">' + esc(priceText(p)) + '</p>' +
      '<p class="mdesc">' + esc(p.desc) + '</p>' + opts +
      '<div class="mmeta">' + ic('truck') + ' Vente au détail et en gros</div>' +
      '<a class="btn btn-gold mwa" id="mwa" href="' + waUrl(p, currentOpt) + '" target="_blank" rel="noopener">' + ic('wa') + ' Commander sur WhatsApp</a></div>';
    if (!dlg.open) dlg.showModal();
    document.documentElement.classList.add('lock');
  }
  if (dlg) {
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('[data-close]')) { dlg.close(); return; }
      var chip = e.target.closest('.mchip');
      if (chip) {
        dlg.querySelectorAll('.mchip').forEach(function (c) { c.classList.remove('on'); c.setAttribute('aria-checked', 'false'); });
        chip.classList.add('on'); chip.setAttribute('aria-checked', 'true');
        currentOpt = chip.dataset.opt;
        document.getElementById('mwa').href = waUrl(current, currentOpt);
      }
    });
    dlg.addEventListener('close', function () { document.documentElement.classList.remove('lock'); });
  }
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]'); if (o) openModal(o.dataset.open);
  });

  function render(box, list) {
    box.innerHTML = list.map(card).join('');
    if (window.MolArgan) window.MolArgan.observe(box);
  }

  /* ---------- sélection sur l'accueil ---------- */
  var feat = document.querySelector('[data-featured]');
  if (feat) {
    render(feat, feat.dataset.featured.split(',').map(function (id) { return byId[id.trim()]; }).filter(Boolean));
  }

  /* ---------- page catalogue ---------- */
  var grid = document.getElementById('grid');
  if (grid) {
    var chipsBox = document.getElementById('chips'), search = document.getElementById('q'),
        count = document.getElementById('count'), empty = document.getElementById('empty');
    var state = { cat: 'all', q: '' };
    var qs = new URLSearchParams(location.search);
    if (qs.get('cat') && (qs.get('cat') === 'all' || catLabel[qs.get('cat')])) state.cat = qs.get('cat');

    var counts = { all: PRODUCTS.length };
    PRODUCTS.forEach(function (p) { counts[p.cat] = (counts[p.cat] || 0) + 1; });
    chipsBox.innerHTML = [{ id: 'all', label: 'Tous' }].concat(CATS).map(function (c) {
      return '<button type="button" class="fchip" data-cat="' + c.id + '" aria-pressed="false">' + esc(c.label) + ' <em>' + counts[c.id] + '</em></button>';
    }).join('');

    function apply() {
      var q = norm(state.q.trim());
      var list = PRODUCTS.filter(function (p) {
        return (state.cat === 'all' || p.cat === state.cat) &&
          (!q || norm(p.name + ' ' + p.desc + ' ' + (catLabel[p.cat] || '')).indexOf(q) > -1);
      });
      chipsBox.querySelectorAll('.fchip').forEach(function (c) {
        var on = c.dataset.cat === state.cat; c.classList.toggle('on', on); c.setAttribute('aria-pressed', on);
      });
      render(grid, list);
      count.textContent = list.length + (list.length > 1 ? ' produits' : ' produit');
      empty.hidden = list.length > 0;
      var u = new URL(location.href);
      state.cat === 'all' ? u.searchParams.delete('cat') : u.searchParams.set('cat', state.cat);
      history.replaceState(null, '', u);
    }
    chipsBox.addEventListener('click', function (e) {
      var c = e.target.closest('.fchip'); if (!c) return;
      state.cat = c.dataset.cat; apply();
    });
    search.addEventListener('input', function () { state.q = search.value; apply(); });
    document.getElementById('reset').addEventListener('click', function () { state.q = ''; state.cat = 'all'; search.value = ''; apply(); });
    apply();
  }
})();
