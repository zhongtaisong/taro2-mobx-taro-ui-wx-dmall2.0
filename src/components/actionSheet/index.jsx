import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'

@observer
class Index extends Taro.Component {

    static options = {
      addGlobalClass: true
    }

    handleClick  = (id, e) => {
      if( typeof this.props.onClick === 'function' ) {
        this.props.onClick(id, e)
      }
    }

    render() {
        const { atActionSheetItem=[], isOpened=false } = this.props;
        return (
            <View className='dm_actionSheet'>
                <AtActionSheet isOpened={isOpened}
                  {...this.props}
                >
                    {
                      atActionSheetItem.map((item, index) => {
                        return (
                          <AtActionSheetItem className={item.isActive ? 'active' : ''} key={index} onClick={this.handleClick.bind(this, item.id)}>{item.value}</AtActionSheetItem>
                        );
                      })
                    }
                </AtActionSheet>
            </View>
        );
    }
}

export default Index;