class AccordionComponent extends HTMLElement {
    constructor(){
      super();
      this.attachShadow({mode:"open"});
    }

    connectedCallback(){
      const title = this.getAttribute("title") ?? "#";

      this.shadowRoot.innerHTML=`
      <style>
        .accordion-item {
          border-bottom: 1px solid #E6E6E6;
        }

        .accordion-button {
          width: 100%;
          padding: 1.8rem;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 17px;
          font-weight: 600;
          color: #0B1741;
        }

        .plus {
          width: 42px;
          height: 42px;

          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: 50%;
          background: #eef5ff;
          color: #0aa0a5;

          font-size: 1.5rem;

          transition: all .3s;
        }

        .accordion-content {
          height: 0;
          overflow: hidden;
          transition: height .35s ease;
        }

        .content {
          padding: 0 1.8rem 1.8rem;
          line-height: 1.7;
        }

        .accordion-item.active .plus {
          transform: rotate(45deg);
          background: #0aa0a5;
          color: white;
        }

        @media (max-width: 768px) {
          .accordion-button {
            font-size: 14px;
          }
        }
      </style>

      <div class="accordion-item">
        <button class="accordion-button">
          <span>${title}</span>
          <span class="plus">+</span>
        </button>

        <div class="accordion-content">
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;

    const items = this.shadowRoot.querySelectorAll(".accordion-item");
    const button = this.shadowRoot.querySelector(".accordion-button");
    const content = this.shadowRoot.querySelector(".accordion-content");

    items.forEach((item) => {
      button.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        if (isOpen) {
          item.classList.remove("active");
          content.style.height = "0px";
        } else {
          item.classList.add("active");
          content.style.height = content.scrollHeight + "px";
        }
      });
    });
  }
}

customElements.define("toggle-panel",AccordionComponent);
