import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const MinuteCalls = React.lazy(() =>
  import("./Consultation/MinuteCalls/MinuteCalls")
);
const CreateFreeArticle = React.lazy(() =>
  import("./Content/CreateArticle/CreateFreeArticle")
);
const EditArticle = React.lazy(() =>
  import("./Content/EditArticle/EditArticle")
);
const ManageArticles = React.lazy(() =>
  import("./Content/ManageArticles/ManageArticles")
);
const ManageWebinar = React.lazy(() =>
  import("./Webinar/ManageWebinar/ManageWebinars")
);
const CreateWebinar = React.lazy(() =>
  import("./Webinar/CreateWebinar/CreateWebinar")
);

const EditWebinar = React.lazy(() =>
  import("./Webinar/EditWebinar/EditWebinar")
);
const ManageSubscriptions = React.lazy(() =>
  import("./Webinar/ManageSubscriptions/ManageSubscriptions")
);
const EditSubscriptions = React.lazy(() =>
  import("./Webinar/EditSubscriptions/EditSubscriptions")
);

const CreateExam = React.lazy(() =>
  import("./Exam/CreateNewExam/CreateNewExam")
);
const EditExam = React.lazy(() => import("./Exam/EditExam/EditExam"));
const ManageExams = React.lazy(() => import("./Exam/ManageExams/ManageExams"));
const ExamQuestionBank = React.lazy(() =>
  import("./Exam/ExamQuestionBank/ExamQuestionBank")
);
const ManageTutoring = React.lazy(() =>
  import("./Tutoring/ManageTutoring/ManageTutoring")
);
const EditeTutoring = React.lazy(() =>
  import("./Tutoring/EditTutoring/EditTutoring")
);
const CreateTutoring = React.lazy(() =>
  import("./Tutoring/CreateTutoring/CreateTutoring")
);
const ProviderCourse = React.lazy(() =>
  import("./Tutoring/ProviderCourse/ProviderCourse")
);
const CreateProviderCourse = React.lazy(() =>
  import("./Tutoring/ProviderCourse/CreateProviderCourse/CreateProviderCourse")
);
const AllSms = React.lazy(() => import("./Tutoring/Sms/Sms"));
const ManageuploadProvider = React.lazy(() =>
  import("./Upload/UploadProviderFile/ManageuploadProvider")
);
const AllTutoring = React.lazy(() =>
  import("./Tutoring/AllTutoring/AllTutoring")
);
const ManuallyCreateTutoring = React.lazy(() =>
  import("./Tutoring/ManuallyCreateTutoring/ManuallyCreateTutoring")
);

const ManageTimeSheet = React.lazy(() =>
  import("./TimeSheet/ManageTimeSheet/ManageTimeSheet.js")
);
const CreateTimeSheet = React.lazy(() =>
  import("./TimeSheet/CreateTimeSheet/CreateTimeSheet")
);
const CapacityRegistration = React.lazy(() =>
  import("./TimeSheet/CapacityRegistration/CapacityRegistration")
);

const Upload = React.lazy(() => import("src/Upload/Upload"));
const UploadProvider = React.lazy(() =>
  import("src/Upload/UploadProviderFile/UploadProvider")
);
//examples
const Toaster = React.lazy(() =>
  import("./views/notifications/toaster/Toaster")
);
const Tables = React.lazy(() => import("./views/base/tables/Tables"));

const Breadcrumbs = React.lazy(() =>
  import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const BasicForms = React.lazy(() => import("./views/base/forms/BasicForms"));

const Jumbotrons = React.lazy(() =>
  import("./views/base/jumbotrons/Jumbotrons")
);
const ListGroups = React.lazy(() =>
  import("./views/base/list-groups/ListGroups")
);
const Navbars = React.lazy(() => import("./views/base/navbars/Navbars"));
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./views/base/paginations/Pagnations")
);
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const ProgressBar = React.lazy(() =>
  import("./views/base/progress-bar/ProgressBar")
);
const Switches = React.lazy(() => import("./views/base/switches/Switches"));

const Tabs = React.lazy(() => import("./views/base/tabs/Tabs"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));
const BrandButtons = React.lazy(() =>
  import("./views/buttons/brand-buttons/BrandButtons")
);
const ButtonDropdowns = React.lazy(() =>
  import("./views/buttons/button-dropdowns/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() =>
  import("./views/buttons/button-groups/ButtonGroups")
);
const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
const Charts = React.lazy(() => import("./views/charts/Charts"));
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);
const Widgets = React.lazy(() => import("./views/widgets/Widgets"));
const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));

