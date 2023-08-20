/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */
import React from 'react';

import './SuccessMessage.scss';

type MessageProps = {
  handle: (isShow: boolean) => void;
};

export function SuccessMessage({ handle }: MessageProps): JSX.Element {
  // const [showMessage, setShowMessage] = useState(true);
  // const [messageStyle, setMessageStyle] = useState('');
  // const [message, setMessage] = useState('');
  // const [color, setColor] = useState('');

  // const messageColor = { backgroundColor: color };

  // useEffect(() => {
  //   if (showMessage) {
  //     setMessageStyle('success-message');
  //   } else {
  //     setMessageStyle('success-message hide');
  //   }
  // }, [showMessage]);

  // useEffect(() => {
  //   if (isSuccessful) {
  //     setMessage('Customer successfully logged in');
  //     setColor('#00ba7c');
  //   } else {
  //     setMessage('Invalid email or password');
  //     setColor('#ff6666');
  //   }
  // });

  return (
    <div className="success-message" style={{ backgroundColor: '#ff6666' }}>
      Invalid email or password
      <div className="close-btn" onClick={() => handle(false)}>
        <span className="line" />
        <span className="line" />
      </div>
    </div>
  );
}
