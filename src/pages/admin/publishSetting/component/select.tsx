import { Select } from "antd"
import React from "react"
const { Option } = Select
type MySelectPropsType = {
    options: string[];
    onChange: (value: string) => void;
    value: string
}
function MySelect({ options, onChange, value }: MySelectPropsType) {
    return (
        <Select style={{ width: 120 }} onChange={onChange} value={value}>
            {options.map(option => (
                <Option value={option}>{option}</Option>
            ))}
        </Select>
    )
}
export default MySelect