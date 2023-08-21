import React from 'react';

import './ErrorMessage.scss';

type MessageProps = {
  handle: (isShow: boolean) => void;
  message: string;
};

export function ErrorMessage({ handle, message }: MessageProps): JSX.Element {
  const topOffset: string = `${window.scrollY + 60}px`;
  return (
    <div className="error-message" style={{ top: topOffset }}>
      {message}
      <button type="button" className="close-btn" onClick={() => handle(false)}>
        <span className="line" />
        <span className="line" />
      </button>
    </div>
  );
}
