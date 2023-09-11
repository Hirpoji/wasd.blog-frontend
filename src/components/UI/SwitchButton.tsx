import { FC } from "react";
import Button from "./Button";

interface SwitchButtonsProps {
  buttonsList: Array<string>;
  value: string;
  onClickType: Function;
  classes?: string;
}
const SwitchButtons: FC<SwitchButtonsProps> = ({
  buttonsList,
  value,
  onClickType,
  classes,
}) => {
  return (
    <div className={`flex items-center gap-30 ${classes}`}>
      <div className="flex lg:gap-x-10 md:gap-x-10 gap-x-8">
        {buttonsList.map((typeName: string, index: number) => {
          return (
            <Button
              children={typeName}
              key={index}
              classes={
                value === typeName
                  ? "text-black"
                  : "text-gray-400"
              }
              onclick={() => onClickType(typeName)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SwitchButtons;
