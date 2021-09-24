import React from 'react';
import Select from 'react-select';
import './Color.css';
import options_color from './dataColor';

export default function Color() {

    const style_color = {
        // I. Điều chỉnh container
        container: () => ({
            width: '100%',
            height: '100%',
            background: 'black',
            textAlign: 'center',
        }),

        // II. Thay đổi phần bên ngoài option
        menu: (provided, state) => ({
            ...provided,
            // Điều chỉnh kích thước phía bên ngoài
            width: state.selectProps.width,
            // minWidth: 280,
            border: '0.1rem dotted black',
            padding: 10,
            background: 'white',
        }),

        // III. Thay đổi giá trị option
        option: (provided, state) => ({
            ...provided,
            borderTop: '0.2rem dashed red',
            borderLeft: '0.2rem dashed red',
            borderRight: '0.2rem dashed red',
            // Khi chưa lụa chọn là vàng, sau khi chọn xanh là màu trắng
            color: state.isSelected ? 'white' : '#f0b81f',
            padding: 5,
            fontSize: 14,
            fontWight: 800,
            // Khi chưa lụa chọn là đen, sau khi chọn xanh là màu vàng
            background: state.isSelected ? 'black' : 'gray',
        }), 

        // IV. Thay đổi giá trị trong hộp container
        valueContainer: () => ({
            fontSize: 14,
            fontWight: 800,
            color: 'white',
            marginTop: 5,
        }),

        // V. Thay đổi thanh điều khiển trong hộp option
        control: () => ({
            width: '100%',
        }),

        // VI. Thay đổi thanh dropdown
        dropdownIndicator: () => ({
            display: 'none',
        }),

        // VII. Thay đổi giá trí ban đầu
        placeholder: () => ({
            color: 'white',
            float: 'left',
            marginLeft: 10,
        }),

        // IX. Thay đổi giá trị sau khi lựa chọn
        singleValue: () => ({
            color: 'white',
        })
    }

    return (
<div className="product-color-cart">
    <Select
        options={options_color}
        styles={style_color}
        width='18rem'
        placeholder= 'Lựa chọn màu sắc...'     
    />
</div>
    )
}





