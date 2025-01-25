export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero py-12 bg-base-100 shadow-lg">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="/images/churchtree-mockup.png"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Build Your ChurchTree Today!</h1>
            <p className="py-6">
              Create a professional landing page for your church, manage links,
              and track analytics effortlessly.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}
