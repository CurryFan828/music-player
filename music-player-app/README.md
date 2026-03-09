# Music Player App

A full-stack web application for streaming and managing music, featuring user authentication, playlist management, and integration with the Jamendo music API.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

### Frontend Features
- **Music Streaming**: Play local songs and stream from Jamendo API
- **User Authentication**: Login/register system with role-based access (User/Admin)
- **Playlist Management**: Create and manage personal playlists
- **Music Player Controls**: Play, pause, skip, volume control, progress bar
- **Search Functionality**: Search songs by genre, artist, or title
- **Responsive Design**: Works on desktop and mobile devices
- **User Profile**: View user information and manage account
- **Protected Routes**: Certain pages require authentication

### Backend Features
- **RESTful API**: Express.js server with CORS support
- **Authentication Ready**: JWT and bcrypt dependencies configured (implementation pending)
- **Modular Architecture**: Organized file structure for scalability

## Tech Stack

### Frontend
- **React 19**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **Lucide React**: Modern icon library
- **React Icons**: Additional icon components
- **JWT Decode**: Token handling for authentication
- **CSS**: Custom styling with responsive design

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for API development
- **CORS**: Cross-origin resource sharing
- **bcrypt**: Password hashing (configured but not implemented)
- **jsonwebtoken**: JWT token handling (configured but not implemented)

### Development Tools
- **Jest**: Testing framework
- **Babel**: JavaScript transpiler
- **ESLint**: Code linting
- **Testing Library**: React component testing utilities

### External APIs
- **Jamendo API**: Free music streaming service for additional song content

## Project Structure

```
music-player-app/
├── backend/                    # Backend Express server
│   ├── package.json           # Backend dependencies
│   └── server.js              # Main server file
├── public/                    # Static assets
│   └── songs/                 # Local MP3 files
├── src/                       # Frontend React application
│   ├── components/            # Reusable UI components
│   │   ├── MusicPlayer.jsx    # Main music player component
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── ProtectedRoutes.jsx # Route protection wrapper
│   │   └── ...
│   ├── contexts/              # React Context providers
│   │   ├── AuthContexts.jsx   # Authentication state management
│   │   └── MusicContext.jsx   # Music player state management
│   ├── pages/                 # Page components
│   │   ├── AllSongs.jsx       # Song library page
│   │   ├── Playlists.jsx      # Playlist management page
│   │   ├── Profile.jsx        # User profile/login page
│   │   └── PageNotFound.jsx   # 404 error page
│   ├── services/              # API service functions
│   │   └── jamendo.js         # Jamendo API integration
│   ├── index.css              # Global styles
│   ├── main.jsx               # React app entry point
│   └── App.jsx                # Main app component with routing
├── package.json               # Frontend dependencies
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint configuration
└── README.md                  # This file
```

## Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Jamendo API Key** (free registration at [Jamendo Developer Portal](https://developer.jamendo.com/))

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd music-player-app
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   cd ..
   ```

## Environment Setup

1. **Create environment file** for the frontend:
   ```bash
   # Create .env file in the root directory
   touch .env
   ```

2. **Add your Jamendo API key** to `.env`:
   ```
   VITE_MUSIC_PLAYER_API_KEY=your_jamendo_api_key_here
   ```

   Get your free API key from [Jamendo Developer Portal](https://developer.jamendo.com/).

## Running the Application

### Development Mode

1. **Start the backend server**:
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server** (in a new terminal):
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Production Build

1. **Build the frontend**:
   ```bash
   npm run build
   ```

2. **Preview the production build**:
   ```bash
   npm run preview
   ```

## API Endpoints

### Backend API (Express.js)
Currently, the backend provides basic endpoints:

- `GET /` - Health check endpoint
  - Response: `"Hello World from the backend!"`

**Note**: The backend is currently minimal. Authentication and music-related endpoints are planned for future implementation.

### External APIs

#### Jamendo API Integration
- **Endpoint**: `https://api.jamendo.com/v3.0/tracks/`
- **Purpose**: Fetch music tracks for streaming
- **Parameters**:
  - `client_id`: Your Jamendo API key
  - `format`: json
  - `limit`: Number of tracks to fetch
  - `namesearch`: Search query (genre, artist, title)
  - `audioformat`: mp31 (MP3 format)

## Authentication

### Current Implementation
- **Frontend-only authentication** using localStorage
- **User registration and login** handled client-side
- **Role-based access**: User and Admin roles
- **Protected routes** for authenticated content

### Future Backend Implementation
The backend includes dependencies for proper authentication:
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT token generation and verification

### Known Issues
- Authentication currently bypasses password validation due to a bug in the login logic
- No backend API endpoints for user management yet

## Testing

### Running Tests
```bash
npm test
```

### Test Coverage
- **Jest**: JavaScript testing framework
- **Testing Library**: React component testing utilities
- **Supertest**: API endpoint testing (configured for backend)

### Current Test Status
Tests are configured but may need updates as the application evolves.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Use meaningful commit messages
- Update documentation as needed

## License

This project is licensed under the ISC License - see the package.json files for details.

## Acknowledgments

- **Jamendo**: For providing free music streaming API
- **React Community**: For excellent documentation and tools
- **Open Source Contributors**: For the libraries and tools used

## Future Enhancements

- Complete backend authentication implementation
- User playlist persistence
- Social features (sharing playlists)
- Advanced search and filtering
- Offline music playback
- Mobile app version</content>
<parameter name="filePath">c:\Isaacs_Stuff\Music Player\music-player\music-player-app\README.md