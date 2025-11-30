import { INavigationConfig } from "@/types";

const componentsRoute = "/docs/components";
const chartsRoute = "/docs/charts";
const utilsRoute = "/docs/utils";

export const navConfig: INavigationConfig = {
  topNavItems: [
    { title: "Docs", href: "/docs" },
    { title: "Components", href: `${componentsRoute}/button` },
    { title: "Themes", href: "/themes" },
    { title: "Blog", href: "/blogs" },
    { title: "Showcase", href: "/showcase" },
  ],
  sideNavItems: [
    {
      title: "Getting Started",
      children: [
        { title: "Introduction", href: "/docs" },
        {
          title: "Installation",
          href: "/docs/install",
        },
        // {
        //   title: "Changelog",
        //   href: "https://pro.retroui.dev",
        // },
        {
          title: "Blocks",
          href: "https://pro.retroui.dev/blocks",
          tag: "Pro",
        },
        {
          title: "Templates",
          href: "https://pro.retroui.dev/templates",
          tag: "Pro",
        },
        {
          title: "Figma Kit",
          href: "https://pro.retroui.dev/figma",
          tag: "Pro",
        },
      ],
    },
    {
      title: "Components",
      children: [
        { title: "Accordion", href: `${componentsRoute}/accordion` },
        { title: "Alert", href: `${componentsRoute}/alert` },
        { title: "Avatar", href: `${componentsRoute}/avatar` },
        { title: "Badge", href: `${componentsRoute}/badge` },
        { title: "Breadcrumb", href: `${componentsRoute}/breadcrumb` },
        { title: "Button", href: `${componentsRoute}/button` },
        { title: "Card", href: `${componentsRoute}/card` },
        { title: "Calendar", href: `${componentsRoute}/calendar`, tag: "New" },
        { title: "Carousel", href: `${componentsRoute}/carousel`, tag: "New" },
        { title: "Checkbox", href: `${componentsRoute}/checkbox` },
        { title: "Command", href: `${componentsRoute}/command` },
        { title: "Dialog", href: `${componentsRoute}/dialog` },
        { title: "Input", href: `${componentsRoute}/input` },
        { title: "Label", href: `${componentsRoute}/label` },
        { title: "Loader", href: `${componentsRoute}/loader`, tag: "New" },
        { title: "Menu", href: `${componentsRoute}/menu` },
        { title: "Context Menu", href: `${componentsRoute}/context-menu` },
        {
          title: "Popover",
          href: `${componentsRoute}/popover`,
        },
        { title: "Progress", href: `${componentsRoute}/progress` },
        { title: "Radio", href: `${componentsRoute}/radio` },
        { title: "Select", href: `${componentsRoute}/select` },
        { title: "Slider", href: `${componentsRoute}/slider` },
        {
          title: "Sonner",
          href: `${componentsRoute}/sonner`,
        },
        { title: "Switch", href: `${componentsRoute}/switch` },
        { title: "Tab", href: `${componentsRoute}/tab` },
        { title: "Table", href: `${componentsRoute}/table`, tag: "Updated" },
        { title: "Textarea", href: `${componentsRoute}/textarea` },
        { title: "Text", href: `${componentsRoute}/text` },
        {
          title: "Toggle",
          href: `${componentsRoute}/toggle`,
        },
        {
          title: "Toggle Group",
          href: `${componentsRoute}/toggle-group`,
        },
        {
          title: "Tooltip",
          href: `${componentsRoute}/tooltip`,
        },
      ],
    },
    {
      title: "Chart",
      children: [
        { title: "Bar Chart", href: `${chartsRoute}/bar-chart` },
        { title: "Line Chart", href: `${chartsRoute}/line-chart` },
        { title: "Area Chart", href: `${chartsRoute}/area-chart` },
        { title: "Pie Chart", href: `${chartsRoute}/pie-chart` },
      ],
    },
    {
      title: "Utilities",
      children: [{ title: "cn", href: `${utilsRoute}/cn` }],
    },
  ],
};
