import "./HackerNews.less";
import Header from "./Header";
import Content from "./Content";
// 页面总览
export default function HackerNews() {
  return (
    <div id="Outer">
      <div id="Header">
        <Header />
      </div>

      <div id="Content">
        <Content />
      </div>
    </div>
  );
}

