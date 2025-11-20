import {
    BlogDataType,
    CategoiryList,
    Coupon,
    DashboardSidebarItem,
    Item,
    ProductDetailType,
    ProductVariantType,
    RecentlyViewedList,
    ServiceBlockType,
    TagsDataType,
} from '@/types/MockData';
import { BsSmartwatch } from 'react-icons/bs';
import { CiCamera, CiHeadphones, CiLocationOn, CiMail, CiMobile1, CiMonitor } from 'react-icons/ci';
import { FaAddressCard, FaCcMastercard, FaCcPaypal, FaClipboardList, FaShippingFast, FaWhatsapp } from 'react-icons/fa';
import { GiConsoleController, GiReturnArrow } from 'react-icons/gi';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { RiSecurePaymentFill, RiVisaLine } from 'react-icons/ri';
import { TbCertificate } from 'react-icons/tb';
import { randomImage } from './libs/Helper';
import { ProductVariantAttributes } from './Pages/Backend/Product/Edit';
import { ProductType } from './types/Product';

export const OrderData = [
    {
        picture: randomImage(1, '600/400'),
        name: 'iPhone 15 Pro Max',
        price: 150000,
        discount: 10.99,
        freeShipping: true,
        orderDate: '2024-12-01',
        deliveredDate: '2024-12-05',
        deliveryState: 'Delivered',
        quantity: 1,
    },
    {
        picture: randomImage(1, '600/400'),
        name: 'MacBook Pro 16-inch',
        price: 250000,
        discount: 10.99,
        freeShipping: true,
        orderDate: '2024-12-02',
        deliveredDate: '2024-12-06',
        deliveryState: 'Delivered',
        quantity: 1,
    },
    {
        picture: randomImage(1, '600/400'),
        name: 'Samsung Galaxy S24 Ultra',
        price: 180000,
        discount: 10.99,
        freeShipping: true,
        orderDate: '2024-12-03',
        deliveredDate: '2024-12-07',
        deliveryState: 'Pending',
        quantity: 2,
    },
    {
        picture: randomImage(1, '600/400'),
        name: 'Sony WH-1000XM5 Headphones',
        price: 55000,
        discount: 10.99,
        freeShipping: true,
        orderDate: '2024-12-04',
        deliveredDate: '2024-12-09',
        deliveryState: 'Pending',
        quantity: 1,
    },
    {
        picture: randomImage(1, '600/400'),
        name: 'Logitech MX Master 3S Mouse',
        price: 15000,
        discount: 10.99,
        freeShipping: true,
        orderDate: '2024-12-05',
        deliveredDate: '2024-12-10',
        deliveryState: 'Delivered',
        quantity: 3,
    },
    {
        picture: randomImage(1, '600/400'),
        name: 'Logitech MX Master 3S Mouse',
        price: 15000,
        discount: 10.99,
        freeShipping: true,
        orderDate: '2024-12-05',
        deliveredDate: '2024-12-10',
        deliveryState: 'Delivered',
        quantity: 3,
    },
    {
        picture: randomImage(1, '600/400'),
        name: 'Logitech MX Master 3S Mouse',
        price: 15000,
        discount: 10.99,
        freeShipping: true,
        orderDate: '2024-12-05',
        deliveredDate: '2024-12-10',
        deliveryState: 'Delivered',
        quantity: 3,
    },
    {
        picture: randomImage(1, '600/400'),
        name: 'Logitech MX Master 3S Mouse',
        price: 15000,
        discount: 10.99,
        freeShipping: true,
        orderDate: '2024-12-05',
        deliveredDate: '2024-12-10',
        deliveryState: 'Delivered',
        quantity: 3,
    },
];

export const AccordianList = [
    {
        href: '/admin',
        title: 'Admin Manage',
        icon: 'fa fa-user-cog',
        subMenu: [
            {
                href: '/admin/all-admin',
                title: 'All Admin',
                icon: 'fa fa-users',
            },
            {
                href: '/admin/add-new',
                title: 'Add New Admin',
                icon: 'fa fa-user-plus',
            },
            {
                href: '/admin/roles',
                title: 'Roles',
                icon: 'fa fa-cogs',
            },
        ],
    },
    {
        href: '/users',
        title: 'Users Manage',
        icon: 'fa fa-users',
        subMenu: [
            {
                href: '/admin/all-admin',
                title: 'All Admin',
                icon: 'fa fa-users',
            },
        ],
    },
];

export const categories = [
    { id: 1, name: 'Home & Living' },
    { id: 2, name: 'Fashion' },
    { id: 3, name: 'Electronics' },
    { id: 4, name: 'Personal Care & Beauty' },
    { id: 5, name: 'Kids & Babies' },
    { id: 6, name: 'Arts & Crafts' },
    { id: 7, name: 'Health & Wellness' },
];

const badgeArray = ['new', 'sale', 'hot', ''];
const deliveryStatus = ['upcoming', 'current', 'completed'];
const productGenerate = (count = 20): ProductType[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: 'GigaTech Xtreme 7.1 Headset',
        description: 'High-performance gaming headset with surround sound and noise isolation.',
        price: 200,
        unit: 100,
        discount: 20,
        slug: 'test-rwt',
        badge: badgeArray[Math.floor(Math.random() * 4)],
        freeShipping: true,
        saledEndsIn: '2025-04-10T09:30:00.000Z',
        category: 'Electronics',
        imageUrl: `https://picsum.photos/200/300?random=${i * 10}`,
        gallery: [
            { imageUrl: 'https://picsum.photos/200/300?random=101' },
            { imageUrl: 'https://picsum.photos/200/300?random=202' },
            { imageUrl: 'https://picsum.photos/200/300?random=303' },
            { imageUrl: 'https://picsum.photos/200/300?random=404' },
        ],
        relatedProducts: [],
        stock: 50,
        rating: 4.6,
        information: [
            { label: 'Weight', value: '350 g' },
            { label: 'Dimensions', value: '18 × 10 × 7 cm' },
            { label: 'Color', value: 'black, silver' },
            { label: 'Brand', value: 'GigaTech' },
            { label: 'Form Factor', value: 'Wired' },
            { label: 'Quantity', value: '1' },
            { label: 'Container Type', value: 'Box' },
            { label: 'Shelf Life', value: '12 Months' },
            { label: 'Other Features', value: 'Surround sound, Noise isolation' },
        ],
        vendorName: 'GigaTech',
        reviews: [
            {
                userId: 1,
                comment: 'Awesome sound and very comfortable.',
                rating: 5,
                createdAt: '2025-01-10',
            },
            {
                userId: 2,
                comment: 'The headset is great, but the price is a bit high.',
                rating: 4,
                createdAt: '2025-01-15',
            },
        ],
        trackingSteps: [
            {
                title: 'Order Received',
                status: deliveryStatus[Math.floor(Math.random() * deliveryStatus.length)] as 'completed' | 'current' | 'upcoming',
            },
            {
                title: 'Preparing Your Order',
                status: deliveryStatus[Math.floor(Math.random() * deliveryStatus.length)] as 'completed' | 'current' | 'upcoming',
                subSteps: [
                    {
                        description: 'In Transit',
                        timestamp: 'Feb 20, 2025 at 09:00AM',
                        location: 'LOS ANGELES, CA',
                    },
                    {
                        description: 'Shipment Acknowledged',
                        timestamp: 'Feb 20, 2025 at 02:00PM',
                        location: 'SANTA MONICA, CA',
                    },
                ],
            },
            {
                title: 'Shipped',
                status: 'upcoming',
                carrier: 'FedEx',
                shippedDate: 'Feb 20, 2025',
                trackingNumber: '1Z1234567890123456',
                subSteps: [
                    {
                        description: 'In Transit',
                        timestamp: 'Feb 20, 2025 at 09:00AM',
                        location: 'LOS ANGELES, CA',
                    },
                ],
            },
            {
                title: 'Delivered',
                status: deliveryStatus[Math.floor(Math.random() * deliveryStatus.length)] as 'completed' | 'current' | 'upcoming',
            },
        ],
    }));
};
export const mockProducts: ProductType[] = productGenerate();

export const mockMenuData: DashboardSidebarItem[] = [
    {
        id: 1,
        title: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
    },
    {
        id: 2,
        title: 'User  Management',
        icon: 'fas fa-users',
        subMenu: [
            { id: 3, title: 'Users', icon: 'fas fa-user' },
            { id: 4, title: 'Roles', icon: 'fas fa-user-tag' },
            { id: 5, title: 'Permissions', icon: 'fas fa-user-shield' },
        ],
    },
    {
        id: 6,
        title: 'Settings',
        icon: 'fas fa-cog',
        subMenu: [
            { id: 7, title: 'General', icon: 'fas fa-cogs' },
            { id: 8, title: 'Security', icon: 'fas fa-lock' },
        ],
    },
    {
        id: 9,
        title: 'Reports',
        icon: 'fas fa-chart-line',
    },
];

export const adminSideNavData = [
    {
        id: 1,
        title: 'All Users',
        icon: 'fas fa-tachometer-alt',
        href: '#',
        subMenu: null,
    },
    {
        id: 2,
        title: 'Roles & Permissions',
        icon: 'fas fa-users',
        href: '#',
        subMenu: [
            { id: 1, title: 'Roles', icon: 'fas fa-user-tag', href: '/roles/all' },
            { id: 2, title: 'Permissions', icon: 'fas fa-user-shield', href: '/permissions/all' },
        ],
    },
    {
        id: 6,
        title: 'General Setting',
        icon: 'fas fa-cog',
        href: '#',
        subMenu: [
            { id: 7, title: 'General', icon: 'fas fa-cogs', href: '/general-setting' },
            { id: 8, title: 'Security', icon: 'fas fa-lock', href: '/security-setting' },
        ],
    },
    {
        id: 9,
        title: 'Change Password',
        icon: 'fas fa-chart-line',
        href: '/account-setting',
        subMenu: null,
    },
];

