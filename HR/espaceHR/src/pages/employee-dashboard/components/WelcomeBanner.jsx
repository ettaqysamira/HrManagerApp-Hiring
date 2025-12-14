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
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary to-accent p-6 mb-6">
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {getGreeting()}, {userName} 
            </h1>
            <p className="text-sm text-white/90">
              Bienvenue sur votre espace employé
            </p>
            {lastLogin && (
              <p className="text-xs text-white/70 mt-1">
                Dernière connexion: {formatLastLogin(lastLogin)}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon name="User" size={24} color="white" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
    </div>
  );
};

export default WelcomeBanner;