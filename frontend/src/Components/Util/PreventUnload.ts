import {useEffect} from "react";

const PreventUnload = () => {
  // 새로고침 막기 변수
  function preventClose(e: BeforeUnloadEvent) {
    e.preventDefault();
    e.returnValue = "";
  }

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);
};

export default PreventUnload;
