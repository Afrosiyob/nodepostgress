import React from "react";
import HelmetTitle from "../../../components/helmetTitle/HelmetTitle";

import Fade from "react-reveal";
import { Col, Row, Form, Input, Button, Card } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authRegistration } from "../../../redux/auth/action";

const Registration = () => {
  const [form] = Form.useForm();

  const { loading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(authRegistration(values, history));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fade>
      <HelmetTitle title="Registration" />
      <Row
        style={{ width: "100%", height: "100vh" }}
        justify="center"
        align="middle"
      >
        <Col xs={24} sm={16} md={12} lg={6}>
          <Card title="Card title">
            <Form
              form={form}
              name="registration"
              layout={"vertical"}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Link to="/login">Login </Link>
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                >
                  Registration{" "}
                </Button>{" "}
              </Form.Item>{" "}
            </Form>{" "}
          </Card>{" "}
        </Col>{" "}
      </Row>{" "}
    </Fade>
  );
};

export default Registration;
