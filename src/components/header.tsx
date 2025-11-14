import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Input
} from "@heroui/react";
import { Icon } from "@iconify/react";

export const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [showMegaMenu, setShowMegaMenu] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowMegaMenu(true);
  };
  
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowMegaMenu(false);
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50">
      <Navbar 
        maxWidth="full" 
        className="bg-primary text-white shadow-md relative z-20"
        height="5rem"
      >
        {/* Hamburger Menu Button - Shows below 1280px */}
        <NavbarContent className="xl:hidden" justify="start">
          <Button
            isIconOnly
            variant="light"
            onPress={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            <Icon icon="lucide:menu" width={24} />
          </Button>
        </NavbarContent>

        {/* Logo - Centered */}
        <NavbarBrand className={`absolute left-1/2 transform -translate-x-1/2 ${isSearchOpen ? 'hidden xl:flex' : 'flex'}`}>
          <Link to="/" className="flex items-center py-2">
            {!imageError ? (
              <img 
                src="/assets/WhiteLogo.webp" 
                alt="Manna on Main - Christian Books & Gifts" 
                className="h-16 w-auto max-w-[300px] object-contain"
                style={{ display: 'block' }}
                onError={() => {
                  console.error('Failed to load WhiteLogo.webp');
                  setImageError(true);
                }}
                onLoad={() => console.log('WhiteLogo loaded successfully')}
              />
            ) : (
              <div className="flex flex-col items-center">
                <h1 className="logo-text text-xl sm:text-2xl font-semibold tracking-wide text-white">
                  Manna on Main
                </h1>
                <p className="text-tiny uppercase tracking-widest text-white/80">
                  CHRISTIAN BOOKS & GIFTS
                </p>
              </div>
            )}
          </Link>
        </NavbarBrand>

        {/* Navigation Links - Left Aligned - Shows above 1280px */}
        <NavbarContent className="hidden xl:flex gap-4" justify="start">
          <NavbarItem>
            <div 
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Button
                as={Link}
                to="/shop"
                disableRipple
                variant="light"
                className="text-white p-0 bg-transparent data-[hover=true]:bg-transparent group relative"
              >
                <span className="flex items-center">
                  Shop All
                  <Icon
                    icon={showMegaMenu ? "lucide:chevron-up" : "lucide:chevron-down"} 
                    width={16} 
                    className="ml-1 transition-transform group-hover:translate-y-0.5" 
                  />
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform ${showMegaMenu ? 'scale-x-0' : ''}`}></span>
              </Button>
            </div>
          </NavbarItem>
          <NavbarItem isActive={isActive("/about-us")}>
            <Link to="/about-us" className="text-white">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive("/gift-cards")}>
            <Link to="/gift-cards" className="text-white">
              Gift Cards
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive("/the-bookshelf")}>
            <Link to="/the-bookshelf" className="text-white">
              The Bookshelf
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive("/contact-us")}>
            <Link to="/contact-us" className="text-white">
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* Right Side Icons - Search & User */}
        <NavbarContent justify="end" className="gap-1 xl:gap-3">
          {isSearchOpen ? (
            <div className="absolute inset-0 xl:relative xl:inset-auto flex items-center justify-center xl:justify-end bg-primary z-10 px-4 xl:px-0 xl:w-auto">
              <div className="w-full xl:w-64 2xl:w-80">
                <Input
                  classNames={{
                    base: "w-full h-10",
                    inputWrapper: "bg-white/20 border-none h-10",
                  }}
                  placeholder="Search products..."
                  size="sm"
                  startContent={<Icon icon="lucide:search" className="text-white/70" />}
                  type="search"
                  autoFocus
                />
              </div>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="text-white ml-1"
                onPress={() => setIsSearchOpen(false)}
              >
                <Icon icon="lucide:x" width={18} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-1 xl:gap-2">
              <Button
                isIconOnly
                variant="light"
                onPress={() => setIsSearchOpen(true)}
                className="text-white p-1 xl:p-2"
              >
                <Icon icon="lucide:search" width={20} />
              </Button>

              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="light"
                    className="text-white p-1 xl:p-2"
                  >
                    <Icon icon="lucide:user" width={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Account actions">
                  <DropdownItem key="sign-in">Sign In</DropdownItem>
                  <DropdownItem key="create-account">Create Account</DropdownItem>
                  <DropdownItem key="orders">My Orders</DropdownItem>
                  <DropdownItem key="wishlist">Wishlist</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        </NavbarContent>
      </Navbar>

      {/* Mega Menu */}
      {showMegaMenu && (
        <div 
          className="fixed inset-0 bg-black/20 z-10"
          onClick={() => setShowMegaMenu(false)}
        >
          <div 
            className="absolute top-20 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-10 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto py-6 px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {/* Bibles Column */}
                <div>
                  <h3 className="font-medium text-primary mb-3">Bibles</h3>
                  <ul className="space-y-2">
                    <li><a href="/shop?category=bibles" className="text-sm text-gray-700 hover:text-primary">King James Version</a></li>
                    <li><a href="/shop?category=bibles" className="text-sm text-gray-700 hover:text-primary">English Standard Version</a></li>
                    <li><a href="/shop?category=bibles" className="text-sm text-gray-700 hover:text-primary">New International Version</a></li>
                    <li><a href="/shop?category=bibles" className="text-sm text-gray-700 hover:text-primary">New Living Translation</a></li>
                    <li><a href="/shop?category=bibles" className="text-sm text-gray-700 hover:text-primary">Christian Standard Bible</a></li>
                    <li><a href="/shop?category=bibles" className="text-sm text-gray-700 hover:text-primary">Amplified</a></li>
                    <li><a href="/shop?category=bibles" className="text-sm text-gray-700 hover:text-primary">New King James Version</a></li>
                    <li><a href="/shop?category=bibles" className="text-sm text-gray-700 hover:text-primary">New American Standard Bible</a></li>
                  </ul>
                </div>
                
                {/* Bible Accessories Column */}
                <div>
                  <h3 className="font-medium text-primary mb-3">Bible Accessories</h3>
                  <ul className="space-y-2">
                    <li><a href="/shop?category=bible-accessories" className="text-sm text-gray-700 hover:text-primary">Bible Covers</a></li>
                    <li><a href="/shop?category=bible-accessories" className="text-sm text-gray-700 hover:text-primary">Highlighters</a></li>
                    <li><a href="/shop?category=bible-accessories" className="text-sm text-gray-700 hover:text-primary">Bible Pens</a></li>
                    <li><a href="/shop?category=bible-accessories" className="text-sm text-gray-700 hover:text-primary">Tabs</a></li>
                    <li><a href="/shop?category=bible-accessories" className="text-sm text-gray-700 hover:text-primary">Magnifier/Lights</a></li>
                    <li><a href="/shop?category=bible-accessories" className="text-sm text-gray-700 hover:text-primary">Bible Ribbons</a></li>
                    <li><a href="/shop?category=bible-accessories" className="text-sm text-gray-700 hover:text-primary">Zipper Pouches</a></li>
                    <li><a href="/shop?category=bible-accessories" className="text-sm text-gray-700 hover:text-primary">Tote Bags</a></li>
                  </ul>
                </div>
                
                {/* Cards & Stationery Column */}
                <div>
                  <h3 className="font-medium text-primary mb-3">Cards</h3>
                  <ul className="space-y-2">
                    <li><a href="/shop?category=cards" className="text-sm text-gray-700 hover:text-primary">All Cards</a></li>
                  </ul>
                  
                  <h3 className="font-medium text-primary mt-6 mb-3">Stationery</h3>
                  <ul className="space-y-2">
                    <li><a href="/shop?category=stationery" className="text-sm text-gray-700 hover:text-primary">Journals</a></li>
                    <li><a href="/shop?category=stationery" className="text-sm text-gray-700 hover:text-primary">Notepads and Sticky Notes</a></li>
                    <li><a href="/shop?category=stationery" className="text-sm text-gray-700 hover:text-primary">Calendars/Planners</a></li>
                    <li><a href="/shop?category=stationery" className="text-sm text-gray-700 hover:text-primary">Puzzle Books</a></li>
                    <li><a href="/shop?category=stationery" className="text-sm text-gray-700 hover:text-primary">Puzzles</a></li>
                    <li><a href="/shop?category=stationery" className="text-sm text-gray-700 hover:text-primary">Magnets</a></li>
                    <li><a href="/shop?category=stationery" className="text-sm text-gray-700 hover:text-primary">Bookmarks</a></li>
                  </ul>
                </div>
                
                {/* Books Column */}
                <div>
                  <h3 className="font-medium text-primary mb-3">Books</h3>
                  <ul className="space-y-2">
                    <li><a href="/shop?category=books" className="text-sm text-gray-700 hover:text-primary">Christian Living</a></li>
                    <li><a href="/shop?category=books" className="text-sm text-gray-700 hover:text-primary">Spiritual Growth</a></li>
                    <li><a href="/shop?category=books" className="text-sm text-gray-700 hover:text-primary">Prayer</a></li>
                    <li><a href="/shop?category=books" className="text-sm text-gray-700 hover:text-primary">Spiritual Warfare</a></li>
                    <li><a href="/shop?category=books" className="text-sm text-gray-700 hover:text-primary">Family/Relationships</a></li>
                    <li><a href="/shop?category=books" className="text-sm text-gray-700 hover:text-primary">Fiction</a></li>
                    <li><a href="/shop?category=books" className="text-sm text-gray-700 hover:text-primary">Devotionals</a></li>
                    <li><a href="/shop?category=books" className="text-sm text-gray-700 hover:text-primary">Bible Studying Resources</a></li>
                  </ul>
                </div>
                
                {/* Children & Gift Bags Column */}
                <div>
                  <h3 className="font-medium text-primary mb-3">Children</h3>
                  <ul className="space-y-2">
                    <li><a href="/shop?category=children" className="text-sm text-gray-700 hover:text-primary">Toys</a></li>
                    <li><a href="/shop?category=children" className="text-sm text-gray-700 hover:text-primary">Children's Books</a></li>
                    <li><a href="/shop?category=children" className="text-sm text-gray-700 hover:text-primary">Children's Bibles</a></li>
                    <li><a href="/shop?category=children" className="text-sm text-gray-700 hover:text-primary">Sunday School/Lesson Books</a></li>
                    <li><a href="/shop?category=children" className="text-sm text-gray-700 hover:text-primary">Children's Bible Accessories</a></li>
                    <li><a href="/shop?category=children" className="text-sm text-gray-700 hover:text-primary">Activity/Coloring Books</a></li>
                  </ul>
                  
                  <h3 className="font-medium text-primary mt-6 mb-3">Gift Bags</h3>
                  <ul className="space-y-2">
                    <li><a href="/shop?category=gift-bags" className="text-sm text-gray-700 hover:text-primary">All Gift Bags</a></li>
                  </ul>
                </div>
                
                {/* Home/Outdoor Column */}
                <div>
                  <h3 className="font-medium text-primary mb-3">Home/Outdoor</h3>
                  <ul className="space-y-2">
                    <li><a href="/shop?category=home-outdoor" className="text-sm text-gray-700 hover:text-primary">Garden Flags</a></li>
                    <li><a href="/shop?category=home-outdoor" className="text-sm text-gray-700 hover:text-primary">Signature Signs</a></li>
                    <li><a href="/shop?category=home-outdoor" className="text-sm text-gray-700 hover:text-primary">Wind Chimes</a></li>
                    <li><a href="/shop?category=home-outdoor" className="text-sm text-gray-700 hover:text-primary">Door Hangers</a></li>
                    <li><a href="/shop?category=home-outdoor" className="text-sm text-gray-700 hover:text-primary">Drinkware</a></li>
                    <li><a href="/shop?category=home-outdoor" className="text-sm text-gray-700 hover:text-primary">Seven Weeks Coffee</a></li>
                    <li><a href="/shop?category=home-outdoor" className="text-sm text-gray-700 hover:text-primary">Wall/Home Decor</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
                {/* Church Supplies Column */}
                <div>
                  <h3 className="font-medium text-primary mb-3">Church Supplies</h3>
                  <ul className="space-y-2">
                    <li><a href="/shop?category=church-supplies" className="text-sm text-gray-700 hover:text-primary">Communion</a></li>
                    <li><a href="/shop?category=church-supplies" className="text-sm text-gray-700 hover:text-primary">Bulletins</a></li>
                    <li><a href="/shop?category=church-supplies" className="text-sm text-gray-700 hover:text-primary">Tracts</a></li>
                    <li><a href="/shop?category=church-supplies" className="text-sm text-gray-700 hover:text-primary">Offering</a></li>
                    <li><a href="/shop?category=church-supplies" className="text-sm text-gray-700 hover:text-primary">Certificates</a></li>
                    <li><a href="/shop?category=church-supplies" className="text-sm text-gray-700 hover:text-primary">Anointing Oil</a></li>
                    <li><a href="/shop?category=church-supplies" className="text-sm text-gray-700 hover:text-primary">Pastoral Resources</a></li>
                  </ul>
                </div>
                
                {/* Jewelry Column */}
                <div>
                  <h3 className="font-medium text-primary mb-3">Jewelry</h3>
                  <ul className="space-y-2">
                    <li><a href="/shop?category=jewelry" className="text-sm text-gray-700 hover:text-primary">Earrings</a></li>
                    <li><a href="/shop?category=jewelry" className="text-sm text-gray-700 hover:text-primary">Necklaces</a></li>
                    <li><a href="/shop?category=jewelry" className="text-sm text-gray-700 hover:text-primary">Dear Heart Jewelry</a></li>
                    <li><a href="/shop?category=jewelry" className="text-sm text-gray-700 hover:text-primary">Olive Wood Jewelry</a></li>
                    <li><a href="/shop?category=jewelry" className="text-sm text-gray-700 hover:text-primary">Cross Jewelry</a></li>
                    <li><a href="/shop?category=jewelry" className="text-sm text-gray-700 hover:text-primary">Rings</a></li>
                    <li><a href="/shop?category=jewelry" className="text-sm text-gray-700 hover:text-primary">Mustard Seed Jewelry</a></li>
                    <li><a href="/shop?category=jewelry" className="text-sm text-gray-700 hover:text-primary">Bracelets</a></li>
                  </ul>
                </div>
                
                {/* Apparel/Accessories Column */}
                <div>
                  <h3 className="font-medium text-primary mb-3">Apparel/Accessories</h3>
                  <ul className="space-y-2">
                    <li><a href="/shop?category=apparel-accessories" className="text-sm text-gray-700 hover:text-primary">T-Shirts</a></li>
                    <li><a href="/shop?category=apparel-accessories" className="text-sm text-gray-700 hover:text-primary">Men's Apparel/Accessories</a></li>
                    <li><a href="/shop?category=apparel-accessories" className="text-sm text-gray-700 hover:text-primary">Tote Bags</a></li>
                    <li><a href="/shop?category=apparel-accessories" className="text-sm text-gray-700 hover:text-primary">Hats</a></li>
                    <li><a href="/shop?category=apparel-accessories" className="text-sm text-gray-700 hover:text-primary">Sweatshirts/Outerwear</a></li>
                    <li><a href="/shop?category=apparel-accessories" className="text-sm text-gray-700 hover:text-primary">Wallets and Checkbook Covers</a></li>
                  </ul>
                </div>
                
                {/* Seasonal Column */}
                <div>
                  <h3 className="font-medium text-primary mb-3">Seasonal</h3>
                  <ul className="space-y-2">
                    <li><a href="/shop?category=seasonal" className="text-sm text-gray-700 hover:text-primary">Valentine's Day</a></li>
                    <li><a href="/shop?category=seasonal" className="text-sm text-gray-700 hover:text-primary">Easter</a></li>
                    <li><a href="/shop?category=seasonal" className="text-sm text-gray-700 hover:text-primary">Pastor Appreciation Month</a></li>
                    <li><a href="/shop?category=seasonal" className="text-sm text-gray-700 hover:text-primary">Thanksgiving</a></li>
                    <li><a href="/shop?category=seasonal" className="text-sm text-gray-700 hover:text-primary">Christmas</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Menu - Shows below 1280px */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white shadow-lg absolute w-full z-50">
          <div className="flex flex-col p-4 gap-4">
            <Button
              variant="light"
              className="w-full justify-start py-2 px-4 hover:bg-gray-100 rounded-md"
              as="a"
              href="/shop"
            >
              Shop All
            </Button>
            
            <Link 
              to="/about-us" 
              className="py-2 px-4 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/gift-cards" 
              className="py-2 px-4 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Gift Cards
            </Link>
            <Link 
              to="/the-bookshelf" 
              className="py-2 px-4 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              The Bookshelf
            </Link>
            <Link 
              to="/contact-us" 
              className="py-2 px-4 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};