import { observable, action } from "mobx";
// 全局公共方法
import { session } from '@utils';
// 接口服务
import service from './service';

class State {

    // 我的收藏数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    // 获取我的收藏列表数据 - 发起请求
    cartLisData = async () => {
        const res = await service.cartLisData({
            uname: session.getItem('uname'),
            collection: 1
        });
        try{
            if( res.data.code === 200 ){
                const { data=[] } = res.data || {};
                if( data ){
                    this.setDataSource( data );
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 取消收藏指定id数据
    delcartData = async (ids = []) => {
        const res = await service.delcartData({
            uname: session.getItem('uname'),
            ids
        });
        try{
            if( res.data.code === 200 ){
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 加入购物车
    addcolsData = async (cartId = []) => {
        const res = await service.addcolsData({ 
            uname: session.getItem('uname'), 
            ids: cartId,
            collection: 0
        });
        try{
            if( res.data.code === 200 ){
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setDataSource();
    }
}

export default new State();