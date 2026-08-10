import React from 'react';
import { Puck } from "@measured/puck";
import "@measured/puck/dist/index.css";
import { puckConfig } from "./admin-puck-config"; // Kết nối với bộ não cấu hình của mày

// Khởi tạo dữ liệu ban đầu cho trang web
const initialData = {
  content: [],
  root: {},
};

function App() {
  const save = (data) => {
    console.log("Data đã lưu:", data);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Puck config={puckConfig} data={initialData} onSave={save} />
    </div>
  );
}

export default App;