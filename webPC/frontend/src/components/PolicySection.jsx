import React, { useState } from "react";
import {
  Truck,
  RotateCcw,
  CreditCard,
  HeadphonesIcon,
  Plus,
  Minus,
} from "lucide-react";

const PolicySection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const policies = [
    {
      icon: <Truck size={36} className="text-[#ff4d4f] mb-3" />,
      title: "GIAO HÀNG TOÀN QUỐC",
      desc: "Giao hàng trước, trả tiền sau COD",
    },
    {
      icon: <RotateCcw size={36} className="text-[#ff4d4f] mb-3" />,
      title: "ĐỔI TRẢ DỄ DÀNG",
      desc: "Đổi mới trong 30 ngày đầu",
    },
    {
      icon: <CreditCard size={36} className="text-[#ff4d4f] mb-3" />,
      title: "THANH TOÁN TIỆN LỢI",
      desc: "Trả tiền mặt, chuyển khoản, trả góp 0%",
    },
    {
      icon: <HeadphonesIcon size={36} className="text-[#ff4d4f] mb-3" />,
      title: "HỖ TRỢ NHIỆT TÌNH",
      desc: "Tư vấn tổng đài miễn phí 24/7",
    },
  ];

  const faqs = [
    "1. Liên hệ chăm sóc khách hàng dễ dàng",
    "2. Giao hàng nhanh trong 2 giờ mà không thu thêm phí",
    "3. Miễn phí lên đời và trải nghiệm sản phẩm trong vòng 15 ngày",
    "4. Cam kết thu cũ đổi mới trọn đời với tất cả các sản phẩm Gaming Gear và linh kiện máy tính",
    "5. Cho mượn sản phẩm miễn phí thay thế trong thời gian bảo hành tại TTG SHOP",
  ];

  return (
    <div className="w-full mt-10">
      {/* 4 Policy Items (Angled Box effect) */}
      <div className="relative max-w-[1100px] mx-auto px-4 mb-10">
        <div
          className="bg-white rounded-lg shadow-sm py-8 px-6 hidden md:block"
          style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0% 100%)" }}
        >
          <div className="grid grid-cols-4 gap-4 px-10">
            {policies.map((p, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                {p.icon}
                <h4 className="font-bold text-[13px] text-gray-900 uppercase mb-1">
                  {p.title}
                </h4>
                <p className="text-[12px] text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile version without clip-path */}
        <div className="bg-white rounded-lg shadow-sm py-6 px-4 md:hidden">
          <div className="grid grid-cols-2 gap-6">
            {policies.map((p, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                {p.icon}
                <h4 className="font-bold text-[13px] text-gray-900 uppercase mb-1">
                  {p.title}
                </h4>
                <p className="text-[12px] text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center Title */}
      <div className="text-center mb-8">
        <h3 className="font-bold text-[16px] text-gray-800 mb-1">
          Trải nghiệm mua sắm tại{" "}
          <span className="text-[#ff4d4f]">TTG SHOP</span>
        </h3>
        <h2 className="text-[28px] font-extrabold text-gray-900">
          Cam Kết 100% <span className="text-[#ff7a00]">Hài Lòng</span>
        </h2>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-[900px] mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full py-4 flex justify-between items-center text-left hover:text-[#ff4d4f] transition-colors focus:outline-none"
              >
                <span className="font-bold text-[14px] text-gray-900">
                  {faq}
                </span>
                {openIndex === index ? (
                  <Minus size={20} className="text-gray-900 shrink-0" />
                ) : (
                  <Plus size={20} className="text-gray-900 shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="pb-4 pt-1 text-[13px] text-gray-600 animate-fadeIn">
                  Nội dung chi tiết của cam kết này đang được cập nhật...
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicySection;
