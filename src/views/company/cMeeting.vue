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
                           <v-flex xs12 sm12 md12 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.title"  label="主题" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 100) || '最多 100 字符',
                                  ]"
                                  :counter="100">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm12 md12 v-show="opt=='add'||opt=='edit'">
                                <v-select :items="hostSelectData" v-model="vo.host" :rules="[rules.required]" label="主持人" multiple required item-value="name" item-text="name"></v-select>
                           </v-flex>
                            
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                                <v-select :items="typeSelectData" v-model="vo.type" :rules="[rules.required]" label="类型" required item-value="id" item-text="name"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.num"  label="参会人数" 
                                  :rules="[
                                  rules.digital,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-menu
                                        ref="mAtDateMenu"
                                        :close-on-content-click="false"
                                        v-model="mAtDateMenu"
                                        :return-value.sync="vo.mAt"
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
                                          v-model="vo.mAt"
                                          label="会议日期"
                                          required
                                          prepend-icon="event"
                                          readonly
                                          :rules="[rules.required]"
                                        ></v-text-field>
                                        <v-date-picker v-model="vo.mAt" locale="zh-cn"  @input="$refs.mAtDateMenu.save(vo.mAt)"></v-date-picker>
                                      </v-menu>
                           </v-flex>
                           <v-flex xs12 sm12 md12 v-show="opt=='add'||opt=='edit'">
                                                      <v-textarea v-model="vo.content"  label="内容"  required outline
                                                          :rules="[
                                                          rules.required,
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
  <v-dialog v-model="viewDialog" persistent max-width="600px">
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
                                    <v-list-tile-content>主持人:</v-list-tile-content><v-list-tile-content class="align-end">{{cMeetingView.host}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>参会人数:</v-list-tile-content><v-list-tile-content class="align-end">{{cMeetingView.num}}</v-list-tile-content>
                             </v-list-tile>
                              <v-list-tile>
                                    <v-list-tile-content>会议日期:</v-list-tile-content><v-list-tile-content class="align-end">{{cMeetingView.mAt | formatDate}}</v-list-tile-content>
                             </v-list-tile>
                                    <v-card>
                                      <v-card-title>内容</v-card-title>
                                        <v-card-text>
                                            {{cMeetingView.content}}
                                        </v-card-text>
                                    </v-card>
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
                        <v-select :items="typeSelectData" v-model="cMeetingQuery.type" label="类型"  item-value="id" item-text="name"></v-select>
                    </v-flex>
                         <v-flex xs12 sm3 md3 >
                              <v-menu ref="mAtQueryBeginDateMenu" :close-on-content-click="false" v-model="mAtQueryBeginDateMenu" :return-value.sync="cMeetingQuery.beginMAt"
                                   :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px" >
                                   <v-text-field slot="activator" v-model="cMeetingQuery.beginMAt" label="会议日期查询开始日期" prepend-icon="event" readonly ></v-text-field>
                                   <v-date-picker v-model="cMeetingQuery.beginMAt" locale="zh-cn"  @input="$refs.mAtQueryBeginDateMenu.save(cMeetingQuery.beginMAt)"></v-date-picker>
                             </v-menu>
                         </v-flex>
                         <v-flex xs12 sm3 md3 >
                              <v-menu ref="mAtQueryEndDateMenu" :close-on-content-click="false" v-model="mAtQueryEndDateMenu" :return-value.sync="cMeetingQuery.endMAt"
                                    :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px" >
                                    <v-text-field slot="activator" v-model="cMeetingQuery.endMAt" label="会议日期查询截至日期" prepend-icon="event" readonly ></v-text-field>
                                    <v-date-picker v-model="cMeetingQuery.endMAt" locale="zh-cn"  @input="$refs.mAtQueryEndDateMenu.save(cMeetingQuery.endMAt)"></v-date-picker>
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
            <v-data-table :headers="cMeetingHeaders" :total-items="totalRow" :hide-actions="totalRow==0" :items="cMeetingList" :rows-per-page-items="rowsPerPageItems" :pagination.sync="cMeetingQuery"  class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
              <template slot="items" slot-scope="props">
                    <td>
                               {{props.item.title}}
                    </td>
                    <td>
                               {{props.item.host}}
                    </td>
                    <td>
                               {{props.item.typeStr}}
                    </td>
                    <td>
                               {{props.item.num}}
                    </td>
                    <td>
                               {{props.item.mAt | formatDate}}
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
      cMeetingQuery: { pn: 1, sortBy: "", descending: "" }, //列表查询参数数据对象
      cMeetingView: {
        
      }, //查询详细数据对象
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
        {
          text: "会议日期",
          sortable: false,
          value: "mAt"
        },
        { text: "操作", sortable: false }
      ],
      dialog: false,
      viewDialog: false,
      opt: "",
      hostSelectData: [],
      typeSelectData: [],
      mAtDateMenu: false,
      mAtQueryBeginDateMenu: false,
      mAtQueryEndDateMenu: false
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
    this.cMeetingQuery["pn"] = this.cMeetingQuery.page;
    this.search();
    this.init();
  },
  methods: {
    init() {
      let vm = this;
      this.$store.dispatch("init_cMeeting").then(res => {
        vm.typeSelectData=res.meetingTypeList;
        vm.hostSelectData=res.staffList;
      });
    },
    search() {
      this.$store
        .dispatch("page_cMeeting", this.cMeetingQuery)
        .catch(res => {});
    },
    add() {
      this.loading = false;
      this.$refs.form.reset();
      this.vo = {mAt:moment(new Date).format("YYYY-MM-DD")};
      this.opt = "add";
      this.title = "新增会议记录";
      this.dialog = true;
    },
    edit(cMeeting) {
      this.loading = false;
      this.opt = "edit";
      this.vo = Object.assign({}, cMeeting);
      this.vo.host=this.vo.host.split(',')
      this.vo.type=parseInt(this.vo.type);
      this.dialog = true;
      this.title = "修改会议记录";
    },
    save() {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.vo.host=vm.vo.host.join(',')
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
    update() {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.vo.host=vm.vo.host.join(',')
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
      this.cMeetingQuery["beginMAt"] = "";
      this.cMeetingQuery["endMAt"] = "";
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
    cMeetingQuery: {
      handler(val, oldVal) {
        if (this.cMeetingQuery.sortBy != "" || val.page != oldVal.page) {
          this.search();
        }
      },
      deep: true
    },
    'vo.mAt':{
      handler(val,oldVal){
        
      }
    }
  }
};
</script>
<style>
</style>