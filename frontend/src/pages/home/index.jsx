import React from "react";
import "./home.css";
import iconChat from "../../assets/imgs/icon-chat.webp";
import iconMoney from "../../assets/imgs/icon-money.webp";
import iconSecurity from "../../assets/imgs/icon-security.webp";

export default function Home() {
  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((feature, index) => (
          <div className="feature-item" key={index}>
            <img
              src={feature.icon}
              alt={feature.title}
              className="feature-icon"
            />
            <h3 className="feature-item-title">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

const features = [
  {
    title: "You are our #1 priority",
    icon: iconChat,
    description:
      "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
  },
  {
    title: "More savings means higher rates",
    icon: iconMoney,
    description:
      "The more you save with us, the higher your interest rate will be!",
  },
  {
    title: "Security you can trust",
    icon: iconSecurity,
    description:
      "We use top of the line encryption to make sure your data and money is always safe.",
  },
];
