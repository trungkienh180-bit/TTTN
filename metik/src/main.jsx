import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Puck, Render } from '@measured/puck';
import '@measured/puck/puck.css';
import './index.css';
import '../admin-puck-config.jsx'; // Just to ensure it loads
import { puckConfig } from '../admin-puck-config.jsx';

// Dữ liệu mẫu (initial data) cho Puck
const initialData = {
  content: [],
  root: {},
};

function App() {
  // Trạng thái lưu trữ dữ liệu của trang
  const [data, setData] = useState(initialData);
  // Trạng thái bật/tắt chế độ xem trước (preview)
  const [isPreview, setIsPreview] = useState(false);

  // Nếu đang ở chế độ preview, hiển thị giao diện người dùng cuối với <Render>
  if (isPreview) {
    return (
      <div>
        {/* Nút nổi để quay lại chế độ Editor */}
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 999999 }}>
          <button 
            onClick={() => setIsPreview(false)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            ← Quay lại chỉnh sửa
          </button>
        </div>
        
        {/* Component Render của Puck sẽ render giao diện thực tế (chạy được các hiệu ứng JS, CSS) */}
        <Render config={puckConfig} data={data} />
      </div>
    );
  }

  // Nếu không phải preview, hiển thị trình chỉnh sửa Puck
  return (
    <Puck 
      config={puckConfig} 
      data={data} 
      onPublish={(newData) => {
        // Cập nhật dữ liệu mới và chuyển sang chế độ Preview
        setData(newData);
        setIsPreview(true);
      }} 
    />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
