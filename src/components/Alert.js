import React from 'react'

function Alert(props) {

  const behaviour = {
    error: "linear-gradient(45deg,rgb(244, 175, 194), rgb(195, 144, 241), transparent)",
    success: "linear-gradient(45deg,rgb(241, 175, 244), rgb(195, 144, 241), transparent)"
  }  

  return (
    <div className="alertBox">
      <div className="alert" style={{ background: props.alert.type==='error'?behaviour.error:behaviour.success, opacity: props.alert.msg.length===0?'0':'1'}}>
        <div className="alrertmsg">
          <strong> {props.alert.msg}</strong>
        </div>
      </div>
    </div>
  );
}

export default Alert
