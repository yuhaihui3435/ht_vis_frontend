import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue';
import Main from '@/views/main.vue';

Vue.use(Router);

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: resolve => {
    require(['@/views/login.vue'], resolve);
  }
};
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [{
      path: 'home',
      title: '控制中心',
      meta: {
        title: '控制中心'
      },
      name: 'home',
      component: resolve => {
        require(['@/views/home.vue'], resolve);
      }
    },
    {
      path: 'pc',
      title: '个人中心',
      meta: {
        title: '个人中心'
      },
      name: 'pc_index',
      component: resolve => {
        require(['@/views/personCenter.vue'], resolve);
      }
    }
  ]
};
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
    path: '/sm',
    icon: 'settings',
    name: 'admin',
    title: '系统管理',
    component: Main,
    meta: {
      title: '系统管理'
    },
    children: [{
        path: 'user',
        title: '用户管理',
        meta: {
          title: '用户管理',
          pTitle: '系统管理',
          icon: "person",
        },
        icon: "person",
        name: 'sm_user',
        component: resolve => {
          require(['@/views/sys-manage/user/user.vue'], resolve);
        }
      },
      {
        path: 'role',
        title: '角色管理',
        meta: {
          title: '角色管理',
          pTitle: '系统管理',
          icon: "group",
        },
        icon: "group",
        name: 'sm_role',
        component: resolve => {
          require(['@/views/sys-manage/role/role.vue'], resolve);
        }
      },
      {
        path: 'res',
        title: '菜单管理',
        meta: {
          title: '菜单管理',
          pTitle: '系统管理',
          icon: "poll",
        },
        icon: "poll",
        name: 'sm_res',
        component: resolve => {
          require(['@/views/sys-manage/res/res.vue'], resolve);
        }
      },
      {
        path: 'ser',
        title: '服务管理',
        meta: {
          title: '服务管理',
          pTitle: '系统管理',
          icon: "http",
        },
        icon: "http",
        name: 'sm_ser',
        component: resolve => {
          require(['@/views/sys-manage/ser/ser.vue'], resolve);
        }
      },
      {
        path: 'dd',
        title: '数据字典',
        meta: {
          title: '数据字典',
          pTitle: '系统管理',
          icon: "local_library",
        },
        icon: "local_library",
        name: 'sm_dd',
        component: resolve => {
          require(['@/views/sys-manage/dd/dd.vue'], resolve);
        }
      },
      {
        path: 'param',
        title: '参数管理',
        meta: {
          title: '参数管理',
          pTitle: '系统管理',
          icon: "mouse",
        },
        icon: "mouse",
        name: 'sm_param',
        component: resolve => {
          require(['@/views/sys-manage/param/param.vue'], resolve);
        }
      },
    ]
  },
  {
    path: '/vehicle',
    icon: 'directions_bus',
    name: 'vehicle',
    title: '车辆管理',
    component: Main,
    meta: {
      title: '车辆管理'
    },
    children: [{
        path: 'info',
        title: '车辆管理',
        meta: {
          title: '车辆管理',
          pTitle: '车辆管理',
          icon: "directions_bus",
        },
        icon: "directions_bus",
        name: 'vehicle_info',
        component: resolve => {
          require(['@/views/vehicle/vInfo.vue'], resolve);
        }
      },
      {
        path: 'insurance',
        title: '保险管理',
        meta: {
          title: '保险管理',
          pTitle: '车辆管理',
          icon: "security",
        },
        icon: "security",
        name: 'vehicle_insurance',
        component: resolve => {
          require(['@/views/vehicle/vInsurance.vue'], resolve);
        }
      },
      {
        path: 'change',
        title: '过户管理',
        meta: {
          title: '过户管理',
          pTitle: '车辆管理',
          icon: "compare_arrows",
        },
        icon: "compare_arrows",
        name: 'vehicle_change',
        component: resolve => {
          require(['@/views/vehicle/vChange.vue'], resolve);
        }
      },
    ]
  },
  {
    path: '/company',
    icon: 'business',
    name: 'company',
    title: '企业管理',
    component: Main,
    meta: {
      title: '企业管理'
    },
    children: [{
        path: 'info',
        title: '企业信息管理',
        meta: {
          title: '企业信息管理',
          pTitle: '企业管理',
          icon: "info",
        },
        icon: "info",
        name: 'company_info',
        component: resolve => {
          require(['@/views/company/cInfo.vue'], resolve);
        }
      },
      {
        path: 'department',
        title: '部门管理',
        meta: {
          title: '部门管理',
          pTitle: '公司管理',
          icon: "class",
        },
        icon: "class",
        name: 'company_department',
        component: resolve => {
          require(['@/views/company/cDepartment.vue'], resolve);
        }
      },
      {
        path: 'staff',
        title: '员工管理',
        meta: {
          title: '员工管理',
          pTitle: '公司管理',
          icon: "account_box",
        },
        icon: "account_box",
        name: 'company_staff',
        component: resolve => {
          require(['@/views/company/cStaff.vue'], resolve);
        }
      },
      {
        path: 'meeting',
        title: '会议管理',
        meta: {
          title: '会议管理',
          pTitle: '公司管理',
          icon: "account_balance",
        },
        icon: "account_balance",
        name: 'company_meeting',
        component: resolve => {
          require(['@/views/company/cMeeting.vue'], resolve);
        }
      },

    ]
  },
  {
    path: '/safeProduction',
    icon: 'security',
    name: 'company',
    title: '安全生产管理',
    component: Main,
    meta: {
      title: '安全生产管理'
    },
    children: [{
      path: 'system',
      title: '制度管理',
      meta: {
        title: '制度管理',
        pTitle: '安全生产管理',
        icon: "insert_drive_file",
      },
      icon: "insert_drive_file",
      name: 'safeProduction_system',
      component: resolve => {
        require(['@/views/company/cInfo.vue'], resolve);
      }
    },{
      path: 'operatingProcedures',
      title: '操作规程管理',
      meta: {
        title: '操作规程管理',
        pTitle: '安全生产管理',
        icon: "insert_drive_file",
      },
      icon: "insert_drive_file",
      name: 'safeProduction_operatingProcedures',
      component: resolve => {
        require(['@/views/company/cInfo.vue'], resolve);
      }
    },  ]
  }
]

export const routers = [
  loginRouter,
  otherRouter,
  ...appRouter,
];

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routers
};

export const router = new Router(RouterConfig);
