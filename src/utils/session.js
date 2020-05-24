import Taro from '@tarojs/taro'

class Index {

    setItem = (key, data) => {
      Taro.setStorage({ key, data })
    }

    getItem = (key) => {
      // if( key == 'uname' ) {
      //   return 'dangdang'
      // }
      return Taro.getStorageSync(key);
    }

    clear = (key) => {
      Taro.clearStorage(key);
    }

}

export default new Index();