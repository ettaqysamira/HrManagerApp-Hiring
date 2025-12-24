import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeBanner = ({ userName, lastLogin }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const formatLastLogin = (date) => {
    return new Date(date)?.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary via-primary to-accent p-8 mb-6 shadow-lg">
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-36 -mt-36" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full blur-2xl -ml-28 -mb-28" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
              {getGreeting()}, {userName}
            </h1>
            <p className="text-base text-white/95 font-medium mb-2">
              Bienvenue sur votre espace employé
            </p>
            {lastLogin && (
              <p className="text-sm text-white/75 mt-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Dernière connexion: {formatLastLogin(lastLogin)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/30 shadow-xl">
              <Icon name="User" size={28} color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;