import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfilePhotoUpload = ({ currentPhoto, currentPhotoAlt, onPhotoChange }) => {
  const [previewUrl, setPreviewUrl] = useState(currentPhoto || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400');
  const [isUploading, setIsUploading] = useState(false);

  React.useEffect(() => {
    if (currentPhoto) {
      setPreviewUrl(currentPhoto);
    }
  }, [currentPhoto]);

  const handleFileSelect = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      if (file?.size > 5 * 1024 * 1024) {
        alert('La taille du fichier ne doit pas dépasser 5 Mo');
        return;
      }

      if (!file?.type?.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image valide');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader?.result);
        setIsUploading(true);

        setTimeout(() => {
          setIsUploading(false);
          if (onPhotoChange) {
            onPhotoChange(reader?.result);
          }
        }, 1500);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl('https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400');
    if (onPhotoChange) {
      onPhotoChange(null);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-sm font-semibold text-foreground mb-4">Photo de Profil</h3>

      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-border">
          <Image
            src={previewUrl}
            alt={currentPhotoAlt}
            className="w-full h-full object-cover"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Icon name="Loader2" size={32} color="white" className="animate-spin" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="photo-upload">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="Upload"
              iconPosition="left"
              disabled={isUploading}
              asChild
            >
              <span className="cursor-pointer">Télécharger une photo</span>
            </Button>
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />

          {previewUrl !== 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400' && (
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              iconName="Trash2"
              iconPosition="left"
              onClick={handleRemovePhoto}
              disabled={isUploading}
            >
              Supprimer
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          JPG, PNG ou GIF. Max 5 Mo.
        </p>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;