import React from 'react';

import './SuccessMessage.scss';

type MessageProps = {
  message: string;
};

export function SuccessMessage({ message }: MessageProps): JSX.Element {
  const ELEMENT_WIDTH = 217;
  const position = `${(window.innerWidth - ELEMENT_WIDTH) / 2}px`;
  const slide = 'slide 5s ease-in-out';
  return (
    <div className="success-message" style={{ left: position, animation: slide }}>
      {message}
    </div>
  );
}
