import React from 'react';
import './Switch.css';

const Switch = props  => {
  return (
    <>
      <input
        id={props.id}
        checked={props.isOn}
        onChange={props.handleToggle}
        className="react-switch-checkbox"
        id={'react-switch-new'}
        type="checkbox"
      />
      <label
        style={{ background: props.isOn && props.onColor }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >

    <span
        className='react-switch-button'
      />
    </label>
    </>
  );
};

export default Switch;