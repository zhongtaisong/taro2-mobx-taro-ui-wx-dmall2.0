import Taro from '@tarojs/taro'
// 全局公共方法
import { session } from '@utils';
// 接口服务
import service from './service';

class State {

    // 注册
    registerData = async ( values ) => {
        const res = await service.registerData(values);
        try{
            if( res.data.code === 200 ){
                const { data } = res.data || {};
                data && session.setItem('uname', data); 
                Taro.reLaunch({ url: '/pages/components/login/index' });
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();