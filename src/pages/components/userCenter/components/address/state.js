import { observable, action } from 'mobx';
// 全局公共方法
import { session } from '@utils';
// 接口服务
import service from './service';

class State {

    // 设为默认地址
    @observable pickerValue = {};
    @action setPickerValue = (data = {}) => {
      this.pickerValue = data;
    }

    // 收货地址 - 表格 - 数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }
    @observable dataSource02 = [];
    @action setDataSource02 = (data = []) => {
        this.dataSource02 = data;
    }

    // 模态框 - 数据
    @observable addressModalData = {};
    @action setAddressModalData = (data = {}) => {
        this.addressModalData = data;
        this.setPickerValue({
          isDefault: data.isDefault
        });
    }
    
    // 添加收货地址 / 修改收货地址
    editAddressData = async (values = {}) => {
        const res = await service.editAddressData({
            uname: session.getItem('uname'),
            ...values
        });
        try{
            if( res.data.code === 200 ){
                this.selAddressData();
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 查询收货地址
    selAddressData = async () => {
        // 清除mobx数据
        this.clearMobxData();
        const res = await service.selAddressData({
            uname: session.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
              let { data } = res.data || {};
              if(data) {
                this.setDataSource02(data);
                data = data.map(item => {
                  return {
                    id: item.id,
                    title: `${item.name || ''} ${item.phone ? item.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3') : item.phone}`,
                    note: `${item.region || ''} ${item.detail || ''}`,
                    extraText: item.isDefault == 1 ? '默认' : ''
                  }
                })
                this.setDataSource(data);
              }
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除收货地址
    delAddressData = async (obj = {}) => {
        const res = await service.delAddressData(obj);
        try{
            if( res.data.code === 200 ){
                this.selAddressData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setDataSource();
        this.setDataSource02();
        this.setAddressModalData();
        this.setPickerValue();
    }

}

export default new State();