export const userSideNavData = [
    {
        id: 1,
        title: 'Account Info',
        icon: 'fas fa-tachometer-alt',
        href: '#',
        subMenu: null,
    },
    {
        id: 2,
        title: 'Profile Setting',
        icon: 'fas fa-users',
        href: '#',
        subMenu: [{ id: 3, title: 'Password', icon: 'fas fa-user', href: '/passwords' }],
    },
    {
        id: 6,
        title: 'General Setting',
        icon: 'fas fa-cog',
        href: '#',
        subMenu: [
            { id: 7, title: 'General', icon: 'fas fa-cogs', href: '/general-setting' },
            { id: 8, title: 'Security', icon: 'fas fa-lock', href: '/security-setting' },
        ],
    },
    {
        id: 9,
        title: 'Change Password',
        icon: 'fas fa-chart-line',
        href: '#',
        subMenu: null,
    },
];

export const vendorSideNavData = [
    {
        id: 1,
        title: 'Account Info',
        icon: 'fas fa-tachometer-alt',
        // href:'/account-info',
        href: '#',
        subMenu: null,
    },
    {
        id: 2,
        title: 'Profile Setting',
        icon: 'fas fa-users',
        href: '#',
        subMenu: [{ id: 3, title: 'Password', icon: 'fas fa-user', href: '/passwords' }],
    },
    {
        id: 6,
        title: 'General Setting',
        icon: 'fas fa-cog',
        href: '#',
        subMenu: [
            { id: 7, title: 'General', icon: 'fas fa-cogs', href: '/general-setting' },
            { id: 8, title: 'Security', icon: 'fas fa-lock', href: '/security-setting' },
        ],
    },
    {
        id: 9,
        title: 'Change Password',
        icon: 'fas fa-chart-line',
        href: '/account-setting',
        subMenu: null,
    },
];

export const mockNotificationData = [
    {
        id: 1,
        title: 'New message from John Doe',
        description: 'You have received a new message from John Doe. Please check your inbox.',
        date: '2023-10-01T14:30:00Z', // ISO 8601 format
        by: 'John Doe',
    },
    {
        id: 2,
        title: 'Password Change Notification',
        description: 'Your password has been successfully changed. If you did not make this change, please contact support.',
        date: '2023-10-02T09:15:00Z',
        by: 'System',
    },
    {
        id: 3,
        title: 'New Comment on Your Post',
        description: 'Jane Smith commented on your post. Click here to view the comment.',
        date: '2023-10-03T11:45:00Z',
        by: 'Jane Smith',
    },
    {
        id: 4,
        title: 'You Have a New Follower',
        description: 'Alice Johnson has started following you. Check out her profile!',
        date: '2023-10-04T08:00:00Z',
        by: 'Alice Johnson',
    },
    {
        id: 5,
        title: 'Scheduled Maintenance Notification',
        description: 'We will be performing scheduled maintenance on October 5th from 10:00 PM to 12:00 AM. Please plan accordingly.',
        date: '2023-10-05T10:00:00Z',
        by: 'Admin',
    },
];

export const mockChatData = [
    {
        id: 1,
        username: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        message: 'Hey! How are you doing?',
        time: '2 mins ago', // Time indicator
    },
    {
        id: 2,
        username: 'Jane Smith',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        message: "I'm doing great, thanks! How about you?",
        time: '5 mins ago',
    },
    {
        id: 3,
        username: 'Alice Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        message: 'Just finished my project. Excited to share it!',
        time: '10 mins ago',
    },
    {
        id: 4,
        username: 'Bob Brown',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        message: "Let's catch up later this week.",
        time: '1 hour ago',
    },
    {
        id: 5,
        username: 'Charlie Green',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        message: 'Did you see the latest news?',
        time: '2 hours ago',
    },
    {
        id: 6,
        username: 'Diana Prince',
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
        message: "I can't believe how fast this week is going!",
        time: '1 day ago',
    },
    {
        id: 7,
        username: 'Ethan Hunt',
        avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
        message: 'Looking forward to the weekend!',
        time: '2 days ago',
    },
];

export const bannerSlider = [
    {
        image: randomImage(1, '600/400'),
        slug: 'quantumcore-pro-gaming-motherboard',
        title: 'Smart Watch',
        subtitle: 'Flat 30% Off',
        buttonText: 'Shop Now',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore modi facilis, provident est sint culpa excepturi maxime natus voluptate eius.',
    },
    {
        image: randomImage(2, '600/400'),
        slug: 'quantumcore-pro-gaming-motherboard',
        title: 'Polaroid Camera',
        subtitle: 'Flat 30% Off',
        buttonText: 'Shop Now',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore modi facilis, provident est sint culpa excepturi maxime natus voluptate eius.',
    },
    {
        image: randomImage(3, '600/400'),
        slug: 'quantumcore-pro-gaming-motherboard',
        title: 'Serum',
        subtitle: 'Flat 30% Off',
        buttonText: 'Shop Now',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore modi facilis, provident est sint culpa excepturi maxime natus voluptate eius.',
    },
    {
        image: randomImage(4, '600/400'),
        slug: 'quantumcore-pro-gaming-motherboard',
        title: 'Curology',
        subtitle: 'Flat 30% Off',
        buttonText: 'Shop Now',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore modi facilis, provident est sint culpa excepturi maxime natus voluptate eius.',
    },
    {
        image: randomImage(5, '600/400'),
        slug: 'quantumcore-pro-gaming-motherboard',
        title: 'Fash Wash',
        subtitle: 'Flat 30% Off',
        buttonText: 'Shop Now',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore modi facilis, provident est sint culpa excepturi maxime natus voluptate eius.',
    },
];

export const Categories: CategoiryList[] = [
    { name: 'Phone', icon: CiMobile1, href: '#' },
    { name: 'Computer', icon: CiMonitor, href: '#' },
    { name: 'SmartWatch', icon: BsSmartwatch, href: '#' },
    { name: 'Camera', icon: CiCamera, href: '#' },
    { name: 'Headphone', icon: CiHeadphones, href: '#' },
    { name: 'Gaming', icon: GiConsoleController, href: '#' },
];

export const RecentlyViewed: RecentlyViewedList[] = [
    {
        image: randomImage(1, '100/100'),
        name: 'Smart Watch',
        price: 579.0,
        discount: 35,
        newArrival: true,
    },
    {
        image: randomImage(2, '100/100'),
        name: 'Wireless Headphones',
        price: 199.99,
    },
    {
        image: randomImage(3, '100/100'),
        name: 'Gaming Console',
        price: 499.0,
        discount: 15,
        newArrival: true,
    },
    {
        image: randomImage(4, '100/100'),
        name: '4K Camera',
        price: 899.0,
        discount: 25,
    },
    {
        image: randomImage(5, '100/100'),
        name: 'Laptop',
        price: 1299.0,
        newArrival: true,
    },
];

export const ServiceBlockData: ServiceBlockType[] = [
    {
        icon: FaShippingFast,
        title: 'Free Shipping',
        description: 'Free shipping on all US order or above $200',
    },
    {
        icon: MdOutlineSupportAgent,
        title: '24x7 Support',
        description: 'Contact us 24 hours a day, 7 days a week ',
    },
    {
        icon: GiReturnArrow,
        title: '30 Days Return',
        description: 'Simply return it within 30 days for an exchange',
    },
    {
        icon: RiSecurePaymentFill,
        title: 'Payment Secure',
        description: 'Contact us 24 hours a day, 7 days a week',
    },
];

export const TrendingSearchData: TagsDataType[] = [
    { title: 'Vacuum Robot', href: '/search/vacuum-robot' },
    { title: 'Bluetooth Speaker', href: '/search/bluetooth-speaker' },
    { title: 'OLED TV', href: '/search/oled-tv' },
    { title: 'Security Camera', href: '/search/security-camera' },
    { title: 'MacBook M1', href: '/search/macbook-m1' },
    { title: 'Smart Washing Machine', href: '/search/smart-washing-machine' },
    { title: 'iPad Mini 2023', href: '/search/ipad-mini-2023' },
    { title: 'PS5', href: '/search/ps5' },
    { title: 'Earbuds', href: '/search/earbuds' },
    { title: 'Air Condition Inverter', href: '/search/air-condition-inverter' },
    { title: 'Flycam', href: '/search/flycam' },
    { title: 'Electric Bike', href: '/search/electric-bike' },
    { title: 'Gaming Computer', href: '/search/gaming-computer' },
    { title: 'Smart Air Purifier', href: '/search/smart-air-purifier' },
    { title: 'Apple Watch', href: '/search/apple-watch' },
];

