// This file was renamed from use-auth.ts to use-auth.tsx
    // Content remains the same
    
    import React from "react";

    interface AuthContextType {
      isAuthenticated: boolean;
      login: (password: string) => Promise<boolean>;
      logout: () => void;
    }

    const AuthContext = React.createContext<AuthContextType>({
      isAuthenticated: false,
      login: async () => false,
      logout: () => {},
    });

    export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() => {
        try {
          // Check if user is already authenticated from localStorage
          return localStorage.getItem("admin_authenticated") === "true";
        } catch (error) {
          // In case of localStorage access errors (private browsing, etc.)
          console.error("Error accessing localStorage:", error);
          return false;
        }
      });

      const login = async (password: string): Promise<boolean> => {
        try {
          // In a real app, this would be an API call
          // For now, we'll use a hardcoded password
          if (password === "demo123") {
            setIsAuthenticated(true);
            localStorage.setItem("admin_authenticated", "true");
            return true;
          }
          return false;
        } catch (error) {
          console.error("Login error:", error);
          return false;
        }
      };

      const logout = () => {
        try {
          setIsAuthenticated(false);
          localStorage.removeItem("admin_authenticated");
        } catch (error) {
          console.error("Logout error:", error);
        }
      };

      // Create a memoized value to prevent unnecessary re-renders
      const value = React.useMemo(
        () => ({ isAuthenticated, login, logout }),
        [isAuthenticated]
      );

      return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      );
    };

    export const useAuth = () => {
      const context = React.useContext(AuthContext);
      if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
      }
      return context;
    };