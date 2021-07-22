import React from "react";
import {
  Avatar,
  Col,
  Row,
  Select,
  Tooltip,
  Menu,
  Button,
  Dropdown,
} from "antd";
import { useTranslation } from "react-i18next";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../redux/auth/action";
function TopBar () {
  const { i18n, t } = useTranslation();
  const { Option } = Select;
  let history = useHistory();
  const dispatch = useDispatch();
  let { url } = useRouteMatch();
  const logoutHandle = () => {
    dispatch( authLogout( history ) );
  };

  const { loading } = useSelector( ( state ) => state.authReducer );
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={ `${ url }/setting` }>
          <Button type="text" size="small" icon={ <SettingOutlined /> }>
            { " " }
            Setting{ " " }
          </Button>
        </Link>
      </Menu.Item>

      <Menu.Item key="2">
        { " " }
        <Button
          type="text"
          danger
          size="small"
          icon={ <LogoutOutlined /> }
          onClick={ logoutHandle }
          loading={ loading }
        >
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  const handleChange = ( lang ) => {
    i18n.changeLanguage( lang );
  };

  return (
    <Row gutter={ [ 8, 8 ] } justify="end" align="middle">
      <Col>
        { " " }
        <Tooltip color="orange" placement="left" title={ t( `msg` ) }>
          <Select
            defaultValue={
              localStorage.getItem( "i18nextLng" )
                ? localStorage.getItem( "i18nextLng" )
                : "uz"
            }
            style={ { width: 70, marginRight: "10px" } }
            onChange={ handleChange }
          >
            <Option value="uz">uz</Option>
            <Option value="ru">ru</Option>
            <Option value="en">en</Option>
          </Select>
        </Tooltip>
      </Col>

      <Col>
        <Tooltip placement="left" color="orange" title={ "Admin" }>
          <Dropdown overlay={ menu } placement="bottomRight" arrow>
            <Avatar
              size="large"
              style={ { cursor: "pointer", marginLeft: "10px" } }
              src={ `https://1.bp.blogspot.com/-szrHwWDJkfk/VGj_bKFhiKI/AAAAAAAAD6c/EleQJHuWRjo/s1600/templatezy4.jpg` }
            />
          </Dropdown>
        </Tooltip>
      </Col>
    </Row>
  );
}

export default TopBar;
