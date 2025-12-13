import React from 'react';
import { Star, Mail, Phone, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CandidateTable = ({ 
  candidates = [], 
  selectedCandidate = null, 
  selectedCandidates = [],
  onCandidateSelect,
  onBulkSelection
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
              <th className="text-left p-4">Note</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((candidate) => (
              <tr
                key={candidate.id}
                className={`border-b border-border hover:bg-muted/20 cursor-pointer transition-colors ${
                  selectedCandidate?.id === candidate.id ? 'bg-primary/5' : ''
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
                  <p className="font-medium">{candidate.name}</p>
                  <p className="text-xs text-muted-foreground">{candidate.email}</p>
                </td>

                <td className="p-4">{candidate.position}</td>

                <td className="p-4">
                  {new Date(candidate.applicationDate).toLocaleDateString('fr-FR')}
                </td>

                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(candidate.stage)}`}>
                    {candidate.stage}
                  </span>
                </td>

                <td className="p-4">{candidate.source}</td>

                <td className="p-4 flex items-center gap-1">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  {candidate.rating}
                </td>

                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">

                    <button className="p-1.5 hover:bg-muted rounded-lg">
                      <Mail size={16} />
                    </button>

                    <button 
                      className="p-1.5 hover:bg-muted rounded-lg"
                      onClick={(e) => handlePhoneClick(e, candidate)}
                      title="Téléphone"
                    >
                      <Phone size={16} />
                    </button>

                    <button 
                      className="p-1.5 hover:bg-muted rounded-lg"
                      onClick={() => onCandidateSelect(candidate)}
                      title="Voir profil"
                    >
                      <ChevronRight size={16} />
                    </button>

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
