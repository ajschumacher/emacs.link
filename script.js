var show = function(id) {
  var item = document.getElementById(id);
  item.style.display = "block";
};

var is = function(thing) {
  app = navigator.appVersion.toLowerCase();
  thing = thing.toLowerCase();
  return app.indexOf(thing) != -1;
};

if (is("win") && !is("mobile")) {
  show("windows");
} else if (is("mac")) {
  show("mac");
} else if (is("X11") || is("linux")) {
  show("linux");
} else {
  show("mobile");
}

var html = document.getElementsByTagName('html')[0];
var htmlStyle = window.getComputedStyle(html);
var body = document.getElementsByTagName('body')[0];
var bodyStyle = window.getComputedStyle(body);
var niceSize = function () {
  var width = parseInt(htmlStyle.getPropertyValue("width")
                       .replace('px', ''));
  var contentHeight = parseInt(bodyStyle.getPropertyValue("height")
                               .replace('px', ''));
  var windowHeight = window.innerHeight;
  // background image is 1704 wide by 2416 tall
  // and tree part is about 876 tall
  var treeHeight = Math.ceil(width * 876 / 1704);
  var necessaryHeight = contentHeight + treeHeight;
  html.style.minHeight = Math.max(windowHeight, necessaryHeight) + "px";
};
niceSize();
window.addEventListener("resize", niceSize);

// temporary toy logging thing
var log = function(message) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://rogs-on-rails.herokuapp.com/", true);
  xmlhttp.send(message);
};
