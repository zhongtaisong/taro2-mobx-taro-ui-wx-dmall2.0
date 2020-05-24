import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 全局公共组件
import { NavBar, AtForm } from '@com';

// 新密码
@observer
class Index extends Taro.Component {
    render() {
      const { onHandleTarget } = this.props;
        return (
            <View className='dm_NewPassword'>
                <NavBar {...this.props} leftIconType='chevron-left'
                  onClickLeftIcon={onHandleTarget}
                  title='修改密码' 
                />
                <AtForm 
                  {...this.props}
                  atInputArr={[
                    { code: 'uPwd', name: '新密码', required: true, type: 'text', placeholder: '新密码', clear: true },
                    { code: 'confirm', name: '确认密码', required: true, type: 'text', placeholder: '确认密码', clear: true }
                  ]}
                  btnArr={[
                    { text: '提交新密码', type: 'primary', onClick: (e, values) => {
                      onHandleTarget('log', e, values)
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