import React from "react";

interface Props {
  tags: Array<string>;
  name: string;
  checkTask: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteTask: (name: string) => void;
  addTags: (name: string, tag: string) => void;
  dragDeleteTask: (name: string) => void;
}
function Task(props: Props) {
  const handleDelete = () => {
    props.deleteTask(props.name);
  };

  const handleAdd = () => {
    let label = prompt("请输入内容");
    if (label == null) {
      window.alert("你按了[取消]按钮");
      return;
    }
    props.addTags(props.name, label);
  };

  const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text", props.name);
  };

  const dragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    if (event.dataTransfer.dropEffect === "move") {
      props.dragDeleteTask(props.name);
    }
  };

  let color = () => {
    let R = Math.floor(Math.random() * 255);
    let G = Math.floor(Math.random() * 255);
    let B = Math.floor(Math.random() * 255);
    return { background: "rgb(" + R + "," + G + "," + B + ")" };
  };

  return (
    <div draggable="true" onDragStart={dragStart} onDragEnd={dragEnd}>
      <li className="list-group-item">
        <input name={props.name} type="checkbox" onChange={props.checkTask} />
        <span onClick={handleAdd}>{props.name}</span>
        <button className="btn-danger btn-xs pull-right" onClick={handleDelete}>
          &times;
        </button>
        <div>
          {props.tags.map((tag) => {
            return <span style={color()}>{tag}</span>;
          })}
        </div>
      </li>
    </div>
  );
}

export default Task;
