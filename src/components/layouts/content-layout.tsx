import React, { type ReactNode } from "react";

interface ContentLayoutProps {
  children: ReactNode;
  title: string;
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  children,
  title,
}) => {
  return (
    <div className="flex flex-col gap-8 px-6 py-8">
      <header>
        <h1 className="text-3xl font-semibold">{title}</h1>
      </header>
      <main className="">{children}</main>
    </div>
  );
};
