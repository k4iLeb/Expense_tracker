# Expense Tracker Application

## Description

This web application is a single-page expense tracker designed to help users manage their personal finances by recording and visualizing their expenses. It provides a user-friendly interface to add, view, filter, and delete expenses.

## Technologies Used

- **HTML:**
- **CSS:**
- **JavaScript:**
- **localStorage:** Used for data persistence

- **npm Packages:**

- **modern-normalize** Cross-browser styles consistency
- **flatpickr:** A JavaScript date picker library for user-friendly date selection.
- **Webpack:** Module bundler
- **uuid:** Library for generating unique IDs.

## Features

- **Add Expenses:** Users can add new expenses with details such as name, amount, category, and date.
- **View Expenses:** Expenses are displayed in a list, showing key information.
- **View Expenses Details:** Users can click on expense list item to view more information.
- **Filter Expenses:** Users can filter expenses by date range (from/to).
- **Expense Summary:** The application displays total expenses for the current day and month.
- **Delete Expenses:** Users can delete individual expenses.
- **Data Persistence:** Expenses are saved using `localStorage`

## Installation and Setup (Local Development)

1.  **Clone the repository:**
2.  **Install Node.js and npm:**
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Build the application:** (there is a bug so mode: "development" is used on bundling)
    ```bash
    npm run build
    ```
5.  **Run the application:**
    ```bash
    npm run dev
    ```
    This will start a development server, and you can view the application in your browser at `http://localhost:8080` (or a similar address printed in your terminal).

## Code Structure

- `Template.html`: The main HTML file, defining the structure of the web page.
- `style.css`: The main CSS file, containing global styles and importing other stylesheets.
- `UI.js`: Handles user interface logic, including rendering expenses, managing modals, and handling user interactions.
- `main.js`: The entry point of the application, responsible for initializing the app, loading data, and setting up event listeners.
- `data.js`: Manages the application's data, including loading, saving, adding, deleting, and retrieving expenses.
- `webpack.config.js`: Webpack configuration file.

## Live Demo

[demo](https://k4ileb.github.io/Expense_tracker/)
