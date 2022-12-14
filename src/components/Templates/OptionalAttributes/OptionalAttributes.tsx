import {
  Button,
  Card,
  FlexLayout,
  Select,
  TextField,
  TextStyles,
} from "@cedcommerce/ounce-ui";
import { useState } from "react";
import useProductAttributes from "../../../hooks/useProductAttributes";
import { OptionalOptionType } from "../../../types/types";

interface OptionalAttributesProps {
  optAttribOutput: string[][];
  setOptAttribOutputMemo: React.Dispatch<React.SetStateAction<string[][]>>;
}

function OptionalAttributes({
  optAttribOutput,
  setOptAttribOutputMemo,
}: OptionalAttributesProps) {
  const { productsAttributes } = useProductAttributes();
  const optionalAttribOptions: OptionalOptionType[] = [
    {
      label: "color",
      options: [
        { label: "color", value: "color" },
        { label: "size", value: "size" },
        { label: "weight", value: "weight" },
      ],
    },
    {
      label: "Size",
      options: [
        { label: "color", value: "color" },
        { label: "size", value: "size" },
        { label: "weight", value: "weight" },
      ],
    },
  ];
  const [customLabels, setCustomLabels] = useState<number[]>([]);

  const handleAddAttributes = () => {
    setCustomLabels((prev) => {
      return [...prev, Math.floor(Math.random() * 64564566)];
    });
    setOptAttribOutputMemo((prev) => {
      return [...prev, ["", ""]];
    });
  };

  const handleOptionChange = (e: string, _: any, idx: any) => {
    setOptAttribOutputMemo((prev) => {
      return prev.map((opt, i) => {
        if (i === idx && e === "custom") return [e, ""];
        else if (i === idx) return [e, e];
        return opt;
      });
    });
  };

  const handleTextEnter = (e: string, idx: number) => {
    setOptAttribOutputMemo((prev) => {
      return prev.map((opt, i) => {
        if (i === idx) return [opt[0], e];
        return opt;
      });
    });
  };

  const handleCustomLabelDelete = (id: number, idx: number) => {
    setCustomLabels((prev) => {
      return prev.filter((label) => label !== id);
    });
    setOptAttribOutputMemo((prev) => {
      return prev.filter((_, i) => i !== idx);
    });
  };

  return (
    <Card
      action={
        <Button type="Outlined" onClick={handleAddAttributes}>
          Add Attributes
        </Button>
      }
      cardType="Bordered"
      title="Optional Attributes"
      subTitle="This is an optional set of attributes that you may or may not map as per your requirements."
    >
      {optionalAttribOptions.map((opt: OptionalOptionType, i: number) => {
        return (
          <Card cardType="Bordered" key={i}>
            <FlexLayout desktopWidth="50" halign="fill" valign="center">
              <TextStyles alignment="left">{opt.label}</TextStyles>
              <Select
                options={opt.options}
                value={optAttribOutput[i][1]}
                onChange={(e, f) => handleOptionChange(e, f, i)}
              />
            </FlexLayout>
          </Card>
        );
      })}
      {customLabels?.map((custom: number, i: number) => {
        return (
          <Card cardType="Bordered" key={custom}>
            <FlexLayout desktopWidth="50" halign="fill" valign="center">
              <TextStyles alignment="left">{`Custom Label ${i}`}</TextStyles>
              <FlexLayout direction="vertical">
                <Select
                  value={
                    optAttribOutput[i + optionalAttribOptions.length]?.[0] ?? ""
                  }
                  options={productsAttributes}
                  onChange={(e, f) =>
                    handleOptionChange(e, f, i + optionalAttribOptions.length)
                  }
                />
                {optAttribOutput[i + optionalAttribOptions.length]?.[0] ===
                  "custom" && (
                  <TextField
                    placeHolder="Custom Value"
                    value={
                      optAttribOutput[i + optionalAttribOptions.length]?.[1] ??
                      ""
                    }
                    onChange={(e) =>
                      handleTextEnter(e, i + optionalAttribOptions.length)
                    }
                  />
                )}
                <Button
                  type="DangerPlain"
                  onClick={() =>
                    handleCustomLabelDelete(
                      custom,
                      i + optionalAttribOptions.length
                    )
                  }
                >
                  Delete
                </Button>
              </FlexLayout>
            </FlexLayout>
          </Card>
        );
      })}
    </Card>
  );
}

export default OptionalAttributes;
