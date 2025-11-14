import React from "react";
import { 
  Tabs, 
  Tab, 
  Button, 
  Input, 
  Textarea, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Pagination,
  Card,
  CardBody
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../hooks/use-auth.tsx";
import { products } from "../data/products";

interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
  inStock: boolean;
}

export const AdminPage: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = React.useState("products");
  const [productsList, setProductsList] = React.useState<Product[]>(products);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = React.useState<keyof Product>("title");
  
  // Product form state
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentProduct, setCurrentProduct] = React.useState<Product>({
    id: "",
    title: "",
    price: 0,
    imageUrl: "",
    category: "",
    description: "",
    inStock: true
  });
  
  // Delete confirmation modal
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
    onClose: onDeleteModalClose
  } = useDisclosure();
  const [productToDelete, setProductToDelete] = React.useState<string | null>(null);
  
  // Add new state for image upload
  const [uploadedImage, setUploadedImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  
  const itemsPerPage = 10;
  
  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    return productsList
      .filter(product => {
        const matchesSearch = searchTerm === "" || 
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];
        
        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          return sortOrder === 'asc' 
            ? fieldA.localeCompare(fieldB) 
            : fieldB.localeCompare(fieldA);
        }
        
        // For numeric fields
        const numA = Number(fieldA);
        const numB = Number(fieldB);
        
        return sortOrder === 'asc' ? numA - numB : numB - numA;
      });
  }, [productsList, searchTerm, selectedCategory, sortField, sortOrder]);
  
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const categories = [
    { id: "", name: "All Categories" },
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
  
  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
  
  const handleAddProduct = () => {
    setIsEditing(false);
    setCurrentProduct({
      id: `${Date.now()}`,
      title: "",
      price: 0,
      imageUrl: "",
      category: "",
      description: "",
      inStock: true,
      stockQuantity: 10
    });
    setUploadedImage(null);
    setImagePreview(null);
    onOpen();
  };
  
  const handleEditProduct = (product: Product) => {
    return
    setIsEditing(true);
    setCurrentProduct({ ...product });
    setUploadedImage(null);
    setImagePreview(product.imageUrl);
    onOpen();
  };
  
  // Add image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        
        // Update the product's imageUrl with the local file path
        // In a real implementation, this would be replaced with an actual upload
        setCurrentProduct(prev => ({
          ...prev,
          imageUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id);
    onDeleteModalOpen();
  };
  
  const confirmDelete = () => {
    if (productToDelete) {
      setProductsList(prev => prev.filter(p => p.id !== productToDelete));
      onDeleteModalClose();
      setProductToDelete(null);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value
    }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setCurrentProduct(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Update handleSaveProduct to handle the uploaded image
  const handleSaveProduct = () => {
    // In a real implementation, you would upload the image to your server here
    // and then update the product with the returned URL
    
    if (isEditing) {
      setProductsList(prev => 
        prev.map(p => p.id === currentProduct.id ? currentProduct : p)
      );
    } else {
      setProductsList(prev => [...prev, currentProduct]);
    }
    onClose();
  };
  
  // Add confirmation for logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      // Redirect to home page after logout
      window.location.href = "/";
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <Button 
          color="danger" 
          variant="light"
          onPress={handleLogout}
          startContent={<Icon icon="lucide:log-out" width={18} />}
        >
          Logout
        </Button>
      </div>
      
      <Tabs 
        aria-label="Admin Sections"
        selectedKey={activeTab}
        onSelectionChange={setActiveTab as any}
        variant="underlined"
        color="primary"
        className="w-full"
      >
        <Tab key="products" title="Products">
          <Card>
            <CardBody>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <Button
                  color="primary"
                  startContent={<Icon icon="lucide:plus" width={18} />}
                  onPress={handleAddProduct}
                >
                  Add New Product
                </Button>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    startContent={<Icon icon="lucide:search" className="text-gray-400" width={16} />}
                    className="w-full sm:w-auto"
                  />
                  
                  <Dropdown>
                    <DropdownTrigger>
                      <Button 
                        variant="bordered"
                        endContent={<Icon icon="lucide:chevron-down" width={16} />}
                      >
                        {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : "All Categories"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu 
                      aria-label="Category options"
                      onAction={(key) => {
                        setSelectedCategory(key as string);
                        setCurrentPage(1);
                      }}
                      selectedKeys={[selectedCategory]}
                      selectionMode="single"
                    >
                      {categories.map((category) => (
                        <DropdownItem key={category.id}>{category.name}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              
              <Table 
                aria-label="Products table"
                removeWrapper
                className="mb-6"
              >
                <TableHeader>
                  <TableColumn 
                    onClick={() => handleSort('title')} 
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      TITLE
                      {sortField === 'title' && (
                        <Icon 
                          icon={sortOrder === 'asc' ? "lucide:chevron-up" : "lucide:chevron-down"} 
                          width={16} 
                          className="ml-1" 
                        />
                      )}
                    </div>
                  </TableColumn>
                  <TableColumn 
                    onClick={() => handleSort('price')} 
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      PRICE
                      {sortField === 'price' && (
                        <Icon 
                          icon={sortOrder === 'asc' ? "lucide:chevron-up" : "lucide:chevron-down"} 
                          width={16} 
                          className="ml-1" 
                        />
                      )}
                    </div>
                  </TableColumn>
                  <TableColumn 
                    onClick={() => handleSort('category')} 
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      CATEGORY
                      {sortField === 'category' && (
                        <Icon 
                          icon={sortOrder === 'asc' ? "lucide:chevron-up" : "lucide:chevron-down"} 
                          width={16} 
                          className="ml-1" 
                        />
                      )}
                    </div>
                  </TableColumn>
                  <TableColumn>STOCK STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No products found">
                  {currentProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.imageUrl} 
                            alt={product.title}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <div className="truncate max-w-[200px]">{product.title}</div>
                        </div>
                      </TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {categories.find(c => c.id === product.category)?.name || product.category}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => handleEditProduct(product)}
                            aria-label="Edit product"
                          >
                            <Icon icon="lucide:edit" width={16} />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => handleDeleteProduct(product.id)}
                            aria-label="Delete product"
                          >
                            <Icon icon="lucide:trash-2" width={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination
                    total={totalPages}
                    initialPage={currentPage}
                    onChange={setCurrentPage}
                  />
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="categories" title="Categories">
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-4">Category Management</h2>
              <p className="text-gray-600 mb-6">
                Manage product categories and subcategories. This section will be connected to the database in the future.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.filter(c => c.id !== "").map((category) => (
                  <Card key={category.id} className="shadow-sm">
                    <CardBody className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{category.name}</h3>
                        <div className="flex gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="Edit category"
                          >
                            <Icon icon="lucide:edit" width={16} />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            aria-label="Delete category"
                          >
                            <Icon icon="lucide:trash-2" width={16} />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm mt-2">
                        {productsList.filter(p => p.category === category.id).length} products
                      </p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="orders" title="Orders">
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Management</h2>
              <p className="text-gray-600 mb-6">
                View and manage customer orders. This section will be connected to the database in the future.
              </p>
              
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <Icon icon="lucide:package" className="mx-auto mb-4 text-gray-400" width={48} />
                  <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
                  <p className="text-gray-600">
                    Orders will appear here once customers start making purchases.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="customers" title="Customers">
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
              <p className="text-gray-600 mb-6">
                View and manage customer accounts. This section will be connected to the database in the future.
              </p>
              
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <Icon icon="lucide:users" className="mx-auto mb-4 text-gray-400" width={48} />
                  <h3 className="text-lg font-medium mb-2">No Customers Yet</h3>
                  <p className="text-gray-600">
                    Customer accounts will appear here once they register.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="settings" title="Settings">
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-4">Store Settings</h2>
              <p className="text-gray-600 mb-6">
                Configure store settings and preferences. This section will be connected to the database in the future.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">General Settings</h3>
                  <div className="space-y-4">
                    <Input
                      label="Store Name"
                      defaultValue="Manna on Main"
                      fullWidth
                    />
                    <Textarea
                      label="Store Description"
                      defaultValue="Your source for Christian books, gifts, and more in High Point, NC."
                      fullWidth
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Contact Information</h3>
                  <div className="space-y-4">
                    <Input
                      label="Email Address"
                      defaultValue="info@mannaonmain.com"
                      fullWidth
                    />
                    <Input
                      label="Phone Number"
                      defaultValue="(336) 434-4663"
                      fullWidth
                    />
                    <Input
                      label="Address"
                      defaultValue="1101 N Main St #202, High Point, NC 27262"
                      fullWidth
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Store Hours</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Monday"
                      defaultValue="10 AM–6 PM"
                      fullWidth
                    />
                    <Input
                      label="Tuesday"
                      defaultValue="10 AM–6 PM"
                      fullWidth
                    />
                    <Input
                      label="Wednesday"
                      defaultValue="10 AM–6 PM"
                      fullWidth
                    />
                    <Input
                      label="Thursday"
                      defaultValue="10 AM–6 PM"
                      fullWidth
                    />
                    <Input
                      label="Friday"
                      defaultValue="10 AM–6 PM"
                      fullWidth
                    />
                    <Input
                      label="Saturday"
                      defaultValue="10 AM–4 PM"
                      fullWidth
                    />
                    <Input
                      label="Sunday"
                      defaultValue="Closed"
                      fullWidth
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button color="primary">
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      
      {/* Product Form Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{isEditing ? "Edit Product" : "Add New Product"}</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4 md:col-span-2">
                    <Input
                      label="Product Title"
                      name="title"
                      value={currentProduct.title}
                      onChange={handleInputChange}
                      isRequired
                      fullWidth
                    />
                  </div>
                  
                  <Input
                    label="Price ($)"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={currentProduct.price.toString()}
                    onChange={handleInputChange}
                    isRequired
                    startContent="$"
                  />
                  
                  <Dropdown>
                    <DropdownTrigger>
                      <Button 
                        variant="bordered"
                        className="w-full justify-start"
                        endContent={<Icon icon="lucide:chevron-down" width={16} />}
                      >
                        {currentProduct.category ? 
                          categories.find(c => c.id === currentProduct.category)?.name || currentProduct.category : 
                          "Select Category"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu 
                      aria-label="Category selection"
                      onAction={(key) => {
                        setCurrentProduct(prev => ({
                          ...prev,
                          category: key as string
                        }));
                      }}
                      selectedKeys={[currentProduct.category]}
                      selectionMode="single"
                    >
                      {categories.filter(c => c.id !== "").map((category) => (
                        <DropdownItem key={category.id}>{category.name}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  
                  {/* Replace the image URL input with an image upload section */}
                  <div className="md:col-span-2">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Product Image</label>
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                          <div className="flex-1">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="product-image-upload"
                            />
                            <label htmlFor="product-image-upload">
                              <Button
                                as="span"
                                variant="bordered"
                                startContent={<Icon icon="lucide:upload" width={16} />}
                                className="cursor-pointer mb-2"
                                fullWidth
                              >
                                Upload Image
                              </Button>
                            </label>
                            
                            <p className="text-xs text-gray-500 mb-2">
                              Or enter image URL directly:
                            </p>
                            
                            <Input
                              placeholder="Image URL (optional if uploading)"
                              name="imageUrl"
                              value={uploadedImage ? '' : currentProduct.imageUrl}
                              onChange={handleInputChange}
                              disabled={!!uploadedImage}
                              fullWidth
                            />
                          </div>
                          
                          {/* Image preview */}
                          {imagePreview && (
                            <div className="w-32 h-32 border rounded-md overflow-hidden relative">
                              <img 
                                src={imagePreview} 
                                alt="Product preview" 
                                className="w-full h-full object-cover"
                              />
                              <Button
                                isIconOnly
                                size="sm"
                                color="danger"
                                variant="solid"
                                className="absolute top-1 right-1"
                                onPress={() => {
                                  setUploadedImage(null);
                                  setImagePreview(null);
                                  setCurrentProduct(prev => ({
                                    ...prev,
                                    imageUrl: ''
                                  }));
                                }}
                              >
                                <Icon icon="lucide:x" width={14} />
                              </Button>
                            </div>
                          )}
                        </div>
                        {!imagePreview && (
                          <p className="text-danger text-xs">Please upload an image or provide an image URL</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Textarea
                      label="Product Description"
                      name="description"
                      value={currentProduct.description || ""}
                      onChange={handleInputChange}
                      minRows={3}
                      fullWidth
                    />
                  </div>
                  
                  <div>
                    <Checkbox
                      isSelected={currentProduct.inStock}
                      onValueChange={(checked) => handleCheckboxChange("inStock", checked)}
                    >
                      In Stock
                    </Checkbox>
                  </div>
                  
                  <Input
                    label="Stock Quantity"
                    name="stockQuantity"
                    type="number"
                    min="0"
                    value={currentProduct.stockQuantity?.toString() || "0"}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setCurrentProduct(prev => ({
                        ...prev,
                        stockQuantity: isNaN(value) ? 0 : value,
                        inStock: isNaN(value) ? false : value > 0
                      }));
                    }}
                    disabled={!currentProduct.inStock}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleSaveProduct}
                  isDisabled={!currentProduct.title || !imagePreview || !currentProduct.category}
                >
                  {isEditing ? "Update Product" : "Add Product"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onOpenChange={onDeleteModalOpenChange} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this product? This action cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={confirmDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};