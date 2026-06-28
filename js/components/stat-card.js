class Stats extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const icon = this.getAttribute("icon") || "";
    const icon_tag_alt = this.getAttribute("alt_tag") || "";
    const data = this.getAttribute("data") || "";
    const description = this.getAttribute("description") || "";
    
    this.shadowRoot.innerHTML = `
      <style>
        .stat {
          padding: 30px;
        }

        .stat-card-body {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .stat__icon {
          font-size: clamp(28px, 5vw, 50px);
        }

        .stat h2 {
          font-size: clamp(28px, 5vw, 35px);
          font-family: 'Montserrat-bold', sans-serif;
          margin-bottom:15px;
          color:#0aa0a5;
        }

        .stat p {
          color: #0B1741;
          line-height: 1.6;
          font-size: clamp(14px, 2vw, 14px);
          margin-bottom: 0;
          font-family: 'Montserrat-medium', sans-serif;
        }

        @media (max-width:768px) {
          .stat {
            border: none !important;
          }
        }
      </style>

      <div class="stat">
        <div class="stat-card-body">
          <div class="stat__icon">
            <img src="${icon}" alt="${icon_tag_alt}" width="64" height="64">
          </div>
          <div>
            <h2>${data}</h2>
            <p>${description}</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("stat-card", Stats);
