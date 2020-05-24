import { observable, action, toJS } from "mobx";
// 全局公共方法
import { session } from '@utils';
// 接口服务
import service from './service';

class State {

    // 查询购物车数据期间，展示正在加载购物车数据
    // 若查询结果为空，则展示购物车是空的
    @observable emptyTip = '正在加载购物车数据...';
    @action setEmptyTip = (data = '正在加载购物车数据...') => {
        this.emptyTip = data;
    }

    // 购物车数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    // 规格列表
    @observable specList = [];
    @action setSpecList = (data = []) => {
        this.specList = data;
    }

    // 被选中
    @observable checkedArr = [];
    @action setCheckedArr = (data = []) => {
        this.checkedArr = data;
    }

    // 默认收货地址
    @observable address = null;
    @action setAddress = (data = null) => {
        this.address = data;
    }

    // 获取购物车列表数据 - 发起请求
    cartLisData = async () => {

        const res = await service.cartLisData({
            uname: session.getItem('uname'),
            collection: 0
        });

        try{
            if( res.data.code === 200 ){
                const { data=[] } = res.data || {};
                if( data ){
                    this.setDataSource( data );
                    !data.length && this.setEmptyTip('购物车是空的');
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除购物车指定id数据
    delcartData = async (ids = []) => {
        const res = await service.delcartData({
            uname: session.getItem('uname'),
            ids
        });
        try{
            if( res.data.code === 200 ){
                this.cartLisData();
                this.setCheckedArr();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 加入收藏
    addcolsData = async (cartId = []) => {
        const res = await service.addcolsData({ 
            uname: session.getItem('uname'), 
            ids: cartId,
            collection: 1
        });
        try{
            if( res.data.code === 200 ){
                this.cartLisData();
                this.setCheckedArr();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 更新购物车数据
    updatecartData = async (id, num, totalprice) => {
        const res = await service.updatecartData({ 
            uname: session.getItem('uname'), 
            id, num, totalprice
        });
        try{
            if( res.data.code === 200 ){
                let dataSource = toJS(this.dataSource);
                dataSource.map(item => {
                    if( item.id == id ){
                        item['num'] = num;
                        item['totalprice'] = totalprice;
                    }
                });
                this.setDataSource(dataSource);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 查询规格 - 发起请求
    selectSpecData = async (params = {}) => {
        const res = await service.selectSpecData(params);
        try{
            if( res.data.code === 200 ){
                this.setSpecList(res.data.data);
                return res.data.data || [];
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 更改规格 - 发起请求
    updateSpecData = async (params = {}) => {
        const res = await service.updateSpecData(params);
        try{
            if( res.data.code === 200 ){
                this.cartLisData();
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 查询当前用户默认地址
    addressData = async () => {
        const res = await service.addressData({
            uname: session.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
                const { data={} } = res.data || {};
                if( Object.keys(data).length ){
                    this.setAddress(`${data.region}${data.detail}`);                    
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setDataSource();
        this.setSpecList();
        this.setCheckedArr();
        this.setAddress();
        this.setEmptyTip();
    }
}

export default new State();