import { TopBar } from "@shopify/polaris";
import React from "react";
import { AuthUser } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  user: AuthUser | null;
  onLogout: () => Promise<void>;
};

export const AppTopBar: React.FC<Props> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{ content: "Profile", onAction: () => navigate("/app/dashboard") }]
        },
        {
          items: [
            {
              content: "Logout",
              onAction: async () => {
                await onLogout();
                navigate("/login?status=loggedout");
              }
            }
          ]
        }
      ]}
      name={user?.email || "Guest"}
      detail={user ? user.role : "Not signed in"}
      initials={user?.email?.[0]?.toUpperCase() || "U"}
      open={isUserMenuOpen}
      onToggle={() => setIsUserMenuOpen((open) => !open)}
    />
  );

  const contextControl = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        paddingLeft: 12
      }}
      onClick={() => navigate("/")}>
      <img
        src="/logo.png"
        alt="Aggregator Optima logo"
        style={{ height: 32, width: "auto", objectFit: "contain", display: "block" }}
      />
      <strong
        style={{
          color: "#ffffff",
          fontSize: 15,
          textShadow: "0 1px 2px rgba(0,0,0,0.35)"
        }}>
        Aggregator Optima
      </strong>
    </div>
  );

  return <TopBar userMenu={userMenuMarkup} contextControl={contextControl} />;
};
