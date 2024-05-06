import{P as i,j as e,r as p}from"./index-v5NtSohj.js";m.propTypes={title:i.string.isRequired,genre:i.string.isRequired,gameDescription:i.string.isRequired,mainPlatform:i.string.isRequired,multiplayerSupport:i.number.isRequired,onlineFeatures:i.number.isRequired};u.propTypes={mainPlatform:i.string.isRequired,multiplayerSupport:i.number.isRequired,onlineFeatures:i.number.isRequired};function u({mainPlatform:r,multiplayerSupport:t,onlineFeatures:s}){return e.jsxs("table",{style:{margin:"auto",textAlign:"center",paddingTop:"10px"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{fontSize:"12px"},children:"Platform"}),e.jsx("th",{style:{paddingLeft:"35px",paddingRight:"35px",fontSize:"12px"},children:"Multiplayer"}),e.jsx("th",{style:{fontSize:"12px"},children:"Online"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{style:{fontSize:"12px"},children:r}),e.jsx("td",{style:{fontSize:"12px"},children:t?"Yes":"No"}),e.jsx("td",{style:{fontSize:"12px"},children:s?"Yes":"No"})]})})]})}function m({gameNum:r,title:t,genre:s,gameDescription:l,mainPlatform:a,multiplayerSupport:o,onlineFeatures:d,openModal:n}){return e.jsx("div",{children:e.jsxs("div",{className:"gameCardContainer",onClick:()=>n(r),children:[e.jsxs("div",{className:"cardHeader",children:[e.jsx("h2",{children:t}),e.jsx("h4",{children:s})]}),e.jsx(u,{mainPlatform:a,multiplayerSupport:o,onlineFeatures:d}),e.jsx("p",{className:"gameDescription",style:{paddingLeft:"12px"},children:l})]})})}x.propTypes={isOpen:i.bool.isRequired,onClose:i.func.isRequired,game:i.object.isRequired};function x({isOpen:r,onClose:t,game:s}){return r?e.jsx("div",{className:"modal",children:e.jsxs("div",{className:"modal-content",children:[e.jsx("button",{onClick:t,className:"modal-Button",children:"X"}),e.jsx("br",{}),e.jsx("h1",{className:"titleWithLine",children:s.title}),e.jsxs("h2",{children:[" Main genre: ",e.jsx("p",{className:"normalText",children:s.genre})]}),e.jsxs("h3",{children:[" Main Platform: ",e.jsx("p",{className:"normalText",children:s.main_platform})]}),e.jsx("h4",{className:"styledText",children:s.multiplayer_support?"You can play this game with friends locally":"You can only play on singleplayer locally"}),e.jsx("h4",{className:"styledText",children:s.online_features?"This game has online features including multiplayer":"The game does not have online features"}),e.jsx("h4",{children:"Description:"}),e.jsx("p",{children:s.game_description})]})}):null}h.propTypes={games:i.array.isRequired};function h({games:r}){const[t,s]=p.useState(!1),[l,a]=p.useState(),o=n=>{s(!0),a(n)},d=()=>{s(!1)};return e.jsxs("div",{className:"gamesContainer",children:[r.map((n,c)=>e.jsx("div",{children:e.jsx(m,{gameNum:c,title:n.title,genre:n.genre,gameDescription:n.game_description,mainPlatform:n.main_platform,multiplayerSupport:n.multiplayer_support,onlineFeatures:n.online_features,openModal:o},c)},c)),t?e.jsx(x,{isOpen:t,onClose:d,game:r[l]}):e.jsx(e.Fragment,{})]})}export{h as default};
