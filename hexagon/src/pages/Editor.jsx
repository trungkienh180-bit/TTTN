import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Puck } from '@measured/puck';
import '@measured/puck/puck.css';
import puckConfig from '../../admin-puck-config';
import { pageService } from '../services/pageService';
import { ArrowLeft, Globe, Edit3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Editor() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const { currentLang, switchLanguage } = useLanguage();

  useEffect(() => {
    if (pageId) {
      const pageData = pageService.getById(pageId);
      if (pageData) {
        setPage(pageData);
        setEditTitle(pageData.title);
        setEditSlug(pageData.slug);
        // Force the editor context to match the page language initially
        if (pageData.language === 'EN') {
          switchLanguage('en');
        } else {
          switchLanguage('vi');
        }
      } else {
        // Page not found, go back
        navigate('/');
      }
    }
  }, [pageId, navigate]);

  const handlePublish = (data) => {
    if (page) {
      // Priority: Inline edits in header override everything
      const newTitle = editTitle || data.root?.props?.title || page.title;
      const newSlug = editSlug || data.root?.props?.slug || page.slug;
      
      // Update page with new content
      pageService.update(page.id, {
        title: newTitle,
        slug: newSlug,
        content: data,
        status: 'Đã xuất bản' // Optionally change status to published
      });
      // Navigate to the published page to view it
      navigate(newSlug);
    }
  };

  if (!page) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  // Fallback initial data if page has no content yet
  const initialData = page.content && page.content.root ? page.content : { content: [], root: {}, zones: {} };
  
  if (!initialData.zones) {
    initialData.zones = {};
  }
  if (!initialData.root.props) {
    initialData.root.props = {};
  }
  if (!initialData.root.props.title) {
    initialData.root.props.title = page.title;
  }
  if (!initialData.root.props.slug) {
    initialData.root.props.slug = page.slug;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-10 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
            title="Quay lại"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {!isEditingMeta ? (
              <>
                <div>
                  <h2 className="font-semibold text-gray-800 text-sm">{editTitle}</h2>
                  <p className="text-xs text-gray-500">{editSlug}</p>
                </div>
                <button 
                  onClick={() => setIsEditingMeta(true)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600 transition-colors ml-1"
                  title="Sửa tên và đường dẫn"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-1.5 py-1">
                <input 
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="text-sm font-semibold border border-gray-300 rounded px-2 py-0.5 outline-none focus:border-blue-500"
                  placeholder="Tên trang..."
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <input 
                    type="text"
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="text-xs text-gray-500 border border-gray-300 rounded px-2 py-0.5 outline-none focus:border-blue-500 w-40"
                    placeholder="/duong-dan"
                  />
                  <button 
                    onClick={() => setIsEditingMeta(false)}
                    className="text-xs bg-gray-800 text-white px-2 py-0.5 rounded hover:bg-gray-700 font-medium"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => switchLanguage('vi')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-sm font-medium transition-colors ${currentLang === 'vi' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Globe className="w-4 h-4" />
              Xem Tiếng Việt
            </button>
            <button
              onClick={() => switchLanguage('en')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-sm font-medium transition-colors ${currentLang === 'en' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Globe className="w-4 h-4" />
              Xem Tiếng Anh
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        <Puck
          config={puckConfig}
          data={initialData}
          iframe={{ enabled: false }}
          onPublish={handlePublish}
        />
      </div>
    </div>
  );
}
