import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Image } from '@tarojs/components'
// 设置
import { PUBLIC_URL } from '@config';
// 详情
@observer
class Index extends Taro.Component {

  // 预览图片
  previewImageClick = (avatar) => {
    let { detailsPic=[] } = this.props;
    detailsPic.forEach((item, index) => {
      detailsPic[index] = `${PUBLIC_URL}${item}`;
    })
    detailsPic.length && avatar && Taro.previewImage({
      urls: detailsPic,
      current: `${PUBLIC_URL}${avatar}`
    });
  }

  render() {
      const { detailsPic=[] } = this.props;
      return (
          <View className='Products_Details'>
              {
                  detailsPic.map((item, index) => {
                      return (
                        <View style={{ textAlign: 'center' }} key={index} onClick={this.previewImageClick.bind(this, item)}>
                          <Image mode='widthFix' src={PUBLIC_URL + item} style={{ width: '100%' }} />
                        </View>
                      );
                  })
              }
          </View>
      );
  }
}

export default Index;