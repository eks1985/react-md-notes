import React from 'react';

export default ({
  style, 
  hasNext
}) => {
  return (
    <div className="childrenSublingsConnectors" style={style.connectorsContainer}>
      { hasNext && <div style={style.connectors}></div> }
    </div>    
  );  
};