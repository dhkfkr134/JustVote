import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <Link exact to="/" className="item">홈</Link>
      <Link to="/about/pro-self-studier" className="item">소개</Link>
    </div>
  );
};

export default Header;