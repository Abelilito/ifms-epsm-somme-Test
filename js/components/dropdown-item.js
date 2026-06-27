class DropdownItem extends HTMLElement {
    constructor(){
      super();
      this.attachShadow({mode:"open"});
    }

    connectedCallback(){
      const href=this.getAttribute("href") ?? "#";
      this.shadowRoot.innerHTML=`
      <style>
        a{
          display: block;
          padding: 1.3rem 1.8rem;
          color: #5A5A5A;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          transition: .2s;
        }

        a:hover{
          background: #2d2d2d;
          color: white;
        }
      </style>

      <a href="${href}">
        <slot></slot>
      </a>
    `;
  }
}

customElements.define("dropdown-item",DropdownItem);