export const ProductDetailsData: ProductDetailType = {
    image: [randomImage(1), randomImage(2), randomImage(3), randomImage(4), randomImage(5)],
    name: 'Havic HV G-92 Gamepage',
    rating: 4,
    reviews: 150,
    inStock: true,
    price: 192,
    discount: 5,
    description:
        'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    attributes: [
        { name: 'Colors', value: ['red', 'blue'] },
        { name: 'Size', value: ['XS', 'S', 'M', 'L', 'XL'] },
    ],
    canReturn: true,
    freeDelivery: true,
    code: 'WH12',
    productBrief: {
        detail: {
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, voluptatum. Vitae dolores alias repellat eligendi, officiis, exercitationem corporis quisquam delectus cum non recusandae numquam dignissimos molestiae magnam hic natus. Cumque.',
            features: [
                'Any Product types that You want - Simple, Configurable',
                'Downloadable/Digital Products, Virtual Products',
                'Inventory Management with Backordered items',
                'Flatlock seams throughout.',
            ],
            additionalInfo: [
                { label: 'Highlights', value: 'Form FactorWhole' },
                { label: 'Seller', value: 'No Returns Allowed' },
                { label: 'Services', value: 'Cash on Delivery available' },
            ],
        },
        information: [
            { label: 'Weight', value: '500 g' },
            { label: 'Dimensions', value: '17 × 15 × 3 cm' },
            { label: 'Color', value: 'black,yellow,red' },
            { label: 'Brand', value: 'Wonder Fort' },
            { label: 'Form Factor', value: 'Whole' },
            { label: 'Quantity', value: '1' },
            { label: 'Container Type', value: 'Pouch' },
            { label: 'Shelf Life', value: '12 Months' },
            { label: 'Ingredients', value: 'Dalchini, Dhaniya, Badi Elaichi, Laung' },
            { label: 'Other Features', value: 'Ingredient Type: Vegetarian' },
        ],
        reviews: [
            {
                profileImage: randomImage(1),
                name: 'Mariya Lykra',
                description: 'this is a great product',
                rating: 4,
            },
            {
                profileImage: randomImage(1),
                name: 'Saddika Alard',
                description: 'this is a great product',
                rating: 4,
            },
        ],
    },
};

export const steps = [
    {
        id: 1,
        title: 'Account Info',
        description: 'Step details here',
        icon: FaAddressCard,
    },
    {
        id: 2,
        title: 'Review',
        description: 'Step details here',
        icon: FaClipboardList,
    },
    {
        id: 3,
        title: 'Confirmation',
        description: 'Step details here',
        icon: TbCertificate,
    },
];

export const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
        {
            breakpoint: 1536,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            },
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            },
        },
    ],
};
// export const footerData = [
//   {
//     Category: ['Dairy & Milk', 'Snack & Spice', 'Fast Food', 'Juice & Drinks', 'Bakery', 'Seafood'],
//   },
//   {
//     Company: [
//       'About us',
//       'Delivery',
//       'Legal Notice',
//       'Terms & conditions',
//       'Secure ayment',
//       'Contact us',
//     ],
//   },
//   {
//     Account: [
//       'Sign in',
//       'View Cart',
//       'Return Policy',
//       'Become a Vendor',
//       'Affiliate Program',
//       'Payments',
//     ],
//   },
//   {
//     Contact: [
//       { icon: CiLocationOn, detail: 'Kathmandu, Nepal' },
//       { icon: FaWhatsapp, detail: '+977 980100000' },
//       { icon: CiMail, detail: 'rwt@live.com' },
//     ],
//   },
// ]

export const Category = ['Dairy & Milk', 'Snack & Spice', 'Fast Food', 'Juice & Drinks', 'Bakery', 'Seafood'];

export const Company = ['About us', 'Delivery', 'Legal Notice', 'Terms & conditions', 'Secure payment', 'Contact us'];

export const Account = ['Sign in', 'View Cart', 'Return Policy', 'Become a Vendor', 'Affiliate Program', 'Payments'];

export const Contact = [
    { icon: CiLocationOn, detail: 'Kathmandu, Nepal' },
    { icon: FaWhatsapp, detail: '+977 980100000' },
    { icon: CiMail, detail: 'rwt@live.com' },
];

export const PaymentOptions = [RiVisaLine, FaCcMastercard, FaCcPaypal];

export const items: Item[] = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Phone' },
    { id: 3, name: 'Headphones' },
    { id: 4, name: 'Keyboard' },
    { id: 5, name: 'Monitor' },
];

export const AboutData = {
    helpSection: {
        title: 'How can help you ?',
        heading: 'Let us know how we can help you',
        paragraphs: [
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque similique non nemo, pariatur possimus quis!',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque similique non nemo, pariatur possimus quis!',
        ],
        services: [
            {
                id: 1,
                title: '01. Visit Feedback',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia labore hic excepturi.',
            },
            {
                id: 2,
                title: '02. Employer Services',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia labore hic excepturi.',
            },
            {
                id: 3,
                title: '03. Billing Inquiries',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia labore hic excepturi.',
            },
            {
                id: 4,
                title: '04. General Inquiries',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia labore hic excepturi.',
            },
        ],
    },
    officeLocations: [
        {
            title: 'Office',
            address: ['205 North Michigan Avenue, Suite 810', 'Chicago, 60601, USA', 'Phone: (123) 456-7890', 'Email: contact@Evara.com'],
        },
        {
            title: 'Studio',
            address: ['205 North Michigan Avenue, Suite 810', 'Chicago, 60601, USA', 'Phone: (123) 456-7890', 'Email: contact@Evara.com'],
        },
        {
            title: 'Shop',
            address: ['205 North Michigan Avenue, Suite 810', 'Chicago, 60601, USA', 'Phone: (123) 456-7890', 'Email: contact@Evara.com'],
        },
    ],
    contactForm: {
        title: 'Contact form',
        heading: 'Drop Us a Line',
        description: 'Your email address will not be published. Required fields are marked *',
    },
    newsletter: {
        heading: 'Stay home & get your daily needs from our shop',
        description: 'Start Your Daily Shopping with ',
        martName: 'RWT mart',
        buttonText: 'Subscribe',
    },
};

export const sideBarData = {
    categories: [
        { name: 'Electornics', value: 'electornics', numberOfItems: 3 },
        { name: 'Clothing', value: 'clothing', numberOfItems: 4 },
        { name: 'Food', value: 'food', numberOfItems: 5 },
        { name: 'Male', value: 'male', numberOfItems: 8 },
        { name: 'Female', value: 'female', numberOfItems: 10 },
    ],
    attribute: {
        colors: [
            { color: 'red', count: 32 },
            { color: 'blue', count: 2 },
            { color: 'green', count: 12 },
        ],
        size: [
            { size: 'sm', count: 12 },
            { size: 'md', count: 24 },
            { size: 'lg', count: 54 },
            { size: 'xl', count: 1 },
        ],
        weights: [
            { weight: '500gm', count: 23 },
            { weight: '1kg', count: 43 },
            { weight: '2kg', count: 12 },
        ],
        itemCondition: [
            { condition: 'new', count: 12 },
            { condition: 'refurbished', count: 45 },
            { condition: 'used', count: 35 },
        ],
    },
    tags: [
        { title: 'Clothes', href: '#' },
        { title: 'Fruits', href: '#' },
        { title: 'Snacks', href: '#' },
    ],
    price: {
        highest: 1300,
        lowest: 100,
    },

    gallery: [
        { name: 'carrot', image: randomImage(1), href: '#' },
        { name: 'capsicum', image: randomImage(2), href: '#' },
        { name: 'juice', image: randomImage(3), href: '#' },
        { name: 'banana', image: randomImage(4), href: '#' },
        { name: 'watermelon', image: randomImage(5), href: '#' },
        { name: 'kiwi', image: randomImage(6), href: '#' },
    ],
};
export const sortByList = [
    { value: 'position', name: 'Position' },
    { value: 'relavance', name: 'Relevance' },
    { value: 'asc', name: 'Name, A to Z' },
    { value: 'desc', name: 'Name, Z to A' },
    { value: 'lowest', name: 'Price, Low to High' },
    { value: 'highest', name: 'Price, High to Low' },
    { value: 'highest', name: 'Price, High to Low' },
];

export const showItemsList = [{ value: 10 }, { value: 20 }, { value: 30 }, { value: 40 }, { value: 50 }];

export const aboutPageContents = {
    first: {
        title: 'Welcome to Nest',
        paragraph1:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, hic? Earum, similique repellat? Quo quas accusantium iusto doloremque quidem consequatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe excepturi modi eum placeat mollitia molestiae non enim nulla aut error distinctio, necessitatibus totam eveniet assumenda ipsa perspiciatis ipsam repellendus maxime quia provident sit? Nemo qui maxime pariatur sit reprehenderit eveniet? ',
        paragraph2:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, hic? Earum, similique repellat? Quo quas accusantium iusto doloremque quidem consequatur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe excepturi modi eum placeat mollitia molestiae non enim nulla aut error distinctio, necessitatibus totam eveniet assumenda ipsa perspiciatis ipsam repellendus maxime quia provident sit? Nemo qui maxime pariatur sit reprehenderit eveniet? ',
    },
    second: {
        title: 'Our Performance',
        slogan: 'Your Partner for e-commerce grocery solution',
        paragraph1:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur laudantium in quisquam nisi id iure ex, quae magnam odit eius!',
        paragraph2:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. At earum velit dolores, eius commodi consequuntur assumenda dolorum vitae iure fugiat?',
    },
    third: {
        title: 'Meet Our Expert Team',
        paragraph1:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias commodi dolor labore quasi at quidem amet sequi expedita mollitia autem adipisci rerum aliquid porro ab omnis nesciunt praesentium, reprehenderit ex?',
        paragraph2:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias commodi dolor labore quasi at quidem amet sequi expedita mollitia autem adipisci rerum aliquid porro ab omnis nesciunt praesentium, reprehenderit ex?',
    },
    cardData: [
        {
            image: randomImage(1),
            title: 'Best Prices & Offers',
            description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
        },
        {
            image: randomImage(2),
            title: 'Wide Assortment',
            description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
        },
        {
            image: randomImage(3),
            title: 'Free Delivery',
            description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
        },
        {
            image: randomImage(4),
            title: 'Easy Returns',
            description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
        },
        {
            image: randomImage(5),
            title: '100% Satisfaction',
            description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
        },
        {
            image: randomImage(6),
            title: 'Great Daily Deal',
            description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
        },
    ],
    aboutData: [
        {
            title: 'Who we are',
            description: 'Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultricies in.',
        },
        {
            title: 'Our history',
            description: 'Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultricies in.',
        },
        {
            title: 'Our mission',
            description: 'Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultricies in.',
        },
    ],
    additionalData: [
        { title: 'Glorious Years', count: 10 },
        { title: 'Happy Clients', count: 1000 },
        { title: 'Projects Complete', count: 500 },
        { title: 'Team Advisors', count: 100 },
        { title: 'Products Sale', count: 10000 },
    ],
};

