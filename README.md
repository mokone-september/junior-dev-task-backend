# Junior Developer Task – June 2025

This project is a Node.js Express API built to fulfill a technical challenge. The API receives a string via a POST request, sorts its characters alphabetically, and returns the result as a JSON response.

## 🧠 Objective

Create a POST API endpoint that:

- Accepts a JSON payload with a `data` field (string).
- Converts the string into a character array.
- Sorts the array alphabetically.
- Returns the sorted characters as a string in JSON format.

## 📂 Project Structure

```
junior-dev-task-backend/
├── api/
│   ├── sort-characters.js      # Main Express API logic
│   └── _utils/
│       └── response.js         # Response helpers
├── tests/
│   └── sort.test.js            # API tests (Jest + Supertest)
├── package.json
└── README.md
```

## 🛠️ Technologies Used

- Node.js
- Express.js
- Jest & Supertest (for testing)

## 📦 Installation

```bash
git clone https://github.com/mokone-september/string-processor-api
cd junior-dev-task-backend
npm install
```

## 🚀 Running Locally

```bash
npm start
```

The server will run by default on:
<http://localhost:3000>

## API Endpoints

| Method | Endpoint                | Description                                                        |
| ------ | ----------------------- | ------------------------------------------------------------------ |
| POST   | /api/sort-characters    | Accepts JSON `{ "data": "string" }`, returns sorted string         |
| GET    | /api/health             | Health check endpoint                                              |

## 🚢 Deployment

Base URL: [https://junior-dev-task-backend.onrender.com](https://junior-dev-task-backend.onrender.com)

### Example Request

```http
POST /api/sort-characters
Host: junior-dev-task-backend.onrender.com
Content-Type: application/json

{
  "data": "example"
}
```

### Example Response

```json
{
  "original": "example",
  "sorted": "aeelmpx",
  "length": 7,
  "processingTime": "123456789ns"
}
```

## 🧪 Running tests

```bash
npm test
```

This will run backend unit and integration tests using Jest and Supertest.

## Contact

For any inquiries or support, please contact <mokoneseptember@gmail.com>.

## 📄 License

MIT — free to use, modify, and distribute.
