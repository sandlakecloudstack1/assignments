import { useState, useEffect } from "react";

// 定义一个props接口
interface Props{
  idNum:number;
  fathToChildren():void;
}
// 创建内容区的子组件
export default function ItemContent<T extends Props>(props:T) {
  // 设置初始状态和改变状态方法
  const [id, setId] = useState(0);
  const [time, setTime] = useState(" ");
  const [title, setTitle] = useState("essay title");
  const [url, setUrl] = useState("https://hn.etelej.com/");
  const { idNum, fathToChildren } = props;
  //获取每个条目数据
  useEffect(() => {
    get_items();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  function get_items() {
    fetch(
      "https://hacker-news.firebaseio.com/v0/item/" +
        idNum +
        ".json?print=pretty"
    )
      .then((res) => res.json())
      .then((result) => {
        setId((id) => (id = result.id));
        setTime((time) => (time = timeDisplay(result.time)));
        setTitle((title) => (title = result.title));
        setUrl((url) => (url = result.url));
        // 调用回调函数
        fathToChildren();
      });
  }
  //裁剪URL获取域名
  function cutDomain(urlStr: string): string {
    // 判断URL是否存在
    if (urlStr) {
      let res = urlStr.split("/");
      const strDomain = res[2];
      return "(" + strDomain + ")";
    } else {
      return " ";
    }
  }

  // 处理时间戳
  function timeDisplay(time: number): string {
    // 得到条目和当前的标准时间
    let timerItems = new Date(time * 1000);
    let timerNow = new Date();
    // 得到目前和条目的相差时间
    let years = timerNow.getFullYear() - timerItems.getFullYear();
    let months = timerNow.getMonth() - timerItems.getMonth();
    let days = timerNow.getDate() - timerItems.getDate();
    let hours = timerNow.getHours() - timerItems.getHours();
    let minutes = timerNow.getMinutes() - timerItems.getMinutes();
    // 对不同的相差时间状态进行判断
    if (years !== 0) {
      if (years === 1) {
        return years + " year ago[*][comments]";
      } else {
        return years + " years ago[*][comments]";
      }
    } else if (months !== 0) {
      if (months === 1) {
        return months + " month ago[*][comments]";
      } else {
        return months + " months ago[*][comments]";
      }
    } else if (days !== 0) {
      if (days === 1) {
        return days + " day ago[*][comments]";
      } else {
        return days + " days ago[*][comments]";
      }
    } else if (hours !== 0) {
      if (hours === 1) {
        return "about " + hours + " hour ago[*][comments]";
      } else {
        return "about " + hours + " hours ago[*][comments]";
      }
    } else if (minutes !== 0) {
      if (minutes === 1) {
        return "about " + minutes + " minute ago[*][comments]";
      } else {
        return "about " + minutes + " minutes ago[*][comments]";
      }
    } else {
      return "unkonwn time[*][comments]";
    }
  }

  return (
    <div className="content">
      <li className="liItem">
        <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          className="topPart_a"
        >
          {title}
        </a>
        <div className="bottomPart">
          <span className="urlSpan">{cutDomain(url)}</span>
          <a
            href={"https://news.ycombinator.com/item?id=" + id}
            className="bottom_a"
            rel="noopener noreferrer"
            target="_black"
            title="Read comments"
          >
            {time}
          </a>
        </div>
      </li>
    </div>
  );
}
