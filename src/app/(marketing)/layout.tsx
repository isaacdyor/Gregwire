const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  return (
    <>
      {/* <Nav /> */}

      {children}
    </>
  );
};

export default RootLayout;
