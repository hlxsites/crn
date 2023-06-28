export default function decorate(block) {
  const heroHtml = `
    <div>
      <img src = '/images/hero-banner.jpeg'>
      <h1>
        <a href="/">IoT Integrator</a>
      </h1>
      <h2>Powering the business behind the Internet of Things</h2>
    </div>
  `;
  block.innerHTML = heroHtml;
}
