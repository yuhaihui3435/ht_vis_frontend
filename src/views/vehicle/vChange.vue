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
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.bHost"  label="前车主" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.bTel"  label="前联系电话" 
                                  :rules="[
                                  (v)=>!!!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.aHost"  label="现车主" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.aTel"  label="现联系电话" 
                                  :rules="[
                                  (v)=>!!!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'">
                              <v-text-field v-model="vo.price"  label="价格" required
                                  :rules="[
                                  rules.required,
                                  rules.amount,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.fee"  label="手续费" required
                                  :rules="[
                                  rules.required,
                                  rules.amount,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-menu
                                        ref="changeDateDateMenu"
                                        :close-on-content-click="false"
                                        v-model="changeDateDateMenu"
                                        :return-value.sync="vo.changeDate"
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
                                          v-model="vo.changeDate"
                                          label="过户日期"
                                          required
                                          prepend-icon="event"
                                          readonly
                                          :rules="[rules.required]"
                                        ></v-text-field>
                                        <v-date-picker v-model="vo.changeDate" locale="zh-cn"  @input="$refs.changeDateDateMenu.save(vo.changeDate)"></v-date-picker>
                                      </v-menu>
                           </v-flex>
                           <v-flex xs12 sm12 md12 v-show="opt=='add'||opt=='edit'">
                                                      <v-textarea v-model="vo.remark"  label="备注"  outline
                                                          :rules="[
                                                          ]"
                                                          >
                                                      </v-textarea>
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
                                    <v-list-tile-content>牌照号:</v-list-tile-content><v-list-tile-content class="align-end">{{vChangeView.licensePlate}}</v-list-tile-content>
                             </v-list-tile>
                             <v-list-tile>
                                    <v-list-tile-content>前车主:</v-list-tile-content><v-list-tile-content class="align-end">{{vChangeView.bHost}}</v-list-tile-content>
                             </v-list-tile>
                             <v-list-tile>
                                    <v-list-tile-content>前联系电话:</v-list-tile-content><v-list-tile-content class="align-end">{{vChangeView.bTel}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>现车主:</v-list-tile-content><v-list-tile-content class="align-end">{{vChangeView.aHost}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>现联系电话:</v-list-tile-content><v-list-tile-content class="align-end">{{vChangeView.aTel}}</v-list-tile-content>
                             </v-list-tile>
                              
                             
                              <v-list-tile>
                                    <v-list-tile-content>价格:</v-list-tile-content><v-list-tile-content class="align-end">{{vChangeView.priceStr}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>手续费:</v-list-tile-content><v-list-tile-content class="align-end">{{vChangeView.feeStr}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>过户日期:</v-list-tile-content><v-list-tile-content class="align-end">{{vChangeView.changeDate | formatDate}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>备注:</v-list-tile-content><v-list-tile-content class="align-end">{{vChangeView.remark}}</v-list-tile-content>
                             </v-list-tile>
                  </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat @click.native="viewDialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-toolbar color="blue" >
              <v-toolbar-title class="white--text">过户记录列表</v-toolbar-title>
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
                              v-model="vChangeQuery.licensePlate"
                              cache-items
                              hide-no-data
                              label="牌照号"
                              item-text="licensePlate"
                              item-value="licensePlate"
                              required
                            ></v-autocomplete>
                         </v-flex>
                         <v-flex xs12 sm3 md3 >
                              <v-menu ref="changeDateQueryBeginDateMenu" :close-on-content-click="false" v-model="changeDateQueryBeginDateMenu" :return-value.sync="vChangeQuery.beginChangeDate"
                                   :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px" >
                                   <v-text-field slot="activator" v-model="vChangeQuery.beginChangeDate" label="过户日期查询开始日期" prepend-icon="event" readonly ></v-text-field>
                                   <v-date-picker v-model="vChangeQuery.beginChangeDate" locale="zh-cn"  @input="$refs.changeDateQueryBeginDateMenu.save(vChangeQuery.beginChangeDate)"></v-date-picker>
                             </v-menu>
                         </v-flex>
                         <v-flex xs12 sm3 md3 >
                              <v-menu ref="changeDateQueryEndDateMenu" :close-on-content-click="false" v-model="changeDateQueryEndDateMenu" :return-value.sync="vChangeQuery.endChangeDate"
                                    :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px" >
                                    <v-text-field slot="activator" v-model="vChangeQuery.endChangeDate" label="过户日期查询截至日期" prepend-icon="event" readonly ></v-text-field>
                                    <v-date-picker v-model="vChangeQuery.endChangeDate" locale="zh-cn"  @input="$refs.changeDateQueryEndDateMenu.save(vChangeQuery.endChangeDate)"></v-date-picker>
                              </v-menu>
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
            <v-data-table :headers="vChangeHeaders" :total-items="totalRow" :hide-actions="totalRow==0" :items="vChangeList" :rows-per-page-items="rowsPerPageItems" :pagination.sync="vChangeQuery"  class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
              <template slot="items" slot-scope="props">
                    
                    <td>
                               {{props.item.licensePlate}}
                    </td>
                    <td>
                               {{props.item.bHost}}
                    </td>
                    <td>
                               {{props.item.bTel}}
                    </td>
                    <td>
                               {{props.item.aHost}}
                    </td>
                    <td>
                               {{props.item.aTel}}
                    </td>
                    
                    <td>
                               {{props.item.priceStr}}
                    </td>
                    <td>
                               {{props.item.feeStr}}
                    </td>
                    <td>
                               {{props.item.opName}}
                    </td>
                    <td>
                               {{props.item.changeDate | formatDate}}
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
      vChangeQuery: { pn: 1, sortBy: "", descending: "" }, //列表查询参数数据对象
      vChangeView: {}, //查询详细数据对象
      loading: false,
      title: "新增过户记录",
      rules: Kit.inputRules,
      vChangeHeaders: [
        {
          text: "牌照号",
          sortable: false,
          value: "licensePlate"
        },
        {
          text: "前车主",
          sortable: false,
          value: "bHost"
        },
        {
          text: "前联系电话",
          sortable: false,
          value: "bTel"
        },
        {
          text: "现车主",
          sortable: false,
          value: "aHost"
        },
        {
          text: "现联系电话",
          sortable: false,
          value: "aTel"
        },
        
        {
          text: "价格",
          sortable: false,
          value: "price"
        },
        {
          text: "手续费",
          sortable: false,
          value: "fee"
        },
        {
          text: "操作员",
          sortable: false,
          value: "opId"
        },
        {
          text: "过户日期",
          sortable: true,
          value: "changeDate"
        },
        { text: "操作", sortable: false }
      ],
      dialog: false,
      viewDialog: false,
      opt: "",
      changeDateDateMenu: false,
      changeDateQueryBeginDateMenu: false,
      changeDateQueryEndDateMenu: false,
      allVInfo: [],
      // cInfoList:[],
    };
  },
  computed: {
    ...mapState({
      vChange: state => state.vChange.vChange,
      vChangeList: state => state.vChange.vChangeList,
      totalRow: state => state.vChange.totalRow,
      pageNumber: state => state.vChange.pageNumber,
      pageSize: state => state.vChange.pageSize,
      totalPage: state => state.vChange.totalPage
    })
  },
  mounted() {
    this.vChangeQuery["pn"] = this.vChangeQuery.page;
    this.search();
    this.init();
  },
  methods: {
    init() {
      let vm = this;
      this.$store.dispatch("init_vChange").then(res => {
        vm.allVInfo = res.allVInfo;
        // vm.cInfoList=res.cInfoList;
      });
    },
    search() {
      this.$store.dispatch("page_vChange", this.vChangeQuery).catch(res => {});
    },
    add() {
      this.loading = false;
      this.$refs.form.reset();
      this.vo = {};
      this.opt = "add";
      this.title = "新增过户记录";
      this.dialog = true;
    },
    edit(vChange) {
      this.loading = false;
      this.opt = "edit";
      this.vo = Object.assign({}, vChange);
      this.dialog = true;
      this.title = "修改过户记录";
    },
    save() {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("save_vChange", vm.vo)
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
    update(vChange) {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("update_vChange", vm.vo)
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
    del(vChange) {
      let vm = this;
      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.loading = true;
          vm.$store
            .dispatch("del_vChange", { ids: vChange.id })
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
    view(vChange) {
      let vm = this;
      vm.viewDialog = true;
      vm.$store
        .dispatch("get_vChange", { id: vChange.id })
        .then(res => {
          vm.vChangeView = res;
        })
        .catch(res => {
          vm.loading = false;
        });
    },
    clearQueryParam() {
      this.vChangeQuery["licensePlate"] = "";
      this.vChangeQuery["beginChangeDate"] = "";
      this.vChangeQuery["endChangeDate"] = "";
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
    vChangeQuery: {
      handler(val, oldVal) {
        if (this.vChangeQuery.sortBy != "" || val.page != oldVal.page) {
          this.search();
        }
      },
      deep: true
    }
  }
};
</script>
<style>
</style>