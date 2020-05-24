import Taro from '@tarojs/taro'
import { observable, action } from "mobx";
// 全局公共方法
import { session } from '@utils';
// 接口服务
import service from './service';

class State {

    // 商品
    @observable products = [];
    @action setProducts = (data = []) => {
        this.products = data;
    }

    // 查询商品
    productsData = async (values = {}) => {
        const res = await service.productsData(values);
        try{
            if( res.data.code === 200 ){
                res.data.data && this.setProducts([res.data.data]);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 提交评价 - 发起请求
    addcommentsData = async (values = {}) => {
        const res = await service.addcommentsData({
            uname: session.getItem('uname'),
            ...values
        });
        try{
            if( res.data.code === 200 ){
              Taro.navigateBack();
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();