import { useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import ccochi from "../assets/ccochi.jpeg";
import zzazang from "../assets/zzazang.jpeg";
import pizza from "../assets/pizza.jpeg";
import jook from "../assets/jook.jpeg";
import moms from "../assets/moms.jpeg";
import sushi from "../assets/sushi.jpeg";
import ttk from "../assets/ttk.jpeg";
import chicken from "../assets/chicken.jpeg";
import "./Home.css";

const stores = [
  {
    id: 1,
    name: "왕꼬치",
    image: ccochi,
    rate: 4.6,
    subscription: "배달비 3,000원",
    menus: [
      {
        id: 1,
        name: "소고기 꼬치 세트 (5ea)",
        desc: "프리미엄 소고기 꼬치 5개",
        price: 15000,
        option: [
          { label: "매운맛", extra: 0 },
          { label: "중간맛", extra: 0 },
          { label: "순한맛", extra: 0 },
        ],
      },
      {
        id: 2,
        name: "닭꼬치 세트 (5ea)",
        desc: "간장 양념 닭꼬치 5개",
        price: 12000,
        option: [
          { label: "매운맛", extra: 0 },
          { label: "중간맛", extra: 0 },
          { label: "순한맛", extra: 0 },
        ],
      },
      {
        id: 3,
        name: "떡꼬치 (3ea)",
        desc: "매콤달콤 떡꼬치 3개",
        price: 5000,
        option: [
          { label: "매운맛", extra: 0 },
          { label: "중간맛", extra: 0 },
          { label: "순한맛", extra: 0 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "홍콩반점",
    image: zzazang,
    rate: 4.3,
    subscription: "배달비 2,000원",
    menus: [
      {
        id: 1,
        name: "짜장면",
        desc: "춘장 볶음 짜장면",
        price: 7000,
        option: [
          { label: "곱빼기", extra: 1000 },
          { label: "보통", extra: 0 },
        ],
      },
      {
        id: 2,
        name: "짬뽕",
        desc: "해물 얼큰 짬뽕",
        price: 8000,
        option: [
          { label: "곱빼기", extra: 1000 },
          { label: "보통", extra: 0 },
        ],
      },
      {
        id: 3,
        name: "탕수육",
        desc: "바삭한 찹쌀 탕수육",
        price: 16000,
        option: [
          { label: "소", extra: 0 },
          { label: "중", extra: 1000 },
          { label: "대", extra: 2000 },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "피자헛",
    image: pizza,
    rate: 4.1,
    subscription: "배달비 무료",
    menus: [
      {
        id: 1,
        name: "페퍼로니 피자",
        desc: "클래식 페퍼로니",
        price: 22000,
        option: [
          { label: "L", extra: 1000 },
          { label: "R", extra: 0 },
        ],
      },
      {
        id: 2,
        name: "치즈 크러스트",
        desc: "더블 치즈 크러스트",
        price: 25000,
        option: [
          { label: "L", extra: 1000 },
          { label: "R", extra: 0 },
        ],
      },
      {
        id: 3,
        name: "갈릭 포테이토",
        desc: "갈릭 소스 포테이토",
        price: 18000,
        option: [
          { label: "L", extra: 1000 },
          { label: "R", extra: 0 },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "교촌치킨",
    image: chicken,
    rate: 4.5,
    subscription: "배달비 1,000원",
    menus: [
      {
        id: 1,
        name: "교촌 간장",
        desc: "간장 양념 치킨 한 마리",
        price: 19000,
        option: [
          { label: "오리지널", extra: 0 },
          { label: "순살", extra: 1000 },
          { label: "콤보", extra: 2000 },
        ],
      },
      {
        id: 2,
        name: "교촌 레드",
        desc: "허니 소스 치킨 한 마리",
        price: 20000,
        option: [
          { label: "오리지널", extra: 0 },
          { label: "순살", extra: 1000 },
          { label: "콤보", extra: 2000 },
        ],
      },
      {
        id: 3,
        name: "교촌 허니",
        desc: "바삭한 순살 텐더 8조각",
        price: 12000,
        option: [
          { label: "오리지널", extra: 0 },
          { label: "순살", extra: 1000 },
          { label: "콤보", extra: 2000 },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "맘스터치",
    image: moms,
    rate: 4.2,
    subscription: "배달비 2,500원",
    menus: [
      {
        id: 1,
        name: "싸이버거",
        price: 7900,
        option: [
          { label: "단품", extra: 0 },
          { label: "세트", extra: 1000 },
        ],
      },
      {
        id: 2,
        name: "불싸이버거",
        price: 8500,
        option: [
          { label: "단품", extra: 0 },
          { label: "세트", extra: 1000 },
        ],
      },
      {
        id: 3,
        name: "딥치즈버거",
        desc: "달콤 매콤 양념 치킨",
        price: 9000,
        option: [
          { label: "단품", extra: 0 },
          { label: "세트", extra: 1000 },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "스시로",
    image: sushi,
    rate: 4.7,
    subscription: "배달비 3,500원",
    menus: [
      {
        id: 1,
        name: "연어 초밥 세트 (10p)",
        desc: "생연어 초밥 10피스",
        price: 18000,
        option: [
          { label: "와사비 추가", extra: 1000 },
          { label: "생강 추가", extra: 1000 },
        ],
      },
      {
        id: 2,
        name: "모듬 사시미",
        desc: "연어 + 참치 + 광어 모듬",
        price: 24000,
        option: [
          { label: "와사비 추가", extra: 1000 },
          { label: "생강 추가", extra: 1000 },
        ],
      },
      {
        id: 3,
        name: "새우 튀김 우동",
        desc: "새우 튀김 2개 + 우동",
        price: 9500,
        option: [
          { label: "새우 추가", extra: 1000 },
          { label: "면 추가", extra: 1000 },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "본죽",
    image: jook,
    rate: 4.4,
    subscription: "배달비 1,500원",
    menus: [
      {
        id: 1,
        name: "전복죽",
        desc: "제주산 전복 죽",
        price: 13000,
        option: [
          { label: "전복 추가", extra: 1000 },
        ],
      },
      {
        id: 2,
        name: "소고기미역국",
        desc: "한우 소고기 미역국",
        price: 10000,
        option: [
          { label: "소고기 추가", extra: 1000 },
        ],
      },
      {
        id: 3,
        name: "참치야채죽",
        desc: "참치 + 야채 영양죽",
        price: 9000,
        option: [
          { label: "참치 추가", extra: 1000 },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "떡볶이랩소디",
    image: ttk,
    rate: 4.0,
    subscription: "배달비 2,000원",
    menus: [
      {
        id: 1,
        name: "로제 떡볶이",
        desc: "크림 로제 소스 떡볶이",
        price: 8000,
        option: [
          { label: "매운맛", extra: 0 },
          { label: "중간맛", extra: 0 },
          { label: "순한맛", extra: 0 },
        ],
      },
      {
        id: 2,
        name: "마라 떡볶이",
        desc: "마라 소스 극한 떡볶이",
        price: 7000,
        option: [
          { label: "매운맛", extra: 0 },
          { label: "중간맛", extra: 0 },
          { label: "순한맛", extra: 0 },
        ],
      },
      {
        id: 3,
        name: "모듬 튀김 세트",
        desc: "김말이 + 고구마 + 새우 튀김",
        price: 6000,
        option: [
          { label: "김말이 추가", extra: 1000 },
          { label: "고구마 추가", extra: 1000 },
          { label: "새우튀김 추가", extra: 1000 },
        ],
      },
    ],
  },
];

function Home() {
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <div className="home-container">
      <div className="card-grid">
        {stores.map((item) => (
          <Card
            key={item.id}
            {...item}
            onClick={() => setSelectedStore(item)}
          />
        ))}
      </div>
      {selectedStore && (
        <Modal
          menus={selectedStore.menus}
          name={selectedStore.name}
          rate={selectedStore.rate}
          storeId={selectedStore.id}
          onClose={() => setSelectedStore(null)}
        />
      )}
    </div>
  );
}

export default Home;
