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
                              <v-text-field v-model="vo.name"  label="姓名" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.code"  label="编号" required :disabled="opt=='edit'"
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.tel"  label="手机号" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
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
  <v-dialog v-model="djDialog" persistent max-width="600px">
      <v-card >
        <v-card-title>
          <span class="headline">设置部门职位</span>
        </v-card-title>
        <v-card-text>
            <v-form v-model="djFValid" ref="djForm" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                           <v-flex xs12 sm6 md3 >
                              <v-select :items="departmentList" v-model="djVo.dCode" :rules="[rules.required]" label="部门" required item-value="code" item-text="name"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md3 >
                              <v-select :items="jobList" v-model="djVo.jobId" :rules="[rules.required]" label="职位" required item-value="id" item-text="name"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md3 >
                              <v-switch v-model="djVo.head" label="部门负责人" value="0"></v-switch>
                           </v-flex>
                           <v-flex xs12 sm6 md3 >
                              <v-btn color="success darken-1" flat @click.native="saveDj"  :loading="loading" :disabled="loading||!djFValid">保存</v-btn>
                           </v-flex>
                  </v-layout>
                </v-container>
            </v-form>
            <v-data-table :headers="djHeaders" :total-items="totalRow" hide-actions :items="djList"   class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
                              <template slot="items" slot-scope="props">
                                <td>
                                          {{props.item.dName}}
                                </td>
                                <td>
                                          {{props.item.jName}}
                                </td>
                                <td>
                                          {{props.item.headStr}}
                                </td>
                                <td class=" layout px-0">
                                  <v-btn icon class="mx-0" @click="delDj(props.item)">
                                    <v-icon color="pink">delete</v-icon>
                                  </v-btn>
                                </td>
                              </template>
            </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" flat @click.native="djDialog = false">关闭</v-btn>
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
                                    <v-list-tile-content>姓名:</v-list-tile-content><v-list-tile-content class="align-end">{{cStaffView.name}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>编号:</v-list-tile-content><v-list-tile-content class="align-end">{{cStaffView.code}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>手机号:</v-list-tile-content><v-list-tile-content class="align-end">{{cStaffView.tel}}</v-list-tile-content>
                             </v-list-tile>
                  </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat @click.native="viewDialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-toolbar color="blue" >
              <v-toolbar-title class="white--text">员工列表</v-toolbar-title>
              <v-divider class="mx-3" inset vertical dark  ></v-divider>
              <v-spacer></v-spacer>
              <v-btn class="blue--text" @click.native="add()">新增<v-icon>add</v-icon></v-btn>
    </v-toolbar>
    <v-card >
              <v-container grid-list-md>
                      <v-layout row wrap>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="cStaffQuery.name"  label="姓名" single-line hide-details ></v-text-field>
                         </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="cStaffQuery.code"  label="编号" single-line hide-details ></v-text-field>
                         </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="cStaffQuery.tel"  label="手机号" single-line hide-details ></v-text-field>
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
            <v-data-table :headers="cStaffHeaders" :total-items="totalRow" :hide-actions="totalRow==0" :items="cStaffList" :rows-per-page-items="rowsPerPageItems" :pagination.sync="cStaffQuery"  class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
              <template slot="items" slot-scope="props">
                    <td>
                               {{props.item.name}}
                    </td>
                    <td>
                               {{props.item.code}}
                    </td>
                    <td>
                               {{props.item.tel}}
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
                  <v-btn icon class="mx-0" @click="setDj(props.item)">
                      <v-icon color="teal">settings</v-icon>
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
export default {
  data() {
    return {
      fValid: true,
      valid: true,
      vo: {},
      rowsPerPageItems: [15],
      cStaffQuery: { pn: 1, sortBy: "", descending: "" }, //列表查询参数数据对象
      cStaffView: {}, //查询详细数据对象
      loading: false,
      title: "新增员工",
      rules: Kit.inputRules,
      cStaffHeaders: [
        {
          text: "姓名",
          sortable: false,
          value: "name"
        },
        {
          text: "编号",
          sortable: false,
          value: "code"
        },
        {
          text: "手机号",
          sortable: false,
          value: "tel"
        },
        { text: "操作", sortable: false }
      ],
      dialog: false,
      viewDialog: false,
      opt: "",
      djDialog: false,
      djFValid: false,
      djVo: {},
      departmentList: [],
      jobList: [],
      djList: [],
      djHeaders: [
        {
          text: "部门",
          sortable: false,
          value: "dName"
        },
        {
          text: "职位",
          sortable: false,
          value: "jName"
        },
        {
          text: "负责人",
          sortable: false,
          value: "head"
        },
        { text: "操作", sortable: false }
      ]
    };
  },
  computed: {
    ...mapState({
      cStaff: state => state.cStaff.cStaff,
      cStaffList: state => state.cStaff.cStaffList,
      totalRow: state => state.cStaff.totalRow,
      pageNumber: state => state.cStaff.pageNumber,
      pageSize: state => state.cStaff.pageSize,
      totalPage: state => state.cStaff.totalPage
    })
  },
  mounted() {
    this.cStaffQuery["pn"] = this.cStaffQuery.page;
    this.search();
    this.init();
  },
  methods: {
    init() {
      let vm = this;
      this.$store.dispatch("init_cStaff").then(res => {});
    },
    search() {
      this.$store.dispatch("page_cStaff", this.cStaffQuery).catch(res => {});
    },
    add() {
      this.loading = false;
      this.$refs.form.reset();
      this.vo = {};
      this.opt = "add";
      this.title = "新增员工";
      this.dialog = true;
    },
    edit(cStaff) {
      this.loading = false;
      this.opt = "edit";
      this.vo = Object.assign({}, cStaff);
      this.dialog = true;
      this.title = "修改员工";
    },
    save() {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("save_cStaff", vm.vo)
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
    update(cStaff) {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("update_cStaff", vm.vo)
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
    del(cStaff) {
      let vm = this;
      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.loading = true;
          vm.$store
            .dispatch("del_cStaff", { ids: cStaff.id })
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
    view(cStaff) {
      let vm = this;
      vm.viewDialog = true;
      vm.loading = true;
      vm.$store
        .dispatch("get_cStaff", { id: cStaff.id })
        .then(res => {
          vm.cStaffView = res;
        })
        .catch(res => {
          vm.loading = false;
        });
    },
    clearQueryParam() {
      this.cStaffQuery["name"] = "";
      this.cStaffQuery["code"] = "";
      this.cStaffQuery["tel"] = "";
      this.search();
    },
    listDj(staffCode) {
      let vm=this;
      vm.$store
        .dispatch("list_cStaff_dj", { staffCode: staffCode })
        .then(res => {
          vm.loading = false;
          vm.djList = res.djList;
          vm.jobList=res.jobList;
          vm.departmentList=res.departmentList;
        })
        .catch(res => {
          vm.loading = false;
        });
    },
    setDj(item) {
      let vm = this;
      this.$refs.djForm.reset();
      vm.djDialog = true;
      vm.loading = true;
      vm.djVo = {sCode:item.code};
      vm.listDj(item.code);
    },
    saveDj() {
      let vm=this;
      if (vm.$refs.djForm.validate()) {
        vm.loading = true;
        vm.$store
          .dispatch("save_cStaff_dj", vm.djVo)
          .then(res => {
            vm.loading = false;
            if (res.resCode == "success") {
              vm.dialog = false;
              vm.listDj(vm.djVo.sCode);
            }
          })
          .catch(res => {
            vm.loading = false;
          });
      }
    },
    delDj(item) {
      let vm=this;
      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.loading = true;
          vm.$store
            .dispatch("del_cStaff_dj", { djId: item.id })
            .then(res => {
              vm.loading = false;
              if (res.resCode == "success") {
                vm.dialog = false;
                vm.listDj(item.sCode);
              }
            })
            .catch(res => {
              vm.loading = false;
            });
        } else {
        }
      });
    }
  },
  filters: {},
  watch: {
    cStaffQuery: {
      handler(val, oldVal) {
        if (this.cStaffQuery.sortBy != "" || val.page != oldVal.page) {
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