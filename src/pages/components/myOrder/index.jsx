import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 全局公共组件
import { ProductList, NavBar, AtButton, AtLoadMore, AtModal } from '@com';
// 数据
import state from './state';
// 样式
import './index.less';
// ------------------------------------------ 我的订单 ---------------------------------------//
@observer
class Index extends Taro.Component {

    constructor(props) {
      super(props);
      this.state = {
        visible: false,        
        modalObj: {},
        isOpened: false
      }
    }

    componentDidMount() {
        state.selOrdersData();
    }

    componentWillUnmount() {
      state.clearMobxData();
    }

    // 下拉
    async onPullDownRefresh() {
      let { current, setCurrent } = state;
      current++;
      await setCurrent(current);
      await state.selOrdersData();
      Taro.stopPullDownRefresh();
    }

    // 查看更多
    onAtLoadMoreClick = async () => {
      let { current, setCurrent } = state;
      current++;
      await setCurrent(current);
      return state.selOrdersData()
    }

    // 删除订单 / 评价
    handleOrderBtn = (_this, id, content=[]) => {
      let { modalObj } = this.state;
      if(id) {
        switch(_this) {
          case 'comment':
            if(content.length && content.length >= 2) {
              state.detailOrdersData({ id });
              this.setState({
                visible: true
              })
            }else{
              const { id: pid } = content[0] || {};
              Taro.navigateTo({
                url: `/pages/components/myEvaluation/index?id=${pid}`
              })
            }
            break;
          case 'delete':
            this.setState({
              isOpened: true
            })
            modalObj = {
              title: '删除',
              content: `确定要删除这笔订单？`,
              onHandleCancel: () => {
                this.setState({
                  isOpened: false
                })
              },
              onHandleConfirm: () => {
                state.deleteOrderData({ id });
                this.setState({
                    isOpened: false
                });
              }
            }
            this.setState({ modalObj })
            break;
        }
      }else{
        Taro.showToast({
          title: '订单id不能为空！',
          icon: 'none'
        })
      }
    }

    // 返回
    onClickLeftIcon = (visible) => {
      if(!visible) {
        Taro.navigateBack();
      }else{
        this.setState({
          visible: false
        })
      }
    }

    // 进入评价页面
    handleComment = (id='') => {
      Taro.navigateTo({
        url: `/pages/components/myEvaluation/index?id=${id}`
      })
    }

    render() {
        const { dataSource=[], dataSource02=[] } = state;
        const { visible, modalObj, isOpened } = this.state;
        return (
            <View className='dm_MyOrder'>
                <NavBar {...this.props} title={!visible ? '我的订单' : '订单中心'} leftIconType='chevron-left'
                  onClickLeftIcon={this.onClickLeftIcon.bind(this, visible)}
                />
                <View style={{
                    padding:`${Taro.topHeight}px 0 0`
                  }}
                >
                  {
                    !visible ? (
                      <View>
                          {
                            dataSource.map((item, index) => {
                              let num = item.content.reduce((total, current) => {
                                return total + current.num;
                              }, 0);
                              let totalprice = item.content.reduce((total, current) => {
                                return total + current.totalprice;
                              }, 0);
                              return (
                                <View key={index} className='dm_MyOrder_content'>
                                    <View style={{
                                        padding:`0 10Px 10Px`
                                      }}
                                    >
                                      <View onClick={() => Taro.navigateTo({
                                          url: `/pages/components/orderDetails/index?id=${item.id}`
                                        })}
                                      >
                                        <ProductList
                                          products={item.content || []} 
                                          isShowSpecOther isShowAtSwipeAction={false}
                                          isShowNumx disabledLink isStopPropagation
                                          isShowMore={false}
                                        />
                                      </View>
                                      <View className='bottom_btns'>
                                          <View className='p_info'>
                                            <Text>共 {num} 件商品</Text>
                                            <View>
                                              <Text>合计：</Text>
                                              <Text>￥</Text>
                                              <Text>{totalprice ? Number(totalprice).toFixed(2) : 0}</Text>
                                            </View>
                                          </View>
                                          <View className='btns'>
                                            <View className='left'>
                                              <Text>订单编号：{item.ordernum}</Text>
                                              <Text>付款时间：{item.submitTime}</Text>
                                            </View>
                                            <View className='right'>
                                              <AtButton type='secondary' inline size='small'
                                                onClick={() => {
                                                  this.handleOrderBtn('delete', item.id)
                                                }}
                                              >删除订单</AtButton>
                                              <AtButton type='primary' inline size='small'
                                                onClick={() => {
                                                  this.handleOrderBtn('comment', item.id, item.content)
                                                }}
                                              >评价</AtButton>
                                            </View>
                                          </View>
                                      </View>
                                    </View>
                                    <View className='line'></View>
                                </View>
                              );
                            })
                          }
                          {
                            dataSource.length && 
                            <AtLoadMore
                              onClick={this.onAtLoadMoreClick}
                            />
                          }
                      </View>
                    ) : (
                      <View style={{
                          padding:`10Px`
                        }}
                      >
                        {
                          dataSource02.map((item, index) => {
                            return (
                              <ProductList key={index}
                                products={[item]} 
                                isShowSpecOther isShowAtSwipeAction={false}
                                isShowNumx isShowMore={false}
                                renderContent={
                                  <View className='comment_btn'>
                                    <AtButton type='secondary' inline size='small' onClick={this.handleComment.bind(this, item.id)}>评价</AtButton>                            
                                  </View>
                                }
                              />
                            );
                          })
                        }
                      </View>
                    )
                  }
                </View>
                <AtModal 
                  {...modalObj}
                  isOpened={isOpened}
                />
            </View>
        );
    }
}

export default Index;