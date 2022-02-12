import React from "react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

// todo
// routing for each product export from its folder
// each obj for product be in new file
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
    _children: ["امکانات"],
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
        name: "بارگزاری فایل مشاوره",
        to: "/uploadProvider",
      },
      {
        _tag: "CSidebarNavItem",
        name: "مدیریت فایل های مشاوره",
        to: "/ManageuploadProvider",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "محتواهای متنی",
    icon: "cilFile",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "ایجاد محتوای متنی جدید",
        to: "/Content/FreeContent/CreateArticle",
      },
      {
        _tag: "CSidebarNavItem",
        name: "مدیریت محتواهای متنی",
        to: "/Content/FreeContent/ManageArticles",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "زمان بندی مشاور",
    icon: (
      <CIcon content={freeSet.cilClock} customClasses="c-sidebar-nav-icon" />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "ایجاد زمان بندی",
        to: "/TimeSheet/CreateTimeSheet",
      },
      {
        _tag: "CSidebarNavItem",
        name: "ثبت ظرفیت مدرس",
        to: "/TimeSheet/CapacityRegistration",
      },
      {
        _tag: "CSidebarNavItem",
        name: "مدیریت زمان بندی",
        to: "/TimeSheet/ManageTimeSheet",
      },
    ],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["محصولات"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "آزمون های آنلاین  ",
    icon: "cil-pencil",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "ایجاد آزمون جدید",
        to: "/Exams/CreateExam/QuizInfo",
      },
      {
        _tag: "CSidebarNavItem",
        name: "مدیریت آزمون ها",
        to: "/Exams/ManageExams",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "تدریس خصوصی",
    icon: "cil-layers",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "ایجاد تدریس خصوصی",
        to: "/Tutoring/CreateTutoring",
      },
      {
        _tag: "CSidebarNavItem",
        name: "ایجاد درس مشاور",
        to: "/ProviderCourse/CreateProviderCourse",
      },
      {
        _tag: "CSidebarNavItem",
        name: "برگزاری دستی جلسات",
        to: "/Tutoring/ManuallyCreateTutoring",
      },
      {
        _tag: "CSidebarNavItem",
        name: "پیامک های ارسالی",
        to: "/AllSMS",
      },
      {
        _tag: "CSidebarNavItem",
        name: "مدیریت محصولات تدریس خصوصی",
        to: "/Tutoring/ManageTutoring",
      },

      {
        _tag: "CSidebarNavItem",
        name: "مدیریت درس مشاور",
        to: "/ProviderCourse/ProviderCourse",
      },
      {
        _tag: "CSidebarNavItem",
        name: "مدیریت جلسات",
        to: "/AllTutoring",
      },
    ],
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
    _tag: "CSidebarNavDropdown",
    name: "همایش های آنلاین",
    icon: <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "ایجاد همایش",
        to: "/Webinar/CreateWebinar",
      },
      {
        _tag: "CSidebarNavItem",
        name: "مدیریت سفارشات",
        to: "/Subscriptions/ManageSubscriptions",
      },
      {
        _tag: "CSidebarNavItem",
        name: "مدیریت همایش",
        to: "/Webinar/ManageWebinars",
      },
    ],
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["مدیریت مالی"],
  },
  {
    icon: "cil-call",
    _tag: "CSidebarNavItem",
    name: "ایجاد کد تخفیف",
    to: "/Financial/discount-code",
  },
];

export default _nav;
