import { Component, ReactNode, ErrorInfo } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false, // 오류가 발생했는지 여부를 state 상태로 저장합니다.
      error: null, // 발생한 오류의 정보를 state 상태로 저장합니다.
    };
  }

  /*
    getDerivedStateFromError 메소드는 하위 컴포넌트에서 오류의 정보를 return을 통해서 State에 저장하는 역할을 합니다.
    error 파라미터는 발생한 오류의 정보를 담고 있습니다.
  */
  static getDerivedStateFromError(error) {
    // 오류 상태 업데이트
    return {
      hasError: true,
      error,
    };
  }

  /* componentDidCatch 메소드는 오류 정보와 상세 정보를 파라미터로 얻을 수 있습니다.
    주로 오류를 로깅해야 할때 해당 메소드에 접근해서 로깅할 수 있습니다. 
  */
  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    const { state, props } = this;

    const { hasError } = state;

    const { children } = props;

    // 오류 발생 여부를 체크하여, 오류가 발생했을때 조건부 렌더링 처리를 해줍니다.
    return hasError ? <div>오류가 발생했어요!</div> : children;
  }
}
