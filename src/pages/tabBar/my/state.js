import Taro from '@tarojs/taro'
import { observable, action } from 'mobx';
// 全局公共方法
import { session } from '@utils';
// 接口服务
import service from './service';

class State {
    
    // 头像 和 昵称
    @observable unameInfo = {};
    @action setUnameInfo = (data = {}) => {
        this.unameInfo = data;
    }

    // 获取当前用户信息
    selectUserInfoData = async () => {
        const res = await service.selectUserInfoData({
            uname: session.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
                const { avatar, nickName } = res.data.data || {};
                this.setUnameInfo({ avatar, nickName });
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 退出登录
    logoutData = async () => {
        const res = await service.logoutData();
        try{
            if( res.data.code === 200 ){
                session.clear('token');
                Taro.reLaunch({
                  url: '/pages/components/login/index'
                })
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setUnameInfo();
    }
}

export default new State();