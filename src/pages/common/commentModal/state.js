import { observable, action } from 'mobx';
// 接口服务
import service from './service';

class State {

    // 评价列表
    @observable commentList = [];
    @action setCommentList = (data = []) => {
        this.commentList = data;
    }

    // 商品评价 - 发起请求
    selcommentsData = async (params = {}) => {
        const res = await service.selcommentsData(params);
        try{
            if( res.data.code === 200 ){
              const { data } = res.data || {};
              this.setCommentList(data);
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();