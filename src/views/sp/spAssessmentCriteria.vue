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
                                <v-select :items="normSelectData" v-model="vo.norm" :rules="[rules.required]" label="指标" required item-value="id" item-text="name"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                                <v-select :items="titleSelectData" v-model="vo.title" :rules="[rules.required]"  label="标题" required item-value="id" item-text="name"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                              <v-text-field v-model="vo.point"  label="分值" required
                                  :rules="[
                                  rules.required,
                                  rules.digital,
                                  (v) => !!v||(v!=undefined&&v.length <= 10) || '最多 10 字符',
                                  ]"
                                  :counter="10">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-show="opt=='add'||opt=='edit'">
                                <v-select :items="starsSelectData" v-model="vo.stars" :rules="[]" label="星级" clearable item-value="value" item-text="text"></v-select>
                           </v-flex>
                            <v-flex xs12 sm12 md12 v-show="opt=='add'||opt=='edit'">
                                                      <v-textarea v-model="vo.essential"  label="考评要点" outline required
                                                          :rules="[
                                                          rules.required,
                                                          ]"
                                                          >
                                                      </v-textarea>
                            </v-flex>
                           
                            <v-flex xs12 sm12 md12 v-show="opt=='add'||opt=='edit'">
                                                      <v-textarea v-model="vo.grading"  label="评分标准" outline required
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
            <span class="headline">相关文件</span>
          </v-card-title>
            <v-divider></v-divider>
            <div>
                  <uploader ref="uploader" :options="upLoadOptions" class="uploader"  :fileStatusText="fileStatusText" @file-complete="fileComplete" @complete="complete" @file-success="fileSuccess" @file-added="fileAdded">
                    <uploader-unsupport></uploader-unsupport>
                    <uploader-drop>
                      <uploader-btn :attrs="attrs">选择文件</uploader-btn>
                    </uploader-drop>
                    <uploader-list></uploader-list>
                  </uploader>
            </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" flat @click.native="viewDialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-toolbar color="blue" >
              <v-toolbar-title class="white--text">考评标准列表</v-toolbar-title>
              <v-divider class="mx-3" inset vertical dark  ></v-divider>
              <v-spacer></v-spacer>
              <v-btn class="blue--text" @click.native="add()">新增<v-icon>add</v-icon></v-btn>
    </v-toolbar>
    <v-card >
              <v-container grid-list-md>
                      <v-layout row wrap>
                    <v-flex xs12 sm3 md3>
                        <v-select :items="normSelectData" v-model="spAssessmentCriteriaQuery.norm" label="指标"  item-value="id" item-text="name"></v-select>
                    </v-flex>
                    <v-flex xs12 sm3 md3>
                        <v-select :items="titleSelectData" v-model="spAssessmentCriteriaQuery.title" label="标题"  item-value="id" item-text="name"></v-select>
                    </v-flex>
                    <v-flex xs12 sm3 md3>
                        <v-select :items="starsSelectData" v-model="spAssessmentCriteriaQuery.stars" label="星级"  item-value="value" item-text="text"></v-select>
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
            <v-data-table :headers="spAssessmentCriteriaHeaders" :total-items="totalRow" :hide-actions="totalRow==0" :items="spAssessmentCriteriaList" :rows-per-page-items="rowsPerPageItems" :pagination.sync="spAssessmentCriteriaQuery"  class="elevation-1" no-data-text="数据为空" no-results-text="没有筛选到正确的数据">
              <template slot="items" slot-scope="props">
                    <td>
                               {{props.item.normStr}}
                    </td>
                    <td>
                               {{props.item.titleStr}}
                    </td>
                    <td>
                               {{props.item.essential}}
                    </td>
                    <td>
                               {{props.item.grading}}
                    </td>
                    <td>
                               {{props.item.point}}
                    </td>
                    <td>
                               {{props.item.starsStr}}
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
      spAssessmentCriteriaQuery: { pn: 1, sortBy: "", descending: "" }, //列表查询参数数据对象
      spAssessmentCriteriaView: {}, //查询详细数据对象
      loading: false,
      title: "新增考评标准",
      rules: Kit.inputRules,
      spAssessmentCriteriaHeaders: [
        {
          text: "指标",
          sortable: true,
          value: "norm"
        },
        {
          text: "标题",
          sortable: true,
          value: "title"
        },
        {
          text: "考评要点",
          sortable: false,
          value: "essential"
        },
        {
          text: "评分标准",
          sortable: false,
          value: "grading"
        },
        {
          text: "分值",
          sortable: false,
          value: "point"
        },
        {
          text: "星级",
          sortable: true,
          value: "stars"
        },
        { text: "操作", sortable: false }
      ],
      dialog: false,
      viewDialog: false,
      opt: "",
      normSelectData: [],
      titleSelectData: [],
      starsSelectData: [
        { text: "一级", value: "1" },
        { text: "二级", value: "2" },
        { text: "三级", value: "3" }
      ],
      normChildMap: {},
      upLoadOptions: {
        target: Kit.env + "/cmn/act01",
        testChunks: false
      },
      fileStatusText: {
        success: "成功",
        error: "失败",
        uploading: "上传中",
        paused: "暂停",
        waiting: "等待"
      },
      attrs: {
        accept: "application/pdf,application/msword"
      }
    };
  },
  computed: {
    ...mapState({
      spAssessmentCriteria: state =>
        state.spAssessmentCriteria.spAssessmentCriteria,
      spAssessmentCriteriaList: state =>
        state.spAssessmentCriteria.spAssessmentCriteriaList,
      totalRow: state => state.spAssessmentCriteria.totalRow,
      pageNumber: state => state.spAssessmentCriteria.pageNumber,
      pageSize: state => state.spAssessmentCriteria.pageSize,
      totalPage: state => state.spAssessmentCriteria.totalPage
    })
  },
  mounted() {
    this.spAssessmentCriteriaQuery["pn"] = this.spAssessmentCriteriaQuery.page;
    this.search();
    this.init();
    this.$nextTick(() => {
      window.uploader = this.$refs.uploader.uploader;
    });
  },
  methods: {
    init() {
      let vm = this;
      this.$store.dispatch("init_spAssessmentCriteria").then(res => {
        vm.normSelectData = res.normList;
        vm.normChildMap = res.normChildMap;
      });
    },
    search() {
      this.$store
        .dispatch("page_spAssessmentCriteria", this.spAssessmentCriteriaQuery)
        .catch(res => {});
    },
    add() {
      this.loading = false;
      this.$refs.form.reset();
      this.vo = {};
      this.opt = "add";
      this.title = "新增考评标准";
      this.dialog = true;
    },
    edit(spAssessmentCriteria) {
      this.loading = false;
      this.opt = "edit";
      this.vo = Object.assign({}, spAssessmentCriteria);
      this.dialog = true;
      this.title = "修改考评标准";
    },
    save() {
      let vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$store
          .dispatch("save_spAssessmentCriteria", vm.vo)
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
          .dispatch("update_spAssessmentCriteria", vm.vo)
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
    del(spAssessmentCriteria) {
      let vm = this;
      this.$APDialog.confirm(function(ret) {
        if (ret) {
          vm.loading = true;
          vm.$store
            .dispatch("del_spAssessmentCriteria", {
              ids: spAssessmentCriteria.id
            })
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
    view(spAssessmentCriteria) {
      let vm = this;
      vm.viewDialog = true;
      vm.loading = true;
      vm.$store
        .dispatch("get_spAssessmentCriteria", { id: spAssessmentCriteria.id })
        .then(res => {
          vm.loading = false;
          vm.spAssessmentCriteriaView = res;
        })
        .catch(res => {
          vm.loading = false;
        });
    },
    clearQueryParam() {
      this.spAssessmentCriteriaQuery["norm"] = "";
      this.spAssessmentCriteriaQuery["title"] = "";
      this.spAssessmentCriteriaQuery["stars"] = "";
      this.search();
    },
    complete() {
      console.log("complete", arguments);
    },
    fileComplete() {
      console.log("file complete", arguments);
    },
    fileSuccess(rootFile, file, message, chunk){
      console.info(message)
    },
    fileAdded(file,event){
      console.info(file,event)
    }
   
  },
  filters: {},
  watch: {
    spAssessmentCriteriaQuery: {
      handler(val, oldVal) {
        if (
          this.spAssessmentCriteriaQuery.sortBy != "" ||
          val.page != oldVal.page
        ) {
          this.spAssessmentCriteriaQuery.pn = val.page;
          this.search();
        }
      },
      deep: true
    },
    "vo.norm": {
      handler(val, oldVal) {
        if (val != oldVal) {
          this.titleSelectData = this.normChildMap[val];
        }
      }
    },
    "spAssessmentCriteriaQuery.norm": {
      handler(val, oldVal) {
        if (val != oldVal) {
          this.titleSelectData = this.normChildMap[val];
        }
      }
    }
  }
};
</script>
<style>
</style>