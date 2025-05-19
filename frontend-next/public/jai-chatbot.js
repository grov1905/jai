(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&r(p)}).observe(document,{childList:!0,subtree:!0});function u(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=u(n);fetch(n.href,s)}})();(function(){const t=document.currentScript,e={color:(t==null?void 0:t.getAttribute("data-color"))||"#0066ff",position:(t==null?void 0:t.getAttribute("data-position"))||"bottom-right",style:(t==null?void 0:t.getAttribute("data-style"))||"floating",clientId:(t==null?void 0:t.getAttribute("data-client-id"))||"0531ba25-e2d2-4d94-98f3-8e4d6126a229",title:(t==null?void 0:t.getAttribute("data-title"))||"Asistente Virtual",target:(t==null?void 0:t.getAttribute("data-target"))||null,welcome:(t==null?void 0:t.getAttribute("data-welcome"))||"¡Hola! ¿En qué puedo ayudarte?",autoOpen:(t==null?void 0:t.getAttribute("data-open-on-load"))==="true",websocketUrl:(t==null?void 0:t.getAttribute("data-websocket-url"))||"ws://jaiwebsocket-production.up.railway.app/ws/chat",avatar:(t==null?void 0:t.getAttribute("data-avatar"))||null,typingText:(t==null?void 0:t.getAttribute("data-typing-text"))||"Escribiendo...",closeAfter:parseInt(t==null?void 0:t.getAttribute("data-close-after"))||0};let u=!0,r=null,n=null;const s=localStorage.getItem("jai_session")||`anon_${crypto.randomUUID()}`;localStorage.setItem("jai_session",s);function p(o,i){const d=parseInt(o.replace("#",""),16),l=Math.round(2.55*i),w=(d>>16)-l,j=(d>>8&255)-l,S=(d&255)-l;return`#${(16777216+(w<0?0:w)*65536+(j<0?0:j)*256+(S<0?0:S)).toString(16).slice(1)}`}const b=document.createElement("style");b.textContent=`
    :root { --primary-color: ${e.color}; }
    #jai-chatbot-button {
      position: fixed;
      ${e.position.includes("bottom")?"bottom: 24px;":"top: 24px;"}
      ${e.position.includes("right")?"right: 24px;":"left: 24px;"}
      background-color: var(--primary-color);
      color: white;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      font-size: 24px;
      cursor: pointer;
      z-index: 9999;
      transition: transform 0.2s ease;
    }
    #jai-chatbot-button:hover {
      transform: scale(1.1);
    }
    #jai-chatbot-container {
      position: ${e.style==="embedded"?"relative":"fixed"};
      ${["fixed","floating","slide"].includes(e.style)?`${e.position.includes("bottom")?"bottom: 100px;":"top: 100px;"}
         ${e.position.includes("right")?"right: 24px;":"left: 24px;"}`:""}
      ${e.style==="modal"?"top: 50%; left: 50%; transform: translate(-50%, -50%);":""}
      ${e.style==="fullpage"?"top: 0; left: 0; width: 100vw; height: 100vh;":"width: 360px; max-height: 540px;"}
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      display: ${["fixed","embedded","fullpage"].includes(e.style)?"flex":"none"};
      flex-direction: column;
      overflow: hidden;
      z-index: 9998;
      font-family: 'Segoe UI', sans-serif;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    #jai-chatbot-container.show {
      display: flex;
      opacity: 1;
      ${e.style==="slide"?"transform: translateX(0);":""}
    }
    #jai-chatbot-container.slide-hidden {
      transform: translateX(${e.position.includes("right")?"100%":"-100%"});
    }
    #jai-chatbot-header {
      background-color: var(--primary-color);
      color: white;
      padding: 16px;
      font-size: 16px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #jai-chatbot-close {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      line-height: 1;
    }
    #jai-chatbot-messages {
      padding: 16px;
      overflow-y: auto;
      flex: 1;
      background-color: #f9f9f9;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .message-container {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      max-width: 100%;
      min-width: 120px;
      width: fit-content;
    }
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }
    .bubble {
      max-width: calc(100% - 40px);
      min-width: 60px;
      padding: 10px 14px;
      margin-bottom: 10px;
      border-radius: 10px;
      line-height: 1.4;
      word-break: break-word;
      white-space: normal;
    }
    .user-msg {
      background-color: #e6e6e6;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }
    .bot-msg {
      background-color: #dceeff;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }
    #jai-chatbot-input {
      display: flex;
      border-top: 1px solid #ddd;
    }
    #jai-chatbot-input input {
      flex: 1;
      border: none;
      padding: 12px;
      font-size: 14px;
      outline: none;
    }
    #jai-chatbot-input button {
      background-color: var(--primary-color);
      color: white;
      border: none;
      padding: 12px 16px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    #jai-chatbot-input button:hover {
      background-color: ${p(e.color,10)};
    }
    .typing-indicator {
      display: inline-flex;
      align-items: center;
      padding: 10px 14px;
      background-color: #dceeff;
      border-radius: 10px;
      align-self: flex-start;
      gap: 6px;
    }
    .typing-indicator span {
      height: 8px;
      width: 8px;
      background-color: #666;
      border-radius: 50%;
      display: inline-block;
      animation: typing 1s infinite ease-in-out;
    }
    .typing-indicator span:nth-child(2) {
      animation-delay: 0.2s;
    }
    .typing-indicator span:nth-child(3) {
      animation-delay: 0.4s;
    }
    @keyframes typing {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    .timestamp {
      font-size: 10px;
      color: #666;
      margin-top: 4px;
      text-align: right;
    }
  `,document.head.appendChild(b);const a=document.createElement("div");a.id="jai-chatbot-container",e.style==="slide"&&a.classList.add("slide-hidden"),a.innerHTML=`
    <div id="jai-chatbot-header">
      <div style="display: flex; align-items: center; gap: 8px;">
        ${e.avatar?`<img src="${e.avatar}" class="avatar" alt="Avatar">`:""}
        <span>${e.title}</span>
      </div>
      <button id="jai-chatbot-close">−</button>
    </div>
    <div id="jai-chatbot-messages"></div>
    <div id="jai-chatbot-input">
      <input type="text" id="jai-input" placeholder="Escribe tu mensaje..." autocomplete="off">
      <button id="jai-send-button">Enviar</button>
    </div>
  `;function g(){u&&e.welcome&&(c(e.welcome),u=!1,localStorage.setItem("jai_welcome_shown","true"),e.closeAfter>0&&(n=setTimeout(()=>{f()},e.closeAfter*1e3)))}function c(o,i=!1){const d=a.querySelector("#jai-chatbot-messages");if(!d||!o)return;const l=document.createElement("div");l.className="message-container",l.style.flexDirection=i?"row-reverse":"row",l.style.alignSelf=i?"flex-end":"flex-start",!i&&e.avatar?l.innerHTML=`
        <img src="${e.avatar}" class="avatar" alt="Avatar del bot">
        <div class="bubble bot-msg">
          ${o}
          <div class="timestamp">${new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>
        </div>
      `:l.innerHTML=`
        <div class="bubble ${i?"user-msg":"bot-msg"}">
          ${o}
          <div class="timestamp">${new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>
        </div>
      `,d.appendChild(l),l.scrollIntoView({behavior:"smooth"})}function k(){const o=a.querySelector("#jai-chatbot-messages");if(!o)return;const i=document.createElement("div");i.className="message-container",i.style.alignSelf="flex-start",e.avatar?i.innerHTML=`
        <img src="${e.avatar}" class="avatar" alt="Avatar del bot">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
          ${e.typingText}
        </div>
      `:i.innerHTML=`
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
          ${e.typingText}
        </div>
      `,i.id="jai-typing-indicator",o.appendChild(i),i.scrollIntoView({behavior:"smooth"})}function m(){const o=a.querySelector("#jai-typing-indicator");o&&o.remove()}function h(){const o=a.querySelector("#jai-input");if(!o)return;const i=o.value.trim();if(!i||!r||r.readyState!==1)return;const d={channel:"websocket",external_id:s,business_id:e.clientId,content:i,metadata:{source:"chatbot-widget"}};try{r.send(JSON.stringify(d)),c(i,!0),o.value="",k(),n&&clearTimeout(n),e.closeAfter>0&&(n=setTimeout(()=>{f()},e.closeAfter*1e3))}catch(l){console.error("Error sending message:",l),c("Error al enviar el mensaje. Intenta nuevamente.")}}function $(){try{r&&r.close(),r=new WebSocket(e.websocketUrl),r.onopen=()=>{console.log("WebSocket conectado"),u&&g()},r.onmessage=o=>{try{m();const i=JSON.parse(o.data);i!=null&&i.content&&c(i.content)}catch(i){console.error("Error parsing message",i),c("Lo siento, hubo un error al procesar la respuesta.")}},r.onclose=()=>{console.log("WebSocket cerrado"),m()},r.onerror=o=>{console.error("WebSocket error",o),m(),c("Error de conexión. Intente nuevamente más tarde.")}}catch(o){console.error("Error al inicializar WebSocket",o),c("No se pudo conectar al servicio de chat.")}}function f(){a.classList.contains("show")?(a.classList.remove("show"),e.style==="slide"&&a.classList.add("slide-hidden")):(a.classList.add("show"),e.style==="slide"&&a.classList.remove("slide-hidden"),$(),g(),setTimeout(()=>{const i=a.querySelector("#jai-input");i&&i.focus()},300))}if(e.style==="embedded"&&e.target){const o=document.querySelector(e.target);o?o.appendChild(a):(console.error("Elemento target no encontrado:",e.target),document.body.appendChild(a))}else document.body.appendChild(a);if(!["fixed","embedded","fullpage"].includes(e.style)){const o=document.createElement("div");o.id="jai-chatbot-button",o.innerHTML="💬",o.onclick=f,document.body.appendChild(o)}const x=a.querySelector("#jai-send-button"),y=a.querySelector("#jai-input"),v=a.querySelector("#jai-chatbot-close");x&&(x.onclick=h),y&&y.addEventListener("keydown",o=>{o.key==="Enter"&&!o.shiftKey&&(o.preventDefault(),h())}),v&&(v.onclick=f),localStorage.getItem("jai_welcome_shown")==="true"&&(u=!1),(["fixed","embedded","fullpage"].includes(e.style)||e.autoOpen)&&showChatbot(),window.addEventListener("beforeunload",()=>{r&&r.close()})})();
