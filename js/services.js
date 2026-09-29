import {initialState,products} from './data.js';
import {requireAccess} from './auth.js';
const KEY='foy-demo-v1';
export const totalLogged=s=>s.logs.reduce((n,l)=>n+l.oz,0);
export const supplyDays=s=>Math.max(0,Math.ceil(s.supplyOz/s.baselineDailyOz));
export const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
export const deliveryDate=s=>new Date(s.subscription.next+'T12:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric'});
export function logDrink(s,oz) {
 if(![8,16,24].includes(oz)) throw new Error('Choose 8, 16 or 24 oz.');
 s.logs.push({id:globalThis.crypto.randomUUID(),oz,time:new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})});
 s.supplyOz=Math.max(0,s.supplyOz-oz);
}
export function undoDrink(s) {if(s.logs.length>3){const l=s.logs.pop();s.supplyOz+=l.oz;return true;}return false;}
export function connect(s) {s.connection.connected=true;s.connection.lastAccess=null;s.chatStep=0;}
export function revoke(s) {s.connection.connected=false;s.connection.lastAccess=null;s.chatStep=0;s.chatEstimate=null;}
export function advanceChat(s) {
 if(s.chatStep===0) {requireAccess(s,['supply','hydration','orders']);s.chatEstimate=supplyDays(s);}
 if(s.chatStep===1) requireAccess(s,['orders']);
 if(s.chatStep===2) requireAccess(s,['reorder','orders']);
 s.connection.lastAccess=new Date().toISOString();s.chatStep=Math.min(3,s.chatStep+1);
}
/** The only order-creation method. Muse can prepare, never approve. */
export function approveOrder(s,draft,explicitApproval=false) {
 if(explicitApproval!==true) throw new Error('Customer approval is required.');
 if(draft.source==='muse') requireAccess(s,['reorder','orders']);
 if(!Number.isInteger(draft.quantity)||draft.quantity<1||draft.quantity>6) throw new Error('Choose 1–6 cases.');
 const product=products.find(p=>p.id===draft.productId);if(!product) throw new Error('Product unavailable.');
 const order={id:'DEMO-'+(1043+s.orders.length),productId:product.id,quantity:draft.quantity,total:product.price*draft.quantity,status:'approved-demo',createdAt:new Date().toISOString()};
 s.orders.unshift(order);s.points+=Math.floor(order.total*10);s.chatStep=0;
 // A prepared or approved order is not a delivered case. Supply remains unchanged.
 return order;
}
export function createStore(storage=globalThis.localStorage) {
 let state=initialState();try{const raw=JSON.parse(storage?.getItem(KEY)||'null');if(raw?.version===1 && raw.customer?.id==='demo-ruben' && Array.isArray(raw.logs) && raw.connection?.permissions && raw.subscription && Array.isArray(raw.orders))state=raw;}catch{}
 let persistent=true;
 return {get state(){return state;},get persistent(){return persistent;},save(){try{storage?.setItem(KEY,JSON.stringify(state));}catch{persistent=false;}},reset(){state=initialState();this.save();}};
}
