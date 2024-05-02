window.addEventListener('message', function (event) {
   console.log(event.data);
   var x = event.data.x - 20;
   var y = event.data.y - 200;
   var element = document.elementFromPoint(x, y);
   // message event should receive from machine page which contain iframe
   if (event.origin !== "http://localhost:5175") {
      console.log('not allow!');
      return;
   }
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
