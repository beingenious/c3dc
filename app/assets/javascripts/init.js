var C3dc = {};
C3dc.projects = {};
C3dc.user = {};
C3dc.before_send = function(xhr, settings) {
  xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.getItem('access_token'));
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
}
