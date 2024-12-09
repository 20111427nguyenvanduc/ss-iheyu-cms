$("#btn-Convert-Html2Image").on('click', function (){
  var source = document.getElementById("canvas");
  var img    = source.toDataURL("image/png");

  $("#btn-Convert-Html2Image").attr("download", "certification.png").attr("href", img);
});

function convert2canvas () {
  var source = document.getElementById("html-content-holder");
  html2canvas(source, {
      onrendered: function(canvas) {
        canvas.id = "canvas"
        $('#html-content-holder').replaceWith(canvas);
      },
      //width: 200,
      //height: 200
  });
}
convert2canvas()
