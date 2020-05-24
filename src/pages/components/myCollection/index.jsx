import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { toJS } from 'mobx'
// 全局公共组件
import { ProductList, NavBar } from '@com';
// 数据
import state from './state';
// -------------------------------------------- 我的收藏 ---------------------------------------- //
@observer
class Index extends Taro.Component {

    componentDidMount() {
        state.cartLisData();
    }

    componentWillUnmount() {
        state.clearMobxData();
    }

    // 下拉
    onPullDownRefresh() {
      state.cartLisData();
      Taro.stopPullDownRefresh();
    }

    render() {
        let { dataSource=[] } = state;
        return (
            <View className='dm_MyCollection'>
                <NavBar {...this.props} title='我的收藏' leftIconType='chevron-left'
                  onClickLeftIcon={() => Taro.navigateBack()}
                />
                <View style={{
                    padding:`${Taro.topHeight+10}px 10Px`
                  }}
                >
                  <ProductList
                    products={toJS(dataSource)} 
                    isShowSpecOther isShowAtSwipeAction isShowMore={false}
                    type='collection'
                    options={[
                      { type: 'cart', text: '加入购物车', style: {
                          backgroundColor: '#1890FF'
                        }
                      },
                      { type: 'del', text: '删除', style: {
                          backgroundColor: '#0E80D2'
                        }
                      }
                    ]}
                    onAtSwipeActionClick={(type, id) => {
                      switch(type) {
                        case 'cart':
                          state.addcolsData([id]);
                          break;
                        case 'del':
                          state.delcartData([id]);
                          break;
                      }
                    }}
                  />
                </View>
            </View>
        );
    }
}

export default Index;