import Taro from '@tarojs/taro'
import { observable, action } from "mobx";
// 接口服务
import service from './service';

class State {

    // 搜索结果
    @observable searchResultList = [];
    @action setSearchResultList = (data = []) => {
        this.searchResultList = data;
    }

    // 关键字搜索结果 - 发起请求
    kwData = async (kw = '') => {
      const res = await service.kwData({
          kws: kw,
      });
      try{
        if( res.data.code === 200 ){
            const { data=[] } = res.data || {};
            if( data ){
                this.setSearchResultList(data);
                !data.length && Taro.showToast({
                  title: '抱歉！暂无相关商品',
                  icon: 'none'
                })
            }
        }
      }catch(err) {
          console.log(err);
      }
    }

}

export default new State();