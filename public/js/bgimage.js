const el = $("body")[0];
const src = $(el).css("background-image").slice(4, -1);
const img = new Image();
img.src = src;

repeatBg = function () {
  const canvas = $("#canvas-flip-bg")[0];
  let ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height * 2;
  ctx.drawImage(img, 0, 0);
  ctx.scale(1, -1);
  ctx.translate(0, -img.height);
  ctx.drawImage(img, 0, -img.height, img.width, img.height);
  let dataURL = canvas.toDataURL();
  $(el).css({
    "background-image": "url(" + dataURL + ")",
    "background-repeat": "repeat-y",
  });
  $(window).off("load, scroll, resize", checkHeight);
};

checkHeight = function () {
  if (img.height < window.innerHeight) {
    repeatBg();
  }
};

img.onload = checkHeight();
$(window).on("load, scroll, resize", checkHeight);
