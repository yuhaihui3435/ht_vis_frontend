const cMeeting = {
  state: {
    cMeeting: {
      id: '',
      cAt: '',
      lAt: '',
      dAt: '',
      opId: '',
      title: '',
      host: '',
      content: '',
      type: '',
      num: '',
      mAt: '',
    },
    cMeetingList: [],
    totalPage: 0,
    pageNumber: 1,
    pageSize: 15,
    totalRow: 0,
  },
  mutations: {
    setCMeeting(state, obj) {
      state.cMeeting = Object.assign({}, obj)
    },
    setCMeetingList(state, list) {
      state.cMeetingList = list
    },
    setCMeetingPage(state, page) {
      state.cMeetingList = page.list
      state.totalPage = page.totalPage
      state.pageNumber = page.pageNumber
      state.pageSize = page.pageSize
      state.totalRow = page.totalRow
    },
  },
  actions: {
    list_cMeeting: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cMeeting/list', param).then((res) => {
          commit('setCMeetingList', res)
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    page_cMeeting: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cMeeting/page', param).then((res) => {
          commit('setCMeetingPage', res)
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    save_cMeeting: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cMeeting/save', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })

    },
    update_cMeeting: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cMeeting/update', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    del_cMeeting: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cMeeting/logicDel', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    get_cMeeting: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cMeeting/get', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    },
    init_cMeeting: function ({
      commit,
      state
    }, param) {
      let vm = this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/cMeeting/init', param).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        });
      })
    }
  },

}

export default cMeeting
