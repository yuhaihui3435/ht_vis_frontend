const cInfo = {
  state: {
    cInfo: {
      id: '',
      name: '',
      code: '',
      retDate: '',
      cNo: '',
      cType: '',
      bType: '',
      head: '',
      tel: '',
      staffNum: '',
      sofficerNum: '',
      address: '',
      cAt: '',
      lAt: '',
      dAt: '',
      opId: '',
    },
    cInfoList: [],
    totalPage: 0,
    pageNumber: 1,
    pageSize: 15,
    totalRow: 0,
  },
  mutations: {
    setCInfo(state, obj) {
      state.cInfo = Object.assign({}, obj)
    },
    setCInfoList(state, list) {
      state.cInfoList = list
    },
    setCInfoPage(state, page) {
      state.cInfoList = page.list
      state.totalPage = page.totalPage
      state.pageNumber = page.pageNumber
      state.pageSize = page.pageSize
      state.totalRow = page.totalRow
    },
  },
  actions: {
    list_cInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cInfo/list', param).then((res) => {
          commit('setCInfoList', res)
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    page_cInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cInfo/page', param).then((res) => {
          commit('setCInfoPage', res)
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    save_cInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cInfo/save', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })

    },
    update_cInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cInfo/update', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    del_cInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cInfo/logicDel', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    get_cInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cInfo/get', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    init_cInfo: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cInfo/init', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    }
  },

}

export default cInfo
