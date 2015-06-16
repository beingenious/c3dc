$( document ).ready(function() {
  init();
});

function init() {

  var token = sessionStorage.getItem('access_token');
  if(token)
    window.location = "/projects/";
  else
    window.location = "/sign_in";
}
