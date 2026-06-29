class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const text = this.getAttribute("text") || "";
    
    this.shadowRoot.innerHTML = `
      <style>
        .card-wrapper {
          position: relative;
          padding: 40px;
          background: #FFFFFF;
          border: 1px solid #ececec;
          border-radius: 10px;
          box-shadow: 0 20px 50px rgba(0,0,0,.08);
          transition: .3s;
        }

        .card-wrapper:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(0,0,0,.08);
        }

        @media (max-width: 768px) {
          .card-wrapper {
            padding: 30px;
          }
        }
      </style>

      <div class="card-wrapper">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("card-box", CardComponent);
