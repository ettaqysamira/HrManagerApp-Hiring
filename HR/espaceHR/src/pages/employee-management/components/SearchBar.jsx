import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, onFilterToggle, isFilterVisible }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    { type: 'employee', name: 'Samira ETTAQY', department: 'Technologie', id: 'EMP001' },
    { type: 'employee', name: 'Marc Dubois', department: 'Marketing', id: 'EMP045' },
    { type: 'department', name: 'Ressources Humaines', count: 12 },
    { type: 'position', name: 'Développeur Senior', count: 8 }
  ];

  const filteredSuggestions = suggestions?.filter(item =>
    item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        onSearch(searchTerm);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    setShowSuggestions(value?.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion?.name);
    setShowSuggestions(false);
    onSearch(suggestion?.name);
  };

  return (
    <div className="relative flex items-center gap-2 p-4 bg-card border-b border-border">
      <button
        onClick={onFilterToggle}
        className={`p-2 rounded-lg transition-colors ${
          isFilterVisible ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/10'
        }`}
        aria-label="Basculer les filtres"
      >
        <Icon name="SlidersHorizontal" size={20} />
      </button>
      <div className="relative flex-1">
        <div className="relative">
          <Icon
            name="Search"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Rechercher par nom, ID, département, poste..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => searchTerm && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="pl-10 pr-4"
          />
        </div>

        {showSuggestions && filteredSuggestions?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elevation-2 z-20 max-h-80 overflow-y-auto">
            {filteredSuggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/10 transition-colors first:rounded-t-lg last:rounded-b-lg text-left"
              >
                {suggestion?.type === 'employee' ? (
                  <>
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon name="User" size={16} color="var(--color-primary)" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{suggestion?.name}</p>
                      <p className="text-xs text-muted-foreground">{suggestion?.department} • {suggestion?.id}</p>
                    </div>
                  </>
                ) : suggestion?.type === 'department' ? (
                  <>
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Icon name="Building2" size={16} color="var(--color-accent)" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{suggestion?.name}</p>
                      <p className="text-xs text-muted-foreground">{suggestion?.count} employés</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Icon name="Briefcase" size={16} color="var(--color-secondary)" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{suggestion?.name}</p>
                      <p className="text-xs text-muted-foreground">{suggestion?.count} postes</p>
                    </div>
                  </>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
          aria-label="Paramètres de recherche avancée"
        >
          <Icon name="Settings2" size={20} color="var(--color-muted-foreground)" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;