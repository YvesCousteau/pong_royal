
const ResultScreen = ()=> (
  <div class="modal fade in show" style={{display: "block"}} id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" data-show="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
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
                <th scope="row"> <h2  className="text-warning">1</h2> </th>
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
          <button type="button" class="btn btn-secondary">Replay</button>
        </div>
      </div>
    </div>
  </div>
)

const ModalScore = () => (
  <ul className="list-group">
    <li className="list-group-item d-flex justify-content-between align-items-center text-info">
      Emixx
      <span className="badge badge-primary badge-pill text-danger">14</span>
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center text-info">
      Cousteau
      <span className="badge badge-primary badge-pill text-danger">69</span>
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-center text-info">
      T3rruss
      <span className="badge badge-primary badge-pill text-danger">420</span>
    </li>
  </ul>
)

export {ModalScore, ResultScreen}