import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 公共组件
import { AtList, ActionSheet, AtInputNumber } from '@com';
// 设置
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';

// 商品规格
@observer
class Index extends Taro.Component {

    constructor(props) {
        super(props);
        this.state = {
          isOpened: false,
          atActionSheetItem: []
        };
    }

    componentDidMount() {
        this.props.history && state.setHistory( this.props.history );
    }
    
    // 选择规格 - 活动面板
    showActionSheet = (arr=[], id) => {
        const BUTTONS = arr.map(item => {
          let obj = {
            id: item.id,
            value: item.spec
          }
          if( item.id == id ) {
            obj = {...obj, isActive: true}
          }
          return obj;
        });
        this.setState({
          atActionSheetItem: BUTTONS,
          isOpened: true
        })
    }

    // 获取活动面板数据
    getActionSheet = (id, e) => {
      if( typeof this.props.onHandleToggleSpecs === 'function' && id ) {
        this.setState({
          atActionSheetItem: [],
          isOpened: false
        })
        this.props.onHandleToggleSpecs(id, e).then((code) => {
          if(code != 200) {
            throw new Error('规格出错了');
          }
        });
      }
    }

    // 预览图片
    previewImageClick = (avatar) => {
      let { imgList=[] } = this.props;
      imgList.forEach((item, index) => {
        imgList[index] = `${PUBLIC_URL}${item}`;
      })
      imgList.length && avatar && Taro.previewImage({
        urls: imgList,
        current: `${PUBLIC_URL}${avatar}`
      });
    }

    render() {
        const { basicInfo={}, imgList, specs=[], watchNumber, num } = this.props;
        const { isOpened, atActionSheetItem } = this.state
        return (
            <View className='Products_ProductsDetail'>
                <Swiper
                  indicatorColor='#D6D6D6'
                  indicatorActiveColor='#1890ff'
                  circular
                  indicatorDots
                  className='big_img'                  
                >
                    {
                        imgList.map( (item, index) => {
                            return (
                                <SwiperItem key={index} onClick={this.previewImageClick.bind(this, item)}>
                                  <Image mode='aspectFit' src={PUBLIC_URL + item} />
                                </SwiperItem>
                            );
                        } )
                    }
                </Swiper>
                <View className='content'>
                    <View className='price'>
                        <View>￥</View>
                        <Text>{!isNaN(Number(basicInfo.price)) ? Number(basicInfo.price).toFixed(2) : 0}</Text>
                    </View>
                    <View className='product_info'>
                        <View>{ basicInfo.description ? basicInfo.description : '敬请期待~~~' }</View>
                        <View>
                          <Text>{ basicInfo.copywriting ? basicInfo.copywriting : '敬请期待~~~' }</Text>
                        </View>
                    </View>
                    <AtList 
                      isCustom
                      title='购买数量'
                      renderExtraChildren={
                          <AtInputNumber
                            min={1}
                            max={99}
                            step={1}
                            value={num}
                            onChange={watchNumber}
                          />
                      }
                      className='Products_ProductsDetail_AtList'
                    />
                    <AtList 
                      atListItem={[
                        { title: '已选规格', arrow: 'right', extraText: basicInfo.spec ? basicInfo.spec : '无', onClick: this.showActionSheet.bind(this, specs, basicInfo.id) }
                      ]}
                      className='Products_ProductsDetail_AtList'
                    />
                </View>
                <ActionSheet 
                  {...this.props}
                  isOpened={isOpened}
                  title='请选择规格'
                  cancelText='关闭'
                  atActionSheetItem={atActionSheetItem}
                  onClick={this.getActionSheet}
                />
            </View>
        );
    }
}

export default Index;