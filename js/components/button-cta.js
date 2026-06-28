class Button extends HTMLElement {
    constructor(){
      super();
      this.attachShadow({mode:"open"});
    }

    connectedCallback(){
      const href= this.getAttribute("href") ?? "#";
      const variant = this.getAttribute("variant") || " ";
      const text = this.getAttribute("text") || " ";

      this.shadowRoot.innerHTML=`
      <style>
        a {
          text-decoration: none;
          font-size: 12px;
          font-family: 'Montserrat-bold', sans-serif;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 14px 20px;
          border: none;
          border-radius: 8px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
          transition: all .25s ease;
        }
        
       .btn-primary {
          background: linear-gradient(180deg, #0aa0a5 0%, #008f95 100%);
          color: #fff;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            0 6px 12px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .btn-primary:active {
          transform: translateY(0);
        }
      </style>

      <a href="${href}" class="${variant}">
        ${text}
      </a>
    `;
  }
}

customElements.define("button-cta",Button);
