import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { toJS } from 'mobx'
// 公共组件
import { SearchBar, NavBar } from '@com';
// banner
import CarouselBox from './components/CarouselBox';
// // 首页推荐
import Recommend from './components/Recommend';
// // 宫格列表
import GridList from './components/GridList';
// // 本周热门
import HotThisWeek from './components/HotThisWeek';
// 数据
import state from './state';
// less样式
import './index.less';

// 首页
@observer
class Home extends Taro.Component {

    componentDidMount() {
      state.imgCarouselData();
      state.productsListData();
      state.hotListData();
    }

    // 下拉
    onPullDownRefresh() {
      state.imgCarouselData();
      state.productsListData();
      Taro.stopPullDownRefresh();
    }

    onReachBottom() {
      state.hotListData();
    }

    render() {
        const { carouselList = [], productsList = [], hotList=[] } = state;
        return (
            <View className='dm_Home'>
                <NavBar {...this.props} title='首页' />
                <SearchBar {...this.props} disabled />
                <View style={{padding:`${Taro.topHeight+42}px 0 10Px`}}>
                  {carouselList.length && <CarouselBox {...this.props} carouselList={toJS(carouselList)} />}
                  {productsList.length && <Recommend {...this.props} productsList={toJS(productsList)} />}
                  <GridList {...this.props} />
                  <View className='line' />
                  {hotList.length && <HotThisWeek {...this.props} hotList={toJS(hotList)} />}
                  <View className='line' />
                </View>
            </View>
        );
    }
}

export default Home;