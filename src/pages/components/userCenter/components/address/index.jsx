import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { toJS } from 'mobx';
// 全局公共组件
import { NavBar, AtList, AtForm, AtPicker } from '@com';
// 数据
import state from './state';
// less样式
import './index.less';

const addressArr = ['否', '是'];

// 收货地址
@observer
class Index extends Taro.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            otherErrTip: ''
        };
    }

    componentDidMount() {
        state.selAddressData();
    }

    componentWillUnmount() {
        state.clearMobxData();
    }

    // 下拉
    onPullDownRefresh() {
      state.selAddressData();
      Taro.stopPullDownRefresh();
    }

    // 保存
    handleOk = (e, obj) => {
      const { pickerValue } = state;
      const values = {...obj, ...pickerValue};
      values['id'] = this.state.id;
      state.editAddressData(values).then((code) => {
          if( code == 200 ) {
              this.toggleModal();
          }
      });
    }

    // 编辑
    editAddress = (item) => {
        if(item){
            this.toggleModal();
            item['isDefault'] = Number(item.isDefault);
            state.setAddressModalData(item);
            this.setState({ 
                id: item.id
            });
        }
    }

    // 切换模态框
    toggleModal = () => {
        this.setState(({ visible }) => ({
            visible: !visible
        }));
        state.setAddressModalData();
        this.setState({ 
            id: null
        });
    }

    // 编辑 / 删除
    onAtSwipeActionClick = (type, id) => {
      const { dataSource02 } = state;
      switch(type) {
        case 'edit':
          let data = toJS(dataSource02).filter(item => item.id == id);
          this.editAddress(data[0]);
          break;
        case 'del':
          state.delAddressData({ id });
          break;
      }
    }

    // 设为默认地址
    atPickerChange = (_this, value) => {
      let { pickerValue } = state;
      pickerValue[_this] = Number(value);
      state.setPickerValue(pickerValue)
    }

    // navBar返回操作
    onClickLeftIcon = (visible) => {
      if(!visible) {
        Taro.navigateBack();
      }else{
        this.toggleModal();
      }
    }

    render() {
        const { dataSource=[], pickerValue, addressModalData } = state;
        const { visible, otherErrTip } = this.state;
        return (
          <View className='dm_ReceivingAddress'>
              <NavBar {...this.props} title={!visible ? '收货地址' : '添加收货地址'} leftIconType='chevron-left'
                onClickLeftIcon={this.onClickLeftIcon.bind(this, visible)}
              />
              <View style={{
                  padding:`${Taro.topHeight}px 10Px 0`
                }}
              >
                {
                  !visible ? (
                    <View>
                      <AtList 
                        atListItem={toJS(dataSource)}
                        className='address address_list'
                        isShowAtSwipeAction
                        options={[
                          { type: 'edit', text: '编辑', style: { backgroundColor: '#1890FF' } },
                          { type: 'del', text: '删除', style: { backgroundColor: '#0E80D2' } }
                        ]}
                        onAtSwipeActionClick={this.onAtSwipeActionClick}
                      />
                      <View className='add_address' onClick={this.toggleModal}>添加收货地址</View>
                    </View>
                  ) : (
                    <AtForm 
                      {...this.props}
                      atInputArr={[
                        { code: 'name', name: '收货人', title: '收货人', required: true, type: 'text', placeholder: '请输入', clear: true, initValue: addressModalData.name },
                        { code: 'region', name: '所在地区', title: '所在地区', required: true, type: 'text', placeholder: '请输入', clear: true, initValue: addressModalData.region },
                        { code: 'detail', name: '详情地址', title: '详情地址', required: true, type: 'text', placeholder: '请输入', clear: true, initValue: addressModalData.detail },
                        { code: 'phone', name: '联系电话', title: '联系电话', required: true, type: 'phone', placeholder: '请输入', clear: true, initValue: addressModalData.phone }
                      ]}
                      btnArr={[
                        { text: '保存', type: 'primary', onClick: this.handleOk }
                      ]}
                      otherErrTip={otherErrTip}
                      renderChildren={() => {
                        return (
                          <AtPicker
                            label='isDefault'
                            mode='selector' 
                            range={addressArr || []}
                            atListItem={[{ title: '设为默认地址', extraText: addressArr[pickerValue['isDefault']] || '请选择' }]}
                            onChange={this.atPickerChange.bind(this, 'isDefault')}
                          />
                        );
                      }}
                    />
                  )
                }
              </View>
          </View>
        );
    }
}

export default Index;