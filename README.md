
# 🎯 Automated Quiz Engine with PDF Certificate Generation

## 📌 Project Overview
The **Automated Quiz Engine** is a full-stack web application that allows users to take quizzes and instantly generate a **PDF certificate** based on their performance.

This system also includes an **Admin Dashboard** to monitor participants and manage quiz data.

---

## 🚀 Features

### 👨‍🎓 User Features
- Enter details (Name, VTU Number, Slot Number)
- Attempt multiple-choice quiz
- Navigate between questions
- View score after submission
- Download **PDF Certificate**
- Auto-save results to database

### 👨‍💼 Admin Features
- View all participants
- See scores & leaderboard
- Add new records manually
- Edit existing records
- Delete records
- Clear all data

---

## 🧠 Workflow

### 🔹 User Flow
1. User opens quiz page (`index.html`)
2. Enters details (Name, VTU No, Slot)
3. Starts quiz
4. Answers questions
5. Submits quiz
6. Score is calculated
7. Data saved to Firebase Firestore
8. Certificate generated (PDF)
9. User downloads certificate

---

### 🔹 Admin Flow
1. Admin opens (`admin.html`)
2. Fetch data from Firestore
3. Display leaderboard
4. Perform actions:
   - Add record
   - Update record
   - Delete record
   - Clear all records

---

## 🛠️ Technologies Used

### 🌐 Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)

### 🔥 Backend / Database
- Firebase Firestore (NoSQL Database)

### 📄 Libraries
- **jsPDF** → PDF Certificate generation
- **QRCode.js** → Generate QR code in certificate

---

## 📂 Project Structure
