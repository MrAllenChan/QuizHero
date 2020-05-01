
//const httpHost = "http://192.168.0.130:7001";
export const BASE_URL = document.location.origin;
// export const BASE_URL = "https://quiz-hero.herokuapp.com";
// export const BASE_URL = "localhost:7000"


/**
 * 将原来的jsp菜单配置成现在的路由
 * @type {}
 */
export const menuConfigs = {
    "/ews/mechanic/mechanicManager.jsp": "/main/mechanicEditable", // 技师
    "/ews/ro/roManager.jsp": "/main/newro", // 新工单管理
    // "/ews/ro/roManager.jsp": "/main/ro", // 工单管理
    "/report/baseRpt/efficiencyRpt.jsp": "/main/rpt", // 人效统计
    "/ews/supplyChain/managerOrder.jsp": "", // 维护订单
    "/ews/supplyChain/purchaseIn.jsp": "", // 采购入库
     "/ews/ro/u8cSyncFailed.jsp": "/main/u8c",//U8C同步
     "/menuui/deskTop.jsp": "/main/home" // 工作统计
}