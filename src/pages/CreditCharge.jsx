import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreditStore from "../store/creditStore";
import Layout from "../components/Layout";
import "./CreditCharge.css";

// 다음 주 API 연동을 고려해 충전 금액 프리셋을 데이터로 분리해둠.
// (서버에서 상품 목록을 받아오는 형태로 바뀌어도 렌더링 로직은 그대로 재사용 가능)
const CHARGE_OPTIONS = [1000, 3000, 5000, 10000];

function CreditCharge() {
  const credit = useCreditStore((state) => state.credit);
  const charge = useCreditStore((state) => state.charge);
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);

  const afterCredit = credit + (selected ?? 0);

  const handleCharge = () => {
    if (!selected) {
      alert("충전할 금액을 선택해주세요.");
      return;
    }

    charge(selected);
    alert(`${selected.toLocaleString()}C가 충전되었습니다.`);
    navigate(-1);
  };

  return (
    <Layout>
      <div className="charge-container">
        <button className="charge-back" onClick={() => navigate(-1)}>
          ←
        </button>

        <h2>크레딧 충전하기</h2>

        <div className="charge-options">
          {CHARGE_OPTIONS.map((amount) => (
            <button
              key={amount}
              className={selected === amount ? "active" : ""}
              onClick={() => setSelected(amount)}
            >
              +{amount.toLocaleString()}C
            </button>
          ))}
        </div>

        <div className="charge-summary">
          <div className="charge-row">
            <span>보유 크레딧</span>
            <span>{credit.toLocaleString()}C</span>
          </div>
          <div className="charge-row charge-after">
            <span>충전 후 크레딧</span>
            <span>{afterCredit.toLocaleString()}C</span>
          </div>
          <div className="charge-row charge-price">
            <span>결제금액</span>
            <span>{(selected ?? 0).toLocaleString()}원</span>
          </div>
        </div>

        <button className="btn-charge" onClick={handleCharge}>
          충전하기
        </button>
      </div>
    </Layout>
  );
}

export default CreditCharge;
