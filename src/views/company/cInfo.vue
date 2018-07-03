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
                              <v-text-field v-model="vo.name"  label="名字" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 100) || '最多 100 字符',
                                  ]"
                                  :counter="100">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.code"  label="企业编号" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
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
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.cNo"  label="企业统一代码证号" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                                <v-select :items="cTypeSelectData" v-model="vo.cType" :rules="[rules.required]" label="企业类型" required item-value="id" item-text="name"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.bType"  label="营运类型" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 100) || '最多 100 字符',
                                  ]"
                                  :counter="100">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.head"  label="法人" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 20) || '最多 20 字符',
                                  ]"
                                  :counter="20">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.tel"  label="联系电话" required
                                  :rules="[
                                  rules.required,
                                  rules.phone,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.staffNum"  label="员工人数" 
                                  :rules="[
                                  rules.digital,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.sofficerNum"  label="安全员人数" 
                                  :rules="[
                                  rules.digital,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.address"  label="经营地址" 
                                  :rules="[
                                  (v)=>!!!v||(v!=undefined&&v.length <= 100) || '最多 100 字符',
                                  ]"
                                  :counter="100">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.busNum"  label="车辆数量" required
                                  :rules="[
                                  rules.required,
                                  rules.digital,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                                <v-select :items="gradeSelectData" v-model="vo.grade" :rules="[]" label="安全生产考评等级"  item-value="value" item-text="text"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-menu
                                        ref="expiryDateDateMenu"
                                        :close-on-content-click="false"
                                        v-model="expiryDateDateMenu"
                                        :return-value.sync="vo.expiryDate"
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
                                          v-model="vo.expiryDate"
                                          label="安全生产证书到期日"
                                          prepend-icon="event"
                                          readonly
                                          :rules="[]"
                                        ></v-text-field>
                                        <v-date-picker v-model="vo.expiryDate" locale="zh-cn"  @input="$refs.expiryDateDateMenu.save(vo.expiryDate)"></v-date-picker>
                                      </v-menu>
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
                                    <v-list-tile-content>名字:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.name}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>企业编号:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.code}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>注册时间:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.retDate | formatDate}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>企业统一代码证号:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.cNo}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>企业类型:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.cTypeStr}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>营运类型:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.bType}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>法人:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.head}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>联系电话:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.tel}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>员工人数:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.staffNum}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>安全员人数:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.sofficerNum}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>经营地址:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.address}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>车辆数量:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.busNum}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>安全生产考评等级:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.gradeStr}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>安全生产证书到期日:</v-list-tile-content><v-list-tile-content class="align-end">{{cInfoView.expiryDate | formatDate}}</v-list-tile-content>
                             </v-list-tile>
                  </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat @click.native="viewDialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-toolbar color="blue" >
              <v-toolbar-title class="white--text">企业信息列表</v-toolbar-title>
              <v-divider class="mx-3" inset vertical dark  ></v-divider>
              <v-spacer></v-spacer>
              <v-btn class="blue--text" @click.native="add()">新增<v-icon>add</v-icon></v-btn>
    </v-toolbar>
    <v-card >
              <v-container grid-list-md>
                      <v-layout row wrap>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="cInfoQuery.name"  label="名字" single-line hide-details ></v-text-field>
                         </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="cInfoQuery.code"  label="企业编号" single-line hide-details ></v-text-field>
                         </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="cInfoQuery.cNo"  label="企业统一代码证号" single-line hide-details ></v-text-field>
                         </v-flex>
                    <v-flex xs12 sm3 md3>
                        <v-select :items="cTypeSelectData" v-model="cInfoQuery.cType" label="企业类型"  item-value="id" item-text="name"></v-select>
                    </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="cInfoQuery.bType"  label="营运类型" single-line hide-details ></v-text-field>
                         </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="cInfoQuery.tel"  label="联系电话" single-line hide-details ></v-text-field>
                         </v-flex>
                    <v-flex xs12 sm3 md3>
                        <v-select :items="gradeSelectData" v-model="cInfoQuery.grade" label="安全生产考评等级"  item-value="value" item-text="text"></v-select>
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
              
            <v-data-table   :headers="cInfoHeaders" :total-items="totalRow" :hide-actions="totalRow==0" :items="cInfoList" :rows-per-page-items="rowsPerPageItems" :pagination.sync="cInfoQuery"  class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
              <template slot="items" slot-scope="props">
                    <td>
                               {{props.item.name}}
                    </td>
                    <td>
                               {{props.item.code}}
                    </td>
                    <td>
                               {{props.item.retDate | formatDate}}
                    </td>
                    <td>
                               {{props.item.cNo}}
                    </td>
                    <td>
                               {{props.item.cTypeStr}}
                    </td>
                    <td>
                               {{props.item.bType}}
                    </td>
                    <td>
                               {{props.item.head}}
                    </td>
                    <td>
                               {{props.item.tel}}
                    </td>
                    <td>
                               {{props.item.staffNum}}
                    </td>
                    <td>
                               {{props.item.sofficerNum}}
                    </td>
                    <td>
                               {{props.item.address}}
                    </td>
                    <td>
                               {{props.item.busNum}}
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
      vo: {},
      rowsPerPageItems: [15],
      cInfoQuery: { pn: 1, sortBy: "", descending: "" }, //列表查询参数数据对象
      cInfoView: {}, //查询详细数据对象
      loading: false,
      title: "新增企业信息",
      rules: Kit.inputRules,
      cInfoHeaders: [
        {
          text: "名字",
          sortable: false,
          value: "name",
          width:'300px',
        },
        {
          text: "企业编号",
          sortable: false,
          value: "code",
        },
        {
          text: "注册时间",
          sortable: false,
          value: "retDate"
        },
        {
          text: "企业统一代码证号",
          sortable: false,
          value: "cNo"
        },
        {
          text: "企业类型",
          sortable: false,
          value: "cType"
        },
        {
          text: "营运类型",
          sortable: false,
          value: "bType"
        },
        {
          text: "法人",
          sortable: false,
          value: "head"
        },
        {
          text: "联系电话",
          sortable: false,
          value: "tel"
        },
        {
          text: "员工人数",
          sortable: false,
          value: "staffNum"
        },
        {
          text: "安全员人数",
          sortable: false,
          value: "sofficerNum"
        },
        {
          text: "经营地址",
          sortable: false,
          value: "address"
        },
        {
          text: "车辆数量",
          sortable: false,
          value: "busNum"
        },
        { text: "操作", sortable: false }
      ],
      dialog: false,
      viewDialog: false,
      opt: "",
      retDateDateMenu: false,
      cTypeSelectData: [],
      gradeSelectData: [
        { text: "未评级", value: "0" },
        { text: "一级", value: "1" },
        { text: "二级", value: "2" },
        { text: "三级", value: "3" }
      ],
      expiryDateDateMenu: false
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
    this.cInfoQuery["pn"] = this.cInfoQuery.page;
    this.search();
    this.init();
  },
  methods: {
    init() {
      let vm = this;
      this.$store.dispatch("init_cInfo").then(res => {
        vm.cTypeSelectData = res.cTypeList;
      });
    },
    search() {
      this.$store.dispatch("page_cInfo", this.cInfoQuery).catch(res => {});
    },
    add() {
      this.loading = false;
      this.$refs.form.reset();
      this.vo = {};
      this.opt = "add";
      this.title = "新增企业信息";
      this.dialog = true;
    },
    edit(cInfo) {
      this.loading = false;
      this.opt = "edit";
      this.vo = Object.assign({}, cInfo);
      this.dialog = true;
      this.title = "修改企业信息";
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
    update() {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("update_cInfo", vm.vo)
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
    del(cInfo) {
      let vm = this;
      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.loading = true;
          vm.$store
            .dispatch("del_cInfo", { ids: cInfo.id })
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
    view(cInfo) {
      let vm = this;
      vm.viewDialog = true;
      vm.loading = true;
      vm.$store
        .dispatch("get_cInfo", { id: cInfo.id })
        .then(res => {
          vm.loading = false;
          vm.cInfoView = res;
        })
        .catch(res => {
          vm.loading = false;
        });
    },
    clearQueryParam() {
      this.cInfoQuery["name"] = "";
      this.cInfoQuery["code"] = "";
      this.cInfoQuery["cNo"] = "";
      this.cInfoQuery["cType"] = "";
      this.cInfoQuery["bType"] = "";
      this.cInfoQuery["tel"] = "";
      this.cInfoQuery["grade"] = "";
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
    cInfoQuery: {
      handler(val, oldVal) {
        if (this.cInfoQuery.sortBy != "" || val.page != oldVal.page) {
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