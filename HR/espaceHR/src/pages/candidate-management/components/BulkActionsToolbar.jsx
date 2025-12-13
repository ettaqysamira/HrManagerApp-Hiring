import React from 'react';
import { CheckCircle, Calendar, XCircle, Mail } from 'lucide-react';
import Button from '../../../components/ui/Button';

const BulkActionsToolbar = ({ 
  selectedCount, 
  onStatusUpdate, 
  onScheduleInterviews, 
  onReject 
}) => {
  return (
    <div className="card-elevated p-4 mb-6 bg-primary/5 border border-primary/20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <CheckCircle size={20} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            {selectedCount} candidat{selectedCount > 1 ? 's' : ''} sélectionné{selectedCount > 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onStatusUpdate('screening')}
          >
            <CheckCircle size={16} className="mr-2" />
            Marquer comme Screening
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onScheduleInterviews}
          >
            <Calendar size={16} className="mr-2" />
            Planifier Entretiens
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => console.log('Sending emails')}
          >
            <Mail size={16} className="mr-2" />
            Envoyer Email
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onReject}
            className="text-error hover:bg-error/10"
          >
            <XCircle size={16} className="mr-2" />
            Rejeter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsToolbar;