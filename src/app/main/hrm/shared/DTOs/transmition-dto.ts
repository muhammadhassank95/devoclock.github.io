export class TransitionInputsDto {
  id: number;
  isActive: boolean;
  erpId: string;
  erpName: string;
  currentId: number;
  currentName: string;
  newId: number;
  newName: string;
  masterName: string;
  masterId: string;
  applicableFrom: string;
}

export const colDef = [
  {
    headerName: "SrNo",
    editable: false,
    field: "srNo",
    sortable: true,
    valueGetter: "node.rowIndex+1",
    suppressSizeToFit: true,
    width: 80,
  },
  // {
  //     headerName: "Employee Id",
  //     editable: false,
  //     field: "erpId",
  //     resizable: true,
  //     suppressSizeToFit: true,
  // },

  {
    headerName: "Applicable Date From",
    editable: false,
    field: "applicableFrom",
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    cellRenderer: (params) => {
      if (!params.value) return "";
      const date = new Date(params.value);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }); // Format: e.g., "Dec 11, 2024"
    },
  },
  {
    headerName: "Old Title",
    field: "oldName",
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    editable: true,
  },
  {
    headerName: "New Title",
    field: "newName",
    sortable: true,
    resizable: true,
    suppressSizeToFit: true,
    editable: true,
  },
];

export function formatDateToISO(date: Date): string {
  const pad = (number: number) => (number < 10 ? "0" : "") + number;

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
}
