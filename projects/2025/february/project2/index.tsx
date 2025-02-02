import React from "react";
import { cn } from "@/lib/utils";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

interface TableSectionProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

const Table = ({ className, ...props }: TableProps) => {
  return (
    <div className="w-full overflow-auto">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
};

const TableHeader = ({ className, ...props }: TableSectionProps) => {
  return (
    <thead className={cn("border-b bg-gray-50/50", className)} {...props} />
  );
};

const TableBody = ({ className, ...props }: TableSectionProps) => {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  );
};

const TableFooter = ({ className, ...props }: TableSectionProps) => {
  return (
    <tfoot
      className={cn("border-t bg-gray-50/50 font-medium", className)}
      {...props}
    />
  );
};

const TableRow = ({ className, ...props }: TableRowProps) => {
  return (
    <tr
      className={cn(
        "border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50",
        className
      )}
      {...props}
    />
  );
};

const TableHead = ({ className, ...props }: TableHeadProps) => {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-bold text-gray-500 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
};

const TableCell = ({ className, ...props }: TableCellProps) => {
  return (
    <td
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
};

export default function Project2() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
            <TableHead>Header 3</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
            <TableCell>Cell 3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cell 4</TableCell>
            <TableCell>Cell 5</TableCell>
            <TableCell>Cell 6</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cell 4</TableCell>
            <TableCell>Cell 5</TableCell>
            <TableCell>Cell 6</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
