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
      },
      {
        id: 2,
        name: "닭꼬치 세트 (5ea)",
        desc: "간장 양념 닭꼬치 5개",
        price: 12000,
      },
      { id: 3, name: "떡꼬치 (3ea)", desc: "매콤달콤 떡꼬치 3개", price: 5000 },
    ],
  },
  {
    id: 2,
    name: "홍콩반점",
    image: zzazang,
    rate: 4.3,
    subscription: "배달비 2,000원",
    menus: [
      { id: 1, name: "짜장면", desc: "춘장 볶음 짜장면", price: 7000 },
      { id: 2, name: "짬뽕", desc: "해물 얼큰 짬뽕", price: 8000 },
      { id: 3, name: "탕수육 (중)", desc: "바삭한 찹쌀 탕수육", price: 16000 },
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
        name: "페퍼로니 피자 (L)",
        desc: "클래식 페퍼로니",
        price: 22000,
      },
      {
        id: 2,
        name: "치즈 크러스트 (L)",
        desc: "더블 치즈 크러스트",
        price: 25000,
      },
      {
        id: 3,
        name: "갈릭 포테이토 (M)",
        desc: "갈릭 소스 포테이토",
        price: 18000,
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
        name: "교촌 오리지널",
        desc: "간장 양념 치킨 한 마리",
        price: 19000,
      },
      {
        id: 2,
        name: "교촌 허니콤보",
        desc: "허니 소스 치킨 한 마리",
        price: 20000,
      },
      {
        id: 3,
        name: "치킨 텐더 (8ea)",
        desc: "바삭한 순살 텐더 8조각",
        price: 12000,
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
        name: "싸이버거 세트",
        desc: "싸이버거 + 감자튀김 + 콜라",
        price: 7900,
      },
      {
        id: 2,
        name: "불싸이버거 세트",
        desc: "불싸이버거 + 감자튀김 + 콜라",
        price: 8500,
      },
      {
        id: 3,
        name: "양념 치킨 (반마리)",
        desc: "달콤 매콤 양념 치킨",
        price: 9000,
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
      },
      {
        id: 2,
        name: "모듬 사시미",
        desc: "연어 + 참치 + 광어 모듬",
        price: 24000,
      },
      {
        id: 3,
        name: "새우 튀김 우동",
        desc: "새우 튀김 2개 + 우동",
        price: 9500,
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
      { id: 1, name: "전복죽", desc: "제주산 전복 죽", price: 13000 },
      { id: 2, name: "소고기미역국", desc: "한우 소고기 미역국", price: 10000 },
      { id: 3, name: "참치야채죽", desc: "참치 + 야채 영양죽", price: 9000 },
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
      },
      {
        id: 2,
        name: "매운 떡볶이",
        desc: "불닭 소스 극한 떡볶이",
        price: 7000,
      },
      {
        id: 3,
        name: "모듬 튀김 세트",
        desc: "김말이 + 고구마 + 새우 튀김",
        price: 6000,
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
          onClose={() => setSelectedStore(null)}
        />
      )}
    </div>
  );
}

export default Home;
