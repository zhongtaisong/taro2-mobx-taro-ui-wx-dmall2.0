import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { toJS } from 'mobx'
// 全局公共组件
import { NavBar, ProductList, AtCheckbox, AtModal } from '@com';
// 数据
import state from './state';
// 样式
import './index.less';
// -------------------------------------------- 购物车 ---------------------------------------- //
@observer
class Index extends Taro.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedNum: 0,
            checkedPrice: 0,
            isFinished: false,
            currentObj: {},
            checkedList: [],
            modalObj: {},
            isOpened: false
        };
    }

    componentDidMount() {
      state.cartLisData();
      state.addressData();
    }

    componentWillUnmount() {
        state.clearMobxData();
    }

    // 下拉
    onPullDownRefresh() {
      state.cartLisData();
      state.addressData();
      Taro.stopPullDownRefresh();
    }

    // 全选
    selectedAll = (value=[]) => {
        let { dataSource=[], setCheckedArr } = state;
        this.setState({
          checkedList: value
        })
        if( value.length ) {
          setCheckedArr(dataSource.map(item => item.id));
          const sum = dataSource.reduce((total, curent) => {
              return total + curent.num;
          }, 0);
          const checkedPrice = dataSource.reduce((total, curent) => {
              return total + curent.price * curent.num;
          }, 0);
          this.setState({
              checkedNum: sum,
              checkedPrice
          });
        }else{
          setCheckedArr();
          this.setState({
              checkedNum: 0,
              checkedPrice: 0
          });
        }
    }

    // 选中
    onSelectedCurrent = (arr=[]) => {
      const { dataSource=[], setCheckedArr } = state;
      setCheckedArr(arr);
      if( dataSource.length == arr.length ) {
        this.setState({
          checkedList: ['all']
        })
      }else{
        this.setState({
          checkedList: []
        })
      }
      let data = dataSource.filter(item => arr.includes(item.id));
      const num = data.reduce((total, curent) => {
          return total + curent.num;
      }, 0);
      const checkedPrice = data.reduce((total, curent) => {
          return total + curent.totalprice;
      }, 0);
      this.setState({
          checkedNum: num,
          checkedPrice
      });
    }

    // 加减商品数量
    onGetNumber = async (obj={}, value=1) => {
        let { id, price } = obj;
        const { checkedArr } = state;
        let arr = [...new Set([...checkedArr, id])];
        await state.updatecartData(id, value, value * price);
        await this.onSelectedCurrent(arr);
    }

    // 管理
    handlebtn = () => {
        this.setState({
            isFinished: !this.state.isFinished
        });
    }

    // 加入收藏 / 删除
    handleButton = (_this, id) => {
      let { checkedArr, setCheckedArr } = state;
      let { modalObj } = this.state;
      if(id) {
        checkedArr = [...new Set([...checkedArr, id])];
        setCheckedArr(checkedArr)
      }
      this.onSelectedCurrent(checkedArr);
      if( !checkedArr.length ) {
        Taro.showToast({
          title: `请选择要${_this == 'del' ? '删除' : '加入收藏'}的商品`,
          icon: 'none'
        })
        return;
      }
      this.setState({
        isOpened: true
      })

      if( _this == 'del' ){
        modalObj = {
          title: '删除',
          content: `确定要删除这些商品？`,
          onHandleCancel: () => {
            this.setState({
              isOpened: false
            })
          },
          onHandleConfirm: () => {
            state.delcartData(checkedArr);
            this.setState({
                checkedNum: 0,
                checkedPrice: 0,
                isOpened: false
            });
          }
        }
      }else if( _this == 'col' ){
          modalObj = {
            title: '加入收藏',
            content: `确定要将这些商品加入收藏？`,
            onHandleCancel: () => {
              this.setState({
                isOpened: false
              })
            },
            onHandleConfirm: () => {
              state.addcolsData(checkedArr);
              this.setState({
                  checkedNum: 0,
                  checkedPrice: 0,
                  isOpened: false
              });
            }
          }
      }
      this.setState({ modalObj })
    }

    // 结算
    handleGoPay = () => {
        let { checkedArr, dataSource } = state;
        let pids = [];
        dataSource.map(item => {
          if( checkedArr.includes(item.id) && item.pid ) {
            pids.push(item.pid);
          }
        });
        if(pids.length) {
          Taro.navigateTo({
            url: `/pages/components/settlementPage/index?id=${pids}&type=cart`
          })
        }else{
            Taro.showToast({
              title: '请选择需要结算的商品！',
              icon: 'none'
            })
        }
    }
    
    // 查询规格
    selectSpecData = (currentObj={}) => {
        this.setState({ currentObj });
        return new Promise((resolve, reject) => {
          state.selectSpecData({ pid: currentObj.pid }).then((res) => {
            resolve(res);
          }).catch((err) => {
            reject(err);
          });
        })
    }

    // 选择规格
    handleToggleSpecs = (pid) => {
      const { currentObj } = this.state;
      const { specList } = state;
      let data = specList.filter(item => item.id == pid) || [];
      if(pid) {
        return new Promise((resolve, reject) => {
            state.updateSpecData({
              id: currentObj.id, 
              pid, 
              num: currentObj.num, 
              price: data.length && data[0] ? data[0].price : 0
            }).then((code) => {
              resolve(code);
            }).catch((err) => {
              reject(err);
            })
        })
      }
    }

    render() {
        let { dataSource=[], checkedArr, address, emptyTip } = state;
        const { isFinished, checkedList, modalObj, isOpened } = this.state;
        return (
            <View className='dm_cart'>
                <NavBar {...this.props} title='购物车' />
                <View className='dm_cart_header' 
                  style={{
                    top: `${Taro.topHeight}px`
                  }}
                >
                    <Text className='ellipsis left'>收货地址：{ address || '暂无默认地址' }</Text>
                    {
                        dataSource.length ? (
                            <Text className='right' onClick={this.handlebtn}>{
                              !isFinished ? '管理' : '完成'
                            }</Text>
                        ) : ''
                    }
                </View>
                <View style={{
                    padding:`${Taro.topHeight+42}px 10Px 50Px`
                  }}
                >
                  {
                    dataSource.length ? (
                      <ProductList products={dataSource} isShowCheckbox isShowSpec isShowNum 
                        onSelectSpec={this.selectSpecData} 
                        onHandleToggleSpecs={this.handleToggleSpecs}
                        onGetNumber={this.onGetNumber}
                        checkedArr={toJS(checkedArr)}
                        onSelectedCurrent={this.onSelectedCurrent}
                        onAtSwipeActionClick={this.handleButton}
                        type='cart'
                        isShowMore={false}
                      />
                    ) : (
                      <View className='empty_cart'>{emptyTip}</View>
                    )
                  }
                </View>
                {
                  dataSource.length && (                    
                    <View className='dm_cart_footer'>
                      <AtCheckbox
                        className='left'
                        options={[
                          { value: 'all', label: '全选' }
                        ]}
                        selectedList={checkedList}
                        onChange={this.selectedAll}
                      />
                      <View className={`right${isFinished ? ' right_manage' : ''}`}>
                        {
                          !isFinished ? (
                            <View>
                              <View className='ellipsis'>合计：
                                <Text>￥{this.state.checkedPrice.toFixed(2)}</Text>
                              </View>
                              <Text onClick={this.handleGoPay}>结算 ({this.state.checkedNum})</Text>
                            </View>
                          ) : (
                              <View>
                                <Text onClick={this.handleButton.bind(this, 'col', null)}>加入收藏</Text>
                                <Text onClick={this.handleButton.bind(this, 'del', null)}>删除</Text>
                              </View>
                            )
                        }
                      </View>
                    </View>
                  )
                }
                <AtModal 
                  {...modalObj}
                  isOpened={isOpened}
                />
            </View>
        );
    }
}

export default Index;