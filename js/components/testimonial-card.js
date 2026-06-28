class TestimonialCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const text = this.getAttribute("text") || "";
    
    this.shadowRoot.innerHTML = `
      <style>
        .testimonial {
          position: relative;
          padding: 40px;
          background: #FFFFFF;
          border: 1px solid #ececec;
          border-radius: 14px;
          box-shadow: 0 20px 50px rgba(0,0,0,.08);
          transition: .3s;
        }

        .testimonial:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(0,0,0,.08);
        }

        .quote {
          display: block;
          color: #0aa0a5;
          font-size: 50px;
          font-family: Georgia, serif;
          line-height: .8;
          margin-bottom: 20px;
        }

        .testimonial p {
          margin: 0;
          color: #2d2d2d;
          font-size: clamp(14px, 2vw, 14px);
          font-family: 'Montserrat-medium', sans-serif;
          line-height: 1.8;
          font-style: italic;
          font-weight: 500;
          text-align: center;
        }

        @media (max-width: 768px) {
          .testimonial {
            padding: 30px;
          }

          .quote {
            font-size: 60px;
          }
        }
      </style>

      <div class="testimonial">
        <span class="quote">❝</span>
        <p>
          « ${text} »
        </p>
      </div>
    `;
  }
}

customElements.define("testimonial-card", TestimonialCard);
