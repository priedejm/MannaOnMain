import React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider, ToastProvider } from "@heroui/react"
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './hooks/use-auth.tsx'
import App from './App.tsx'
import './index.css'
import { CartProvider } from "./contexts/cart-context";
import { CartNotification } from "./components/cart-notification";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <Router>
        <CartProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
          <CartNotification />
        </CartProvider>
      </Router>
    </HeroUIProvider>
  </React.StrictMode>,
)
