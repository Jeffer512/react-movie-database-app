# Movie Discovery App

A responsive web application built with **React** and **Vite** that allows users to explore movies, TV shows, and people in the film industry using the **TMDb API**. 

**Deployment:** https://jeffer512.github.io/react-movie-database-app/

## Features
*   **Search & Discover:** Search for specific titles or browse by genre.
*   **Trending Content:** Real-time lists of popular movies, shows, and people.
*   **Detailed Views:** Info pages including synopses and related media.
*   **Responsive Design:** Fully functional across desktop, tablet, and mobile devices.

## Project Origin
This application was originally developed as a group project during a web development bootcamp. I was responsible for the core architecture, state management, routing system, data-fetching logic, and pagination.

I have since forked the repository to refactor the codebase, improve state management, and resolve initial logic bugs.

### Key Refactorings:
*   **Centralized API Layer:** Moved all data fetching into a single service module using `Axios` and `async/await`.
*   **Custom Hooks:** Refactored the original pagination logic into a reusable `useTMDbPagination` hook to eliminate code duplication and handle pagination and API calls more efficiently.
*   **State & Routing Fixes:** Standardized URL parameters and fixed React lifecycle errors to ensure stable navigation.
*   **Security:** Migrated hardcoded API keys to environment variables (`.env`).

## Tech Stack
*   **Frontend:** React.js, React Router v6, React Context API.
*   **Tooling:** Vite, Axios.
*   **Styling:** CSS3.

## Setup & Installation

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/Jeffer512/react-movie-database-app.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure API Key:**
    Create a `.env` file in the root directory and add your key:
    ```env
    VITE_TMDB_API_KEY=your_api_key_here
    ```
4.  **Run the app:**
    ```bash
    npm run dev
    ```

## Credits
*   Data provided by [The Movie Database (TMDb)](https://www.themoviedb.org/).
*   Original project created as part of a coding bootcamp group assignment.
