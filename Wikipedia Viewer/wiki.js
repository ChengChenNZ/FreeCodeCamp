
$(document).ready(function(){
  $('#search').click(function(){
    //get input string
      var searchString = $('#searchString').val();
    //API url with searchString
      var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchString + "&format=json&callback=?";
    
    console.log(url);
    $.getJSON(url,function(data){
      $("#List").html("");
      for(var i = 0; i < data[1].length; i++){
        $("#List").prepend("<li><h3>" + data[1][i] + "</h3>" + data[2][i] +'<a href="' +data[3][i] +'">' + data[3][i] + "</a></li>");
        $("#searchString").val("");
       };
    });
    $("#searchString").keypress(function(e){
      if(e.which == 13){
        $("#search").click();
      }
    })
  });
});