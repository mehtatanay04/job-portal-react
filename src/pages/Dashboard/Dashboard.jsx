import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardSidebar from '../../components/Dashboard/Sidebar';
import DashboardHeader from '../../components/Dashboard/Header';
import DashboardOverview from '../../components/Dashboard/Overview';
import SavedJobs from '../../components/Dashboard/SavedJobs';
import Applications from '../../components/Dashboard/Applications';
import PostJob from '../../components/Dashboard/PostJob';
import ManageJobs from '../../components/Dashboard/ManageJobs';
import Jobs from '../../components/Dashboard/Jobs';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'jobs':
        return <Jobs />;
      case 'saved':
        return <SavedJobs />;
      case 'applications':
        return <Applications />;
      case 'post':
        return <PostJob />;
      case 'manage':
        return <ManageJobs />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className={styles.dashboard}>
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
      
      <div className={styles.mainContent}>
        <DashboardHeader user={user} role={role} />
        <div className={styles.content}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}