const routes = [
  { path: "/", exact: true, name: "Home", component: Dashboard },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/upload", name: "Upload", component: Upload },
  {
    path: "/uploadProvider",
    name: "UploadProvider",
    component: UploadProvider,
  },
  {
    path: "/Consultation/MinuteCalls",
    name: "MinuteCalls",
    component: MinuteCalls,
  },
  {
    path: "/Content/FreeContent/CreateArticle",
    name: "CreateArticle",
    component: CreateFreeArticle,
  },
  {
    path: "/Content/FreeContent/EditArticle/:id",
    name: "EditArticle",
    component: EditArticle,
  },
  {
    path: "/Content/FreeContent/ManageArticles",
    name: "ManageArticles",
    component: ManageArticles,
  },
  {
    path: "/Webinar/ManageWebinars",
    name: "ManageWebinars",
    component: ManageWebinar,
  },
  {
    path: "/Webinar/CreateWebinar",
    name: "CreateWebinar",
    component: CreateWebinar,
  },
  {
    path: "/Webinar/EditWebinar/:id",
    name: "EditWebinar",
    component: EditWebinar,
  },
  {
    path: "/Webinar/Subscriptions",
    name: "ManageSubscriptions",
    component: ManageSubscriptions,
  },
  {
    path: "/Webinar/EditSubscriptions/:id",
    name: "EditSubscriptions",
    component: EditSubscriptions,
  },

  {
    path: "/Tutoring/ManageTutoring",
    name: "ManageTutoring",
    component: ManageTutoring,
  },
  {
    path: "/Tutoring/EditeTutoring/:id",
    name: "EditeTutoring",
    component: EditeTutoring,
  },
  {
    path: "/Tutoring/CreateTutoring",
    name: "CreateTutoring",
    component: CreateTutoring,
  },
  {
    path: "/ProviderCourse/ProviderCourse",
    name: "ProviderCourse",
    component: ProviderCourse,
  },
  {
    path: "/ProviderCourse/CreateProviderCourse",
    name: "CreateProviderCourse",
    component: CreateProviderCourse,
  },
  {
    path: "/AllSMS",
    name: "AllSms",
    component: AllSms,
  },
  {
    path: "/Tutoring/ManuallyCreateTutoring",
    name: "ManuallyCreateTutoring",
    component: ManuallyCreateTutoring,
  },
  {
    path: "/TimeSheet/ManageTimeSheet",
    name: "ManageTimeSheet",
    component: ManageTimeSheet,
  },
  {
    path: "/TimeSheet/CreateTimeSheet",
    name: "CreateTimeSheet",
    component: CreateTimeSheet,
  },
  {
    path: "/TimeSheet/CapacityRegistration",
    name: "CapacityRegistration",
    component: CapacityRegistration,
  },
  {
    path: "/AllTutoring",
    name: "AllTutoring",
    component: AllTutoring,
  },
  {
    path: "/ManageuploadProvider",
    name: "ManageuploadProvider",
    component: ManageuploadProvider,
  },
  {
    path: [
      "/Exams/CreateExam/QuizInfo",
      "/Exams/CreateExam/EditQuizInfo",
      "/Exams/CreateExam/Questions",
      "/Exams/CreateExam/QuizDetails",
    ],
    name: "CreateExam",
    component: CreateExam,
  },
  {
    path: [
      "/Exams/EditExam/EditQuizInfo/:id",
      "/Exams/EditExam/Questions/:id",
      "/Exams/EditExam/QuizDetails/:id",
    ],
    name: "EditExam",
    component: EditExam,
  },
  {
    path: "/Exams/ManageExams",
    name: "ManageExams",
    component: ManageExams,
  },
  {
    path: "/Exams/QuestionBank/:id",
    name: "QuestionBank",
    component: ExamQuestionBank,
  },
  { path: "/theme", name: "Theme", component: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", name: "Base", component: Cards, exact: true },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/forms", name: "Forms", component: BasicForms },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", name: "Buttons", component: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  {
    path: "/buttons/button-dropdowns",
    name: "Dropdowns",
    component: ButtonDropdowns,
  },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups,
  },
  {
    path: "/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons,
  },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/brands", name: "Brands", component: Brands },
  {
    path: "/Notifications",
    name: "Notifications",
    component: Alerts,
    exact: true,
  },
  { path: "/Notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/Notifications/badges", name: "Badges", component: Badges },
  { path: "/Notifications/modals", name: "Modals", component: Modals },
  { path: "/Notifications/toaster", name: "Toaster", component: Toaster },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
];

export default routes;
