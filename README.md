# Sqwik URL Shortener
Sqwik is a simple URL shortening service that allows users to create shortened URLs for easy sharing. The service is built using Express.js for the backend, MongoDB for data storage, and React.js for the frontend. The project includes server-side validation for URLs, a redirect mechanism for short URLs, and a user-friendly React frontend.

## Features
- URL Shortening: Enter a long URL, and Sqwik will generate a unique short code for easy sharing.
- Validation: The server validates the input URL and ensures it is a valid and not originating from the Sqwik domain.
- Redirection: Accessing a shortened URL (/r/:shortCode) redirects users to the original long URL.-

## Live Version
Visit the live version of Sqwik at https://sqk.vercel.app

## Technologies Used
- Backend: Node.js, Express.js, MongoDB (Mongoose)
- Frontend: React.js
- Testing: Jest, Supertest
- Deployment: Vercel (Frontend), MongoDB Atlas (Database)
## Getting Started
- Clone the repository:

 ```

git clone https://github.com/abderrahimrhitrif/Sqwick-url-shortner.git

```

- Install dependencies:

```

cd Sqwick-url-shortner
npm install

```
- Set up your environment variables:

Create a .env file in the root of the project with the following:

```

MONGODB_URI=<your-mongodb-uri>

```
- Run the development server on the backend:

```

cd api
npm run dev

```

- Run the development server on the backend:

```

cd ../client
npm run dev

```


## Testing

- Run the tests using:

```

npm test

```
## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests. Your feedback and contributions are welcome!

## License

This project is licensed under the MIT License.

## Acknowledgments
The project uses the Vercel platform for hosting the frontend and MongoDB Atlas for database storage.
Thanks to the developers of the used libraries and tools.
<aside style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin-top: 20px;">

**Note:**
Replace `<your-mongodb-uri>` in the `.env` file with your actual MongoDB URI.

</aside>
