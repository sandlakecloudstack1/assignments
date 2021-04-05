import React, { useState } from "react";
import "./index.css";

interface Props {
  eq: string;
  result: string;
}

function Touchables(props: Props) {
  const [eq, setEq] = useState(props.eq);
  const [result, setResult] = useState(props.result);
  const btns = [
    [
      { text: "AC", type: "topButton" },
      { text: "+/-", type: "topButton" },
      { text: "%", type: "topButton" },
      { text: "/", type: "topButton" },
    ],
    [
      { text: "7", type: "centerButton" },
      { text: "8", type: "centerButton" },
      { text: "9", type: "centerButton" },
      { text: "*", type: "rightButton" },
    ],
    [
      { text: "4", type: "centerButton" },
      { text: "5", type: "centerButton" },
      { text: "6", type: "centerButton" },
      { text: "-", type: "rightButton" },
    ],
    [
      { text: "1", type: "centerButton" },
      { text: "2", type: "centerButton" },
      { text: "3", type: "centerButton" },
      { text: "+", type: "rightButton" },
    ],
    [
      { text: "0", type: "zeroButton" },
      { text: ".", type: "centerButton" },
      { text: "=", type: "rightButton" },
    ],
  ];
  return (
    <div>
      {/*算式*/}
      <div className="formulaText">{eq}</div>
      {/*输出结果*/}
      <div className="resultText">{result}</div>
      {/*按键*/}
      <table>
        <tbody>
          {btns.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((btn) => {
                  return (
                    <th
                      key={btn.text}
                      colSpan={btn.text === "0" ? 2 : 1}
                      className={btn.type}
                      onClick={() => {
                        const [eq_return, result_return] = _onPressButton(
                          eq,
                          btn.text
                        );
                        setEq(eq_return);
                        setResult(result_return);
                      }}
                    >
                      {btn.text}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function _onPressButton(eq: string, num: string): Array<string> {
  let eq_return: string = eq + num;
  let result_return: string = "0";
  let last: string = eq_return.substring(eq_return.length - 1); //表达式的最后一位
  let second: string = eq_return.substring(
    eq_return.length - 2,
    eq_return.length - 1
  ); //表达式的倒数第二位
  let two: string = eq_return.substring(eq_return.length - 2); //表达式的最后两位组成的字符串
  switch (num) {
    case "+/-":
      eq_return = eq_return.substring(0, eq_return.length - 3);
      break;
    case "%":
      eq_return = eq_return.substring(0, eq_return.length - 1);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      //每当按下+-*/四个操作符时都会判断前面的(倒数第二位)字符串是否也是+-*/四个操作符中的任何一个，
      //如果是的话就让最后一个操作符代替(replace()方法)最后两个操作符，然后更新状态
      if (
        second === "+" ||
        second === "-" ||
        second === "*" ||
        second === "/"
      ) {
        eq_return = eq_return.replace(two, last);
      }
      break;
    case "=":
      eq_return = eq_return.substring(0, eq_return.length - 1);
      result_return = eval(eq_return);
      eq_return = "";
      break;
    case "AC":
      eq_return = "";
      result_return = "0";
      break;
  }

  return [eq_return, result_return];
}

export default Touchables;
