I. Khởi tạo và sử dụng React
1) npx create-react-app frontend 
- tạo cây thư mục frontend trong folder
2) npm start 
- khởi động server post:3000, lưu ý cần vào thư mục frontend: cd frontend -> npm start
- npm install --save react-hover (cài thêm nếu muốn dùng hover event)
3) Xóa các file rác
- App.css; App.test.js; logo.svg; setupTests.js và các file chứa logo bên folder public
4) Thay thế các đường dẫn từ file index.html -> file index.html trong folder public
5) Thay chế class -> className trong file App.js
6) Thay thế file style.css -> file index.css
7) Xóa các comment từ file html vì rất dễ gây lỗi
8) Lưu ý các thẻ img, input ...
- các thẻ cần được đóng />
- các thẻ img cần có alt="name" do cơ chế khác với html
9) Tạo file data.js trong src như sau:
const data = {
    products: 
    [
        {
            _id: '1',
            name: "Tên sản phẩm",
            category: "Danh mục sản phẩm",
            image: '/Images/Áo Nữ 001.jpg',
            price: 428,
            brand: 'Nhãn hiệu',
            color: 'Màu sắc',
            description: 'Mô tả sản phẩm',
        },
    ],
};
export default data;

const datasale = {
    products: 
    [
        {
            _id: '1',
            name: "Tên sản phẩm",
            category: "Danh mục sản phẩm",
            image: '/Images/Áo Nữ 001.jpg',
            price: 428,
            brand: 'Nhãn hiệu',
            color: 'Màu sắc',
            description: 'Mô tả sản phẩm',
            sale: 526,
        },
    ],
};
export default datasale;
10) Gán dữ liệu vừa tạo vào App.js:
{
    data.products.map((product) => 
        (
        <li key={product._id}>
            <div className="box-product">
                <a href={`/product/${product._id}`}>
                    <img className="product-image" src={product.image} alt={product.name} />
                </a>

                <a href={`/product/${product._id}`}>
                    <h2 className="product-name"> {product.name} </h2>
                </a>
                
                <h3 className="product-price"> {product.price}.000Đ </h3> 
            </div>
        </li>
        )
    )
}
VD:
{
    datasale.products.map((product) =>
        (
        <li key={product._id}>
            <div className="box-product-sale">
            <a href={`/product/${product._id}`}>
                <img className="product-image-sale" src={product.image} alt={product.name} />
            </a>
            
            <a href={`/product/${product._id}`}>
                <h2 className="product-name-sale"> {product.name} </h2>
            </a>
                
            <h3 className="product-price-sale"> {product.price}.000Đ <small>{product.sale}.000Đ</small> </h3> 
            </div>
        </li>
        )
    )
}
- import data from './data';
- import datasale from './data1';


II. Share code github.com
1) Tạo tài khoản github
2) git init
+ Các câu lệch git thường dùng:
- git init: Khởi tạo github
- git status: Xem trạng thái folder có bao nhiêu file
- git add: git add . = add tất cả các file trong folder
- git clone:
- git pull:
- git add or git add:
- git commit:
- git push:
3) Làm theo các hướng dẫn của github đến khi hoàn thành
- Có thể khác nhau tùy vào phiên bản (có thể phải đăng nhập xác minh hoặc không)


III. Event React
1) OnMouse:
* onMouseDown: Click sự kiện ->
* onMouseUp: Click sự kiện -> 
* onMouseEnter: Hover sự kiện -> Hover phần tử cha
* onMouseOver: Hover sự kiện -> Hover tất cả phần tử cả cha và con
* onMouseLeave: Hover sự kiện (Không có bong bóng) -> Sau đó rời khỏi -> Điều kiện kích hoạt là khi rời khỏi TẤT CẢ các phần tử bao gồm cả cha và con
* onMouseOut: Hover sự kiện (Có bong bóng) -> Sau đó rời khỏi -> Điều kiện kích hoạt là rời khỏi phần tử cha HOẶC 1 phần tử con bất kì
* onMouseMove: Hover sự kiện -> Chủ yếu dùng để định vị tọa độ của 1 vật
(Kết hợp các phương thức để tối ưu hóa chức năng Hover)


IV. Tạo Components
1) Tạo các components chứa file .js và .css như sau:
import React , {Component} from 'react';
import './Navbar.css';
class Navbar extends Component{
    render() {
        return(

        )
    }
}

export default Navbar;
2) Chuyển các file liên quan của App.js sang các file của components bao gồm css:
<Navbar />


V. Xây dụng Screens
1) cd frontend -> npm install react-router-dom
2) Cài: 
- <BrowserRouter>
(Bao bọc code)
- <Route path="/sản-phẩm/:id" component={ProductScreen} ></Route>
(Khi các đường dẫn trong component chứa /product/:id thì sẽ chuyển sang {ProductScreen} còn không thì sẽ không chuyển)
- <Route path="/" component={New} exact></Route>
(exact là hàm xóa chính component đó khi chuyển trang)
- const product = data.products.find((x) => x._id === parseInt(props.match.params.id));
( parseInt(props.match.params.id) là hàm chuyển đổi id:number sang string )


