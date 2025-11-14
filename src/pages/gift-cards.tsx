import React from "react";
import { 
  Breadcrumbs, 
  BreadcrumbItem, 
  Card, 
  CardBody, 
  CardFooter, 
  Button,
  Input,
  Tabs,
  Tab
} from "@heroui/react";
import { Icon } from "@iconify/react";

export const GiftCardsPage: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = React.useState<number | null>(25);
  const [customAmount, setCustomAmount] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("physical");
  
  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };
  
  const getSelectedAmount = () => {
    if (selectedAmount !== null) {
      return selectedAmount;
    }
    return customAmount ? parseInt(customAmount) : 0;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Gift Cards</BreadcrumbItem>
      </Breadcrumbs>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">Gift Cards</h1>
        
        <div className="mb-10">
          <p className="text-gray-700 mb-6 text-center max-w-2xl mx-auto">
            Give the gift of choice with a Manna on Main gift card. Perfect for birthdays, holidays, 
            or any special occasion, our gift cards allow your loved ones to select exactly what they want 
            from our wide selection of Christian books, Bibles, gifts, and more.
          </p>
        </div>
        
        <Tabs 
          aria-label="Gift Card Options"
          selectedKey={activeTab}
          onSelectionChange={setActiveTab as any}
          variant="underlined"
          color="primary"
          className="w-full mb-6"
        >
          <Tab key="physical" title="Physical Gift Card">
            <Card>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <img 
                      src="https://img.heroui.chat/image/finance?w=400&h=250&u=5" 
                      alt="Physical Gift Card" 
                      className="w-full rounded-lg shadow-sm"
                    />
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Physical Gift Card</h2>
                    <p className="text-gray-700 mb-6">
                      Our physical gift cards are beautifully designed and can be purchased in-store or 
                      ordered online for delivery. They make perfect presents for any occasion.
                    </p>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Select Amount</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[10, 25, 50, 100].map((amount) => (
                          <Button
                            key={amount}
                            variant={selectedAmount === amount ? "solid" : "bordered"}
                            color={selectedAmount === amount ? "primary" : "default"}
                            onPress={() => handleAmountClick(amount)}
                            className="w-full"
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Custom Amount</h3>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        startContent="$"
                        className="max-w-xs"
                      />
                    </div>
                    
                    <Button 
                      color="primary"
                      size="lg"
                      isDisabled={!selectedAmount && !customAmount}
                      onPress={() => {
                        alert(`Adding $${getSelectedAmount()} gift card to cart`);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          
          <Tab key="digital" title="Digital Gift Card">
            <Card>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <img 
                      src="https://img.heroui.chat/image/finance?w=400&h=250&u=6" 
                      alt="Digital Gift Card" 
                      className="w-full rounded-lg shadow-sm"
                    />
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Digital Gift Card</h2>
                    <p className="text-gray-700 mb-6">
                      Our digital gift cards are delivered instantly via email and can be used for 
                      online purchases or printed and used in-store. Perfect for last-minute gifts!
                    </p>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Select Amount</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[10, 25, 50, 100].map((amount) => (
                          <Button
                            key={amount}
                            variant={selectedAmount === amount ? "solid" : "bordered"}
                            color={selectedAmount === amount ? "primary" : "default"}
                            onPress={() => handleAmountClick(amount)}
                            className="w-full"
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Custom Amount</h3>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        startContent="$"
                        className="max-w-xs"
                      />
                    </div>
                    
                    <Button 
                      color="primary"
                      size="lg"
                      isDisabled={!selectedAmount && !customAmount}
                      onPress={() => {
                        alert(`Adding $${getSelectedAmount()} digital gift card to cart`);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Gift Card Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardBody className="text-center p-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon icon="lucide:info" className="text-primary" width={28} />
                </div>
                <h3 className="text-lg font-medium mb-2">Gift Card Details</h3>
                <ul className="text-gray-700 text-sm space-y-2 text-left">
                  <li>• No expiration date</li>
                  <li>• Can be used online or in-store</li>
                  <li>• Available in any amount from $10 to $500</li>
                  <li>• Non-refundable</li>
                </ul>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="text-center p-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon icon="lucide:gift" className="text-primary" width={28} />
                </div>
                <h3 className="text-lg font-medium mb-2">Perfect for Gifting</h3>
                <p className="text-gray-700 text-sm">
                  Our gift cards are perfect for:
                </p>
                <ul className="text-gray-700 text-sm space-y-2 text-left mt-2">
                  <li>• Birthdays and anniversaries</li>
                  <li>• Christmas and Easter</li>
                  <li>• Graduations and confirmations</li>
                  <li>• Thank you gifts</li>
                  <li>• Corporate gifts</li>
                </ul>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="text-center p-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon icon="lucide:help-circle" className="text-primary" width={28} />
                </div>
                <h3 className="text-lg font-medium mb-2">FAQs</h3>
                <ul className="text-gray-700 text-sm space-y-2 text-left">
                  <li>• How do I check my gift card balance?</li>
                  <li>• Can I use multiple gift cards for one purchase?</li>
                  <li>• What if my gift card is lost or stolen?</li>
                  <li>• Can I reload my gift card?</li>
                </ul>
                <Button 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  className="mt-4"
                >
                  View All FAQs
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 bg-primary/5 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-3">Need Help with Gift Cards?</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about our gift cards or need assistance with a purchase, 
            our friendly staff is here to help.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              as="a"
              href="tel:+13364344663"
              variant="bordered"
              color="primary"
              startContent={<Icon icon="lucide:phone" width={18} />}
            >
              Call Us
            </Button>
            <Button
              as="a"
              href="/contact-us"
              color="primary"
              startContent={<Icon icon="lucide:mail" width={18} />}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};