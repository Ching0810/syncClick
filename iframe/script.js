document.getElementById('screen').addEventListener('click', () => console.log('12345'))

function displayMessage (evt) {
	var message;
  if (evt.data === null) {
    return
  }
  console.log("iframe message");
  var x = Math.ceil(evt.data.x);
  var y = Math.ceil(evt.data.y);
	if (evt.origin !== "http://localhost:5175/") {
		message = "You are not worthy";
	}
	else {
		message = "I got " + "x: " + x + "y: " + y;
	}
  console.log(message)
	document.getElementById("received-message").innerHTML = message;
  var element = document.elementFromPoint(x,y);
  console.log(element)
  const ev = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true,
    'clientX': x,
    'clientY': y
  });
  if (element !== null ) {
    element.dispatchEvent(ev);
  }
  
}

if (window.addEventListener) {
	// For standards-compliant web browsers
	window.addEventListener("message", displayMessage, false);
}
else {
	window.attachEvent("onmessage", displayMessage);
}