VI. Khởi tạo và sử dụng Node.JS Server
1) npm init
- Tạo ra package.json (Tự khởi tạo)
2) Tạo folder backend
- Tạo file server.js
- npm install express 
- package.json(frontend) -> Thêm vào: "type": "module",
- package.json(backend) -> Thêm vào: "proxy": "http://127.0.0.1:5000",
3) npm install --save-dev nodemon
- Lưu ý: Tắt server trước khi cài
- "start": "nodemon --watch backend --exec node --experimental-modules backend/server.js"
(Thay thế cho "test" dùng để lưu thay đổi data)
- Khởi động: npm start (lưu ý nó chạy 2 bên backend), khởi động độc lập với frontend)
4) cd frontend -> npm install axios
5) Đặc biệt quan trọng: backend NodeJs file ảnh không được đặt tên TIẾNG VIỆT CÓ DẤU VÌ NÓ MÉO CÓ HIỂU ĐÂU


VII. ESlint chuyên fix lỗi do nhiều lập trình viên có cách viết khác nhau viết code khác nhau 
1) Vào thư viện VSCode cài ESLint (Dirk Baeumer)
2) npm install -D eslint (Nhớ tắt hết server)
3) ./node_modules/.bin/eslint --init
- How would you like to use ESLint? · problems
- What type of modules does your project use? · esm
- Which framework does your project use? · react
- Does your project use TypeScript? · No
- Where does your code run? · browser, node
- What format do you want your config file to be in? · JavaScript
4) Tạo file .env


VIII. Redux : React-redux (Liên kết sản phẩm)
1) cd frontend -> npm install redux react-redux
2) cd frontend -> npm install redux-thunk
3) Cài đặt Redux DevTools trên Chrome
4) Rất khó để chạy 2 chương trình trong store nên khi code nên gom tất cả vào 1 cụm và chia nhỏ sản phẩm ra
5) Ở phần data product: _id thường hay bị lỗi do cấu trúc req trả giá trị là string nhưng find(x) có giá trị là number nên sẽ không xuất được giá trị


IX. Shopping-Cart
1) Tạo đường dẫn và tạo trang Cart
- const addToCartHandler = () => {
        props.history.push(`/giỏ-hàng/${productId}/?số-lượng=${quantity}`);
    };
- <Route path="/giỏ-hàng/:id?" component={CartScreen}></Route>
2) Tạo trang Cart có những yếu tố phù hợp
- const total_value_string = total_value.toLocaleString();
(In ra tổng giá trị đơn hàng có giá trị String)
- const point = Math.round(cartItems.reduce((a,c) => a + (c.price * c.quantity * 0.012) , 0));
(Giá trị được làm tròn theo số nguyên)


X. MongoDB (dữ liệu)
1) npm install mongoose
2) backend -> Tạo folder models, routers
3) npm install bcryptjs
4) npm install express-async-handler
5) Đường dẫn : (dùng cho website)
- mongosh "mongodb+srv://cluster0.sm1ur.mongodb.net/myFirstDatabase" --username sangvippt
- mongodb+srv://sangvippt:0797080378@cluster0.sm1ur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
6) MongDB không hổ trợ 2 hình ảnh nên ta dùng thư viện thứ 3 để thêm nhiều hình hơn


XI. Test backend : postman
1) npm install jsonwebtoken
2) npm install dotenv
3) cài đặt postman
4) Lưu ý đặt biệt:
- app.use(express.json());
- app.use(express.urlencoded({ extended: true }));
(Phải được khai báo trước khi bắt đầu)
5) Tạo trang đăng ký / đăng nhập
6) Tạo trang thông tin / thanh toán / đơn hàng / kiểm tra đơn hàng


XII. Paypal
1) Đăng ký tài khoản Paypal (Lưu ý cái ID nó cho)
2) cd frontend -> npm install react-paypal-button-v2
3) Thử thanh toán để kiểm tra nhưng mà tôi không có tiền...
4) Lịch sử giao dịch: OrderHistory.js cái này cũng để test thôi chứ không có tiền...


XIII. Phía user
1) Update thông tin (Lưu ý: cần thêm file jsconfig.json)
2) Tạo chỉnh sửa phía Admin (Các Screen lồng vào component)


XIV. Admin (ControllerScreen)
1) Thiết kê trang admin theo cách của bạn
2) npm install multer
3) Tạo ra các trang trong admin bao gồm Thêm/Sửa/Xóa...
4) Lưu ý khi up ảnh cần tạo 1 folder VD: /uploads để lưu hình ảnh
5) Phân quyền admin/seller: khi khởi tạo lại nhớ xóa database mongodb (lỗi seller)