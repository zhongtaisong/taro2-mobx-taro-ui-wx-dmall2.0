import { observable, action, toJS } from "mobx";
// 全局公共方法
import { session } from '@utils';
// 接口服务
import service from './service';

// 一页展示多少条数据
const SIZE = 3;

class State {

    // 订单列表
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    // 当前页
    @observable current = 1;
    @action setCurrent = (data = 1) => {
        this.current = data;
    }

    // 数据总数
    @observable total = SIZE;
    @action setTotal = (data = SIZE) => {
        this.total = data;
    }

    // 商品列表
    @observable dataSource02 = [];
    @action setDataSource02 = (data = []) => {
        this.dataSource02 = data;
    }

    // 查询订单列表 - 发起请求
    selOrdersData = async () => {
        const res = await service.selOrdersData({
          uname: session.getItem('uname'),          
          current: this.current,
          pageSize: SIZE
        });
        try{
            if( res.data.code === 200 ){                
                let { products=[], total } = res.data.data || {};
                this.setDataSource([...toJS(this.dataSource), ...products]);
                this.setTotal( total );
                return products.length;
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除订单
    deleteOrderData = async (values) => {
        const res = await service.deleteOrderData(values);
        try{
            if( res.data.code === 200 ){
              this.setCurrent();
              this.setDataSource();
              this.selOrdersData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 查询订单详情 - 发起请求
    detailOrdersData = async (obj = {}) => {
        const res = await service.detailOrdersData(obj);
        try{
            if( res.data.code === 200 ){
                const { productsInfo=[] } = res.data.data || {};
                this.setDataSource02(productsInfo);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setDataSource();
        this.setCurrent();
        this.setTotal();
        this.setDataSource02();
    }
    
}

export default new State();