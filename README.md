# Mister Tasker - Task Management Application

A modern task management application built with React and Vite, featuring real-time updates and a responsive design.

## Features

- Real-time task updates using Socket.IO
- Modern and responsive UI
- State management with Redux
- Client-side routing with React Router
- SASS styling for better CSS organization

## Tech Stack

- React 18
- Vite
- Redux
- React Router
- Socket.IO Client
- SASS
- Axios

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd task-frontend-react
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_API_URL=your_api_url
```

4. Start the development server:

For remote development:
```bash
npm run dev:remote
# or for Mac
npm run dev:remote:mac
```

For local development:
```bash
npm run dev:local
# or for Mac
npm run dev:local:mac
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
task-frontend-react/
├── src/           # Source files
├── public/        # Static assets
├── dist/          # Production build
├── node_modules/  # Dependencies
└── ...
```

## Backend Integration

This frontend application is designed to work with a backend service. The backend service will be added later. Once the backend is integrated, you'll need to:

1. Set up the backend service
2. Configure the API endpoints in the frontend
3. Update the environment variables accordingly

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
