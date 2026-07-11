type PageHeadingProps = {
  children: React.ReactNode;
};

export default function PageHeading({ children }: PageHeadingProps) {
  return <h1 className="text-2xl font-semibold text-gray-900">{children}</h1>;
}
