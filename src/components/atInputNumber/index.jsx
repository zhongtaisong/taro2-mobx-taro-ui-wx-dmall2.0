import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtInputNumber } from 'taro-ui'

@observer
class Index extends Taro.Component {

    static options = {
      addGlobalClass: true
    }

    render() {
        return (
            <View className='dm_atInputNumber'>
                <AtInputNumber {...this.props} />
            </View>
        );
    }
}

export default Index;