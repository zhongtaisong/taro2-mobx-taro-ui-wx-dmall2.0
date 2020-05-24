import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { toJS } from 'mobx';
// 公共组件
import { NavBar, ProductList } from '@com';
// mobx数据
import state from './state'
// less样式
import './index.less'
// ------------------------------------------- 模态框 ---------------------------------- //
@observer
class Index extends Taro.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    const { kw } = this.$router.params || {};
    this.setState({
      value: kw
    }, () => {
      kw && state.kwData(kw);
    })
  }

  componentWillUnmount() {
    state.setSearchResultList();
  }

  // 搜索结果
  getKwChange = () => {
    const { value } = this.state;
    if( value && value.trim() ) {
      state.kwData(value.trim());
    }
  }

  // 获取关键字
  onChange = (value='') => {
    this.setState({ value })
  }

  // 清除关键字
  clearKw = () => {
    this.onChange();
    state.setSearchResultList();
  }

  // 下拉
  onPullDownRefresh() {
    this.getKwChange();
    Taro.stopPullDownRefresh();
  }

  render() {
    const { searchResultList } = state;
    const { value } = this.state;
    return (
      <View className='dm_modal'>
          <NavBar {...this.props} isShowSearchBar leftIconType='chevron-left' 
            onClickLeftIcon={() => Taro.navigateBack()}
            onBlur={this.getKwChange}
            onChange={this.onChange}
            onClear={this.clearKw}
            isHideBtn
            focus
            value={value}
          />
          <View 
            style={{padding:`${Taro.topHeight}px 10Px 0`}}
          >
            <ProductList products={toJS(searchResultList)} isShowTag isShowAtSwipeAction={false} isShowMore={false} />
          </View>
      </View>
    );
  }
}

export default Index;