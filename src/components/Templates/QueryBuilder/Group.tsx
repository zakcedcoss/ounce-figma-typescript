import { Button, Card } from "@cedcommerce/ounce-ui";
import { useCallback, useEffect, useState } from "react";
import { GroupProps, RowArrayType } from "../../../types/types";
import Row from "./Row";

function Group({ groupId, setGroupArrayMemo, nGroups }: GroupProps) {
  const [rowArray, setRowArray] = useState<RowArrayType[]>([
    {
      id: Math.floor(Math.random() * 448164465),
      first: "",
      second: "",
      third: "",
    },
  ]);

  const handleAddRow = () => {
    setRowArray((prev) => {
      return [
        ...prev,
        {
          id: Math.floor(Math.random() * 448164465),
          first: "",
          second: "",
          third: "",
        },
      ];
    });
  };

  const setRowArrayMemo = useCallback(setRowArray, []);

  useEffect(() => {
    setGroupArrayMemo((prev) => {
      return prev.map((pgrp) => {
        if (pgrp.id === groupId) return { ...pgrp, rowsArray: rowArray };
        return pgrp;
      });
    });
  }, [rowArray]);

  return (
    <Card cardType="Bordered">
      <Button type="Plain" onClick={handleAddRow}>
        + Add Row
      </Button>
      {rowArray.map((row) => {
        return (
          <Row
            key={row.id}
            rowId={row.id}
            setRowArrayMemo={setRowArrayMemo}
            nRows={rowArray.length}
          />
        );
      })}
    </Card>
  );
}

export default Group;
