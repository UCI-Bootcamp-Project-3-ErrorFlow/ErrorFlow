import { UserOutlined, CommentOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { Layout, Card, Button, Badge } from 'antd';

import './Join.css';

const { Header, Footer, Sider, Content } = Layout;


const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Layout>
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <Card>
        <h2 className='heading'>Join a Chat Room <Badge status="processing"/></h2>
        <h3 className='subHeading'>Collaborate with like minds and expand your code expertise.</h3>
          <Input
            placeholder='Name'
            className='chatInput'
            type='text'
            onChange={(event) => setName(event.target.value)}
            prefix={<UserOutlined />}
          />
          <Input
            placeholder='Room'
            className='chatInput mt-20'
            type='text'
            onChange={(event) => setRoom(event.target.value)}
            prefix={<CommentOutlined />}
          />
          <br></br>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <Button className='chatOpenBtn button mt-20' type='submit'>
            Sign in
          </Button>
        </Link>
        </Card>
      </div>
    </div>
    </Layout>
  );
};
export default Join;
