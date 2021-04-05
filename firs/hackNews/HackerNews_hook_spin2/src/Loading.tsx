// 创建Loading组件，应用于页面交互
export default function Loading(props: any) {
  return (
    <div className="loadSpan">
      <span id="urlSpan">{props.loadText}</span>
    </div>
  );
}

