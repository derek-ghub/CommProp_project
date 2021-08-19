import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import CMPForm from '@/components/commonComponents/commForm';
import './index.less';

type ResidentProps = {};

const Amenities: React.FC<ResidentProps> = () => {
  //const [authState] = useState('admin');

  return (
    <>
      <PageHeaderWrapper>
        <CMPForm fetchUrl={'commprop/fetchAmenitiesChanges'} />
      </PageHeaderWrapper>
    </>
  );
};

export default Amenities;
