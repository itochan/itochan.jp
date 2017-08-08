(function () {
  var stylesheets = document.getElementsByClassName('stylesheet');
  Array.from(stylesheets).forEach(function (stylesheet) {
    stylesheet.rel = 'stylesheet';
  })
})();
