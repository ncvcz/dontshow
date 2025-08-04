import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Element as ExposingElement } from "@/types";
import { TrashIcon } from "lucide-react";
import React from "react";

interface ElementsTableProps {
  elements: ExposingElement[];
  onElementHover: (element: HTMLElement | null) => void;
  onElementRemove: (index: number, element: ExposingElement) => void;
}

export function ElementsTable({ elements, onElementHover, onElementRemove }: ElementsTableProps) {
  if (elements.length === 0) return null;

  return (
    <Card className="mb-3">
      <CardContent className="flex flex-col space-y-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-24">#</TableHead>
              <TableHead className="min-w-24">Selector</TableHead>
              <TableHead className="min-w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {elements.map((element, index) => (
              <TableRow
                key={index}
                onMouseOver={() =>
                  onElementHover(document.querySelector(element.selector) as HTMLElement)
                }
                onMouseOut={() => onElementHover(null)}
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{element.selector}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" onClick={() => onElementRemove(index, element)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
