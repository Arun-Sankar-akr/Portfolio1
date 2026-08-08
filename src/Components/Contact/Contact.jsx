import React, { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className={styles.section}>
      <span className={`eyebrow ${styles.eyebrow}`}>// 03 — get in touch</span>
      <div className={styles.container}>
        <div className={styles.infoCol}>
          <h2 className={styles.title}>Let's Connect 👋</h2>
          <p className={styles.description}>
            I am currently based in <strong>Tiruchirappalli, India</strong> and open to full-time entry-level positions in Frontend / Web Development.
          </p>

          <div className={styles.contactCards}>
            <div className={styles.contactCard}>
              <span>📞 Phone</span>
              <a href="tel:9047638853">+91 9047638853</a>
            </div>

            <div className={styles.contactCard}>
              <span>✉️ Email</span>
              <a href="mailto:arunsankarramakr@gmail.com">arunsankarramakr@gmail.com</a>
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {sent && <div className={styles.successMsg}>✓ Thank you! Your message has been noted.</div>}

          <input
            type="text"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />

          <input
            type="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />

          <textarea
            rows="4"
            placeholder="Your Message..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
          ></textarea>

          <button type="submit" className={styles.sendBtn}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
