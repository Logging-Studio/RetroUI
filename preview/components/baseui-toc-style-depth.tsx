"use client";


import { TableOfContents } from "@/components/base-retroui/TableOfContents";
import { Text } from "@/components/base-retroui/Text";

export default function TocStyleDepth() {
    return <TableOfContents depth={3} className="w-80 h-96">
        <Text className="mb-3 border-b pb-2">On this page</Text>
    </TableOfContents>
}