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
                              <v-text-field v-model="vo.title"  label="主题" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 100) || '最多 100 字符',
                                  ]"
                                  :counter="100">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                                <v-select :items="cMeetingSelectData" v-model="vo.host" :rules="[rules.required]" label="主持人" required item-value="value" item-text="text"></v-select>
                           </v-flex>
                            <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                                                      <v-text-field v-model="vo.content"  label="内容" textarea required
                                                          :rules="[
                                                          rules.required,
                                                          ]"
                                                          >
                                                      </v-text-field>
                            </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                                <v-select :items="cMeetingSelectData" v-model="vo.type" :rules="[rules.required]" label="类型" required item-value="value" item-text="text"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.num"  label="参会人数" 
                                  :rules="[
                                  rules.digital,
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
                                    <v-list-tile-content>主题:</v-list-tile-content><v-list-tile-content class="align-end">{{cMeetingView.title}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>主持人:</v-list-tile-content><v-list-tile-content class="align-end">{{cMeetingView.hostStr}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>内容:</v-list-tile-content><v-list-tile-content class="align-end">{{cMeetingView.content}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>参会人数:</v-list-tile-content><v-list-tile-content class="align-end">{{cMeetingView.num}}</v-list-tile-content>
                             </v-list-tile>
                  </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat @click.native="viewDialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-toolbar color="blue" >
              <v-toolbar-title class="white--text">会议记录列表</v-toolbar-title>
              <v-divider class="mx-3" inset vertical dark  ></v-divider>
              <v-spacer></v-spacer>
              <v-btn class="blue--text" @click.native="add()">新增<v-icon>add</v-icon></v-btn>
    </v-toolbar>
    <v-card >
              <v-container grid-list-md>
                      <v-layout row wrap>
                         <v-flex xs12 sm3 md3>
                            <v-text-field v-model="cMeetingQuery.title"  label="主题" single-line hide-details ></v-text-field>
                         </v-flex>
                    <v-flex xs12 sm3 md3>
                        <v-select :items="cMeetingSelectData" v-model="cMeetingQuery.type" label="类型"  item-value="value" item-text="text"></v-select>
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
            <v-data-table :headers="cMeetingHeaders" :total-items="totalRow" :hide-actions="totalRow==0" :items="cMeetingList" :rows-per-page-items="rowsPerPageItems" :pagination.sync="cMeetingQuery"  class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
              <template slot="items" slot-scope="props">
                    <td>
                               {{props.item.title}}
                    </td>
                    <td>
                               {{props.item.hostStr}}
                    </td>
                    <td>
                               {{props.item.typeStr}}
                    </td>
                    <td>
                               {{props.item.num}}
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
export default {
  data() {
    return {
      fValid: true,
      valid: true,
      vo: {},
      rowsPerPageItems: [15],
      cMeetingQuery: { pn: 1, sortBy: "", descending: "" }, //列表查询参数数据对象
      cMeetingView: {}, //查询详细数据对象
      loading: false,
      title: "新增会议记录",
      rules: Kit.inputRules,
      cMeetingHeaders: [
        {
          text: "主题",
          sortable: false,
          value: "title"
        },
        {
          text: "主持人",
          sortable: false,
          value: "host"
        },
        {
          text: "类型",
          sortable: false,
          value: "type"
        },
        {
          text: "参会人数",
          sortable: false,
          value: "num"
        },
        { text: "操作", sortable: false }
      ],
      dialog: false,
      viewDialog: false,
      opt: "",
      hostSelectData: [],
      typeSelectData: []
    };
  },
  computed: {
    ...mapState({
      cMeeting: state => state.cMeeting.cMeeting,
      cMeetingList: state => state.cMeeting.cMeetingList,
      totalRow: state => state.cMeeting.totalRow,
      pageNumber: state => state.cMeeting.pageNumber,
      pageSize: state => state.cMeeting.pageSize,
      totalPage: state => state.cMeeting.totalPage
    })
  },
  mounted() {
    this.cMeetingQuery["pn"] = this.serQuery.page;
    this.search();
  },
  methods: {
    search() {
      this.$store
        .dispatch("page_cMeeting", this.cMeetingQuery)
        .catch(res => {});
    },
    add() {
      this.loading = false;
      this.$refs.form.reset();
      this.opt = "add";
      this.title = "新增会议记录";
      this.dialog = true;
    },
    edit(cMeeting) {
      this.loading = false;
      this.opt = "edit";
      this.vo = Object.assign({}, cMeeting);
      this.dialog = true;
      this.title = "修改会议记录";
    },
    save() {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("save_cMeeting", vm.vo)
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
    update(cMeeting) {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("update_cMeeting", vm.vo)
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
    del(cMeeting) {
      let vm = this;
      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.loading = true;
          vm.$store
            .dispatch("del_cMeeting", { ids: cMeeting.id })
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
    view(cMeeting) {
      let vm = this;
      vm.viewDialog = true;
      vm.$store
        .dispatch("get_cMeeting", { id: cMeeting.id })
        .then(res => {
          vm.cMeetingView = res;
        })
        .catch(res => {
          vm.loading = false;
        });
    },
    clearQueryParam() {
      this.cMeetingQuery["title"] = "";
      this.cMeetingQuery["type"] = "";
    }
  },
  watch: {
    cMeetingQuery: {
      handler(val, oldVal) {
        if (this.cMeetingQuery.sortBy != "" || val.page != oldVal.page) {
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