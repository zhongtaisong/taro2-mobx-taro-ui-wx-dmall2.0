import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { toJS } from 'mobx'
import { AtBadge } from 'taro-ui'
// 公共组件
import { NavBar } from '@com';
// 全局公共方法
import { session } from '@utils';
// 商品
import Products from './components/products';
// 详情
import Details from './components/details';
// 评价
import Comments from './components/comments';
// 数据
import state from './state';
// 样式
import './index.less';

// 商品详情
@observer
class Index extends Taro.Component {

    constructor(props) {
        super(props);
        this.state = {
            num: 1,
            id: null
        };
    }

    componentDidMount() {
        const { id } = this.$router.params || {};
        id && state.selectProductsDetailData({id});
        state.productNumData();
        this.setState({ id })
    }

    componentWillUnmount() {
      state.clearMobxData();
    }

    // 下拉
    onPullDownRefresh() {
      const { id } = this.state;
      id && state.selectProductsDetailData({id});
      state.productNumData();
      Taro.stopPullDownRefresh();
    }

    // 加入购物车
    handleAddCart = () => {
        const { basicInfo={} } = state;
        if( basicInfo ){
            state.addcartData([{
                pid: basicInfo.id,
                num: this.state.num,
                totalprice: basicInfo.price ? Number(basicInfo.price) * this.state.num : basicInfo.price
            }]);
        }
    }

    // 立即购买
    immediatePurchase = () => {
        let { basicInfo={} } = state;
        const { id } = basicInfo;
        id && Taro.navigateTo({
          url: `/pages/components/settlementPage/index?id=${id}&num=${this.state.num}&type=detail`
        })
    }

    // 数量
    watchNumber = (value) => {
        this.setState(() => ({
            num: value
        }));
    }

    // 选择规格
    handleToggleSpecs = (id) => {
      if(id) {
        this.setState({ id })
        return new Promise((resolve, reject) => {
          state.selectProductsDetailData({id}).then((code) => {
            resolve(code);
          }).catch((err) => {
            reject(err);
          })
        })
      }
    }

    render() {
        const { basicInfo, imgList, specs, commentList, params={}, detailsPic, productNum } = state;
        return (
            <View className='dm_ProductsDetail'>
                <NavBar {...this.props} leftIconType='chevron-left' 
                  onClickLeftIcon={() => Taro.navigateBack({
                    fail() {
                      Taro.switchTab({
                        url: '/pages/tabBar/home/index'
                      })
                    }
                  })}
                />
                <View style={{padding:`10Px 0 60Px`}}>
                    <Products 
                      {...this.props}
                      basicInfo={toJS(basicInfo) || {}}
                      imgList={toJS(imgList) || []}
                      specs={toJS(specs) || []}
                      watchNumber={this.watchNumber}
                      num={this.state.num}
                      onHandleToggleSpecs={this.handleToggleSpecs}
                    />
                    <View className='line'></View>
                    <Comments {...this.props} commentList={toJS(commentList)} 
                      pid={params.id || ''}
                    />
                    <View className='line'></View>
                    <Details 
                      {...this.props}
                      detailsPic={toJS(detailsPic) || []}
                    />
                    <View className='line' />
                </View>
                {
                  session.getItem('uname') && session.getItem('token') ? (
                    <View className='bottom_tab_btns'>
                        <View className='cart' onClick={() => {
                            Taro.reLaunch({
                              url: `/pages/tabBar/myShoppingCart/index`
                            })
                          }}
                        >
                          <AtBadge value={productNum} maxValue={99}>
                            <Image mode='aspectFit' src={require('@img/svg/cart.svg')} />
                          </AtBadge>
                        </View>
                        <Text className='btn btn01' onClick={this.handleAddCart}>加入购物车</Text>
                        <Text className='btn btn02' onClick={this.immediatePurchase}>立即购买</Text>
                    </View>
                  ) : ''
                }
            </View>
        );
    }
}

export default Index;