🎓 CampusHub – Student Marketplace & Xerox Management Platform

CampusHub is a frontend-only web application designed to improve daily campus life by providing a student marketplace, online xerox ordering, and role-based dashboards — all built using React with a focus on UX, scalability, and real-world flows.

This project was developed as part of a hackathon / college project, simulating backend behavior using localStorage (no backend required).

🚀 Features
🔐 Authentication (Frontend-only)
Login & Signup system
localStorage used as a fake backend
Protected routes
Persistent login state
Logout with confirmation modal

🛒 Student Marketplace
Browse 50+ products
Search products by name
Filter by category (Books, Electronics, Lab, Accessories)
Sort by price (Low → High / High → Low)
Product images
Product detail modal (animated)
Skeleton loaders (perceived performance)
Empty state handling
Smooth page transitions

🖨️ Xerox Ordering System
Place xerox orders (UI simulation)
View order status
Admin can mark orders as “Ready”

📦 Orders Page
View all orders
Status badges (Printing / Ready)
Fully dark-mode compatible UI

👤 Profile Section
View & edit profile details
Profile image upload (preview only)
Tabs: Profile | Orders | Wishlist
Data persistence using localStorage
Logout confirmation modal

🛠️ Admin Dashboard
View all xerox orders
Update order status
Clean admin UI
Dark mode compatible

🌗 Dark / Light Mode
Theme toggle in navbar
CSS variables used throughout
Consistent UI in both modes

📱 Responsive UI
Mobile-friendly navbar
Hamburger menu
Adaptive layouts

🧱 Tech Stack
React (Vite / CRA)
React Router
JavaScript (ES6+)
CSS (CSS variables, animations)
localStorage (fake backend)
❌ No backend
❌ No Firebase
✅ Frontend-only (by design)

🗂️ Project Structure
src/
│── components/
│   ├── Navbar.jsx
│   ├── PageWrapper.jsx
│   ├── ProductCard.jsx
│   ├── ProductModal.jsx
│   ├── ProductSkeleton.jsx
│   ├── ProtectedRoute.jsx
│   ├── ScrollToTop.jsx
│
│── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Home.jsx
│   ├── Marketplace.jsx
│   ├── AddProduct.jsx
│   ├── Xerox.jsx
│   ├── Orders.jsx
│   ├── Admin.jsx
│   ├── Profile.jsx
│
│── data/
│   ├── products.js
│   ├── orders.js
│
│── index.css
│── App.js
│── main.jsx

🔑 Demo Credentials
Use the following credentials to log in:
Email: user@gmail.com
Password: 123456
These credentials are auto-seeded into localStorage on first load.

🧪 How Authentication Works (Frontend Simulation)
User data is stored in localStorage
Login validates credentials against stored data
isLoggedIn flag controls access
Protected routes redirect unauthenticated users to login
This approach simulates real authentication flows without a backend.

🎯 Key UX & Engineering Highlights
Skeleton loaders for better perceived performance
Modal animations (fade + scale)
Scroll-safe layouts
Fixed navbar for reliability
Dark mode using CSS variables
Reusable layout components
Clean separation of concerns

🏆 Hackathon & Portfolio Value
This project demonstrates:
Real-world frontend architecture
State management
UX-first thinking
Backend-ready design
Scalable component structure

Perfect for:
Hackathons
College submissions
Frontend portfolio
Internship interviews

🛣️ Future Enhancements
Backend integration (Firebase / Node.js)
Real payments (Google Pay API)
Multi-user support
Wishlist persistence
Order notifications
Admin analytics dashboard

📸 Screenshots (Optional)
Add screenshots here for Marketplace, Login, Profile, Admin Dashboard

👨‍💻 Author
Vedant Cheulkar
Frontend Developer
Built with ❤️ for improving campus life

📜 License
This project is for educational and demonstration purposes.