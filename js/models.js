/** Domain contracts shared by the UI and replaceable service adapters. */
/** @typedef {'supply'|'hydration'|'orders'|'locations'|'promotions'|'reminders'|'reorder'} Permission */
/** @typedef {{id:string,name:string,format:string,price:number,image:string,ounces:number,url:string}} Product */
/** @typedef {{provider:string,connected:boolean,permissions:Record<Permission,boolean>,lastAccess:string|null}} Connection */
/** @typedef {{id:string,productId:string,quantity:number,total:number,status:'approved-demo',createdAt:string}} Order */
export const SCHEMA_VERSION = 1;
export const PERMISSIONS = [
  ['supply','Check my estimated FOY supply','An estimate from deliveries and logged FOY water.'],
  ['hydration','View my hydration log','Amounts you choose to log and your personal goal.'],
  ['orders','View my FOY orders','Your previous products and delivery details.'],
  ['locations','Find FOY near me','Your selected area. No background location tracking.'],
  ['promotions','Tell me about FOY promotions','Offers and product updates.'],
  ['reminders','Manage drink reminders','Optional · adjust your reminder preferences.'],
  ['reorder','Help prepare a reorder','Optional · prepare a draft for you to approve.']
];
