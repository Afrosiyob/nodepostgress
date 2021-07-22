import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export const useBreadCrumb = (location) => {
  const breadcrumbNameMap = {
    "/admin": "admin",
    "/admin/home": "home",
    "/admin/setting": "setting",
    "/admin/products": "products",
  };

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  return [breadcrumbItems];
};
