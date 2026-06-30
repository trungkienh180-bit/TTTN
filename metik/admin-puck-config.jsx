import React from 'react';
import AdminHeading from './metik/admin-heading';
import AdminText from './metik/admin-text';
import AdminImage from './metik/admin-image';
import AdminSection, { AdminProducts, AdminAbout, AdminAboutUs, AdminTestimonials, AdminFooter, AdminHeader, AdminCompanyIntro, AdminContact } from './metik/admin-section';
import AdminHero from './metik/admin-hero';
import snackPelletsImg from './src/snack pellets.jpg';
import chamMeTitImg from './src/metik chammetit.jpg';
import nhaMayOchaoImg from './src/nhamayochao.jpg';
import mauBanhImg from './src/mâunbanh.jpg';
import khoaiTayChienImg from './src/khoaitaychien.jpg';

//Config — đăng ký 5 components với fields + defaultProps + render.

export const puckConfig = {
  components: {
    Header: {
      label: 'Header',
      fields: {
        logoUrl: { type: 'text', label: 'URL Logo' },
        navItems: {
          type: 'array',
          label: 'Menu Điều Hướng',
          arrayFields: {
            label: { type: 'text', label: 'Tên Menu' },
            url: { type: 'text', label: 'URL' },
            isActive: { type: 'select', label: 'Đang chọn?', options: [{ label: 'Có', value: 'true' }, { label: 'Không', value: 'false' }] }
          },
          getItemSummary: (item) => item.label || 'Menu'
        },
        facebookUrl: { type: 'text', label: 'Facebook URL' },
        tiktokUrl: { type: 'text', label: 'TikTok URL' },
        linkedinUrl: { type: 'text', label: 'LinkedIn URL' }
      },
      defaultProps: {
        logoUrl: 'https://metik.vn/wp-content/uploads/2026/06/logometik.png.webp',
        navItems: [
          { label: 'TRANG CHỦ', url: '#', isActive: 'true' },
          { label: 'GIỚI THIỆU', url: '#', isActive: 'false' },
          { label: 'SẢN PHẨM', url: '#', isActive: 'false' },
          { label: 'TIN TỨC', url: '#', isActive: 'false' },
          { label: 'LIÊN HỆ', url: '#', isActive: 'false' }
        ],
        facebookUrl: '#',
        tiktokUrl: '#',
        linkedinUrl: '#'
      },
      render: (props) => <AdminHeader {...props} />
    },

    CompanyIntro: {
      label: 'Giới thiệu Công ty (Video)',
      fields: {
        videoUrl: { type: 'text', label: 'URL Video (YouTube Embed)' },
        content: { type: 'textarea', label: 'Nội dung đoạn văn' }
      },
      defaultProps: {
        videoUrl: '',
        content: 'Với tinh thần "Chạm mê tít – Snap into Joy", metik mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày. Từ những buổi gặp gỡ bạn bè, giờ giải lao, chuyến đi chơi đến những phút thư giãn tại nhà, metik mang đến trải nghiệm ăn vặt giòn ngon, trẻ trung và đầy cảm hứng.\n\nmetik không chỉ là một sản phẩm snack. metik là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh và là nguồn năng lượng tích cực cho những khoảnh khắc thường ngày.'
      },
      render: (props) => <AdminCompanyIntro {...props} />
    },

    Contact: {
      label: 'Bản đồ',
      fields: {
        mapUrl: { type: 'text', label: 'URL Google Maps (Iframe Src)' }
      },
      defaultProps: {
        mapUrl: 'https://maps.google.com/maps?q=Công%20ty%20Cổ%20Phần%20OCHAO,%20Tân%20Phú%20Trung,%20Củ%20Chi&t=&z=16&ie=UTF8&iwloc=&output=embed'
      },
      render: (props) => <AdminContact {...props} />
    },

    About: {
      label: 'Giới thiệu',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        introText: { type: 'textarea', label: 'Đoạn giới thiệu chung' },
        sections: {
          type: 'array',
          label: 'Các đoạn nội dung',
          arrayFields: {
            imagePosition: {
              type: 'select',
              label: 'Vị trí ảnh',
              options: [
                { label: 'Bên trái', value: 'left' },
                { label: 'Bên phải', value: 'right' }
              ]
            },
            imageUrl: { type: 'text', label: 'URL Ảnh minh họa' },
            heading: { type: 'text', label: 'Tiêu đề phụ (Không bắt buộc)' },
            content: { type: 'textarea', label: 'Nội dung chi tiết' }
          },
          getItemSummary: (item) => item.heading || (item.content ? item.content.substring(0, 30) + '...' : 'Đoạn nội dung')
        }
      },
      defaultProps: {
        title: 'GIỚI THIỆU VỀ METIK',
        introText: 'metik là thương hiệu snack thuộc OCHAO, được phát triển trong hệ sinh thái HUNGHAU Holdings với định hướng mang đến những sản phẩm ăn vặt thơm ngon, vui tươi và phù hợp với nhịp sống hiện đại.',
        sections: [
          {
            imagePosition: 'left',
            imageUrl: khoaiTayChienImg,
            heading: '',
            content: 'Ra đời từ nền tảng sản xuất bánh kẹo của OCHAO, METIK kế thừa hệ thống nhà máy hiện đại, quy trình sản xuất khép kín và tiêu chuẩn kiểm soát chất lượng nghiêm ngặt. METIK tập trung phát triển các dòng snack giòn, nhẹ, dễ ăn và phù hợp với nhiều nhóm khách hàng. Sản phẩm được nghiên cứu với nhiều hương vị hấp dẫn như rong biển, bắp, phô mai, BBQ và các hương vị đặc trưng khác.'
          },
          {
            imagePosition: 'right',
            imageUrl: nhaMayOchaoImg,
            heading: '',
            content: '- Sử dụng nguyên liệu có nguồn gốc rõ ràng, phù hợp với tiêu chuẩn sản xuất thực phẩm.\n- Quy trình sản xuất hiện đại, khép kín và đảm bảo vệ sinh an toàn thực phẩm.\n- Kiểm soát chất lượng chặt chẽ trong từng công đoạn, từ nguyên liệu đầu vào đến thành phẩm.'
          },
          {
            imagePosition: 'left',
            imageUrl: mauBanhImg,
            heading: '',
            content: 'Với hương vị hấp dẫn, phong cách trẻ trung và tinh thần vui nhộn, METIK hướng đến hình ảnh một thương hiệu snack năng động, gần gũi và dễ tạo thiện cảm với người tiêu dùng Việt Nam.'
          }
        ]
      },
      render: (props) => <AdminAbout {...props} />
    },

    AboutUs: {
      label: 'Về chúng tôi',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        introText: { type: 'textarea', label: 'Đoạn văn giới thiệu' },
        videoUrl: { type: 'text', label: 'URL Video (YouTube Embed)' }
      },
      defaultProps: {
        title: 'VỀ CHÚNG TÔI',
        introText: 'Với tinh thần "Chạm mê tít – Snap into Joy", metik mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày. Từ những buổi gặp gỡ bạn bè, giờ giải lao, chuyến đi chơi đến những phút thư giãn tại nhà, metik mang đến trải nghiệm ăn vặt giòn ngon, trẻ trung và đầy cảm hứng.\n\nmetik không chỉ là một sản phẩm snack. metik là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh và là nguồn năng lượng tích cực cho những khoảnh khắc thường ngày.',
        videoUrl: ''
      },
      render: (props) => <AdminAboutUs {...props} />
    },

    Testimonials: {
      label: 'Khách hàng đánh giá',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        testimonials: {
          type: 'array',
          label: 'Đánh giá',
          arrayFields: {
            avatarUrl: { type: 'text', label: 'URL Ảnh Đại Diện' },
            content: { type: 'textarea', label: 'Nội dung đánh giá' },
            author: { type: 'text', label: 'Tên & Vị trí' }
          },
          getItemSummary: (item) => item.author || 'Đánh giá'
        }
      },
      defaultProps: {
        title: 'KHÁCH HÀNG NÓI GÌ?',
        testimonials: [
          {
            avatarUrl: 'https://metik.vn/wp-content/uploads/2021/05/huynhvinh.webp',
            content: 'Snack metik ăn vừa giòn, vừa ngon vừa cuốn miệng. Em thường lựa chọn để mang theo tới trường',
            author: 'Sinh viên Huỳnh Vĩnh, TP.HCM'
          },
          {
            avatarUrl: 'https://metik.vn/wp-content/uploads/2021/05/myduyen.webp',
            content: 'metik gợi nhớ cho em rất nhiều kỉ niệm thời thơ ấu. Hy vọng nhãn hàng trong tương lai sẽ ra nhiều sản phẩm độc đáo hơn nữa.',
            author: 'Bạn Mỹ Duyên, Đồng Tháp'
          }
        ]
      },
      render: (props) => <AdminTestimonials {...props} />
    },

    Footer: {
      label: 'Footer',
      fields: {
        logoUrl: { type: 'text', label: 'URL Logo' },
        introText: { type: 'textarea', label: 'Đoạn giới thiệu ngắn' },
        phone: { type: 'text', label: 'Số điện thoại' },
        email: { type: 'text', label: 'Email' },
        address: { type: 'textarea', label: 'Địa chỉ' },
        copyrightText: { type: 'text', label: 'Dòng bản quyền' }
      },
      defaultProps: {
        logoUrl: 'https://metik.vn/wp-content/uploads/2026/06/logometik.png.webp',
        introText: 'METIK - một thế giới snack dành cho những ai yêu sự giòn giòn ngất ngây, hương vị trẻ trung, đầy cảm hứng để mỗi ngày đều căng tràn sức sống.',
        phone: '(+84) 79 721 3333',
        email: 'sale@ochao.vn',
        address: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM..',
        copyrightText: 'Copyright 2026 © METIK. All rights reserved'
      },
      render: (props) => <AdminFooter {...props} />
    },

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
    Products: {
      label: 'Sản Phẩm',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        products: {
          type: 'array',
          label: 'Danh sách sản phẩm',
          arrayFields: {
            imageUrl: { type: 'text', label: 'URL Ảnh' },
            name: { type: 'text', label: 'Tên sản phẩm' }
          },
          getItemSummary: (item) => item.name || 'Sản phẩm'
        }
      },
      defaultProps: {
        title: 'SẢN PHẨM MỚI',
        products: [
          { imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-tao-bien.jpg.webp', name: 'Snack vị Tảo biển' },
          { imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bbq.jpg.webp', name: 'Snack vị BBQ' },
          { imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bap.jpg.webp', name: 'Snack vị Bắp' },
          { imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-pho-mai.webp', name: 'Snack vị Phô mai' }
        ]
      },
      render: (props) => <AdminProducts {...props} />
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
      defaultProps: { content: 'Nhập văn bản ở đây...', align: 'left' },
      render: (props) => <AdminText {...props} />
    },

    Image: {
      label: 'Ảnh',
      fields: {
        src: { type: 'text', label: 'URL ảnh' },
        alt: { type: 'text', label: 'Alt text' },
        width: { type: 'text', label: 'Chiều rộng', default: '100%' },
        height: { type: 'text', label: 'Chiều cao', default: 'auto' },
        borderRadius: { type: 'text', label: 'Bo góc', default: '0' },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: {
        src: 'https://via.placeholder.com/800x400',
        alt: 'Ảnh minh họa',
        width: '100%', height: 'auto', borderRadius: '0', align: 'center'
      },
      render: (props) => <AdminImage {...props} />
    },

    Section: {
      label: 'Khoảng (Section)',
      fields: {
        container: {
          type: 'select', label: 'Chiều rộng',
          options: [
            { label: 'Small (640px)', value: 'sm' },
            { label: 'Medium (768px)', value: 'md' },
            { label: 'Large (1024px)', value: 'lg' },
            { label: 'XL (1280px)', value: 'xl' }
          ]
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại',
              options: [
                { label: 'Màu', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            fromColor: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            toColor: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            direction: { type: 'text', label: 'Hướng gradient', default: 'to right' },
            bg_image: { type: 'text', label: 'URL ảnh nền' },
            opacity: { type: 'number', label: 'Độ mờ', min: 0, max: 1, step: 0.1, default: 1 }
          }
        },
        padding_x: { type: 'number', label: 'Padding ngang', min: 0, max: 16, default: 4 },
        padding_y: { type: 'number', label: 'Padding dọc', min: 0, max: 16, default: 4 },
        content: { type: 'slot' } // Cho phép nested components
      },
      defaultProps: {
        container: 'lg',
        background: { type: 'color', color: '#ffffff' },
        padding_x: 4, padding_y: 4,
        content: []
      },
      render: (props) => <AdminSection {...props} />
    },

    Hero: {
      label: 'Hero Banner',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        subtitle: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        buttons: {
          type: 'array', label: 'Danh sách nút',
          arrayFields: {
            text: { type: 'text', label: 'Text nút', contentEditable: true },
            url: { type: 'text', label: 'URL' },
            style: {
              type: 'select', label: 'Style',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Outline', value: 'outline' }
              ]
            }
          },
          getItemSummary: (item) => item.text
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại',
              options: [
                { label: 'Màu', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
            images: {
              type: 'array',
              label: 'Danh sách ảnh Slider',
              arrayFields: {
                imageUrl: {
                  type: 'select',
                  label: 'Ảnh',
                  options: [
                    { label: 'Snack Pellets', value: snackPelletsImg },
                    { label: 'Chạm Mê Tít', value: chamMeTitImg }
                  ]
                }
              },
              getItemSummary: (item) => 'Slide'
            }
          }
        },
        layout: {
          type: 'object', label: 'Bố cục',
          objectFields: {
            align: {
              type: 'select', label: 'Căn lề',
              options: [
                { label: 'Trái', value: 'left' },
                { label: 'Giữa', value: 'center' },
                { label: 'Phải', value: 'right' }
              ]
            }
          }
        }
      },
      defaultProps: {
        title: '',
        subtitle: '',
        buttons: [],
        background: {
          type: 'image',
          images: [
            { imageUrl: snackPelletsImg },
            { imageUrl: chamMeTitImg }
          ]
        },
        layout: { align: 'center' }
      },
      render: (props) => <AdminHero {...props} />
    }
  },

  // Sidebar categories
  categoryGroups: [
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout', components: ['Section'] },
    { title: 'Nâng cao', components: ['Header', 'Hero', 'CompanyIntro', 'Products', 'About', 'AboutUs', 'Testimonials', 'Contact', 'Footer'] }
  ],

  // Root config
  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;
