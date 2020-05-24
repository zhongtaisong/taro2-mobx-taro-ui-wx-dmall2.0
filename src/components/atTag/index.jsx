import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { AtTag } from 'taro-ui';

@observer
class Index extends Taro.Component {

    static options = {
      addGlobalClass: true
    }

    render() {
      return (
        <View className='dm_atTag'>
          <AtTag {...this.props}>{this.props.children}</AtTag>
        </View>
      );
    }
}

export default Index;