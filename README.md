# Hospital Management System

## Live Demo

You can view the live demo of the project here: [Prodigy FWD Demo](https://prodigy-fwd-02-5.onrender.com)

<img width="940" alt="Screenshot 2025-04-01 212754" src="https://github.com/user-attachments/assets/c2a5c2c2-5a0a-4ca0-86fc-b0413335eab5" />

A comprehensive solution for managing hospital operations including patient records, staff management, appointments, and administrative functions.

## ✨ Features

### 👥 User Management
- Role-based access (Admin, Doctor, Nurse, Receptionist)
- JWT authentication
- Password encryption
- User profile management

### 🏥 Patient Management
- Patient registration & records
- Medical history tracking
- Appointment scheduling
- Billing and payments

### 👨‍⚕️ Staff Management
- Doctor/nurse profiles
- Specialization tracking
- Shift scheduling
- Performance analytics

### 📊 Admin Dashboard
- Real-time analytics
- Reporting tools
- System configuration
- Audit logs

## 🛠️ Technology Stack

### Frontend
| Technology       | Purpose                          |
|------------------|----------------------------------|
| React 18         | Frontend framework               |
| Vite             | Build tool                       |
| Tailwind CSS     | Styling                          |
| React Router v6  | Navigation                       |
| Recharts         | Data visualization               |
| Framer Motion    | Animations                       |
| React Hot Toast  | Notifications                   |

### Backend
| Technology       | Purpose                          |
|------------------|----------------------------------|
| Node.js          | Runtime environment              |
| Express          | Web framework                    |
| MySQL            | Database                         |
| JWT              | Authentication                   |
| BcryptJS         | Password hashing                 |

## 🚀 Installation

### Prerequisites
- Node.js (v18+)
- MySQL (v8+)
- Git

### Backend Setup
```bash
git clone https://github.com/yourusername/hospital-management-system.git
cd hospital-management-system/backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Start server
node index.js
