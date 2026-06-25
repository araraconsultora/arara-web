(function(){
  var KEY = 'arara_lang';
  var path = window.location.pathname;
  var params = new URLSearchParams(window.location.search);
  var override = params.get('lang');

  function save(lang){
    try { localStorage.setItem(KEY, lang); } catch(e) {}
  }

  window.araraSetLanguage = function(lang, url){
    save(lang);
    window.location.href = url;
  };

  document.addEventListener('click', function(event){
    var link = event.target.closest && event.target.closest('a[lang]');
    if (!link) return;
    var code = (link.getAttribute('lang') || '').toLowerCase();
    if (code.indexOf('zh') === 0) save('zh');
    else if (code.indexOf('en') === 0) save('en');
    else if (code.indexOf('es') === 0) save('es');
  });

  if (override) {
    save(override);
    return;
  }

  if (path === '/' || path.endsWith('/index.html')) {
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch(e) {}
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    var lang = stored || (nav.toLowerCase().indexOf('zh') === 0 ? 'zh' : '');
    if (lang === 'zh') window.location.replace('/zh/');
  }
})();
