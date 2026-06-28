class BtnDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const label = this.getAttribute("label") || "Menu";
    
    this.shadowRoot.innerHTML = `
      <style>
        .button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 1.3rem 1.8rem;
          cursor: pointer;
          color: #222;
          font-size: 1rem;
          font-weight: 600;
          background: #fff;
          transition: .25s;
          box-sizing: border-box;
        }

        .button::after {
          content: "";
          width: 7px;
          height: 7px;
          border-right: 2px solid currentColor;
          border-bottom: 2px solid currentColor;
          transform: rotate(45deg) translateY(-1px);
          transition: transform .25s ease;
        }

        .button.open::after {
          transform: rotate(226deg);
        }

        /* ---------- Desktop ---------- */
        @media (min-width:48em) {
          .dropdown {
            position: relative;
          }
            
          .submenu {
            position: absolute;
            top: calc(100% + 12px);
            right: 0;
            width: 250px;
            padding: 0;
            margin: 0;
            list-style: none;
            background: white;
            overflow: visible;
            box-shadow: 0 12px 35px rgba(0,0,0,.25);
            opacity: 0;
            visibility: hidden;
            transform: translateY(8px);
            transition: .25s;
            z-index: 9999;
          }

          .submenu.open,
          .dropdown:hover .submenu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }

          .dropdown:hover .button::after {
            transform: rotate(226deg);
          }
        }

        /* ---------- Mobile ---------- */
        @media (max-width:47.99em) {
          .submenu{
            position: static;
            width: 100%;
            margin: 0;
            padding: 0;
            list-style: none;
            background:#fff;
            max-height: 0;
            overflow: hidden;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            border-radius: 0;
            transition: max-height .3s ease;
          }

          .submenu.open {
            max-height: 2000px;
          }
        }
        
        @media (min-width: 769px) {
          .button {
            display: inline-flex;
            width: auto;
            justify-content: flex-start;
            gap: .5rem;
          }
        }

        @media (max-width: 768px) {
          .button {
            display: flex;
            width: 100%;
            justify-content: space-between;
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

    document.addEventListener("click", (e) => {
      if (!e.composedPath().includes(this)) {
        submenu.classList.remove("open");
        button.classList.remove("open");
      }
    });
  }
}

customElements.define("btn-dropdown", BtnDropdown);
