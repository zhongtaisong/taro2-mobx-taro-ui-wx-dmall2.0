import Taro from '@tarojs/taro'
// 全局公共方法
import { session } from '@utils';
// 设置
import { PUBLIC_URL } from '@config';
// 全局mobx数据
import globalStore from '@store';

const interceptor = function (chain) {
    const requestParams = chain.requestParams
    const { method, data, url } = requestParams
    // console.log('1111111111111111http', chain, requestParams, method, data, url)
    Taro.showLoading({ title: '加载中', mask: true })
    return chain.proceed(requestParams)
      .then(res => {
        // console.log('22222222222http', res)
        Taro.hideLoading()
        try{
          const { code, msg } = res.data || {};
          switch(code) {
            case 200:
              msg && Taro.showToast({
                title: msg,
                icon: 'success',
                mask: true
              })
              globalStore.setIsAuth(true);
              break;
            case 401:
              Taro.redirectTo({
                url: `/pages/components/login/index`
              })
              msg && Taro.showToast({
                title: msg,
                icon: 'none'
              })
              globalStore.setIsAuth(false);
              break;
            default:
              msg && Taro.showToast({
                title: msg,
                icon: 'none'
              })
          }
        }catch(err) {
          console.log(err);
        }
        return res
      }).catch((err) => {
        Taro.hideLoading()
        console.log(err);
      })
}
Taro.addInterceptor(interceptor)
// Taro.addInterceptor(Taro.interceptors.logInterceptor)
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)

const $axios = {
    get(url='', data={}, header={}) {
        let setHeader = header || { 'content-type': 'application/json' }
        if(session.getItem('token')) {
          setHeader = {
            ...setHeader,
            token: session.getItem('token')
          }
        }
        setHeader = {
          ...setHeader,
          type: 'wx',
          uname: session.getItem('uname')
        }
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${PUBLIC_URL}${url}`,
                data: data.params,
                header: setHeader,
                method: 'GET',
                success(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            })
        })
    },
    post(url='', data={}, header={}) {
        let setHeader = header || { 'content-type': 'application/json' }
        if(session.getItem('token')) {
          setHeader = {
            ...setHeader,
            token: session.getItem('token')
          }
        }
        setHeader = {
          ...setHeader,
          type: 'wx',
          uname: session.getItem('uname')
        }
        return new Promise((resolve, reject) => {
            Taro.request({
                url: `${PUBLIC_URL}${url}`,
                data,
                header: setHeader,
                method: 'POST',
                success(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            })
        })
    }
}

export default $axios;