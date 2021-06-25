(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{103:function(t,e,n){},104:function(t,e,n){},129:function(t,e,n){"use strict";n.r(e);var a=n(0),c=n.n(a),i=n(10),r=n.n(i);n(103),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(104);var o=n(173),s=n(174),u=n(175),l=n(165),d=n(131),j=n(167),b=n(177),O=n(176),f=n(19),h=n(8),p=n(182),m=n(179),g=n(79),T=n.n(g).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1",withCredentials:!0,headers:{"API-KEY":"b9ca9bb3-c4d5-4d4a-a9b8-46e44fce672e"}}),x=function(){return T.get("/todo-lists")},v=function(t){return T.delete("/todo-lists/".concat(t))},k=function(t){return T.post("/todo-lists/",{title:t})},D=function(t,e){return T.put("/todo-lists/".concat(t),{title:e})},I=function(t){return T.get("/todo-lists/".concat(t,"/tasks"))},L=function(t,e){return T.delete("/todo-lists/".concat(t,"/tasks/").concat(e))},E=function(t,e){return T.post("/todo-lists/".concat(t,"/tasks"),{title:e})},S=function(t,e,n){return T.put("/todo-lists/".concat(t,"/tasks/").concat(n),e)},y=function(t){return T.post("/auth/login",t)},C=function(){return T.delete("/auth/login")},A=function(){return T.get("/auth/me")},w={isLoggedIn:!1},P=function(t){return{type:"login/SET-IS-LOGGED-IN",value:t}},N={loading:!1,error:null,isInitialized:!1},G=function(t){return{type:"APP/IS-LOADING",loading:t}},R=function(t){return{type:"APP/SET-ERROR",error:t}},F=n(3);function K(t){return Object(F.jsx)(m.a,Object(h.a)({elevation:6,variant:"filled"},t))}function z(){var t=Object(f.c)((function(t){return t.app.error})),e=Object(f.b)(),n=function(t,n){"clickaway"!==n&&e(R(null))};return Object(F.jsx)(p.a,{open:null!==t,autoHideDuration:4e3,onClose:n,children:Object(F.jsx)(K,{onClose:n,severity:"error",children:t})})}var H,M=n(44),V=n(178),Z=c.a.memo((function(t){var e=Object(a.useState)(""),n=Object(M.a)(e,2),c=n[0],i=n[1],r=Object(a.useState)(!1),o=Object(M.a)(r,2),s=o[0],u=o[1],l=function(){var e=c.trim();e?t.addItem(e):u(!0),i("")};return Object(F.jsxs)("div",{children:[Object(F.jsx)(V.a,{value:c,variant:"outlined",onChange:function(t){i(t.currentTarget.value),u(!1)},onKeyPress:function(t){"Enter"===t.key&&l()},label:"Task name",error:s,helperText:s&&"Title is required"}),Object(F.jsx)(j.a,{variant:"contained",onClick:l,color:"primary",children:"+"})]})})),U=c.a.memo((function(t){var e=Object(a.useState)(!1),n=Object(M.a)(e,2),c=n[0],i=n[1],r=Object(a.useState)(t.title),o=Object(M.a)(r,2),s=o[0],u=o[1];return c?Object(F.jsx)(V.a,{variant:"outlined",value:s,onKeyPress:function(e){"Enter"===e.key&&(i(!1),t.changeTitle(s))},onChange:function(t){u(t.currentTarget.value)},onBlur:function(){i(!1),t.changeTitle(s)},autoFocus:!0}):Object(F.jsx)("span",{onDoubleClick:function(){return i(!0)},children:t.title})})),q=n(168),B=n(180),J=n(43),W=n(40),X={},$=function(t,e,n){return function(a,c){a(G(!0));var i=c().tasks[t].find((function(t){return t.id===e}));if(i){var r=Object(h.a)({title:i.title,description:i.description,status:i.status,priority:i.priority,startDate:i.startDate,deadline:i.deadline},n);S(t,r,e).then((function(t){a(function(t,e){return{type:"CHANGE-TASK",task:t,changingProperty:e}}(t.data.data.item,n)),a(G(!1))}))}else console.warn("task not found in the state")}};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(H||(H={}));var _=c.a.memo((function(t){var e=t.task,n=t.removeTask,c=t.changeTaskStatus,i=t.changeTaskTitle,r=Object(a.useCallback)((function(){return n(e.id)}),[e.id,n]),o=Object(a.useCallback)((function(t){var n=t.currentTarget.checked;c(e.id,n?H.Completed:H.New)}),[e.id,c]),s=Object(a.useCallback)((function(t){return i(e.id,t)}),[e.id,i]);return Object(F.jsxs)("li",{className:t.task.status===H.Completed?"is-done":"",children:[Object(F.jsx)(B.a,{color:"primary",checked:t.task.status===H.Completed,onChange:o}),Object(F.jsx)(U,{title:t.task.title,changeTitle:s}),Object(F.jsx)(l.a,{onClick:r,children:Object(F.jsx)(q.a,{})})]},t.task.id)})),Y=c.a.memo((function(t){var e=Object(f.b)(),n=t.toDoListID,c=t.filter,i=t.title,r=t.tasks,o=t.removeTask,s=t.changeFilter,u=t.addTask,d=t.changeTaskStatus,b=t.removeToDoList,O=t.changeTaskTitle,h=t.changeTitle,p=t.isExisting;Object(a.useEffect)((function(){e(function(t){return function(e){e(G(!0)),I(t).then((function(n){e(function(t,e){return{type:"GET-TASKS",tasks:t,toDoListID:e}}(n.data.items,t)),e(G(!1))}))}}(n))}),[]);var m=Object(a.useCallback)((function(t){return u(t,n)}),[u,n]),g=Object(a.useCallback)((function(){return s("all",n)}),[n]),T=Object(a.useCallback)((function(){return s("active",n)}),[n]),x=Object(a.useCallback)((function(){return s("completed",n)}),[n]),v=Object(a.useCallback)((function(){return b(n)}),[]),k=Object(a.useCallback)((function(t){return h(t,n)}),[h,n]),D=r;"active"===c&&(D=D.filter((function(t){return t.status===H.New}))),"completed"===c&&(D=D.filter((function(t){return t.status===H.Completed})));var L=function(t){return o(t,n)},E=function(t,e){return d(t,e,n)},S=function(e,n){return O(e,n,t.toDoListID)};return Object(F.jsxs)("div",{children:[Object(F.jsxs)("h3",{children:[Object(F.jsx)(U,{title:i,changeTitle:k}),Object(F.jsx)(l.a,{onClick:v,disabled:!p,children:Object(F.jsx)(q.a,{})})]}),Object(F.jsx)(Z,{addItem:m}),Object(F.jsx)("ul",{style:{listStyle:"none",paddingLeft:"0"},children:D.map((function(t){return Object(F.jsx)(_,{removeTask:L,task:t,changeTaskStatus:E,changeTaskTitle:S},t.id)}))}),Object(F.jsxs)("div",{children:[Object(F.jsx)(j.a,{onClick:g,variant:"contained",color:"all"===c?"secondary":"primary",size:"small",children:"All"}),Object(F.jsx)(j.a,{onClick:T,variant:"contained",color:"active"===c?"secondary":"primary",size:"small",children:"Active"}),Object(F.jsx)(j.a,{onClick:x,variant:"contained",color:"completed"===c?"secondary":"primary",size:"small",children:"Completed"})]})]})})),Q=n(169),tt=n(130),et=n(170),nt=[],at=n(15);function ct(){var t=Object(f.c)((function(t){return t.auth.isLoggedIn}));Object(a.useEffect)((function(){t&&c((function(t){x().then((function(e){return t({type:"GET-TODOLISTS",toDoLists:e.data})}))}))}),[]);var e=Object(f.c)((function(t){return t.todolists})),n=Object(f.c)((function(t){return t.tasks})),c=Object(f.b)(),i=Object(a.useCallback)((function(t,e){c(function(t,e){return function(n){n(G(!0)),L(t,e).then((function(a){n(function(t,e){return{type:"REMOVE-TASK",taskID:e,todoListID:t}}(t,e)),n(G(!1))}))}}(e,t))}),[c]),r=Object(a.useCallback)((function(t,e){c(function(t,e){return function(n){n(G(!0)),E(t,e).then((function(t){0===t.data.resultCode?n({type:"ADD-TASK",task:t.data.data.item}):n(R(t.data.messages[0])),n(G(!1))}))}}(e,t))}),[c]),o=Object(a.useCallback)((function(t,e,n){c($(n,t,{status:e}))}),[c]),s=Object(a.useCallback)((function(t,e,n){c($(n,t,{title:e}))}),[c]),u=Object(a.useCallback)((function(t,e){var n=function(t,e){return{type:"CHANGE-TODOLIST-FILTER",newFilterValue:t,toDoListID:e}}(t,e);c(n)}),[c]),l=Object(a.useCallback)((function(t,e){c(function(t,e){return function(n){n(G(!0)),D(t,e).then((function(a){n(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",toDoListID:t,newTitle:e}}(t,e)),n(G(!1))}))}}(e,t))}),[c]),d=Object(a.useCallback)((function(t){c(function(t){return function(e){e(G(!0)),e(function(t,e){return{type:"CHANGE-EXIST-STATUS",isExisting:!1,toDoListID:e}}(0,t)),v(t).then((function(n){e(function(t){return{type:"REMOVE-TODOLIST",toDoListID:t}}(t)),e(G(!1))}))}}(t))}),[c]),j=Object(a.useCallback)((function(t){c(function(t){return function(e){e(G(!0)),k(t).then((function(t){0===t.data.resultCode?e({type:"ADD-TODOLIST",toDoList:t.data.data.item}):e(R(t.data.messages[0])),e(G(!1))}))}}(t))}),[c]),b=e.map((function(t){return Object(F.jsx)(Q.a,{item:!0,children:Object(F.jsx)(tt.a,{elevation:5,style:{padding:"20px"},children:Object(F.jsx)(Y,{removeToDoList:d,toDoListID:t.id,addTask:r,title:t.title,tasks:n[t.id],removeTask:i,isExisting:t.isExisting,changeFilter:u,changeTaskStatus:o,filter:t.filter,changeTitle:l,changeTaskTitle:s})})},t.id)}));return t?Object(F.jsxs)(et.a,{fixed:!0,style:{padding:"20px"},children:[Object(F.jsxs)(Q.a,{container:!0,children:[Object(F.jsx)(Z,{addItem:j})," "]}),Object(F.jsx)(Q.a,{container:!0,spacing:4,children:b})]}):Object(F.jsx)(at.a,{to:"/login"})}var it=n(183),rt=n(166),ot=n(171),st=n(172),ut=n(87),lt=function(){var t=Object(f.b)(),e=Object(f.c)((function(t){return t.auth.isLoggedIn})),n=Object(ut.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<=2&&(e.password="Must be 3 characters or less"):e.password="Required",e},onSubmit:function(e){var a;t((a=e,function(t){t(G(!0)),y(a).then((function(e){0===e.data.resultCode?t(P(!0)):t(R(e.data.messages[0]))})),t(G(!1))})),n.resetForm()}});return e?Object(F.jsx)(at.a,{to:"/"}):Object(F.jsx)(Q.a,{container:!0,justify:"center",children:Object(F.jsx)(Q.a,{item:!0,xs:4,children:Object(F.jsxs)(it.a,{children:[Object(F.jsxs)(rt.a,{children:[Object(F.jsxs)("p",{children:["To log in get registered",Object(F.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:" here"})]}),Object(F.jsx)("p",{children:"or use common test account credentials:"}),Object(F.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(F.jsx)("p",{children:"Password: free"})]}),Object(F.jsx)("form",{onSubmit:n.handleSubmit,children:Object(F.jsxs)(ot.a,{children:[Object(F.jsx)(V.a,Object(h.a)({label:"Email",margin:"normal"},n.getFieldProps("email"))),n.touched.email&&n.errors.email&&Object(F.jsx)("div",{style:{color:"red"},children:n.errors.email}),Object(F.jsx)(V.a,Object(h.a)({type:"password",label:"Password",margin:"normal"},n.getFieldProps("password"))),n.touched.password&&n.errors.password&&Object(F.jsx)("div",{style:{color:"red"},children:n.errors.password}),Object(F.jsx)(st.a,{label:"Remember me",control:Object(F.jsx)(B.a,Object(h.a)({checked:n.values.rememberMe},n.getFieldProps("email")))}),Object(F.jsx)(j.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})})]})})})};var dt=function(){var t=Object(f.c)((function(t){return t.app.loading})),e=Object(f.c)((function(t){return t.app.isInitialized})),n=Object(f.c)((function(t){return t.auth.isLoggedIn})),c=Object(f.b)();return Object(a.useEffect)((function(){c((function(t){A().then((function(e){0===e.data.resultCode&&t(P(!0))})).finally((function(){t({type:"APP/SET-INITIALIZED",isInitialized:!0})}))}))}),[]),e?Object(F.jsxs)("div",{className:"App",children:[Object(F.jsx)(s.a,{position:"static",children:Object(F.jsxs)(u.a,{children:[Object(F.jsxs)(l.a,{edge:"start",color:"inherit","aria-label":"menu",children:[Object(F.jsx)(z,{}),Object(F.jsx)(O.a,{})]}),Object(F.jsx)(d.a,{variant:"h6",children:"News"}),n&&Object(F.jsx)(j.a,{onClick:function(){c((function(t){t(G(!0)),C().then((function(e){0===e.data.resultCode?t(P(!1)):t(R(e.data.messages[0]))})),t(G(!1))}))},color:"inherit",children:"Logout"})]})}),t&&Object(F.jsx)(b.a,{color:"secondary"}),Object(F.jsxs)(at.d,{children:[Object(F.jsx)(at.b,{exact:!0,path:"/",render:function(){return Object(F.jsx)(ct,{})}}),Object(F.jsx)(at.b,{path:"/ToDoList",render:function(){return Object(F.jsx)(ct,{})}}),Object(F.jsx)(at.b,{path:"/login",render:function(){return Object(F.jsx)(lt,{})}}),Object(F.jsx)(at.b,{path:"/404",render:function(){return Object(F.jsx)("h1",{style:{textAlign:"center",fontSize:"80px"},children:" 404: PAGE IS NOT FOUND"})}}),Object(F.jsx)(at.a,{from:"*",to:"/404"})]})]}):Object(F.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(F.jsx)(o.a,{})})},jt=n(59),bt=n(86),Ot=Object(jt.b)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"GET-TASKS":return Object(h.a)(Object(h.a)({},t),{},Object(W.a)({},e.toDoListID,e.tasks));case"GET-TODOLISTS":var n=Object(h.a)({},t);return e.toDoLists.forEach((function(t){n[t.id]=[]})),n;case"REMOVE-TASK":var a=Object(h.a)({},t);return a[e.todoListID]=t[e.todoListID].filter((function(t){return t.id!==e.taskID})),a;case"ADD-TASK":return Object(h.a)(Object(h.a)({},t),{},Object(W.a)({},e.task.todoListId,[e.task].concat(Object(J.a)(t[e.task.todoListId]))));case"CHANGE-TASK":return Object(h.a)(Object(h.a)({},t),{},Object(W.a)({},e.task.todoListId,t[e.task.todoListId].map((function(t){return t.id===e.task.id?Object(h.a)(Object(h.a)({},t),e.changingProperty):t}))));case"ADD-TODOLIST":return Object(h.a)(Object(h.a)({},t),{},Object(W.a)({},e.toDoList.id,[]));case"REMOVE-TODOLIST":var c=Object(h.a)({},t);return delete c[e.toDoListID],Object(h.a)({},c);default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:nt,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"GET-TODOLISTS":return e.toDoLists.map((function(t){return Object(h.a)(Object(h.a)({},t),{},{filter:"all",isExisting:!0})}));case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.toDoListID}));case"ADD-TODOLIST":return[].concat(Object(J.a)(t),[Object(h.a)(Object(h.a)({},e.toDoList),{},{filter:"all",isExisting:!0})]);case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.toDoListID?Object(h.a)(Object(h.a)({},t),{},{title:e.newTitle}):t}));case"CHANGE-TODOLIST-FILTER":var n=t.find((function(t){return t.id===e.toDoListID}));return n?(n.filter=e.newFilterValue,Object(J.a)(t)):t;case"CHANGE-EXIST-STATUS":var a=t.find((function(t){return t.id===e.toDoListID}));return a?(a.isExisting=e.isExisting,Object(J.a)(t)):t;default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/IS-LOADING":return Object(h.a)(Object(h.a)({},t),{},{loading:e.loading});case"APP/SET-ERROR":return Object(h.a)(Object(h.a)({},t),{},{error:e.error});case"APP/SET-INITIALIZED":return Object(h.a)(Object(h.a)({},t),{},{isInitialized:e.isInitialized});default:return t}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"login/SET-IS-LOGGED-IN":return Object(h.a)(Object(h.a)({},t),{},{isLoggedIn:e.value});default:return t}}}),ft=Object(jt.c)(Ot,Object(jt.a)(bt.a)),ht=n(46);r.a.render(Object(F.jsx)(f.a,{store:ft,children:Object(F.jsx)(ht.a,{children:Object(F.jsx)(dt,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[129,1,2]]]);
//# sourceMappingURL=main.bfaa9bdb.chunk.js.map