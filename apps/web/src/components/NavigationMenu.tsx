import { Navigation } from "@shopify/polaris";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const NavigationMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const workspaceItems = [
    { label: "Dashboard", url: "/app/dashboard" },
    { label: "Data", url: "/app/data" },
    { label: "Upload", url: "/app/upload" },
    { label: "Reports", url: "/app/reports" }
  ];

  const adminItems = user?.role === "ADMIN" ? [{ label: "Users", url: "/app/admin/users" }] : [];

  return (
    <Navigation location={location.pathname}>
      <Navigation.Section
        items={workspaceItems}
        onClick={(item, event) => {
          event.preventDefault();
          navigate(item.url || "/app/dashboard");
        }}
      />
      {adminItems.length ? (
        <Navigation.Section
          title="Admin"
          items={adminItems}
          onClick={(item, event) => {
            event.preventDefault();
            navigate(item.url || "/app/dashboard");
          }}
        />
      ) : null}
    </Navigation>
  );
};
