import React from "react";
import { Card, CardBody, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

interface TestimonialProps {
  text: string;
  author: string;
  rating: number;
  timeAgo?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ text, author, rating, timeAgo }) => {
  return (
    <Card className="h-full">
      <CardBody className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon 
                key={i}
                icon="lucide:star" 
                className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                width={18}
              />
            ))}
          </div>
          {timeAgo && (
            <span className="text-xs text-gray-500">{timeAgo}</span>
          )}
        </div>
        <p className="text-gray-700 flex-grow mb-4 text-sm leading-relaxed">{text}</p>
        <div className="flex items-center">
          <Avatar
            name={author.split(" ").map(n => n[0]).join("")}
            size="sm"
            className="mr-3"
          />
          <span className="font-medium text-sm">{author}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      text: "I had an amazing experience at Manna on Main! They offer a wide variety of Bibles and Christian literature, and I was so pleased with their diverse catalog of items. From books and apparel to home decor, gifts, church service supplies, and children's items, there's something for everyone.",
      author: "Olivia Phillips",
      rating: 5,
      timeAgo: "7 months ago"
    },
    {
      text: "This is a huge store with lots to select from. I was greeted upon entering the store. A representative took me directly to my items. She was professional and knowledgeable. She delivered that WOW experience. I will forever return because of the professionalism and hospitality.",
      author: "Nicole Obie",
      rating: 5,
      timeAgo: "1 year ago"
    },
    {
      text: "These ladies always make you feel welcome. They are also helpful in helping you to find the right gift or right fit for your faith journey. The new location is going to be adorable.",
      author: "Tabatha Wright",
      rating: 5,
      timeAgo: "9 months ago"
    },
    {
      text: "I love this store! Amazing products and the people who work here are wonderful. Always friendly, always professional!",
      author: "Michael Hayworth",
      rating: 5,
      timeAgo: "9 months ago"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-2">What Our Customers Say</h2>
          <p className="text-gray-600">Don't just take our word for it</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              text={testimonial.text}
              author={testimonial.author}
              rating={testimonial.rating}
              timeAgo={testimonial.timeAgo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};