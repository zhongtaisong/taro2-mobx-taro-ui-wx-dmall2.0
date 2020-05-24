import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
// 公共组件
import { AtGrid } from '@com';
// 静态数据
import gridList from './data';
// less样式
import './index.less';

// 宫格列表
@observer
class Index extends Taro.Component {

  onClick = (item) => {
    Taro.navigateTo({
      url: `/pages/common/searchModal/index?kw=${item.value}`
    })
  }

  render() {
      return (
        <View className='dm_GridList'>
          <AtGrid columnNum={5} hasBorder={false} data={gridList} onClick={this.onClick} />
        </View>
      );
  }
}

export default Index;