import bcrypt from 'bcryptjs';

const data = {
    users:
    [
        {
            name: 'Sang',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Hùng',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products: 
    [
        {
            name: 'Áo sơ mi thanh lịch',
            category: "Áo",
            image: "/images/Blouse001.jpg",
            price: 379,
            amount: 7,
            brand: 'Nhãn hiệu',
            description: 'Mô tả sản phẩm',
        },
        {
            name: 'Quần công sở cá tính',
            category: "Quần",
            image: "/images/Trousser001.jpg",
            price: 316,
            amount: 3,
            brand: 'Nhãn hiệu',
            description: 'Mô tả sản phẩm',
        },
        {
            name: 'Váy trắng phá cách thanh lịch',
            category: "Váy",
            image: "/images/Dress002.jpg",
            price: 356,
            amount: 0,
            brand: 'Nhãn hiệu',
            description: 'Mô tả sản phẩm',
        },
        {
            name: 'Đầm ngủ quyến rũ chết người',
            category: "Đầm",
            image: "/images/Nightie001.jpg",
            price: 299,
            amount: 12,
            brand: 'Nhãn hiệu',
            description: 'Mô tả sản phẩm',
        },
    ],
};
export default data;
