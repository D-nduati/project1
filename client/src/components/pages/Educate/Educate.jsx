import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Educate.css'; // Import CSS file for styling
import Navbarmain from '../../NavbarMain/Navbarmain'
const EducationModule = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 10, // Adjust as needed
          q: 'childcare|prenatal care|signs of labor|postnatal care', // Your search query
          type: 'video',
          key: 'AIzaSyD9KTWtU9xb-T5dVCi3-6n83OHKv5O6yI8', // Replace with your API key
          pageToken: nextPageToken
        }
      });
      setVideos([...videos, ...response.data.items]);
      setNextPageToken(response.data.nextPageToken);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleLoadMore = () => {
    fetchVideos();
  };

  return (
    <div className="education-container">
      <Navbarmain />
      <h2 className="education-heading">Educational Videos on Childcare and Pregnancy</h2>
      <div className="video-list">
        {videos.map((video) => (
          <div className="video-card" key={video.id.videoId}>
            <iframe
              className="video-frame"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
            
              allowFullScreen
              title={video.snippet.title}
            ></iframe>
            <div className="video-details">
              <h3 className="video-title">{video.snippet.title}</h3>
              <p className="video-description">{video.snippet.description}</p>
            </div>
          </div>
        ))}
      </div>
      {nextPageToken && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More Videos
        </button>
      )}
    </div>
  );
};

export default EducationModule;
