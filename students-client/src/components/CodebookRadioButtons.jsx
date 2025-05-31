import React from 'react';
import './CodebookRadioButtons.css';

export default function CodebookRadioButtons({ 
  name, 
  value, 
  onChange, 
  codebookItems, 
  required = false 
}) {
  return (
    <div className="CodebookRadioButtons">
      {codebookItems.map((item, index) => (
        <React.Fragment key={item.code}>
          <label className="form-check-label">
            <input
              type="radio"
              name={name}
              className="form-check-input"
              value={item.code}
              checked={value === item.code}
              onChange={onChange}
              required={required}
            />{' '}
            {item.names.en}
          </label>
          {index < codebookItems.length - 1 && ' '}
        </React.Fragment>
      ))}
    </div>
  );
} 