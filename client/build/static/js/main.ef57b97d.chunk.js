(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{49:function(e,t,n){},50:function(e,t,n){},74:function(e,t){},76:function(e,t){},85:function(e,t,n){"use strict";n.r(t);var c=n(3),a=n.n(c),i=n(40),s=n.n(i),l=(n(49),n(14)),r=(n.p,n(50),n(44)),o=n(28),j=n.n(o),u=n(0),b=r.a.connect("http://localhost:5000");var d=function(){var e=Object(c.useState)(""),t=Object(l.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)(),s=Object(l.a)(i,2),r=s[0],o=s[1],d=Object(c.useState)(!1),O=Object(l.a)(d,2),f=O[0],h=O[1],v=Object(c.useState)(""),x=Object(l.a)(v,2),g=x[0],m=x[1],p=Object(c.useState)(),C=Object(l.a)(p,2),y=C[0],S=C[1],w=Object(c.useState)(!1),k=Object(l.a)(w,2),I=k[0],A=k[1],F=Object(c.useState)(""),N=Object(l.a)(F,2),U=N[0],B=N[1],P=Object(c.useState)(!1),D=Object(l.a)(P,2),E=D[0],R=D[1],T=Object(c.useState)(""),J=Object(l.a)(T,2),L=J[0],M=J[1],Y=Object(c.useRef)(),q=Object(c.useRef)(),z=Object(c.useRef)();return Object(c.useEffect)((function(){navigator.mediaDevices.getUserMedia({audio:!0,video:!0}).then((function(e){o(e),Y.current.srcObject=e})),b.on("me",(function(e){a(e)})),b.on("callUser",(function(e){h(!0),m(e.from),M(e.name),S(e.signal)}))}),[]),b.on("endCallByUser",(function(){R(!0)})),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h1",{style:{textAlign:"center"},children:"AshApp"}),Object(u.jsxs)("div",{className:"container",children:[Object(u.jsxs)("div",{className:"video-container",children:[Object(u.jsx)("div",{className:"video",children:r&&Object(u.jsx)("video",{playsInline:!0,muted:!0,ref:Y,autoPlay:!0,style:{width:"300px"}})}),Object(u.jsx)("div",{className:"video",children:I&&!E?Object(u.jsx)("video",{autoPlay:!0,playsInline:!0,ref:q,style:{width:"300px"}}):null})]}),Object(u.jsx)("textarea",{placeholder:"Id to call",value:U,onChange:function(e){B(e.target.value)}}),Object(u.jsx)("textarea",{placeholder:"Your Id",value:n}),Object(u.jsx)("textarea",{placeholder:"Name",value:L,onChange:function(e){M(e.target.value)}}),Object(u.jsx)("div",{children:I&&!E?Object(u.jsx)("button",{onClick:function(){b.emit("endCallByUser",U),R(!0),z.current.destroy()},children:" End"}):Object(u.jsx)("button",{onClick:function(){!function(e){var t=new j.a({initiator:!0,trickle:!1,stream:r});t.on("signal",(function(t){b.emit("callUser",{signalData:t,userToCall:e,from:n,name:L})})),t.on("stream",(function(e){q.current.srcObject=e})),b.on("callAccepted",(function(e){A(!0),t.signal(e)})),z.current=t}(U)},children:"Call"})}),Object(u.jsx)("div",{children:f&&!I?Object(u.jsxs)("div",{children:[Object(u.jsxs)("h1",{children:[L," is calling....."]}),Object(u.jsx)("button",{onClick:function(){A(!0);var e=new j.a({initiator:!1,trickle:!1,stream:r});e.on("signal",(function(e){b.emit("answerCall",{signal:e,to:g})})),e.on("stream",(function(e){q.current.srcObject=e})),e.signal(y),z.current=e},children:"Answer"})]}):null})]})]})},O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,86)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),i(e),s(e)}))};s.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(d,{})}),document.getElementById("root")),O()}},[[85,1,2]]]);
//# sourceMappingURL=main.ef57b97d.chunk.js.map