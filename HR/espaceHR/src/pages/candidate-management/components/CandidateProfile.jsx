import React, { useState } from 'react';
import { 
  User, Mail, Phone, Calendar, Award, FileText, 
  MessageSquare, Star, Download, Send 
} from 'lucide-react';
import Button from '../../../components/ui/Button';
import { useLocation, useParams  } from 'react-router-dom';
import { SidebarProvider } from '../../../components/navigation/Sidebar';
import Sidebar from '../../../components/navigation/Sidebar';
import Header from '../../../components/navigation/Header';
import Breadcrumb from '../../../components/navigation/Breadcrumb';

const CandidateProfile = () => {
  const [activeTab, setActiveTab] = useState('resume');
    const location = useLocation();

   const { id } = useParams(); 
  const candidate = location.state?.candidate;

  if (!candidate) {
    return (
      <div className="card-elevated p-6">
        <p className="text-center text-muted-foreground">
          Candidat introuvable
        </p>
      </div>
    );
  }

  return (
        <SidebarProvider>
          <Sidebar />
        <Header />
        <Breadcrumb />
    <div className='ml-0 lg:ml-64  p-4 lg:p-6 mt-16'>
      <div className="card-elevated ">
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={32} className="text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">{candidate?.name}</h3>
              <p className="text-sm text-muted-foreground">{candidate?.position}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={14} className="text-warning fill-warning" />
                <span className="text-sm font-medium text-foreground">{candidate?.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail size={16} className="text-muted-foreground" />
            <span className="text-foreground">{candidate?.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone size={16} className="text-muted-foreground" />
            <span className="text-foreground">{candidate?.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} className="text-muted-foreground" />
            <span className="text-foreground">
              Candidature: {new Date(candidate?.applicationDate)?.toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Award size={16} className="text-muted-foreground" />
            <span className="text-foreground">Expérience: {candidate?.experience}</span>
          </div>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="flex">
          <button
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'resume' ?'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('resume')}
          >
            <FileText size={16} className="inline mr-2" />
            CV
          </button>
          <button
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'interviews' ?'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('interviews')}
          >
            <MessageSquare size={16} className="inline mr-2" />
            Entretiens
          </button>
          <button
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'assessment' ?'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('assessment')}
          >
            <Award size={16} className="inline mr-2" />
            Évaluations
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'resume' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Compétences</h4>
              <div className="flex flex-wrap gap-2">
                {candidate?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">CV Complet</h4>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">
                  Document CV disponible pour téléchargement
                </p>
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-2" />
                  Télécharger le CV
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interviews' && (
          <div className="space-y-4">
            {candidate?.interviews?.length > 0 ? (
              candidate?.interviews?.map((interview, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{interview?.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(interview?.date)?.toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{interview?.interviewer}</span>
                  </div>
                  <p className="text-sm text-foreground mt-2">{interview?.notes}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageSquare size={48} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Aucun entretien planifié</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'assessment' && (
          <div className="space-y-4">
            {['technical','cultural','communication'].map((key) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {key === 'technical' ? 'Technique' : key === 'cultural' ? 'Culture d\'entreprise' : 'Communication'}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {candidate?.assessmentScores?.[key]}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${key === 'technical' ? 'bg-primary' : key === 'cultural' ? 'bg-success' : 'bg-accent'}`}
                    style={{ width: `${candidate?.assessmentScores?.[key]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-6 pt-6 border-t border-border">
          <Button variant="primary" className="flex-1">
            <Send size={16} className="mr-2" />
            Envoyer un message
          </Button>
          <Button variant="outline" className="flex-1">
            <Calendar size={16} className="mr-2" />
            Planifier
          </Button>
        </div>
      </div>
    </div>
    </div>
    
        </SidebarProvider>
    
  );
};

export default CandidateProfile;
 