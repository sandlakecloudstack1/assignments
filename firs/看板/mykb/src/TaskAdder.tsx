import React from "react";

interface Props {
  addTaskWithoutTags: (task: string) => void;
}

function TaskAdder(props: Props) {
  const saveHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let code: string = event.key;
    if (code === "Enter") {
      let task = (event.target as HTMLInputElement).value.trim();
      if (task === "") {
        window.alert("请输入内容");
        return;
      }
      props.addTaskWithoutTags(task);
      (event.target as HTMLInputElement).value = "";
    }
  };

  return (
    <div>
      <input
        type="text"
        onKeyUp={saveHandler}
        className="form-control"
        placeholder="请输入任务"
      />
    </div>
  );
}

export default TaskAdder;