export const blogCardData: BlogDataType[] = [
    {
        category: 'Side Dish',
        title: 'The Intermediate Guide to Healthy Food',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(12),
    },
    {
        category: 'Soups and Stews',
        title: 'Summer Quinoa Salad Jars with Lemon Dill',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(34),
    },
    {
        category: 'Salad',
        title: 'Caprese Chicken with Smashed Potatoes',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(56),
    },
    {
        category: 'Dessert',
        title: 'Harissa Chickpeas with Whipped Feta',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(78),
    },
    {
        category: 'Breakfast',
        title: 'Almond Butter Chocolate Chip Zucchini Bars',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(91),
    },
    {
        category: 'Vegan',
        title: 'Smoky Beans & Greens Tacos with Aji Verde',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(23),
    },
    {
        category: 'Gluten Free',
        title: 'Sticky Ginger Rice Bowls with Pickled Veg',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(45),
    },
    {
        category: 'Side Dish',
        title: 'Creamy Garlic Sun-Dried Tomato Pasta',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(67),
    },
    {
        category: 'Dairy Free',
        title: 'The Absolute Easiest Spinach and Pizza',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(89),
    },
    {
        category: 'Salad',
        title: 'Mediterranean Pasta Salad with Lemon Dressing',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(15),
    },
    {
        category: 'Snack',
        title: 'Baked Sweet Potato Fries with Spicy Mayo Dip',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(37),
    },
    {
        category: 'Side Dish',
        title: 'Garlic Herb Roasted Vegetables',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(59),
    },
    {
        category: 'Breakfast',
        title: 'Avocado Toast with Poached Eggs',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(73),
    },
    {
        category: 'Vegan',
        title: 'Lentil and Kale Stew',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(82),
    },
    {
        category: 'Dessert',
        title: 'Dark Chocolate Avocado Mousse',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(40),
    },
    {
        category: 'Lunch',
        title: 'Turkey and Spinach Wraps',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(29),
    },
    {
        category: 'Soup',
        title: 'Creamy Tomato Basil Soup',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(71),
    },
    {
        category: 'Gluten Free',
        title: 'Quinoa and Black Bean Salad',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(64),
    },
    {
        category: 'Snack',
        title: 'Energy Bites with Peanut Butter and Chia',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(43),
    },
    {
        category: 'Side Dish',
        title: 'Crispy Parmesan Brussels Sprouts',
        date: '25 April 2022',
        views: 126000,
        readTimeInMinutes: 4,
        image: randomImage(39),
    },
];

export const blogTags = [
    { name: 'Shopping', value: 'shopping' },
    { name: 'Recips', value: 'recips' },
    { name: 'Kitchen', value: 'kitchen' },
    { name: 'News', value: 'news' },
    { name: 'Food', value: 'food' },
];

export const sortFilterBlogPage = [
    { name: 'Featured', value: 'featured' },
    { name: 'Trending', value: 'trending' },
    { name: 'Newest', value: 'newest' },
];
export const showFilterBlogPage = [10, 20, 30];

export const faqs = [
    {
        question: 'What is the multi vendor services?',
        answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem. Et tenetur autem itaque? Eum exercitationem assumenda enim eos voluptas. Ad incidunt laborum aliquam, expedita, voluptatibus quo id adipisci ea ratione ut, dignissimos natus?',
        image: randomImage(1),
    },
    {
        question: 'How to buy many products at a time?',
        answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem. Et tenetur autem itaque? Eum exercitationem assumenda enim eos voluptas. Ad incidunt laborum aliquam, expedita, voluptatibus quo id adipisci ea ratione ut, dignissimos natus?',
        image: randomImage(2),
    },
    {
        question: 'Refund policy for customer',
        answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem. Et tenetur autem itaque? Eum exercitationem assumenda enim eos voluptas. Ad incidunt laborum aliquam, expedita, voluptatibus quo id adipisci ea ratione ut, dignissimos natus?',
        image: randomImage(3),
    },
    {
        question: 'Exchange policy for customer',
        answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem. Et tenetur autem itaque? Eum exercitationem assumenda enim eos voluptas. Ad incidunt laborum aliquam, expedita, voluptatibus quo id adipisci ea ratione ut, dignissimos natus?',
        image: randomImage(4),
    },
    {
        question: 'Give a way products available',
        answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem. Et tenetur autem itaque? Eum exercitationem assumenda enim eos voluptas. Ad incidunt laborum aliquam, expedita, voluptatibus quo id adipisci ea ratione ut, dignissimos natus?',
        image: randomImage(5),
    },
    {
        question: 'Something Different',
        answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem. Et tenetur autem itaque? Eum exercitationem assumenda enim eos voluptas. Ad incidunt laborum aliquam, expedita, voluptatibus quo id adipisci ea ratione ut, dignissimos natus?',
        image: randomImage(6),
    },
];

export const termsAndConditions = {
    title: 'Welcome to Right Way Traders (RWT)',
    introduction: `
    Quisque est nisi, eleifend tristique congue non, sagittis quis justo. 
    In blandit hendrerit magna, sit amet ullamcorper sapien. Suspendisse potenti. 
    Vivamus eu lacus ut nulla dapibus malesuada nec et libero. Ut ultrices risus id 
    eleifend sagittis.
  `,
    sections: [
        {
            title: '1. What are Terms and Conditions',
            content: `
        Sed non dui aliquam, luctus in est non, aliquet mauris. Quisque lacus ligula, 
        dapibus nec dignissim non, tincidunt vel quam. Etiam porttitor lacus odio.

        Cras sagittis nunc lectus, in condimentum ligula ornare et. Etiam sagittis 
        malesuada dui. Duis volutpat ligula ac ante. Sed cursus, tortor a pellentesque 
        pulvinar, lorem ipsum gravida elit, euismod et nisi. Mauris ac justo, 
        tincidunt sit amet posuere, rutrum in est.
      `,
        },
        {
            title: '2. What to Include in Terms and Conditions',
            content: `
        Vivamus convallis dui eu nisl blandit, vel convallis nisi dapibus. 
        Duis rhoncus turpis quis urna. Nam a ex quis tortor congue dignissim.

        - Sed non varius erat.
        - Nulla vel nibh eu risus cursus vulputate nec eu est.
      `,
        },
        {
            title: '3. Examples of Terms and Conditions',
            content: `
        Proin commodo ultricies nulla et tincidunt. Pellentesque id maximus elit. 
        Nunc ultrices rutrum odio, ut molestie nulla tristique at. Etiam condimentum 
        neque vitae nisi aliquet, id feugiat leo ornare. Integer est ante tincidunt ante.
        
        Nam vestibulum, felis nec pharetra maximus, erat ligula lacinia arcu, non 
        commodo lacus ipsum ac sapien. Nulla at ex et massa rutrum feugiat. 
      `,
        },
    ],
};

export const cartProducts = [
    {
        productImage: randomImage(1),
        name: 'Wireless Bluetooth Headphones',
        price: 200,
        quantity: 4,
    },
    {
        productImage: randomImage(2),
        name: 'Smart Fitness Watch',
        price: 200,
        quantity: 2,
    },
    {
        productImage: randomImage(3),
        name: 'Portable Bluetooth Speaker',
        price: 200,
        quantity: 7,
    },
    {
        productImage: randomImage(4),
        name: '4K Ultra HD Action Camera',
        price: 200,
        quantity: 6,
    },
];

export const CouponMockData: Coupon[] = [
    {
        id: 'm5gr84i9',
        code: 'nov21',
        title: 'Give this coupon a name',
        discount: { on: 'Electronics', subCategory: 'Laptops' },
        discountValue: { type: 'percentage', value: 10 },
        expireDate: '2 Jan 2025',
        status: 'published',
    },
    {
        id: '3u1reuv4',
        code: 'nov21',
        title: 'Give this coupon a name',
        discount: { on: 'All Products' },
        discountValue: { type: 'amount', value: 2000 },
        expireDate: '2 Jan 2025',
        status: 'published',
    },
    {
        id: 'derv1ws0',
        code: 'nov21',
        title: 'Give this coupon a name',
        discount: { on: 'Shipping' },
        discountValue: { type: 'amount', value: 2500 },
        expireDate: '2 Jan 2025',
        status: 'published',
    },
    {
        id: '5kma53ae',
        code: 'nov21',
        title: 'Give this coupon a name',
        discount: { on: 'Product', subCategory: 'Ajazz Aj 139Pro ' },
        discountValue: { type: 'percentage', value: 25 },
        expireDate: '2 Jan 2025',
        status: 'published',
    },
    {
        id: 'bhqecj4p',
        code: 'nov21',
        title: 'Give this coupon a name',
        discount: { on: 'Electronics', subCategory: 'Phones' },
        discountValue: { type: 'amount', value: 500 },
        expireDate: '2 Jan 2025',
        status: 'draft',
    },
];

