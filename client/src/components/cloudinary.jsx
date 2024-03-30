import React, { useState } from 'react';
import { Cloudinary } from 'cloudinary-core';


const cloudinary = new Cloudinary({
  cloud_name: 'dzgynylpu',
  api_key: '814598638284854',
  api_secret: 'xW0Q6iFyMAXGys2ovC5-NttAt6A'
});

const UploadImage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      console.log('Image uploaded successfully:', data);
      // Handle success, e.g., update state or show success message
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadImage;
