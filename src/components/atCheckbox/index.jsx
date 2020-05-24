import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { AtCheckbox } from 'taro-ui';

@observer
class Index extends Taro.Component {

    static options = {
      addGlobalClass: true
    }

    render() {
        return (
            <View className='dm_atCheckbox'>
                <AtCheckbox {...this.props} />
            </View>
        );
    }
}

export default Index;