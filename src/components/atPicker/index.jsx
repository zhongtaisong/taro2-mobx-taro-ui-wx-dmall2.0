import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Picker } from '@tarojs/components'
// 全局公共组件
import { AtList } from '@com';

@observer
class Index extends Taro.Component {

    static options = {
      addGlobalClass: true
    }

    onChange = (e) => {
      const { onChange } = this.props || {};
      if( typeof onChange === 'function' ) {
        onChange(e.detail.value);
      }
    }

    render() {
      const { mode='selector', range=[], atListItem=[] } = this.props;
      return (
          <View className='dm_Picker'>
            {
              mode == 'selector' ? (
                <Picker mode='selector' range={range} onChange={this.onChange}>
                  <AtList atListItem={atListItem} />
                </Picker>
              ) : mode == 'date' ? (
                <Picker mode='date' onChange={this.onChange}>
                  <AtList atListItem={atListItem} />
                </Picker>
              ) : ''
            }
          </View>
      );
    }
}

export default Index;