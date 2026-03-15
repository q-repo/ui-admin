// svg.d.ts
declare module "*.svg" {
  import * as React from "react";
  // Treat default import as a React component (SVGR style)
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
  // Also export the named ReactComponent for compatibility
  export { ReactComponent };
}
