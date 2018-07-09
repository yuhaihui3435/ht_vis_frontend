const vLine = {
  state: {
    vLine: {
      id: '',
      cCode: '',
      name: '',
      cAt: '',
      lAt: '',
      dAt: '',
      opId: '',
    },
    vLineList: [],
    totalPage: 0,
    pageNumber: 1,
    pageSize: 15,
    totalRow: 0,
  },
  mutations: {
    setVLine(state, obj) {
      state.vLine = Object.assign({}, obj)
    },
    setVLineList(state, list) {
      state.vLineList = list
    },
    setVLinePage(state, page) {
      state.vLineList = page.list
      state.totalPage = page.totalPage
      state.pageNumber = page.pageNumber
      state.pageSize = page.pageSize
      state.totalRow = page.totalRow
    },
  },
  actions: {
    list_vLine: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vLine/list', param).then((res) => {
          commit('setVLineList', res)
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    page_vLine: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vLine/page', param).then((res) => {
          commit('setVLinePage', res)
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    save_vLine: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vLine/save', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })

    },
    update_vLine: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vLine/update', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    del_vLine: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vLine/logicDel', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    get_vLine: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vLine/get', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    init_vLine: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vLine/init', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    }
  },

}

export default vLine
