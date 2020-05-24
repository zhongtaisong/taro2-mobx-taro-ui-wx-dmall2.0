import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { toJS } from 'mobx'
// 全局公共组件
import { NavBar, AtList, ProductList } from '@com';
// 全局公共方法
import { session } from '@utils';
// 数据
import state from './state';
// less样式
import './index.less';

// 结算页
@observer
class Index extends Taro.Component {

    constructor(props) {
        super(props);
        this.state = {
          pid: [],
          visible: false,
          type: null
        };
    }

    componentWillMount() {
      try{
        let { id, type='cart', num } = this.$router.params || {};
        if(id) {
          switch(type) {
            case 'cart':
              id = id.split(',');
              state.settlementData(id, type);
              break;
            case 'detail':
              id = [id];
              state.settlementData(id, type, Number(num));
              break;
          }
          this.setState({
            pid: id,
            type
          });
        }
      }catch(err) {
        console.log(err);
      }
    }

    componentWillUnmount() {
        state.clearMobxData();
    }

    config = {
      enablePullDownRefresh: false
    }

    // 提交订单
    handleSubmitOrders = () => {
        let { selectAddress, num, totalprice, nums } = state;
        if(!selectAddress.id) {
          Taro.showToast({
            title: '你还没有收货地址，请先到：我的-用户中心-收货地址添加',
            icon: 'none',
            duration: 3000
          })
          return;
        }
        state.addorderData({
            uname: session.getItem('uname'), 
            pid: this.state.pid, 
            aid: selectAddress.id,
            num,
            totalprice,
            nums
        }).then((orderId) => {
          if( orderId ){
              Taro.reLaunch({
                url: `/pages/components/orderDetails/index?id=${orderId}&pid=${this.state.pid}&type=${this.state.type}`
              })
          }else{
            throw new Error('订单主键orderId不能为空！')
          }
        });
    }

    // 更过收货地址
    moreAddress = () => {
      this.setState({
        visible: true
      })
    }

    onClickLeftIcon = () => {
      const { visible } = this.state;
      if(!visible) {
        Taro.navigateBack();
      }else{
        this.setState({
          visible: false
        })
      }
    }

    checkedAddress = (item) => {
      item['onClick'] = this.moreAddress;
      item['arrow'] = 'right';
      delete item['extraText'];
      state.setSelectAddress(item);
      this.setState({
        visible: false
      })
    }

    render() {
        let { dataSource02, selectAddress={}, dataSource01, num, totalprice } = state;
        const { visible } = this.state;
        dataSource01.length && dataSource01.map(item => {
          item['onClick'] = () => {
            let obj = JSON.parse(JSON.stringify(item));
            delete obj.onClick;
            this.checkedAddress(obj);
          }
        })
        selectAddress['onClick'] = this.moreAddress;
        return (
            <View className='dm_SettlementPage'>
              <NavBar {...this.props} title={!visible ? '结算页' : '收货地址'} leftIconType='chevron-left' 
                onClickLeftIcon={this.onClickLeftIcon}
              />
              {
                dataSource02.length && 
                <View style={{
                    padding:`${Taro.topHeight}px 10Px 50Px`
                  }}
                >
                  {
                    !visible ? (
                      <View>
                          {
                            Object.keys(selectAddress).length > 1 && 
                            <AtList 
                              atListItem={[selectAddress]}
                              className='address address_one'
                            />
                          }
                          <ProductList 
                            products={dataSource02} 
                            isShowSpecOther isShowAtSwipeAction={false}
                            disabledLink isShowMore={false}
                          />
                          <AtList 
                            atListItem={[
                              { title: '商品总数：', extraText: `${num} 件` },
                              { title: '商品金额', extraText: `￥${totalprice ? Number(totalprice).toFixed(2) : 0}` },
                            ]}
                            className='info'
                          />
                          <View className='bottom_tab_btns'>
                              <View>
                                  <Text>￥</Text>
                                  { totalprice ? Number(totalprice).toFixed(2) : 0 }
                              </View>
                              <View onClick={this.handleSubmitOrders}>提交订单</View>
                          </View>
                      </View>
                    ) : (
                      <AtList 
                        atListItem={toJS(dataSource01)}
                        className='address address_list'
                      />
                    )
                  }
                </View>
              }
            </View>
        );
    }
}

export default Index;