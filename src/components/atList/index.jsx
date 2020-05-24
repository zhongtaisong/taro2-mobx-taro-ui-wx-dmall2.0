import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtList, AtListItem, AtSwipeAction } from 'taro-ui'

@observer
class Index extends Taro.Component {

    static options = {
      addGlobalClass: true
    }

    // 滑动操作
    onAtSwipeActionClick = (id, item={}) => {
      if( typeof this.props.onAtSwipeActionClick === 'function' ) {
        this.props.onAtSwipeActionClick(item.type, id);
      }
    }

    render() {
        const { atListItem=[], className, isCustom=false, title, isShowAtSwipeAction=false, options=[] } = this.props;
        return (
            <View className={`dm_AtList ${className || ''}`}>
                {
                  !isCustom ? (
                    <AtList hasBorder={false} className='atList atList_border atList_width'>
                        {
                          atListItem.map((item, index) => {
                            return (
                              <AtSwipeAction key={index} autoClose disabled={!isShowAtSwipeAction}
                                options={options}
                                onClick={this.onAtSwipeActionClick.bind(this, item.id)}
                              >
                                <AtListItem key={index} {...item} hasBorder={false} className={item.className || ''} />
                              </AtSwipeAction>
                            );
                          })
                        }
                    </AtList>
                  ) : (
                    <View className='dm_custom_AtList'>
                        <View className='left'>{title}</View>
                        <View className='right'>{this.props.renderExtraChildren}</View>
                    </View>
                  )
                }
            </View>
        );
    }
}

export default Index;