import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  CardFooter, 
  Input, 
  Button,
  Divider
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../hooks/use-auth.tsx";

export const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { login, isAuthenticated } = useAuth();
  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();
  
  const from = location.state?.from?.pathname || "/admin";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      // Add a small delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const success = await login(password);
      if (success) {
        history.replace(from);
      } else {
        setError("Invalid password. Hint: demo123");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check if already authenticated and redirect if needed
  React.useEffect(() => {
    if (isAuthenticated) {
      history.replace("/admin");
    }
  }, [isAuthenticated, history]);
  
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md">
        <CardBody className="p-6">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Icon icon="lucide:lock" className="text-primary" width={32} />
            </div>
          </div>
          
          <h1 className="text-2xl font-semibold text-center mb-6">Admin Login</h1>
          
          {error && (
            <div className="bg-danger-100 text-danger-700 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                type="password"
                label="Password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired
                startContent={<Icon icon="lucide:key" className="text-gray-400" width={16} />}
              />
              
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-center p-4">
          <p className="text-sm text-gray-500">
            This area is restricted to authorized personnel only.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};