/* MolArgan — interactions communes (en-tête, progression, apparition au scroll, compteur) */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var header = $('header'), bar = $('#progress');

  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle('scrolled', y > 30);
    if (bar && h > 0) bar.style.width = (y / h * 100) + '%';
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .12 });
  function observe(root) {
    (root || document).querySelectorAll('.rv:not(.in)').forEach(function (el) { io.observe(el); });
  }
  observe();
  window.MolArgan = { observe: observe };

  document.querySelectorAll('[data-count]').forEach(function (el) {
    var t = +el.dataset.count, n = 0;
    (function step() {
      n += Math.ceil(t / 50);
      if (n >= t) { el.textContent = t; } else { el.textContent = n; requestAnimationFrame(step); }
    })();
  });
})();
