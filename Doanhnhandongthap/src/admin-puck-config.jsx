import React from 'react';
import AdminHeading from './components/admin-heading';
import AdminText from './components/admin-text';
import AdminImage from './components/admin-image';
import AdminSection, { AdminHeader, AdminPartners } from './components/admin-section';
import AdminHero from './components/admin-hero';

export const puckConfig = {
  components: {
    Heading: {
      label: 'Tiêu đề',
      fields: {
        content: { type: 'text', label: 'Nội dung', contentEditable: true },
        level: {
          type: 'select', label: 'Cấp độ',
          options: [
            { label: 'H1', value: 1 }, { label: 'H2', value: 2 },
            { label: 'H3', value: 3 }, { label: 'H4', value: 4 },
            { label: 'H5', value: 5 }, { label: 'H6', value: 6 }
          ]
        },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: { content: 'Tiêu đề', level: 2, align: 'left' },
      render: (props) => <AdminHeading {...props} />
    },

    Text: {
      label: 'Văn bản',
      fields: {
        content: { type: 'textarea', label: 'Nội dung', contentEditable: true },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' },
            { label: 'Đều', value: 'justify' }
          ]
        }
      },
      defaultProps: { content: 'Văn bản mẫu', align: 'left' },
      render: (props) => <AdminText {...props} />
    },

    Image: {
      label: 'Hình ảnh',
      fields: {
        src: { type: 'text', label: 'URL Hình ảnh' },
        alt: { type: 'text', label: 'Mô tả thay thế' },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        },
        width: { type: 'text', label: 'Chiều rộng (vd: 100%, 300px)' },
        height: { type: 'text', label: 'Chiều cao' },
        borderRadius: { type: 'text', label: 'Bo góc (vd: 8px, 50%)' }
      },
      defaultProps: { src: 'https://via.placeholder.com/800x400', alt: 'Placeholder', align: 'center', width: '100%', height: 'auto', borderRadius: '0' },
      render: (props) => <AdminImage {...props} />
    },

    Hero: {
      label: 'Hero Banner',
      fields: {
        label: { type: 'text', label: 'Chữ trên cùng (Tagline)', contentEditable: true },
        labelColor: { type: 'text', label: 'Màu Tagline' },
        labelSize: { type: 'text', label: 'Cỡ chữ Tagline' },
        title: { type: 'text', label: 'Tiêu đề chính', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu Tiêu đề' },
        titleSize: { type: 'text', label: 'Cỡ chữ Tiêu đề' },
        subtitle: { type: 'textarea', label: 'Tiêu đề phụ', contentEditable: true },
        subtitleColor: { type: 'text', label: 'Màu Tiêu đề phụ' },
        subtitleSize: { type: 'text', label: 'Cỡ chữ Tiêu đề phụ' },
        borderRadius: { type: 'text', label: 'Bo góc khối nội dung (vd: 16px)' },
        buttons: {
          type: 'array', label: 'Danh sách nút',
          defaultItemProps: {
            text: 'Nút mới',
            url: '#',
            bgColor: '#009dff',
            textColor: '#ffffff',
            borderRadius: '8px',
            fontSize: '16px',
            paddingX: 24,
            paddingY: 12
          },
          arrayFields: {
            text: { type: 'text', label: 'Nội dung nút', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn URL' },
            bgColor: { type: 'text', label: 'Màu nền' },
            textColor: { type: 'text', label: 'Màu chữ' },
            borderColor: { type: 'text', label: 'Màu viền' },
            borderRadius: { type: 'text', label: 'Bo góc (vd: 8px)' },
            fontSize: { type: 'text', label: 'Cỡ chữ (vd: 16px)' },
            paddingX: { type: 'number', label: 'Padding ngang (px)' },
            paddingY: { type: 'number', label: 'Padding dọc (px)' }
          },
          getItemSummary: (item) => item.text || 'Nút'
        },
        background: {
          type: 'object', label: 'Nền Banner',
          objectFields: {
            type: {
              type: 'select', label: 'Loại nền',
              options: [
                { label: 'Màu đơn', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Hình ảnh / GIF', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền' },
            gradientFrom: { type: 'text', label: 'Gradient từ' },
            gradientTo: { type: 'text', label: 'Gradient đến' },
            gradientDirection: { type: 'text', label: 'Hướng gradient' },
            imageUrl: { type: 'text', label: 'URL hình ảnh nền' }
          }
        },
        layout: {
          type: 'object', label: 'Căn lề',
          objectFields: {
            align: {
              type: 'select', label: 'Căn lề nội dung',
              options: [
                { label: 'Trái', value: 'left' },
                { label: 'Giữa', value: 'center' },
                { label: 'Phải', value: 'right' }
              ]
            },
            paddingY: { type: 'number', label: 'Padding dọc (px)' },
            paddingX: { type: 'number', label: 'Padding ngang (px)' },
            minHeight: { type: 'text', label: 'Chiều cao tối thiểu' }
          }
        }
      },
      defaultProps: {
        label: 'LAN TỎA GIÁ TRỊ ĐẤT',
        labelColor: '#e2e8f0',
        labelSize: '14px',
        title: 'Sen Hồng',
        titleColor: '#FDE047',
        titleSize: '3.5rem',
        subtitle: 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác - Đổi mới - Phát triển, CLB đóng vai trò là cầu nối chiến lược, thúc đẩy giá trị kinh doanh và lan tỏa sẻ chia nghĩa tình quê hương.',
        subtitleColor: '#f8fafc',
        subtitleSize: '1rem',
        borderRadius: '24px',
        buttons: [
          {
            text: 'Tham gia cộng đồng', url: '#', bgColor: '#009dff', textColor: '#ffffff',
            borderColor: '', borderRadius: '9999px', fontSize: '1rem', paddingX: 24, paddingY: 12
          }
        ],
        background: {
          type: 'image', color: '', gradientFrom: 'rgb(29, 112, 232)', gradientTo: 'rgb(168, 85, 247)',
          gradientDirection: 'to bottom right', imageUrl: 'https://webdemo.hexagon.xyz/medias/hieuunghero.webp'
        },
        layout: { align: 'left', paddingY: 120, paddingX: 40, minHeight: '600px' }
      },
      render: (props) => <AdminHero {...props} />
    },

    Section: {
      label: 'Khối Section (Vùng chứa)',
      fields: {
        background: {
          type: 'custom', label: 'Nền section',
          render: ({ onChange, value }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <select 
                value={value?.type || 'color'} 
                onChange={(e) => onChange({ ...value, type: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="color">Màu đơn</option>
                <option value="gradient">Gradient</option>
                <option value="image">Hình ảnh / GIF</option>
              </select>
              {value?.type === 'color' && (
                <input type="color" value={value.color || '#ffffff'} onChange={(e) => onChange({ ...value, color: e.target.value })} style={{ width: '100%', height: '40px' }} />
              )}
              {value?.type === 'gradient' && (
                <input type="text" placeholder="e.g. linear-gradient(180deg, #f0e0ff 0%, #e8f4ff 100%)" value={value.gradient || ''} onChange={(e) => onChange({ ...value, gradient: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
              {value?.type === 'image' && (
                <input type="text" placeholder="URL hình ảnh" value={value.bg_image || ''} onChange={(e) => onChange({ ...value, bg_image: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
            </div>
          )
        },
        padding_y: { type: 'number', label: 'Padding dọc (x4 px)' },
        padding_x: { type: 'number', label: 'Padding ngang (x4 px)' },
        container: {
          type: 'select', label: 'Độ rộng tối đa',
          options: [
            { label: 'SM (640px)', value: 'sm' },
            { label: 'MD (768px)', value: 'md' },
            { label: 'LG (1024px)', value: 'lg' },
            { label: 'XL (1280px)', value: 'xl' },
            { label: '2XL (1536px)', value: '2xl' },
            { label: 'Full Width', value: 'full' }
          ]
        }
      },
      defaultProps: {
        variant: 'default',
        background: { type: 'color', color: '#ffffff' },
        padding_y: 10,
        padding_x: 5,
        container: 'xl'
      },
      render: (props) => <AdminSection {...props} />
    },

    Stats: {
      label: 'Thống kê / Hành trình',
      fields: {
        background: {
          type: 'custom', label: 'Nền section',
          render: ({ onChange, value }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <select 
                value={value?.type || 'color'} 
                onChange={(e) => onChange({ ...value, type: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="color">Màu đơn</option>
                <option value="gradient">Gradient</option>
                <option value="image">Hình ảnh / GIF</option>
              </select>
              {value?.type === 'color' && (
                <input type="color" value={value.color || '#f8fafc'} onChange={(e) => onChange({ ...value, color: e.target.value })} style={{ width: '100%', height: '40px' }} />
              )}
              {value?.type === 'gradient' && (
                <input type="text" placeholder="e.g. linear-gradient(135deg, #e6f0fa 0%, #f9ebf8 100%)" value={value.gradient || ''} onChange={(e) => onChange({ ...value, gradient: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
              {value?.type === 'image' && (
                <input type="text" placeholder="URL hình ảnh" value={value.bg_image || ''} onChange={(e) => onChange({ ...value, bg_image: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
            </div>
          )
        },
        statsTitle: { type: 'text', label: 'Tiêu đề khối', contentEditable: true },
        statsTitleColor: { type: 'text', label: 'Màu Tiêu đề' },
        statsItems: {
          type: 'array', label: 'Danh sách Thống kê',
          getItemSummary: (item) => item.number || 'Chỉ số',
          defaultItemProps: {
            number: '100+',
            label: 'Mô tả chỉ số'
          },
          arrayFields: {
            number: { type: 'text', label: 'Con số (VD: 500+)', contentEditable: true },
            label: { type: 'textarea', label: 'Mô tả', contentEditable: true }
          }
        }
      },
      defaultProps: {
        variant: 'stats',
        padding_y: 20,
        padding_x: 5,
        background: { 
          type: 'gradient', 
          gradient: 'linear-gradient(180deg, #d4e0ff 0%, #e8d8ff 50%, #f5e0f8 100%)',
          bg_image: '/hoa.webp'
        },
        statsTitle: 'HÀNH TRÌNH KIẾN TẠO & GẮN KẾT GIÁ TRỊ',
        statsTitleColor: 'var(--color-primary)',
        statsItems: [
          { number: '500+', label: 'Hội viên là các doanh nghiệp và doanh nhân tiêu biểu tại TP.HCM' },
          { number: '20+', label: 'Năm hình thành và phát triển mạng lưới kết nối đồng hương' },
          { number: '1.000+', label: 'Cơ hội giao thương và kết nối đầu tư được khởi tạo mỗi năm' },
          { number: '100+', label: 'Chương trình thiện nguyện và hoạt động hướng về quê hương' }
        ]
      },
      render: (props) => <AdminSection {...props} />
    },

    Departments: {
      label: 'Danh sách các Ban',
      fields: {
        background: {
          type: 'custom', label: 'Nền section',
          render: ({ onChange, value }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <select 
                value={value?.type || 'color'} 
                onChange={(e) => onChange({ ...value, type: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="color">Màu đơn</option>
                <option value="gradient">Gradient</option>
                <option value="image">Hình ảnh / GIF</option>
              </select>
              {value?.type === 'color' && (
                <input type="color" value={value.color || '#f8fafc'} onChange={(e) => onChange({ ...value, color: e.target.value })} style={{ width: '100%', height: '40px' }} />
              )}
              {value?.type === 'gradient' && (
                <input type="text" placeholder="e.g. linear-gradient(180deg, #f0e0ff 0%, #e8f4ff 100%)" value={value.gradient || ''} onChange={(e) => onChange({ ...value, gradient: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
              {value?.type === 'image' && (
                <input type="text" placeholder="URL hình ảnh" value={value.bg_image || ''} onChange={(e) => onChange({ ...value, bg_image: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
            </div>
          )
        },
        deptTitle: { type: 'text', label: 'Tiêu đề Danh sách', contentEditable: true },
        deptTitleColor: { type: 'text', label: 'Màu Tiêu đề' },
        deptSubtitle: { type: 'text', label: 'Tiêu đề phụ', contentEditable: true },
        deptSubtitleColor: { type: 'text', label: 'Màu Tiêu đề phụ' },
        deptItems: {
          type: 'array', label: 'Danh sách các ban (Cục)',
          getItemSummary: (item) => item.title || 'Ban',
          defaultItemProps: {
            title: 'Tên ban mới',
            buttonText: 'Xem hoạt động →',
            buttonBorderRadius: '20px'
          },
          arrayFields: {
            iconUrl: {
              type: 'custom', label: 'Icon',
              render: ({ onChange, value }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input type="text" placeholder="Dán URL Icon" value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => onChange(e.target.result);
                      reader.readAsDataURL(file);
                    }
                  }} style={{ fontSize: '12px' }} />
                  {value && <img src={value} alt="preview" style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain', backgroundColor: '#e2e8f0', padding: '4px', borderRadius: '4px' }} />}
                </div>
              )
            },
            title: { type: 'text', label: 'Tên ban', contentEditable: true },
            buttonText: { type: 'text', label: 'Chữ trong nút', contentEditable: true },
            buttonBorderRadius: { type: 'text', label: 'Bo góc nút (vd: 20px)' },
            url: { type: 'text', label: 'URL liên kết' }
          }
        }
      },
      defaultProps: {
        variant: 'departments',
        background: { type: 'gradient', gradient: 'linear-gradient(180deg, #f0e0ff 0%, #e8f4ff 100%)' },
        deptTitle: 'CÁC BAN CHUYÊN MÔN',
        deptTitleColor: '#1e3a8a',
        deptSubtitle: 'CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
        deptSubtitleColor: '#1e3a8a',
        deptItems: [
          { iconUrl: '/economy 1-2.png', title: 'Ban Kinh tế - Đầu tư', buttonText: 'Xem hoạt động →', buttonBorderRadius: '20px', url: '#' },
          { iconUrl: '/economy 1.png', title: 'Ban Văn hóa - Thể thao', buttonText: 'Xem hoạt động →', buttonBorderRadius: '20px', url: '#' },
          { iconUrl: '/economy 1-1.png', title: 'Ban Xã hội - Cộng đồng', buttonText: 'Xem hoạt động →', buttonBorderRadius: '20px', url: '#' },
          { iconUrl: '/Rectangle 4007.png', title: 'Ban Khởi nghiệp', buttonText: 'Xem hoạt động →', buttonBorderRadius: '20px', url: '#' },
          { iconUrl: '/Rectangle 4008.png', title: 'Ban Giao thương quốc tế', buttonText: 'Xem hoạt động →', buttonBorderRadius: '20px', url: '#' }
        ]
      },
      render: (props) => <AdminSection {...props} />
    },

    IntroEntrepreneur: {
      label: 'Giới thiệu Doanh nhân',
      fields: {
        introTitle: { type: 'text', label: 'Tiêu đề chính', contentEditable: true },
        introTitleColor: { type: 'text', label: 'Màu tiêu đề' },
        introSubtitle: { type: 'text', label: 'Tiêu đề phụ', contentEditable: true },
        introImageUrl: {
          type: 'custom', label: 'Ảnh minh họa',
          render: ({ onChange, value }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="text" placeholder="/anhlamviec.jpg" value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
              <input type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => onChange(ev.target.result);
                  reader.readAsDataURL(file);
                }
              }} style={{ fontSize: '12px' }} />
              {value && <img src={value} alt="preview" style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '8px' }} />}
            </div>
          )
        },
        introParagraph1: { type: 'textarea', label: 'Đoạn văn 1', contentEditable: true },
        introParagraph2: { type: 'textarea', label: 'Đoạn văn 2', contentEditable: true },
        introVision: { type: 'textarea', label: 'Tầm nhìn', contentEditable: true },
        introMission: { type: 'textarea', label: 'Sứ mệnh', contentEditable: true },
        introStats: {
          type: 'array', label: 'Thống kê',
          getItemSummary: (item) => item.number || 'Thống kê',
          defaultItemProps: { number: '100+', label: 'Mô tả thống kê' },
          arrayFields: {
            number: { type: 'text', label: 'Con số', contentEditable: true },
            label: { type: 'text', label: 'Mô tả', contentEditable: true }
          }
        }
      },
      defaultProps: {
        variant: 'intro',
        introTitle: 'GIỚI THIỆU DOANH NHÂN ĐỒNG THÁP',
        introTitleColor: '#0b4c8c',
        introSubtitle: 'Kết nối – Đồng hành – Phát triển',
        introImageUrl: '/anhlamviec.jpg',
        introParagraph1: 'Cộng đồng doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ những tinh hoa kinh doanh, những người tiên phong trong sự nghiệp khởi nghiệp và phát triển bền vững. Chúng tôi cam kết xây dựng một môi trường hợp tác chuyên nghiệp, minh bạch và hiệu quả.',
        introParagraph2: 'Thông qua các hoạt động kết nối, chia sẻ kinh nghiệm và hỗ trợ lẫn nhau, cộng đồng hướng tới mục tiêu nâng cao năng lực cạnh tranh và góp phần phát triển kinh tế bền vững.',
        introVision: 'Xây dựng mạng lưới doanh nhân Đồng Tháp năng động, gắn kết và phát triển bền vững tại TP.HCM.',
        introMission: 'Kết nối doanh nghiệp, chia sẻ tri thức và đồng hành cùng sự phát triển của cộng đồng.',
        introStats: [
          { number: '500+', label: 'Doanh nghiệp tham gia' },
          { number: '50+', label: 'Sự kiện kết nối mỗi năm' },
          { number: '100%', label: 'Hướng đến phát triển bền vững' }
        ]
      },
      render: (props) => <AdminSection {...props} />
    },

    Hop: {
      label: 'HOP (Hội viên)',
      fields: {
        hopTitle: { type: 'text', label: 'Tiêu đề chính', contentEditable: true },
        hopTitleColor: { type: 'text', label: 'Màu tiêu đề' },
        hopSubtitle: { type: 'text', label: 'Tiêu đề phụ', contentEditable: true },
        hopImageUrl: {
          type: 'custom', label: 'Ảnh minh họa',
          render: ({ onChange, value }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="text" placeholder="/hop.jpg" value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
              <input type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => onChange(ev.target.result);
                  reader.readAsDataURL(file);
                }
              }} style={{ fontSize: '12px' }} />
              {value && <img src={value} alt="preview" style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '8px' }} />}
            </div>
          )
        },
        hopParagraph1: { type: 'textarea', label: 'Đoạn văn 1', contentEditable: true },
        hopParagraph2: { type: 'textarea', label: 'Đoạn văn 2', contentEditable: true },
        hopBenefitsTitle: { type: 'text', label: 'Tiêu đề quyền lợi', contentEditable: true },
        hopBenefits: {
          type: 'array', label: 'Quyền lợi hội viên',
          getItemSummary: (item) => item.text || 'Quyền lợi',
          defaultItemProps: { text: 'Quyền lợi mới' },
          arrayFields: {
            text: { type: 'text', label: 'Nội dung', contentEditable: true }
          }
        },
        hopStats: {
          type: 'array', label: 'Thống kê (4 ô)',
          getItemSummary: (item) => item.number || 'Thống kê',
          defaultItemProps: { number: '100+', label: 'Mô tả' },
          arrayFields: {
            number: { type: 'text', label: 'Con số', contentEditable: true },
            label: { type: 'text', label: 'Mô tả', contentEditable: true }
          }
        }
      },
      defaultProps: {
        variant: 'hop',
        hopTitle: 'HỘI VIÊN',
        hopTitleColor: '#0b4c8c',
        hopSubtitle: 'Cộng đồng doanh nhân cùng phát triển',
        hopImageUrl: '/hop.jpg',
        hopParagraph1: 'Hội viên CLB Doanh nhân Đồng Tháp tại TP.HCM là những doanh nghiệp, doanh nhân và cá nhân khởi nghiệp có tinh thần đồng hành, chia sẻ và phát triển bền vững.',
        hopParagraph2: 'Khi trở thành hội viên, bạn được tham gia mạng lưới kết nối rộng lớn, tiếp cận các cơ hội hợp tác và chương trình phát triển năng lực doanh nghiệp.',
        hopBenefitsTitle: 'Quyền lợi hội viên',
        hopBenefits: [
          { text: 'Tham gia các chương trình kết nối doanh nghiệp' },
          { text: 'Tiếp cận hoạt động đào tạo và hội thảo chuyên đề' },
          { text: 'Nhận thông tin thị trường và cơ hội hợp tác' },
          { text: 'Tham gia các hoạt động cộng đồng doanh nhân' },
          { text: 'Đồng hành cùng các chương trình phát triển địa phương' }
        ],
        hopStats: [
          { number: '800+', label: 'Hội viên' },
          { number: '120+', label: 'Đối tác' },
          { number: '40+', label: 'Sự kiện / năm' },
          { number: '12', label: 'Nhóm kết nối' }
        ]
      },
      render: (props) => <AdminSection {...props} />
    },

    InfoCards: {
      label: 'Khối Thông Tin',
      fields: {
        background: {
          type: 'custom',
          render: ({ name, onChange, value }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <select 
                value={value?.type || 'color'} 
                onChange={(e) => onChange({ ...value, type: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="color">Màu đơn</option>
                <option value="gradient">Gradient</option>
                <option value="image">Hình ảnh</option>
              </select>
              {value?.type === 'color' && (
                <input type="color" value={value.color || '#f8fafc'} onChange={(e) => onChange({ ...value, color: e.target.value })} style={{ width: '100%', height: '40px' }} />
              )}
              {value?.type === 'gradient' && (
                <input type="text" placeholder="e.g. linear-gradient(...)" value={value.gradient || ''} onChange={(e) => onChange({ ...value, gradient: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
              {value?.type === 'image' && (
                <input type="text" placeholder="URL hình ảnh" value={value.bg_image || ''} onChange={(e) => onChange({ ...value, bg_image: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
            </div>
          )
        },
        infoCards: {
          type: 'array', label: 'Danh sách Thẻ Thông tin',
          getItemSummary: (item) => item.title || 'Thẻ thông tin',
          defaultItemProps: {
            title: 'Tiêu đề mới',
            description: 'Nội dung mô tả...',
            members: []
          },
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề thẻ', contentEditable: true },
            description: { type: 'textarea', label: 'Nội dung Text', contentEditable: true },
            decorationImage: {
              type: 'custom', label: 'Ảnh góc trái dưới',
              render: ({ onChange, value }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input type="text" placeholder="Dán URL ảnh" value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => onChange(e.target.result);
                      reader.readAsDataURL(file);
                    }
                  }} style={{ fontSize: '12px' }} />
                  {value && <img src={value} alt="preview" style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }} />}
                </div>
              )
            },
            members: {
              type: 'array', label: 'Danh sách nhân sự (Nếu có)',
              getItemSummary: (m) => m.name || 'Thành viên',
              defaultItemProps: {
                name: 'Tên nhân sự',
                roleCLB: 'Chức vụ CLB',
                roleEnterprise: 'Chức vụ Doanh nghiệp',
                enterpriseName: 'Tên Doanh nghiệp'
              },
              arrayFields: {
                avatar: {
                  type: 'custom', label: 'Ảnh đại diện',
                  render: ({ onChange, value }) => (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input type="text" placeholder="Dán URL ảnh" value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                      <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => onChange(e.target.result);
                          reader.readAsDataURL(file);
                        }
                      }} style={{ fontSize: '12px' }} />
                      {value && <img src={value} alt="preview" style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain', borderRadius: '4px' }} />}
                    </div>
                  )
                },
                name: { type: 'text', label: 'Họ tên', contentEditable: true },
                roleCLB: { type: 'text', label: 'Chức vụ CLB', contentEditable: true },
                roleEnterprise: { type: 'text', label: 'Chức vụ Doanh nghiệp', contentEditable: true },
                enterpriseName: { type: 'text', label: 'Tên Doanh nghiệp', contentEditable: true }
              }
            }
          }
        }
      },
      defaultProps: {
        variant: 'info-cards',
        background: { type: 'image', bg_image: '/bg_infocards.png' },
        infoCards: [
          {
            title: 'VỀ CÂU LẠC BỘ',
            description: 'CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh. Với tinh thần kết nối - đồng hành - sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.',
            decorationImage: '/business-man-holding-smart-device-pointing-index-finger-screen-with-dot-connection-digital-illustration 1.png', members: []
          },
          {
            title: 'CƠ CẤU TỔ CHỨC',
            description: '', decorationImage: '',
            members: [
              { avatar: '/Ellipse 2.png', name: 'Phạm Văn Hùng', roleCLB: 'Phó Chủ tịch CLB', roleEnterprise: 'Chủ tịch HĐQT', enterpriseName: 'Công ty CP Đầu tư Sen Vàng' },
              { avatar: '/Ellipse 2-1.png', name: 'Nguyễn Thị Mai', roleCLB: 'Phó Trưởng ban Thường trực', roleEnterprise: 'Phó Tổng Giám đốc', enterpriseName: 'Công ty TNHH May mặc Đồng Tháp' },
              { avatar: '/Ellipse 2-2.png', name: 'Hoàng Minh Đức', roleCLB: 'Ủy viên Ban Chấp hành', roleEnterprise: 'Giám đốc Phát triển', enterpriseName: 'Tập đoàn Nông nghiệp Hitech' }
            ]
          }
        ]
      },
      render: (props) => <AdminSection {...props} />
    },
    Header: {
      label: 'Trang chủ (Header)',
      fields: {
        logoUrl: { type: 'text', label: 'URL Logo' },
        clubName: { type: 'text', label: 'Tên CLB' },
        subName: { type: 'text', label: 'Tên phụ' },
        headerStyle: {
          type: 'select',
          label: 'Kiểu hiển thị',
          options: [
            { label: 'Trong suốt (Đè lên Hero Banner)', value: 'transparent' },
            { label: 'Nền màu (Kế khối thường)', value: 'solid' }
          ]
        },
        scrolledBgColor: { type: 'text', label: 'Màu nền (khi cuộn hoặc kiểu nền màu)' },
        showLanguageToggle: { type: 'radio', label: 'Hiển thị ngôn ngữ', options: [{ label: 'Có', value: true }, { label: 'Không', value: false }] },
        links: {
          type: 'array', label: 'Menu Links',
          getItemSummary: (item) => item.label || 'Link',
          defaultItemProps: { label: 'Menu mới', url: '#', active: false },
          arrayFields: {
            label: { type: 'text', label: 'Tên menu' },
            url: { type: 'text', label: 'Đường dẫn (URL)' },
            active: { type: 'radio', label: 'Đang chọn (Active)', options: [{ label: 'Có', value: true }, { label: 'Không', value: false }] }
          }
        }
      },
      defaultProps: {
        logoUrl: '/logo 2.png',
        clubName: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
        subName: 'Tại TP.Hồ Chí Minh',
        headerStyle: 'transparent',
        scrolledBgColor: '#2b416e',
        showLanguageToggle: true,
        links: [
          { label: 'Trang chủ', url: '#', active: true },
          { label: 'Giới thiệu', url: '#', active: false },
          { label: 'Hội viên', url: '#', active: false },
          { label: 'Hoạt động ban', url: '#', active: false },
          { label: 'Tin tức & Sự kiện', url: '#', active: false },
          { label: 'Liên hệ', url: '#', active: false }
        ]
      },
      render: (props) => <AdminHeader {...props} />
    },
    Partners: {
      label: 'Hội viên CLB',
      fields: {
        background: {
          type: 'custom', label: 'Nền (Background)',
          render: ({ onChange, value }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <select 
                value={value?.type || 'color'} 
                onChange={(e) => onChange({ ...value, type: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="color">Màu đơn</option>
                <option value="gradient">Gradient</option>
                <option value="image">Hình ảnh / GIF</option>
              </select>
              {value?.type === 'color' && (
                <input type="color" value={value.color || '#f8fafc'} onChange={(e) => onChange({ ...value, color: e.target.value })} style={{ width: '100%', height: '40px' }} />
              )}
              {value?.type === 'gradient' && (
                <input type="text" placeholder="e.g. linear-gradient(to bottom, #dbeafe, #bfdbfe)" value={value.gradient || ''} onChange={(e) => onChange({ ...value, gradient: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
              {value?.type === 'image' && (
                <input type="text" placeholder="URL hình ảnh" value={value.imageUrl || ''} onChange={(e) => onChange({ ...value, imageUrl: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
            </div>
          )
        },
        title: { type: 'text', label: 'Tiêu đề khối', contentEditable: true },
        titleColor: { type: 'text', label: 'Màu Tiêu đề' },
        logos: {
          type: 'array', label: 'Danh sách Logo',
          getItemSummary: (item) => item.name || 'Logo',
          defaultItemProps: {
            name: 'Logo Hội viên',
          },
          arrayFields: {
            name: { type: 'text', label: 'Tên Logo', contentEditable: true },
            imageUrl: {
              type: 'custom', label: 'Hình ảnh Logo',
              render: ({ onChange, value }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input type="text" placeholder="Dán URL ảnh" value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => onChange(e.target.result);
                      reader.readAsDataURL(file);
                    }
                  }} style={{ fontSize: '12px' }} />
                  {value && <img src={value} alt="preview" style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain', backgroundColor: '#e2e8f0', padding: '4px', borderRadius: '4px' }} />}
                </div>
              )
            }
          }
        }
      },
      defaultProps: {
        background: { type: 'gradient', gradient: 'linear-gradient(180deg, #a8dfff 0%, #cdeeff 30%, #e6efff 100%)' },
        title: 'HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
        titleColor: 'var(--color-secondary)',
        logos: [
          { name: 'HappyFood', imageUrl: '/Happy Food.png' },
          { name: 'EcoBook', imageUrl: '/Logo Khoi E.png' },
          { name: 'COMOON', imageUrl: '/Logo Khoi F.png' },
          { name: 'Khối C', imageUrl: '/Logo Khoi C.png' },
          { name: 'Khối D', imageUrl: '/Logo Khoi D.png' }
        ]
      },
      render: (props) => <AdminPartners {...props} />
    },
    News: {
      label: 'Tin tức & Sự kiện',
      fields: {
        background: {
          type: 'custom', label: 'Nền section',
          render: ({ onChange, value }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <select 
                value={value?.type || 'color'} 
                onChange={(e) => onChange({ ...value, type: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="color">Màu đơn</option>
                <option value="gradient">Gradient</option>
                <option value="image">Hình ảnh / GIF</option>
              </select>
              {value?.type === 'color' && (
                <input type="color" value={value.color || '#f8fafc'} onChange={(e) => onChange({ ...value, color: e.target.value })} style={{ width: '100%', height: '40px' }} />
              )}
              {value?.type === 'gradient' && (
                <input type="text" placeholder="e.g. linear-gradient(...)" value={value.gradient || ''} onChange={(e) => onChange({ ...value, gradient: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
              {value?.type === 'image' && (
                <input type="text" placeholder="URL hình ảnh" value={value.bg_image || ''} onChange={(e) => onChange({ ...value, bg_image: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
            </div>
          )
        },
        newsTitle: { type: 'text', label: 'Tiêu đề khối', contentEditable: true },
        newsTitleColor: { type: 'text', label: 'Màu Tiêu đề' },
        newsViewMoreText: { type: 'text', label: 'Chữ Xem thêm', contentEditable: true },
        newsViewMoreUrl: { type: 'text', label: 'URL Xem thêm' },
        newsItems: {
          type: 'array', label: 'Danh sách Tin tức',
          getItemSummary: (item) => item.title || 'Tin tức',
          defaultItemProps: {
            title: 'Tiêu đề tin tức',
            date: '01/01/2026',
            description: 'Mô tả ngắn gọn về tin tức...',
            imageUrl: 'https://via.placeholder.com/600x400',
            tag: '',
            url: '#'
          },
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            date: { type: 'text', label: 'Ngày tháng', contentEditable: true },
            description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
            imageUrl: {
              type: 'custom', label: 'Hình ảnh',
              render: ({ onChange, value }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input type="text" placeholder="Dán URL ảnh" value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => onChange(e.target.result);
                      reader.readAsDataURL(file);
                    }
                  }} style={{ fontSize: '12px' }} />
                  {value && <img src={value} alt="preview" style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain', backgroundColor: '#e2e8f0', padding: '4px', borderRadius: '4px' }} />}
                </div>
              )
            },
            tag: { type: 'text', label: 'Tag (vd: Mới nhất)' },
            url: { type: 'text', label: 'Đường dẫn bài viết' }
          }
        }
      },
      defaultProps: {
        variant: 'news',
        padding_y: 20,
        padding_x: 5,
        background: { type: 'color', color: '#f5e0f8' },
        newsTitle: 'TIN TỨC & SỰ KIỆN',
        newsTitleColor: '#0b4c8c',
        newsViewMoreText: 'Xem thêm',
        newsViewMoreUrl: '#',
        newsItems: [
          { title: 'Hội thảo kết nối doanh nghiệp chia sẻ xu hướng phát triển', date: '20/03/2026', description: 'Sự kiện quy tụ nhiều chuyên gia và doanh nhân, cùng thảo luận về chiến lược phát triển, chuyển đổi số và cơ hội hợp tác trong thời đại mới.', imageUrl: '/Frame 1000002842.png', tag: 'Mới nhất', url: '#' },
          { title: 'Kết nối và chia sẻ niềm vui là cách phát triển sự hiệu quả...', date: '20/03/2026', description: 'Khi chúng ta làm việc với một trái tim mở lòng và tinh thần sẻ chia, áp lực sẽ biến thành động lực, và khó khăn sẽ trở thành trải nghiệm.', imageUrl: '/Frame 1000002842-1.png', tag: 'Mới nhất', url: '#' },
          { title: 'Lan tỏa yêu thương thiện nguyện', date: '10/03/2026', description: 'Các thành viên đã cùng chung tay tổ chức hoạt động trao tặng...', imageUrl: '/Frame 1000002842-2.png', tag: '', url: '#' },
          { title: 'Hợp tác giữa các doanh nghiệp', date: '23/02/2026', description: 'Định hướng phát triển tương lai là mở rộng quan hệ hợp tác giữa các ...', imageUrl: '/Frame 1000002842-3.png', tag: '', url: '#' },
          { title: 'Đẩy mạnh chuyển đổi số ...', date: '23/02/2026', description: 'Sự phát triển hệ thống chuyển đổi đồng bộ nhằm tối ưu hóa...', imageUrl: '/Frame 1000002842-4.png', tag: '', url: '#' }
        ]
      },
      render: (props) => <AdminSection {...props} />
    },
    Values: {
      label: 'Giá trị khi tham gia',
      fields: {
        background: {
          type: 'custom', label: 'Nền section',
          render: ({ onChange, value }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <select 
                value={value?.type || 'color'} 
                onChange={(e) => onChange({ ...value, type: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="color">Màu đơn</option>
                <option value="gradient">Gradient</option>
                <option value="image">Hình ảnh / GIF</option>
              </select>
              {value?.type === 'color' && (
                <input type="color" value={value.color || '#f8fafc'} onChange={(e) => onChange({ ...value, color: e.target.value })} style={{ width: '100%', height: '40px' }} />
              )}
              {value?.type === 'gradient' && (
                <input type="text" placeholder="e.g. linear-gradient(...)" value={value.gradient || ''} onChange={(e) => onChange({ ...value, gradient: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
              {value?.type === 'image' && (
                <input type="text" placeholder="URL hình ảnh" value={value.bg_image || ''} onChange={(e) => onChange({ ...value, bg_image: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
            </div>
          )
        },
        valuesTitle: { type: 'text', label: 'Tiêu đề khối', contentEditable: true },
        valuesTitleColor: { type: 'text', label: 'Màu Tiêu đề' },
        valuesViewMoreText: { type: 'text', label: 'Chữ Xem thêm', contentEditable: true },
        valuesViewMoreUrl: { type: 'text', label: 'URL Xem thêm' },
        valuesCards: {
          type: 'array', label: 'Danh sách Giá trị',
          getItemSummary: (item) => item.title || 'Giá trị',
          defaultItemProps: {
            title: 'Tiêu đề',
            description: 'Mô tả ngắn gọn...',
            iconUrl: '/icon_1 1-1.png'
          },
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
            iconUrl: {
              type: 'custom', label: 'Icon',
              render: ({ onChange, value }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input type="text" placeholder="Dán URL icon" value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => onChange(e.target.result);
                      reader.readAsDataURL(file);
                    }
                  }} style={{ fontSize: '12px' }} />
                  {value && <img src={value} alt="preview" style={{ maxWidth: '100%', maxHeight: '50px', objectFit: 'contain', backgroundColor: '#e2e8f0', padding: '4px', borderRadius: '4px' }} />}
                </div>
              )
            }
          }
        }
      },
      defaultProps: {
        variant: 'values',
        padding_y: 20,
        padding_x: 5,
        background: { type: 'color', color: '#f5e0f8', bg_image: '/bg-giatri.png' },
        valuesTitle: 'GIÁ TRỊ KHI THAM GIA CỘNG ĐỒNG',
        valuesTitleColor: '#0b4c8c',
        valuesViewMoreText: 'Xem thêm',
        valuesViewMoreUrl: '#',
        valuesCards: [
          { title: 'Kết nối chất lượng', description: 'Tiếp cận mạng lưới doanh nhân uy tín, mở rộng cơ hội hợp tác thực tế.', iconUrl: '/icon_1 1-2.png' },
          { title: 'Phát triển kiến thức', description: 'Cập nhật xu hướng, nâng cao tư duy quản trị và kỹ năng kinh doanh.', iconUrl: '/icon_1 1-1.png' },
          { title: 'Cơ hội hợp tác', description: 'Tham gia các dự án, hoạt động kết nối và xúc tiến thương mại.', iconUrl: '/icon_1 1.png' }
        ]
      },
      render: (props) => <AdminSection {...props} />
    },
    ContactCTA: {
      label: 'Liên hệ',
      fields: {
        background: {
          type: 'custom', label: 'Nền section',
          render: ({ onChange, value }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <select 
                value={value?.type || 'image'} 
                onChange={(e) => onChange({ ...value, type: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="color">Màu đơn</option>
                <option value="gradient">Gradient</option>
                <option value="image">Hình ảnh / GIF</option>
              </select>
              {value?.type === 'color' && (
                <input type="color" value={value.color || '#f8fafc'} onChange={(e) => onChange({ ...value, color: e.target.value })} style={{ width: '100%', height: '40px' }} />
              )}
              {value?.type === 'gradient' && (
                <input type="text" placeholder="e.g. linear-gradient(...)" value={value.gradient || ''} onChange={(e) => onChange({ ...value, gradient: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
              {value?.type === 'image' && (
                <input type="text" placeholder="URL hình ảnh" value={value.bg_image || ''} onChange={(e) => onChange({ ...value, bg_image: e.target.value })} style={{ padding: '8px', width: '100%' }} />
              )}
            </div>
          )
        },
        contactTitle: { type: 'textarea', label: 'Tiêu đề', contentEditable: true },
        contactEmailIcon: { type: 'text', label: 'URL Icon Email' },
        contactEmailText: { type: 'text', label: 'Email', contentEditable: true },
        contactPhoneIcon: { type: 'text', label: 'URL Icon Điện thoại' },
        contactPhoneText: { type: 'text', label: 'Điện thoại', contentEditable: true },
        contactButtonText: { type: 'text', label: 'Chữ Nút Đăng ký', contentEditable: true },
        contactButtonUrl: { type: 'text', label: 'URL Nút Đăng ký' }
      },
      defaultProps: {
        variant: 'contact-cta',
        background: { type: 'color', color: '#f5e0f8', bg_image: '/bg-lienhe.png' },
        contactTitle: 'QUAN TÂM VÀ HỢP TÁC\nVỚI CÁC CHƯƠNG TRÌNH HOẠT ĐỘNG\nCỦA CLB DOANH NHÂN ĐỒNG THÁP TẠI TP.HCM',
        contactEmailIcon: '/mail.svg',
        contactEmailText: 'info@dte.hunghau.vn',
        contactPhoneIcon: '/phone.svg',
        contactPhoneText: '1800 1568',
        contactButtonText: 'Đăng ký hội viên',
        contactButtonUrl: '#'
      },
      render: (props) => <AdminSection {...props} />
    },
    Footer: {
      label: 'Footer',
      fields: {
        footerVectorImage: { type: 'text', label: 'URL Ảnh Vector Trái' },
        footerVectorRightImage: { type: 'text', label: 'URL Ảnh Vector Phải (Ngọn núi)' },
        footerEffectRightImage: { type: 'text', label: 'URL Ảnh Hiệu ứng Phải' },
        footerLogoUrl: { type: 'text', label: 'URL Logo' },
        footerClubName: { type: 'textarea', label: 'Tên Câu Lạc Bộ', contentEditable: true },
        footerAddress: { type: 'textarea', label: 'Địa chỉ', contentEditable: true },
        footerEmail: { type: 'text', label: 'Email', contentEditable: true },
        footerPhone: { type: 'text', label: 'Hotline', contentEditable: true },
        footerMainLinks: { 
          type: 'array', label: 'Liên kết trang', 
          arrayFields: { label: { type: 'text', label: 'Tên link', contentEditable: true }, url: { type: 'text', label: 'URL' } } 
        },
        footerOtherLinks: { 
          type: 'array', label: 'Khác (Links)', 
          arrayFields: { label: { type: 'text', label: 'Tên link', contentEditable: true }, url: { type: 'text', label: 'URL' } } 
        },
        footerSocialLinks: {
          type: 'array', label: 'Mạng xã hội',
          arrayFields: { icon: { type: 'text', label: 'URL Icon' }, url: { type: 'text', label: 'URL' } }
        },
        footerCopyright: { type: 'text', label: 'Bản quyền', contentEditable: true }
      },
      defaultProps: {
        variant: 'footer',
        footerVectorImage: '/vector-footer-1.png',
        footerVectorRightImage: '/vector-footer-2.png',
        footerEffectRightImage: '/hieuungfooter.webp',
        footerLogoUrl: '/logo 2.png',
        footerClubName: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP\nTẠI TP. HỒ CHÍ MINH',
        footerAddress: 'Phòng Đồng Tháp, HungHau Campus, Trường Đại học Văn Hiến, Đại lộ Nguyễn Văn Linh, Khu đô thị Nam Thành Phố, Thành phố Hồ Chí Minh',
        footerEmail: 'info@dte.hunghau.vn',
        footerPhone: '1800 1568',
        footerMainLinks: [
          { label: 'Trang chủ', url: '#' },
          { label: 'Tin tức và sự kiện', url: '#' },
          { label: 'Về chúng tôi', url: '#' },
          { label: 'Các lĩnh vực hoạt động', url: '#' },
          { label: 'Doanh nghiệp hội viên', url: '#' },
          { label: 'Đăng kí', url: '#' },
          { label: 'Hoạt động Ban', url: '#' }
        ],
        footerOtherLinks: [
          { label: 'MYH', url: '#' },
          { label: 'MYC', url: '#' },
          { label: 'HHF', url: '#' },
          { label: 'HHE', url: '#' },
          { label: 'HHA', url: '#' },
          { label: 'COWE', url: '#' },
          { label: 'HHN', url: '#' },
          { label: 'HYV', url: '#' }
        ],
        footerSocialLinks: [
          { icon: '/facebook.svg', url: '#' },
          { icon: '/tiktok.png', url: '#' },
          { icon: '/youtube.png', url: '#' },
          { icon: '/linkedin.svg', url: '#' }
        ],
        footerCopyright: 'Copyright © CLB Doanh nhan Dong Thap. All rights reserved'
      },
      render: (props) => <AdminSection {...props} />
    }
  },

  categoryGroups: [
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout', components: ['Section'] },
    { title: 'Nâng cao', components: ['Header', 'Hero', 'Departments', 'IntroEntrepreneur', 'Hop', 'InfoCards', 'Partners', 'Stats', 'News', 'Values', 'ContactCTA', 'Footer'] }
  ],

  root: {
    render: ({ children }) => (
      <div className="min-h-screen">
        <style>
          {`
            :host, body {
              font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
              background-color: #f0f6fa !important;
              color: #1e293b !important;
              line-height: 1.6 !important;
              height: auto !important;
              overflow-y: visible !important;
              overflow-x: hidden !important;
              scroll-snap-type: none !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            * {
              box-sizing: border-box;
            }
          `}
        </style>
        {children}
      </div>
    )
  }
};

export default puckConfig;