export const MOCK_POSTS = [
    {
        id: 1,
        user_id: 1,
        title: 'Doloremque accusantium et nihil sit.',
        slug: 'doloremque-accusantium-et-nihil-sit-123456',
        excerpt: 'Eos amet id dolor quis delectus. Laborum ut id sed provident ratione.',
        content: 'Nihil eaque aliquid ullam. Error dolorem eum quo est quos...',
        status: 'DRAFT',
        created_at: '1 week ago',
        user: {
            id: 1,
            name: 'RWT User',
            email: 'user@gmail.com',
        },
        categories: [
            { id: 3, name: 'JavaScript', slug: 'javascript' },
            { id: 6, name: 'Node.js', slug: 'nodejs' },
        ],
    },
    {
        id: 2,
        user_id: 1,
        title: 'Quisquam voluptas nisi voluptatem.',
        slug: 'quisquam-voluptas-nisi-voluptatem-987654',
        excerpt: 'Temporibus dignissimos at qui. Fugiat reprehenderit accusamus id.',
        content: 'Adipisci cumque dolorem dolor. Nesciunt quasi numquam pariatur...',
        status: 'DRAFT',
        created_at: '1 week ago',
        user: {
            id: 1,
            name: 'RWT User',
            email: 'user@gmail.com',
        },
        categories: [
            { id: 2, name: 'PHP', slug: 'php' },
            { id: 7, name: 'Tailwind CSS', slug: 'tailwind-css' },
        ],
    },
];

