import FloatUpContainer from "../components/UI/FloatUpContainer";
import MediumCard from "../components/UI/MediumCard";
import { TableColumn } from "react-data-table-component";
import DataTableBase from "../components/UI/DataTableBase";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DataRow {
  subject: string;
  date: string;
  id: number;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: "Subject",
    selector: (row) => row.subject,
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  //   {
  //     name: "Action",
  //     button: true,
  //     cell: (row) => (

  //     ),
  //   },
];

const DATA = [
  {
    id: 1,
    subject: "Yovel",
    date: "1988",
  },
  {
    id: 2,
    subject: "Shmena",
    date: "1984",
  },
  {
    id: 3,
    subject: "Meod",
    date: "1984",
  },
];

const FeedbacksPage = (): JSX.Element => {
  const [data, setData] = useState(DATA);
  const [selectedData, setSelectedData] = useState<number[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);

  const handleChange = ({ selectedRows }: any) => {
    selectedRows.length ? setIsSelected(true) : setIsSelected(false);
    const newData = selectedRows.map((elem: any) => elem.id);
    console.log(newData);
    setSelectedData([...newData]);
  };

  const handleDelete = () => {
    const nd = data.filter((elem: any) => !selectedData.includes(elem.id));
    setData([...nd]);
    setToggleClearRows(!toggledClearRows);
    setIsSelected(false);
  };

  return (
    <FloatUpContainer>
      <MediumCard>
        <DataTableBase
          onSelectedRowsChange={handleChange}
          clearSelectedRows={toggledClearRows}
          title="Users feedbacks"
          columns={columns}
          data={data}
        />
        <AnimatePresence>
          {isSelected && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale:0 }}
              onClick={handleDelete}
              type="button"
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded"
            >
              Delete
            </motion.button>
          )}
        </AnimatePresence>
      </MediumCard>
    </FloatUpContainer>
  );
};

export default FeedbacksPage;
