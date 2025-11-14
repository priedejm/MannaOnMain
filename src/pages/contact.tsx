import React from "react";
import { 
  Breadcrumbs, 
  BreadcrumbItem, 
  Input, 
  Textarea, 
  Button, 
  Card, 
  CardBody 
} from "@heroui/react";
import { Icon } from "@iconify/react";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Contact Us</BreadcrumbItem>
      </Breadcrumbs>
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">Contact Us</h1>
        <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
          Have a question or need assistance? We're here to help! Fill out the form below or use our contact information to get in touch with us.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {isSubmitted ? (
              <Card>
                <CardBody className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Icon icon="lucide:check" className="text-green-600" width={32} />
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
                  <p className="text-gray-700 mb-6">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                  <Button 
                    color="primary"
                    onPress={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </CardBody>
              </Card>
            ) : (
              <Card>
                <CardBody>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isRequired
                      />
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        isRequired
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <Input
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        isRequired
                      />
                    </div>
                    
                    <Textarea
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      minRows={5}
                      isRequired
                    />
                    
                    <Button
                      type="submit"
                      color="primary"
                      className="w-full sm:w-auto"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardBody>
              </Card>
            )}
          </div>
          
          <div>
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <Icon icon="lucide:map-pin" className="text-primary" width={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-700">1101 N Main St #202, High Point, NC 27262</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <Icon icon="lucide:phone" className="text-primary" width={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-700">
                        <a href="tel:+13364344663" className="hover:text-primary">
                          (336) 434-4663
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <Icon icon="lucide:mail" className="text-primary" width={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-700">
                        <a href="mailto:info@mannaonmain.com" className="hover:text-primary">
                          info@mannaonmain.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <Icon icon="lucide:clock" className="text-primary" width={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Hours</h3>
                      <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-700">
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
            
            <div className="mt-6">
              <Card>
                <CardBody>
                  <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
                  <div className="flex space-x-4">
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      <Icon icon="logos:facebook" width={24} />
                    </a>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      <Icon icon="logos:instagram-icon" width={24} />
                    </a>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">Find Us</h2>
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
    </div>
  );
};