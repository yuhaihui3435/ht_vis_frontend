const cDepartment = {
    state: {
      cDepartment: {
            id:'',
            name:'',
            code:'',
            cAt:'',
            lAt:'',
            dAt:'',
      },
      cDepartmentList:[],
      totalPage:0,
      pageNumber:1,
      pageSize:15,
      totalRow:0,
    },
    mutations: {
      setCDepartment(state, obj) {
        state.cDepartment = Object.assign({}, obj)
      },
      setCDepartmentList(state, list) {
        state.cDepartmentList = list
      },
      setCDepartmentPage(state, page) {
        state.cDepartmentList = page.list
        state.totalPage=page.totalPage
        state.pageNumber=page.pageNumber
        state.pageSize=page.pageSize
        state.totalRow=page.totalRow
      },
    },
    actions: {
      list_cDepartment: function ({
        commit,
        state
      }, param) {
        let vm=this._vm;
        return new Promise(function (resolve, reject) {
        vm.$http.post('/cDepartment/list',param).then((res) => {
          commit('setCDepartmentList', res)
          resolve(res)
        }).catch((res)=>{
                                reject(res)
                              });
                              })
      },
      page_cDepartment: function ({
              commit,
              state
      }, param) {
         let vm=this._vm;
                 return new Promise(function (resolve, reject) {
         vm.$http.post('/cDepartment/page',param).then((res) => {
            commit('setCDepartmentPage', res)
            resolve(res)
         }).catch((res)=>{
                                           reject(res)
                                         });
                                         })
      },
      save_cDepartment: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/cDepartment/save', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })

      },
      update_cDepartment: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/cDepartment/update', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })
      },
      del_cDepartment: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/cDepartment/logicDel', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })
      },
      get_cDepartment: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/cDepartment/get', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })
      },
      init_cDepartment: function ({
            commit,
            state
          }, param) {
            let vm = this._vm;
            return new Promise(function (resolve, reject) {
              vm.$http.post('/cDepartment/init', param).then((res) => {
                resolve(res)
              }).catch((res) => {
                reject(res)
              });
            })
          }
    },

  }

export default cDepartment