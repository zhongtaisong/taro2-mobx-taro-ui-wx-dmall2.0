import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Image, Text } from '@tarojs/components'
// url前缀
import { PUBLIC_URL } from '@config';

// less样式
import './index.less';

// 热门推荐
@observer
class Index extends Taro.Component {

    static defaultProps = {
      hotList: []
    }

    render() {
        const { hotList } = this.props;
        return (
            <View className='dm_HotThisWeek'>
                <View className='title'>
                    <Image src={require('@img/svg/hot.svg')} />
                    <Text>热门推荐</Text>
                </View>
                {
                  hotList.length && (
                    <View className='dm_grid'>
                        {
                          hotList.map(item => {
                            return (
                              <View className='dm_grid_content' key={item.id}
                                onClick={() => {
                                    Taro.navigateTo({
                                      url: `/pages/common/productsDetail/index?id=${item.id}`
                                    })
                                }}
                              >
                                <Image mode='aspectFit' src={item.mainPicture ? PUBLIC_URL + item.mainPicture : ''} />
                                <View>
                                  <Text>{item.description}</Text>
                                  <View>
                                    <Text>￥</Text>
                                    { item.price ? Number(item.price).toFixed(2) : 0 }
                                  </View>
                                </View>
                              </View>
                            );
                          })
                        }
                    </View>
                  )
                }
            </View>
        );
    }
}

export default Index;