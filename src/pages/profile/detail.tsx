import React from 'react';
import { Row, Col, Card, Statistic, Progress } from 'antd';
import { ArrowUpOutlined } from "@ant-design/icons";

export interface DetailProps {
    role: any;
}

export const Detail:React.FC<DetailProps> = () => {
    
    return (
        <>
                <div className="site-statistic-demo-card">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card>
                                <Statistic
                                    title="Service Status this week"
                                    value={11.28}
                                    precision={2}
                                    style={{fontWeight: 'bold'}}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card>
                                <Progress percent={30} status="active" format={() => 'Pending'}/>
                                <Progress percent={60} status="success" />
                                <Progress percent={10} status="exception" />
                            </Card>
                        </Col>
                    </Row>
                </div>
        </>
    );
}