import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

const MockPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing"); // 'processing' | 'success'

  const orderCode = searchParams.get("orderCode") || "Unknown";
  const amount = searchParams.get("amount") || "0";

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("success");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#111827] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#00ea7b] rounded flex items-center justify-center font-bold text-[#111827]">
              P
            </div>
            <span className="text-white font-bold text-lg">
              PayOS (Chế độ Test)
            </span>
          </div>
          <span className="text-gray-400 text-sm">Giao diện giả lập</span>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center text-center">
          {status === "processing" ? (
            <>
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Đang xử lý thanh toán
              </h2>
              <p className="text-gray-500 mb-6">
                Vui lòng chờ trong giây lát...
              </p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Thanh toán thành công!
              </h2>
              <p className="text-gray-500 mb-6">
                Giao dịch giả lập đã hoàn tất.
              </p>
            </>
          )}

          {/* Receipt Info */}
          <div className="w-full bg-gray-50 rounded-xl p-5 mb-8 text-left border border-gray-100">
            <div className="flex justify-between mb-3">
              <span className="text-gray-500 text-sm">Mã đơn hàng</span>
              <span className="font-bold text-gray-900">#{orderCode}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-500 text-sm">Nhà cung cấp</span>
              <span className="font-bold text-gray-900">TTGK SHOP</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 mt-1">
              <span className="text-gray-500 font-medium">Số tiền</span>
              <span className="font-bold text-red-500 text-lg">
                {Number(amount).toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            disabled={status === "processing"}
            className="w-full bg-[#111827] hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl flex justify-center items-center gap-2 transition-colors"
          >
            Quay về trang chủ <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockPayment;
