import axios from '@axios';
// 获取需要展示的图片
const imgCarouselUrl = `index/banner`;
// 单品推广 - 查询
const productsListUrl = 'index/onepush';
// 本周热门商品 - 查询
const hotListUrl = 'index/hot';

class Service {

    imgCarouselData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(imgCarouselUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    productsListData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(productsListUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

    hotListData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(hotListUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
    
}

export default new Service();