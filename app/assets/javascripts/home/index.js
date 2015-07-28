$( document ).ready(function() {
  init();
});

function init() {

  var token = sessionStorage.getItem('access_token');
  if(token)
    window.location = "/c3dweb/projects/";
  else
    window.location = "/c3dweb/sign_in";
}
