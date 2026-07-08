import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pageService } from '../services/pageService';
import { 
  FileText, 
  Copy, 
  Edit3, 
  Trash2, 
  Plus, 
  Search,
  Calendar,
  Download,
  Upload
} from 'lucide-react';

export default function Dashboard() {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = () => {
    const data = pageService.getAll();
    setPages(data);
  };

  const handleCreateNew = () => {
    const newPage = pageService.create({
      title: 'Trang mới',
      slug: '/trang-moi',
      language: 'VI',
      status: 'Bản nháp',
      content: { content: [], root: {} }
    });
    navigate(`/editor/${newPage.id}`);
  };

  const handleDuplicate = (id) => {
    const newPage = pageService.duplicate(id, 'EN');
    if (newPage) {
      navigate(`/editor/${newPage.id}`);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editor/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa trang này?')) {
      pageService.delete(id);
      loadPages();
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleExportData = () => {
    const data = localStorage.getItem('hexagon_pages');
    if (!data) return alert('Không có dữ liệu để xuất!');
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hexagon_pages.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (Array.isArray(json)) {
          localStorage.setItem('hexagon_pages', JSON.stringify(json));
          loadPages();
          alert('Nhập dữ liệu thành công!');
        } else {
          alert('File không đúng định dạng!');
        }
      } catch (err) {
        alert('Lỗi đọc file: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              Quản lý Pages
            </h1>
            <p className="text-gray-500 mt-1">Tạo và quản lý các trang với PUCK Visual Builder</p>
          </div>
          <div className="flex items-center gap-3">
            <input 
              type="file" 
              accept=".json" 
              id="import-file" 
              style={{ display: 'none' }} 
              onChange={handleImportData} 
            />
            <button 
              onClick={() => document.getElementById('import-file').click()}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
            >
              <Upload className="w-5 h-5" />
              Nhập JSON
            </button>
            <button 
              onClick={handleExportData}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
            >
              <Download className="w-5 h-5" />
              Xuất JSON
            </button>
            <button 
              onClick={handleCreateNew}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Tạo Page Mới
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-5 flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ</label>
            <select className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option>Tất cả</option>
              <option>Tiếng Việt (VI)</option>
              <option>Tiếng Anh (EN)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option>Tất cả</option>
              <option>Đã xuất bản</option>
              <option>Bản nháp</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày cập nhật</label>
            <div className="relative">
              <input 
                type="date" 
                className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider text-center">Ngôn ngữ</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider text-center">Trạng thái</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Cập nhật</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pages.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500">
                    Chưa có trang nào. Hãy tạo trang mới!
                  </td>
                </tr>
              ) : (
                pages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{page.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">SEO: {page.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-sm font-mono">
                        {page.slug}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs ${page.language === 'VI' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {page.language}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${page.status === 'Đã xuất bản' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {formatDate(page.updatedAt)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {page.language === 'VI' && (
                          <button 
                            onClick={() => handleDuplicate(page.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group relative"
                            title="Tạo bản dịch EN"
                          >
                            <Copy className="w-4 h-4" />
                            <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              Tạo bản dịch EN
                            </span>
                          </button>
                        )}
                        <button 
                          onClick={() => handleEdit(page.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Sửa"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(page.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
