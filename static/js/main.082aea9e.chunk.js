(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{108:function(t,e,n){"use strict";n.r(e);var a=n(0),c=n.n(a),i=n(10),r=n.n(i);n(83),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(84);var o,s=n(32),u=n(153),l=n(143),d=n(5),j=c.a.memo((function(t){var e=Object(a.useState)(""),n=Object(s.a)(e,2),c=n[0],i=n[1],r=Object(a.useState)(!1),o=Object(s.a)(r,2),j=o[0],O=o[1],b=function(){var e=c.trim();e?t.addItem(e):O(!0),i("")};return Object(d.jsxs)("div",{children:[Object(d.jsx)(u.a,{value:c,variant:"outlined",onChange:function(t){i(t.currentTarget.value),O(!1)},onKeyPress:function(t){"Enter"===t.key&&b()},label:"Task name",error:j,helperText:j&&"Title is required"}),Object(d.jsx)(l.a,{variant:"contained",onClick:b,color:"primary",children:"+"})]})})),O=c.a.memo((function(t){var e=Object(a.useState)(!1),n=Object(s.a)(e,2),c=n[0],i=n[1],r=Object(a.useState)(t.title),o=Object(s.a)(r,2),l=o[0],j=o[1];return c?Object(d.jsx)(u.a,{variant:"outlined",value:l,onKeyPress:function(e){"Enter"===e.key&&(i(!1),t.changeTitle(l))},onChange:function(t){j(t.currentTarget.value)},onBlur:function(){i(!1),t.changeTitle(l)},autoFocus:!0}):Object(d.jsx)("span",{onDoubleClick:function(){return i(!0)},children:t.title})})),b=n(144),f=n(145),T=n(155),h=n(33),k=n(29),D=n(9),p=n(67),v=n.n(p).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1",withCredentials:!0,headers:{"API-KEY":"b9ca9bb3-c4d5-4d4a-a9b8-46e44fce672e"}}),g=function(){return v.get("/todo-lists")},m=function(t){return v.delete("/todo-lists/".concat(t))},x=function(t){return v.post("/todo-lists/",{title:t})},I=function(t,e){return v.put("/todo-lists/".concat(t),{title:e})},L=function(t){return v.get("/todo-lists/".concat(t,"/tasks"))},E=function(t,e){return v.delete("/todo-lists/".concat(t,"/tasks/").concat(e))},C=function(t,e){return v.post("/todo-lists/".concat(t,"/tasks"),{title:e})},S=function(t,e,n){return v.put("/todo-lists/".concat(t,"/tasks/").concat(n),e)},y={loading:!1,error:null},A=function(t){return{type:"APP/IS-LOADING",loading:t}},w=function(t){return{type:"APP/SET-ERROR",error:t}},N={},G=function(t,e,n){return function(a,c){a(A(!0));var i=c().tasks[t].find((function(t){return t.id===e}));if(i){var r=Object(D.a)({title:i.title,description:i.description,status:i.status,priority:i.priority,startDate:i.startDate,deadline:i.deadline},n);S(t,r,e).then((function(t){a(function(t,e){return{type:"CHANGE-TASK",task:t,changingProperty:e}}(t.data.data.item,n)),a(A(!1))}))}else console.warn("task not found in the state")}};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(o||(o={}));var P=c.a.memo((function(t){var e=t.task,n=t.removeTask,c=t.changeTaskStatus,i=t.changeTaskTitle,r=Object(a.useCallback)((function(){return n(e.id)}),[e.id,n]),s=Object(a.useCallback)((function(t){var n=t.currentTarget.checked;c(e.id,n?o.Completed:o.New)}),[e.id,c]),u=Object(a.useCallback)((function(n){return t.changeTaskTitle(e.id,n)}),[e.id,i]);return Object(d.jsxs)("li",{className:t.task.status===o.Completed?"is-done":"",children:[Object(d.jsx)(T.a,{color:"primary",checked:t.task.status===o.Completed,onChange:s}),Object(d.jsx)(O,{title:t.task.title,changeTitle:u}),Object(d.jsx)(b.a,{onClick:r,children:Object(d.jsx)(f.a,{})})]},t.task.id)})),R=n(19),K=c.a.memo((function(t){var e=Object(R.b)(),n=t.toDoListID,c=t.filter,i=t.title,r=t.tasks,s=t.removeTask,u=t.changeFilter,T=t.addTask,h=t.changeTaskStatus,k=t.removeToDoList,D=t.changeTaskTitle,p=t.changeTitle,v=t.isExisting;Object(a.useEffect)((function(){e(function(t){return function(e){e(A(!0)),L(t).then((function(n){e(function(t,e){return{type:"GET-TASKS",tasks:t,toDoListID:e}}(n.data.items,t)),e(A(!1))}))}}(n))}),[]);var g=Object(a.useCallback)((function(t){return T(t,n)}),[T,n]),m=Object(a.useCallback)((function(){return u("all",n)}),[n]),x=Object(a.useCallback)((function(){return u("active",n)}),[n]),I=Object(a.useCallback)((function(){return u("completed",n)}),[n]),E=Object(a.useCallback)((function(){return k(n)}),[]),C=Object(a.useCallback)((function(t){return p(t,n)}),[p,n]),S=r;"active"===c&&(S=S.filter((function(t){return t.status===o.New}))),"completed"===c&&(S=S.filter((function(t){return t.status===o.Completed})));var y=function(t){return s(t,n)},w=function(t,e){return h(t,e,n)},N=function(e,n){return D(e,n,t.toDoListID)};return Object(d.jsxs)("div",{children:[Object(d.jsxs)("h3",{children:[Object(d.jsx)(O,{title:i,changeTitle:C}),Object(d.jsx)(b.a,{onClick:E,disabled:!v,children:Object(d.jsx)(f.a,{})})]}),Object(d.jsx)(j,{addItem:g}),Object(d.jsx)("ul",{style:{listStyle:"none",paddingLeft:"0"},children:S.map((function(t){return Object(d.jsx)(P,{removeTask:y,task:t,changeTaskStatus:w,changeTaskTitle:N},t.id)}))}),Object(d.jsxs)("div",{children:[Object(d.jsx)(l.a,{onClick:m,variant:"contained",color:"all"===c?"secondary":"primary",size:"small",children:"All"}),Object(d.jsx)(l.a,{onClick:x,variant:"contained",color:"active"===c?"secondary":"primary",size:"small",children:"Active"}),Object(d.jsx)(l.a,{onClick:I,variant:"contained",color:"completed"===c?"secondary":"primary",size:"small",children:"Completed"})]})]})})),H=n(146),F=n(109),V=n(147),M=n(148),z=n(150),B=n(151),U=n(152),J=n(149),W=[],X=n(157),q=n(154);function Y(t){return Object(d.jsx)(q.a,Object(D.a)({elevation:6,variant:"filled"},t))}function $(){var t=Object(R.c)((function(t){return t.app.error})),e=Object(R.b)(),n=function(t,n){"clickaway"!==n&&e(w(null))};return Object(d.jsx)(X.a,{open:null!==t,autoHideDuration:4e3,onClose:n,children:Object(d.jsx)(Y,{onClose:n,severity:"error",children:t})})}var Q=function(){Object(a.useEffect)((function(){c((function(t){g().then((function(e){return t({type:"GET-TODOLISTS",toDoLists:e.data})}))}))}),[]);var t=Object(R.c)((function(t){return t.todolists})),e=Object(R.c)((function(t){return t.app.loading})),n=Object(R.c)((function(t){return t.tasks})),c=Object(R.b)(),i=Object(a.useCallback)((function(t,e){c(function(t,e){return function(n){n(A(!0)),E(t,e).then((function(a){n(function(t,e){return{type:"REMOVE-TASK",taskID:e,todoListID:t}}(t,e)),n(A(!1))}))}}(e,t))}),[c]),r=Object(a.useCallback)((function(t,e){c(function(t,e){return function(n){n(A(!0)),C(t,e).then((function(t){0===t.data.resultCode?n({type:"ADD-TASK",task:t.data.data.item}):n(w(t.data.messages[0])),n(A(!1))}))}}(e,t))}),[c]),o=Object(a.useCallback)((function(t,e,n){c(G(n,t,{status:e}))}),[c]),s=Object(a.useCallback)((function(t,e,n){c(G(n,t,{title:e}))}),[c]),u=Object(a.useCallback)((function(t,e){var n=function(t,e){return{type:"CHANGE-TODOLIST-FILTER",newFilterValue:t,toDoListID:e}}(t,e);c(n)}),[c]),O=Object(a.useCallback)((function(t,e){c(function(t,e){return function(n){n(A(!0)),I(t,e).then((function(a){n(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",toDoListID:t,newTitle:e}}(t,e)),n(A(!1))}))}}(e,t))}),[c]),f=Object(a.useCallback)((function(t){c(function(t){return function(e){e(A(!0)),e(function(t,e){return{type:"CHANGE-EXIST-STATUS",isExisting:!1,toDoListID:e}}(0,t)),m(t).then((function(n){e(function(t){return{type:"REMOVE-TODOLIST",toDoListID:t}}(t)),e(A(!1))}))}}(t))}),[c]),T=Object(a.useCallback)((function(t){c(function(t){return function(e){e(A(!0)),x(t).then((function(t){0===t.data.resultCode?e({type:"ADD-TODOLIST",toDoList:t.data.data.item}):e(w(t.data.messages[0])),e(A(!1))}))}}(t))}),[c]),h=t.map((function(t){return Object(d.jsx)(H.a,{item:!0,children:Object(d.jsx)(F.a,{elevation:5,style:{padding:"20px"},children:Object(d.jsx)(K,{removeToDoList:f,toDoListID:t.id,addTask:r,title:t.title,tasks:n[t.id],removeTask:i,isExisting:t.isExisting,changeFilter:u,changeTaskStatus:o,filter:t.filter,changeTitle:O,changeTaskTitle:s})})},t.id)}));return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)(V.a,{position:"static",children:Object(d.jsxs)(M.a,{children:[Object(d.jsxs)(b.a,{edge:"start",color:"inherit","aria-label":"menu",children:[Object(d.jsx)($,{}),Object(d.jsx)(J.a,{})]}),Object(d.jsx)(z.a,{variant:"h6",children:"News"}),Object(d.jsx)(l.a,{color:"inherit",children:"Login"})]})}),e&&Object(d.jsx)(B.a,{color:"secondary"}),Object(d.jsxs)(U.a,{fixed:!0,style:{padding:"20px"},children:[Object(d.jsxs)(H.a,{container:!0,children:[Object(d.jsx)(j,{addItem:T})," "]}),Object(d.jsx)(H.a,{container:!0,spacing:4,children:h})]})]})},Z=n(46),_=n(68),tt=Object(Z.b)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"GET-TASKS":return Object(D.a)(Object(D.a)({},t),{},Object(k.a)({},e.toDoListID,e.tasks));case"GET-TODOLISTS":var n=Object(D.a)({},t);return e.toDoLists.forEach((function(t){n[t.id]=[]})),n;case"REMOVE-TASK":var a=Object(D.a)({},t);return a[e.todoListID]=t[e.todoListID].filter((function(t){return t.id!==e.taskID})),a;case"ADD-TASK":return Object(D.a)(Object(D.a)({},t),{},Object(k.a)({},e.task.todoListId,[e.task].concat(Object(h.a)(t[e.task.todoListId]))));case"CHANGE-TASK":return Object(D.a)(Object(D.a)({},t),{},Object(k.a)({},e.task.todoListId,t[e.task.todoListId].map((function(t){return t.id===e.task.id?Object(D.a)(Object(D.a)({},t),e.changingProperty):t}))));case"ADD-TODOLIST":return Object(D.a)(Object(D.a)({},t),{},Object(k.a)({},e.toDoList.id,[]));case"REMOVE-TODOLIST":var c=Object(D.a)({},t);return delete c[e.toDoListID],Object(D.a)({},c);default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"GET-TODOLISTS":return e.toDoLists.map((function(t){return Object(D.a)(Object(D.a)({},t),{},{filter:"all",isExisting:!0})}));case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.toDoListID}));case"ADD-TODOLIST":return[].concat(Object(h.a)(t),[Object(D.a)(Object(D.a)({},e.toDoList),{},{filter:"all",isExisting:!0})]);case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.toDoListID?Object(D.a)(Object(D.a)({},t),{},{title:e.newTitle}):t}));case"CHANGE-TODOLIST-FILTER":var n=t.find((function(t){return t.id===e.toDoListID}));return n?(n.filter=e.newFilterValue,Object(h.a)(t)):t;case"CHANGE-EXIST-STATUS":var a=t.find((function(t){return t.id===e.toDoListID}));return a?(a.isExisting=e.isExisting,Object(h.a)(t)):t;default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/IS-LOADING":return Object(D.a)(Object(D.a)({},t),{},{loading:e.loading});case"APP/SET-ERROR":return Object(D.a)(Object(D.a)({},t),{},{error:e.error});default:return t}}}),et=Object(Z.c)(tt,Object(Z.a)(_.a));r.a.render(Object(d.jsx)(R.a,{store:et,children:Object(d.jsx)(Q,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},83:function(t,e,n){},84:function(t,e,n){}},[[108,1,2]]]);
//# sourceMappingURL=main.082aea9e.chunk.js.map