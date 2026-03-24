import React from "react";
import PlusIcon from "./plus.svg";
import CloseIcon from "./close.svg";
import BoxIcon from "./box.svg";
import CheckCircleIcon from "./check-circle.svg";
import AlertIcon from "./alert.svg";
import InfoIcon from "./info.svg";
import ErrorIcon from "./info-hexa.svg";
import BoltIcon from "./bolt.svg";
import ArrowUpIcon from "./arrow-up.svg";
import ArrowDownIcon from "./arrow-down.svg";
import FolderIcon from "./folder.svg";
import VideoIcon from "./videos.svg";
import AudioIcon from "./audio.svg";
import GridIcon from "./grid.svg";
import FileIcon from "./file.svg";
import DownloadIcon from "./download.svg";
import ArrowRightIcon from "./arrow-right.svg";
import GroupIcon from "./group.svg";
import BoxIconLine from "./box-line.svg";
import ShootingStarIcon from "./shooting-star.svg";
import DollarLineIcon from "./dollar-line.svg";
import TrashBinIcon from "./trash.svg";
import AngleUpIcon from "./angle-up.svg";
import AngleDownIcon from "./angle-down.svg";
import PencilIcon from "./pencil.svg";
import CheckLineIcon from "./check-line.svg";
import CloseLineIcon from "./close-line.svg";
import ChevronDownIcon from "./chevron-down.svg";
import ChevronUpIcon from "./chevron-up.svg";
import PaperPlaneIcon from "./paper-plane.svg";
import LockIcon from "./lock.svg";
import EnvelopeIcon from "./envelope.svg";
import UserIcon from "./user-line.svg";
import CalenderIcon from "./calender-line.svg";
import EyeIcon from "./eye.svg";
import EyeCloseIcon from "./eye-close.svg";
import TimeIcon from "./time.svg";
import CopyIcon from "./copy.svg";
import ChevronLeftIcon from "./chevron-left.svg";
import UserCircleIcon from "./user-circle.svg";
import TaskIcon from "./task-icon.svg";
import ListIcon from "./list.svg";
import TableIcon from "./table.svg";
import PageIcon from "./page.svg";
import PieChartIcon from "./pie-chart.svg";
import BoxCubeIcon from "./box-cube.svg";
import PlugInIcon from "./plug-in.svg";
import DocsIcon from "./docs.svg";
import MailIcon from "./mail-line.svg";
import HorizontaLDots from "./horizontal-dots.svg";
import ChatIcon from "./chat.svg";
import MoreDotIcon from "./more-dot.svg";
import BellIcon from "./bell.svg";
// Raw map of imported icon components keyed by their variable names
const iconsRaw = {
  DownloadIcon,
  BellIcon,
  MoreDotIcon,
  FileIcon,
  GridIcon,
  AudioIcon,
  VideoIcon,
  BoltIcon,
  PlusIcon,
  BoxIcon,
  CloseIcon,
  CheckCircleIcon,
  AlertIcon,
  InfoIcon,
  ErrorIcon,
  ArrowUpIcon,
  FolderIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  GroupIcon,
  BoxIconLine,
  ShootingStarIcon,
  DollarLineIcon,
  TrashBinIcon,
  AngleUpIcon,
  AngleDownIcon,
  PencilIcon,
  CheckLineIcon,
  CloseLineIcon,
  ChevronDownIcon,
  PaperPlaneIcon,
  EnvelopeIcon,
  LockIcon,
  UserIcon,
  CalenderIcon,
  EyeIcon,
  EyeCloseIcon,
  TimeIcon,
  CopyIcon,
  ChevronLeftIcon,
  UserCircleIcon,
  ListIcon,
  TableIcon,
  PageIcon,
  TaskIcon,
  PieChartIcon,
  BoxCubeIcon,
  PlugInIcon,
  DocsIcon,
  MailIcon,
  HorizontaLDots,
  ChevronUpIcon,
  ChatIcon,
};

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Helper to convert CamelCase names to kebab-case (e.g. ChevronLeftIcon -> chevron-left)
const toKebab = (s: string) =>
  s
    .replace(/Icon$/i, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();

// Build a flexible lookup map that accepts several name formats:
// - original export name: "PlusIcon"
// - without the "Icon" suffix: "plus"
// - kebab-case: "plus" or "chevron-left"
const iconsMap: Record<string, IconComponent> = {};
Object.keys(iconsRaw).forEach((key) => {
  const comp = (iconsRaw as unknown as Record<string, IconComponent>)[key] as IconComponent;
  iconsMap[key] = comp; // e.g. "PlusIcon"
  const noSuffix = key.replace(/Icon$/i, "");
  iconsMap[noSuffix.toLowerCase()] = comp; // e.g. "plus"
  iconsMap[toKebab(key)] = comp; // e.g. "chevron-left"
});

export function getIconByName(name?: string): IconComponent | null {
  if (!name) return null;
  if ((iconsMap as unknown as Record<string, IconComponent>)[name]) return (iconsMap as unknown as Record<string, IconComponent>)[name];
  const lower = name.toLowerCase();
  if ((iconsMap as unknown as Record<string, IconComponent>)[lower]) return (iconsMap as unknown as Record<string, IconComponent>)[lower];
  const kebab = toKebab(name);
  if ((iconsMap as unknown as Record<string, IconComponent>)[kebab]) return (iconsMap as unknown as Record<string, IconComponent>)[kebab];
  // Common alias map for icon names used in menu JSON that don't exactly match
  // the component variable names. Add more aliases here as needed.
  const aliases: Record<string, IconComponent> = {
    dashboard: GridIcon,
    filetext: FileIcon,
    "file-text": FileIcon,
  };
  if ((aliases as unknown as Record<string, IconComponent>)[lower]) return (aliases as unknown as Record<string, IconComponent>)[lower];
  if ((aliases as unknown as Record<string, IconComponent>)[kebab]) return (aliases as unknown as Record<string, IconComponent>)[kebab];
  return null;
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  // Either pass a string name (see accepted formats) or a component directly
  name?: string;
  component?: IconComponent;
  /**
   * Convenience prop to set both width & height at once. Accepts any CSS size
   * value (number = px, or string like "1.5rem").
   */
  size?: number | string;
}

export const Icon: React.FC<IconProps> = ({ name, component, size, style, ...rest }) => {
  const Component = component ?? getIconByName(name ?? "");
  if (!Component) return null;
  const dimensionProps =
    typeof size !== "undefined"
      ? {
          width: typeof size === "number" ? `${size}px` : size,
          height: typeof size === "number" ? `${size}px` : size,
        }
      : {};

  return <Component style={style} {...dimensionProps} {...rest} />;
};

// re-export all raw icons for callers that prefer direct imports
export {
  DownloadIcon,
  BellIcon,
  MoreDotIcon,
  FileIcon,
  GridIcon,
  AudioIcon,
  VideoIcon,
  BoltIcon,
  PlusIcon,
  BoxIcon,
  CloseIcon,
  CheckCircleIcon,
  AlertIcon,
  InfoIcon,
  ErrorIcon,
  ArrowUpIcon,
  FolderIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  GroupIcon,
  BoxIconLine,
  ShootingStarIcon,
  DollarLineIcon,
  TrashBinIcon,
  AngleUpIcon,
  AngleDownIcon,
  PencilIcon,
  CheckLineIcon,
  CloseLineIcon,
  ChevronDownIcon,
  PaperPlaneIcon,
  EnvelopeIcon,
  LockIcon,
  UserIcon,
  CalenderIcon,
  EyeIcon,
  EyeCloseIcon,
  TimeIcon,
  CopyIcon,
  ChevronLeftIcon,
  UserCircleIcon,
  ListIcon,
  TableIcon,
  PageIcon,
  TaskIcon,
  PieChartIcon,
  BoxCubeIcon,
  PlugInIcon,
  DocsIcon,
  MailIcon,
  HorizontaLDots,
  ChevronUpIcon,
  ChatIcon,
};

export default Icon;
