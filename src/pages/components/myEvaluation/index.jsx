import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 全局公共组件
import { NavBar, ProductList, AtTextarea, AtButton } from '@com';
// 数据
import state from './state';
// less样式
import './index.less';

// 我的评价
@observer
class Index extends Taro.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            value: ''
        };
    }

    componentDidMount() {
        const { id } = this.$router.params || {};
        try{
            if( id ){
                state.productsData({ id });
                this.setState({ id });
            }
        }catch(err) {
            console.log(err);
        }
    }

    config = {
      enablePullDownRefresh: false
    }

    // 提交评价
    handleSubmit = () => {
      const { value } = this.state;
      if(value && value.trim()) {
        state.addcommentsData({
            pid: this.state.id,
            content: value
        });
      }else{
        Taro.showToast({
          title: '你还没输入评价呢',
          icon: 'none'
        })
      }
    }

    handleChange = (value) => {
      this.setState({ value })
    }

    render() {
        const { products=[] } = state;
        const { value } = this.state;
        return (
            <View className='dm_MyEvaluation'>
                <NavBar {...this.props} title='发表评价' leftIconType='chevron-left'
                  onClickLeftIcon={() => Taro.navigateBack()}
                />
                <View style={{
                    padding:`${Taro.topHeight}px 10Px 50Px`
                  }}
                >
                    <View style={{paddingTop: '10Px'}}>
                        <ProductList
                          products={products} 
                          isShowSpecOther isShowAtSwipeAction={false}
                          isShowMore={false}
                        />
                    </View>
                    <AtTextarea
                      value={value}
                      onChange={this.handleChange}
                      maxLength={300}
                      placeholder='请输入评价'
                    />
                    <View style={{ paddingTop: '20%' }}>
                      <AtButton type='primary' onClick={this.handleSubmit}>发表评价</AtButton>
                    </View>
                </View>
            </View>
        );
    }
}

export default Index;