import React from "react";
import { Breadcrumbs, BreadcrumbItem, Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export const BookshelfPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>The Bookshelf</BreadcrumbItem>
      </Breadcrumbs>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">The Bookshelf</h1>
        
        <div className="mb-10">
          <img 
            src="https://img.heroui.chat/image/book?w=1200&h=600&u=10" 
            alt="Bookshelf" 
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          
          <p className="text-gray-700 mb-6">
            Welcome to "The Bookshelf" at Manna on Main, a special section of our store dedicated to 
            highlighting exceptional Christian literature. Here, we feature carefully selected books 
            that have touched hearts, transformed lives, and deepened faith journeys.
          </p>
          
          <p className="text-gray-700 mb-6">
            Each month, our team selects books across various categories—from devotionals and biblical 
            studies to Christian fiction and personal growth—that we believe will inspire, educate, 
            and encourage you in your walk with Christ.
          </p>
          
          <p className="text-gray-700">
            Explore our current featured selections below, and check back regularly as we update 
            "The Bookshelf" with new recommendations.
          </p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Staff Picks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardBody>
                <div className="flex flex-col sm:flex-row gap-4">
                  <img 
                    src="https://img.heroui.chat/image/book?w=200&h=300&u=11" 
                    alt="Book Cover" 
                    className="w-full sm:w-32 h-48 sm:h-auto object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-medium mb-1">The Purpose Driven Life</h3>
                    <p className="text-gray-600 mb-2">by Rick Warren</p>
                    <p className="text-gray-700 text-sm mb-4">
                      One of the bestselling nonfiction books in history, The Purpose Driven Life will help you understand why you are alive and reveal God's amazing plan for you both here and now, and for eternity.
                    </p>
                    <div className="flex items-center">
                      <span className="text-primary font-semibold mr-4">$14.99</span>
                      <Button 
                        size="sm" 
                        color="primary"
                        variant="flat"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody>
                <div className="flex flex-col sm:flex-row gap-4">
                  <img 
                    src="https://img.heroui.chat/image/book?w=200&h=300&u=12" 
                    alt="Book Cover" 
                    className="w-full sm:w-32 h-48 sm:h-auto object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-medium mb-1">Mere Christianity</h3>
                    <p className="text-gray-600 mb-2">by C.S. Lewis</p>
                    <p className="text-gray-700 text-sm mb-4">
                      A classic of Christian apologetics, Mere Christianity brings together Lewis's legendary broadcast talks during World War II, providing a powerful rational case for the Christian faith.
                    </p>
                    <div className="flex items-center">
                      <span className="text-primary font-semibold mr-4">$16.99</span>
                      <Button 
                        size="sm" 
                        color="primary"
                        variant="flat"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Monthly Book Club</h2>
          
          <Card>
            <CardBody>
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src="https://img.heroui.chat/image/book?w=300&h=450&u=13" 
                  alt="Book of the Month" 
                  className="w-full md:w-48 h-64 md:h-auto object-cover rounded-md"
                />
                <div>
                  <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-md mb-3">
                    Book of the Month
                  </div>
                  <h3 className="text-xl font-medium mb-2">Redeeming Love</h3>
                  <p className="text-gray-600 mb-3">by Francine Rivers</p>
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon 
                        key={star} 
                        icon="lucide:star" 
                        className="text-yellow-400" 
                        width={16} 
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">5.0 (42 reviews)</span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    A powerful retelling of the biblical book of Hosea, Redeeming Love is a life-changing story of God's unconditional, redemptive, all-consuming love. Set during California's gold rush, it follows the journey of Angel, a woman sold into prostitution as a child, and Michael Hosea, the man called to love her.
                  </p>
                  <div className="flex items-center">
                    <span className="text-primary font-semibold mr-4">$17.99</span>
                    <Button 
                      color="primary"
                    >
                      Add to Cart
                    </Button>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2">Book Club Meeting</h4>
                    <p className="text-gray-700 text-sm">
                      Join us for our monthly book club discussion on Redeeming Love on Saturday, June 18th at 2:00 PM in our store. Refreshments will be provided!
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Reading Lists</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card isPressable className="hover:shadow-md transition-shadow">
              <CardBody className="text-center p-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon icon="lucide:book-open" className="text-primary" width={28} />
                </div>
                <h3 className="text-lg font-medium mb-2">New Believers</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Essential readings for those new to the Christian faith.
                </p>
                <Button 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  endContent={<Icon icon="lucide:arrow-right" width={16} />}
                >
                  Explore
                </Button>
              </CardBody>
            </Card>
            
            <Card isPressable className="hover:shadow-md transition-shadow">
              <CardBody className="text-center p-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon icon="lucide:heart" className="text-primary" width={28} />
                </div>
                <h3 className="text-lg font-medium mb-2">Marriage & Family</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Books to strengthen relationships and build godly homes.
                </p>
                <Button 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  endContent={<Icon icon="lucide:arrow-right" width={16} />}
                >
                  Explore
                </Button>
              </CardBody>
            </Card>
            
            <Card isPressable className="hover:shadow-md transition-shadow">
              <CardBody className="text-center p-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon icon="lucide:book" className="text-primary" width={28} />
                </div>
                <h3 className="text-lg font-medium mb-2">Bible Study</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Resources to deepen your understanding of Scripture.
                </p>
                <Button 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  endContent={<Icon icon="lucide:arrow-right" width={16} />}
                >
                  Explore
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};