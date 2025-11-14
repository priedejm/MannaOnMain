import React from "react";
import { Link } from "react-router-dom";

export const MegaMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);

  const categories = {
    bibles: {
      title: "Bibles",
      subcategories: [
        "King James Version",
        "English Standard Version",
        "New International Version",
        "New Living Translation",
        "Christian Standard Bible",
        "Amplified",
        "New King James Version",
        "New American Standard Bible",
      ]
    },
    bibleAccessories: {
      title: "Bible Accessories",
      subcategories: [
        "Bible Covers",
        "Highlighters",
        "Bible Pens",
        "Tabs",
        "Magnifier/Lights",
        "Bible Ribbons",
        "Zipper Pouches",
        "Tote Bags",
      ]
    },
    cards: {
      title: "Cards",
      subcategories: []
    },
    stationery: {
      title: "Stationery",
      subcategories: [
        "Journals",
        "Notepads and Sticky Notes",
        "Calendars/Planners",
        "Puzzle Books",
        "Puzzles",
        "Magnets",
        "Bookmarks",
        "Boxes of Blessings",
      ]
    },
    books: {
      title: "Books",
      subcategories: [
        "Christian Living",
        "Spiritual Growth",
        "Prayer",
        "Spiritual Warfare",
        "Family/Relationships",
        "Fiction",
        "Devotionals",
        "Bible Studying Resources",
      ]
    },
    children: {
      title: "Children",
      subcategories: [
        "Toys",
        "Children's Books",
        "Children's Bibles",
        "Sunday School/Lesson Books",
        "Children's Bible Accessories",
        "Activity/Coloring Books",
      ]
    },
    giftBags: {
      title: "Gift Bags",
      subcategories: []
    },
    homeOutdoor: {
      title: "Home/Outdoor",
      subcategories: [
        "Garden Flags",
        "Signature Signs",
        "Wind Chimes",
        "Arch Signs",
        "Door Hangers",
        "Drinkware",
        "Seven Weeks Coffee",
        "Wall/Home Decor",
      ]
    },
    churchSupplies: {
      title: "Church Supplies",
      subcategories: [
        "Communion",
        "Bulletins",
        "Tracts",
        "Offering",
        "Certificates",
        "Anointing Oil",
        "Other",
        "Pastoral Resources",
      ]
    },
    jewelry: {
      title: "Jewelry",
      subcategories: [
        "Earrings",
        "Necklaces",
        "Dear Heart Jewelry",
        "Olive Wood Jewelry",
        "Cross Jewelry",
        "Rings",
        "Mustard Seed Jewelry",
        "Bracelets",
      ]
    },
    apparelAccessories: {
      title: "Apparel/Accessories",
      subcategories: [
        "T-Shirts",
        "Men's Apparel/Accessories",
        "Tote Bags",
        "Hats",
        "Sweatshirts/Outerwear",
        "Wallets and Checkbook Covers",
        "Reminder Nail Polish",
      ]
    },
    seasonal: {
      title: "Seasonal",
      subcategories: [
        "Valentine's Day",
        "Easter",
        "Pastor Appreciation Month",
        "Thanksgiving",
        "Christmas",
      ]
    },
  };

  return (
    <div className="hidden lg:block bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          {Object.entries(categories).map(([key, category]) => (
            <div 
              key={key}
              className="relative group"
              onMouseEnter={() => setActiveCategory(key)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button 
                className={`px-4 py-3 text-sm font-medium hover:text-primary transition-colors ${
                  activeCategory === key ? 'text-primary border-b-2 border-primary' : 'text-gray-700'
                }`}
              >
                {category.title}
              </button>
              
              {category.subcategories.length > 0 && activeCategory === key && (
                <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-b-md z-50 py-2 border border-gray-100">
                  {category.subcategories.map((subcat, index) => (
                    <Link 
                      key={index}
                      to={`/shop?category=${key}&subcategory=${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                    >
                      {subcat}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};