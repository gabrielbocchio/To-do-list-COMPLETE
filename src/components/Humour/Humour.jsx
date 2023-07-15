import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLaugh,
  faGrin,
  faMeh,
  faFrown,
  faAngry,
} from '@fortawesome/free-solid-svg-icons';

import './Humour.css';
const Humour = ({ currentDate }) => {
  const [selectedEmoticon, setSelectedEmoticon] = useState(null);

  useEffect(() => {
    const storedEmoticon = localStorage.getItem(`selectedEmoticon_${currentDate}`);
    if (storedEmoticon) {
      setSelectedEmoticon(storedEmoticon);
    } else {
      setSelectedEmoticon(null);
    }
  }, [currentDate]);

  const handleEmoticonClick = (emoticon) => {
    setSelectedEmoticon(emoticon);
    localStorage.setItem(`selectedEmoticon_${currentDate}`, emoticon);
  };

  return (
    <div className="humour-container">
      <div className="emoticons">
        <div
          className={`emoticon super-happy ${selectedEmoticon === 'super-happy' ? 'active' : ''}`}
          onClick={() => handleEmoticonClick('super-happy')}
        >
          <FontAwesomeIcon icon={faGrin} className="emoticon-icon" />
          <div className="emoticon-description">Super Happy</div>
          {selectedEmoticon === 'super-happy' && (
            <div className="check-icon">✓</div>
          )}
        </div>
        <div
          className={`emoticon happy ${selectedEmoticon === 'happy' ? 'active' : ''}`}
          onClick={() => handleEmoticonClick('happy')}
        >
          <FontAwesomeIcon icon={faLaugh} className="emoticon-icon" />
          <div className="emoticon-description">Happy</div>
          {selectedEmoticon === 'happy' && (
            <div className="check-icon">✓</div>
          )}
        </div>
        <div
          className={`emoticon normal ${selectedEmoticon === 'normal' ? 'active' : ''}`}
          onClick={() => handleEmoticonClick('normal')}
        >
          <FontAwesomeIcon icon={faMeh} className="emoticon-icon" />
          <div className="emoticon-description">Normal</div>
          {selectedEmoticon === 'normal' && (
            <div className="check-icon">✓</div>
          )}
        </div>
        <div
          className={`emoticon sad ${selectedEmoticon === 'sad' ? 'active' : ''}`}
          onClick={() => handleEmoticonClick('sad')}
        >
          <FontAwesomeIcon icon={faFrown} className="emoticon-icon" />
          <div className="emoticon-description">Sad</div>
          {selectedEmoticon === 'sad' && (
            <div className="check-icon">✓</div>
          )}
        </div>
        <div
          className={`emoticon crying ${selectedEmoticon === 'crying' ? 'active' : ''}`}
          onClick={() => handleEmoticonClick('crying')}
        >
          <FontAwesomeIcon icon={faAngry} className="emoticon-icon" />
          <div className="emoticon-description">Angry</div>
          {selectedEmoticon === 'crying' && (
            <div className="check-icon">✓</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Humour;