// FOR DATATABLE TESTING PURPOSED DELETE THIS LATER
export const post_data = [
    {
        id: 1,
        user_id: 1,
        title: 'Voluptatem nobis placeat reiciendis nemo et.',
        slug: 'voluptatem-nobis-placeat-reiciendis-nemo-et-4926848',
        excerpt:
            'Magni aliquid cupiditate pariatur deleniti eaque et reprehenderit. Fugit error incidunt dolorem eos tempora fugit perspiciatis. Aperiam corrupti in deserunt ut molestias illum est vel.',
        content:
            'Quis odio consequatur vitae omnis dolores. Qui doloremque unde facilis. Et dolorem aut consectetur voluptatem id aperiam. Temporibus recusandae aut error officia. Sint voluptatibus quia voluptatem rerum sint officia. Dolores quasi sequi optio itaque. Aspernatur dicta consequatur quisquam odit. Sapiente non ea sed quia temporibus qui aut. Natus cum corrupti est voluptas aliquid. Ea et assumenda ut eos quis doloribus doloremque. Tempora ut autem labore consequuntur pariatur et. Sed quia occaecati occaecati esse occaecati id. Eligendi sit esse ut qui ducimus error quibusdam. Aut aut facilis et quasi. Voluptatem eaque velit nulla sapiente rem ex quam. Eos id ipsa numquam sed ipsa qui eaque. Qui illo explicabo et perspiciatis. Accusamus consequatur quasi exercitationem rerum nostrum. Totam et laudantium illo praesentium in. Dolores laboriosam quia tempore sed impedit. Sed iure qui quibusdam ut. Veniam at et a. Odio officia distinctio saepe pariatur deserunt impedit.',
        status: 'DRAFT',
        created_at: '3 weeks ago',
        user: {
            id: 1,
            name: 'RWT User',
            first_name: null,
            middle_name: null,
            last_name: null,
            email: 'user@gmail.com',
            mobile_phone: null,
            phone: null,
            dob: null,
            avatar: 'http://ecommerce.test/',
            alt_phone: null,
            comments: null,
            alternate_reference: null,
            ndis_number: null,
            contact_type: null,
            status: null,
            created_at: '3 weeks ago',
        },
        categories: [
            {
                id: 2,
                name: 'PHP',
                slug: 'php',
                created_at: '3 weeks ago',
            },
            {
                id: 6,
                name: 'Node.js',
                slug: 'nodejs',
                created_at: '3 weeks ago',
            },
            {
                id: 7,
                name: 'Tailwind CSS',
                slug: 'tailwind-css',
                created_at: '3 weeks ago',
            },
        ],
    },
    {
        id: 2,
        user_id: 1,
        title: 'Eum consequatur recusandae dicta.',
        slug: 'eum-consequatur-recusandae-dicta-943',
        excerpt:
            'Ex rem aperiam a sapiente laboriosam quis incidunt. Expedita rerum dolor aut cumque et et. Ipsa numquam vel voluptas cum. Adipisci enim non explicabo. Et molestias repellendus non sed fugit ipsa.',
        content:
            'Quia possimus vero aut nam excepturi. Provident deleniti neque voluptas voluptatem consequatur. Illum asperiores iste consequatur eum temporibus. Et distinctio in voluptatibus aut architecto. Exercitationem soluta facere qui dicta. Facilis non inventore est eos. Possimus quibusdam est quia omnis iure aut quos. Suscipit nihil dolor et deleniti fuga odit ea. Voluptas iusto vitae velit ducimus et molestiae ipsa. Amet provident veritatis rerum ullam atque voluptatem. Maxime eos debitis expedita quia tempore id qui. Consequatur sed dolor deleniti unde id. Atque minus corrupti commodi explicabo nesciunt non vel. Officiis et sapiente laboriosam nulla eos. Ut nam temporibus omnis iste. Itaque qui fuga dolor earum rerum. Non dignissimos dolores voluptas maiores. Voluptatem nihil et aut dolor laudantium accusamus est.',
        status: 'PUBLISHED',
        created_at: '3 weeks ago',
        user: {
            id: 1,
            name: 'RWT User',
            first_name: null,
            middle_name: null,
            last_name: null,
            email: 'user@gmail.com',
            mobile_phone: null,
            phone: null,
            dob: null,
            avatar: 'http://ecommerce.test/',
            alt_phone: null,
            comments: null,
            alternate_reference: null,
            ndis_number: null,
            contact_type: null,
            status: null,
            created_at: '3 weeks ago',
        },
        categories: [
            {
                id: 7,
                name: 'Tailwind CSS',
                slug: 'tailwind-css',
                created_at: '3 weeks ago',
            },
        ],
    },
    {
        id: 3,
        user_id: 1,
        title: 'Eaque ducimus provident numquam laborum assumenda.',
        slug: 'eaque-ducimus-provident-numquam-laborum-assumenda-63883',
        excerpt:
            'Sit doloribus nam delectus in ipsum quibusdam possimus. Consequuntur et qui porro et qui quam est. Labore amet ut ipsam et animi cum. Modi dicta aut dignissimos magnam fugiat.',
        content:
            'Aut veritatis incidunt rerum a deserunt consequatur. Laborum sit architecto magni aliquid neque aut tenetur. Suscipit ducimus reiciendis alias consequatur vel. Voluptatem doloribus deserunt dolor. Et ea iusto praesentium voluptate. Ut sit et impedit similique. Qui minima cum eius voluptates beatae iure labore. Quos voluptatibus sit ut est eius assumenda laboriosam. Ab sequi animi autem qui consectetur officiis consectetur. Sint et corporis quo quibusdam explicabo enim. Perspiciatis consectetur voluptas quod maiores earum quidem ipsum et. Reprehenderit dignissimos repudiandae dolorum est. Voluptatem tempora nemo repudiandae assumenda. Qui sed laborum voluptatem nihil. Earum mollitia reiciendis explicabo autem rem et reiciendis. Ullam officiis saepe sed cupiditate consequatur omnis. Architecto ullam est dolor officia. Quos dolor dolorem voluptates voluptatum animi. Pariatur ipsam minima laborum quas error. Inventore voluptas minima nostrum modi. Eligendi laborum provident quia dolorem.',
        status: 'ARCHIVED',
        created_at: '3 weeks ago',
        user: {
            id: 1,
            name: 'RWT User',
            first_name: null,
            middle_name: null,
            last_name: null,
            email: 'user@gmail.com',
            mobile_phone: null,
            phone: null,
            dob: null,
            avatar: 'http://ecommerce.test/',
            alt_phone: null,
            comments: null,
            alternate_reference: null,
            ndis_number: null,
            contact_type: null,
            status: null,
            created_at: '3 weeks ago',
        },
        categories: [
            {
                id: 4,
                name: 'Vue.js',
                slug: 'vuejs',
                created_at: '3 weeks ago',
            },
            {
                id: 8,
                name: 'Inertia.js',
                slug: 'inertiajs',
                created_at: '3 weeks ago',
            },
        ],
    },
    {
        id: 4,
        user_id: 1,
        title: 'Et quae quasi tempora officiis doloribus.',
        slug: 'et-quae-quasi-tempora-officiis-doloribus-7617',
        excerpt:
            'Nam doloribus soluta nihil fugit molestiae. Officiis excepturi tempore aperiam illo autem. Eum consequatur aut porro tempore et natus ut. Accusamus quo aliquid et.',
        content:
            'Repudiandae aut sit aut officiis. Aperiam eum qui natus dolores repellat. Magni ea unde cum nulla. Quam qui qui facilis qui in ullam. Ut quo qui facilis aut vitae vitae. Voluptatem dolor reprehenderit quaerat est porro ullam neque. Quos ipsum est sed vero natus eligendi. Nihil et sit quae. Aliquid voluptatibus quae architecto exercitationem. Voluptas suscipit tenetur distinctio ex labore. Eum distinctio aliquam dolorum quidem eius reiciendis repudiandae sint. Reprehenderit molestiae iste hic. Soluta sint necessitatibus sed accusamus voluptatem at. Earum incidunt velit voluptas dicta possimus. Neque quis facilis neque enim. Expedita incidunt aut eveniet qui. A itaque quaerat eum aliquid repellat et voluptatem. Odit tempora repudiandae perspiciatis id. Doloribus corporis unde maiores explicabo dolorum enim doloribus. Veritatis asperiores delectus commodi maiores atque odio perspiciatis. Quis quibusdam perspiciatis eligendi dolorem.',
        status: 'PUBLISHED',
        created_at: '3 weeks ago',
        user: {
            id: 1,
            name: 'RWT User',
            first_name: null,
            middle_name: null,
            last_name: null,
            email: 'user@gmail.com',
            mobile_phone: null,
            phone: null,
            dob: null,
            avatar: 'http://ecommerce.test/',
            alt_phone: null,
            comments: null,
            alternate_reference: null,
            ndis_number: null,
            contact_type: null,
            status: null,
            created_at: '3 weeks ago',
        },
        categories: [
            {
                id: 4,
                name: 'Vue.js',
                slug: 'vuejs',
                created_at: '3 weeks ago',
            },
            {
                id: 6,
                name: 'Node.js',
                slug: 'nodejs',
                created_at: '3 weeks ago',
            },
        ],
    },
    {
        id: 5,
        user_id: 1,
        title: 'Qui fugiat expedita et ut dolorem.',
        slug: 'qui-fugiat-expedita-et-ut-dolorem-65585261',
        excerpt:
            'Aliquid expedita tenetur consectetur ut. Et consectetur harum nihil. Eveniet quod praesentium dolor. Assumenda explicabo blanditiis eaque possimus perspiciatis.',
        content:
            'Expedita non enim quidem odit perspiciatis aut architecto. Molestiae sed non eum ex ea. Eaque quae soluta consequuntur quia sed et iste. Fuga quia ducimus esse error atque. Perferendis provident quisquam sed fugit quia ipsa. Ut itaque error repudiandae aut delectus iusto cupiditate. Culpa omnis delectus distinctio ut. Accusamus provident nam sunt aut alias ut. Et incidunt molestiae dicta distinctio eligendi et. Aliquam est ea quibusdam omnis ducimus non expedita et. Corrupti officiis iure et. Et minus voluptatem culpa et ut atque nesciunt. Autem sapiente fugiat excepturi omnis ut itaque. Ipsum qui aperiam nihil reiciendis qui. Sit ex est molestias et velit voluptas fugiat. Dolor consectetur magnam provident harum. Et est atque a. Earum saepe quis culpa consequatur quidem. Corporis qui natus consequatur. Cum facere dolorum error dolores assumenda ipsam et.',
        status: 'DRAFT',
        created_at: '3 weeks ago',
        user: {
            id: 1,
            name: 'RWT User',
            first_name: null,
            middle_name: null,
            last_name: null,
            email: 'user@gmail.com',
            mobile_phone: null,
            phone: null,
            dob: null,
            avatar: 'http://ecommerce.test/',
            alt_phone: null,
            comments: null,
            alternate_reference: null,
            ndis_number: null,
            contact_type: null,
            status: null,
            created_at: '3 weeks ago',
        },
        categories: [
            {
                id: 4,
                name: 'Vue.js',
                slug: 'vuejs',
                created_at: '3 weeks ago',
            },
            {
                id: 6,
                name: 'Node.js',
                slug: 'nodejs',
                created_at: '3 weeks ago',
            },
            {
                id: 7,
                name: 'Tailwind CSS',
                slug: 'tailwind-css',
                created_at: '3 weeks ago',
            },
        ],
    },
    {
        id: 6,
        user_id: 1,
        title: 'Repellendus et quis sit delectus modi ut.',
        slug: 'repellendus-et-quis-sit-delectus-modi-ut-0',
        excerpt:
            'Illo eum et inventore totam recusandae maiores iure. In exercitationem excepturi et vel libero vel optio. Saepe qui nulla sed commodi veritatis harum laboriosam.',
        content:
            'Eum quos odio asperiores odio. Possimus quis qui quis. Aspernatur iste ut maxime id suscipit architecto. Rem deleniti quo aut numquam est animi. Occaecati ut excepturi quia aut deserunt quibusdam nam. Dolorum magnam nulla et. Ut praesentium cumque id corrupti et eos officiis tempore. Natus ut exercitationem quia nisi. Aut natus molestias illo ex aut quaerat. Numquam eligendi quos nobis blanditiis accusamus ut neque. Exercitationem animi ut maxime et qui excepturi. Aspernatur porro impedit recusandae nesciunt. Asperiores dolore eaque ipsa dolores quam quae. Doloremque aliquam magnam consequatur quia quia dolor inventore. Temporibus qui voluptatem illum sed. Magni quis reiciendis labore reiciendis officia animi. Minima ut reprehenderit voluptatum quidem velit eius beatae qui. Consequatur facilis totam dolores modi et. Repellat recusandae similique omnis nemo. Temporibus facilis dolores veniam ullam. Occaecati doloremque sed dolor dolorem eligendi. Excepturi aut eaque aliquam quos.',
        status: 'DRAFT',
        created_at: '3 weeks ago',
        user: {
            id: 1,
            name: 'RWT User',
            first_name: null,
            middle_name: null,
            last_name: null,
            email: 'user@gmail.com',
            mobile_phone: null,
            phone: null,
            dob: null,
            avatar: 'http://ecommerce.test/',
            alt_phone: null,
            comments: null,
            alternate_reference: null,
            ndis_number: null,
            contact_type: null,
            status: null,
            created_at: '3 weeks ago',
        },
        categories: [
            {
                id: 6,
                name: 'Node.js',
                slug: 'nodejs',
                created_at: '3 weeks ago',
            },
            {
                id: 8,
                name: 'Inertia.js',
                slug: 'inertiajs',
                created_at: '3 weeks ago',
            },
        ],
    },
    {
        id: 7,
        user_id: 1,
        title: 'Sed voluptates saepe dolor vel omnis repellendus qui.',
        slug: 'sed-voluptates-saepe-dolor-vel-omnis-repellendus-qui-96',
        excerpt:
            'Omnis adipisci quam doloremque eius commodi dignissimos. Illo rerum nesciunt vel odit consequuntur deleniti. Sequi eaque mollitia maxime numquam similique.',
        content:
            'Officia reiciendis error voluptatem voluptatem. Et impedit deserunt aliquam aperiam est tempore illum. Veritatis nulla eaque blanditiis consequatur cumque assumenda. Qui omnis corporis sapiente expedita. Reprehenderit quibusdam dolorum nisi ea voluptatem repellendus sed quidem. Consequuntur dolore et dolores id et corporis. Qui omnis consectetur suscipit ratione. Voluptatem sunt sed similique minus rerum rem voluptatibus. Omnis voluptates dignissimos et et officiis. A et rerum blanditiis sed hic. Dolores dolore mollitia quae sint officia. Deleniti sit deserunt dolor tempora blanditiis magni. Distinctio qui nisi sit atque deleniti. Omnis similique odio architecto impedit. Adipisci nisi aut commodi quas in voluptas natus. Est ullam id provident sit qui a. Accusamus debitis architecto nisi ipsum sed aut. Nesciunt totam et quis nulla et inventore rem. Nemo labore non aut eos dolor eum eos odit.',
        status: 'ARCHIVED',
        created_at: '3 weeks ago',
        user: {
            id: 1,
            name: 'RWT User',
            first_name: null,
            middle_name: null,
            last_name: null,
            email: 'user@gmail.com',
            mobile_phone: null,
            phone: null,
            dob: null,
            avatar: 'http://ecommerce.test/',
            alt_phone: null,
            comments: null,
            alternate_reference: null,
            ndis_number: null,
            contact_type: null,
            status: null,
            created_at: '3 weeks ago',
        },
        categories: [
            {
                id: 2,
                name: 'PHP',
                slug: 'php',
                created_at: '3 weeks ago',
            },
            {
                id: 5,
                name: 'React.js',
                slug: 'reactjs',
                created_at: '3 weeks ago',
            },
            {
                id: 6,
                name: 'Node.js',
                slug: 'nodejs',
                created_at: '3 weeks ago',
            },
        ],
    },
    {
        id: 8,
        user_id: 1,
        title: 'Voluptates nulla error veniam voluptas.',
        slug: 'voluptates-nulla-error-veniam-voluptas-3269',
        excerpt:
            'Necessitatibus sapiente aut recusandae quod neque et. Aut iusto consequatur blanditiis. Incidunt ipsam et iste accusantium minus et.',
        content:
            'Dolore eum voluptas sed culpa ut est. Praesentium aliquid animi sed fugit tenetur eos quia. Animi voluptatum at repellendus nobis. Nihil quis eligendi eaque ducimus eaque et hic doloribus. In libero eligendi vitae sit consequatur expedita corrupti. Asperiores at aliquam beatae quidem. Repudiandae iure est voluptate sapiente. Sunt quo recusandae ab. Iusto quod deleniti enim ea consequuntur. Aut est illo saepe accusantium laboriosam veritatis omnis. Omnis temporibus excepturi modi. Aut consectetur et alias consectetur voluptatum explicabo non. Quo ut similique perspiciatis dolores et. Nobis hic cum ut inventore. Ullam eaque voluptas voluptatem id ut laboriosam pariatur. Dolorem veniam voluptatibus molestiae dignissimos itaque earum non. Minus rem nostrum quibusdam voluptas ut veniam. Iure voluptates sit qui consectetur.',
        status: 'PUBLISHED',
        created_at: '3 weeks ago',
        user: {
            id: 1,
            name: 'RWT User',
            first_name: null,
            middle_name: null,
            last_name: null,
            email: 'user@gmail.com',
            mobile_phone: null,
            phone: null,
            dob: null,
            avatar: 'http://ecommerce.test/',
            alt_phone: null,
            comments: null,
            alternate_reference: null,
            ndis_number: null,
            contact_type: null,
            status: null,
            created_at: '3 weeks ago',
        },
        categories: [
            {
                id: 4,
                name: 'Vue.js',
                slug: 'vuejs',
                created_at: '3 weeks ago',
            },
            {
                id: 8,
                name: 'Inertia.js',
                slug: 'inertiajs',
                created_at: '3 weeks ago',
            },
        ],
    },
    {
        id: 9,
        user_id: 1,
        title: 'Pariatur qui non porro unde.',
        slug: 'pariatur-qui-non-porro-unde-5',
        excerpt: 'Sed possimus in fugit magni. Accusamus quaerat dolorum praesentium iusto. Soluta laudantium quis quibusdam quis laborum.',
        content:
            'Consectetur aliquam reprehenderit eum sint dolores temporibus. Provident eum laborum ipsum natus animi consequuntur. Est quia temporibus modi nulla eveniet rerum dolore aut. Quo tenetur at aliquid quia voluptate. Error recusandae excepturi commodi voluptate tempora. Alias quisquam temporibus molestiae sint adipisci expedita expedita. Consequatur earum et culpa ipsa. Est non numquam modi et enim eos qui. Saepe nulla est cum omnis hic debitis. Quaerat quae odio quo. Assumenda sequi numquam in minima et nostrum. Aut cum alias nesciunt recusandae non beatae aliquid. Animi incidunt qui sint possimus debitis sunt impedit. Recusandae et et eum aut numquam dolor maiores. Aut est ad similique et. Et necessitatibus laudantium eos error. Numquam consequatur quia veniam rerum dolores velit. Sit perspiciatis perspiciatis est ut nisi et sunt. Harum alias aut et. Aspernatur qui quasi hic velit sunt. Et est sint repellat suscipit dicta doloremque sit quibusdam. Rem aut vero autem exercitationem.',
        status: 'DRAFT',
        created_at: '3 weeks ago',
        user: {
            id: 1,
            name: 'RWT User',
            first_name: null,
            middle_name: null,
            last_name: null,
            email: 'user@gmail.com',
            mobile_phone: null,
            phone: null,
            dob: null,
            avatar: 'http://ecommerce.test/',
            alt_phone: null,
            comments: null,
            alternate_reference: null,
            ndis_number: null,
            contact_type: null,
            status: null,
            created_at: '3 weeks ago',
        },
        categories: [
            {
                id: 1,
                name: 'Laravel',
                slug: 'laravel',
                created_at: '3 weeks ago',
            },
            {
                id: 7,
                name: 'Tailwind CSS',
                slug: 'tailwind-css',
                created_at: '3 weeks ago',
            },
        ],
    },
    {
        id: 10,
        user_id: 1,
        title: 'Quam qui facere sequi optio qui iusto neque.',
        slug: 'quam-qui-facere-sequi-optio-qui-iusto-neque-52',
        excerpt:
            'In fugiat qui voluptas qui. Quam consequatur est voluptas minus officiis eum aperiam. Unde mollitia in atque qui velit voluptas quo.',
        content:
            'Qui vitae ducimus reprehenderit et nostrum. Est at quia quia reprehenderit aliquid voluptatem. Fugiat amet dolore rerum reiciendis placeat quis. Aut qui sit itaque magnam. Cum quasi qui in non quod. Necessitatibus vitae vel unde molestias eum. Tempora quia ipsam alias est. Consequatur neque quo cumque et dolor quis nobis. Aspernatur eum debitis aliquid perferendis natus reiciendis perspiciatis. Commodi pariatur et dolores. Est iusto qui facilis quia suscipit temporibus ut. Voluptatem dolorum nihil iste veniam ex iste minus est. Voluptates assumenda neque quisquam consequatur. Facilis dolores aspernatur fugiat voluptatem. Autem qui alias voluptas libero molestiae numquam omnis et. Reiciendis quis excepturi provident eos accusantium. Quaerat soluta officia consequatur consequatur consequatur ut enim. Similique sequi omnis quis aut dolores quia sed.',
        status: 'PUBLISHED',
        created_at: '3 weeks ago',
        user: {
            id: 1,
            name: 'RWT User',
            first_name: null,
            middle_name: null,
            last_name: null,
            email: 'user@gmail.com',
            mobile_phone: null,
            phone: null,
            dob: null,
            avatar: 'http://ecommerce.test/',
            alt_phone: null,
            comments: null,
            alternate_reference: null,
            ndis_number: null,
            contact_type: null,
            status: null,
            created_at: '3 weeks ago',
        },
        categories: [
            {
                id: 3,
                name: 'JavaScript',
                slug: 'javascript',
                created_at: '3 weeks ago',
            },
            {
                id: 6,
                name: 'Node.js',
                slug: 'nodejs',
                created_at: '3 weeks ago',
            },
        ],
    },
];

