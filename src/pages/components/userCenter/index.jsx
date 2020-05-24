import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 全局公共组件
import { NavBar, AtList } from '@com';
// ------------------------------------------ 我的 ---------------------------------------//
@observer
class Index extends Taro.Component {

  config = {
    enablePullDownRefresh: false
  }

  render() {
      return (
          <View className='dm_UserCenter'>
              <NavBar {...this.props} title='用户中心' leftIconType='chevron-left'
                onClickLeftIcon={() => Taro.navigateBack()}
              />
              <View style={{
                  padding:`${Taro.topHeight}px 10Px 0`
                }}
              >
                <AtList 
                  atListItem={[
                    { title: '个人资料', arrow: 'right', onClick: () => {
                      Taro.navigateTo({
                        url: '/pages/components/userCenter/components/info/index'
                      })
                    } },
                    { title: '修改登录密码', arrow: 'right', onClick: () => {
                      Taro.navigateTo({
                        url: '/pages/components/userCenter/components/password/index'
                      })
                    } },
                    { title: '收货地址', arrow: 'right', onClick: () => {
                      Taro.navigateTo({
                        url: '/pages/components/userCenter/components/address/index'
                      })
                    } }
                  ]}
                />
              </View>
          </View>
      );
  }
}

export default Index;