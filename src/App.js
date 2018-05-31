import React, { Component } from "react";
import {getTargetByClass,getElementViewTop,setBodyScrollTop} from "./utils/utils";
import * as mockData from './mockData';
import "./App.css";
import _ from "lodash";
class App extends Component {

 //点击加入购物车
  handleAddToCart = () => {
    console.log('mockData.groupXItems',mockData.groupXItems)
    alert("此功能是点击加入购物车，如果选了份数没有选择日期，选择日期处高亮显示2次，然后锚点到对应的位置")
    _.each(mockData.groupXItems,(XItem)=>{
      if(XItem.selectedCount > 0){
        XItem.isUseDateValid = XItem.isUseDateValid ? true : false;
      }else {
        XItem.isUseDateValid = true;
      }
      //TODO:去更新state重新render，没有使用redux，所以此处全部是mock的假数据

    })
    this.checkAllSelect && clearTimeout(this.checkAllSelect)
        this.checkAllSelect = setTimeout(() => {
            const warningText = document.getElementsByClassName("warning_text");
            const container = document.querySelector("#container");
            if (warningText && warningText.length > 0) {
                const targetNode = getTargetByClass(warningText[0], "pro_order_mod"),
                    body = document.body || document.documentElement,
                    scrollTop = (document.body && document.body.scrollTop) || (document.documentElement && document.documentElement.scrollTop)
                if (scrollTop !== getElementViewTop(targetNode)) {
                   setBodyScrollTop(getElementViewTop(targetNode));
                }
            } 
        }, 50)
  }
  
    render() {
        return (
          <div id = "container">
            <div className="pro_order_mod">
                <div className="pro_list">
                  {
                    _.map(mockData.groupXItems[2],(XItem,index)=>{
                      return (<div className="pro_list_item" key = {index}>
                          <p className="pro_list_name arrow_r_s">
                              {XItem.name}
                          </p>
                          <div className="pro_list_info">
                            <div className="day_adjust_box">
                              <span className = {XItem.isUseDateValid ? "warning_text" : ""}>{XItem.useDate || '请选择日期'}</span>
                              <i className="s_down"></i>
                            </div>
                            <div className="num_adjust_box">
                              <span className="num_adjust_view">{XItem.selectedCount}份</span>
                            </div>
                          </div>
                          <div className="price_mod_r">
                              <p>
                                  <span className="f_price">
                                      <dfn>¥</dfn>{XItem.price}
                                  </span>
                                  <span className="price_num">/{XItem.unit}</span>
                              </p>
                          </div>
                      </div>)
                  })
                  }  
                </div>
            </div>
            <div className = "foot">
              <div className="foot_btn flex_1" onClick={() => this.handleAddToCart()}>加入购物车</div>
            </div>
          </div>
        );
    }
}

export default App;