export const post_link = {
    first: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=1',
    last: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=400',
    prev: null,
    next: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=2',
};
export const post_meta = {
    current_page: 1,
    from: 1,
    last_page: 400,
    links: [
        {
            url: null,
            label: '&laquo; Previous',
            active: false,
        },
        {
            url: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=1',
            label: '1',
            active: true,
        },
        {
            url: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=2',
            label: '2',
            active: false,
        },
        {
            url: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=3',
            label: '3',
            active: false,
        },
        {
            url: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=4',
            label: '4',
            active: false,
        },
        {
            url: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=5',
            label: '5',
            active: false,
        },
        {
            url: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=6',
            label: '6',
            active: false,
        },
        {
            url: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=7',
            label: '7',
            active: false,
        },
        {
            url: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=8',
            label: '8',
            active: false,
        },
        {
            url: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=9',
            label: '9',
            active: false,
        },
        {
            url: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=10',
            label: '10',
            active: false,
        },
        {
            url: null,
            label: '...',
            active: false,
        },
        {
            url: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=399',
            label: '399',
            active: false,
        },
        {
            url: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=400',
            label: '400',
            active: false,
        },
        {
            url: 'http://ecommerce.test/admin-home/posts?is_logged_in=1&is_subscribed=0&page=2',
            label: 'Next &raquo;',
            active: false,
        },
    ],
    path: 'http://ecommerce.test/admin-home/posts',
    per_page: 10,
    to: 10,
    total: 4000,
};
export const post_filters = {
    search: null,
    limit: null,
    col: null,
    sort: null,
    filters: null,
};

export const post_categoires = [
    {
        id: 1,
        name: 'Laravel',
        slug: 'laravel',
        created_at: '3 weeks ago',
    },
    {
        id: 2,
        name: 'PHP',
        slug: 'php',
        created_at: '3 weeks ago',
    },
    {
        id: 3,
        name: 'JavaScript',
        slug: 'javascript',
        created_at: '3 weeks ago',
    },
    {
        id: 4,
        name: 'Vue.js',
        slug: 'vuejs',
        created_at: '3 weeks ago',
    },
    {
        id: 5,
        name: 'React.js',
        slug: 'reactjs',
        created_at: '3 weeks ago',
    },
    {
        id: 6,
        name: 'Node.js',
        slug: 'nodejs',
        created_at: '3 weeks ago',
    },
    {
        id: 7,
        name: 'Tailwind CSS',
        slug: 'tailwind-css',
        created_at: '3 weeks ago',
    },
    {
        id: 8,
        name: 'Inertia.js',
        slug: 'inertiajs',
        created_at: '3 weeks ago',
    },
];

export const privaryPolicyPageData = {
    date: '6/11/2019',
    paragraph1:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda ad vitae iusto, porro deleniti necessitatibus? Illum ea explicabo deleniti sint ab fugit, quod nemo voluptatum vel incidunt totam, maxime culpa!',
    paragraph2:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda ad vitae iusto, porro deleniti necessitatibus? Illum ea explicabo deleniti sint ab fugit, quod nemo voluptatum vel incidunt totam, maxime culpa!',
    paragraph3:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda ad vitae iusto, porro deleniti necessitatibus? Illum ea explicabo deleniti sint ab fugit, quod nemo voluptatum vel incidunt totam, maxime culpa!',
    privacyActsList: [
        {
            title: 'Collecting and Using Personal and Anonymous Information',
            content: 'We collect personal and anonymous information to enhance user experience and ensure compliance with applicable laws.',
        },
        {
            title: 'Types of Information We Collect',
            content: 'We collect information such as name, email address, location data, and browsing activity.',
        },
        {
            title: 'How We Collect Information',
            content: 'Information is collected through forms, cookies, third-party integrations, and user interactions.',
        },
        {
            title: 'Third Party Data Collection',
            content: 'We may share certain data with third-party service providers to optimize our services.',
        },
        {
            title: 'Your Controls and Choices',
            content: 'Users have the right to access, update, or delete their data and manage their preferences.',
        },
        {
            title: 'How We Use and Share Information',
            content: 'Data is used to personalize services, improve security, and share insights with trusted partners.',
        },
        {
            title: 'Security Measures',
            content: 'We implement industry-standard security measures to protect user data from unauthorized access.',
        },
        {
            title: 'Applicable Law',
            content: 'Our privacy practices comply with applicable local and international laws.',
        },
        {
            title: 'Children’s Privacy',
            content: 'We do not knowingly collect personal information from children under the age of 13.',
        },
        {
            title: 'External Links',
            content: 'Our site may contain links to external websites; we are not responsible for their privacy practices.',
        },
        {
            title: 'California Users',
            content: 'California residents have specific privacy rights under the CCPA.',
        },
        {
            title: 'Disclosure Required by Law',
            content: 'We may disclose information if required by law or legal process.',
        },
        {
            title: 'Changes to Our Privacy Policy',
            content: 'We reserve the right to update this policy and will notify users of significant changes.',
        },
        {
            title: 'Contact Us',
            content: 'If you have questions about this policy, please contact us at privacy@example.com.',
        },
    ],
};

