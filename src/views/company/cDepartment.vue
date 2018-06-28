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
                              <v-text-field v-model="vo.name"  label="名称" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.code"  label="编号" required
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
  <v-dialog v-model="viewDialog" persistent max-width="300px">
        <v-card >
          <v-card-title>
            <span class="headline">查看详细</span>
          </v-card-title>
            <v-divider></v-divider>
                  <v-list dense>
                              <v-list-tile>
                                    <v-list-tile-content>名称:</v-list-tile-content><v-list-tile-content class="align-end">{{cDepartmentView.name}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>编号:</v-list-tile-content><v-list-tile-content class="align-end">{{cDepartmentView.code}}</v-list-tile-content>
                             </v-list-tile>
                  </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat @click.native="viewDialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-toolbar color="blue" >
              <v-toolbar-title class="white--text">部门列表</v-toolbar-title>
              <v-divider class="mx-3" inset vertical dark  ></v-divider>
              <v-spacer></v-spacer>
              <v-btn class="blue--text" @click.native="add()">新增<v-icon>add</v-icon></v-btn>
    </v-toolbar>
    <v-card >
              <v-container grid-list-md>
                      <v-layout row wrap>
                        <v-flex xs12 sm3 md3>
                             
                        </v-flex>
                      </v-layout>
              </v-container>
            <v-data-table :headers="cDepartmentHeaders" :total-items="totalRow" :hide-actions="totalRow==0" :items="cDepartmentList" :rows-per-page-items="rowsPerPageItems" :pagination.sync="cDepartmentQuery"  class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
              <template slot="items" slot-scope="props">
                    <td>
                               {{props.item.name}}
                    </td>
                    <td>
                               {{props.item.code}}
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
export default {
  data() {
    return {
      fValid: true,
      valid: true,
      vo: {},
      rowsPerPageItems: [15],
      cDepartmentQuery: { pn: 1, sortBy: "", descending: "" }, //列表查询参数数据对象
      cDepartmentView: {}, //查询详细数据对象
      loading: false,
      title: "新增部门",
      rules: Kit.inputRules,
      cDepartmentHeaders: [
        {
          text: "名称",
          sortable: false,
          value: "name"
        },
        {
          text: "编号",
          sortable: false,
          value: "code"
        },
        { text: "操作", sortable: false }
      ],
      dialog: false,
      viewDialog: false,
      opt: ""
    };
  },
  computed: {
    ...mapState({
      cDepartment: state => state.cDepartment.cDepartment,
      cDepartmentList: state => state.cDepartment.cDepartmentList,
      totalRow: state => state.cDepartment.totalRow,
      pageNumber: state => state.cDepartment.pageNumber,
      pageSize: state => state.cDepartment.pageSize,
      totalPage: state => state.cDepartment.totalPage
    })
  },
  mounted() {
    this.cDepartmentQuery["pn"] = this.cDepartmentQuery.page;
    this.search();
    this.init();
  },
  methods: {
    init() {
      let vm = this;
      this.$store.dispatch("init_cDepartment").then(res => {});
    },
    search() {
      this.$store
        .dispatch("page_cDepartment", this.cDepartmentQuery)
        .catch(res => {});
    },
    add() {
      this.loading = false;
      this.$refs.form.reset();
      this.vo = {};
      this.opt = "add";
      this.title = "新增部门";
      this.dialog = true;
    },
    edit(cDepartment) {
      this.loading = false;
      this.opt = "edit";
      this.vo = Object.assign({}, cDepartment);
      this.dialog = true;
      this.title = "修改部门";
    },
    save() {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("save_cDepartment", vm.vo)
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
    update(cDepartment) {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("update_cDepartment", vm.vo)
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
    del(cDepartment) {
      let vm = this;
      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.loading = true;
          vm.$store
            .dispatch("del_cDepartment", { ids: cDepartment.id })
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
    view(cDepartment) {
      let vm = this;
      vm.viewDialog = true;
      vm.$store
        .dispatch("get_cDepartment", { id: cDepartment.id })
        .then(res => {
          vm.cDepartmentView = res;
        })
        .catch(res => {
          vm.loading = false;
        });
    },
    clearQueryParam() {
      this.search();
    }
  },
  filters: {},
  watch: {
    cDepartmentQuery: {
      handler(val, oldVal) {
        if (this.cDepartmentQuery.sortBy != "" || val.page != oldVal.page) {
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