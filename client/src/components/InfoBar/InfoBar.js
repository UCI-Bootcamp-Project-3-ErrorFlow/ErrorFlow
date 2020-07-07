import React from 'react';
import { Badge } from 'antd';
// import closeIcon from '../../icons/closeIcon.png';
// import onlineIcon from '../../icons/onlineIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className='infoBar'>
    <div className='leftInnerContainer'>
      <h3>{room}<Badge status="processing" /></h3>
    </div>
    <div className='rightInnerContainer'>
      <a href='/Main'>
      </a>
    </div>
  </div>
);

export default InfoBar;
