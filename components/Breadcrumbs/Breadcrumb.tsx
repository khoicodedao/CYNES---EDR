"use client";
import Link from "next/link";
import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
interface BreadcrumbProps {
  pageName?: string;
}

const BreadcrumbCustom = ({ pageName }: BreadcrumbProps) => {
  {
    /* <!-- Get url path with useRouter --> */
  }

  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const breadcrumbList = pathNames.map((segment, index) => {
    const url = `/${pathNames.slice(0, index + 1).join("/")}`;
    return {
      title: (
        <Link
          className="capitalize dark:text-bodydark  dark:hover:text-white"
          href={url}
        >
          <p className="capitalize dark:text-bodydark  dark:hover:text-white">
            {segment}
          </p>
        </Link>
      ),
    };
  });
  return (
    <div className=" flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link
                className="capitalize dark:text-bodydark dark:hover:text-white"
                href="/"
              >
                Dashboard
              </Link>
            ),
          },
          ...breadcrumbList,
        ]}
      />
    </div>
  );
};

export default BreadcrumbCustom;
