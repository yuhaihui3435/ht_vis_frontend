<template>
<v-container>
      <v-card >
        <v-card-title>
          <span class="headline">{{title}}</span>
        </v-card-title>
        <v-card-text>
            <v-form v-model="fValid" ref="form" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.name"  label="名字" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 100) || '最多 100 字符',
                                  ]"
                                  :counter="100">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.code"  label="企业编号" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-menu
                                        ref="retDateDateMenu"
                                        :close-on-content-click="false"
                                        v-model="retDateDateMenu"
                                        :return-value.sync="vo.retDate"
                                        :nudge-right="40"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        max-width="290px"
                                        min-width="290px"
                                      >
                                        <v-text-field
                                          slot="activator"
                                          v-model="vo.retDate"
                                          label="注册时间"
                                          required
                                          prepend-icon="event"
                                          readonly
                                          :rules="[rules.required]"
                                        ></v-text-field>
                                        <v-date-picker v-model="vo.retDate" locale="zh-cn"  @input="$refs.retDateDateMenu.save(vo.retDate)"></v-date-picker>
                                      </v-menu>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.cNo"  label="企业统一代码证号" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                                <v-select :items="cTypeSelectData" v-model="vo.cType" :rules="[rules.required]" label="企业类型" required item-value="id" item-text="name"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                                <v-text-field  v-model="vo.bType" :rules="[rules.required]" label="营运类型" required ></v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.head"  label="法人" required
                                  :rules="[
                                  rules.required,
                                  (v)=>!!!v||(v!=undefined&&v.length <= 20) || '最多 20 字符',
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.tel"  label="联系电话" required
                                  :rules="[
                                  rules.required,
                                  rules.phone,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.busNum"  label="车辆数量" 
                                  :rules="[
                                  rules.digital,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.staffNum"  label="员工人数" 
                                  :rules="[
                                  rules.digital,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.sofficerNum"  label="安全员人数" 
                                  :rules="[
                                  rules.digital,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.address"  label="经营地址" 
                                  :rules="[
                                  (v)=>!!!v||(v!=undefined&&v.length <= 100) || '最多 100 字符',
                                  ]"
                                  :counter="100">
                              </v-text-field>
                           </v-flex>
                  </v-layout>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success darken-1" flat @click.native="save" :loading="loading"  :disabled="loading||!fValid">保存</v-btn>
        </v-card-actions>
      </v-card>
</v-container>
</template>
<script>
import { mapState } from "vuex";
import Kit from "../../libs/kit.js";
var moment = require("moment");
export default {
  data() {
    return {
      fValid: true,
      valid: true,
      vo: {},
      loading: false,
      title: "企业基本信息",
      rules: Kit.inputRules,
      cInfoHeaders: [{ text: "操作", sortable: false }],
      retDateDateMenu: false,
      cTypeSelectData: [],
    };
  },
  computed: {
    ...mapState({
      cInfo: state => state.cInfo.cInfo,
      cInfoList: state => state.cInfo.cInfoList,
      totalRow: state => state.cInfo.totalRow,
      pageNumber: state => state.cInfo.pageNumber,
      pageSize: state => state.cInfo.pageSize,
      totalPage: state => state.cInfo.totalPage
    })
  },
  mounted() {
    let vm=this;
    this.init();
    this.$store.dispatch('list_cInfo').then(res=>{
      if(res.length>0)
        vm.vo=Object.assign({},res[0])
    })
    
  },
  methods: {
    init(){
        let vm=this;
        this.$store.dispatch("init_cInfo").then(res => {
          vm.cTypeSelectData=res.cTypeList;
        });
    },
    save() {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("save_cInfo", vm.vo)
          .then(res => {
            vm.loading = false;
            if (res.resCode == "success") {
              vm.dialog = false;
              vm.search();
            }
          })
          .catch(res => {
            vm.loading = false;
          });
      }
    },
  },
};
</script>
<style>
</style>