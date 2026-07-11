import Icon from "@/components/ui/Icon";

type IconChipProps = {
  name: React.ComponentProps<typeof Icon>["name"];
  bg: string;
  color: string;
  size?: string;
};

export default function IconChip({
  name,
  bg,
  color,
  size = "h-11 w-11",
}: IconChipProps) {
  return (
    <div
      className={`flex ${size} shrink-0 items-center justify-center rounded-full ${bg}`}
    >
      <Icon name={name} className={`h-6 w-6 ${color}`} />
    </div>
  );
}
