import React, { useState } from 'react';
import {
  User, Mail, Phone, Calendar, Award, FileText,
  MessageSquare, Star, Download, Send
} from 'lucide-react';
import Button from '../../../components/ui/Button';
import { useLocation, useParams } from 'react-router-dom';
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
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'resume' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                onClick={() => setActiveTab('resume')}
              >
                <FileText size={16} className="inline mr-2" />
                CV
              </button>
              <button
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'interviews' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                onClick={() => setActiveTab('interviews')}
              >
                <MessageSquare size={16} className="inline mr-2" />
                Entretiens
              </button>
              <button
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'assessment' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
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
              <div className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Compétences Détectées</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate?.aiSkills?.length > 0 ? (
                        candidate.aiSkills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                            {skill}
                          </span>
                        ))
                      ) : (
                        candidate?.skills?.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {skill}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Langues</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate?.languages?.length > 0 ? (
                        candidate.languages.map((lang, index) => (
                          <span key={index} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
                            {lang}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground italic">Non détecté</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Formation</h4>
                    <div className="space-y-2">
                      {candidate?.education?.length > 0 ? (
                        candidate.education.map((edu, index) => (
                          <div key={index} className="p-3 bg-muted/20 rounded border border-border text-sm">
                            <p className="font-medium text-foreground">{edu.Degree}</p>
                            <p className="text-muted-foreground">{edu.Field} {edu.Year ? `- ${edu.Year}` : ''}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground italic">Aucune formation détectée</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Certifications</h4>
                    <div className="space-y-2">
                      {candidate?.certifications?.length > 0 ? (
                        candidate.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-foreground">
                            <Award size={14} className="text-amber-500" />
                            <span>{cert}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground italic">Aucune certification détectée</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">CV Original</h4>
                  <div className="p-4 bg-muted/30 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Fichier CV</p>
                      <p className="text-xs text-muted-foreground">
                        {candidate?.resumePath ? "Document disponible" : "Aucun fichier joint"}
                      </p>
                    </div>
                    {candidate?.resumePath && (
                      <a
                        href={`http://localhost:5076/uploads/resumes/${candidate.resumePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                      >
                        <Download size={16} className="mr-2" />
                        Voir le CV
                      </a>
                    )}
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
                {['technical', 'cultural', 'communication'].map((key) => (
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
