import TableUtil from "@/components/TableUtil";
import usePerformance from "@/hooks/usePerformance";
import { cardBottomStyles } from "@/utils/helpers";

const TableInfo: React.FC = () => {
  const { table, columns, expand, setExpand } = usePerformance();

  const isLoading =
    !table || table.length === 0 || !columns || columns.length === 0;

  return (
    <div className={`${cardBottomStyles}`} >
      {/* Tabla : Empleado | Departamento | Rendimiento | Estado*/}
      <TableUtil
        data={table || []}
        columns={columns || []}
        onClick={() => setExpand((prev) => !prev)}
        expand={expand}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TableInfo;
