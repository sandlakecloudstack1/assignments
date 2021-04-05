import React from "react";
import Kanban from "./kanban";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <div className="panel panel-default">
            <h2 className="text-center">To Do</h2>
            <Kanban
              type="To Do"
              tasks={[{ name: "sleeping", tags: [] }]}
              selectTasks={[{ name: "", tags: [] }]}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="panel panel-default">
            <h2 className="text-center">In Progress</h2>
            <Kanban
              type="In Progress"
              tasks={[{ name: "eating", tags: [] }]}
              selectTasks={[{ name: "", tags: [] }]}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="panel panel-default">
            <h2 className="text-center">Done</h2>
            <Kanban
              type="Done"
              tasks={[{ name: "studying", tags: [] }]}
              selectTasks={[{ name: "", tags: [] }]}
            />
          </div>
        </div>
      </div>
    </div>
  );
  //}
}

export default App;
