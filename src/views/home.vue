<template>
  <v-container grid-list-md>
      <v-layout row>
          <v-flex xs12 sm4 md4>
              <v-toolbar color="blue" >
                      <v-toolbar-title class="white--text">登录信息</v-toolbar-title>
              </v-toolbar>
              <v-card >
                  <v-card-text>
                    <v-divider></v-divider>
                      <v-list dense>
                        <v-list-tile>
                          <v-list-tile-content>上一次登录时间:</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{ lastLoginTime }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>上一次登录位置:</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{ lastLoginIp }}</v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                  </v-card-text>
              </v-card>
          </v-flex>
          <v-flex xs12 sm8 md8 v-show="vo.name">
              <v-toolbar color="blue" >
                      <v-toolbar-title class="white--text">企业信息</v-toolbar-title>
              </v-toolbar>
              <v-card >
        <v-card-title></v-card-title>
        <v-card-text>
            <v-form v-model="fValid" ref="form" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.name"  label="名字" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 100) || '最多 100 字符',
                                  ]"
                                  :counter="100">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.code"  label="企业编号" required :disabled="vo.code&&vo.code!=''&&vo.code!='undefiend'"
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
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
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.cNo"  label="企业统一代码证号" required
                                  :rules="[
                                  rules.required,
                                  (v) => !!v||(v!=undefined&&v.length <= 50) || '最多 50 字符',
                                  ]"
                                  :counter="50">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                                <v-select :items="cTypeSelectData" v-model="vo.cType" :rules="[rules.required]" label="企业类型" required item-value="id" item-text="name"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                                <v-text-field  v-model="vo.bType" :rules="[rules.required]" label="营运类型" required ></v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.head"  label="法人" required
                                  :rules="[
                                  rules.required,
                                  (v)=>!!!v||(v!=undefined&&v.length <= 20) || '最多 20 字符',
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.tel"  label="联系电话" required
                                  :rules="[
                                  rules.required,
                                  rules.phone,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.busNum"  label="车辆数量" 
                                  :rules="[
                                  rules.digital,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.staffNum"  label="员工人数" 
                                  :rules="[
                                  rules.digital,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.sofficerNum "  label="安全员人数" 
                                  :rules="[
                                  rules.digital,
                                  ]"
                                  >
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                              <v-text-field v-model="vo.address"  label="经营地址" 
                                  :rules="[
                                  (v)=>!!!v||(v!=undefined&&v.length <= 100) || '最多 100 字符',
                                  ]"
                                  :counter="100">
                              </v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6 md4 >
                                <v-select :items="gradeSelectData" v-model="vo.grade" :rules="[]" label="安全生产考评等级"  item-value="value" item-text="text"></v-select>
                           </v-flex>
                           <v-flex xs12 sm6 md4 v-if="vo.grade!='0'">
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
          <v-btn color="success darken-1" flat @click.native="save" :loading="loading"  :disabled="loading||!fValid">保存</v-btn>
        </v-card-actions>
      </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import Kit from "../libs/kit.js";
var moment = require("moment");
export default {
  data() {
    return {
      fValid: true,
      vo: {},
      loading: false,
      title: "企业基本信息",
      rules: Kit.inputRules,
      cInfoHeaders: [{ text: "操作", sortable: false }],
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

  mounted() {
    this.init();
  },
  computed: {
    ...mapState({
      lastLoginTime: state => state.lastLoginTime,
      lastLoginIp: state => state.lastLoginIp
    })
  },

  created() {},
  components: {},
  methods: {
    init() {
      let vm = this;
      this.$store.dispatch("list_cInfo").then(res => {
         vm.vo = Object.assign({}, res);
      });
      this.$store.dispatch("init_cInfo").then(res => {
        vm.cTypeSelectData = res.cTypeList;
      });
    },
    save() {
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
    }
  },
  watch: {
    "vo.expiryDate": {
      handler(val, oldVal) {
        if (val && val != "undefined")
          this.vo.expiryDate = moment(val).format("YYYY-MM-DD");
      },
      deep: true
    },
    "vo.retDate": {
      handler(val, oldVal) {
        if (val && val != "undefined")
          this.vo.retDate = moment(val).format("YYYY-MM-DD");
      },
      deep: true
    }
  }
};
</script>
<style>
</style>
