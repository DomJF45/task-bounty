import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

interface UserProtectProps {
  children: React.ReactNode;
}

export const UserProtect: React.FC<UserProtectProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  if (user) return <>{children}</>;
};
