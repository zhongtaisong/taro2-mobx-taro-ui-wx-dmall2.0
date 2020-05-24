import { observable } from 'mobx'

const globalStore = observable({
  // 是否有权限
  isAuth: false,
  setIsAuth(data = false) {
    this.isAuth = data;
  }
})

export default globalStore