import React from "react";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  striped?: boolean;
  hoverable?: boolean;
  caption?: string;
  className?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  striped = false,
  hoverable = true,
  caption,
  className = "",
}: TableProps<T>) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`w-full overflow-x-auto rounded-card-lg border border-primary-100/10 ${className}`}>
      <table className="w-full border-collapse">
        {caption && (
          <caption className="px-4 py-2 text-md text-primary-300 text-left">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="border-b border-primary-100/10 bg-surface-sub">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={[
                  "px-4 py-3 text-md font-bold text-primary-400 uppercase tracking-wide",
                  alignClass[col.align || "left"],
                ].join(" ")}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={String(row[keyField])}
              className={[
                "border-b border-primary-100/10 last:border-b-0 transition-colors",
                striped && rowIndex % 2 === 1 ? "bg-surface-sub/30" : "bg-transparent",
                hoverable ? "hover:bg-surface-sub/50" : "",
              ].join(" ")}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={[
                    "px-4 py-3 text-lg text-white",
                    alignClass[col.align || "left"],
                  ].join(" ")}
                >
                  {col.render
                    ? col.render(row)
                    : String(row[col.key as keyof T] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
