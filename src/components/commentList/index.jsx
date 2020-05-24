import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 设置
import { PUBLIC_URL } from '@config';
// less样式
import './index.less';

@observer
class Index extends Taro.Component {

  static options = {
    addGlobalClass: true
  }

  render() {
    const { list=[] } = this.props;
    return (
      <View className='dm_commentList'>
        {
          list.map((item, index) => {
            return (
              <View key={index}>
                <View className='top'>
                  <View className='top_list'>
                    <View>
                      <Image mode='aspectFit' src={item.avatar ? PUBLIC_URL + item.avatar : ''} alt='avatar' />
                    </View>
                    <Text>{item.uname}</Text>
                  </View>
                  <Text>{item.commentTime}</Text>
                </View>
                <View className='bottom'>{item.content}</View>
              </View>
            );
          })
        }
      </View>
    );
  }
}

export default Index;