import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 全局公共组件
import { NavBar, AtList, ProductList } from '@com';
// 数据
import state from './state';
// less样式
import './index.less';

// 订单详情
@observer
class Index extends Taro.Component {

    constructor(props) {
        super(props);
        this.state = {
          type: null,
          pid: null
        };
    }

    componentDidMount() {
      try{
        let { id, type, pid } = this.$router.params || {};
        state.detailOrdersData({ id });
        this.setState({ type, pid })
      }catch(err) {
        console.log(err)
      }
    }

    componentWillUnmount() {
      state.clearMobxData();
    }

    config = {
      enablePullDownRefresh: false
    }

    onClickLeftIcon = (type) => {
      switch(type) {
        case 'cart':
          Taro.switchTab({
            url: '/pages/tabBar/myShoppingCart/index'
          })
          break;
        case 'detail':
          Taro.redirectTo({
            url: `/pages/common/productsDetail/index?id=${this.state.pid}`
          })
          break;
        default: 
          Taro.navigateBack();
      }
    }

    render() {
        const { dataSource02=[], 
          orderInfo: { ordernum='-', submitTime='-', num=0, totalprice=0 },
          consignees: { detail='-', name='-', phone='-', region='-' }
        } = state;
        const { type } = this.state;
        return (
            <View className='dm_orderDetails'>
                <NavBar {...this.props} title='订单详情' leftIconType='chevron-left'
                  onClickLeftIcon={this.onClickLeftIcon.bind(this, type)}
                />
                <View style={{
                    padding:`${Taro.topHeight}px 10Px 50Px`
                  }}
                >
                  <AtList 
                    atListItem={[
                      {
                        title: `${name || ''} ${phone ? phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3') : phone}`,
                        note: `${region || ''} ${detail || ''}`
                      }
                    ]}
                    className='address address_one'
                  />
                  <ProductList 
                    products={dataSource02} 
                    isShowSpecOther isShowAtSwipeAction={false}
                    disabledLink isShowMore={false}
                  />
                  <AtList 
                    atListItem={[
                      { title: '商品总数：', extraText: `${num} 件` },
                      { title: '商品总价', extraText: `￥${totalprice ? Number(totalprice).toFixed(2) : 0}` },
                      { title: '实付款', extraText: `￥${totalprice ? Number(totalprice).toFixed(2) : 0}`, className: 'pay_money' }
                    ]}
                    className='info'
                  />
                  <AtList 
                    atListItem={[
                      { title: '订单编号', extraText: ordernum },
                      { title: '付款时间', extraText: submitTime }
                    ]}
                    className='info'
                  />
                </View>
            </View>
        );
    }
}

export default Index;