import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg"
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
            d="M245.333 0C110.059 0 0 110.059 0 245.333s110.059 245.333 245.333 245.333 245.333-110.059 245.333-245.333S380.608 0 245.333 0zm0 448c-111.744 0-202.667-90.923-202.667-202.667S133.589 42.667 245.333 42.667 448 133.589 448 245.333 357.077 448 245.333 448z" />
            <Path 
                fill={active ? Colors.active : Colors.notactive}
                stroke={active ? Colors.active : Colors.notactive}
            d="M359.552 131.136c-3.093-3.115-7.765-4.011-11.755-2.261l-149.333 64c-2.517 1.067-4.523 3.093-5.611 5.611l-64 149.333a10.653 10.653 0 002.261 11.755 10.82 10.82 0 007.552 3.093c1.408 0 2.837-.299 4.203-.853l149.333-64a10.761 10.761 0 005.611-5.611l64-149.333a10.687 10.687 0 00-2.261-11.734zM245.333 266.667c-11.755 0-21.333-9.579-21.333-21.333 0-11.755 9.579-21.333 21.333-21.333 11.755 0 21.333 9.579 21.333 21.333.001 11.754-9.578 21.333-21.333 21.333z" />

        </Svg>

    );
};
