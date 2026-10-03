# AGROMART - Your Digital Marketplace for Agriculture

> **Tagline:** *"Your Digital Marketplace for Agriculture"*  
> Complete, production-style, full-stack agricultural e-commerce web application connecting farmers, certified seed & fertilizer suppliers, and platform administrators.

---

## 1. Project Overview

**AGROMART** is a specialized digital e-commerce platform designed to address the unique challenges of the agricultural ecosystem. Farmers often struggle with counterfeit pesticides, uncertified seeds, unpredictable pricing, and costly intermediaries. AGROMART provides a direct digital marketplace where:
- **Farmers / Customers** browse, filter, and purchase genuine hybrid seeds, organic fertilizers, crop protection solutions, drip irrigation gear, and farming equipment with doorstep rural delivery and full Cash on Delivery (COD) support.
- **Sellers / Agri-Merchants** list products, manage inventory and stock levels, monitor low-stock thresholds, and fulfill orders containing their items.
- **Administrators** oversee the platform, monitor real-time sales and Gross Merchandise Value (GMV), manage categories, audit product listings, and control user access.

---

## 2. Key Features

### For Customers (Farmers)
- **Catalog & Discovery:** Browse products with multi-attribute filtering (category, price range, stock availability) and full-text keyword search.
- **Detailed Specifications:** High-resolution product images, verified seed germination data, packaging units, and brand information.
- **Dynamic Shopping Cart:** Real-time quantity adjustment, automated subtotal calculations, and free delivery incentive tracker (free shipping on orders over ₹1,000).
- **Agricultural Wishlist:** Save items across crop seasons and quickly move them to the active shopping cart.
- **Streamlined Checkout:** Address confirmation, Cash on Delivery (COD) default, and an extensible online payment gateway interface.
- **Order Tracking:** Real-time visual timeline across 6 stages (`PENDING` -> `CONFIRMED` -> `PACKED` -> `SHIPPED` -> `OUT_FOR_DELIVERY` -> `DELIVERED`).
- **Order Cancellation & Restocking:** Cancel pending orders with automated inventory restoration.
- **Farmer Profile Management:** Maintain primary farmgate shipping destination, phone, and credentials.

### For Sellers (Agri-Merchants & Breeders)
- **Seller Dashboard:** Real-time sales revenue metrics, active inventory counters, low-stock notifications (< 5 units), and recent order previews.
- **Product Management:** Full CRUD operations for products (name, category, brand, unit, price, stock, image URL, and agronomy usage guidelines).
- **Order Fulfillment:** View customer orders containing seller's items and update fulfillment stages.
- **Store Profile:** Manage licensed enterprise details and warehouse dispatch address.

### For Platform Administrators
- **Admin Dashboard:** Real-time metrics computed directly from MySQL (Total Users, Customers, Sellers, Products, Orders, Pending Orders, Delivered Orders, and Gross Revenue).
- **User Management:** Comprehensive user directory with role-based filtering and instant account Enable/Disable access controls.
- **Catalog Moderation:** Platform-wide oversight of products listed across all sellers with moderation removal capabilities.
- **Category Management:** Create, edit, and delete agricultural categories with banner images.
- **Master Order Management:** Filter, inspect, and update status transitions across the entire platform.
- **Reports & Analytics:** Performance breakdowns including AOV (Average Order Value), fulfillment completion rates, and user distribution.

---

## 3. Technology Stack

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite 5
- **Routing:** React Router v6 (Nested routes, Role-based Protected Route guards)
- **HTTP Client:** Axios (Centralized instance with JWT Bearer request interceptor and unified error handling)
- **Icons:** Lucide React
- **Design System:** Responsive agricultural green-and-earth palette, modular card components, CSS custom variables (`index.css`), zero external UI bloat.

### Backend
- **Language:** Java 26 / 21
- **Framework:** Spring Boot 4.1.1
- **Web & REST:** Spring Web (MVC, RESTful Controllers)
- **Persistence:** Spring Data JPA & Hibernate ORM 7.x
- **Security:** Spring Security 6 (Stateless JWT token authentication, role-based authorization: `CUSTOMER`, `SELLER`, `ADMIN`)
- **Validation:** Jakarta Bean Validation (Hibernate Validator)
- **Build Tool:** Maven Wrapper (`mvnw.cmd` on Windows, `./mvnw` on Linux/macOS)

### Database
- **Engine:** MySQL 8.0
- **Database Name:** `agromart`
- **Schema Strategy:** Hibernate auto-ddl (`update`)

---

## 4. Project Folder Structure

