class DropdownItem extends HTMLElement {
    constructor(){
      super();
      this.attachShadow({mode:"open"});
    }

    connectedCallback(){
      const href= this.getAttribute("href") ?? "#";
      const classe = this.getAttribute("classe") || " ";

      this.shadowRoot.innerHTML=`
      <style>
        a {
          display: block;
          padding: 1rem;
          color: #5A5A5A;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          transition: .2s;
          border-bottom: 1px solid #D6D6D6;
        }

        a:hover {
          background: #2d2d2d;
          color: white;
        }

        .border-t-grey {
          border-top: 1px solid #D6D6D6;
        }
      </style>

      <a href="${href}" class="${classe}">
        <slot></slot>
      </a>
    `;
  }
}

customElements.define("dropdown-item",DropdownItem);
