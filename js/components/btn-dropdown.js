class BtnDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const label = this.getAttribute("label") || "Menu";
    
    this.shadowRoot.innerHTML = `
      <style>
        .dropdown{
          position: relative;
        }

        .button{
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          color: #222;
          font-size: 1rem;
          font-weight: 00;
          white-space: owrap;
        }

        .button::after{
          content: "⌄";
          font-size: .75rem;
          transition: .25s;
        }

        .submenu{
          position: absolute;
          top: calc(100% + 12px);
          margin: 0 0 0 1rem;
          width: 250px;
          padding: 0;
          list-style: none;
          background: #F5F5F5;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(0,0,0,.25);
          opacity: 0;
          visibility: hidden;
          transform: translateY(8px);
          transition:
            opacity .25s,
            transform .25s,
            visibility .25s;
          z-index:9999;
          @media (min-width: 48em) {
            right: 0;
          }
        }

        .button.open::after {
          transform: rotate(180deg);
        }

        .submenu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .submenu li{
          border-bottom: 1px solid rgba(255,255,255,.12);
        }

        .submenu li:last-child{
          border-bottom:none;
        }

        .submenu a{
          display: block;
          padding: 1.4rem 1.8rem;
          color: white;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          transition: .2s;
        }

        .submenu a:hover{
          background: #2d2d2d;
        }

        @media (min-width: 48em) {
          .dropdown:hover .submenu{
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
            
          .dropdown:hover .button::after{
            transform: rotate(180deg);
          }
        }
      </style>

      <div class="dropdown">
        <div class="button">
          ${label}
        </div>

        <ul class="submenu">
          <slot></slot>
        </ul>
      </div>
    `;

    const button = this.shadowRoot.querySelector(".button");
    const submenu = this.shadowRoot.querySelector(".submenu");

    button.addEventListener("click", () => {
      submenu.classList.toggle("open");
      button.classList.toggle("open");
    });
  }
}

customElements.define("btn-dropdown", BtnDropdown);
