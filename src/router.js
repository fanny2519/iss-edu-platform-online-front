import Vue from "vue";
//导入vue-router
import Router from "vue-router";
//使用路由插件
Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
//实例化路由
let router = new Router({
  mode: "history", // 1、hash:url带#号   2、history历史:url不带#号
  base: process.env.BASE_URL, //自动获取根目录路径
  routes: [
    {
      path: "/", // url路径"/"代表首页，http://localhost:8080/
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./pages/login"),
    },
    {
      path: "/register",
      name: "register",
      component: (/*注册页面*/) => import('@/pages/register.vue')
    },
    {
      path: "/index",
      // redirect:"/content",
      component: () => import("./pages/index"),
      children: [
        {
          path: "",
          name: "CenterArea",
          component: () => import("./pages/CenterArea"),
        },
        {
          path: "classes",
          name: "Classes",
          component: () => import("./pages/class/Classes.vue"),
        },
        // {
        //   path: "classes/insertCatalogue",
        //   name: "ClassForm",
        //   component: () => import("./pages/class/ClassForm/"),
        // },
        {
          path: "teachers",
          name: "Teachers",
          component: () => import("./pages/teacher/Teachers"),
        },
        {
          path: "teachers/updateTeacher/:id",
          name: "CatalogueList",
          component: () => import("./pages/teacher/UpdateTeacherForm"),
        },
        // {
        //   path: "student",
        //   name: "Student",
        //   component: () => import("./pages/student/Student"),
        // },
        {
          path: "students",
          name: "Students",
          component: () => import("./pages/student/Students"),
        },
        {
          path: "students/insertStudent/",
          name: "insertStudentList",
          component: () => import("./pages/student/StudentForm"),
        },
        {
          path: "students/updateStudent/:id",
          name: "updateStudentList",
          component: () => import("./pages/student/UpdateStudentForm"),
        },
        {
          path: "courses",
          name: "Courses",
          component: () => import("./pages/course/Courses"),
        },
        {
          path: "courses/insertCatalogue/:id/:title",
          name: "CatalogueList",
          component: () => import("./pages/course/CatalogueList"),
        },
        {
          path: "courses/updateCourse/:id",
          name: "CatalogueList",
          component: () => import("./pages/course/UpdateCourseForm"),
        },
      ],
    },
  ],
});
export default router;
