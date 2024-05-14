// Inside the iframe's content script or document
window.addEventListener('message', function(event) {
   if (event.data === null) {
      console.log('iframe receive no data!')
      return
   }
   //  Check the origin of the message
   if (event.origin!== "http://localhost:5174") {
      console.log('Message from an unknown origin');
         return;
      }

    // Handle the message
   const { type, data } = event.data;
   if (type === 'click') {
      // Perform the click action based on the data received
      console.log('Received click message:', data);
      
      const ev = new MouseEvent('click', {
         'view': window,
         'bubbles': true,
         'cancelable': true,
         'clientX': data.x, 
         'clientY': data.y
      });
      console.log(this.document.body)
      var element = this.document.elementFromPoint(data.x, data.y)
      element.dispatchEvent(ev)
   }
}, false);
