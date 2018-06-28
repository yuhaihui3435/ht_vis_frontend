const cStaff = {
    state: {
      cStaff: {
            id:'',
            name:'',
            code:'',
            tel:'',
            cAt:'',
            dAt:'',
            lAt:'',
      },
      cStaffList:[],
      totalPage:0,
      pageNumber:1,
      pageSize:15,
      totalRow:0,
    },
    mutations: {
      setCStaff(state, obj) {
        state.cStaff = Object.assign({}, obj)
      },
      setCStaffList(state, list) {
        state.cStaffList = list
      },
      setCStaffPage(state, page) {
        state.cStaffList = page.list
        state.totalPage=page.totalPage
        state.pageNumber=page.pageNumber
        state.pageSize=page.pageSize
        state.totalRow=page.totalRow
      },
    },
    actions: {
      list_cStaff: function ({
        commit,
        state
      }, param) {
        let vm=this._vm;
        return new Promise(function (resolve, reject) {
        vm.$http.post('/cStaff/list',param).then((res) => {
          commit('setCStaffList', res)
          resolve(res)
        }).catch((res)=>{
                                reject(res)
                              });
                              })
      },
      page_cStaff: function ({
              commit,
              state
      }, param) {
         let vm=this._vm;
                 return new Promise(function (resolve, reject) {
         vm.$http.post('/cStaff/page',param).then((res) => {
            commit('setCStaffPage', res)
            resolve(res)
         }).catch((res)=>{
                                           reject(res)
                                         });
                                         })
      },
      save_cStaff: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/cStaff/save', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })

      },
      update_cStaff: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/cStaff/update', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })
      },
      del_cStaff: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/cStaff/logicDel', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })
      },
      get_cStaff: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/cStaff/get', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })
      },
      init_cStaff: function ({
            commit,
            state
          }, param) {
            let vm = this._vm;
            return new Promise(function (resolve, reject) {
              vm.$http.post('/cStaff/init', param).then((res) => {
                resolve(res)
              }).catch((res) => {
                reject(res)
              });
            })
          }
    },

  }

export default cStaff