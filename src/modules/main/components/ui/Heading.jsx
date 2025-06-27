export default function Heading({ title, subtitle }) {
  return (
    <div className="text-center text-white">
      <h1 className="mb-5 text-6xl font-semibold font-rouge">{title}</h1>
      <p className="mb-8 font-poppins tracking-wider text-3xl font-semibold">
        {subtitle}
      </p>
    </div>
  );
}
