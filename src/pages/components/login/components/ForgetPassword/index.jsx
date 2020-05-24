import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 全局公共组件
import { NavBar, AtForm } from '@com';

// 忘记密码
@observer
class Index extends Taro.Component {
    render() {
        const { onHandleTarget } = this.props;
        return (
            <View className='dm_ForgetPassword'>
                <NavBar {...this.props} leftIconType='chevron-left'
                  onClickLeftIcon={onHandleTarget}
                  title='忘记密码' 
                />
                <AtForm 
                  {...this.props}
                  atInputArr={[
                    { code: 'email', name: '邮箱', required: true, type: 'text', placeholder: '邮箱', clear: true },
                    { code: 'uname', name: '用户名', required: true, type: 'text', placeholder: '用户名', clear: true },
                    { code: 'phone', name: '手机号码', required: true, type: 'text', placeholder: '手机号码', clear: true }
                  ]}
                  btnArr={[
                    { text: '验证信息', type: 'primary', onClick: (e, values) => {
                      onHandleTarget('new', e, values)
                    } }
                  ]}
                  otherBtnArr={[
                    { text: '直接登录', onClick: () => {
                      onHandleTarget()
                    } }
                  ]}
                />
            </View>
        );
    }
}

export default Index;