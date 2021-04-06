import React from "react";

export function Header() {
  return (
    <ul className="flex flex-row list-none">
      <a href="/">
        <li className="px-4">Home</li>
      </a>
      <a href="/about">
        <li className="px-4">About</li>
      </a>
    </ul>
  );
}

export function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export function Message({ text }) {
  return <p className="hello">{text}</p>;
}
