import React from "react";
import CIcon from "@coreui/icons-react";

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
    _tag: "CSidebarNavItem",
    name: "بارگزاری فایل",
    to: "/upload",
    icon: <CIcon name="cil-cursor" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "  بارگزاری فایل مشاوره",
    to: "/Provider",
    icon: <CIcon name="cil-cursor" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "",
    },
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
    _tag: "CSidebarNavDropdown",
    name: "همایش",
    icon: "cil-layers",
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
