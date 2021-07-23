import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Fade from "react-reveal";
import {
  useHistory,
  //   Redirect,
  //   Switch,
  //   useRouteMatch,
  //   Route,
  useLocation,
} from "react-router-dom";
import HelmetTitle from "../../components/helmetTitle/HelmetTitle";
import { authMe } from "../../redux/auth/action";

import { Layout, Breadcrumb, Affix } from "antd";

import SideBar from "../../layouts/sideBar/SideBar";
import TopBar from "../../layouts/topBar/TopBar";
import "./Admin.scss";
import { useWindowSize } from "../../hooks/useWindowSize";

import { useBreadCrumb } from "../../hooks/useBreadCrumb";

const Admin = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const dispatch = useDispatch();
  // const { loading, data } = useSelector( state => state.authReducer )
  const history = useHistory();
  const [width] = useWindowSize();
  let location = useLocation();
  //   let { path } = useRouteMatch();
  const [breadcrumbItems] = useBreadCrumb(location);
  const [state, setState] = useState({
    collapsed: false,
  });
  const onCollapse = (collapsed) => {
    setState({ collapsed });
  };
  const { collapsed } = state;
  useEffect(() => {
    dispatch(authMe(history));
  }, [dispatch, history]);
  return (
    <Fade>
      <HelmetTitle title="Admin" />
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={width < 768 ? true : collapsed}
          onCollapse={onCollapse}
        >
          <SideBar />
        </Sider>
        <Layout className="site-layout">
          <Affix offsetTop={0}>
            <Header
              className="site-layout-background"
              style={{ padding: "0 16px", borderBottom: "1px solid lightgrey" }}
            >
              <TopBar />
            </Header>{" "}
          </Affix>
          <Content style={{ margin: "0 16px" }}>
            <div style={{ padding: 24 }}>
              <Breadcrumb> {breadcrumbItems} </Breadcrumb>{" "}
              {/* <Switch>
                            <Redirect exact from={`${path}`} to={`${path}/home`} />
                            <Route
                              path={`${path}/home`}
                              render={(props) => <Home {...props} />}
                            />
                            <Route
                              path={`${path}/setting`}
                              render={(props) => <Setting {...props} />}
                            />
                            <Route
                              path={`${path}/products`}
                              render={(props) => <Products {...props} />}
                            />
                          </Switch> */}{" "}
            </div>{" "}
          </Content>{" "}
          <Footer style={{ textAlign: "center" }}>
            {" "}
            2021 Created by Afrosiyob🐝{" "}
          </Footer>{" "}
        </Layout>{" "}
      </Layout>{" "}
    </Fade>
  );
};

export default Admin;
