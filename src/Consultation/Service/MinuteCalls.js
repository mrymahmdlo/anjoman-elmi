const { APICoreGet, APICorePost } = require("src/Service/APIBase");

const Routes = {
  Activity: "MinuteConsultation/Activity/",
  Consultation: "Provider/Consultation",
  OrderDetail: "Order/Detail/",
  Service: "Service/",
  OrderChange: "Order/Change",
  Filters: "Provider/Filters",
  GetSchedule: "Provider/Schedule/Call?providerId=",
  SendSms: "ConsultationActivity/Resend/",
  GetCalls: "MinuteConsultation/Order",
};

const MinuteCallsService = {
  Activity: async (orderDetailId) =>
    await APICoreGet(Routes.Activity + orderDetailId),
  Consultation: async (body = {}) =>
    await APICorePost(Routes.Consultation, body),
  OrderDetail: async (orderDetailId) =>
    await APICoreGet(Routes.OrderDetail + orderDetailId),
  Service: async (subcategory, providerId) =>
    await APICoreGet(`${Routes.Service}${subcategory}/${providerId}`),
  OrderChange: async (body) => await APICorePost(Routes.OrderChange, body),
  Filters: async () => APICoreGet(Routes.Filters),
  GetSchedule: async (providerId) =>
    await APICoreGet(Routes.GetSchedule + providerId),
  SendSms: async (orderDetailId) =>
    await APICorePost(Routes.SendSms + orderDetailId),
  GetCalls: async (body) => await APICorePost(Routes.GetCalls, body),
};

export default MinuteCallsService;
