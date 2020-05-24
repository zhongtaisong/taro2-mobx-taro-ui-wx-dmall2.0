import { observer } from '@tarojs/mobx'
import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
// url前缀
import { PUBLIC_URL } from '@config';
// less样式
import './index.less';

// 走马灯区域 + 首页推荐
@observer
class Index extends Taro.Component {
    render() {
        const { carouselList=[] } = this.props;
        return (
            <View className='dm_CarouselBox'>
                <Swiper
                  indicatorColor='#D6D6D6'
                  indicatorActiveColor='#1890ff'
                  circular
                  indicatorDots
                  autoplay
                >
                    {
                        carouselList.map( item => {
                            return (
                                <SwiperItem key={item.id} onClick={() => {
                                      Taro.navigateTo({
                                        url: `/pages/common/productsDetail/index?id=${item.id}`
                                      })
                                  }}
                                >
                                  <Image src={`${PUBLIC_URL}${item.bannerPic}`} />
                                </SwiperItem>
                            );
                        } )
                    }
                </Swiper>
            </View>
        );
    }
}

export default Index;