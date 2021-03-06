const vInfo = {
  state: {
    vInfo: {
      id: '',
      licensePlate: '',
      host: '',
      type: '',
      tel: '',
      telx: '',
      cAt: '',
      dAt: '',
      lAt: '',
      regDate: '',
      line: '',
      area: '',
      opId: '',
      idcard: '',
    },
    vInfoList: [],
    totalPage: 0,
    pageNumber: 1,
    pageSize: 15,
    totalRow: 0,
  },
  mutations: {
    setVInfo(state, obj) {
      state.vInfo = Object.assign({}, obj)
    },
    setVInfoList(state, list) {
      state.vInfoList = list
    },
    setVInfoPage(state, page) {
      state.vInfoList = page.list
      state.totalPage = page.totalPage
      state.pageNumber = page.pageNumber
      state.pageSize = page.pageSize
      state.totalRow = page.totalRow
    },
  },
  actions: {
    list_vInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vInfo/list', param).then((res) => {
          commit('setVInfoList', res)
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    page_vInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vInfo/page', param).then((res) => {
          commit('setVInfoPage', res)
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    save_vInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vInfo/save', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })

    },
    update_vInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vInfo/update', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    del_vInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vInfo/logicDel', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    get_vInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vInfo/get', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    init_vInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vInfo/init', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    get_curr_vInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vInfo/getCurrCInfo', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
  },

}

export default vInfo
