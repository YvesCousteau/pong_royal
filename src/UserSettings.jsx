
import React, { useState } from "react";

const UserSettings = (props) => {

  const [showSettings, setShowSettings] = useState(false);

  return (
    <div style={settingsStyle.button}>
      <button
        type="button" className="btn btn-outline-warning" style={{borderRadius: "50%"}}
        onClick={()=>{setShowSettings(!showSettings)}}
      >
        <h1 className=" align-middle text-warning">⚙</h1>
      </button>

      { (props.show || showSettings ) &&
        <div className="card border-warning" style={settingsStyle.div}>
          <div className="card-header">Settings</div>
          <div className="card-body">
            <h4 className="card-title">Warning card title</h4>
            <div className="card-text">
              <div className="form-group">
                <div className="custom-control custom-switch">
                  <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                  <label className="custom-control-label" htmlFor="customSwitch1" style={settingsStyle.label}>Enable Music</label>
                </div>
                <div className="custom-control custom-switch">
                  <input type="checkbox" className="custom-control-input" id="customSwitch2"/>
                  <label className="custom-control-label" htmlFor="customSwitch2" style={settingsStyle.label}>Remember me</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )

}

const settingsStyle = {
  button: {
    position: "absolute",
    top: 20, left: 20,
  },
  div: {
    zIndex: 1000,
    position: "absolute",
    top: 100, right: 20,
    maxWidth: "20rem",
    width: "400px",
  },
  label: {
    fontSize: "1em",
    fontFamily: "Oxanium"
  }
}

export { UserSettings };
