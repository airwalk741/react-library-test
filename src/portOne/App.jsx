import React, { useEffect } from "react";
import axios from "axios";

const IMP = window.IMP; // 생략 가능
IMP.init(""); // 예: imp00000000a

export default function App() {
  function requestPay() {
    IMP.request_pay(
      {
        pg: "kcp.AO09C",
        pay_method: "card",
        merchant_uid: "ORD20180131-0000008", // 주문번호
        name: "노르웨이 회전 의자",
        amount: 64900, // 숫자 타입
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍ㅂㅈㄷㄹ길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
      },
      function (rsp) {
        console.log(rsp);
      }
    );
  }

  const cancelPay = () => {
    axios({
      url: "http://127.0.0.1:8088/cancel", // 예: http://www.myservice.com/payments/cancel
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        merchant_uid: "ORD20180131-0000009", // 주문번호
        cancel_request_amount: 2000, // 환불금액
        reason: "테스트 결제 환불", // 환불사유
        // refund_holder: "홍길동", // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
        // refund_bank: "88", // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
        // refund_account: "56211105948400", // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
      },
    });
  };

  return (
    <div>
      <h1>test</h1>
      <button onClick={requestPay}>결제</button>
      <button onClick={cancelPay}>환불</button>
    </div>
  );
}