```
AGM/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/agromart/backend/
│   │   │   │   ├── AgroMartApplication.java
│   │   │   │   ├── config/            # SecurityConfig, CorsConfig
│   │   │   │   ├── controller/        # Auth, User, Product, Category, Cart, Wishlist, Order, Seller, Admin
│   │   │   │   ├── dto/               # Strongly typed Request & Response DTOs
│   │   │   │   ├── entity/            # JPA Entities (User, Product, Category, Cart, Order, Payment...)
│   │   │   │   ├── exception/         # GlobalExceptionHandler & custom domain exceptions
│   │   │   │   ├── repository/        # Spring Data JPA Repositories
│   │   │   │   ├── security/          # JwtTokenProvider, JwtAuthenticationFilter, UserPrincipal
│   │   │   │   ├── service/           # Business logic service implementations
│   │   │   │   └── util/              # DataInitializer (Pre-seeds categories, products, default accounts)
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/com/agromart/backend/
│   │           └── AgroMartApplicationTests.java  # Comprehensive integration tests
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/        # Navbar, Footer, ProductCard, CategoryCard, OrderTimeline, ProtectedRoute
│   │   ├── context/           # AuthContext, CartContext, WishlistContext
│   │   ├── pages/
│   │   │   ├── public/        # Home, Products, ProductDetails, Categories, About, Contact, Login, Register, 403, 404
│   │   │   ├── customer/      # CustomerDashboard, Profile, Cart, Wishlist, Checkout, OrderConfirmation, MyOrders, OrderDetails
│   │   │   ├── seller/        # SellerDashboard, ManageProducts, AddProduct, EditProduct, SellerOrders, SellerProfile
│   │   │   └── admin/         # AdminDashboard, ManageUsers, AdminManageProducts, ManageCategories, ManageOrders, ReportsStatistics
│   │   ├── services/          # Central API client & feature service modules (auth, products, cart, orders...)
│   │   ├── App.jsx            # Main route definition with role-based access
│   │   ├── main.jsx           # Entry point mounting to DOM
│   │   └── index.css          # Full agricultural design system
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

---

## 5. Prerequisites

Before running the application locally on Windows, ensure the following software is installed:

1. **Java Development Kit (JDK):** Version 21 or later (Tested on Java 26.0.1 / Java 21)
   - Verify: `java -version`
2. **Node.js:** Version 18 or later (Tested on Node v25.4.0 with npm 11.7.0)
   - Verify: `node -v` and `npm.cmd -v`
3. **MySQL Server:** MySQL 8.0 (Running on default port `3306`)
   - Verify Windows service: `Get-Service MySQL80`

> **Note:** Global Maven is **NOT** required. The project includes the Maven Wrapper (`mvnw.cmd`).

---

## 6. Database Setup

1. Open MySQL command line client or PowerShell:
   ```powershell
   & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
   ```
2. Create the database:
   ```sql
   CREATE DATABASE IF NOT EXISTS agromart;
   ```
3. Database configuration in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/agromart?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true
   spring.datasource.username=root
   spring.datasource.password=${DB_PASSWORD:root}
   ```
   *If your local MySQL root password is not `root`, you can set the environment variable:*
   ```powershell
   $env:DB_PASSWORD="your_password"
   ```

---

## 7. How to Run the Application

### Running the Backend

Open a terminal in the project root:

```powershell
# 1. Navigate to backend
cd backend

# 2. Compile and package
.\mvnw.cmd clean install -DskipTests

# 3. Start Spring Boot
.\mvnw.cmd spring-boot:run
```

The backend starts up on **`http://localhost:8080`**.  
On first startup, `DataInitializer` automatically pre-seeds 7 agricultural categories, 9 realistic agricultural products, and default test accounts.

---

### Running the Frontend

Open a second terminal in the project root:

```powershell
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies (if not already installed)
npm.cmd install

# 3. Start Vite development server
npm.cmd run dev
```

The frontend will be accessible at:
👉 **`http://localhost:5173`**

---

## 8. Default Development Accounts

All default accounts are pre-seeded with BCrypt hashed passwords:

| Role | Email | Password | Access / Dashboard |
| :--- | :--- | :--- | :--- |
| **CUSTOMER** | `customer@agromart.com` | `customer123` | Customer Dashboard (`/dashboard`), Cart, Wishlist, Orders |
| **SELLER** | `seller@agromart.com` | `seller123` | Seller Dashboard (`/seller`), Inventory & Order Fulfillment |
| **ADMIN** | `admin@agromart.com` | `admin123` | Admin Master Dashboard (`/admin`), User & Category Controls |

> *Tip: On the login page (`/login`), you can click the "Quick Fill Demo Accounts" buttons to instantly log into any of these roles.*

---

