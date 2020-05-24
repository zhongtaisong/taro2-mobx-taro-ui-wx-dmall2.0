import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { toJS } from 'mobx'
// 全局公共组件
import { SearchBar, NavBar, ProductList } from '@com';
// 数据
import state from './state';
// 样式
import './index.less';
// ------------------------------------------ 杂货铺 ---------------------------------------//
@observer
class Index extends Taro.Component {

    componentDidMount() {
      state.productsData();
    }

    componentWillUnmount() {
        state.clearMobxData();
    }

    // 下拉
    async onPullDownRefresh() {
      let { current, setCurrent } = state;
      current++;
      await setCurrent(current);
      await state.productsData();
      Taro.stopPullDownRefresh();
    }

    onAtLoadMoreClick = async () => {
      let { current, setCurrent } = state;
      current++;
      await setCurrent(current);
      return state.productsData()
    }

    render() {
        const { productList=[] } = state;
        return (
            <View className='dm_Products'>
              <NavBar {...this.props} title='杂货铺' />
              <SearchBar {...this.props} disabled />
              <View style={{padding:`${Taro.topHeight+42}px 10Px 0`}}>
                  <ProductList products={toJS(productList)} isShowTag onAtLoadMoreClick={this.onAtLoadMoreClick} isShowAtSwipeAction={false} />
              </View>
            </View>
        );
    }
}

export default Index;