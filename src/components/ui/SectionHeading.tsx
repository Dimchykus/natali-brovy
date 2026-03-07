interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold text-text-50 md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-300">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-accent-500" />
    </div>
  );
}
