import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 全局公共组件
import { NavBar, AtForm } from '@com';
// 全局设置
import { PWD_KEY } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';

// 注册
@observer
class Index extends Taro.Component {

    constructor(props) {
      super(props)
      this.state = {
        otherErrTip: ''
      }
    }

    config = {
      enablePullDownRefresh: false
    }

    // 提交注册信息
    handleSubmit = (e, values) => {
      let { upwd, confirm, uname } = values || {};
      let obj = JSON.parse(JSON.stringify(values));
      if( !(/\w/g.test(uname)) ) {
        this.setState({ otherErrTip: '亲，用户名只能由英文、数字、"_"组成' })
        return;
      }
      if( upwd != confirm ) {
          this.setState({ otherErrTip: '密码和确认密码不一致！' })
      }else{
        this.setState({
          otherErrTip: ''
        });
        obj.upwd = this.$md5( obj.upwd + PWD_KEY );
        obj.confirm = this.$md5( obj.confirm + PWD_KEY );
        state.registerData(obj);
      }
    };

    render() {
        const { otherErrTip } = this.state;
        return (
            <View className='dm_Register'>
                <NavBar {...this.props} leftIconType='chevron-left' 
                  onClickLeftIcon={() => Taro.navigateBack()}
                  title='注册'
                />
                <View style={{paddingTop:`${Taro.topHeight}px`}}>
                  <AtForm 
                    {...this.props}
                    atInputArr={[
                      { code: 'uname', name: '用户名', title: '用户名', required: true, type: 'text', placeholder: '请输入', clear: true },
                      { code: 'phone', name: '手机号码', title: '手机号码', required: true, type: 'phone', placeholder: '请输入', clear: true },
                      { code: 'email', name: '邮箱', title: '邮箱', required: true, type: 'email', placeholder: '请输入', clear: true },
                      { code: 'upwd', name: '密码', title: '密码', required: true, type: 'text', placeholder: '请输入', clear: true },
                      { code: 'confirm', name: '确认密码', title: '确认密码', required: true, type: 'text', placeholder: '请输入', clear: true }
                    ]}
                    btnArr={[
                      { text: '提交注册信息', type: 'primary', onClick: (e, values) => {
                        this.handleSubmit(e, values)
                      } }
                    ]}
                    otherErrTip={otherErrTip}
                    otherBtnArr={[
                      { text: '已有账号，直接登录', onClick: () => {
                        Taro.navigateTo({
                          url: '/pages/components/login/index'
                        })
                      } },
                    ]}
                  />
                </View>
            </View>
        );
    }
}

export default Index;