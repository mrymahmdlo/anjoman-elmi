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
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["محتواهای سایت", " - لطفا استفاده نکنید"],
  // },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "محتوای عمومی(درحال تست)",
  //   icon: "cilFile",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "ایجاد محتوای جدید",
  //       to: "/Content/FreeContent/Create",
  //     },
  //   ],
  // },
  {
    _tag: "CSidebarNavTitle",
    _children: ["آزمون های آنلاین - درحال تست میباشد"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "مدیریت آزمون ها(استفاده نکنید)",
    icon: "cil-layers",
    to: "/Exams/ManageExams",
  },
  {
    _tag: "CSidebarNavItem",
    name: "ایجاد آزمون جدید(استفاده نکنید)",
    icon: "cil-pencil",
    to: "/Exams/CreateExam/QuizInfo",
  },
];

export default _nav;