export const invoiceData = {
    brandName: 'My Business',
    // If you want to show a top-right logo like in the screenshot, you can do so.
    // For example, an image that says "myBillBook" or your own brand's logo
    topRightLogo: 'https://placehold.co/100x40?text=RWT LOGO',

    invoiceNumber: 'INV-2025-001',
    invoiceDate: '2025-02-19',
    dueDate: '2025-03-19',
    orderPlacedDate: '2025-03-19',
    orderNumber: '234-0981-2240-4-343',

    from: {
        companyName: 'RWT Pvt. Ltd.',
        address: 'Kathmandu, Nepal',
        district: 'Kathmandu',
        province: 'Bagmati',
        country: 'Nepal',
        email: 'rwt@gmail.com',
        phone: '+977 9800000000',
        gstin: 'GSTIN-1234567890', // Replacing the old vatNumber for clarity
    },

    to: {
        name: 'Saurav Parajulee',
        address: 'Kimdol, Chhauni',
        city: 'Kathmandu',
        province: 'Bagmati',
        country: 'Nepal',
        email: 'social.saurav2003@gmail.com',
        phone: '+977 980000000',
        gstin: 'GSTIN-9876543210', // If you want a separate GSTIN for Bill To
        state: 'Bagmati', // Using province as "state"
    },

    items: [
        {
            description: 'Item no.1',
            quantity: 1,
            rate: 30.0,
            taxRate: 0.07,
            lineTotal: 32.1,
            hsn: '1234',
        },
        {
            description: 'Item no.2',
            quantity: 2,
            rate: 75.0,
            taxRate: 0.07,
            lineTotal: 160.5,
            hsn: '5678',
        },
        {
            description: 'Item no.3',
            quantity: 1,
            rate: 3000.0,
            taxRate: 0.07,
            lineTotal: 3210.0,
            hsn: '9999',
        },
    ],
    summary: {
        subtotal: 3202.6,
        tax: 200.0,
        grandTotal: 3402.6,
        discount: 0, // If you want a discount field
    },
};

export const mockPaginationData = {
    links: {
        first: 'http://ecommerce.test/admin-home/product?page=1',
        last: 'http://ecommerce.test/admin-home/product?page=17',
        prev: null,
        next: 'http://ecommerce.test/admin-home/product?page=2',
    },
    meta: {
        current_page: 1,
        from: 1,
        last_page: 17,
        links: [
            {
                url: null,
                label: '&laquo; Previous',
                active: false,
            },
            {
                url: 'http://ecommerce.test/admin-home/product?page=1',
                label: '1',
                active: true,
            },
            {
                url: 'http://ecommerce.test/admin-home/product?page=2',
                label: '2',
                active: false,
            },
            {
                url: 'http://ecommerce.test/admin-home/product?page=3',
                label: '3',
                active: false,
            },
            {
                url: 'http://ecommerce.test/admin-home/product?page=4',
                label: '4',
                active: false,
            },
            {
                url: 'http://ecommerce.test/admin-home/product?page=5',
                label: '5',
                active: false,
            },
            {
                url: 'http://ecommerce.test/admin-home/product?page=6',
                label: '6',
                active: false,
            },
            {
                url: 'http://ecommerce.test/admin-home/product?page=7',
                label: '7',
                active: false,
            },
            {
                url: 'http://ecommerce.test/admin-home/product?page=8',
                label: '8',
                active: false,
            },
            {
                url: 'http://ecommerce.test/admin-home/product?page=9',
                label: '9',
                active: false,
            },
            {
                url: 'http://ecommerce.test/admin-home/product?page=10',
                label: '10',
                active: false,
            },
            {
                url: null,
                label: '...',
                active: false,
            },
            {
                url: 'http://ecommerce.test/admin-home/product?page=16',
                label: '16',
                active: false,
            },
            {
                url: 'http://ecommerce.test/admin-home/product?page=17',
                label: '17',
                active: false,
            },
            {
                url: 'http://ecommerce.test/admin-home/product?page=2',
                label: 'Next &raquo;',
                active: false,
            },
        ],
        path: 'http://ecommerce.test/admin-home/product',
        per_page: 10,
        to: 10,
        total: 167,
    },
};

export const mockActions = {
    create: 'admin.home',
    edit: 'admin.home',
    destroy: 'admin.home',
};
export const storeData = [
    {
        id: 1,
        isYourStore: true,
        name: 'Kalanki Hub',
        distance: '1.2',
        street: 'Kalanki, Ring-road',
        branch: 'RWT Hub Kalanki',
        storeUrl: '#',
        openUntil: 9,
        geoLocation: {
            lat: 27.693246516899904,
            lng: 85.2817245619666,
        },
    },
    {
        id: 2,
        isYourStore: false,
        name: 'Satdobato Hub',
        distance: '6',
        street: 'Satdobato, Lalitpur',
        branch: 'RWT Hub Satdobato',
        storeUrl: '#',
        openUntil: 9,
        geoLocation: {
            lat: 27.651314484918224,
            lng: 85.3277566777227,
        },
    },
    {
        id: 3,
        isYourStore: false,
        name: 'Chabahil Hub',
        distance: '12',
        unit: 4,
        street: 'Chabahil, Kathmandu',
        branch: 'RWT Hub Chabahil',
        storeUrl: '#',
        openUntil: 9,
        geoLocation: {
            lat: 27.716627086453457,
            lng: 85.34832958151729,
        },
    },
    {
        id: 4,
        isYourStore: false,
        name: 'Narayan Gopal Chowk Hub',
        distance: '12',
        unit: 4,
        street: 'Narayan Gopal Chowk',
        branch: 'RWT Hub Narayal Gopal Chowk',
        storeUrl: '#',
        openUntil: 9,
        geoLocation: { lat: 27.74004968894305, lng: 85.33701513238488 },
    },
    {
        id: 5,
        isYourStore: false,
        name: 'Thamel Hub',
        distance: '12',
        unit: 4,
        street: 'Thamel, Kathmandu',
        branch: 'RWT Hub Thamel',
        storeUrl: '#',
        openUntil: 9,
        geoLocation: { lat: 27.71476165769576, lng: 85.31154153025052 },
    },
];

export const serviceFilter = [
    { name: 'Amazon Alexa Experience', value: '#' },
    { name: 'Apple Authorizes Service Provider', value: '#' },
    { name: 'Apple Shop', value: '#' },
    { name: 'Car and GPS install Services', value: '#' },
    { name: 'Geek Squad Services', value: '#' },
    { name: 'Google Home Experience', value: '#' },
    { name: 'Hearing Solutions Center', value: '#' },
    { name: 'LG experience', value: '#' },
    { name: 'Microsoft Window Store', value: '#' },
    { name: 'Premium Home Theater', value: '#' },
    { name: 'Samsung Entertainmanet Experience', value: '#' },
    { name: 'Samsung Experience Shop', value: '#' },
    { name: 'Sony Experience', value: '#' },
    { name: 'Trade-In', value: '#' },
];
export const quickAccessCategory = [
    {
        name: 'Electronics & Gadgets',
        href: '#',
        submenu: [
            { name: 'Smartphones', href: '#' },
            { name: 'Laptops', href: '#' },
            { name: 'Headphones', href: '#' },
            { name: 'Smartwatches', href: '#' },
            { name: 'Accessories', href: '#' },
        ],
    },
    {
        name: 'Fashion & Apparel',
        href: '#',
        submenu: [
            { name: 'Clothing', href: '#' },
            { name: 'Shoes', href: '#' },
            { name: 'Accessories', href: '#' },
            { name: 'Jewelry', href: '#' },
        ],
    },
    {
        name: 'Home & Living',
        href: '#',
        submenu: [
            { name: 'Furniture', href: '#' },
            { name: 'Kitchenware', href: '#' },
            { name: 'Home Decor', href: '#' },
            { name: 'Bedding', href: '#' },
        ],
    },
    {
        name: 'Health & Beauty',
        href: '#',
        submenu: [
            { name: 'Skincare', href: '#' },
            { name: 'Cosmetics', href: '#' },
            { name: 'Personal Care', href: '#' },
            { name: 'Supplements', href: '#' },
        ],
    },
    {
        name: 'Sports & Outdoor',
        href: '#',
        submenu: [
            { name: 'Gym Equipment', href: '#' },
            { name: 'Sportswear', href: '#' },
            { name: 'Camping Gear', href: '#' },
            { name: 'Bicycles', href: '#' },
        ],
    },
];

export default categories;

export const variantsDataTableSeed: ProductVariantType[] = [
    {
        id: 1,
        'variant-name': 'Smartphone X - Red / XL',
        price: 'Rs.146067',
        color: ['#FF0000', 'blue'], // red
        size: ['XL'],
        'base-price': 'Rs.66500',
        status: true,
        stock: '99 units',
    },
    {
        id: 2,
        'variant-name': 'Smartphone X - Silver / MD',
        price: 'Rs.132867',
        color: ['#C0C0C0'], // silver
        size: ['MD'],
        'base-price': 'Rs.66500',
        status: true,
        stock: '120 units',
    },
    {
        id: 3,
        'variant-name': 'Smartphone X - Mint / S',
        price: 'Rs.119667',
        color: ['#98FF98'], // mint
        size: ['S'],
        'base-price': 'Rs.66500',
        status: false,
        stock: '45 units',
    },
    {
        id: 4,
        'variant-name': 'Smartphone X - Gray / L',
        price: 'Rs.106267',
        color: ['#808080'], // gray
        size: ['L'],
        'base-price': 'Rs.66500',
        status: true,
        stock: '80 units',
    },
    {
        id: 5,
        'variant-name': 'Smartphone X - White / XXL',
        price: 'Rs.159867',
        color: ['#FFFFFF'], // white
        size: ['XXL'],
        'base-price': 'Rs.66500',
        status: false,
        stock: '30 units',
    },
];

export const mockAttributes: ProductVariantAttributes = [
    {
        id: 1,
        uuid: 'random-uuid-1',
        name: 'RAM',
        terms: ['8GB', '16GB', '32GB', '64GB'],
        created_at: 'Today',
        updated_at: 'Never',
    },
    {
        id: 2,
        uuid: 'random-uuid-2',
        name: 'ROM',
        terms: ['128GB', '256GB', '512GB', '1024GB'],
        created_at: 'Today',
        updated_at: 'Never',
    },
];
