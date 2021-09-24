import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import datapadding from './dataPadding.js';
import './Padding.css';

class Padding extends Component{
    render() {
        return(
<div className="container-padding">
    <ul>
        {
            datapadding.normal.map((item) => (
                <li key={item.id}>
                    <Link to={`/danh-mục/${item.id}.html`}>
                        <div className="padding-box">
                            <img src={item.imageicon} alt="" />
                            <span> {item.title} </span>
                        </div>
                    </Link>
                </li>
                )
            )
        }

        {
            datapadding.special.map((item) => (
                <li key={item.id}>
                    <Link to={`/danh-mục/${item.id}.html`}>
                        <div className="padding-box">
                            <img className={item.cName} src={item.imageicon}  alt="" />
                            <span> {item.title} </span>
                        </div>
                    </Link>
                </li>
                )
            )
        }
        
    </ul>
</div>
        )
    }
}

export default Padding;