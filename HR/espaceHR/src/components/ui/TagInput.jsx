import React, { useState } from 'react';
import { X } from 'lucide-react';
import Input from './Input';
import Button from './Button';

const TagInput = ({ tags = [], onChange, placeholder = "Ajouter...", className = "" }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddTag = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !tags.includes(trimmedValue)) {
            onChange([...tags, trimmedValue]);
            setInputValue('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        onChange(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <div className={className}>
            <div className="flex gap-2 mb-2">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1"
                />
                <Button
                    type="button"
                    onClick={handleAddTag}
                    variant="outline"
                    size="sm"
                >
                    Ajouter
                </Button>
            </div>
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="hover:bg-blue-200 rounded-full p-0.5"
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

export default TagInput;
