import Data from "./data"

type TableProps = {
    datas: Array<Data>;
    onModifyClick: (data: Data) => void;
    onDeleteClick: (id: string) => void;
}
export default TableProps