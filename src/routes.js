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
  import("./Subscriptions/ManageSubscriptions/ManageSubscriptions")
);
const EditSubscriptions = React.lazy(() =>
  import("./Subscriptions/EditSubscriptions/EditSubscriptions")
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
    path: "/Subscriptions/ManageSubscriptions",
    name: "ManageSubscriptions",
    component: ManageSubscriptions,
  },
  {
    path: "/Subscriptions/EditSubscriptions/:id",
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
];

export default routes;
