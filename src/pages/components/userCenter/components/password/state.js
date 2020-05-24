import Taro from '@tarojs/taro'
// 全局公共方法
import { session } from '@utils';
// 接口服务
import service from './service';

class State {

    // 修改登录密码
    updateUpwdData = async (obj = {}) => {
        const res = await service.updateUpwdData({
            uname: session.getItem('uname'),
            ...obj
        });
        try{
            if( res.data.code === 200 ){
              session.clear('token');
              Taro.navigateTo({
                url: '/pages/components/login/index'
              })
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();