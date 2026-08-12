const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config({ override: true });

const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Static folder for uploaded images
app.use("/uploads", express.static("uploads"));

// Swagger UI Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const userRoutes = require("./routes/user.routes");
const bannerRoutes = require("./routes/banner.routes");
const newsRoutes = require("./routes/news.routes");
const orderRoutes = require("./routes/order.routes");
const configRoutes = require("./routes/config.routes");

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/users", userRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/configs", configRoutes);

app.get("/", (req, res) => {
  res.send("E-commerce API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
