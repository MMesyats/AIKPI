(this.webpackJsonpl3=this.webpackJsonpl3||[]).push([[0],{182:function(e,a,t){},204:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),u=t(64),r=t.n(u),c=t(4),o=t(76),b=t(208),s=t(207),h=t(65);t(182);var m=function(){var e=Object(n.useState)(!1),a=Object(c.a)(e,2),t=a[0],u=a[1],r=Object(n.useState)(5),m=Object(c.a)(r,2),i=m[0],p=m[1],E=Object(n.useState)(.2),v=Object(c.a)(E,2),f=v[0],j=v[1],O=Object(n.useState)(80),g=Object(c.a)(O,2),d=g[0],C=g[1],S=Object(n.useState)(.8),M=Object(c.a)(S,2),k=M[0],w=M[1],x=Object(n.useState)(300),A=Object(c.a)(x,2),B=A[0],F=A[1],y=Object(n.useState)(23),L=Object(c.a)(y,2),N=L[0],J=L[1],W=Object(n.useState)(23),G=Object(c.a)(W,2),I=G[0],q=G[1],z=Object(n.useState)(0),D=Object(c.a)(z,2),H=D[0],K=D[1],P=Object(n.useState)(0),Q=Object(c.a)(P,2),R=Q[0],T=Q[1],U=Object(n.useState)(.5),V=Object(c.a)(U,2),X=V[0],Y=V[1],Z=Object(n.useState)(20),$=Object(c.a)(Z,2),_=$[0],ee=$[1],ae=function(e,a,t,n){return{a:e,b1:a,b2:t,nu:n}},te=Object(n.useCallback)((function(){var e=k,a=66e3/d,t=[],n=e<0;n&&(e=-e),t.push(ae(1.7*e,20,20,a/3.2)),t.push(ae(-1.2*e,24,24,a/3)),t.push(ae(3.9*e,6,6,a/2.7)),t.push(ae(-.6*e,10,10,a/2.6)),t.push(ae(n?-k:k,N,I,B));for(var l=[],u=0;u<=a;u++)l.push(u);return{datasets:[{label:"L3",fill:!1,data:l.map((function(e){var a=0;return t.forEach((function(t){var n=t.a,l=t.b1,u=t.b2,r=t.nu,c=e<r?l:u;a+=n*Math.exp(-Math.pow(e-r,2)/Math.pow(c,2))})),a})),borderColor:"rgba(0, 99, 255, 1)"}],labels:l}}),[d,k,B,N,I]),ne=Object(n.useCallback)((function(){var e=k,a=66e3/d,t=[];e<0&&(e=-e),t.push(ae(1.7*e,20,20,a/3.2)),t.push(ae(-1.2*e,24,24,a/3)),t.push(ae(3.9*e,6,6,a/2.7)),t.push(ae(-.6*e,10,10,a/2.6)),t.push(ae(k,N,I,B));for(var n=[],l=[],u=0;u<i;u++){Math.random()>=.5&&(t[4].a=t[4].a*(1+f/t[4].a)),t[4].nu+=t[4].nu+t[4].nu/10;for(var r=function(e){var u=0,r=e%a;t.forEach((function(e){var a=r<e.nu?e.b1:e.b2;u+=e.a*Math.exp(-Math.pow(r-e.nu,2)/(2*Math.pow(a,2)))+(Math.random()-.5)*H})),l.push(u),n.push(e)},c=u*a;c<(u+1)*a;c+=2)r(c);t[4].a=k,t[4].nu=B}return 1===R&&(l=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.9,t=[];return e.forEach((function(n,l){return 0!==l?t.push(t[l-1]+a*(n-t[l-1])):t.push(e[l])})),t}(l,X)),2===R&&(l=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,t=Object(o.a)(e),n=1+a;n<e.length-a;n++)t.push(t[n]+(e[n+a]-e[n-1-a])/(1+2*a));return console.log(t),t}(l,_)),{datasets:[{label:"L3",data:l}],labels:n}}),[k,d,N,I,B,R,X,_,i,f,H]);return l.a.createElement("div",{className:"App"},l.a.createElement("div",null,l.a.createElement("label",null,l.a.createElement("input",{type:"checkbox",value:t,onClick:function(){return u((function(e){return!e}))}}),"\u0441 \u0446\u0438\u043a\u043b\u0430\u043c\u0438",l.a.createElement("br",null)),t&&l.a.createElement(l.a.Fragment,null,l.a.createElement("label",null,"Alt"),l.a.createElement(b.a,{value:f,step:.1,onChange:j}),l.a.createElement("label",null,"Cycles count"),l.a.createElement(b.a,{value:i,min:"1",onChange:p}),l.a.createElement("label",null,"Noise"),l.a.createElement(b.a,{value:H,min:"0",step:.01,onChange:K}),1===R&&l.a.createElement(l.a.Fragment,null,l.a.createElement("label",null,"Alpha"),l.a.createElement(b.a,{value:X,min:"0",max:"1",step:.01,onChange:Y})),2===R&&l.a.createElement(l.a.Fragment,null,l.a.createElement("label",null,"Width"),l.a.createElement(b.a,{value:_,onChange:ee})),l.a.createElement(s.a.Group,{className:"radio",value:R,onChange:function(e){var a=e.target.value;return T(a)}},l.a.createElement(s.a.Button,{value:0},"Without Smoothing"),l.a.createElement(s.a.Button,{value:1},"Exponential"),l.a.createElement(s.a.Button,{value:2},"Moving Average"))),l.a.createElement("label",null,"Fh"),l.a.createElement(b.a,{value:d,onChange:function(e){return C(e)}}),l.a.createElement("label",null,"A(t)"),l.a.createElement(b.a,{value:k,onChange:function(e){return w(e)}}),l.a.createElement("label",null,"nu(t)"),l.a.createElement(b.a,{value:B,onChange:function(e){return F(e)}}),l.a.createElement("label",null,"b1(t)"),l.a.createElement(b.a,{value:N,onChange:function(e){return J(e)}}),l.a.createElement("label",null,"b2(t)"),l.a.createElement(b.a,{value:I,onChange:function(e){return q(e)}})),l.a.createElement(h.Line,{data:t?ne:te,options:{elements:{point:{radius:0}}}}))};r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(m,null)),document.getElementById("root"))},78:function(e,a,t){e.exports=t(204)}},[[78,1,2]]]);
//# sourceMappingURL=main.278e72ee.chunk.js.map