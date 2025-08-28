import TableUtil from "@/utils/TableUtil";
import usePerformance from "@/hooks/usePerformance";

const TableInfo: React.FC = () => {
  const { table, columns, expand, setExpand } = usePerformance();

  return (
    <div className=" w-1/2 max-sm:w-full ">
      {/* Tabla 1: Empleado | Departamento | Rendimiento | Estado*/}
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
