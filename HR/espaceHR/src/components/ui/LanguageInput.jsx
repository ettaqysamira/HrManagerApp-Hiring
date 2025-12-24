import React, { useState } from 'react';
import { X } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import Select from './Select';

const LanguageInput = ({ languages = [], onChange, className = "" }) => {
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('');

    const proficiencyLevels = [
        { value: 'Débutant', label: 'Débutant' },
        { value: 'Intermédiaire', label: 'Intermédiaire' },
        { value: 'Courant', label: 'Courant' },
        { value: 'Professionnel', label: 'Professionnel' },
        { value: 'Natif', label: 'Natif' }
    ];

    const handleAddLanguage = () => {
        const trimmedLanguage = language.trim();
        if (trimmedLanguage && level) {
            const newLanguage = { language: trimmedLanguage, level };
            const exists = languages.some(
                lang => lang.language.toLowerCase() === trimmedLanguage.toLowerCase()
            );

            if (!exists) {
                onChange([...languages, newLanguage]);
                setLanguage('');
                setLevel('');
            }
        }
    };

    const handleRemoveLanguage = (index) => {
        onChange(languages.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddLanguage();
        }
    };

    return (
        <div className={className}>
            <div className="flex gap-2 mb-2">
                <Input
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Langue (ex: Français)"
                    className="flex-1"
                />
                <Select
                    options={proficiencyLevels}
                    value={level}
                    onChange={setLevel}
                    placeholder="Niveau"
                    className="w-[180px]"
                />
                <Button
                    type="button"
                    onClick={handleAddLanguage}
                    variant="outline"
                    size="sm"
                >
                    Ajouter
                </Button>
            </div>
            {languages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {languages.map((lang, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                            {lang.language} - {lang.level}
                            <button
                                type="button"
                                onClick={() => handleRemoveLanguage(index)}
                                className="hover:bg-green-200 rounded-full p-0.5"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageInput;
