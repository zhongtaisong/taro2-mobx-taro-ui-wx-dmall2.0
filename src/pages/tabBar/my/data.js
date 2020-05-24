import Taro from '@tarojs/taro';

const data = [
  {
    key: 'order',
    title: '我的订单',
    thumb: require('@img/svg/order.svg'),
    arrow: 'right',
    onClick: () => {
      Taro.navigateTo({
        url: '/pages/components/myOrder/index'
      })
    }
  },
  {
    key: 'collection',
    title: '商品收藏',
    thumb: require('@img/svg/collection.svg'),
    arrow: 'right',
    onClick: () => {
      Taro.navigateTo({
        url: '/pages/components/myCollection/index'
      })
    }
  },
  {
    key: 'user',
    title: '用户中心',
    thumb: require('@img/svg/user.svg'),
    arrow: 'right',
    onClick: () => {
      Taro.navigateTo({
        url: '/pages/components/userCenter/index'
      })
    }
  }
];

export default data;