const Iframe = () => {
  return (
    <div 
      style={{
        backgroundColor: 'white', 
        position: 'absolute', 
        width: '400px', 
        height: '350px', 
        top: '200px', 
        left: '20px',
        overflow: 'hidden' // Ensure that the iframe does not overflow the div
      }}
      onClick={() => console.log('machine iframe clicked!')}
      id='remoteIframe'
    >
      <iframe 
        src='http://localhost:5175/' 
        style={{
          width: '100%', 
          height: '100%', 
          border: 'none', // Remove the default border
          boxSizing: 'border-box' // Include padding and border in the element's total width and height
        }}
      ></iframe>
    </div>
  );
}

export default Iframe;
