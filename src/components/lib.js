import React from "react";

export function Header() {
  return (
    <nav className="header">
      <a href="/">
        <h1>My Site</h1>
      </a>
      <ul>
        <a href="/">
          <li>Home</li>
        </a>
        <a href="/about">
          <li>About</li>
        </a>
        <a href="/blog">
          <li>Blog</li>
        </a>
      </ul>
    </nav>
  );
}

export function Layout({ children }) {
  return (
    <>
      <Header />
      <div id="content">{children}</div>
    </>
  );
}

export function Message({ text }) {
  return <p className="hello">{text}</p>;
}

export function Counter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (count !== 0 && count % 10 === 0) {
      window.alert(`You reached ${count}!`);
    }
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Click Me!</button>
    </div>
  );
}
