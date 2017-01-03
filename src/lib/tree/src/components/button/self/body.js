import React from 'react';
import { connect } from 'react-redux';

let ButtonBody =  (props) => {
  const {
    style,
    title,
  } = props;
  return (
    <div className="btnBody" style={style.body}>
      <div className="buttonInner" style={style.inner}>
        <div className="title" style={{height: "100%", overflow: "hidden"}}>
          {title}
        </div>
      </div>
    </div>
  );
};

export default connect()(ButtonBody);
