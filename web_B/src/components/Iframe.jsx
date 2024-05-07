const Iframe = () => {
  return (
    <div 
      style={{
        backgroundColor: 'white', 
        position: 'absolute', 
        width: '50%', 
        height: '50%', 
        top: '30%', 
        left: '10%',
        overflow: 'hidden'
      }}
      onClick={() => console.log('machine iframe clicked!')}
      id='remoteIframe'
    >
      <iframe
        // outsource implement page
        src='http://localhost:5174/' 
        style={{
          width: '100%', 
          height: '100%', 
          border: 'none',
          boxSizing: 'border-box'
        }}
      ></iframe>
    </div>
  );
}

export default Iframe;
