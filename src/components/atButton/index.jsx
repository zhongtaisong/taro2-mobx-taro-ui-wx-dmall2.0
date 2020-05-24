import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui';

@observer
class Index extends Taro.Component {

    static options = {
      addGlobalClass: true
    }

    render() {
        return (
            <View className='dm_atButton'>
                <AtButton {...this.props}>{this.props.children}</AtButton>
            </View>
        );
    }
}

export default Index;