import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Render } from '@measured/puck';
import puckConfig from '../../admin-puck-config';
import { pageService } from '../services/pageService';
import '@measured/puck/puck.css';

export default function RenderPage() {
  const location = useLocation();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find page by slug (e.g. location.pathname === '/trang-moi')
    const pages = pageService.getAll();
    const decodedPath = decodeURIComponent(location.pathname);
    const normalizeSlug = (s) => (s.startsWith('/') ? s : '/' + s);
    
    const foundPage = pages.find(p => {
      if (!p.slug) return false;
      const normalizedP = normalizeSlug(p.slug);
      return normalizedP === decodedPath || normalizedP === location.pathname;
    });
    
    setPage(foundPage || null);
    setLoading(false);
  }, [location.pathname]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
        <h1 className="text-4xl font-bold mb-4">404 - Không tìm thấy trang</h1>
        <p className="text-gray-500 mb-8">Trang bạn đang tìm kiếm không tồn tại hoặc chưa được xuất bản.</p>
        <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Quay về Trang chủ quản lý
        </a>
      </div>
    );
  }

  // Fallback initial data if page has no content yet
  const pageData = page.content && page.content.root ? page.content : { content: [], root: {}, zones: {} };
  
  if (!pageData.zones) {
    pageData.zones = {};
  }

  return (
    <div className="w-full h-full min-h-screen">
      <Render config={puckConfig} data={pageData} />
    </div>
  );
}
