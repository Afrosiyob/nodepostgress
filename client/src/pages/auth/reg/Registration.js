import React from 'react'
import HelmetTitle from '../../../components/helmetTitle/HelmetTitle'

import Fade from 'react-reveal'
import { Col, Row, Form, Input, Button, Checkbox, Card } from 'antd';

const Registration = () => {

    const [ form ] = Form.useForm();

    const onFinish = ( values ) => {
        console.log( 'Success:', values );
    };

    const onFinishFailed = ( errorInfo ) => {
        console.log( 'Failed:', errorInfo );
    };

    return (
        <Fade>
            <HelmetTitle title="Registration" />
            <Row style={ { width: "100%", height: "100vh" } } justify="center" align="middle">
                <Col sm={ 24 } md={ 12 } lg={ 5 }>

                    <Card title="Card title" >
                        <Form
                            form={ form }
                            name="login"
                            layout={ 'vertical' }
                            initialValues={ {
                                remember: true,
                            } }
                            onFinish={ onFinish }
                            onFinishFailed={ onFinishFailed }
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={ [
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ] }
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={ [
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ] }
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={ {
                                    offset: 8,
                                    span: 16,
                                } }
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button style={ { width: "100%" } } type="primary" htmlType="submit">
                                    Registration
                                </Button>
                            </Form.Item>
                        </Form>

                    </Card>

                </Col>
            </Row>
        </Fade>
    )
}

export default Registration
