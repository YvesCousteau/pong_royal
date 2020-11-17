
import React, { useState } from 'react';
import Confetti from 'react-dom-confetti';

const config = {
  angle: "220",
  spread: "360",
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: "4570",
  stagger: 3,
  width: "30px",
  height: "29px",
  perspective: "500px",
  colors: ["#da275c", "#22c9bb", "#ffee07"]
};

function ResultScreen(props) {
  const [youWin, setYouWin] = useState(false);

  if (props.show)
    return (
      <div class="modal show" style={{display: props.show ? "block" : "none"}} id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" data-show="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content card border-info">
            <div class="modal-header">
              <h2 class="modal-title" id="exampleModalLongTitle">RESULT SCREEN</h2>
            </div>
            <div class="modal-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-warning">#</th>
                    <th scope="col" className="text-warning">Pseudo</th>
                    <th scope="col" className="text-warning">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"> <h2  className="text-warning">1 <Confetti active={ youWin } config={ config }/></h2> </th>
                    <td className="text-info">Emixx</td>
                    <td className="text-danger">73234</td>
                  </tr>
                  <tr>
                    <th scope="row"> <h2  className="text-warning">2</h2> </th>
                    <td className="text-info">Cousteau</td>
                    <td className="text-danger">2342342</td>
                  </tr>
                  <tr>
                    <th scope="row"> <h2  className="text-warning">3</h2> </th>
                    <td className="text-info">T3rruss</td>
                    <td className="text-danger">20380458</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onClick={() => setYouWin(!youWin)}>Replay</button>
            </div>
          </div>
        </div>
      </div>
    )
  else
    return (null)
}

const ModalScore = (props) => {
  if (props.show)
    return (
      <ul style={{position: "absolute", top: "10px", right: "10px", width: "200px"}} className="modal-dialog card border-info list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center text-info" style={{fontFamily: "Oxanium"}}>
          Emixx
          { !props.loading && <span className="badge badge-primary badge-pill text-danger" style={{fontSize: "1em", fontFamily: "Oxanium"}}>14</span>}
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center text-info" style={{fontFamily: "Oxanium"}}>
          Cousteau
          { !props.loading && <span className="badge badge-primary badge-pill text-danger" style={{fontSize: "1em", fontFamily: "Oxanium"}}>69</span>}
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center text-info" style={{fontFamily: "Oxanium"}}>
          T3rruss
          { !props.loading && <span className="badge badge-primary badge-pill text-danger" style={{fontSize: "1em", fontFamily: "Oxanium"}}>420</span>}
        </li>
        { props.loading &&
          <li className="list-group-item text-info">
            <center>
              <div class="spinner-grow" role="status">
                <span class="sr-only">Waiting for players...</span>
              </div>
            </center>
          </li> 
        }
      </ul>
    )

  else return (null)
}

export {ModalScore, ResultScreen}