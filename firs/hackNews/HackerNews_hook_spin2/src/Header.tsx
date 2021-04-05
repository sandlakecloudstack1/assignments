import emiter from "./event";

//创建函数式标题组件
export default function Header() {
  return (
    <div className="headline">
      <h2>
        <a href="/#">Hacker News</a>
      </h2>
      <input type="text" placeholder="Search" className="input1" />
      <button className="refreshBtn" onClick={()=>{emiter.emit("callME")}}>
        Refresh
      </button>
    </div>
  );
}


