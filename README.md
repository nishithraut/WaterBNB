# 🌊 WaterBNB

**WaterBNB** is a modern hotel booking web application inspired by Airbnb. Users can register, log in, browse hotel listings, leave reviews, and manage their own listings. It features user authentication, image uploads, and interactive maps.

## 🚀 Live Demo

👉 [Visit WaterBNB on Render](https://waterbnb-j6kk.onrender.com)

---

## 📸 Features

- ✅ User Authentication (Register / Login / Logout)
- 🏨 Create, Edit, and Delete Listings
- ✍️ Add and Manage Reviews
- 📸 Upload Hotel Images via Cloudinary
- 🗺️ Map Integration using Mapbox
- ⚡ Flash Messages for Feedback
- 🧠 Session Management using MongoDB
- 🧱 Clean EJS Layout with ejs-mate
- ❗ Error Handling Middleware
- 📱 Mobile-Friendly UI (Bootstrap)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Passport.js (Local Strategy)
- **Templating:** EJS with ejs-mate
- **Image Hosting:** Cloudinary
- **Map Integration:** Mapbox
- **Deployment:** Render

---

## 🔐 Environment Variables

Create a `.env` file in your project root with the following keys:

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MapToken=your_mapbox_token

ATLASDB_URL=your_mongodb_atlas_url

secret=your_session_secret
