import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "sheetjs-style";

import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { Tooltip } from "@mui/material";

type Props = {
  csvData: Object[];
  fileName: string;
};

const ExportExcel: React.FC<Props> = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData: Object[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Tooltip title="Export Data" arrow>
      <button
        onClick={(e) => exportToCSV(csvData, fileName)}
        className=" inline-block px-2 py-2 bg-lime-500 text-white font-medium text-md leading-tight  rounded-full shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
      >
        <DownloadForOfflineOutlinedIcon />
      </button>
    </Tooltip>
  );
};

export default ExportExcel;
