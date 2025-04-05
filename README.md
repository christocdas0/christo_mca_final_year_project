
# MCA Final Year Project Setup Guide

## Project Structure
**ZIP File Name**: `christo_mca_final_year_project-main.zip`  
After extracting the zip file, you will find two main folders:
- `front-end`
- `back-end`

---

## Front-End (UI) Setup

### Prerequisites
- Node.js installed  
- npm (comes with Node.js)  
- VS Code (recommended for editing and running the project)

### Steps to Run UI
1. **Extract the ZIP file**  
   Locate and extract `christo_mca_final_year_project-main.zip`.

2. **Open VS Code**
   - Option 1: Open VS Code first and then open the project folder.
   - Option 2: Navigate to the project folder and right-click > "Open with VS Code".

3. **Navigate to the `front-end` Folder**
   - Open the `front-end` folder in VS Code.

4. **Install Dependencies**
   - Open the terminal in VS Code (make sure it’s in the `front-end` directory).
   - Run the following command:
     ```bash
     npm install --force
     ```
   - This command installs all the required packages listed in `package.json`. The process may take a few minutes depending on your internet speed.

   > 📘 For installation guidance, refer to _"Set-up and Run Using Download as .zip"_ (Pages 84–88) in the project documentation.

5. **Start the Front-End Server**
   - Once the installation is complete, run:
     ```bash
     npm run dev
     ```
   - The application will be available at `http://localhost:3001`.

6. **Access the Application**
   - Open your browser and visit `http://localhost:3001` to view the front-end of the application.

---

## Back-End (Server) Setup

### Prerequisites
- Node.js installed  
- npm  
- VS Code  
- MongoDB Compass (For local database management)  

> 📘 Refer to _"Setting Up MongoDB Compass"_ (Pages 62–66) for installation and configuration steps.

### Steps to Run Back-End
1. **Extract the ZIP file**
   - Locate and extract `christo_mca_final_year_project-main.zip` (if not already done).

2. **Open VS Code**
   - Use the same method as in the UI setup to open the project folder.

3. **Navigate to the `back-end` Folder**
   - Open the `back-end` folder in VS Code.

4. **Install Dependencies**
   - Open the terminal in VS Code (make sure it’s in the `back-end` directory).
   - Run the following command:
     ```bash
     npm install --force
     ```
   - This installs all required packages from the `package.json` file.

   > 📘 For installation guidance, refer to _"Set-up and Run Using Download as .zip"_ (Pages 84–88) in the project documentation.

5. **Start the Back-End Server**
   - After installation, run:
     ```bash
     npm run dev
     ```
   - The back-end server will start on `http://localhost:8001`.

6. **Verify Server is Running**
   - You should see console logs indicating that the server is running and connected to MongoDB.

---

## Summary
| Part       | Port            | URL                       |
|------------|------------------|----------------------------|
| Front-End  | 3001             | `http://localhost:3001`    |
| Back-End   | 8001             | `http://localhost:8001`    |

Ensure both the front-end and back-end are running concurrently for the application to function properly.
