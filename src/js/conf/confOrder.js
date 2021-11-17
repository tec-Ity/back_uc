const statusName = {
  placing: "客户正在下单",
  responding: "等待商家接单",
  preparing: "备货中",
  inProgress: "配送中",
  completed: "已完成",
  canceled: "已取消",
};

const statusCode = {
  100: "placing",
  70: "canceled",
  200: "responding",
  400: "preparing",
  700: "inProgress",
  800: "completed",
  10: "canceled",
  60: "canceled",
};

export { statusName, statusCode };
