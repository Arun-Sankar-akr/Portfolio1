import React, { useState } from 'react';
import styles from './Contact.module.css';

const EMAIL = 'arunsankarramakr@gmail.com';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\n${formData.name}\n${formData.email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.infoCol}>
          <h2 className={styles.title}>Let's connect</h2>
          <p className={styles.description}>
            I'm based in <strong>Tiruchirappalli, India</strong> and open to full-time entry-level
            positions in Frontend and Web Development.
          </p>

          <div className={styles.contactCards}>
            <a className={styles.contactCard} href="tel:9047638853">
              <span className={styles.iconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
              </span>
              <span className={styles.cardText}>
                <small>Phone</small>
                +91 9047638853
              </span>
            </a>

            <a className={styles.contactCard} href={`mailto:${EMAIL}`}>
              <span className={styles.iconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <span className={styles.cardText}>
                <small>Email</small>
                {EMAIL}
              </span>
            </a>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {sent && (
            <div className={styles.successMsg} role="status">
              ✓ Opening your email app with the message ready to send.
            </div>
          )}

          <label className="sr-only" htmlFor="contact-name">Your full name</label>
          <input
            id="contact-name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <label className="sr-only" htmlFor="contact-email">Your email address</label>
          <input
            id="contact-email"
            type="email"
            placeholder="Your email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <label className="sr-only" htmlFor="contact-message">Your message</label>
          <textarea
            id="contact-message"
            rows="4"
            placeholder="Your message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          ></textarea>

          <button type="submit" className={styles.sendBtn}>
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}