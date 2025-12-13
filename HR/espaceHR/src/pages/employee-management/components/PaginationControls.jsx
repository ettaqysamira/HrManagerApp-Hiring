import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PaginationControls = ({ currentPage, totalPages, pageSize, totalItems, onPageChange, onPageSizeChange }) => {
  const pageSizeOptions = [
    { value: '10', label: '10 par page' },
    { value: '20', label: '20 par page' },
    { value: '50', label: '50 par page' },
    { value: '100', label: '100 par page' }
  ];

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages?.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages?.push(i);
        }
        pages?.push('...');
        pages?.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages?.push(1);
        pages?.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages?.push(i);
        }
      } else {
        pages?.push(1);
        pages?.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages?.push(i);
        }
        pages?.push('...');
        pages?.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card border-t border-border">
      <div className="flex items-center gap-4">
        <Select
          options={pageSizeOptions}
          value={pageSize?.toString()}
          onChange={(value) => onPageSizeChange(parseInt(value))}
          className="w-40"
        />
        <span className="text-sm text-muted-foreground">
          Affichage de {startItem} à {endItem} sur {totalItems} employés
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          iconName="ChevronLeft"
        >
          Précédent
        </Button>

        <div className="flex items-center gap-1">
          {getPageNumbers()?.map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-muted-foreground">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent/10 text-foreground'
                }`}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          iconName="ChevronRight"
          iconPosition="right"
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;