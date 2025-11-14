import React from "react";
import { Switch, Route } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { HomePage } from "./pages/home";
import { ShopPage } from "./pages/shop";
import { ProductPage } from "./pages/product";
import { AboutPage } from "./pages/about";
import { ContactPage } from "./pages/contact";
import { CartPage } from "./pages/cart";
import { BookshelfPage } from "./pages/bookshelf";
import { GiftCardsPage } from "./pages/gift-cards";
import { AdminPage } from "./pages/admin";
import { AdminLoginPage } from "./pages/admin-login";
import { AdminProtectedRoute } from "./components/admin-protected-route";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/about-us" component={AboutPage} />
          <Route path="/contact-us" component={ContactPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/the-bookshelf" component={BookshelfPage} />
          <Route path="/gift-cards" component={GiftCardsPage} />
          <Route path="/admin-login" component={AdminLoginPage} />
          <AdminProtectedRoute path="/admin" component={AdminPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}