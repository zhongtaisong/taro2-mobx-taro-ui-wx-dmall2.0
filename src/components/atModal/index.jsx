import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtModal } from 'taro-ui'

@observer
class Index extends Taro.Component {

  handleClose = () => {
    if( typeof this.props.onHandleClose === 'function' ) {
      this.props.onHandleClose();
    }
  }

  handleCancel = (e) => {
    if( typeof this.props.onHandleCancel === 'function' ) {
      this.props.onHandleCancel(e);
    }
  }

  handleConfirm = (e) => {
    if( typeof this.props.onHandleConfirm === 'function' ) {
      this.props.onHandleConfirm(e);
    }
  }

  render() {
      const { isOpened=false, content, cancelText, confirmText } = this.props;
      return (
          <View className='dm_atModal'>
            <AtModal
              {...this.props}
              isOpened={isOpened}
              onClose={this.handleClose}
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
              cancelText={cancelText || '取消'}
              confirmText={confirmText || '确认'}
              content={content || 'modal内容'}
            />
          </View>
      );
  }
}

export default Index;