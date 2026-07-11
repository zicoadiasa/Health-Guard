import Icon from "@/components/ui/Icon";

type IconName = React.ComponentProps<typeof Icon>["name"];

type EmptyStateProps = {
  message: string;
  icon?: IconName;
  action?: React.ReactNode;
};

export default function EmptyState({ message, icon, action }: EmptyStateProps) {
  if (!icon && !action) {
    return <p className="text-sm text-gray-600">{message}</p>;
  }

  return (
    <div className="flex flex-col items-center gap-3 py-4 text-center">
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Icon name={icon} className="h-6 w-6 text-gray-400" />
        </div>
      )}
      <p className="text-sm text-gray-600">{message}</p>
      {action}
    </div>
  );
}
