import Taro from '@tarojs/taro'
import { observable, action } from 'mobx';
// url前缀
import { PUBLIC_URL } from '@config';
// 全局公共方法
import { session } from '@utils';
// 接口服务
import service from './service';

class State {

    // 性别、生日
    @observable pickerValue = {};
    @action setPickerValue = (data = {}) => {
      this.pickerValue = data;
    }

    // -------------------- 上传图片 -------------------------- //    
        // 存储被删图片 - 数据
        @observable delList = [];
        @action setDelList = (data = []) => {
          this.delList = data;
        }
    // -------------------- 上传图片 -------------------------- //

    // 个人资料
    @observable personalInformation = {};
    @action setPersonalInformation = (data = {}) => {
        this.personalInformation = data;
    }

    // 个人资料 - 头像
    @observable avatar = [];
    @action setAvatar = (data = []) => {
      this.avatar = data;
    }

    // 查询 - 个人资料
    selectUserInfoData = async () => {
        if(!session.getItem('uname')) return;
        const res = await service.selectUserInfoData({
            uname: session.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
                const { data } = res.data || {};
                if(data) {
                    this.setPersonalInformation(data);
                    data.avatar && this.setAvatar([{ url: `${PUBLIC_URL}${data.avatar}` }]);
                    this.setPickerValue({
                      gender: data.gender, 
                      birthday: data.birthday
                    });
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 修改 - 个人资料
    updateUserInfoData = async (values = {}) => {
        const res = await service.updateUserInfoData(values);
        try{
            if( res.data.code === 200 ){
                this.setDelList();
                Taro.navigateBack();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setPersonalInformation();
        this.setPickerValue();
        this.setDelList();
        this.setAvatar();
    }

}

export default new State();