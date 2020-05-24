import Taro from '@tarojs/taro'
import { observable, action } from 'mobx';
// 全局公共方法
import { session } from '@utils';
// 接口服务
import service from './service';

class State {

    // 提交新密码所需参数
    @observable upwdObj = {};
    @action setUpwdObj = (data = {}) => {
        this.upwdObj = data;
    }

    // 登录
    loginData = async ( values ) => {
        const res = await service.loginData(values);
        try{
            if( res.data.code === 200 ){
              const { data } = res.data || {};
              session.setItem('uname', data.uname);
              session.setItem('token', data.token);
              Taro.reLaunch({ url: '/pages/tabBar/home/index' });
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 忘记密码 - 信息验证 - 下一步
    forgetPwdData = async ( values ) => {
        const res = await service.forgetPwdData(values);
        try{
            if( res.data.code === 200 ){
                const { data={} } = res.data || {};
                if(data) {
                  this.setUpwdObj(data);
                }
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 提交新密码
    newPwdData = async ( values = {} ) => {
        const res = await service.newPwdData({
            ...values,
            isForgetPwd: true,
            ...this.upwdObj
        });
        try{
            if( res.data.code === 200 ){
                res.data.data && Taro.setStorage({
                  key: 'uname',
                  data: res.data.data
                });
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setUpwdObj();
    }
}

export default new State();