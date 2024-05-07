window.addEventListener('message', function (event) {
   if (event.data === null) {
      console.log('iframe receive no data!')
      return
   }
   var {x, y} = event.data
   var element = document.elementFromPoint(x, y);
   console.log(element)
   var message
   // message event should receive from machine page which contain iframe
   if (event.origin !== "http://localhost:5175") {
      message = "You are not worthy";
      return;
   } else {
      message = "I got " + "x: " + x + "y: " + y;
   }
   console.log(message)
   const ev = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true,
      'clientX': x, 
      'clientY': y
   });
   if (element !== null) {
      element.dispatchEvent(ev);
   }
}, false);
