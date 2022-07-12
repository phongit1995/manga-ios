import * as React from "react";
import Svg, { Path } from "react-native-svg"
import { Colors, ICON_SIZE, IconProps } from "../../constants";

export default ({ active }: IconProps) => {
  return (
    <Svg
      width={ICON_SIZE} height={ICON_SIZE}
      viewBox="0 0 512 512"
    >
      <Path 
      fill={active ? Colors.active : Colors.notactive}
      stroke={active ? Colors.active : Colors.notactive}
      strokeWidth={32}
      strokeLinecap="round"
      d="M481.765 220.422L276.474 15.123c-16.967-16.918-44.557-16.942-61.559.023L9.626 220.422c-12.835 12.833-12.835 33.65 0 46.483 12.843 12.842 33.646 12.842 46.487 0l27.828-27.832v214.872c0 19.343 15.682 35.024 35.027 35.024h74.826v-97.62c0-7.584 6.146-13.741 13.743-13.741h76.352c7.59 0 13.739 6.157 13.739 13.741v97.621h74.813c19.346 0 35.027-15.681 35.027-35.024V239.091l27.812 27.815a32.774 32.774 0 0023.243 9.63c8.408 0 16.819-3.209 23.242-9.63 12.844-12.834 12.844-33.65 0-46.484z" />
    </Svg>
  
  );
};
