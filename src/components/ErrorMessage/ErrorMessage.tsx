import React, { useState, useEffect } from 'react';

import './ErrorMessage.scss';

type MessageProps = {
  handle: (isShow: boolean) => void;
  message: string;
};

export function ErrorMessage({ handle, message }: MessageProps): JSX.Element {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const topOffset: string = `translateY(${offset}px)`;
  return (
    <div className="error-message" style={{ transform: topOffset }}>
      {message}
      <button type="button" className="close-btn" onClick={() => handle(false)}>
        <span className="line" />
        <span className="line" />
      </button>
    </div>
  );
}
