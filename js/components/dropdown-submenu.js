class DropdownSubmenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const label = this.getAttribute("label") || "Sous-menu";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .item{
          position: relative;
        }

        .button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.3rem 1.8rem;
          background: white;
          color: #5A5A5A;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: .25s;
          border-bottom: 1px solid #D6D6D6;
        }

        .button:hover{
          background: #2d2d2d;
          color: white;
        }

        .button::after{
          content: "⌄";
          font-size: .75rem;
          transition: transform .25s;
        }

        .button.open::after{
          transform: rotate(180deg);
        }

        .submenu{
          list-style: none;
          margin: 0;
          padding: 0;
        }

        /* ---------------- Desktop ---------------- */
        @media (min-width:48em) {
          .submenu {
            position: absolute;
            top: 0;
            left: 100%;
            right: auto;
            min-width: 250px;
            background: white;
            overflow: visible;
            box-shadow: 0 12px 35px rgba(0,0,0,.25);
            opacity: 0;
            visibility: hidden;
            transform: translateX(10px);
            transition:
              opacity .25s,
              transform .25s,
              visibility .25s;
            z-index: 9999;
          }

          .submenu.left {
            left: auto;
            right: 100%;
            transform: translateX(-10px);
          }

          .item:hover > .submenu {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          }
        }

        /* ---------------- Mobile ---------------- */
        @media (max-width:47.99em) {
          .submenu {
            position: static;
            max-height: 0;
            overflow: hidden;
            transition: max-height .3s ease;
          }

          .submenu.open {
            max-height: 1000px;
          }
        }
      </style>

      <div class="item">
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

    const updatePosition = () => {
      if (window.innerWidth < 768) return;
      submenu.classList.remove("left");
      submenu.style.visibility = "hidden";
      submenu.style.opacity = "1";
      submenu.style.display = "block";

      requestAnimationFrame(() => {
        const rect = submenu.getBoundingClientRect();
        submenu.style.display = "";
        submenu.style.opacity = "";
        submenu.style.visibility = "";

        if (rect.right > window.innerWidth - 10) {
          submenu.classList.add("left");
        }
      });
    };

    /* Desktop */
    button.addEventListener("mouseenter", updatePosition);

    /* Mobile */
    button.addEventListener("click", () => {
      if (window.innerWidth >= 768) return;
      submenu.classList.toggle("open");
      button.classList.toggle("open");
    });

    window.addEventListener("resize", updatePosition);
  }
}

customElements.define("dropdown-submenu", DropdownSubmenu);
