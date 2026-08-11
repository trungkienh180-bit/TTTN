import React, { useState, useEffect } from 'react';
import { Puck, Render } from "@measured/puck";
import "@measured/puck/dist/index.css";
import { puckConfig } from "./admin-puck-config"; // Kết nối với bộ não cấu hình của mày

// Khởi tạo dữ liệu ban đầu cho trang web
const initialData = {
  content: [],
  root: {},
};

function App() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('puck-data');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [isViewing, setIsViewing] = useState(false);

  const save = (newData) => {
    console.log("Data đã lưu:", newData);
    setData(newData);
    localStorage.setItem('puck-data', JSON.stringify(newData));
  };

  const publish = (newData) => {
    console.log("Data đã publish:", newData);
    setData(newData);
    localStorage.setItem('puck-data', JSON.stringify(newData));
    setIsViewing(true); // Chuyển sang chế độ xem web
  };

  if (isViewing) {
    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setIsViewing(false)}
          style={{
            position: 'fixed', top: '20px', left: '20px', zIndex: 9999,
            padding: '10px 20px', background: '#0B5077', color: 'white',
            borderRadius: '8px', cursor: 'pointer', border: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontWeight: 'bold'
          }}
        >
          ← Quay lại Editor
        </button>
        <Render config={puckConfig} data={data} />
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Puck config={puckConfig} data={data} onSave={save} onPublish={publish} />
    </div>
  );
}

export default App;