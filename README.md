Job Portal React

A full-stack job portal built with React, Firebase, and Tailwind CSS, deployed on Vercel.

Features





Advanced Job Search: Filter jobs by keyword, location, experience, salary, job type, and industry.



Role-Based Dashboards: Job seekers can apply/bookmark jobs; recruiters can post jobs and manage applicants.



Firebase Integration: Authentication (email verification, password reset), Firestore for real-time data, and Storage for resume uploads.



Responsive UI: Dark mode support with Tailwind CSS.



AI Placeholder: Trending jobs section as a mock AI recommendation system.

Tech Stack





Frontend: React, React Router, Tailwind CSS



Backend: Firebase (Authentication, Firestore, Storage)



Deployment: Vercel



Version Control: Git, GitHub

Setup Instructions

Prerequisites





Node.js (v16 or higher)



Git



Firebase account

Installation





Clone the repository:

git clone https://github.com/mehtatanay04/job-portal-react.git
cd job-portal-react



Install dependencies:

npm install



Create a .env file with Firebase configuration:

REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id



Run the app locally:

npm start





Open http://localhost:3000.

Firebase Setup





Create a Firebase project at console.firebase.google.com.



Enable Authentication (Email/Password), Firestore, and Storage.



Add Firebase config to .env.



Apply Firestore rules from firestore.rules.



Contributing





Fork the repository.



Create a feature branch (git checkout -b feature/your-feature).



Commit changes (git commit -m "Add your feature").



Push to the branch (git push origin feature/your-feature).



Open a Pull Request.

License

MIT License

Contact





GitHub: mehtatanay04



Email: mehtatanay40@gmail.com
