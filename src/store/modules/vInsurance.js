const vInsurance = {
    state: {
      vInsurance: {
            id:'',
            licensePlate:'',
            bAt:'',
            eAt:'',
            cAt:'',
            lAt:'',
            dAt:'',
            num:'',
            price:'',
            opId:'',
      },
      vInsuranceList:[],
      totalPage:0,
      pageNumber:1,
      pageSize:15,
      totalRow:0,
    },
    mutations: {
      setVInsurance(state, obj) {
        state.vInsurance = Object.assign({}, obj)
      },
      setVInsuranceList(state, list) {
        state.vInsuranceList = list
      },
      setVInsurancePage(state, page) {
        state.vInsuranceList = page.list
        state.totalPage=page.totalPage
        state.pageNumber=page.pageNumber
        state.pageSize=page.pageSize
        state.totalRow=page.totalRow
      },
    },
    actions: {
      list_vInsurance: function ({
        commit,
        state
      }, param) {
        let vm=this._vm;
        return new Promise(function (resolve, reject) {
        vm.$http.post('/api/vInsurance/list',param).then((res) => {
          commit('setVInsuranceList', res)
          resolve(res)
        }).catch((res)=>{
                                reject(res)
                              });
                              })
      },
      page_vInsurance: function ({
              commit,
              state
      }, param) {
         let vm=this._vm;
                 return new Promise(function (resolve, reject) {
         vm.$http.post('/api/vInsurance/page',param).then((res) => {
            commit('setVInsurancePage', res)
            resolve(res)
         }).catch((res)=>{
                                           reject(res)
                                         });
                                         })
      },
      save_vInsurance: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/api/vInsurance/save', state.vInsurance).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })

      },
      update_vInsurance: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/api/vInsurance/update', state.vInsurance).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })
      },
      del_vInsurance: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/api/vInsurance/logicDel', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })
      },
      get_vInsurance: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/api/vInsurance/get', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })
      },
    },

  }

export default vInsurance