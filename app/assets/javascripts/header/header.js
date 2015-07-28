$( document ).ready(function() {
  init_header();
});

function init_header() {
  var user = sessionStorage.getItem('user');


  $('.email_header').on("click", function(){
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    window.location = "/c3dweb/";
  });

}
