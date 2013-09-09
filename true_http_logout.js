

/**
 *  @from from http://trac-hacks.org/wiki/TrueHttpLogoutPatch
 * 
 */
function clearAuthenticationCache(page) {
  // Default to a non-existing page (give error 500).
  // An empty page is better, here.
  if (!page) page = '.force_logout';
  try{
    var agt=navigator.userAgent.toLowerCase();
    if (agt.indexOf("msie") != -1) {
      // IE clear HTTP Authentication
      document.execCommand("ClearAuthenticationCache");
    }
    else {
      // Let's create an xmlhttp object
      var xmlhttp = createXMLObject();
      // Let's prepare invalid credentials
      xmlhttp.open("GET", page, true, "logout", "logout");
      // Let's send the request to the server
      xmlhttp.send("");
      // Let's abort the request
      //  abe : so if you don't abort, the box will pop up?
      //xmlhttp.abort();
    }
  } catch(e) {
    // There was an error
    return;
  }
}
   
function confirmLogOutIntention(){
	    // Google Chrome 28 asks for login screen after "logging out". Firefox 22 and IE10 do not.
		var choice = confirm( "Click OK to continue logging out site-wide. \nAfterwards, a dialog box requesting for login details might appear.\nPlease just click Cancel on that box.\n\n\nClick OK to continue logging out, Cancel otherwise." );
		if( choice )
		{
			clearAuthenticationCache();
			// request something again from server
			var xmlhttp = createXMLObject();
			
			xmlhttp.onreadystatechange = function () {
			  if (this.readyState == 4) {
				if( this.status == 401 ){
					// if HTTP code is 401, then successfully logged out : display notice that you are now logged out.
					document.getElementById("title").innerHTML = "Success";
					document.getElementById("msg_essence").innerHTML = "You have been successfully logged out.<br/><br/>";
					document.getElementById("controls").innerHTML = '<a href="https://' + document.domain +'">Login again and back to homepage.</a>';					
				}
			  }
			}
			
		    // Let's prepare invalid credentials
		    xmlhttp.open("GET", ".force_logout", true, "logout", "logout");
		    // Let's send the request to the server
		    xmlhttp.send("");			
		}
} 
   
function createXMLObject() {
  try {
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    }
    // code for IE
    else if (window.ActiveXObject) {
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  } catch (e) {
    xmlhttp=false
  }
  return xmlhttp;
}

function goBack(){
	history.back();
}
