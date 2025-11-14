import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.tsx";

interface AdminProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();

  // Add a loading state to prevent flash of redirect
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Short timeout to ensure auth state is properly initialized
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[70vh]">Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin-login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};