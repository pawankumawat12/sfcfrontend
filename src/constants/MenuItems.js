import {
  GridIcon,
  ListIcon,
  SettingsIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "../assets/svg/SvgIcons";


export const sidebarMenu = [
  {
    title: "Main",
    items: [
      {
        icon: GridIcon,
        name: "Dashboard",
        path: "",
      },

      {
        icon: GridIcon,
        name: "Products",
        subItems: [
          { name: "All products", path: "/admin/products" },
          { name: "Categories", path: "/admin/category" },
          { name: "Offers", path: "/admin" },
        ],
      },
      {
        icon: UserGroupIcon,
        name: "User management",
        subItems: [{ name: "Users list", path: "/admin/users  " }],
      },
      {
        icon: ListIcon,
        name: "Games management",
        subItems: [
          { name: "All games", path: "/admin/games" },
          { name: "Categories", path: "/admin/category" },
          { name: "Featured games", path: "/admin/featured_games" },
        ],
      },

      {
        icon: UserGroupIcon,
        name: " Order management",
        subItems: [{ name: "Orders list", path: "/admin/orders" }],
      },
      {
        icon: SettingsIcon,
        name: "Settings",
        subItems: [
          { name: "Site settings", path: "/admin" },
        ],
      },
    ],
  },
];

export const userMenuItems = [
  { id: 1, text: "My profile", href: "/admin", icon: UserCircleIcon },
  {
    id: 2,
    text: "Account setting",
    href: "/admin",
    icon: SettingsIcon,
  },
];

//dummy data
export const gameDummyData = [
  {
    id: 1,
    thumbnail: "/images/games/flappy.png",
    name: "Flappy Bird",
    category: "Arcade",
    featured: true,
    status: "active",
  },
  {
    id: 2,
    thumbnail: "/images/games/car.png",
    name: "Car Racing",
    category: "Racing",
    featured: true,
    status: "active",
  },
  {
    id: 3,
    thumbnail: "/images/games/puzzle.png",
    name: "Block Puzzle",
    category: "Puzzle",
    featured: true,
    status: "inactive",
  },
  {
    id: 4,
    thumbnail: "/images/games/shooter.png",
    name: "Zombie Shooter",
    category: "Action",
    featured: false,
    status: "active",
  },
];

export const categoryDummyData = [
  {
    id: 1,
    Thumbnail: "/images/categories/action.png",
    CategoryName: "Action",
    Slug: "action",
    TotalGames: 42,
    Status: "active",
    CreatedAt: "2024-01-10",
  },
  {
    id: 2,
    Thumbnail: "/images/categories/puzzle.png",
    CategoryName: "Puzzle",
    Slug: "puzzle",
    TotalGames: 28,
    Status: "active",
    CreatedAt: "2024-02-01",
  },
  {
    id: 3,
    Thumbnail: "/images/categories/racing.png",
    CategoryName: "Racing",
    Slug: "racing",
    TotalGames: 15,
    Status: "inactive",
    CreatedAt: "2023-12-20",
  },
];

export const productDummyData = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    name: "Cappuccino",
    category: "Coffee",
    price: 150,
    discount: 10,
    offer: "10% OFF",
    type: "Veg",
    stock: "In Stock",
    featured: true,
    status: "active",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1498804103079-a6351b050096",
    name: "Cold Coffee",
    category: "Cold Beverage",
    price: 180,
    discount: 0,
    offer: "",
    type: "Veg",
    stock: "Out of Stock",
    featured: false,
    status: "inactive",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1605475128023-58d8bff2c4e4",
    name: "Veg Sandwich",
    category: "Snacks",
    price: 120,
    discount: 20,
    offer: "Flat ₹20 OFF",
    type: "Veg",
    stock: "In Stock",
    featured: true,
    status: "active",
  },
];

export const productCategoryDummyData = [
  {
    id: 1,
    image: "https://via.placeholder.com/80",
    name: "Coffee",
    parentCategory: null,
    level: 0,
    status: "active",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/80",
    name: "Hot Coffee",
    parentCategory: "Coffee",
    level: 1,
    status: "active",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/80",
    name: "Cold Coffee",
    parentCategory: "Coffee",
    level: 1,
    status: "inactive",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/80",
    name: "Latte",
    parentCategory: "Hot Coffee",
    level: 2,
    status: "active",
  },
];
