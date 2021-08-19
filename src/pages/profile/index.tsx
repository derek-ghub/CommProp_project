import { Button, Card, Row, Col } from 'antd';
import React from 'react';
import type { ConnectProps } from 'umi';
import { history, connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import {Detail} from '@/pages/profile/detail';

export type GlobalHeaderRightProps = {
  currentUser?: CurrentUser;
} & Partial<ConnectProps>;

class ProfilePage extends React.Component<GlobalHeaderRightProps> {
  render(): React.ReactNode {
    const { currentUser } = this.props;
    console.log(currentUser);
    return (
      <>
        <Card title={`Name:  ${currentUser?.name}`}>
          <Row>
            <Col xs={12} sm={12} xl={12}>
              <p>{`User Role: ${currentUser?.role || 'not assigned'}`}</p>
              <p>{`Email: ${currentUser?.email}`}</p>
              <p>{`User ID: ${currentUser?.userid}`}</p>
            </Col>
            <Col xs={12} sm={12} xl={12}>
              <Detail role={currentUser?.role} />
            </Col>
            <Col xs={24} sm={24} xl={24}>
              <Button style={{ float: 'left' }} type="primary" onClick={() => history.push('/')}>
                Back Home
              </Button>
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(ProfilePage);
