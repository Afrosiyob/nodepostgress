import React from "react";
import { Affix, Menu, Row, Tooltip } from "antd";

import { PieChartOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";
function SideBar() {
  const { url } = useRouteMatch();
  // const { SubMenu } = Menu;
  return (
    <Affix offsetTop={0}>
      <div className="logo">
        <Row align="middle" justify="center" gutter={8}>
          <Tooltip placement="right" color={"orange"} title={"Admin Logo"}>
            <img
              src={
                "http://res.cloudinary.com/hy4kyit2a/image/upload/2015-06-admin-landing_page-graphic.png"
              }
              alt="site logo"
              style={{ width: "90%", height: "auto", margin: "10px" }}
            />
          </Tooltip>
        </Row>
      </div>
      <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to={`${url}/home`}> Home </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<PieChartOutlined />}>
          <Link to={`${url}/products`}> Products </Link>
        </Menu.Item>

        {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />}>
          Files
        </Menu.Item> */}
      </Menu>
    </Affix>
  );
}

export default SideBar;
