import React from "react";
import { useLocation } from "react-router-dom";
import { 
  Breadcrumbs, 
  BreadcrumbItem, 
  Input, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button,
  Checkbox,
  Pagination
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { ProductCard } from "../components/product-card";
import { products } from "../data/products";

export const ShopPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const subcategoryParam = queryParams.get("subcategory");
  
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState(categoryParam || "");
  const [sortOption, setSortOption] = React.useState("featured");
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 100]);
  const [inStockOnly, setInStockOnly] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  
  const itemsPerPage = 12;
  
  const filteredProducts = React.useMemo(() => {
    return products.filter(product => {
      // Filter by search term
      if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filter by category
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      
      // Filter by price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      // Filter by stock status
      if (inStockOnly && !product.inStock) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "name-a-z":
          return a.title.localeCompare(b.title);
        case "name-z-a":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedCategory, sortOption, priceRange, inStockOnly]);
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const categories = [
    { id: "bibles", name: "Bibles" },
    { id: "bible-accessories", name: "Bible Accessories" },
    { id: "books", name: "Books" },
    { id: "children", name: "Children" },
    { id: "home-outdoor", name: "Home/Outdoor" },
    { id: "church-supplies", name: "Church Supplies" },
    { id: "jewelry", name: "Jewelry" },
    { id: "apparel-accessories", name: "Apparel/Accessories" },
    { id: "seasonal", name: "Seasonal" },
  ];
  
  const getCategoryName = (id: string) => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : id;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Shop</BreadcrumbItem>
        {selectedCategory && (
          <BreadcrumbItem isCurrent>{getCategoryName(selectedCategory)}</BreadcrumbItem>
        )}
      </Breadcrumbs>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox
                    isSelected={selectedCategory === category.id}
                    onValueChange={(isSelected) => {
                      setSelectedCategory(isSelected ? category.id : "");
                      setCurrentPage(1);
                    }}
                  >
                    {category.name}
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Price Range</h2>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={priceRange[0].toString()}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    setPriceRange([value, priceRange[1]]);
                    setCurrentPage(1);
                  }
                }}
                startContent="$"
                size="sm"
              />
              <span>to</span>
              <Input
                type="number"
                placeholder="Max"
                value={priceRange[1].toString()}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    setPriceRange([priceRange[0], value]);
                    setCurrentPage(1);
                  }
                }}
                startContent="$"
                size="sm"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Availability</h2>
            <Checkbox
              isSelected={inStockOnly}
              onValueChange={(isSelected) => {
                setInStockOnly(isSelected);
                setCurrentPage(1);
              }}
            >
              In Stock Only
            </Checkbox>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-semibold">
              {selectedCategory ? getCategoryName(selectedCategory) : "All Products"}
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                startContent={<Icon icon="lucide:search" className="text-gray-400" />}
                className="w-full sm:w-auto"
              />
              
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="bordered"
                    endContent={<Icon icon="lucide:chevron-down" width={16} />}
                  >
                    {sortOption === "featured" && "Featured"}
                    {sortOption === "price-low-high" && "Price: Low to High"}
                    {sortOption === "price-high-low" && "Price: High to Low"}
                    {sortOption === "name-a-z" && "Name: A to Z"}
                    {sortOption === "name-z-a" && "Name: Z to A"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Sort options"
                  onAction={(key) => {
                    setSortOption(key as string);
                    setCurrentPage(1);
                  }}
                  selectedKeys={[sortOption]}
                  selectionMode="single"
                >
                  <DropdownItem key="featured">Featured</DropdownItem>
                  <DropdownItem key="price-low-high">Price: Low to High</DropdownItem>
                  <DropdownItem key="price-high-low">Price: High to Low</DropdownItem>
                  <DropdownItem key="name-a-z">Name: A to Z</DropdownItem>
                  <DropdownItem key="name-z-a">Name: Z to A</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
          
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  inStock={product.inStock}
                  stockLevel={product.stockQuantity <= 0 ? "out" : product.stockQuantity <= 5 ? "low" : "high"}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon icon="lucide:search-x" className="mx-auto mb-4 text-gray-400" width={48} />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                total={totalPages}
                initialPage={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};