import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { toJS } from 'mobx';
// 全局公共组件
import { NavBar, AtForm, AtPicker, AtImagePicker, AtList } from '@com';
// 全局公共方法
import { session } from '@utils';
// 数据
import state from './state';
// less样式
import './index.less';

const genderArr = ['男', '女', '保密'];

// 个人资料
@observer
class Index extends Taro.Component {

    constructor(props) {
      super(props);
      this.state = {
        otherErrTip: ''
      }
    }

    componentDidMount() {
      state.selectUserInfoData();
    }

    componentWillUnmount() {
      state.clearMobxData();
    }

    // 下拉
    onPullDownRefresh() {
      state.selectUserInfoData();
      Taro.stopPullDownRefresh();
    }

    // 提交
    handleSubmit = (e, obj) => {
      this.setState({ otherErrTip: '' })
      try{
        const { pickerValue: { gender, birthday } } = state;
        let { otherErrTip } = this.state;
        otherErrTip = [];

        if(!gender) otherErrTip.push('性别');
        if(!birthday) otherErrTip.push('生日');

        if(otherErrTip.length) {
          this.setState({ otherErrTip: `${otherErrTip.join('、')}必选` })
        }else{
          
          const values = {gender, birthday, ...obj};          
          values['gender'] = Number(values['gender']);

          let userInfo = {};
          userInfo = {...values};
          let { avatar, delList, updateUserInfoData } = state;
          let formData = {};
    
          if( !avatar.length ){
              this.setState({ otherErrTip: '头像，必传' })
              return;
          }else{
              let { url } = avatar[0] || {};
              if( url.indexOf('api/') > -1 ) {
                formData['avatar'] = url.slice(url.indexOf('api/') + 4);
              }else{
                formData['avatar'] = Taro.getFileSystemManager().readFileSync(url, 'base64');
              }

          }    
          // 表单
          formData['userInfo'] = JSON.stringify(userInfo);
          // 存储被删图片
          formData['delList'] = JSON.stringify(delList);
          formData['uname'] = session.getItem('uname');
          formData['type'] = 'wx';
          updateUserInfoData(formData);

        }
      }catch(err) {
        console.log(err);
      }
    }

    // 性别、生日
    atPickerChange = (_this, value) => {
      let { pickerValue } = state;
      pickerValue[_this] = value;
      state.setPickerValue(pickerValue)
    }

    // 头像
    atImagePickerChange = (files, operationType) => {
      const { avatar } = state;
      let url = avatar.length && avatar[0].url ? avatar[0].url : '';
      if( operationType == 'remove' && url.includes('api/') ) {
        state.setDelList([url.slice(url.indexOf('api/') + 4)]);
      }
      state.setAvatar(files);
    }

    render() {
        const { personalInformation={}, avatar, pickerValue } = state;
        const { otherErrTip } = this.state;
        return (
            <View className='dm_PersonalInformation'>
                <NavBar {...this.props} title='个人资料' leftIconType='chevron-left'
                  onClickLeftIcon={() => Taro.navigateBack()}
                />
                {                  
                  Object.keys(personalInformation).length && 
                  <View style={{
                      padding:`${Taro.topHeight}px 10Px 0`
                    }}
                  >
                    <AtList 
                      isCustom
                      title='头像'
                      renderExtraChildren={
                        () => {
                          return (
                            <AtImagePicker
                              multiple={false}
                              length={1}
                              count={1}
                              showAddBtn={!avatar.length}
                              files={toJS(avatar)}
                              onChange={this.atImagePickerChange}
                            />
                          )
                        }
                      }
                    />
                    <AtForm 
                      {...this.props}
                      atInputArr={[
                        { code: 'uname', name: '用户名', title: '用户名', required: false, type: 'text', placeholder: '-', editable: false, initValue: personalInformation.uname },
                        { code: 'nickName', name: '昵称', title: '昵称', required: true, type: 'text', placeholder: '请输入', clear: true, initValue: personalInformation.nickName },
                        { code: 'phone', name: '手机号码', title: '手机号码', required: true, type: 'phone', placeholder: '请输入', clear: true, initValue: personalInformation.phone }
                      ]}
                      renderChildren={() => {
                        return (
                          <View>
                            <AtPicker
                              label='gender'
                              mode='selector' 
                              range={genderArr || []}
                              atListItem={[{ title: '性别', extraText: genderArr[pickerValue['gender']] || '请选择' }]}
                              onChange={this.atPickerChange.bind(this, 'gender')}
                            />
                            <AtPicker
                              label='birthday'
                              mode='date' 
                              atListItem={[{ title: '生日', extraText: pickerValue['birthday'] || '请选择' }]}
                              onChange={this.atPickerChange.bind(this, 'birthday')}
                            />
                          </View>
                        );
                      }}
                      btnArr={[
                        { text: '保存', type: 'primary', onClick: this.handleSubmit }
                      ]}
                      otherErrTip={otherErrTip}
                    />
                  </View>
                }
            </View>
        );
    }
}

export default Index;