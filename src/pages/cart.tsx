import React from "react";
import { Link } from "react-router-dom";
import { 
  Breadcrumbs, 
  BreadcrumbItem, 
  Button, 
  Input, 
  Card, 
  CardBody,
  CardFooter
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { products } from "../data/products";
import { useCart } from "../contexts/cart-context";

interface CartItem {
  id: string;
  quantity: number;
}

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem } = useCart();
  
  const cartProducts = items.map(item => {
    const product = products.find(p => p.id === item.id);
    return {
      ...product,
      quantity: item.quantity
    };
  }).filter(item => item !== undefined);
  
  const subtotal = cartProducts.reduce((total, item) => {
    return total + (item?.price || 0) * (item?.quantity || 0);
  }, 0);
  
  const shipping = subtotal > 35 ? 0 : 5.99;
  const tax = subtotal * 0.0675; // 6.75% tax rate
  const total = subtotal + shipping + tax;
  
  if (cartProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Cart</BreadcrumbItem>
        </Breadcrumbs>
        
        <div className="max-w-2xl mx-auto text-center py-16">
          <Icon icon="lucide:shopping-bag" className="mx-auto mb-4 text-gray-400" width={64} />
          <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button 
            as={Link}
            to="/shop"
            color="primary"
            size="lg"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Cart</BreadcrumbItem>
      </Breadcrumbs>
      
      <h1 className="text-3xl font-semibold mb-8 text-center">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartProducts.map(item => (
              <Card key={item?.id} className="overflow-hidden">
                <CardBody className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-32 h-32">
                      <img 
                        src={item?.imageUrl} 
                        alt={item?.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow p-4">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div>
                          <h3 className="font-medium mb-1">
                            <Link to={`/product/${item?.id}`} className="hover:text-primary">
                              {item?.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">SKU: {item?.id}-MOM</p>
                        </div>
                        <div className="text-right mt-2 sm:mt-0">
                          <p className="font-semibold text-primary">
                            ${((item?.price || 0) * (item?.quantity || 0)).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${item?.price?.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between mt-4">
                        <div className="flex items-center">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="bordered"
                            onPress={() => updateQuantity(item?.id || "", (item?.quantity || 0) - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Icon icon="lucide:minus" width={16} />
                          </Button>
                          <Input
                            type="number"
                            value={item?.quantity?.toString()}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                updateQuantity(item?.id || "", value);
                              }
                            }}
                            className="w-16 mx-2"
                            size="sm"
                          />
                          <Button
                            isIconOnly
                            size="sm"
                            variant="bordered"
                            onPress={() => updateQuantity(item?.id || "", (item?.quantity || 0) + 1)}
                            aria-label="Increase quantity"
                          >
                            <Icon icon="lucide:plus" width={16} />
                          </Button>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => removeItem(item?.id || "")}
                          startContent={<Icon icon="lucide:trash-2" width={16} />}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <Button
              as={Link}
              to="/shop"
              variant="light"
              startContent={<Icon icon="lucide:arrow-left" width={16} />}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
        
        <div>
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (6.75%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <Input
                  label="Promo Code"
                  placeholder="Enter promo code"
                  endContent={
                    <Button size="sm" variant="flat">
                      Apply
                    </Button>
                  }
                />
              </div>
            </CardBody>
            <CardFooter>
              <Button 
                color="primary" 
                className="w-full"
                size="lg"
                onPress={() => {
                  // Checkout logic
                  alert("Proceeding to checkout...");
                }}
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-4">
            <CardBody>
              <h3 className="font-medium mb-3">We Accept</h3>
              <div className="flex flex-wrap gap-2">
              <img src="/assets/PaymentIcons/visa.svg" alt="Visa" className="h-8" />
                <img src="/assets/PaymentIcons/mastercard.svg" alt="Mastercard" className="h-8" />
                <img src="/assets/PaymentIcons/americanexpress.svg" alt="American Express" className="h-8" />
                <img src="/assets/PaymentIcons/discover.svg" alt="Discover" className="h-8" />
                <img src="/assets/PaymentIcons/applepay.svg" alt="Apple Pay" className="h-8" />
                <img src="/assets/PaymentIcons/googlepay.svg" alt="Google Pay" className="h-8" />
                <img src="/assets/PaymentIcons/cashapp.svg" alt="Cash App" className="h-8" />
                <img src="/assets/PaymentIcons/jcb.svg" alt="JCB" className="h-8" />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};