import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'

@observer
class Index extends Taro.Component {

    static options = {
      addGlobalClass: true
    }

    render() {
      return (
          <View className='dm_AtImagePicker'>
              <AtImagePicker {...this.props} />
          </View>
      );
    }
}

export default Index;