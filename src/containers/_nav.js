import React from "react";
import CIcon from "@coreui/icons-react";
import { cilPencil, cilSettings } from "@coreui/icons";
const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "داشبرد",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: [" بارگزاری"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "بارگزاری فایل ها",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "بارگزاری فایل",
        to: "/upload",
      },
      {
        _tag: "CSidebarNavItem",
        name: "  بارگزاری فایل مشاوره",
        to: "/uploadProvider",
      },
    ],
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["مشاوره و برنامه ریزی"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "تماس های تلفنی",
    icon: "cil-phone",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "تماس های دقیقه ای",
        to: "/Consultation/MinuteCalls",
      },
    ],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["محتواهای سایت"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "محتواهای متنی",
    icon: "cilFile",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "مدیریت محتواهای متنی",
        to: "/Content/FreeContent/ManageArticles",
      },
      {
        _tag: "CSidebarNavItem",
        name: "ایجاد محتوای متنی جدید",
        to: "/Content/FreeContent/CreateArticle",
      },
    ],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["همایش"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "همایش",
    icon: <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "مدیریت همایش",
        to: "/Webinar/ManageWebinars",
      },
      {
        _tag: "CSidebarNavItem",
        name: "ایجاد همایش",
        to: "/Webinar/CreateWebinar",
      },
    ],
  },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["تدریس خصوصی"],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "تدریس خصوصی",
  //   icon: "cil-layers",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "مدیریت تدریس خصوصی",
  //       to: "/Tutoring/ManageTutoring",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "ایجاد تدریس خصوصی",
  //       to: "/Tutoring/CreateTutoring",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "مدیریت درس مشاور",
  //       to: "/ProviderCourse/ProviderCourse",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "ایجاد درس مشاور",
  //       to: "/ProviderCourse/CreateProviderCourse",
  //     },
  //   ],
  // },

  {
    _tag: "CSidebarNavTitle",
    _children: ["آزمون"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "آزمون های آنلاین  ",
    icon: "cil-pencil",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "مدیریت آزمون ها",
        to: "/Exams/ManageExams",
      },
      {
        _tag: "CSidebarNavItem",
        name: "ایجاد آزمون جدید",
        to: "/Exams/CreateExam/QuizInfo",
      },
    ],
  },
];

export default _nav;
