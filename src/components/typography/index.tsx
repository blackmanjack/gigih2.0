type typography = {
  children: string;
  className?: string;
};

const Heading1 = ({ children, className }: typography) => {
  return (
    <>
      <h1 className={`${className} heading1`}>{children}</h1>
    </>
  );
};
const Heading2 = ({ children, className }: typography) => {
  return (
    <>
      <h2 className={`${className} heading2`}>{children}</h2>
    </>
  );
};
const Heading3 = ({ children, className }: typography) => {
  return (
    <>
      <h3 className={`${className} heading3`}>{children}</h3>
    </>
  );
};
const Paragraph1 = ({ children, className }: typography) => {
  return (
    <>
      <p className={`${className} paragraph1`}>{children}</p>
    </>
  );
};
const Paragraph2 = ({ children, className }: typography) => {
  return (
    <>
      <p className={`${className} paragraph2`}>{children}</p>
    </>
  );
};

export { Heading1, Heading2, Heading3, Paragraph1, Paragraph2 };
