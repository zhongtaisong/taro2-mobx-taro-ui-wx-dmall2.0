import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { AtNavBar  } from 'taro-ui'
// 公共组件
import { SearchBar } from '@com';
// 导航栏
@observer
class Index extends Taro.Component {

    static options = {
      addGlobalClass: true
    }

    searchBarChange = (e) => {
      if( typeof this.props.onBlur === 'function' ) {
        this.props.onBlur(e);
      }
    }

    render() {
      const { isShowSearchBar=false } = this.props;
        return (
          <AtNavBar
            {...this.props}
            fixed
            customStyle={{paddingTop:`${Taro.barHeight}px`}}
            className='dm_AtNavBar'
          >
            {isShowSearchBar && <SearchBar {...this.props} isHideBtn onBlur={this.searchBarChange} />}
          </AtNavBar>
        );
    }
}

export default Index;