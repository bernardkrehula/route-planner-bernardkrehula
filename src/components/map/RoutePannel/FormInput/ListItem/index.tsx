import type { ListItemType } from "#/types/ui.types.ts/ListItemType";

const ListItem = ({key, label, handleDestinationClick}: ListItemType) => {
  return (
    <li key={key} onClick={() => handleDestinationClick(label)}>
      {label}
    </li>
  );
};
export default ListItem;
