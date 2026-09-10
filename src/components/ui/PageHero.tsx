export function PageHero({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="bg-nkgc-blue-900 py-14 sm:py-20">
      <div className="container">
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-nkgc-blue-100">{lead}</p>
        )}
      </div>
    </div>
  );
}
