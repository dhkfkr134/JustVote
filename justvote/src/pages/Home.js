/* Home 라우트는
url 에 아무런 path 도 주어지지 않았을 때
기본적으로 보여주는 라우트 컴포넌트
*/

import React from 'react';
import Subscribers from '../components/Subscribers'
import Display from '../components/Display';
import Views from '../components/Views';

const Home = () => {
  return (
    <div>
      <Subscribers />
      <Display></Display>
      <Views></Views>
    </div>
  );
};

export default Home;