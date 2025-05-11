Server for React Native Client App
This is a server for a React Native client application that provides an API for authorization, getting categories of laureates and their data. The server sends requests to remote resources, receives data and saves it locally in the db folder.

Features
Routes:

/api/laureates/categories: Get a list of laureate categories.

/api/laureates/:category: Get laureates by the selected category with pagination support.

Authentication:

Support for user authorization (login/register).

Authentication token is saved locally and used for subsequent requests.

Route structure
1. Get categories of laureates
Method: GET

URL: /api/laureates/categories

Description: This route sends a request to a remote resource to get a list of all categories of laureates. The results are saved to the local database (db folder).

Request example:

javascript
Copy
Edit
router.get("/laureates/categories", categories);
2. Getting laureates by category
Method: GET

URL: /api/laureates/:category

Parameters:

limit: Number of laureates to display.

offset: Offset for pagination.

Description: This route sends a request to a remote resource to get laureates for the specified category and saves their data locally in the db folder.

Request example:

javascript
Copy
Edit
router.get("/laureates/:category", category);
3. Authorization (Login)
Method: POST

URL: /api/auth/login

Description: Route for user authorization. Upon successful authorization, the server returns a token that must be used to make secure requests.

Request example:

javascript
Copy
Edit
router.post("/auth/login", login);
Local data storage
The server saves data received from remote resources to the db folder. Data from the laureate category is saved as JSON files, which makes it easy to extract when needed.

Data storage example:

javascript
Copy
Edit
const fs = require('fs');
const path = require('path');

const saveData = (category, data) => {
const filePath = path.join(__dirname, 'db', `${category}.json`);
fs.writeFileSync(filePath, JSON.stringify(data));
};
Installation
To start the server, follow these steps:

Clone the repository:

bash
Copy
Edit
git clone https://your-repository-link.git
cd your-project-directory
Install dependencies:

bash
Copy
Edit
npm install
Start the server:

bash
Copy
Edit
npm start
The server will now be available at http://localhost:4000.

Testing
You can use Postman or curl to test the API.

Sample test to get categories of laureates:

bash
Copy
Edit
GET http://localhost:4000/api/laureates/categories
Sample test to get laureates by category:

bash
Copy
Edit
GET http://localhost:4000/api/laureates/category?limit=10&offset=20