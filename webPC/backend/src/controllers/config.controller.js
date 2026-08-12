const prisma = require("../config/prisma");

// Get all config values
const getConfigs = async (req, res) => {
  try {
    const configs = await prisma.cauHinhGiaoDien.findMany();
    // Convert to object: { key: value }
    const configMap = {};
    configs.forEach((c) => {
      configMap[c.khoa] = c.gia_tri;
    });
    res.json(configMap);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Update a config value
const updateConfig = async (req, res) => {
  try {
    const { khoa, gia_tri, mo_ta } = req.body;

    const config = await prisma.cauHinhGiaoDien.upsert({
      where: { khoa },
      update: { gia_tri, mo_ta },
      create: { khoa, gia_tri, mo_ta },
    });

    res.json({ message: "Cập nhật cấu hình thành công", config });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  getConfigs,
  updateConfig,
};
