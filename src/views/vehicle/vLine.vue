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
                           <v-flex xs12 sm6 md4 v-show="(opt=='add'||opt=='edit')&&(cInfoList&&cInfoList.length>0)">
                                <v-select :items="cInfoList" v-model="vo.cCode" :rules="[]" label="企业"  item-value="code" item-text="name"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.name"  label="线路名称" 
                                  :rules="[rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 100) || '最多 100 字符',
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
                                    <v-list-tile-content>企业编号:</v-list-tile-content><v-list-tile-content class="align-end">{{vLineView.cInfo?vLineView.cInfo.name:'未设置'}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>线路名称:</v-list-tile-content><v-list-tile-content class="align-end">{{vLineView.name}}</v-list-tile-content>
                             </v-list-tile>
                  </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat @click.native="viewDialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-toolbar color="blue" >
              <v-toolbar-title class="white--text">线路列表</v-toolbar-title>
              <v-divider class="mx-3" inset vertical dark  ></v-divider>
              <v-spacer></v-spacer>
              <v-btn class="blue--text" @click.native="add()">新增<v-icon>add</v-icon></v-btn>
    </v-toolbar>
    <v-card >
            <v-data-table :headers="vLineHeaders" :total-items="totalRow" :hide-actions="totalRow==0" :items="vLineList" :rows-per-page-items="rowsPerPageItems" :pagination.sync="vLineQuery"  class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
              <template slot="items" slot-scope="props">
                    <td>
                               {{props.item.cInfo?props.item.cInfo.name:'未设置'}}
                    </td>
                    <td>
                               {{props.item.name}}
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
      vo: {},
      rowsPerPageItems: [15],
      vLineQuery: { pn: 1, sortBy: "", descending: "" }, //列表查询参数数据对象
      vLineView: {}, //查询详细数据对象
      loading: false,
      title: "新增线路",
      rules: Kit.inputRules,
      vLineHeaders: [
        {
          text: "企业编号",
          sortable: false,
          value: "cCode"
        },
        {
          text: "线路名称",
          sortable: false,
          value: "name"
        },
        { text: "操作", sortable: false }
      ],
      dialog: false,
      viewDialog: false,
      opt: "",
      cInfoList:[],
    };
  },
  computed: {
    ...mapState({
      vLine: state => state.vLine.vLine,
      vLineList: state => state.vLine.vLineList,
      totalRow: state => state.vLine.totalRow,
      pageNumber: state => state.vLine.pageNumber,
      pageSize: state => state.vLine.pageSize,
      totalPage: state => state.vLine.totalPage
    })
  },
  mounted() {
    this.vLineQuery["pn"] = this.vLineQuery.page;
    this.search();
    this.init();
  },
  methods: {
    init() {
      let vm = this;
      this.$store.dispatch("init_vLine").then(res => {
        vm.cInfoList=res.cInfoList;
      });
    },
    search() {
      this.$store.dispatch("page_vLine", this.vLineQuery).catch(res => {});
    },
    add() {
      this.loading = false;
      this.$refs.form.reset();
      this.vo = {};
      this.opt = "add";
      this.title = "新增线路";
      this.dialog = true;
    },
    edit(vLine) {
      this.loading = false;
      this.opt = "edit";
      this.vo = Object.assign({}, vLine);
      this.dialog = true;
      this.title = "修改线路";
    },
    save() {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("save_vLine", vm.vo)
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
          .dispatch("update_vLine", vm.vo)
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
    del(vLine) {
      let vm = this;
      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.loading = true;
          vm.$store
            .dispatch("del_vLine", { ids: vLine.id })
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
    view(vLine) {
      let vm = this;
      vm.viewDialog = true;
      vm.loading = true;
      vm.$store
        .dispatch("get_vLine", { id: vLine.id })
        .then(res => {
          vm.loading = false;
          vm.vLineView = res;
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
    vLineQuery: {
      handler(val, oldVal) {
        if (this.vLineQuery.sortBy != "" || val.page != oldVal.page) {
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