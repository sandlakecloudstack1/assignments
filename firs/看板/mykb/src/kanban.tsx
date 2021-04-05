import React, { useState } from "react";
import Task from "./task";
import TaskAdder from "./TaskAdder";
import emitter from "./event";

interface Props {
  tasks: Array<TaskTag>;
  type: string;
  selectTasks: Array<TaskTag>;
}
interface TaskTag {
  name: string;
  tags: Array<string>;
}

function Kanban(props: Props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [selectTasks, setSelectTasks] = useState(props.selectTasks);

  const addTaskWithoutTags = (name: string) => {
    const newTasks = tasks.concat({ name: name, tags: [] });
    setTasks(newTasks);
  };

  const addTags = (name: string, tag: string) => {
    const newTasks = tasks.map((task) => {
      if (task.name === name) {
        return { name: name, tags: task.tags.concat(tag) };
      } else {
        return task;
      }
    });
    setTasks(newTasks);
  };

  const deleteTask = (name: string) => {
    const newTasks = tasks.filter((item) => {
      return name !== item.name;
    });
    setTasks(newTasks);
  };

  const checkTack = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    let selectTask = selectTasks.filter((item) => {
      return item.name !== "";
    });
    let task = tasks.filter((task) => {
      return task.name === name;
    });
    if (value) {
      selectTask = selectTask.concat(task);
    } else {
      selectTask = selectTask.filter((item) => {
        return item.name !== name;
      });
    }

    setSelectTasks(selectTask);
  };

  const moveTask = (type: string) => {
    const newTasks = tasks.filter((task) => {
      return !selectTasks.includes(task);
    });
    emitter.emit("move", selectTasks, type);
    setSelectTasks([]);
    setTasks(newTasks);
  };

  emitter.addListener("move", (item, type) => {
    if (type === props.type) {
      const newTasks = tasks.concat(item);
      setTasks(newTasks);
    }
  });

  const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.dropEffect = "move";
    event.preventDefault();
  };

  const dragDeleteTask = (name: string) => {
    const newTasks = tasks.filter((task) => {
      return task.name !== name;
    });
    setTasks(newTasks);
  };

  const dropTasks = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    let task = event.dataTransfer.getData("text");
    const newTasks = tasks.concat({ name: task, tags: [] });
    setTasks(newTasks);
  };

  let type = props.type;
  let types = ["To Do", "In Progress", "Done"];
  types = types.filter((item) => {
    return item !== type;
  });

  return (
    <div>
      <TaskAdder addTaskWithoutTags={addTaskWithoutTags} />
      <br />

      <div onDrop={dropTasks} onDragOver={dragOver}>
        {tasks.map((task, index) => {
          return (
            <Task
              key={index}
              name={task.name}
              tags={task.tags}
              dragDeleteTask={dragDeleteTask}
              addTags={addTags}
              checkTask={checkTack}
              deleteTask={deleteTask}
            />
          );
        })}
      </div>

      <br />
      {types.map((type) => {
        return (
          <button
            key={type}
            name={type}
            onClick={() => {
              moveTask(type);
            }}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}

export default Kanban;
