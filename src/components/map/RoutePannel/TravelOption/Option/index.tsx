import type { OptionType } from "#/types/ui.types.ts/OptionType";

const Option = ({value, label}: OptionType) => {
    return(
        <option value={value}>{label}</option>
    )
}
export default Option;