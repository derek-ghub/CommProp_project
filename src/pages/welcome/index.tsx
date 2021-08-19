import React from 'react';
import { Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getAuthority } from '@/utils/authority';
import './index.less';

export default (): React.ReactNode => {
  let role = '';
  if (getAuthority()==='user') role="Resident";
  if (getAuthority()==='admin') role="Administrator";
  if (getAuthority()==='maintainer') role="Maintainer";

  return (
    <PageHeaderWrapper>
      <Card id="container">
        <p id="welcome">Welcome</p>
        <p id="role">{role}</p>
        <p style={{color: 'white', marginTop: '48px'}}>Hello, welcome to Community X. We are so happy for you to join our community. </p>
        <p style={{color: 'white', marginTop: '16px'}}>At community X, we believe the key to happiness is diversity, good communication, and cooperation among the admin and maintenance teams.  </p>
        <p style={{color: 'white', marginTop: '16px'}}>We encourage you to share your knowledge, ask questions, participate in discussions and become an integral part of this little community.</p>
        <p style={{color: 'white', marginTop: '16px'}}>Together we can become better community leaders and provide our members with a much better experience. We hope you have a wonderful time here at Community X!</p>
      </Card>
    </PageHeaderWrapper>
  );
};
