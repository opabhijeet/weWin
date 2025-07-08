# Long Weekend API

A backend service that exposes REST APIs to fetch **long weekends** and the **next upcoming long weekend** based on public holiday data from the [Calendarific API](https://calendarific.com/).

## 🌐 Deployed At

[https://wewin-p8n9.onrender.com/](https://wewin-p8n9.onrender.com/)

---

## 🚀 Features

* ✅ Get all long weekends in a country for the current year.
* ✅ Get the next upcoming long weekend from today.
* ✅ Validates country codes.
* ✅ Uses in-memory caching for 24 hours.
* ✅ Rate-limited to avoid abuse.

---

## 📦 Tech Stack

* **Node.js** + **Express.js**
* **Calendarific API** (Free public holiday data)
* **node-cache** (in-memory cache)
* **dayjs** (date utilities)
* **express-validator**

---

## 📁 Project Structure

```
WEWIN/
├── controllers/
│   ├── longWeekends.js
│   └── nextLongWeekend.js
├── middlewares/
│   ├── clearCache.js
│   ├── rateLimiter.js
│   └── validateCountryCode.js
├── services/
│   └── holidayService.js
├── utils/
│   ├── dateUtils.js
│   └── responseHelper.js
├── package.json
├── README.md
└── server.js
```

---

## 🔧 Setup Instructions

1. **Clone the repo:**

```bash
git clone https://github.com/opabhijeet/weWin.git
cd weWin
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file:**

```env
CALENDARIFIC_API_KEY=your_calendarific_api_key_here
```

4. **Start the server:**

```bash
npm start
```

Default server runs on: `http://localhost:3000`

---

## 📌 API Endpoints

### 1. Get All Long Weekends

```
GET /long-weekends/:countryCode
```

* Example: `/long-weekends/IN`
* Returns all long weekends (>=3 days including Sat/Sun + holiday) for current year.

### 2. Get Next Upcoming Long Weekend

```
GET /next-long-weekend/:countryCode
```

* Example: `/next-long-weekend/IN`
* Returns the next long weekend from today.

---

## ✅ Validations

* Country code must be **2 alphabetic characters** (e.g., `IN`, `US`, `GB`).

## 🔒 Rate Limiting

* Max **30 requests per minute** per IP.
* Responds with 429 on overflow.

## 🧠 Caching

* Caches holiday data, long weekends, and next weekend **per country** for **24 hours**.

## 🧪 Example Response

```json
{
  "success": true,
  "data": [
    {
      "start_date": "2025-01-25",
      "end_date": "2025-01-27",
      "days": 3,
      "holiday": "Republic Day"
    }
  ]
}
```

---

## 📌 Author

**Abhijeet Awasthi**  
Built for backend architecture evaluation.

---

## 📃 License

MIT