const vChange = {
  state: {
    vChange: {
          id:'',
          bHost:'',
          licensePlate:'',
          aHost:'',
          aTel:'',
          bTel:'',
          remark:'',
          price:'',
          fee:'',
          cAt:'',
          lAt:'',
          dAt:'',
          opId:'',
    },
    vChangeList:[],
    totalPage:0,
    pageNumber:1,
    pageSize:15,
    totalRow:0,
  },
  mutations: {
    setVChange(state, obj) {
      state.vChange = Object.assign({}, obj)
    },
    setVChangeList(state, list) {
      state.vChangeList = list
    },
    setVChangePage(state, page) {
      state.vChangeList = page.list
      state.totalPage=page.totalPage
      state.pageNumber=page.pageNumber
      state.pageSize=page.pageSize
      state.totalRow=page.totalRow
    },
  },
  actions: {
    list_vChange: function ({
      commit,
      state
    }, param) {
      let vm=this._vm;
      return new Promise(function (resolve, reject) {
      vm.$http.post('/vChange/list',param).then((res) => {
        commit('setVChangeList', res)
        resolve(res)
      }).catch((res)=>{
                              reject(res)
                            });
                            })
    },
    page_vChange: function ({
            commit,
            state
    }, param) {
       let vm=this._vm;
               return new Promise(function (resolve, reject) {
       vm.$http.post('/vChange/page',param).then((res) => {
          commit('setVChangePage', res)
          resolve(res)
       }).catch((res)=>{
                                         reject(res)
                                       });
                                       })
    },
    save_vChange: function ({
      commit,
      state
    }, param) {
        let vm=this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vChange/save', param).then((res) => {
            resolve(res)
        }).catch((res)=>{
                    reject(res)
                  });
      })

    },
    update_vChange: function ({
      commit,
      state
    }, param) {
        let vm=this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vChange/update', param).then((res) => {
            resolve(res)
        }).catch((res)=>{
                    reject(res)
                  });
      })
    },
    del_vChange: function ({
      commit,
      state
    }, param) {
        let vm=this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vChange/logicDel', param).then((res) => {
            resolve(res)
        }).catch((res)=>{
                    reject(res)
                  });
      })
    },
    get_vChange: function ({
      commit,
      state
    }, param) {
        let vm=this._vm;
      return new Promise(function (resolve, reject) {
        vm.$http.post('/vChange/get', param).then((res) => {
            resolve(res)
        }).catch((res)=>{
                    reject(res)
                  });
      })
    },
    init_vChange: function ({
          commit,
          state
        }, param) {
          let vm = this._vm;
          return new Promise(function (resolve, reject) {
            vm.$http.post('/vChange/init', param).then((res) => {
              resolve(res)
            }).catch((res) => {
              reject(res)
            });
          })
        }
  },

}

export default vChange