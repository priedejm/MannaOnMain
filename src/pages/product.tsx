import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Breadcrumbs, 
  BreadcrumbItem, 
  Button, 
  Tabs, 
  Tab, 
  Card, 
  CardBody,
  Spinner,
  Input
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { products } from "../data/products";
import { FeaturedProducts } from "../components/featured-products";
import { useCart } from "../contexts/cart-context";

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("description");
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Icon icon="lucide:alert-circle" className="mx-auto mb-4 text-primary" width={48} />
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button as={Link} to="/shop" color="primary">
          Continue Shopping
        </Button>
      </div>
    );
  }
  
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (product) {
        addItem(product.id, quantity);
      }
    }, 1000);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/shop">Shop</BreadcrumbItem>
        <BreadcrumbItem isCurrent>{product.title}</BreadcrumbItem>
      </Breadcrumbs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="w-full object-contain aspect-square"
          />
        </div>
        
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-2xl text-primary font-bold mb-4">${product.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon 
                    key={star} 
                    icon="lucide:star" 
                    className="text-yellow-400" 
                    width={16} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.9 (24 reviews)</span>
            </div>
            
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">
            {product.description || "No description available for this product."}
          </p>
          
          {product.inStock && (
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <div className="w-24">
                  <Input
                    type="number"
                    min="1"
                    value={quantity.toString()}
                    onChange={handleQuantityChange}
                    size="sm"
                  />
                </div>
                
                <Button
                  color="primary"
                  size="lg"
                  isLoading={isLoading}
                  onPress={handleAddToCart}
                  startContent={!isLoading && <Icon icon="lucide:shopping-bag" width={18} />}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <Icon icon="lucide:truck" className="mr-2 text-gray-600" width={18} />
                <span className="text-sm text-gray-700">Free shipping on orders over $35</span>
              </div>
              <div className="flex items-center">
                <Icon icon="lucide:refresh-cw" className="mr-2 text-gray-600" width={18} />
                <span className="text-sm text-gray-700">30-day return policy</span>
              </div>
              <div className="flex items-center">
                <Icon icon="lucide:shield" className="mr-2 text-gray-600" width={18} />
                <span className="text-sm text-gray-700">Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <Tabs 
          aria-label="Product information"
          selectedKey={activeTab}
          onSelectionChange={setActiveTab as any}
          variant="underlined"
          color="primary"
          className="w-full"
        >
          <Tab key="description" title="Description">
            <Card>
              <CardBody>
                <p className="text-gray-700">
                  {product.description || "No description available for this product."}
                </p>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="details" title="Details">
            <Card>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Product Details</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Category: {product.category}</li>
                      <li>SKU: {product.id}-MOM</li>
                      <li>Weight: 0.5 lbs</li>
                      <li>Dimensions: 8 × 5 × 1 in</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <p className="text-gray-700">
                      Orders typically ship within 1-2 business days. Free shipping on orders over $35.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="reviews" title="Reviews">
            <Card>
              <CardBody>
                <div className="flex flex-col items-center py-4">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon 
                          key={star} 
                          icon="lucide:star" 
                          className="text-yellow-400" 
                          width={24} 
                        />
                      ))}
                    </div>
                    <span className="text-xl font-semibold">4.9 out of 5</span>
                  </div>
                  <p className="text-gray-600 mb-6">Based on 24 reviews</p>
                  
                  <Button color="primary" variant="bordered">
                    Write a Review
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
        <FeaturedProducts />
      </div>
    </div>
  );
};