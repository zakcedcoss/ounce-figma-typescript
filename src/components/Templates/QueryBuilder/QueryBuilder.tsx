import { Button, Card, FlexLayout, Tag } from "@cedcommerce/ounce-ui";
import { useCallback, useEffect, useState } from "react";
import { GroupArrayType } from "../../../types/types";
import Group from "./Group";

function QueryBuilder() {
  const [groupArray, setGroupArray] = useState<GroupArrayType[]>([
    {
      id: Math.floor(Math.random() * 269655698),
      rowsArray: [],
    },
  ]);
  const [query, setQuery] = useState<string>("");

  const handleAddGroup = () => {
    setGroupArray((prev) => {
      return [
        ...prev,
        {
          id: Math.floor(Math.random() * 269655698),
          rowsArray: [],
        },
      ];
    });
  };

  const setGroupArrayMemo = useCallback(setGroupArray, []);

  useEffect(() => {
    let s: string = "";
    groupArray?.map((g, j) => {
      if (j > 0) {
        if (
          g.rowsArray.length &&
          g.rowsArray[0].first &&
          g.rowsArray[0].second &&
          g.rowsArray[0].third
        ) {
          s += " OR ";
        }
      }

      g.rowsArray?.map((r, i) => {
        const { first, second, third } = r;
        if (i > 0) {
          if (first !== "" && second !== "" && third !== "") {
            s += " AND ";
          }
        }
        if (first && second && third) {
          s += `${first} ${second} ${third}`;
        }
      });
    });

    setQuery(s);
  }, [groupArray]);

  return (
    <Card cardType="Bordered">
      <Card>{query && <Tag>{query}</Tag>}</Card>
      <Button type="Plain" onClick={handleAddGroup}>
        + Add Group
      </Button>
      {groupArray.map((group) => {
        return (
          <Group
            key={group.id}
            groupId={group.id}
            setGroupArrayMemo={setGroupArrayMemo}
            nGroups={groupArray.length}
          />
        );
      })}
    </Card>
  );
}

export default QueryBuilder;
