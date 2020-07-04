import React from 'react';
import './Switch.css';

const Switch = (props) => {
  return (
    <>
      <input
        checked={props.isOn}
        onChange={props.handleToggle}
        className='react-switch-checkbox'
        id={props.id}
        type='checkbox'
      />
      <label
        style={{ background: props.onColor }}
        className='react-switch-label'
        htmlFor={props.id}
      >
        <span className='react-switch-button' />
      </label>
    </>
  );
};

export default Switch;
