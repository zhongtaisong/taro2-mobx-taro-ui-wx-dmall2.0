import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 设置
import { PWD_KEY } from '@config';
// 登录
import Logins from './components/Logins';
// 忘记密码
import ForgetPassword from './components/ForgetPassword';
// 新密码
import NewPassword from './components/NewPassword';
// 数据
import state from './state';
// less样式
import './index.less';

// 登录、忘记密码、新密码
@observer
class Index extends Taro.Component {

    // code: 0表示登录组件，1忘记密码组件，2新密码组件
    constructor(props) {
        super(props);
        this.state = {
          code: 0,
          otherErrTip: ''
        };
    }

    componentWillUnmount() {
        state.clearMobxData();
    }

    config = {
      enablePullDownRefresh: false
    }

    // 登录
    loginSubmit = (e, values={}) => {
      let obj = JSON.parse(JSON.stringify(values));
      obj.upwd = this.$md5( obj.upwd + PWD_KEY );
      // 0表示不记住密码， 1表示记住密码
      obj.isRemember = obj.isRemember && obj.isRemember.length ? 1 : 0;
      state.loginData(obj);
    };

    // 跳转
    handleTarget = (that, e, values={}) => {
        let obj = JSON.parse(JSON.stringify(values));
        if( that === 'forget' ){
            this.setState({ code: 1 });
            return;
        }else if( that === 'new' ){
            state.forgetPwdData(obj).then((res) => {
              if( res === 200 ){
                this.setState({ code: 2 });
              }
            });
            return;
        }else if( that === 'log' ){
            const { uPwd, confirm } = obj || {};
            if( uPwd != confirm ) {
                this.setState({
                  otherErrTip: '新密码和确认密码不一致！'
                })
                return;
            }else{
              this.setState({
                otherErrTip: ''
              });
              let newUpwd = this.$md5( obj.confirm + PWD_KEY );
              state.newPwdData({ newUpwd }).then((res) => {
                if(res == 200) {
                  this.setState({ 
                    code: 0
                  });
                }
              });
            }
            return;
        }else{
            this.setState({ code: 0 });
        }
    }

    handleBtn = () => {
      this.setState({
        code: 1
      })
    }

    render() {
        const { code, otherErrTip } = this.state;
        return (
            <View className='dm_Login'>
                <View style={{paddingTop:`${Taro.topHeight}px`}}>
                    {
                        code === 0 ? (
                          <Logins {...this.props} 
                            onLoginSubmit={this.loginSubmit}
                            onHandleTarget={this.handleTarget}
                          />
                        ) : code === 1 ? (
                            <ForgetPassword 
                              {...this.props}
                              onHandleTarget={this.handleTarget}
                            />
                        ) : code === 2 ? (
                            <NewPassword 
                              {...this.props}
                              onHandleTarget={this.handleTarget}
                              otherErrTip={otherErrTip}
                            />
                        ) : ''
                    }
                </View>
            </View>
        );
    }
}

export default Index;