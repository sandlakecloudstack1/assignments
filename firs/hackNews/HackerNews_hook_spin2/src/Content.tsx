import ItemContent from "./ItemContent";
import emiter from "./event";
import { useState, useEffect } from "react";
import { Spin,Alert  } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
// 设置条目的数目,默认为60个
const dafaultNum: number = 60;
// 设置加载标志位
let flags: number = 0;
// 创建函数式内容组件
export default function Content() {
  // 设置id数组
  const [num, setNum] = useState([]);
  // 设置loading的开启状态
  const [LoadStatus, setLoadStatus] = useState(false);
  // 设置加载指示符
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  //获取每个条目的id
  useEffect(() => {
    
    // 获取整个条目id和内容
    get_num();
    // 设置事件监听器
    emiter.addListener("callME", () => {
      // 页面内更新数据
      get_num();
      setLoadStatus(true);
      setTimeout(() => {
        setLoadStatus(false);
      }, 500);
    });
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  function get_num() {
    fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    )
      .then((res) => res.json())
      .then((result) => {
        setNum((num) => (num = result));
      });
  }

  // 设置子组件的回调函数
  function callback() {
    setLoadStatus(true);
    flags++;
    if (flags === dafaultNum || flags === num.length) {
      setLoadStatus(false);
    } else {
      setTimeout(() => {
        setLoadStatus(false);
      }, 15000);
    }
  }

  // 设置id数组的长度，
  if (num.length > dafaultNum) {
    setNum((num) => (num = num.slice(0, dafaultNum)));
  }

  // 将id数组中的id映射到子组件
  const listItems = num.map((number: number) => (
    <ItemContent
      key={number.toString()}
      idNum={number}
      fathToChildren={callback}
    ></ItemContent>
  ));

  return (
    <div>
      <Spin
        className="loadSpan"
        tip="Loading..."
        spinning={LoadStatus}
        indicator={antIcon}
      >
      <Alert
            message=" "
          />
      </Spin>
      {listItems}
    </div>
  );
}
