import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreditStore from "../store/creditStore";
import Layout from "../components/Layout";
import "./CreditCharge.css";

const CHARGE_OPTIONS = [1000, 3000, 5000, 10000];

function CreditCharge() {
  const credit = useCreditStore((state) => state.credit);
  const charge = useCreditStore((state) => state.charge);
  const fetchCredit = useCreditStore((state) => state.fetchCredit);
  const navigate = useNavigate();

  const [chargeAmount, setChargeAmount] = useState(0);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    fetchCredit();
  }, [fetchCredit]);

  const afterCredit = credit + chargeAmount;

  const handleAddAmount = (amount) => {
    setChargeAmount((prev) => prev + amount);
  };

  const handleReset = () => {
    setChargeAmount(0);
  };

  const handleCharge = async () => {
    if (chargeAmount <= 0) {
      alert("충전할 금액을 선택해주세요.");
      return;
    }

    try {
      setIsCharging(true);
      await charge(chargeAmount);
      alert(`${chargeAmount.toLocaleString()}C가 충전되었습니다.`);
      setChargeAmount(0);
      navigate(-1);
    } catch (error) {
      alert(error.message || "충전에 실패했습니다.");
    } finally {
      setIsCharging(false);
    }
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
            <button key={amount} onClick={() => handleAddAmount(amount)}>
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
            <span>{chargeAmount.toLocaleString()}원</span>
          </div>
        </div>

        {chargeAmount > 0 && (
          <button className="btn-reset" onClick={handleReset}>
            초기화
          </button>
        )}

        <button className="btn-charge" onClick={handleCharge} disabled={isCharging}>
          {isCharging ? "충전 중..." : "충전하기"}
        </button>
      </div>
    </Layout>
  );
}

export default CreditCharge;
