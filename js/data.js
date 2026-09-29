import { SCHEMA_VERSION } from './models.js';
export const products = [
 {id:'500ml',name:'The everyday essential',format:'24 Bottles Box · 500 mL',price:20,image:'assets/500ml.png',ounces:405.77,url:'https://foysprings.com/products/24-bottles-box-500ml'},
 {id:'1liter',name:'A little more FOY',format:'12 Bottles Box · 1 Liter',price:20,image:'assets/1liter.png',ounces:405.77,url:'https://foysprings.com/products/12-bottles-box-1-liter'},
 {id:'gallon',name:'Good things, by the gallon',format:'4 Bottles Box · 1 Gallon',price:16,image:'assets/gallon.png',ounces:512,url:'https://foysprings.com/products/1-gallon'}
];
export const locations = [
 {id:1,name:'Kern Place · sample store',distance:'1.2 mi',area:'University Ave area',x:34,y:27},
 {id:2,name:'Downtown · sample store',distance:'2.4 mi',area:'San Jacinto Plaza area',x:56,y:58},
 {id:3,name:'Westside · sample store',distance:'4.8 mi',area:'Mesa Street area',x:76,y:30}
];
export function initialState() {return {
 version:SCHEMA_VERSION,customer:{id:'demo-ruben',name:'Ruben',fullName:'Ruben Diaz De Leon',address:'123 Demo Lane, Apt 4B',city:'El Paso, TX 79901'},
 goal:80,logs:[{id:'seed-1',oz:16,time:'8:00 AM'},{id:'seed-2',oz:16,time:'10:30 AM'},{id:'seed-3',oz:16,time:'12:15 PM'}],
 supplyOz:240,baselineDailyOz:80,history:[64,80,72,88,80,80],streak:7,points:1250,reward:null,
 subscription:{quantity:2,frequency:4,status:'active',next:'2026-10-15',skipped:false},reminders:false,
 connection:{provider:'muse',connected:false,permissions:{supply:true,hydration:true,orders:true,locations:true,promotions:true,reminders:false,reorder:false},lastAccess:null},
 orders:[],chatStep:0,chatEstimate:null,zip:'79901',location:1
};}