## 9. REST API Overview

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new Customer or Seller
- `POST /api/auth/login` — Authenticate and receive JWT Bearer token

### Products (`/api/products`)
- `GET /api/products?sortBy=newest` — Public catalog with sorting (`newest`, `price_asc`, `price_desc`)
- `GET /api/products/{id}` — Single product details
- `GET /api/products/search?keyword=wheat` — Keyword search
- `GET /api/products/category/{categoryId}` — Filter by category
- `GET /api/products/filter?minPrice=100&maxPrice=1000` — Filter by price range
- `POST /api/products` — Create product (`SELLER`, `ADMIN`)
- `PUT /api/products/{id}` — Update product (`SELLER`, `ADMIN`)
- `DELETE /api/products/{id}` — Delete product (`SELLER`, `ADMIN`)

### Categories (`/api/categories`)
- `GET /api/categories` — List all categories with product counts
- `GET /api/categories/{id}` — Get category by ID
- `POST /api/categories` — Create category (`ADMIN`)
- `PUT /api/categories/{id}` — Update category (`ADMIN`)
- `DELETE /api/categories/{id}` — Delete category (`ADMIN`)

### Shopping Cart (`/api/cart`)
- `GET /api/cart` — Get current authenticated user's cart
- `POST /api/cart/items` — Add product to cart `{ productId, quantity }`
- `PUT /api/cart/items/{itemId}` — Update item quantity `{ quantity }`
- `DELETE /api/cart/items/{itemId}` — Remove item from cart
- `DELETE /api/cart/clear` — Clear entire cart

### Wishlist (`/api/wishlist`)
- `GET /api/wishlist` — View saved items
- `POST /api/wishlist/{productId}` — Add product to wishlist
- `DELETE /api/wishlist/{productId}` — Remove product from wishlist

### Orders (`/api/orders`)
- `POST /api/orders` — Create order from active cart `{ shippingAddress, paymentMethod }`
  - Validates and decrements product inventory stock
  - Calculates subtotal and delivery dynamically on backend
  - Clears cart upon placement
- `GET /api/orders` — Customer's order history
- `GET /api/orders/{id}` — Detailed order view
- `PUT /api/orders/{id}/cancel` — Cancel order and restore stock
- `PUT /api/orders/{id}/status` — Update order status (`SELLER`, `ADMIN`)

### Seller Portal (`/api/seller`)
- `GET /api/seller/dashboard` — Seller metrics (Total Products, Low Stock Alerts, Orders, Revenue)
- `GET /api/seller/products` — Manage seller's own inventory
- `POST /api/seller/products` — Add new product
- `PUT /api/seller/products/{id}` — Update product
- `DELETE /api/seller/products/{id}` — Remove product
- `GET /api/seller/orders` — Orders containing seller's items

### Admin Portal (`/api/admin`)
- `GET /api/admin/dashboard` — Platform-wide metrics and revenue
- `GET /api/admin/users` — User directory
- `PUT /api/admin/users/{id}/toggle-status` — Enable / Disable user account
- `GET /api/admin/products` — Platform-wide product catalog
- `GET /api/admin/orders` — Platform-wide orders
- `GET /api/admin/statistics` — Real-time performance statistics

---

## 10. Automated Tests

The application includes an integration test suite testing registration, login, catalog retrieval, seller product creation, cart additions, quantity updates, order creation, backend stock decrements, and cart clearing.

Run tests using the Maven Wrapper:
```powershell
cd backend
.\mvnw.cmd test
```

Expected output:
```
[INFO] Running com.agromart.backend.AgroMartApplicationTests
[INFO] Tests run: 7, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: ~6.7 s
[INFO] BUILD SUCCESS
```

---

## 11. Production Frontend Build

To verify production bundle build:
```powershell
cd frontend
npm.cmd run build
```

Expected output:
```
✓ 1674 modules transformed.
dist/index.html
dist/assets/index.css
dist/assets/index.js
✓ built in ~1.6s
```

---

## 12. Troubleshooting & FAQ

1. **MySQL Access Denied (`1045` error):**  
   Check the password in `backend/src/main/resources/application.properties` or set `$env:DB_PASSWORD="your_password"`.
2. **PowerShell `npm.ps1 cannot be loaded` execution policy error:**  
   Always use `npm.cmd` instead of `npm` on Windows PowerShell to bypass script execution restrictions:
   ```powershell
   npm.cmd run dev
   ```
3. **Port 8080 already in use:**  
   Check if another process is occupying port 8080:
   ```powershell
   Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess
   ```
4. **CORS Errors:**  
   CORS is pre-configured in `SecurityConfig.java` allowing `http://localhost:5173`, `http://127.0.0.1:5173`, and `http://localhost:3000`.
