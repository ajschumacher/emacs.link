var pxToInt = function(text) {
  return parseInt(text.replace('px', ''));
};

var html = document.getElementsByTagName('html')[0];
var htmlStyle = window.getComputedStyle(html);
var body = document.getElementsByTagName('body')[0];
var bodyStyle = window.getComputedStyle(body);
var niceSize = function () {
  var width = pxToInt(htmlStyle.getPropertyValue("width"));
  var contentHeight = pxToInt(bodyStyle.getPropertyValue("padding-top")) +
      pxToInt(bodyStyle.getPropertyValue("height")) +
      pxToInt(bodyStyle.getPropertyValue("padding-bottom"));
  var windowHeight = window.innerHeight;
  // background image is 1704 wide by 2416 tall
  // and tree part is about 876 tall
  var treeHeight = Math.ceil(width * 876 / 1704);
  var necessaryHeight = contentHeight + treeHeight;
  html.style.minHeight = Math.max(windowHeight, necessaryHeight) + "px";
};
window.addEventListener("resize", niceSize);

var show = function(id) {
  var item = document.getElementById(id);
  item.style.display = "block";
};

var hide = function(id) {
  var item = document.getElementById(id);
  item.style.display = "none";
};

var only = function(id) {
  hide("mobile");
  hide("windows");
  hide("mac");
  hide("linux");
  show(id);
  niceSize();
};

var is = function(thing) {
  app = navigator.appVersion.toLowerCase();
  thing = thing.toLowerCase();
  return app.indexOf(thing) != -1;
};

if (is("phone") || is("tablet") || is("mobile")) {
  only("mobile");
} else if (is("win")) {
  only("windows");
} else if (is("mac")) {
  only("mac");
} else if (is("X11") || is("linux")) {
  only("linux");
} else {
  only("mobile");
}

// temporary toy logging thing
var log = function(message) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://rogs-on-rails.herokuapp.com/", true);
  xmlhttp.send(message);
};
