import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 全局公共组件
import { NavBar, AtForm } from '@com';
// 设置
import { PWD_KEY } from '@config';
// 数据
import state from './state';

// 个人资料
@observer
class Index extends Taro.Component {

  constructor(props) {
    super(props);
    this.state = {
      otherErrTip: ''
    }
  }

  // 保存
  handleSubmit = (e, obj={}) => {
    this.setState({ otherErrTip: '' })
    const values = JSON.parse(JSON.stringify(obj));
    if( values.newUpwd !== values.confirmNewUpwd ){
        this.setState({ otherErrTip: '两次输入的新密码不一致' })
    }else{
        values.oldUpwd = this.$md5(values.oldUpwd + PWD_KEY);
        values.newUpwd = this.$md5(values.newUpwd + PWD_KEY);
        delete values['confirmNewUpwd'];
        state.updateUpwdData(values);
    }
  }

  render() {
      const { otherErrTip } = this.state;
      return (
        <View className='dm_LoginPassword'>
            <NavBar {...this.props} title='修改登录密码' leftIconType='chevron-left'
              onClickLeftIcon={() => Taro.navigateBack()}
            />
            <View style={{
                padding:`${Taro.topHeight}px 10Px 0`
              }}
            >
              <AtForm 
                {...this.props}
                atInputArr={[
                  { code: 'oldUpwd', name: '旧密码', title: '旧密码', required: true, type: 'text', placeholder: '请输入', clear: true },
                  { code: 'newUpwd', name: '新密码', title: '新密码', required: true, type: 'text', placeholder: '请输入', clear: true },
                  { code: 'confirmNewUpwd', name: '确认新密码', title: '确认新密码', required: true, type: 'text', placeholder: '请输入', clear: true }
                ]}
                btnArr={[
                  { text: '保存', type: 'primary', onClick: this.handleSubmit }
                ]}
                otherErrTip={otherErrTip}
              />
            </View>
        </View>
      );
  }
}

export default Index;