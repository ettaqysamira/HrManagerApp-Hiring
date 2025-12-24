export const getImageUrl = (photoPath) => {
    if (!photoPath) return null;

    if (photoPath.startsWith('http') || photoPath.startsWith('data:')) {
        return photoPath;
    }

    
    const cleanPath = photoPath.startsWith('/') ? photoPath.slice(1) : photoPath;
    return `http://localhost:5076/${cleanPath}`;
};

export const DEFAULT_AVATAR = "https://img.rocket.new/generatedImages/rocket_gen_img_1a9e8814c-1763296696290.png";
