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
```
🧑‍💻 Getting Started Locally
To run this project on your local machine:

1. Clone the Repository
```git clone https://github.com/nishithraut/WaterBNB.git```
```cd waterbnb```

3. Install Dependencies
```npm install```

5. Set Up Environment Variables
Create a .env file in the root directory and add:

env
```
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MapToken=your_mapbox_token

ATLASDB_URL=your_mongodb_atlas_url

secret=your_session_secret
```


4. Run the Server
```node app.js```

Visit the app at http://localhost:8080




☁️ Deployment on Render
To deploy your project on Render:

1. Push Your Project to GitHub
Ensure your latest code is on GitHub.

2. Create a New Web Service on Render
Go to Render Dashboard

Click "New Web Service"

Choose "Deploy from GitHub"

3. Fill In the Details
   
Build Command:
```npm install```

Start Command:
```node app.js```

Environment:
Add all your .env variables securely in the "Environment Variables" section.

4. Deploy
Render will install dependencies, start your server, and give you a live production URL.

💡 Future Enhancements
Search and filter functionality

Booking calendar with availability

Social login (Google/Facebook)

Responsive design improvements


