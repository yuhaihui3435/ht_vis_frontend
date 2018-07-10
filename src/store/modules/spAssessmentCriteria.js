const spAssessmentCriteria = {
    state: {
      spAssessmentCriteria: {
            id:'',
            norm:'',
            title:'',
            essential:'',
            point:'',
            grading:'',
            cAt:'',
            lAt:'',
            dAt:'',
            opId:'',
            stars:'',
      },
      spAssessmentCriteriaList:[],
      totalPage:0,
      pageNumber:1,
      pageSize:15,
      totalRow:0,
    },
    mutations: {
      setSpAssessmentCriteria(state, obj) {
        state.spAssessmentCriteria = Object.assign({}, obj)
      },
      setSpAssessmentCriteriaList(state, list) {
        state.spAssessmentCriteriaList = list
      },
      setSpAssessmentCriteriaPage(state, page) {
        state.spAssessmentCriteriaList = page.list
        state.totalPage=page.totalPage
        state.pageNumber=page.pageNumber
        state.pageSize=page.pageSize
        state.totalRow=page.totalRow
      },
    },
    actions: {
      list_spAssessmentCriteria: function ({
        commit,
        state
      }, param) {
        let vm=this._vm;
        return new Promise(function (resolve, reject) {
        vm.$http.post('/spAssessmentCriteria/list',param).then((res) => {
          commit('setSpAssessmentCriteriaList', res)
          resolve(res)
        }).catch((res)=>{
                                reject(res)
                              });
                              })
      },
      page_spAssessmentCriteria: function ({
              commit,
              state
      }, param) {
         let vm=this._vm;
                 return new Promise(function (resolve, reject) {
         vm.$http.post('/spAssessmentCriteria/page',param).then((res) => {
            commit('setSpAssessmentCriteriaPage', res)
            resolve(res)
         }).catch((res)=>{
                                           reject(res)
                                         });
                                         })
      },
      save_spAssessmentCriteria: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/spAssessmentCriteria/save', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })

      },
      update_spAssessmentCriteria: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/spAssessmentCriteria/update', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })
      },
      del_spAssessmentCriteria: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/spAssessmentCriteria/logicDel', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })
      },
      get_spAssessmentCriteria: function ({
        commit,
        state
      }, param) {
          let vm=this._vm;
        return new Promise(function (resolve, reject) {
          vm.$http.post('/spAssessmentCriteria/get', param).then((res) => {
              resolve(res)
          }).catch((res)=>{
                      reject(res)
                    });
        })
      },
      init_spAssessmentCriteria: function ({
            commit,
            state
          }, param) {
            let vm = this._vm;
            return new Promise(function (resolve, reject) {
              vm.$http.post('/spAssessmentCriteria/init', param).then((res) => {
                resolve(res)
              }).catch((res) => {
                reject(res)
              });
            })
          }
    },

  }

export default spAssessmentCriteria