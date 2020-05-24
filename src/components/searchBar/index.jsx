import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './index.less';
// ------------------------------------------- 搜索栏 ---------------------------------- //
@observer
class Index extends Taro.Component {

  static options = {
    addGlobalClass: true
  }

  toggleModal = () => {
    Taro.navigateTo({
      url: '/pages/common/searchModal/index'
    })
  }

  render() {
    const { disabled=false, placeholder='搜索商品', isHideBtn=false } = this.props;
    return (       
      <View className='dm_AtSearchBar'
        onClick={disabled ? this.toggleModal : null}
        style={disabled ? {
          width: '100%',
          position: 'fixed',
          left: 0,
          top: `${Taro.topHeight}px`,
          zIndex: 999
        } : {}} 
      >
        <AtSearchBar
          {...this.props}
          placeholder={placeholder}
          disabled={disabled}
          className={isHideBtn ? 'AtSearchBar_hideBtn' : ''}
        />
      </View>
    );
  }
}

export default Index;