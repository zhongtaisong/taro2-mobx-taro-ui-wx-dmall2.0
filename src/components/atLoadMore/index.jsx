import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui';

@observer
class Index extends Taro.Component {

  constructor(props) {
      super(props);
      this.state = {
          status: 'more'
      };
  }

  static options = {
    addGlobalClass: true
  }

  onClick = () => {
    // 开始加载
    this.setState({
      status: 'loading'
    })
    if(typeof this.props.onClick === 'function' ) {
      this.props.onClick().then((len) => {
        if(!len) {
          this.setState({
            status: 'noMore'
          })
        }else{
          this.setState({
            status: 'more'
          })
        }
      });
    }
  }

  render() {
    const { status } = this.state;
      return (
        <View className='dm_AtLoadMore'>
            <AtLoadMore {...this.props} 
              moreBtnStyle={{
                fontSize: '13Px'
              }}
              noMoreTextStyle={{
                fontSize: '13Px'
              }}
              status={status}
              onClick={this.onClick}
            />
        </View>
      );
  }
}

export default Index;