import { observer } from '@tarojs/mobx'
import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
// less样式
import './index.less';

// 单品推广
@observer
class Index extends Taro.Component {
    render() {
        const { productsList=[] } = this.props;
        return (
          <View className='dm_Recommend'>
            <Swiper
              circular
              indicatorDots={false}
              autoplay
              vertical
              interval={4000}
            >
              {
                productsList.map( item => {
                    return (
                      <SwiperItem key={item.id} onClick={() => {
                            Taro.navigateTo({
                              url: `/pages/common/productsDetail/index?id=${item.id}`
                            })
                        }}
                      >【广告】{ item.description }</SwiperItem>
                    );
                } )
              }
            </Swiper>
          </View>
        );
    }
}

export default Index;