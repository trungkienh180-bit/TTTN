import defaultPages from '../data/defaultPages.json';

const STORAGE_KEY = 'hexagon_pages';


const getPages = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : defaultPages;
};

const savePages = (pages) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  } catch (error) {
    console.error("Lỗi lưu dữ liệu:", error);
    if (error.name === 'QuotaExceededError' || error.message.includes('quota')) {
      alert('🚨 Trình duyệt đã báo đầy bộ nhớ (vượt quá 5MB của localStorage)! Các thay đổi vừa rồi KHÔNG ĐƯỢC LƯU.\n\nGiải pháp: Hãy ra ngoài xóa bớt các trang không dùng đến hoặc hạn chế copy paste ảnh trực tiếp (dung lượng rất nặng).');
    } else {
      alert('Lỗi khi lưu dữ liệu: ' + error.message);
    }
    throw error;
  }
};

export const pageService = {
  getAll: () => {
    return getPages();
  },

  getById: (id) => {
    const pages = getPages();
    return pages.find((p) => p.id === id);
  },

  create: (pageData) => {
    const pages = getPages();
    const newPage = {
      ...pageData,
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      updatedAt: new Date().toISOString(),
    };
    pages.push(newPage);
    savePages(pages);
    return newPage;
  },

  update: (id, updates) => {
    const pages = getPages();
    const index = pages.findIndex((p) => p.id === id);
    if (index !== -1) {
      pages[index] = { ...pages[index], ...updates, updatedAt: new Date().toISOString() };
      savePages(pages);
      return pages[index];
    }
    return null;
  },

  delete: (id) => {
    const pages = getPages();
    const newPages = pages.filter((p) => p.id !== id);
    savePages(newPages);
  },

  duplicate: (id, newLanguage = 'EN') => {
    const pages = getPages();
    const pageToDuplicate = pages.find((p) => p.id === id);
    
    if (pageToDuplicate) {
      const newPage = {
        ...pageToDuplicate,
        id: Date.now().toString() + Math.random().toString(36).substring(2),
        title: `${pageToDuplicate.title} (${newLanguage})`,
        language: newLanguage,
        updatedAt: new Date().toISOString(),
      };
      pages.push(newPage);
      savePages(pages);
      return newPage;
    }
    return null;
  }
};
