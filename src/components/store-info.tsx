import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export const StoreInfo: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Visit Our Store</h2>
            <p className="text-gray-600 mb-6">
              We invite you to visit our physical location in High Point, NC. Our knowledgeable staff is ready to assist you in finding the perfect Christian books, gifts, and more.
            </p>
            
            <Card className="mb-6">
              <CardBody>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Icon icon="lucide:map-pin" className="mt-1 mr-3 text-primary" width={20} />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-600">1101 N Main St #202, High Point, NC 27262</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Icon icon="lucide:phone" className="mt-1 mr-3 text-primary" width={20} />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600">(336) 434-4663</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Icon icon="lucide:clock" className="mt-1 mr-3 text-primary" width={20} />
                    <div>
                      <h3 className="font-medium">Hours</h3>
                      <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                        <span>Monday</span>
                        <span>10 AM–6 PM</span>
                        <span>Tuesday</span>
                        <span>10 AM–6 PM</span>
                        <span>Wednesday</span>
                        <span>10 AM–6 PM</span>
                        <span>Thursday</span>
                        <span>10 AM–6 PM</span>
                        <span>Friday</span>
                        <span>10 AM–6 PM</span>
                        <span>Saturday</span>
                        <span>10 AM–4 PM</span>
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            <div className="flex flex-wrap gap-3">
              <Button
                as="a"
                href="https://www.google.com/maps/dir/?api=1&destination=1101+N+Main+St+%23202+High+Point+NC+27262"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                startContent={<Icon icon="lucide:navigation" width={18} />}
              >
                Get Directions
              </Button>
              
              <Button
                as="a"
                href="tel:+13364344663"
                variant="bordered"
                color="primary"
                startContent={<Icon icon="lucide:phone" width={18} />}
              >
                Call Us
              </Button>
            </div>
          </div>
          
          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Manna on Main Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.176277675728!2d-80.00581492392826!3d35.97725071846313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8853e7c8f9f9a735%3A0x4e3b4d7c2f8f9a1a!2s1101%20N%20Main%20St%20%23202%2C%20High%20Point%2C%20NC%2027262!5e0!3m2!1sen!2sus!4v1656789012345!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};