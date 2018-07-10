
<template>
<v-container>
  <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card >
        <v-card-title>
          <span class="headline">{{title}}</span>
        </v-card-title>
        <v-card-text>
            <v-form v-model="fValid" ref="form" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                             <v-autocomplete
                              :loading="loading"
                              :items="allVInfo"
                              :rules="[rules.required]"
                              v-model="vo.licensePlate"
                              cache-items
                              
                              hide-no-data
                              label="牌照号"
                              item-text="licensePlate"
                              item-value="licensePlate"
                              required
                              
                            ></v-autocomplete>
                              <!-- <v-text-field v-model="vo.licensePlate"  label="牌照号" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 20) || '最多 20 字符',
                                  ]"
                                  :counter="20">
                              </v-text-field> -->
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-menu
                                        ref="bAtDateMenu"
                                        :close-on-content-click="false"
                                        v-model="bAtDateMenu"
                                        :return-value.sync="vo.bAt"
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
                                          v-model="vo.bAt"
                                          label="保险开始日期"
                                          required
                                          prepend-icon="event"
                                          readonly
                                          :rules="[rules.required]"
                                        ></v-text-field>
                                        <v-date-picker v-model="vo.bAt" locale="zh-cn"  @input="$refs.bAtDateMenu.save(vo.bAt)"></v-date-picker>
                                      </v-menu>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-menu disabled
                                        ref="eAtDateMenu"
                                        :close-on-content-click="false"
                                        v-model="eAtDateMenu"
                                        :return-value.sync="vo.eAt"
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
                                          v-model="vo.eAt"
                                          label="保险结束日期"
                                          required
                                          prepend-icon="event"
                                          readonly
                                          :rules="[rules.required]"
                                        ></v-text-field>
                                        <v-date-picker v-model="vo.eAt" locale="zh-cn"  @input="$refs.eAtDateMenu.save(vo.eAt)"></v-date-picker>
                                      </v-menu>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.num"  label="保险单号" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.price"  label="保单金额" required
                                  :rules="[
                                  rules.required,
                                  rules.amount,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                  </v-layout>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" flat @click.native="dialog = false">关闭</v-btn>
          <v-btn color="success darken-1" flat @click.native="save" :loading="loading" v-show="opt=='add'" :disabled="loading||!fValid">保存</v-btn>
          <v-btn color="success darken-1" flat @click.native="update" v-show="opt=='edit'" :loading="loading" :disabled="loading||!fValid">保存</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
  <v-dialog v-model="viewDialog" persistent max-width="300px">
        <v-card >
          <v-card-title>
            <span class="headline">查看详细</span>
          </v-card-title>
            <v-divider></v-divider>
                  <v-list dense>
                              <v-list-tile>
                                    <v-list-tile-content>牌照号:</v-list-tile-content><v-list-tile-content class="align-end">{{vInsuranceView.licensePlate}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>保险开始日期:</v-list-tile-content><v-list-tile-content class="align-end">{{vInsuranceView.bAt | formatDate}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>保险结束日期:</v-list-tile-content><v-list-tile-content class="align-end">{{vInsuranceView.eAt | formatDate}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>保险单号:</v-list-tile-content><v-list-tile-content class="align-end">{{vInsuranceView.num}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>保单金额:</v-list-tile-content><v-list-tile-content class="align-end">{{vInsuranceView.priceStr}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>操作员:</v-list-tile-content><v-list-tile-content class="align-end">{{vInsuranceView.opName}}</v-list-tile-content>
                             </v-list-tile>
                  </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat @click.native="viewDialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-toolbar color="blue" >
              <v-toolbar-title class="white--text">车辆保险列表</v-toolbar-title>
              <v-divider class="mx-3" inset vertical dark  ></v-divider>
              <v-spacer></v-spacer>
              <v-btn class="blue--text" @click.native="add()">新增<v-icon>add</v-icon></v-btn>
    </v-toolbar>
    <v-card >
              <v-container grid-list-md>
                      <v-layout row wrap>
                         <v-flex xs12 sm3 md3>
                           <v-autocomplete
                              :loading="loading"
                              :items="allVInfo"
                              v-model="vInsuranceQuery.licensePlate"
                              cache-items
                              hide-no-data
                              label="牌照号"
                              item-text="licensePlate"
                              item-value="licensePlate"
                              required
                              
                            ></v-autocomplete>
                            
                         </v-flex>
                         <v-flex xs12 sm3 md3 >
                              <v-menu ref="bAtQueryBeginDateMenu" :close-on-content-click="false" v-model="bAtQueryBeginDateMenu" :return-value.sync="vInsuranceQuery.beginBAt"
                                   :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px" >
                                   <v-text-field slot="activator" v-model="vInsuranceQuery.beginBAt" label="保险开始日期查询开始日期" prepend-icon="event" readonly ></v-text-field>
                                   <v-date-picker v-model="vInsuranceQuery.beginBAt" locale="zh-cn"  @input="$refs.bAtQueryBeginDateMenu.save(vInsuranceQuery.beginBAt)"></v-date-picker>
                             </v-menu>
                         </v-flex>
                         <v-flex xs12 sm3 md3 >
                              <v-menu ref="bAtQueryEndDateMenu" :close-on-content-click="false" v-model="bAtQueryEndDateMenu" :return-value.sync="vInsuranceQuery.endBAt"
                                    :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px" >
                                    <v-text-field slot="activator" v-model="vInsuranceQuery.endBAt" label="保险开始日期查询截至日期" prepend-icon="event" readonly ></v-text-field>
                                    <v-date-picker v-model="vInsuranceQuery.endBAt" locale="zh-cn"  @input="$refs.bAtQueryEndDateMenu.save(vInsuranceQuery.endBAt)"></v-date-picker>
                              </v-menu>
                         </v-flex>
                         <v-flex xs12 sm3 md3 >
                              <v-menu ref="eAtQueryBeginDateMenu" :close-on-content-click="false" v-model="eAtQueryBeginDateMenu" :return-value.sync="vInsuranceQuery.beginEAt"
                                   :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px" >
                                   <v-text-field slot="activator" v-model="vInsuranceQuery.beginEAt" label="保险结束日期查询开始日期" prepend-icon="event" readonly ></v-text-field>
                                   <v-date-picker v-model="vInsuranceQuery.beginEAt" locale="zh-cn"  @input="$refs.eAtQueryBeginDateMenu.save(vInsuranceQuery.beginEAt)"></v-date-picker>
                             </v-menu>
                         </v-flex>
                         <v-flex xs12 sm3 md3 >
                              <v-menu ref="eAtQueryEndDateMenu" :close-on-content-click="false" v-model="eAtQueryEndDateMenu" :return-value.sync="vInsuranceQuery.endEAt"
                                    :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px" >
                                    <v-text-field slot="activator" v-model="vInsuranceQuery.endEAt" label="保险结束日期查询截至日期" prepend-icon="event" readonly ></v-text-field>
                                    <v-date-picker v-model="vInsuranceQuery.endEAt" locale="zh-cn"  @input="$refs.eAtQueryEndDateMenu.save(vInsuranceQuery.endEAt)"></v-date-picker>
                              </v-menu>
                         </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="vInsuranceQuery.num"  label="保险单号" single-line hide-details ></v-text-field>
                         </v-flex>
                        <v-flex xs12 sm3 md3>
                             <v-btn color="primary" class="white--text" @click="search()">
                                 搜索<v-icon>search</v-icon>
                             </v-btn>
                             <v-btn color="primary" class="white--text" @click="clearQueryParam()">
                                 清空<v-icon>clear</v-icon>
                             </v-btn>
                        </v-flex>
                      </v-layout>
              </v-container>
            <v-data-table :headers="vInsuranceHeaders" :total-items="totalRow" style="font-size : 1em;" :hide-actions="totalRow==0" :items="vInsuranceList" :rows-per-page-items="rowsPerPageItems" :pagination.sync="vInsuranceQuery"  class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
              <template slot="items" slot-scope="props">
                    <td>
                               {{props.item.licensePlate}}
                    </td>
                    <td>
                               {{props.item.bAt | formatDate}}
                    </td>
                    <td>
                               {{props.item.eAt | formatDate}}
                    </td>
                    <td>
                               {{props.item.num}}
                    </td>
                    <td>
                               {{props.item.priceStr}}
                    </td>
                    <td>
                               {{props.item.opName}}
                    </td>
                <td class=" layout px-0">
                  <v-btn icon class="mx-0" @click="edit(props.item)">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="del(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="view(props.item)">
                      <v-icon color="teal">fas fa-eye</v-icon>
                  </v-btn>
                </td>
              </template>
          </v-data-table>
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
      rowsPerPageItems: [15],
      vInsuranceQuery: { pn: 1, sortBy: "", descending: "" }, //列表查询参数数据对象
      vInsuranceView: {}, //查询详细数据对象
      loading: false,
      title: "新增车辆保险",
      rules: Kit.inputRules,
      vInsuranceHeaders: [
        {
          text: "牌照号",
          sortable: false,
          value: "licensePlate"
        },
        {
          text: "保险开始日期",
          sortable: false,
          value: "bAt"
        },
        {
          text: "保险结束日期",
          sortable: true,
          value: "eAt"
        },
        {
          text: "保险单号",
          sortable: false,
          value: "num"
        },
        {
          text: "保单金额",
          sortable: false,
          value: "price"
        },
        {
          text: "操作员",
          sortable: false,
          value: "opId"
        },
        { text: "操作", sortable: false }
      ],
      dialog: false,
      viewDialog: false,
      opt: "",
      bAtDateMenu: false,
      eAtDateMenu: false,
      bAtQueryEndDateMenu:false,
      bAtQueryBeginDateMenu:false,
      eAtQueryBeginDateMenu:false,
      eAtQueryEndDateMenu:false,
      allVInfo:[],
      // cInfoList:[],
    };
  },
  computed: {
    ...mapState({
      vInsurance: state => state.vInsurance.vInsurance,
      vInsuranceList: state => state.vInsurance.vInsuranceList,
      totalRow: state => state.vInsurance.totalRow,
      pageNumber: state => state.vInsurance.pageNumber,
      pageSize: state => state.vInsurance.pageSize,
      totalPage: state => state.vInsurance.totalPage
    })
  },
  mounted() {
    this.vInsuranceQuery["pn"] = this.vInsuranceQuery.page;
    this.search();
    this.init();
  },
  methods: {
    init(){
      let vm=this;
      this.$store
        .dispatch("init_vInsurance")
        .then(res => {
          vm.allVInfo=res.allVInfo;
          // vm.cInfoList=res.cInfoList;
        });
    },
    search() {
      this.$store
        .dispatch("page_vInsurance", this.vInsuranceQuery)
        .catch(res => {});
    },
    add() {
      this.loading = false;
      this.$refs.form.reset();
      this.vo={};
      this.opt = "add";
      this.title = "新增车辆保险";
      this.dialog = true;
    },
    edit(vInsurance) {
      this.loading = false;
      this.opt = "edit";
      this.vo = Object.assign({}, vInsurance);
      this.dialog = true;
      this.title = "修改车辆保险";
    },
    save() {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("save_vInsurance", vm.vo)
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
    update(vInsurance) {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("update_vInsurance", vm.vo)
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
    del(vInsurance) {
      let vm = this;
      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.loading = true;
          vm.$store
            .dispatch("del_vInsurance", { ids: vInsurance.id })
            .then(res => {
              if (res.resCode == "success") {
                vm.search();
              }
            })
            .catch(res => {
              vm.loading = false;
            });
        } else {
        }
      });
    },
    view(vInsurance) {
      let vm = this;
      vm.viewDialog = true;
      vm.$store
        .dispatch("get_vInsurance", { id: vInsurance.id })
        .then(res => {
          vm.vInsuranceView = res;
        })
        .catch(res => {
          vm.loading = false;
        });
    },
    clearQueryParam() {
      this.vInsuranceQuery["licensePlate"] = "";
      this.vInsuranceQuery["beginBAt"] = "";
      this.vInsuranceQuery["beginEAt"] = "";
      this.vInsuranceQuery["endBAt"] = "";
      this.vInsuranceQuery["endEAt"] = "";
      this.vInsuranceQuery["num"] = "";
      this.vInsuranceQuery["opId"] = "";
      this.search();
    }
  },
  filters: {
    formatDate(time) {
      if (!!!time) return "";
      var date = new Date(time);
      return moment(date).format("YYYY-MM-DD");
    }
  },
  watch: {
    vInsuranceQuery: {
      handler(val, oldVal) {
        if (this.vInsuranceQuery.sortBy != "" || val.page != oldVal.page) {
          this.search();
        }
      },
      deep: true
    },
    'vo.bAt':{
      handler(val,oldVal){
        if(val){
          this.vo.bAt=moment(val).format('YYYY-MM-DD');
          this.vo.eAt=moment(val).add(1, 'y').format('YYYY-MM-DD');
        }
        
      }
    }
  }
};
</script>


<style>
  
</style>