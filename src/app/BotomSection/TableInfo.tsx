import TableUtil from "@/components/TableUtil";
import usePerformance from "@/hooks/usePerformance";
import { cardBottomStyles } from "@/utils/helpers";

const TableInfo: React.FC = () => {
  const { table, columns, expand, setExpand } = usePerformance();

  return (
    <div className={`${cardBottomStyles}`}>
      {/* Tabla : Empleado | Departamento | Rendimiento | Estado*/}
      <TableUtil
        data={table}
        columns={columns}
        onClick={() => setExpand((prev) => !prev)}
        expand={expand}
      />
    </div>
  );
};

export default TableInfo;
