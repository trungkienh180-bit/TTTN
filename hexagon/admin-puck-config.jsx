import React from 'react';
import { LanguageFilter } from './src/contexts/LanguageContext';
import AdminHeading from './components/admin-heading';
import AdminText from './components/admin-text';
import AdminImage from './components/admin-image';
import AdminSection, { AdminHeader, AdminAbout, AdminServices, AdminNews, AdminPartners, AdminContact, AdminFooter, ServiceHero, Solutions, Process, CTA, NewsArticleLayout } from './components/admin-section';
import AdminHero from './components/admin-hero';

//Config — đăng ký các components với fields + defaultProps + render.

export const puckConfig = {
  components: {
    Heading: {
      label: 'Tiêu đề',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
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
      defaultProps: {
        lang: 'all', content: 'Tiêu đề', level: 2, align: 'left' },
      render: (props) => <LanguageFilter lang={props.lang}><AdminHeading {...props} /></LanguageFilter>
    },

    Text: {
      label: 'Văn bản',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
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
      defaultProps: {
        lang: 'all', content: 'Nhập văn bản ở đây...', align: 'left' },
      render: (props) => <LanguageFilter lang={props.lang}><AdminText {...props} /></LanguageFilter>
    },

    Image: {
      label: 'Ảnh',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
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
        lang: 'all',
        src: 'https://via.placeholder.com/800x400',
        alt: 'Ảnh minh họa',
        width: '100%', height: 'auto', borderRadius: '0', align: 'center'
      },
      render: (props) => <LanguageFilter lang={props.lang}><AdminImage {...props} /></LanguageFilter>
    },

    Section: {
      label: 'Khoảng (Section)',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
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
        lang: 'all',
        container: 'lg',
        background: { type: 'color', color: '#ffffff' },
        padding_x: 4, padding_y: 4,
        content: []
      },
      render: (props) => <LanguageFilter lang={props.lang}><AdminSection {...props} /></LanguageFilter>
    },

    Hero: {
      label: 'Hero Banner',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        backgroundColor: { type: 'text', label: 'Màu nền' },
        badge: { type: 'text', label: 'Nhãn (Badge)' },
        titlePart1: { type: 'textarea', label: 'Tiêu đề dòng 1 (Các câu chạy tự động, mỗi câu 1 dòng)' },
        titlePart2: { type: 'text', label: 'Tiêu đề dòng 2 (màu trắng)' },
        titleHighlight: { type: 'text', label: 'Tiêu đề dòng 2 (màu vàng)' },
        subtitle: { type: 'textarea', label: 'Mô tả phụ' },
        rightImage: { type: 'text', label: 'URL Ảnh bên phải (quả địa cầu)' },
        buttons: {
          type: 'array',
          label: 'Nút bấm',
          getItemSummary: (item) => item.text || 'Nút',
          arrayFields: {
            text: { type: 'text', label: 'Chữ trên nút' },
            url: { type: 'text', label: 'Đường dẫn (URL)' },
            style: { 
              type: 'radio', 
              label: 'Kiểu nút',
              options: [
                { label: 'Chính (Vàng)', value: 'primary' },
                { label: 'Viền trắng', value: 'outline' }
              ]
            }
          }
        }
      },
      defaultProps: {
        lang: 'all',
        backgroundColor: '#1A6B49',
        badge: 'CÔNG NGHỆ TƯƠNG LAI',
        titlePart1: 'Giải pháp công nghệ\nCung cấp thiết bị CNTT\nThi công & lắp đặt\nDịch vụ CNTT',
        titlePart2: 'HEXAGON',
        titleHighlight: 'Solutions',
        subtitle: 'HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp internet, thiết bị công nghệ thông tin, giúp doanh nghiệp bứt phá trong kỷ nguyên số.',
        rightImage: 'https://metik.vn/wp-content/uploads/2026/06/globalmyc.webp',
        buttons: [
          { text: 'Khám phá Dịch vụ', url: '#', style: 'primary' },
          { text: 'Liên hệ Tư vấn', url: '#', style: 'outline' }
        ]
      },
      render: (props) => <LanguageFilter lang={props.lang}><AdminHero {...props} /></LanguageFilter>
    },

    Header: {
      label: 'Header',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        logoText: { type: 'text', label: 'Tên Logo' },
        logoSrc: { type: 'text', label: 'URL Logo' },
        backgroundColor: { type: 'text', label: 'Màu nền', default: '#1A6B49' },
        menuItems: {
          type: 'array', label: 'Menu Items',
          arrayFields: {
            text: { type: 'text', label: 'Tên menu' },
            url: { type: 'text', label: 'Đường dẫn' }
          },
          getItemSummary: (item) => item.text
        }
      },
      defaultProps: {
        lang: 'all',
        logoText: 'HEXAGON',
        logoSrc: '/favicon.svg',
        backgroundColor: '#1A6B49',
        menuItems: [
          { text: 'Trang chủ', url: '#' },
          { text: 'Giới thiệu', url: '#' },
          { text: 'Dịch vụ', url: '#' },
          { text: 'Hỗ trợ', url: '#' },
          { text: 'Liên hệ', url: '#' }
        ]
      },
      render: (props) => <LanguageFilter lang={props.lang}><AdminHeader {...props} /></LanguageFilter>
    },

    About: {
      label: 'Về Hexagon',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        title: { type: 'text', label: 'Tiêu đề' },
        description: { type: 'textarea', label: 'Mô tả' },
        imageSrc: { type: 'text', label: 'URL Ảnh' },
        quoteText: { type: 'text', label: 'Câu nói (Quote)' },
        quoteAuthor: { type: 'text', label: 'Tác giả quote' },
        cards: {
          type: 'array',
          label: 'Các thẻ giá trị (Grid)',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề thẻ' },
            content: { type: 'textarea', label: 'Nội dung thẻ' }
          },
          getItemSummary: (item) => item.title
        }
      },
      defaultProps: {
        lang: 'all',
        title: 'Về Hexagon',
        description: 'Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Với tầm nhìn đa chiều và khát vọng vươn tầm, Hexagon tự hào là đối tác tin cậy, đồng hành cùng bạn trên hành trình chinh phục những đỉnh cao công nghệ.',
        imageSrc: '/src/VPX16.jpg',
        quoteText: 'Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^',
        quoteAuthor: 'HEXAGON CULTURE',
        cards: [
          { title: 'Sứ mệnh', content: 'Kiến tạo tương lai số bằng các giải pháp tiên tiến.' },
          { title: 'Tầm nhìn', content: 'Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới.' },
          { title: 'Giá trị cốt lõi', content: 'Đổi mới - Đồng hành - Tiên phong - Minh bạch.' },
          { title: 'Nền tảng', content: 'Hệ sinh thái đa ngành, vững chắc và linh hoạt.' }
        ]
      },
      render: (props) => <LanguageFilter lang={props.lang}><AdminAbout {...props} /></LanguageFilter>
    },

    Services: {
      label: 'Lĩnh vực hoạt động',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        title: { type: 'text', label: 'Tiêu đề chính' },
        subtitle: { type: 'text', label: 'Mô tả phụ' },
        cards: {
          type: 'array',
          label: 'Các thẻ dịch vụ (Grid)',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề thẻ' },
            description: { type: 'textarea', label: 'Nội dung (tuỳ chọn)' },
            image: { type: 'text', label: 'URL Ảnh nền' },
            linkText: { type: 'text', label: 'Chữ cho Link (tuỳ chọn)' },
            linkUrl: { type: 'text', label: 'URL Link (tuỳ chọn)' }
          },
          getItemSummary: (item) => item.title
        }
      },
      defaultProps: {
        lang: 'all',
        title: 'Lĩnh vực hoạt động',
        subtitle: 'Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:',
        cards: [
          {
            title: 'Giải pháp công nghệ',
            description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt mọi nhu cầu đặc thù.',
            image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
            linkText: 'Xem chi tiết',
            linkUrl: '#'
          },
          {
            title: 'Giải pháp thi công & lắp đặt',
            description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững.',
            image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            linkText: 'Xem chi tiết',
            linkUrl: '#'
          },
          {
            title: 'Cung cấp thiết bị CNTT',
            description: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khám phá tiềm năng.',
            image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
            linkText: 'Xem chi tiết',
            linkUrl: '#'
          },
          {
            title: 'Dịch vụ Công nghệ thông tin',
            description: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi nhu cầu.',
            image: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg',
            linkText: 'Xem chi tiết',
            linkUrl: '#'
          }
        ]
      },
      render: (props) => <LanguageFilter lang={props.lang}><AdminServices {...props} /></LanguageFilter>
    },

    News: {
      label: 'Tin tức',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        title: { type: 'text', label: 'Tiêu đề' },
        subtitle: { type: 'text', label: 'Mô tả phụ' },
        buttonText: { type: 'text', label: 'Chữ nút xem thêm' },
        buttonUrl: { type: 'text', label: 'Link nút xem thêm' },
        articles: {
          type: 'array',
          label: 'Danh sách bài viết (Tin tức)',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề' },
            summary: { type: 'textarea', label: 'Tóm tắt' },
            image: { type: 'text', label: 'URL Ảnh' },
            date: { type: 'text', label: 'Ngày đăng' },
            url: { type: 'text', label: 'Đường dẫn' }
          },
          getItemSummary: (item) => item.title
        }
      },
      defaultProps: {
        lang: 'all',
        title: 'Tin tức',
        subtitle: 'Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.',
        buttonText: 'Xem tất cả bài viết',
        buttonUrl: '#',
        articles: [
          {
            title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu',
            summary: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra...',
            image: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
            date: '26 thg 6, 2026',
            url: '#'
          },
          {
            title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên',
            summary: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến tron...',
            image: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
            date: '26 thg 6, 2026',
            url: '#'
          },
          {
            title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá',
            summary: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé ‘Lục Giác’ để chọn cho m...',
            image: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg',
            date: '26 thg 6, 2026',
            url: '#'
          },
          {
            title: 'Bài viết 4',
            summary: 'Bài viết 4',
            image: 'https://beta-api.hexagon.xyz/uploads/phattrienphanmem-1773133089066-706455049.png',
            date: '25 thg 6, 2026',
            url: '#'
          },
          {
            title: 'Bài viết 5',
            summary: 'Bài viết 5',
            image: 'https://beta-api.hexagon.xyz/uploads/ai-phan-tich-du-lieu-1773291405655-118730188-1774254824600-959205718.jpg',
            date: '25 thg 6, 2026',
            url: '#'
          }
        ]
      },
      render: (props) => <LanguageFilter lang={props.lang}><AdminNews {...props} /></LanguageFilter>
    },

    Partners: {
      label: 'Đối tác liên kết',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        title: { type: 'text', label: 'Tiêu đề' },
        partners: {
          type: 'array',
          label: 'Danh sách đối tác',
          arrayFields: {
            name: { type: 'text', label: 'Tên đối tác' },
            logo: { type: 'text', label: 'Đường dẫn Logo' }
          },
          getItemSummary: (item) => item.name
        }
      },
      defaultProps: {
        lang: 'all',
        title: 'Các đối tác liên kết',
        partners: [
          { name: 'Khối B', logo: '/src/B.png' },
          { name: 'Khối C', logo: '/src/Logo Khoi C.png' },
          { name: 'Khối D', logo: '/src/Logo Khoi D.png' },
          { name: 'Happy Food', logo: '/src/Happy Food.png' },
          { name: 'Khối E', logo: '/src/Logo Khoi E.png' },
          { name: 'Khối F', logo: '/src/Logo Khoi F.png' }
        ]
      },
      render: (props) => <LanguageFilter lang={props.lang}><AdminPartners {...props} /></LanguageFilter>
    },

    Contact: {
      label: 'Liên hệ (Contact)',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        title: { type: 'text', label: 'Tiêu đề' },
        subtitle: { type: 'textarea', label: 'Mô tả phụ' },
        addressLabel: { type: 'text', label: 'Tiêu đề Địa chỉ' },
        address: { type: 'text', label: 'Địa chỉ' },
        emailLabel: { type: 'text', label: 'Tiêu đề Email' },
        email: { type: 'text', label: 'Email' },
        phoneLabel: { type: 'text', label: 'Tiêu đề Hotline' },
        phone: { type: 'text', label: 'Hotline' },
        facebookUrl: { type: 'text', label: 'Facebook URL' },
        linkedinUrl: { type: 'text', label: 'LinkedIn URL' },
        youtubeUrl: { type: 'text', label: 'YouTube URL' },
        zaloUrl: { type: 'text', label: 'Zalo URL' },
        mapEmbedUrl: { type: 'text', label: 'Google Map Embed URL' }
      },
      defaultProps: {
        lang: 'all',
        title: 'Liên hệ với chúng tôi',
        subtitle: 'Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.',
        addressLabel: 'Trụ sở chính',
        address: '615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh',
        emailLabel: 'Email',
        email: 'info@hexagon.xyz',
        phoneLabel: 'Hotline',
        phone: '096 446 0333',
        facebookUrl: '#',
        linkedinUrl: '#',
        youtubeUrl: '#',
        zaloUrl: '#',
        mapEmbedUrl: 'https://maps.google.com/maps?q=615%20%C3%82u%20C%C6%A1&t=&z=15&ie=UTF8&iwloc=&output=embed'
      },
      render: (props) => <LanguageFilter lang={props.lang}><AdminContact {...props} /></LanguageFilter>
    },

    Footer: {
      label: 'Chân trang (Footer)',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        copyrightText: { type: 'text', label: 'Dòng bản quyền' }
      },
      defaultProps: {
        lang: 'all',
        copyrightText: 'Copyright 2026 © Hexagon Corporation. All rights reserved.'
      },
      render: (props) => <LanguageFilter lang={props.lang}><AdminFooter {...props} /></LanguageFilter>
    },

    ServicePageTemplate: {
      label: 'Mẫu Trang Dịch Vụ',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        breadcrumb: { type: 'text', label: 'Đường dẫn' },
        heroTitle: { type: 'text', label: 'Tiêu đề Hero' },
        heroDescription: { type: 'textarea', label: 'Mô tả Hero' },
        buttonText: { type: 'text', label: 'Chữ trên nút' },
        buttonUrl: { type: 'text', label: 'Đường dẫn nút' },
        image: { type: 'text', label: 'URL Ảnh' },
        
        solutionsTitle: { type: 'text', label: 'Tiêu đề Giải pháp' },
        cards: {
          type: 'array',
          label: 'Các giải pháp',
          arrayFields: {
            title: { type: 'text', label: 'Tên giải pháp' },
            description: { type: 'textarea', label: 'Mô tả chi tiết' }
          },
          defaultItemProps: { title: 'Giải pháp mới', description: 'Mô tả giải pháp' },
          getItemSummary: (item) => item.title || 'Giải pháp mới'
        },

        processTitle: { type: 'text', label: 'Tiêu đề Quy trình' },
        processSubtitle: { type: 'text', label: 'Mô tả phụ Quy trình' },
        steps: {
          type: 'array',
          label: 'Các bước',
          arrayFields: {
            number: { type: 'text', label: 'Số thứ tự (vd: 01)' },
            text: { type: 'text', label: 'Nội dung bước' }
          },
          defaultItemProps: { number: '01', text: 'Bước mới' },
          getItemSummary: (item) => `${item.number || ''} - ${item.text || ''}`
        },

        ctaTitle: { type: 'text', label: 'Tiêu đề CTA' },
        ctaSubtitle: { type: 'textarea', label: 'Mô tả CTA' },
        primaryButtonText: { type: 'text', label: 'Nút chính (Màu cam)' },
        primaryButtonUrl: { type: 'text', label: 'Link Nút chính' },
        secondaryButtonText: { type: 'text', label: 'Nút phụ (Màu xanh)' },
        secondaryButtonUrl: { type: 'text', label: 'Link Nút phụ' }
      },
      defaultProps: {
        lang: 'all',
        breadcrumb: 'Trang chủ > Dịch vụ > Giải pháp công nghệ',
        heroTitle: 'Giải pháp công nghệ',
        heroDescription: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.',
        buttonText: 'Liên hệ tư vấn',
        buttonUrl: '#',
        image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
        solutionsTitle: 'Giải pháp nổi bật',
        cards: [
          { title: 'Phát triển phần mềm theo yêu cầu', description: 'Thiết kế và xây dựng phần mềm "đo ni đóng giày" theo quy trình vận hành riêng của doanh nghiệp.' },
          { title: 'Giải pháp chuyển đổi số doanh nghiệp', description: 'Tích hợp công nghệ vào toàn bộ hoạt động (quản lý, bán hàng, vận hành), giúp doanh nghiệp tự động hóa.' },
          { title: 'Xây dựng hệ thống nền tảng & tích hợp', description: 'Phát triển hệ thống trung tâm (CRM, ERP, Dashboard...) và kết nối các nền tảng hiện có.' }
        ],
        processTitle: 'Quy trình thực hiện',
        processSubtitle: 'Quy trình chuyên nghiệp, minh bạch và hiệu quả.',
        steps: [
          { number: '01', text: 'Khảo sát & phân tích yêu cầu' },
          { number: '02', text: 'Thiết kế giải pháp & kiến trúc hệ thống' },
          { number: '03', text: 'Phát triển & Thử nghiệm' },
          { number: '04', text: 'Triển khai & Bảo trì' }
        ],
        ctaTitle: 'Sẵn sàng triển khai?',
        ctaSubtitle: 'Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.',
        primaryButtonText: 'Liên hệ ngay',
        primaryButtonUrl: '#',
        secondaryButtonText: 'Về trang chủ',
        secondaryButtonUrl: '/'
      },
      render: (props) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ServiceHero 
            breadcrumb={props.breadcrumb}
            title={props.heroTitle}
            description={props.heroDescription}
            buttonText={props.buttonText}
            buttonUrl={props.buttonUrl}
            image={props.image}
          />
          <Solutions 
            title={props.solutionsTitle}
            cards={props.cards}
          />
          <Process 
            title={props.processTitle}
            subtitle={props.processSubtitle}
            steps={props.steps}
          />
          <CTA 
            title={props.ctaTitle}
            subtitle={props.ctaSubtitle}
            primaryButtonText={props.primaryButtonText}
            primaryButtonUrl={props.primaryButtonUrl}
            secondaryButtonText={props.secondaryButtonText}
            secondaryButtonUrl={props.secondaryButtonUrl}
          />
        </div>
      )
    },

    ConstructionServiceTemplate: {
      label: 'Mẫu Giải pháp thi công',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        breadcrumb: { type: 'text', label: 'Đường dẫn' },
        heroTitle: { type: 'text', label: 'Tiêu đề Hero' },
        heroDescription: { type: 'textarea', label: 'Mô tả Hero' },
        buttonText: { type: 'text', label: 'Chữ trên nút' },
        buttonUrl: { type: 'text', label: 'Đường dẫn nút' },
        image: { type: 'text', label: 'URL Ảnh' },
        
        solutionsTitle: { type: 'text', label: 'Tiêu đề Giải pháp' },
        cards: {
          type: 'array',
          label: 'Các giải pháp',
          arrayFields: {
            title: { type: 'text', label: 'Tên giải pháp' },
            description: { type: 'textarea', label: 'Mô tả chi tiết' }
          },
          defaultItemProps: { title: 'Giải pháp mới', description: 'Mô tả giải pháp' },
          getItemSummary: (item) => item.title || 'Giải pháp mới'
        },

        processTitle: { type: 'text', label: 'Tiêu đề Quy trình' },
        processSubtitle: { type: 'text', label: 'Mô tả phụ Quy trình' },
        steps: {
          type: 'array',
          label: 'Các bước',
          arrayFields: {
            number: { type: 'text', label: 'Số thứ tự (vd: 01)' },
            text: { type: 'text', label: 'Nội dung bước' }
          },
          defaultItemProps: { number: '01', text: 'Bước mới' },
          getItemSummary: (item) => `${item.number || ''} - ${item.text || 'Bước mới'}`
        },

        ctaTitle: { type: 'text', label: 'Tiêu đề CTA' },
        ctaSubtitle: { type: 'textarea', label: 'Mô tả CTA' },
        primaryButtonText: { type: 'text', label: 'Nút chính (Màu cam)' },
        primaryButtonUrl: { type: 'text', label: 'Link Nút chính' },
        secondaryButtonText: { type: 'text', label: 'Nút phụ (Màu xanh)' },
        secondaryButtonUrl: { type: 'text', label: 'Link Nút phụ' }
      },
      defaultProps: {
        lang: 'all',
        breadcrumb: 'Trang chủ > Dịch vụ > Giải pháp thi công & lắp đặt',
        heroTitle: 'Giải pháp thi công & lắp đặt',
        heroDescription: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững trong môi trường số hóa.',
        buttonText: 'Liên hệ Tư vấn',
        buttonUrl: '#',
        image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
        
        solutionsTitle: 'Giải pháp nổi bật',
        cards: [
          { title: 'Đánh giá hiện trạng & mức độ trưởng thành số', description: 'Phân tích toàn diện hệ thống, quy trình và năng lực công nghệ hiện tại, từ đó xác định mức độ sẵn sàng chuyển đổi số của doanh nghiệp.' },
          { title: 'Xây dựng chiến lược chuyển đổi số tổng thể', description: 'Tư vấn lộ trình chuyển đổi số theo từng giai đoạn, phù hợp với mục tiêu kinh doanh, nguồn lực và ngành nghề của doanh nghiệp.' },
          { title: 'Tư vấn lựa chọn công nghệ & giải pháp triển khai', description: 'Đề xuất các nền tảng, công nghệ và mô hình triển khai tối ưu (Cloud, AI, Data, CRM, ERP...), đảm bảo hiệu quả đầu tư và khả năng mở rộng.' }
        ],

        processTitle: 'Quy trình thực hiện',
        processSubtitle: 'Quy trình chuyên nghiệp, minh bạch và hiệu quả.',
        steps: [
          { number: '01', text: 'Khảo sát & đánh giá doanh nghiệp' },
          { number: '02', text: 'Xác định mục tiêu & định hướng chuyển đổi' },
          { number: '03', text: 'Xây dựng lộ trình & giải pháp' },
          { number: '04', text: 'Đồng hành triển khai & tối ưu' }
        ],

        ctaTitle: 'Sẵn sàng triển khai?',
        ctaSubtitle: 'Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.',
        primaryButtonText: 'Liên hệ ngay',
        primaryButtonUrl: '#',
        secondaryButtonText: 'Về Trang chủ',
        secondaryButtonUrl: '/'
      },
      render: (props) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ServiceHero 
            breadcrumb={props.breadcrumb}
            title={props.heroTitle}
            description={props.heroDescription}
            buttonText={props.buttonText}
            buttonUrl={props.buttonUrl}
            image={props.image}
          />
          <Solutions 
            title={props.solutionsTitle}
            cards={props.cards}
          />
          <Process 
            title={props.processTitle}
            subtitle={props.processSubtitle}
            steps={props.steps}
          />
          <CTA 
            title={props.ctaTitle}
            subtitle={props.ctaSubtitle}
            primaryButtonText={props.primaryButtonText}
            primaryButtonUrl={props.primaryButtonUrl}
            secondaryButtonText={props.secondaryButtonText}
            secondaryButtonUrl={props.secondaryButtonUrl}
          />
        </div>
      )
    },

    ITEquipmentServiceTemplate: {
      label: 'Mẫu Thiết bị CNTT / AI',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        breadcrumb: { type: 'text', label: 'Đường dẫn' },
        heroTitle: { type: 'text', label: 'Tiêu đề Hero' },
        heroDescription: { type: 'textarea', label: 'Mô tả Hero' },
        buttonText: { type: 'text', label: 'Chữ trên nút' },
        buttonUrl: { type: 'text', label: 'Đường dẫn nút' },
        image: { type: 'text', label: 'URL Ảnh' },
        
        solutionsTitle: { type: 'text', label: 'Tiêu đề Giải pháp' },
        cards: {
          type: 'array',
          label: 'Các giải pháp',
          arrayFields: {
            title: { type: 'text', label: 'Tên giải pháp' },
            description: { type: 'textarea', label: 'Mô tả chi tiết' }
          },
          defaultItemProps: { title: 'Giải pháp mới', description: 'Mô tả giải pháp' },
          getItemSummary: (item) => item.title || 'Giải pháp mới'
        },

        processTitle: { type: 'text', label: 'Tiêu đề Quy trình' },
        processSubtitle: { type: 'text', label: 'Mô tả phụ Quy trình' },
        steps: {
          type: 'array',
          label: 'Các bước',
          arrayFields: {
            number: { type: 'text', label: 'Số thứ tự (vd: 01)' },
            text: { type: 'text', label: 'Nội dung bước' }
          },
          defaultItemProps: { number: '01', text: 'Bước mới' },
          getItemSummary: (item) => `${item.number || ''} - ${item.text || ''}`
        },

        ctaTitle: { type: 'text', label: 'Tiêu đề CTA' },
        ctaSubtitle: { type: 'textarea', label: 'Mô tả CTA' },
        primaryButtonText: { type: 'text', label: 'Nút chính (Màu cam)' },
        primaryButtonUrl: { type: 'text', label: 'Link Nút chính' },
        secondaryButtonText: { type: 'text', label: 'Nút phụ (Màu xanh)' },
        secondaryButtonUrl: { type: 'text', label: 'Link Nút phụ' }
      },
      defaultProps: {
        lang: 'all',
        breadcrumb: 'Trang chủ > Dịch vụ > Cung cấp thiết bị CNTT',
        heroTitle: 'Cung cấp thiết bị CNTT',
        heroDescription: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu doanh nghiệp.',
        buttonText: 'Liên hệ Tư vấn',
        buttonUrl: '#',
        image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
        
        solutionsTitle: 'Giải pháp nổi bật',
        cards: [
          { title: 'Xây dựng hệ thống dữ liệu tập trung', description: 'Thiết kế và triển khai hệ thống lưu trữ dữ liệu tập trung, giúp doanh nghiệp quản lý, đồng bộ và khai thác dữ liệu hiệu quả.' },
          { title: 'Phân tích dữ liệu & trực quan hóa', description: 'Khai thác dữ liệu thông qua báo cáo, dashboard và mô hình phân tích, hỗ trợ ra quyết định nhanh và chính xác.' },
          { title: 'Ứng dụng AI & Machine Learning', description: 'Triển khai các mô hình AI như dự đoán, phân loại, chatbot, nhận diện hình ảnh... giúp tự động hóa và tối ưu vận hành.' }
        ],

        processTitle: 'Quy trình thực hiện',
        processSubtitle: 'Quy trình chuyên nghiệp, minh bạch và hiệu quả.',
        steps: [
          { number: '01', text: 'Thu thập & chuẩn hóa dữ liệu' },
          { number: '02', text: 'Thiết kế kiến trúc dữ liệu' },
          { number: '03', text: 'Phát triển mô hình & hệ thống' },
          { number: '04', text: 'Triển khai & tối ưu liên tục' }
        ],

        ctaTitle: 'Sẵn sàng triển khai?',
        ctaSubtitle: 'Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.',
        primaryButtonText: 'Liên hệ ngay',
        primaryButtonUrl: '#',
        secondaryButtonText: 'Về trang chủ',
        secondaryButtonUrl: '/'
      },
      render: (props) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ServiceHero 
            breadcrumb={props.breadcrumb}
            title={props.heroTitle}
            description={props.heroDescription}
            buttonText={props.buttonText}
            buttonUrl={props.buttonUrl}
            image={props.image}
          />
          <Solutions 
            title={props.solutionsTitle}
            cards={props.cards}
          />
          <Process 
            title={props.processTitle}
            subtitle={props.processSubtitle}
            steps={props.steps}
          />
          <CTA 
            title={props.ctaTitle}
            subtitle={props.ctaSubtitle}
            primaryButtonText={props.primaryButtonText}
            primaryButtonUrl={props.primaryButtonUrl}
            secondaryButtonText={props.secondaryButtonText}
            secondaryButtonUrl={props.secondaryButtonUrl}
          />
        </div>
      )
    },

    ITServicesTemplate: {
      label: 'Mẫu Dịch vụ CNTT',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        breadcrumb: { type: 'text', label: 'Đường dẫn' },
        heroTitle: { type: 'text', label: 'Tiêu đề Hero' },
        heroDescription: { type: 'textarea', label: 'Mô tả Hero' },
        buttonText: { type: 'text', label: 'Chữ trên nút' },
        buttonUrl: { type: 'text', label: 'Đường dẫn nút' },
        image: { type: 'text', label: 'URL Ảnh' },
        
        solutionsTitle: { type: 'text', label: 'Tiêu đề Giải pháp' },
        cards: {
          type: 'array',
          label: 'Các giải pháp',
          arrayFields: {
            title: { type: 'text', label: 'Tên giải pháp' },
            description: { type: 'textarea', label: 'Mô tả chi tiết' }
          },
          defaultItemProps: { title: 'Giải pháp mới', description: 'Mô tả giải pháp' },
          getItemSummary: (item) => item.title || 'Giải pháp mới'
        },

        processTitle: { type: 'text', label: 'Tiêu đề Quy trình' },
        processSubtitle: { type: 'text', label: 'Mô tả phụ Quy trình' },
        steps: {
          type: 'array',
          label: 'Các bước',
          arrayFields: {
            number: { type: 'text', label: 'Số thứ tự (vd: 01)' },
            text: { type: 'text', label: 'Nội dung bước' }
          },
          defaultItemProps: { number: '01', text: 'Bước mới' },
          getItemSummary: (item) => `${item.number || ''} - ${item.text || 'Bước mới'}`
        },

        ctaTitle: { type: 'text', label: 'Tiêu đề CTA' },
        ctaSubtitle: { type: 'textarea', label: 'Mô tả CTA' },
        primaryButtonText: { type: 'text', label: 'Nút chính (Màu cam)' },
        primaryButtonUrl: { type: 'text', label: 'Link Nút chính' },
        secondaryButtonText: { type: 'text', label: 'Nút phụ (Màu xanh)' },
        secondaryButtonUrl: { type: 'text', label: 'Link Nút phụ' }
      },
      defaultProps: {
        lang: 'all',
        breadcrumb: 'Trang chủ > Dịch vụ > Dịch vụ Công nghệ thông tin',
        heroTitle: 'Dịch vụ Công nghệ thông tin',
        heroDescription: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh nghiệp.',
        buttonText: 'Liên hệ tư vấn',
        buttonUrl: '#',
        image: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg',
        
        solutionsTitle: 'Giải pháp nổi bật',
        cards: [
          { title: 'Giải pháp hệ thống camera giám sát', description: 'Thiết kế và lắp đặt hệ thống camera an ninh cho văn phòng, nhà xưởng, cửa hàng... với khả năng giám sát từ xa, lưu trữ và cảnh báo thông minh.' },
          { title: 'Giải pháp mạng WiFi doanh nghiệp', description: 'Triển khai hệ thống WiFi phủ sóng ổn định, bảo mật cao, đáp ứng số lượng lớn người dùng và thiết bị trong môi trường doanh nghiệp.' },
          { title: 'Giải pháp hạ tầng mạng & tích hợp', description: 'Thi công hệ thống mạng tổng thể (LAN, Switch, Router, Server...), đồng bộ với camera và WiFi để đảm bảo vận hành xuyên suốt.' }
        ],

        processTitle: 'Quy trình thực hiện',
        processSubtitle: 'Quy trình chuyên nghiệp, minh bạch và hiệu quả.',
        steps: [
          { number: '01', text: 'Khảo sát & tư vấn giải pháp' },
          { number: '02', text: 'Thiết kế sơ đồ & cấu hình hệ thống' },
          { number: '03', text: 'Thi công & lắp đặt' },
          { number: '04', text: 'Bàn giao & bảo trì' }
        ],

        ctaTitle: 'Sẵn sàng triển khai?',
        ctaSubtitle: 'Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.',
        primaryButtonText: 'Liên hệ ngay',
        primaryButtonUrl: '#',
        secondaryButtonText: 'Về trang chủ',
        secondaryButtonUrl: '/'
      },
      render: (props) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ServiceHero 
            breadcrumb={props.breadcrumb}
            title={props.heroTitle}
            description={props.heroDescription}
            buttonText={props.buttonText}
            buttonUrl={props.buttonUrl}
            image={props.image}
          />
          <Solutions 
            title={props.solutionsTitle}
            cards={props.cards}
          />
          <Process 
            title={props.processTitle}
            subtitle={props.processSubtitle}
            steps={props.steps}
          />
          <CTA 
            title={props.ctaTitle}
            subtitle={props.ctaSubtitle}
            primaryButtonText={props.primaryButtonText}
            primaryButtonUrl={props.primaryButtonUrl}
            secondaryButtonText={props.secondaryButtonText}
            secondaryButtonUrl={props.secondaryButtonUrl}
          />
        </div>
      )
    },

    NewsArticleTemplate: {
      label: 'Mẫu Bài viết chi tiết',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        articleTitle: { type: 'text', label: 'Tiêu đề bài viết' },
        metaDate: { type: 'text', label: 'Ngày đăng' },
        metaTime: { type: 'text', label: 'Giờ đăng' },
        metaLanguage: { type: 'text', label: 'Ngôn ngữ' },
        summary: { type: 'textarea', label: 'Tóm tắt bài viết' },
        image: { type: 'text', label: 'Ảnh bài viết' },
        content: { type: 'textarea', label: 'Nội dung chi tiết' },
        tags: { type: 'text', label: 'Tags' },
        companyName: { type: 'text', label: 'Tên công ty' },
        companyAddress: { type: 'text', label: 'Địa chỉ công ty' },
        companyHotline: { type: 'text', label: 'Hotline công ty' },
        widgetTitle: { type: 'text', label: 'Tiêu đề Sidebar' },
        widgetServices: {
          type: 'array',
          label: 'Các dịch vụ',
          arrayFields: {
            image: { type: 'text', label: 'Ảnh dịch vụ' },
            title: { type: 'text', label: 'Tên dịch vụ' },
            description: { type: 'textarea', label: 'Mô tả dịch vụ' },
            linkText: { type: 'text', label: 'Chữ trên Link' },
            link: { type: 'text', label: 'Đường dẫn Link' }
          },
          getItemSummary: (item) => item.title
        },
        relatedTitle: { type: 'text', label: 'Tiêu đề Bài viết liên quan' },
        relatedArticles: {
          type: 'array',
          label: 'Các bài viết liên quan',
          arrayFields: {
            image: { type: 'text', label: 'Ảnh đại diện' },
            title: { type: 'text', label: 'Tiêu đề bài viết' },
            date: { type: 'text', label: 'Ngày tháng' },
            link: { type: 'text', label: 'Đường dẫn bài viết' }
          },
          getItemSummary: (item) => item.title
        }
      },
      defaultProps: {
        lang: 'all',
        breadcrumb: 'Trang chủ > Bài viết > Hoạt động > Không khí tưng bừng tại Chương trình...',
        articleTitle: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu',
        metaDate: '26 tháng 6, 2026',
        metaTime: '02:54',
        metaLanguage: 'Tiếng Việt',
        summary: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra tại khu nghỉ dưỡng Vinpearl Nha Trang.',
        image: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
        content: 'Hòa chung không khí rực lửa, đại gia đình HHC đã cùng nhau tham gia các hoạt động tham quan, dã ngoại và tăng cường sự gắn kết tại vùng đảo xinh đẹp của Vinpearl Nha Trang. Tại đây, các thành viên cùng người thân đã được trải nghiệm những giây phút ý nghĩa, ấm áp và tận hưởng những giá trị xứng đáng.\n\nTeambuilding không chỉ là hoạt động để gắn kết tình đồng đội mà còn là dịp để toàn thể các đơn vị, tập thể, và cá nhân cùng nhau nhìn lại và tự hào về những thành tựu đã gặt hái, cũng như những khó khăn, trở ngại mà chúng ta đã cùng nhau vượt qua. Đây chính là bước đà hoàn hảo để chuẩn bị cho một sự khởi đầu trọn vẹn niềm vui, hứa hẹn một hành trình mới với nhiều thắng lợi hơn nữa!\n\nTạm biệt Vinpearl Nha Trang với vô vàn kỷ niệm đẹp, chúng ta hãy cùng nhau mang nguồn năng lượng tích cực này trở lại công việc, tiếp tục đồng lòng, đoàn kết và vững bước tiến lên để chinh phục những mục tiêu lớn hơn.\n\nHHC - Sẵn sàng bứt phá!',
        tags: '#HexagonCorporation #SGD #Technology',
        companyName: 'HEXAGON CORPORATION',
        companyAddress: '615 Au Co Str, Tan Phu Ward, HCMC',
        companyHotline: '+84 70 390 9333',
        widgetTitle: 'DỊCH VỤ CỦA CHÚNG TÔI',
        widgetServices: [
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
            title: 'Giải pháp công nghệ',
            description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            title: 'Giải pháp thi công & lắp đặt',
            description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững...',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
            title: 'Cung cấp thiết bị CNTT',
            description: 'Mang đến đa dạng các thiết bị và phần mềm chất lượng cao, phục vụ từ cá nhân đến doanh nghiệp, đảm bảo tính bền bỉ và công nghệ hiện đại.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            title: 'Dịch vụ Công nghệ thông tin',
            description: 'Thi công và lắp đặt hệ thống mạng, camera chuyên nghiệp, đảm bảo kết nối ổn định, an toàn và phù hợp với mọi quy mô.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          }
        ],
        relatedTitle: 'Bài viết liên quan',
        relatedArticles: [
          {
            image: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
            title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên',
            date: '26 tháng 6, 2026',
            link: '#'
          }
        ]
      },
      render: (props) => (
        <NewsArticleLayout {...props} />
      )
    },

    NewsArticleTemplate2: {
      label: 'Mẫu Bài viết 2 (Văn Hiến)',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        articleTitle: { type: 'text', label: 'Tiêu đề bài viết' },
        metaDate: { type: 'text', label: 'Ngày đăng' },
        metaTime: { type: 'text', label: 'Giờ đăng' },
        metaLanguage: { type: 'text', label: 'Ngôn ngữ' },
        summary: { type: 'textarea', label: 'Tóm tắt bài viết' },
        image: { type: 'text', label: 'Ảnh bài viết' },
        content: { type: 'textarea', label: 'Nội dung chi tiết' },
        tags: { type: 'text', label: 'Tags' },
        companyName: { type: 'text', label: 'Tên công ty' },
        companyAddress: { type: 'text', label: 'Địa chỉ công ty' },
        companyHotline: { type: 'text', label: 'Hotline công ty' },
        widgetTitle: { type: 'text', label: 'Tiêu đề Sidebar' },
        widgetServices: {
          type: 'array',
          label: 'Các dịch vụ',
          arrayFields: {
            image: { type: 'text', label: 'Ảnh dịch vụ' },
            title: { type: 'text', label: 'Tên dịch vụ' },
            description: { type: 'textarea', label: 'Mô tả dịch vụ' },
            linkText: { type: 'text', label: 'Chữ trên Link' },
            link: { type: 'text', label: 'Đường dẫn Link' }
          },
          getItemSummary: (item) => item.title
        },
        relatedTitle: { type: 'text', label: 'Tiêu đề Bài viết liên quan' },
        relatedArticles: {
          type: 'array',
          label: 'Các bài viết liên quan',
          arrayFields: {
            image: { type: 'text', label: 'Ảnh đại diện' },
            title: { type: 'text', label: 'Tiêu đề bài viết' },
            date: { type: 'text', label: 'Ngày tháng' },
            link: { type: 'text', label: 'Đường dẫn bài viết' }
          },
          getItemSummary: (item) => item.title
        }
      },
      defaultProps: {
        lang: 'all',
        breadcrumb: 'Trang chủ > Bài viết > Hoạt động > Đồng hành cùng sinh viên Đại học Văn Hiến tại...',
        articleTitle: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên',
        metaDate: '26 tháng 6, 2026',
        metaTime: '01:25',
        metaLanguage: 'Tiếng Việt',
        summary: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến trong chương trình "VHE Startup Devote".',
        image: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
        content: 'Trong khuôn khổ cuộc thi, Lục Giác đã hỗ trợ các bạn sinh viên xây dựng mô hình kinh doanh thiết bị công nghệ điện tử, đồng thời chia sẻ phương pháp trình bày kế hoạch kinh doanh chuyên nghiệp và khả thi.\n\nVới kinh nghiệm thực tế từ doanh nghiệp cùng sự sáng tạo và linh hoạt của các bạn sinh viên, đội myU đã xuất sắc chinh phục ban giám khảo và mang về giải thưởng cao nhất - Giải Nhất Khởi Nghiệp.\n\nThành công này không chỉ khẳng định sự chuyên nghiệp và tiềm năng của sinh viên Đại học Văn Hiến, mà còn thể hiện tầm nhìn phát triển mạnh mẽ của mô hình kinh doanh đến từ Lục Giác. Lục Giác hy vọng sẽ tiếp tục đồng hành cùng các bạn sinh viên trong hành trình lan tỏa tinh thần khởi nghiệp trong kỷ nguyên số.',
        tags: '#HexagonCorporation #SGD #Technology',
        companyName: 'HEXAGON CORPORATION',
        companyAddress: '615 Au Co Str, Tan Phu Ward, HCMC',
        companyHotline: '+84 70 390 9333',
        widgetTitle: 'DỊCH VỤ CỦA CHÚNG TÔI',
        widgetServices: [
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
            title: 'Giải pháp công nghệ',
            description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            title: 'Giải pháp thi công & lắp đặt',
            description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững...',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
            title: 'Cung cấp thiết bị CNTT',
            description: 'Mang đến đa dạng các thiết bị và phần mềm chất lượng cao, phục vụ từ cá nhân đến doanh nghiệp, đảm bảo tính bền bỉ và công nghệ hiện đại.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            title: 'Dịch vụ Công nghệ thông tin',
            description: 'Thi công và lắp đặt hệ thống mạng, camera chuyên nghiệp, đảm bảo kết nối ổn định, an toàn và phù hợp với mọi quy mô.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          }
        ],
        relatedTitle: 'Bài viết liên quan',
        relatedArticles: [
          {
            image: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
            title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25...',
            date: '26 tháng 6, 2026',
            link: '#'
          }
        ]
      },
      render: (props) => (
        <NewsArticleLayout {...props} />
      )
    },

    NewsArticleTemplate3: {
      label: 'Mẫu Bài viết 3 (Sắm Tết)',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        articleTitle: { type: 'text', label: 'Tiêu đề bài viết' },
        metaDate: { type: 'text', label: 'Ngày đăng' },
        metaTime: { type: 'text', label: 'Giờ đăng' },
        metaLanguage: { type: 'text', label: 'Ngôn ngữ' },
        summary: { type: 'textarea', label: 'Tóm tắt bài viết' },
        image: { type: 'text', label: 'Ảnh bài viết' },
        content: { type: 'textarea', label: 'Nội dung chi tiết' },
        tags: { type: 'text', label: 'Tags' },
        companyName: { type: 'text', label: 'Tên công ty' },
        companyAddress: { type: 'text', label: 'Địa chỉ công ty' },
        companyHotline: { type: 'text', label: 'Hotline công ty' },
        widgetTitle: { type: 'text', label: 'Tiêu đề Sidebar' },
        widgetServices: {
          type: 'array',
          label: 'Các dịch vụ',
          arrayFields: {
            image: { type: 'text', label: 'Ảnh dịch vụ' },
            title: { type: 'text', label: 'Tên dịch vụ' },
            description: { type: 'textarea', label: 'Mô tả dịch vụ' },
            linkText: { type: 'text', label: 'Chữ trên Link' },
            link: { type: 'text', label: 'Đường dẫn Link' }
          },
          getItemSummary: (item) => item.title
        },
        relatedTitle: { type: 'text', label: 'Tiêu đề Bài viết liên quan' },
        relatedArticles: {
          type: 'array',
          label: 'Các bài viết liên quan',
          arrayFields: {
            image: { type: 'text', label: 'Ảnh đại diện' },
            title: { type: 'text', label: 'Tiêu đề bài viết' },
            date: { type: 'text', label: 'Ngày tháng' },
            link: { type: 'text', label: 'Đường dẫn bài viết' }
          },
          getItemSummary: (item) => item.title
        }
      },
      defaultProps: {
        lang: 'all',
        breadcrumb: 'Trang chủ > Bài viết > Sự kiện > Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu...',
        articleTitle: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá',
        metaDate: '26 tháng 6, 2026',
        metaTime: '01:00',
        metaLanguage: 'Tiếng Việt',
        summary: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé \'Lục Giác\' để chọn cho mình những siêu phẩm hỗ trợ đắc lực cho công việc và giải trí:\nHiệu năng đỉnh cao.\nThiết kế thời thượng.\nGiá tốt bất ngờ kèm quà tặng Tết giá trị.',
        image: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg',
        content: 'Đừng chỉ bắt đầu năm mới - hãy chinh phục nó với những công cụ phù hợp!',
        tags: '#HexagonCorporation #SGD #Technology',
        companyName: 'HEXAGON CORPORATION',
        companyAddress: '615 Au Co Str, Tan Phu Ward, HCMC',
        companyHotline: '+84 70 390 9333',
        widgetTitle: 'DỊCH VỤ CỦA CHÚNG TÔI',
        widgetServices: [
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
            title: 'Giải pháp công nghệ',
            description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            title: 'Giải pháp thi công & lắp đặt',
            description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững...',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
            title: 'Cung cấp thiết bị CNTT',
            description: 'Mang đến đa dạng các thiết bị và phần mềm chất lượng cao, phục vụ từ cá nhân đến doanh nghiệp, đảm bảo tính bền bỉ và công nghệ hiện đại.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            title: 'Dịch vụ Công nghệ thông tin',
            description: 'Thi công và lắp đặt hệ thống mạng, camera chuyên nghiệp, đảm bảo kết nối ổn định, an toàn và phù hợp với mọi quy mô.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          }
        ],
        relatedTitle: 'Bài viết liên quan',
        relatedArticles: [
          {
            image: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
            title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi...',
            date: '26 tháng 6, 2026',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
            title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên',
            date: '26 tháng 6, 2026',
            link: '#'
          }
        ]
      },
      render: (props) => (
        <NewsArticleLayout {...props} />
      )
    },

    NewsArticleTemplate4: {
      label: 'Mẫu Bài viết 4',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        articleTitle: { type: 'text', label: 'Tiêu đề bài viết' },
        metaDate: { type: 'text', label: 'Ngày đăng' },
        metaTime: { type: 'text', label: 'Giờ đăng' },
        metaLanguage: { type: 'text', label: 'Ngôn ngữ' },
        summary: { type: 'textarea', label: 'Tóm tắt bài viết' },
        image: { type: 'text', label: 'Ảnh bài viết' },
        content: { type: 'textarea', label: 'Nội dung chi tiết' },
        tags: { type: 'text', label: 'Tags' },
        companyName: { type: 'text', label: 'Tên công ty' },
        companyAddress: { type: 'text', label: 'Địa chỉ công ty' },
        companyHotline: { type: 'text', label: 'Hotline công ty' },
        widgetTitle: { type: 'text', label: 'Tiêu đề Sidebar' },
        widgetServices: {
          type: 'array',
          label: 'Các dịch vụ',
          arrayFields: {
            image: { type: 'text', label: 'Ảnh dịch vụ' },
            title: { type: 'text', label: 'Tên dịch vụ' },
            description: { type: 'textarea', label: 'Mô tả dịch vụ' },
            linkText: { type: 'text', label: 'Chữ trên Link' },
            link: { type: 'text', label: 'Đường dẫn Link' }
          },
          getItemSummary: (item) => item.title
        },
        relatedTitle: { type: 'text', label: 'Tiêu đề Bài viết liên quan' },
        relatedArticles: {
          type: 'array',
          label: 'Các bài viết liên quan',
          arrayFields: {
            image: { type: 'text', label: 'Ảnh đại diện' },
            title: { type: 'text', label: 'Tiêu đề bài viết' },
            date: { type: 'text', label: 'Ngày tháng' },
            link: { type: 'text', label: 'Đường dẫn bài viết' }
          },
          getItemSummary: (item) => item.title
        }
      },
      defaultProps: {
        lang: 'all',
        breadcrumb: 'Trang chủ > Bài viết > Tin tức > Bài viết 4',
        articleTitle: 'Bài viết 4',
        metaDate: '25 tháng 6, 2026',
        metaTime: '18:58',
        metaLanguage: 'Tiếng Việt',
        summary: 'Bài viết 4',
        image: '',
        content: '',
        tags: '',
        companyName: 'HEXAGON CORPORATION',
        companyAddress: '615 Au Co Str, Tan Phu Ward, HCMC',
        companyHotline: '+84 70 390 9333',
        widgetTitle: 'DỊCH VỤ CỦA CHÚNG TÔI',
        widgetServices: [
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
            title: 'Giải pháp công nghệ',
            description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            title: 'Giải pháp thi công & lắp đặt',
            description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững...',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
            title: 'Cung cấp thiết bị CNTT',
            description: 'Mang đến đa dạng các thiết bị và phần mềm chất lượng cao, phục vụ từ cá nhân đến doanh nghiệp, đảm bảo tính bền bỉ và công nghệ hiện đại.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            title: 'Dịch vụ Công nghệ thông tin',
            description: 'Thi công và lắp đặt hệ thống mạng, camera chuyên nghiệp, đảm bảo kết nối ổn định, an toàn và phù hợp với mọi quy mô.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          }
        ],
        relatedTitle: 'Bài viết liên quan',
        relatedArticles: [
          {
            image: 'https://beta-api.hexagon.xyz/uploads/ai-phan-tich-du-lieu-1773291405655-118730188-1774254824600-959205718.jpg',
            title: 'Bài viết 5',
            date: '25 tháng 6, 2026',
            link: '#'
          }
        ]
      },
      render: (props) => (
        <NewsArticleLayout {...props} />
      )
    },

    NewsArticleTemplate5: {
      label: 'Mẫu Bài viết 5',
      fields: {
        lang: {
          type: 'select',
          label: 'Ngôn ngữ hiển thị',
          options: [
            { label: 'Tất cả (Cả 2)', value: 'all' },
            { label: 'Tiếng Việt', value: 'vi' },
            { label: 'Tiếng Anh', value: 'en' }
          ]
        },
        breadcrumb: { type: 'text', label: 'Breadcrumb' },
        articleTitle: { type: 'text', label: 'Tiêu đề bài viết' },
        metaDate: { type: 'text', label: 'Ngày đăng' },
        metaTime: { type: 'text', label: 'Giờ đăng' },
        metaLanguage: { type: 'text', label: 'Ngôn ngữ' },
        summary: { type: 'textarea', label: 'Tóm tắt bài viết' },
        image: { type: 'text', label: 'Ảnh bài viết' },
        content: { type: 'textarea', label: 'Nội dung chi tiết' },
        tags: { type: 'text', label: 'Tags' },
        companyName: { type: 'text', label: 'Tên công ty' },
        companyAddress: { type: 'text', label: 'Địa chỉ công ty' },
        companyHotline: { type: 'text', label: 'Hotline công ty' },
        widgetTitle: { type: 'text', label: 'Tiêu đề Sidebar' },
        widgetServices: {
          type: 'array',
          label: 'Các dịch vụ',
          arrayFields: {
            image: { type: 'text', label: 'Ảnh dịch vụ' },
            title: { type: 'text', label: 'Tên dịch vụ' },
            description: { type: 'textarea', label: 'Mô tả dịch vụ' },
            linkText: { type: 'text', label: 'Chữ trên Link' },
            link: { type: 'text', label: 'Đường dẫn Link' }
          },
          getItemSummary: (item) => item.title
        },
        relatedTitle: { type: 'text', label: 'Tiêu đề Bài viết liên quan' },
        relatedArticles: {
          type: 'array',
          label: 'Các bài viết liên quan',
          arrayFields: {
            image: { type: 'text', label: 'Ảnh đại diện' },
            title: { type: 'text', label: 'Tiêu đề bài viết' },
            date: { type: 'text', label: 'Ngày tháng' },
            link: { type: 'text', label: 'Đường dẫn bài viết' }
          },
          getItemSummary: (item) => item.title
        }
      },
      defaultProps: {
        lang: 'all',
        breadcrumb: 'Trang chủ > Bài viết > Tin tức > Bài viết 5',
        articleTitle: 'Bài viết 5',
        metaDate: '25 tháng 6, 2026',
        metaTime: '',
        metaLanguage: 'Tiếng Việt',
        summary: 'Bài viết 5',
        image: '',
        content: '',
        tags: '',
        companyName: 'HEXAGON CORPORATION',
        companyAddress: '615 Au Co Str, Tan Phu Ward, HCMC',
        companyHotline: '+84 70 390 9333',
        widgetTitle: 'DỊCH VỤ CỦA CHÚNG TÔI',
        widgetServices: [
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
            title: 'Giải pháp công nghệ',
            description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            title: 'Giải pháp thi công & lắp đặt',
            description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững...',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
            title: 'Cung cấp thiết bị CNTT',
            description: 'Mang đến đa dạng các thiết bị và phần mềm chất lượng cao, phục vụ từ cá nhân đến doanh nghiệp, đảm bảo tính bền bỉ và công nghệ hiện đại.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          },
          {
            image: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            title: 'Dịch vụ Công nghệ thông tin',
            description: 'Thi công và lắp đặt hệ thống mạng, camera chuyên nghiệp, đảm bảo kết nối ổn định, an toàn và phù hợp với mọi quy mô.',
            linkText: 'Tìm hiểu thêm',
            link: '#'
          }
        ],
        relatedTitle: 'Bài viết liên quan',
        relatedArticles: [
          {
            image: 'https://beta-api.hexagon.xyz/uploads/phattrienphanmem-1773133089066-706455049.png',
            title: 'Bài viết 4',
            date: '25 tháng 6, 2026',
            link: '#'
          }
        ]
      },
      render: (props) => (
        <NewsArticleLayout {...props} />
      )
    }
  },

  // Sidebar categories
  categoryGroups: [
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout', components: ['Section', 'Header'] },
    { title: 'Nâng cao', components: ['Hero', 'About', 'Services', 'News', 'Partners', 'Contact', 'Footer'] },
    { title: 'Trang Dịch Vụ', components: ['ServicePageTemplate', 'ConstructionServiceTemplate', 'ITEquipmentServiceTemplate', 'ITServicesTemplate'] },
    { title: 'Trang Tin Tức', components: ['NewsArticleTemplate', 'NewsArticleTemplate2', 'NewsArticleTemplate3', 'NewsArticleTemplate4', 'NewsArticleTemplate5'] }
  ],

  // Root config
  root: {
    fields: {
      title: { type: 'text', label: 'Tên trang web' },
      slug: { type: 'text', label: 'Đường dẫn (Slug)' }
    },
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;
