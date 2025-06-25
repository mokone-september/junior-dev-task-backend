# Junior Developer Task – June 2025

This project is a serverless API endpoint built to fulfill a technical challenge. The API receives a string via a webhook, transforms the string into an array of characters, sorts them alphabetically, and returns the result as a JSON response.

## 🧠 Objective

Create a POST API endpoint that:

- Accepts a JSON payload with a data field (string).

- Converts the string into a character array.

- Sorts the array alphabetically.

- Returns the sorted characters as a word array in JSON format.

## 📂 Project Structure

src/
├── index.ts                # Main application entry point
├── logger.ts               # Logger utility
├── middleware/             # Custom middleware (error handler, validation, etc.)
│   ├── errorHandler.ts
│   └── validate.ts

## 🛠️ Technologies Used

- Node.js

- Express.js

- Vercel Serverless Functions (for deployment)

- TypeScript

## 📦 Installation

```sh
https://github.com/mokone-september/string-processor-api
```

## 🚀 Running Locally

```bash
npm start
```

The server will run by default on:
<http://localhost:3000>

## API Endpoints

| Method | Endpoint           | Description                                 |
| ------ | ------------------ | ------------------------------------------- |
| POST   | /process-string    | Accepts JSON `{ data: "string" }`, returns sorted array of characters as `word` |

### Example Request

```json
POST /process-string
Content-Type: application/json

{
  "data": "example"
}
```

### Example Response

```json
{
  "word": ["a", "e", "e", "l", "m", "p", "x"]
}
```

## Running tests

```bash
npm run test
```

This will run backend unit and integration tests using Jest and Supertest.

## Contact

For any inquiries or support, please contact us at <mokoneseptember@gmail.com>.

## 📄 License

MIT — free to use, modify, and distribute.
