import React from 'react';
import { Star, Mail, Phone, ChevronRight, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CandidateTable = ({
  candidates = [],
  selectedCandidate = null,
  selectedCandidates = [],
  onCandidateSelect,
  onBulkSelection,
  onDecision
}) => {

  const navigate = useNavigate();

  const handlePhoneClick = (e, candidate) => {
    e.stopPropagation();
    navigate(`/candidate-management/candidate/${candidate.id}`, { state: { candidate } });
  };

  const getStageColor = (stage) => {
    const colors = {
      'Nouveau': 'bg-blue-100 text-blue-700',
      'Screening Initial': 'bg-purple-100 text-purple-700',
      'Entretien Technique': 'bg-cyan-100 text-cyan-700',
      'Entretien Final': 'bg-amber-100 text-amber-700',
      'Offre Envoyée': 'bg-teal-100 text-teal-700',
      'Accepté': 'bg-green-100 text-green-700',
      'Rejeté': 'bg-red-100 text-red-700'
    };
    return colors[stage] || 'bg-gray-100 text-gray-700';
  };

  const handleCheckboxChange = (e, candidateId) => {
    e.stopPropagation();

    const newSelection = selectedCandidates.includes(candidateId)
      ? selectedCandidates.filter(id => id !== candidateId)
      : [...selectedCandidates, candidateId];

    onBulkSelection(newSelection);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onBulkSelection(candidates.map(c => c.id));
    } else {
      onBulkSelection([]);
    }
  };

  return (
    <div className="card-elevated w-full">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Liste des Candidats</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {candidates.length} candidats au total
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[0.83rem]">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedCandidates.length === candidates.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="text-left p-4">Candidat</th>
              <th className="text-left p-4">Poste</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Étape</th>
              <th className="text-left p-4">Source</th>
              <th className="text-left p-4">Actions de Recrutement</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((candidate) => (
              <tr
                key={candidate.id}
                className={`border-b border-border hover:bg-muted/20 cursor-pointer transition-colors ${selectedCandidate?.id === candidate.id ? 'bg-primary/5' : ''
                  }`}
                onClick={() => onCandidateSelect(candidate)}
              >
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={(e) => handleCheckboxChange(e, candidate.id)}
                    className="rounded border-gray-300"
                  />
                </td>

                <td className="p-4">
                  <p className="font-medium text-foreground">{candidate.name}</p>
                  <p className="text-xs text-muted-foreground">{candidate.email}</p>
                  {candidate.aiSkills && candidate.aiSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {candidate.aiSkills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[0.65rem] font-medium border border-blue-100">
                          {skill}
                        </span>
                      ))}
                      {candidate.aiSkills.length > 3 && (
                        <span className="text-[0.65rem] text-muted-foreground">+{candidate.aiSkills.length - 3}</span>
                      )}
                    </div>
                  )}
                </td>

                <td className="p-4 text-foreground">{candidate.position}</td>

                <td className="p-4 text-foreground">
                  {new Date(candidate.applicationDate).toLocaleDateString('fr-FR')}
                </td>

                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(candidate.stage)}`}>
                    {candidate.stage}
                  </span>
                </td>

                <td className="p-4 text-foreground">{candidate.source}</td>

                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    {candidate.stage !== 'Accepté' && candidate.stage !== 'Rejeté' ? (
                      <>
                        <button
                          className="px-2 py-1 bg-green-50 text-green-600 hover:bg-green-100 rounded text-xs font-medium border border-green-200 transition-colors"
                          onClick={() => onDecision(candidate, 'accept')}
                        >
                          Accepter
                        </button>
                        <button
                          className="px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded text-xs font-medium border border-red-200 transition-colors"
                          onClick={() => onDecision(candidate, 'reject')}
                        >
                          Refuser
                        </button>
                      </>
                    ) : (
                      <span className="text-xs italic text-muted-foreground">Action traitée</span>
                    )}
                  </div>
                </td>

                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">


                    <button
                      className="p-1.5 hover:bg-muted rounded-lg"
                      onClick={(e) => handlePhoneClick(e, candidate)}
                      title="Téléphone"
                    >
                      <Phone size={16} />
                    </button>

                    {candidate.resumePath && (
                      <a
                        href={`http://localhost:5076/uploads/resumes/${candidate.resumePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-muted rounded-lg text-primary"
                        onClick={(e) => e.stopPropagation()}
                        title="Télécharger CV"
                        download
                      >
                        <FileText size={16} />
                      </a>
                    )}



                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default CandidateTable;
