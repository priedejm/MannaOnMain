import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

export const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>About Us</BreadcrumbItem>
      </Breadcrumbs>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">About Manna on Main</h1>
        
        <div className="mb-10">
          <img 
            src="https://img.heroui.chat/image/places?w=1200&h=600&u=2" 
            alt="Manna on Main Store" 
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          
          <p className="text-gray-700 mb-4">
            Welcome to Manna on Main, your premier Christian bookstore in High Point, North Carolina. 
            We are dedicated to providing quality Christian literature, gifts, and resources to help 
            nurture and grow your faith journey.
          </p>
          
          <p className="text-gray-700 mb-4">
            Our store began with a simple mission: to serve the local community by offering 
            meaningful Christian products that inspire, educate, and encourage. Since our founding, 
            we have been blessed to become a trusted resource for individuals, families, and churches 
            throughout the High Point area.
          </p>
          
          <p className="text-gray-700">
            At Manna on Main, we carefully select each product we carry, ensuring that it aligns with 
            biblical values and meets our high standards for quality. From Bibles and devotionals to 
            gifts and home décor, we strive to offer items that will enrich your spiritual life and 
            bring joy to your home.
          </p>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Our mission at Manna on Main is to provide resources that encourage spiritual growth, 
            strengthen faith, and foster a deeper relationship with God. We believe that Christian 
            literature and thoughtfully selected gifts can play a significant role in one's faith journey, 
            offering guidance, inspiration, and encouragement along the way.
          </p>
          <p className="text-gray-700">
            We are committed to serving our customers with integrity, knowledge, and a genuine desire 
            to help them find the resources they need. Our knowledgeable staff is always ready to 
            assist you in finding the perfect Bible, book, or gift for any occasion.
          </p>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-700 mb-6">
            The heart of Manna on Main is our dedicated team who share a passion for serving God and 
            our community. Our staff members are not only knowledgeable about our products but are 
            also committed Christians who understand the importance of faith in daily life.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm p-6">
              <img 
                src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1" 
                alt="Store Owner" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-medium text-center mb-1">Sarah Johnson</h3>
              <p className="text-gray-600 text-center mb-4">Store Owner</p>
              <p className="text-gray-700 text-center">
                "My vision for Manna on Main has always been to create a welcoming space where people 
                can find resources to strengthen their faith and connect with God's Word."
              </p>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm p-6">
              <img 
                src="https://img.heroui.chat/image/avatar?w=200&h=200&u=2" 
                alt="Store Manager" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-medium text-center mb-1">Michael Thompson</h3>
              <p className="text-gray-600 text-center mb-4">Store Manager</p>
              <p className="text-gray-700 text-center">
                "I love helping customers find the perfect Bible or book that speaks to their current 
                season of life. It's a blessing to be part of their faith journey."
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Visit Us Today</h2>
          <p className="text-gray-700 mb-4">
            We invite you to visit Manna on Main and explore our wide selection of Christian books, 
            Bibles, gifts, and more. Our friendly staff is ready to assist you in finding the perfect 
            items for yourself or as gifts for your loved ones.
          </p>
          <p className="text-gray-700">
            If you're looking for a specific product that you don't see on our website or in our store, 
            please don't hesitate to ask. We're happy to special order items and will do our best to 
            meet your needs.
          </p>
        </div>
      </div>
    </div>
  );
};