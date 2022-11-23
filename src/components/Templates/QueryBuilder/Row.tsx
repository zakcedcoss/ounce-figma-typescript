import {
  Button,
  FlexLayout,
  Select,
  TextField,
  TextStyles,
} from "@cedcommerce/ounce-ui";
import { useEffect, useState } from "react";
import { RowProps } from "../../../types/types";

function Row({ rowId, setRowArrayMemo, nRows }: RowProps) {
  const firstField = [
    { label: "Title", value: "title" },
    { label: "Tags", value: "tags" },
    { label: "Price", value: "price" },
    { label: "Sku", value: "sku" },
    { label: "Quantity", value: "quantity" },
  ];
  const secondField = [
    { label: "Contains", value: "c" },
    { label: "Does Not Contains", value: "nc" },
    { label: "Equals", value: "e" },
    { label: "Not Equals", value: "ne" },
    { label: "Greater Than", value: "gt" },
    { label: "Less Than", value: "lt" },
    { label: "Greater Than Equal To", value: "gte" },
    { label: "Less Than Equal To", value: "lte" },
  ];
  const [first, setFirst] = useState<string>("");
  const [second, setsecond] = useState<string>("");
  const [third, setThird] = useState<string>("");

  function setSecondOptions() {
    if (first === "title" || first === "tags" || first === "sku") {
      return secondField.slice(0, 4);
    } else if (first === "price" || first === "quantity") {
      return secondField.slice(2);
    }
  }

  const handleDeleteRow = () => {
    setRowArrayMemo((prev) => {
      return prev.filter((prow) => prow.id !== rowId);
    });
  };

  useEffect(() => {
    setRowArrayMemo((prev) => {
      return prev.map((prow) => {
        if (prow.id === rowId) return { ...prow, first, second, third };
        return prow;
      });
    });
  }, [first, second, third]);

  return (
    <>
      <FlexLayout halign="fill" desktopWidth="33" spacing="loose" wrap="wrap">
        <Select
          options={firstField}
          value={first}
          onChange={(e) => {
            setFirst(e);
          }}
        />
        <Select
          value={second}
          options={setSecondOptions()}
          onChange={(e) => {
            setsecond(e);
          }}
        />
        <TextField
          value={third}
          onChange={(e) => {
            setThird(e);
          }}
        />
      </FlexLayout>
      <TextStyles>{rowId}</TextStyles>
      {nRows > 1 && (
        <Button type="DangerPlain" onClick={handleDeleteRow}>
          Delete Row
        </Button>
      )}
    </>
  );
}

export default Row;
