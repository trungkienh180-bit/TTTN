import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Shield, ShieldAlert, Trash2, User } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { token, user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateRole = async (id, newRole) => {
    if (window.confirm(`Bạn muốn đổi quyền người dùng này thành ${newRole}?`)) {
      try {
        await axios.put(
          `http://localhost:5000/api/users/${id}/role`,
          { vai_tro: newRole },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        fetchUsers();
      } catch (error) {
        alert("Lỗi cập nhật quyền: " + error.response?.data?.message);
      }
    }
  };

  const deleteUser = async (id) => {
    if (id === currentUser?.id) {
      return alert("Không thể tự xóa chính mình!");
    }
    if (
      window.confirm(
        "Cảnh báo: Hành động này không thể hoàn tác. Chắc chắn xóa?",
      )
    ) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers();
      } catch (error) {
        alert("Lỗi xóa người dùng: " + error.response?.data?.message);
      }
    }
  };

  const renderRoleBadge = (role) => {
    switch (role) {
      case "QUAN_TRI_CAP_CAO":
        return (
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
            <ShieldAlert size={12} /> Super Admin
          </span>
        );
      case "QUAN_TRI_VIEN":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
            <Shield size={12} /> Admin
          </span>
        );
      case "BIEN_TAP_VIEN":
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
            <User size={12} /> Biên tập
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
            <User size={12} /> Khách hàng
          </span>
        );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Người Dùng</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
              <th className="p-4 font-semibold">Tên người dùng</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Vai trò</th>
              <th className="p-4 font-semibold">Ngày tham gia</th>
              <th className="p-4 font-semibold text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4 font-medium text-gray-900">{user.ho_ten}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">{renderRoleBadge(user.vai_tro)}</td>
                <td className="p-4 text-gray-500 text-sm">
                  {new Date(user.tao_luc).toLocaleDateString("vi-VN")}
                </td>
                <td className="p-4 flex justify-end gap-2 items-center">
                  <select
                    className="text-sm border border-gray-200 rounded p-1 outline-none"
                    value={user.vai_tro}
                    onChange={(e) => updateRole(user.id, e.target.value)}
                    disabled={user.vai_tro === "QUAN_TRI_CAP_CAO"}
                  >
                    <option value="KHACH_HANG">Khách hàng</option>
                    <option value="BIEN_TAP_VIEN">Biên tập</option>
                    <option value="QUAN_TRI_VIEN">Admin</option>
                    <option value="QUAN_TRI_CAP_CAO" disabled>
                      Super Admin
                    </option>
                  </select>
                  <button
                    onClick={() => deleteUser(user.id)}
                    disabled={
                      user.vai_tro === "QUAN_TRI_CAP_CAO" ||
                      user.id === currentUser?.id
                    }
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg border border-red-100 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
