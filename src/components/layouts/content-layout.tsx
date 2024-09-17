import React, { type FC, type ReactNode } from "react";

interface ContentLayoutProps {
  children: ReactNode;
  title: string;
  Icon?: FC;
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  children,
  title,
  Icon,
}) => {
  return (
    <div className="flex flex-col gap-8 px-6 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">{title}</h1>
        {Icon && <Icon />}
      </header>
      <main className="">{children}</main>
    </div>
  );
};
