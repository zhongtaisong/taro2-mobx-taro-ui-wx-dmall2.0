import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 全局公共方法
import { session } from '@utils';
// 全局公共组件
import { NavBar, AtForm } from '@com';

// 登录
@observer
class Index extends Taro.Component {
    render() {
        const { onHandleTarget, onLoginSubmit } = this.props;
        return (
            <View className='dm_Logins'>
                <NavBar {...this.props} leftIconType='chevron-left' 
                  onClickLeftIcon={() => Taro.switchTab({
                    url: '/pages/tabBar/home/index'
                  })}
                  title='登录'
                />
                <AtForm 
                  {...this.props}
                  atInputArr={[
                    { code: 'uname', name: '用户名', required: true, type: 'text', placeholder: '用户名', clear: true, initValue: session.getItem('uname') },
                    { code: 'upwd', name: '密码', required: true, type: 'password', placeholder: '密码', clear: true }
                  ]}
                  btnArr={[
                    { text: '登录', type: 'primary', onClick: onLoginSubmit }
                  ]}
                  otherBtnArr={[
                    { text: '忘记密码？', onClick: () => {
                      onHandleTarget('forget')
                    } },
                    { text: '新用户注册', onClick: () => {
                      Taro.navigateTo({
                        url: '/pages/components/register/index'
                      })
                    } },
                  ]}
                />
            </View>
        );
    }
}

export default Index;