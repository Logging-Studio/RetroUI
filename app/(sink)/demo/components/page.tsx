"use client";

import React from "react";
import { TableOfContents } from "@/components/retroui/TableOfContents";

export default function page() {
  return (
    <div className="container max-w-6xl mx-auto space-y-6 flex">

      <div className="flex-1">
        <h1>Table of Contents</h1>
        <h1>Table of Contents 1</h1>
        <div className="h-80"></div>
        <h2>Table of Contents 2</h2>
        <div className="h-80"></div>

        <h3>Table of Contents 3</h3>
        <h3>Table of Contents 3</h3>
        <h3>Table of Contents 3</h3>
        <div className="h-80"></div>
        <h4>Table of Contents 4</h4>
        <h4>Table of Contents 4</h4>
        <h4>Table of Contents 4</h4>
        <div className="h-80"></div>

        <h5>Table of Contents 5</h5>
        <h6>Table of Contents 6</h6>
      </div>
      <TableOfContents />
    </div>
  );
}
