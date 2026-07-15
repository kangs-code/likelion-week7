import { useState, useEffect } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Layout from "../components/Layout";
import { getStores, getStoreDetail } from "../api/StoreApi";
import "./Home.css";

function Home() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const result = await getStores();
        setStores(result || []);
      } catch (error) {
        console.error("가게 목록 조회 실패:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStores();
  }, []);

  
  const handleStoreClick = async (store) => {
    try {
      const detail = await getStoreDetail(store.storeId);
      setSelectedStore(detail);
    } catch (error) {
      alert("가게 정보를 불러올 수 없습니다.");
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="home-container">
        {isLoading ? (
          <p className="loading-text">가게 목록을 불러오는 중...</p>
        ) : stores.length === 0 ? (
          <p className="empty-text">등록된 가게가 없습니다.</p>
        ) : (
          <div className="card-grid">
            {stores.map((store) => (
              <Card
                key={store.storeId}
                image={store.storeImageUrl}
                name={store.storeName}
                rate={store.rating}
                subscription={store.categoryName}
                onClick={() => handleStoreClick(store)}
              />
            ))}
          </div>
        )}

        {selectedStore && (
          <Modal
            store={selectedStore}
            onClose={() => setSelectedStore(null)}
          />
        )}
      </div>
    </Layout>
  );
}

export default Home;