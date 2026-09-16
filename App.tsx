import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { UserDashboard } from './components/UserDashboard';
import { ProfileDetails } from './components/ProfileDetails';
import { EducationManager } from './components/EducationManager';
import { DocumentVault } from './components/DocumentVault';
import { JobExplorer } from './components/JobExplorer';
import { ApplicationTracker } from './components/ApplicationTracker';
import { AdminDashboard } from './components/AdminDashboard';
import { PrivacyPolicyView, TermsOfServiceView } from './components/LegalPages';
import { AuthModal } from './components/AuthModal';
import { ApplicationFlow } from './components/ApplicationFlow';
import { JobNotification } from './types';

const MainContent: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setAuthModalOpen, 
    userRole,
    selectedJobForApp,
    setSelectedJobForApp
  } = useApp();

  const handleStartApplication = (job: JobNotification) => {
    setSelectedJobForApp(job);
  };

  const handleApplicationSuccess = (appId: string) => {
    setSelectedJobForApp(null);
    setActiveTab('applications');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* If an active application flow wizard is open, render it full screen */}
        {selectedJobForApp ? (
          <ApplicationFlow
            job={selectedJobForApp}
            onCancel={() => setSelectedJobForApp(null)}
            onSuccess={handleApplicationSuccess}
          />
        ) : (
          <>
            {userRole === 'admin' ? (
              <AdminDashboard />
            ) : (
              <>
                {activeTab === 'landing' && (
                  <LandingPage 
                    onNavigate={(tab) => setActiveTab(tab)} 
                    onOpenAuth={() => setAuthModalOpen(true)} 
                  />
                )}
                {activeTab === 'dashboard' && <UserDashboard onNavigate={(tab) => setActiveTab(tab)} />}
                {activeTab === 'profile' && <ProfileDetails />}
                {activeTab === 'education' && <EducationManager />}
                {activeTab === 'vault' && <DocumentVault />}
                {activeTab === 'jobs' && <JobExplorer onStartApplication={handleStartApplication} />}
                {activeTab === 'applications' && <ApplicationTracker />}
                {activeTab === 'admin' && <AdminDashboard />}
                {activeTab === 'privacy' && <PrivacyPolicyView />}
                {activeTab === 'terms' && <TermsOfServiceView />}
              </>
            )}
          </>
        )}

      </main>

      <AuthModal />
      <Footer onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
