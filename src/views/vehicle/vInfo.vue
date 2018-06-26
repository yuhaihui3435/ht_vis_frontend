<template>
<div >
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
                              <v-text-field v-model="vo.licensePlate"  label="牌照号" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 20) || '最多 20 字符',
                                  ]"
                                  :counter="20">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.host"  label="车主" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                                <v-select :items="vInfoSelectData" v-model="vo.type" :rules="[rules.required]" label="类型" required item-value="value" item-text="text"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.tel"  label="手机" required
                                  :rules="[
                                  rules.required,
                                  rules.phone,
                                  (v) => !!v||(v!=undefined&&v.length <= 15) || '最多 15 字符',
                                  ]"
                                  :counter="15">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.telx"  label="备用手机" 
                                  :rules="[
                                  rules.phone,
                                  (v)=>!!!v||(v!=undefined&&v.length <= 15) || '最多 15 字符',
                                  ]"
                                  :counter="15">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-menu
                                        ref="regDateDateMenu"
                                        :close-on-content-click="false"
                                        v-model="regDateMenu"
                                        :return-value.sync="vInfo.regDate"
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
                                          v-model="vo.regDate"
                                          label="注册时间"
                                          required
                                          prepend-icon="event"
                                          readonly
                                          :rules="[rules.required]"
                                        ></v-text-field>
                                        <v-date-picker v-model="vInfo.regDate" locale="zh-cn"  @input="$refs.regDateMenu.save(vInfo.regDate)"></v-date-picker>
                                      </v-menu>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                                <v-select :items="vInfoSelectData" v-model="vo.line" :rules="[]" label="线路"  item-value="value" item-text="text"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                                <v-select :items="vInfoSelectData" v-model="vo.area" :rules="[]" label="地区"  item-value="value" item-text="text"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.idcard"  label="身份证号" 
                                  :rules="[
                                  (v)=>!!!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
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
                                    <v-list-tile-content>牌照号:</v-list-tile-content><v-list-tile-content class="align-end">{{vInfoView.licensePlate}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>车主:</v-list-tile-content><v-list-tile-content class="align-end">{{vInfoView.host}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>类型:</v-list-tile-content><v-list-tile-content class="align-end">{{vInfoView.typeStr}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>手机:</v-list-tile-content><v-list-tile-content class="align-end">{{vInfoView.tel}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>备用手机:</v-list-tile-content><v-list-tile-content class="align-end">{{vInfoView.telx}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>注册时间:</v-list-tile-content><v-list-tile-content class="align-end">{{vInfoView.regDate | formatDate}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>线路:</v-list-tile-content><v-list-tile-content class="align-end">{{vInfoView.lineStr}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>地区:</v-list-tile-content><v-list-tile-content class="align-end">{{vInfoView.areaStr}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>身份证号:</v-list-tile-content><v-list-tile-content class="align-end">{{vInfoView.idcard}}</v-list-tile-content>
                             </v-list-tile>
                  </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat @click.native="viewDialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-toolbar color="blue" >
              <v-toolbar-title class="white--text">车辆信息列表</v-toolbar-title>
              <v-divider class="mx-3" inset vertical dark  ></v-divider>
              <v-spacer></v-spacer>
              <v-btn class="blue--text" @click.native="add()">新增<v-icon>add</v-icon></v-btn>
    </v-toolbar>
    <v-card >
              <v-container grid-list-md>
                      <v-layout row wrap>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="vInfoQuery.licensePlate"  label="牌照号" single-line hide-details ></v-text-field>
                         </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="vInfoQuery.host"  label="车主" single-line hide-details ></v-text-field>
                         </v-flex>
                    <v-flex xs12 sm3 md3>
                        <v-select :items="vInfoSelectData" v-model="vInfoQuery.type" label="类型"  item-value="value" item-text="text"></v-select>
                    </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="vInfoQuery.tel"  label="手机" single-line hide-details ></v-text-field>
                         </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="vInfoQuery.telx"  label="备用手机" single-line hide-details ></v-text-field>
                         </v-flex>
                    <v-flex xs12 sm3 md3>
                        <v-select :items="vInfoSelectData" v-model="vInfoQuery.line" label="线路"  item-value="value" item-text="text"></v-select>
                    </v-flex>
                    <v-flex xs12 sm3 md3>
                        <v-select :items="vInfoSelectData" v-model="vInfoQuery.area" label="地区"  item-value="value" item-text="text"></v-select>
                    </v-flex>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="vInfoQuery.idcard"  label="身份证号" single-line hide-details ></v-text-field>
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
            <v-data-table :headers="vInfoHeaders" :total-items="totalRow" :hide-actions="totalRow==0" :items="vInfoList" :rows-per-page-items="rowsPerPageItems" :pagination.sync="vInfoQuery"  class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
              <template slot="items" slot-scope="props">
                    <td>
                               {{props.item.licensePlate}}
                    </td>
                    <td>
                               {{props.item.host}}
                    </td>
                    <td>
                               {{props.item.typeStr}}
                    </td>
                    <td>
                               {{props.item.tel}}
                    </td>
                    <td>
                               {{props.item.telx}}
                    </td>
                    <td>
                               {{props.item.regDate | formatDate}}
                    </td>
                    <td>
                               {{props.item.lineStr}}
                    </td>
                    <td>
                               {{props.item.areaStr}}
                    </td>
                    <td>
                               {{props.item.idcard}}
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
</div>
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
      vInfoQuery: { pn: 1, sortBy: "", descending: "" }, //列表查询参数数据对象
      vInfoView: {}, //查询详细数据对象
      loading: false,
      title: "新增车辆信息",
      rules: Kit.inputRules,
      vInfoHeaders: [
        {
          text: "牌照号",
          sortable: false,
          value: "licensePlate"
        },
        {
          text: "车主",
          sortable: false,
          value: "host"
        },
        {
          text: "类型",
          sortable: false,
          value: "type"
        },
        {
          text: "手机",
          sortable: false,
          value: "tel"
        },
        {
          text: "备用手机",
          sortable: false,
          value: "telx"
        },
        {
          text: "注册时间",
          sortable: false,
          value: "regDate"
        },
        {
          text: "线路",
          sortable: false,
          value: "line"
        },
        {
          text: "地区",
          sortable: false,
          value: "area"
        },
        {
          text: "身份证号",
          sortable: false,
          value: "idcard"
        },
        { text: "操作", sortable: false }
      ],
      dialog: false,
      viewDialog: false,
      opt: "",
      typeSelectData: [
        { text: "公交", value: "0" },
        { text: "校车", value: "1" }
      ],
      regDateDateMenu: false,
      lineSelectData: [],
      areaSelectData: []
    };
  },
  computed: {
    ...mapState({
      vInfo: state => state.vInfo.vInfo,
      vInfoList: state => state.vInfo.vInfoList,
      totalRow: state => state.vInfo.totalRow,
      pageNumber: state => state.vInfo.pageNumber,
      pageSize: state => state.vInfo.pageSize,
      totalPage: state => state.vInfo.totalPage
    })
  },
  mounted() {
    this.vInfoQuery["pn"] = this.serQuery.page;
    this.search();
  },
  methods: {
    search() {
      this.$store.dispatch("page_vInfo", this.vInfoQuery).catch(res => {});
    },
    add() {
      this.loading = false;
      this.$refs.form.reset();
      this.opt = "add";
      this.title = "新增车辆信息";
      this.dialog = true;
    },
    edit(vInfo) {
      this.loading = false;
      this.opt = "edit";
      this.vo = Object.assign({}, vInfo);
      this.dialog = true;
      this.title = "修改车辆信息";
    },
    save() {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("save_vInfo", vm.vo)
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
    update(vInfo) {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("update_vInfo", vm.vo)
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
    del(vInfo) {
      let vm = this;
      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.loading = true;
          vm.$store
            .dispatch("del_vInfo", { ids: vInfo.id })
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
    view(vInfo) {
      let vm = this;
      vm.viewDialog = true;
      vm.$store
        .dispatch("get_vInfo", { id: vInfo.id })
        .then(res => {
          vm.vInfoView = res;
        })
        .catch(res => {
          vm.loading = false;
        });
    },
    clearQueryParam() {
      this.vInfoQuery["licensePlate"] = "";
      this.vInfoQuery["host"] = "";
      this.vInfoQuery["type"] = "";
      this.vInfoQuery["tel"] = "";
      this.vInfoQuery["telx"] = "";
      this.vInfoQuery["regDate"] = "";
      this.vInfoQuery["line"] = "";
      this.vInfoQuery["area"] = "";
      this.vInfoQuery["idcard"] = "";
    }
  },
  filters: {
    formatDate(time) {
      if (!!!time) return "";
      var date = new Date(time);
      return moment(date).format("YYYY-MM-DD hh:mm:ss");
    }
  },
  watch: {
    vInfoQuery: {
      handler(val, oldVal) {
        if (this.vInfoQuery.sortBy != "" || val.page != oldVal.page) {
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