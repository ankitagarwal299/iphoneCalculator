import React from 'react';

import './Button.css';
function Buttons({ content, type ,onButtonClick}) {
  return (
    // Learning! entering multiple condition based classess
    <button
      className={`btn ${content == 0 ? 'zero' : ''} 
        ${type == 'operator' ? 'operator' : ''} 
        ${type == 'function' ? 'function' : ''}
        `}

        onClick={()=>onButtonClick(content)}
    >
      {content}
    </button>
  );
}

export default Buttons;
