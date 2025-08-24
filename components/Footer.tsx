import Link from "next/link";
import React from "react";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineTikTok,
  AiFillLinkedin,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      {/* New sections */}
      <div className="footer-grid">
        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3>Contact Us</h3>
          <p className="contact">
            <span style={{ fontWeight: "700" }}>Email:</span>{" "}
            <a href="mailto:support@nexbuy.com">support@novagadget.com</a>
          </p>
          <p className="contact">
            <span style={{ fontWeight: "700" }}>Phone:</span>{" "}
            <a href="tel:+1234567890">+1 (234) 567-890</a>
          </p>
          <p className="contact">
            <span style={{ fontWeight: "700" }}> Address:</span> 123 Market
            Street, Lagos, Nigeria
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3>Stay Updated</h3>
          <p style={{ fontWeight: "400", marginBottom: "20px" }}>
            Subscribe to our newsletter for exclusive deals.
          </p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Original copyright */}
      <Link href={""} style={{ marginTop: "20px" }}>
        <span>©️ {new Date().getFullYear()}</span>
        <span> Nova</span>
        <span>Store</span>. All rights reserved
      </Link>

      {/* Original social icons */}
      <p className="social-icons">
        <AiFillInstagram />
        <AiFillLinkedin />
        <AiOutlineTikTok />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
