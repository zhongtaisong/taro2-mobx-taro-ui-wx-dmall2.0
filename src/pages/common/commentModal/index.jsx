import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { toJS } from 'mobx';
// 公共组件
import { NavBar, CommentList } from '@com';
// mobx数据
import state from './state'
// ------------------------------------------- 商品评价 ---------------------------------- //
@observer
class Index extends Taro.Component {

  constructor(props) {
      super(props);
      this.state = {
        pid: null
      };
  }

  componentDidMount() {
    try{
      const { id } = this.$router.params || {};
        id && state.selcommentsData({ pid: id })
        this.setState({ pid: id })
    }catch(err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    state.setCommentList();
  }

  // 下拉
  onPullDownRefresh() {
    const { pid } = this.state;
    pid && state.selcommentsData({ pid })
    Taro.stopPullDownRefresh();
  }

  render() {
    const { commentList } = state;
    return (
      <View className='dm_commentModal'>
          <NavBar {...this.props} leftIconType='chevron-left' 
            onClickLeftIcon={() => Taro.navigateBack()}
          />
          <View 
            style={{padding:`${Taro.topHeight}px 10Px`}}
          >
            <CommentList {...this.props} 
              list={toJS(commentList)}
            />
          </View>
      </View>
    );
  }
}

export default Index;